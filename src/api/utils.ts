import CryptoJS from "crypto-js";

type MessageType = {
  type: string;
  payload?: object;
  version: string;
};

// RN에 메시지 전송
export const sendMessage = (data: MessageType) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  }
};

// decrypted accesstoken
const decryptAccessToken = (
  encryptedData: string,
  iv: string,
  secretKey: string,
) => {
  const decrypted = CryptoJS.AES.decrypt(
    encryptedData,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: CryptoJS.enc.Hex.parse(iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    },
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
};

// signature
const verifyHmacSignature = (
  encryptedData: string,
  receivedSignature: string,
  secretKey: string,
) => {
  const expectedSignature = CryptoJS.HmacSHA256(
    encryptedData,
    secretKey,
  ).toString();
  return receivedSignature === expectedSignature;
};

type AuthorizationMessage = {
  type: "AUTHORIZATION";
  payload: {
    iv: string;
    encryptedData: string;
    signature: string;
  };
};

// get token from RN
const requestToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    sendMessage({
      type: "REQUEST_AUTHORIZATION",
      version: "1.0",
    });

    const messageHandler = (event: globalThis.MessageEvent) => {
      const data: AuthorizationMessage = JSON.parse(event.data);
      if (data.type === "AUTHORIZATION") {
        const { iv, encryptedData, signature } = data.payload;
        const secretKey = import.meta.env.VITE_SECRET_KEY;
        if (verifyHmacSignature(encryptedData, signature, secretKey)) {
          const accessToken = decryptAccessToken(encryptedData, iv, secretKey);
          localStorage.setItem("token", accessToken);
          return accessToken;
        }
      }
    };

    if (window?.ReactNativeWebView) {
      window.addEventListener("message", messageHandler as EventListener);
      document.addEventListener("message", messageHandler as EventListener);
    }
  } else {
    return token;
  }
};

const requestFetch = async (
  url: string,
  method: string,
  data?: object,
  option?: object,
) => {
  const token = await requestToken();
  if (token !== null) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Authorization", `Bearer ${token}`);
    requestHeaders.set("Accept", "*/*");
    if (option) {
      Object.entries(option).map(([key, value]) => {
        requestHeaders.set(key, value);
      });
    }

    if (data) {
      return await fetch(url, {
        method,
        headers: requestHeaders,
        body: JSON.stringify(data),
      });
    } else {
      return await fetch(url, {
        method,
        headers: requestHeaders,
      });
    }
  }

  return null;
};

export const requestPostFetch = async (url: string, data: object) => {
  return await requestFetch(url, "POST", data, {
    "Content-Type": "application/json",
  });
};

export const requestPutFetch = async (url: string, data: object) => {
  return await requestFetch(url, "PUT", data, {
    "Content-Type": "application/json",
  });
};

export const requestGetFetch = async (url: string) => {
  return await requestFetch(url, "GET");
};

export const requestDeleteFetch = async (url: string) => {
  return await requestFetch(url, "DELETE");
};

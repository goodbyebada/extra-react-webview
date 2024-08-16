import CryptoJS from "crypto-js";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const API_URL = `${SERVER_URL}/api/v1/`;

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
// const verifyHmacSignature = (
//   encryptedData: string,
//   receivedSignature: string,
//   secretKey: string,
// ) => {
//   const expectedSignature = CryptoJS.HmacSHA256(
//     encryptedData,
//     secretKey,
//   ).toString();
//   return receivedSignature === expectedSignature;
// };

type AuthorizationMessage = {
  type: "AUTHORIZATION";
  payload: {
    iv: string;
    encryptedData: string;
    signature: string;
  };
};

// get token from RN
const requestToken = (callback: (token: string) => void) => {
  const token = localStorage.getItem("token");
  if (token === null || token === "") {
    sendMessage({
      type: "REQUEST_AUTHORIZATION",
      version: "1.0",
    });

    const messageHandler = (event: globalThis.MessageEvent) => {
      const data: AuthorizationMessage = JSON.parse(event.data);
      if (data.type === "AUTHORIZATION") {
        const { iv, encryptedData } = data.payload;
        const secretKey = `${import.meta.env.VITE_SECRET_KEY}`;
        const accessToken = decryptAccessToken(encryptedData, iv, secretKey);
        localStorage.setItem("token", accessToken);
        callback(accessToken);
      }
    };

    window.addEventListener("message", messageHandler);
    document.addEventListener("message", messageHandler as EventListener);
  } else {
    callback(token);
  }
};

const requestFetch = async (
  url: string,
  method: string,
  callback: (res: Response) => void,
  data?: object,
  option?: object,
) => {
  requestToken((token) => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Authorization", `Bearer ${token}`);
    requestHeaders.set("Accept", "*/*");
    if (option) {
      Object.entries(option).map(([key, value]) => {
        requestHeaders.set(key, value);
      });
    }

    const URL = API_URL + url;

    if (data) {
      fetch(URL, {
        method,
        headers: requestHeaders,
        body: JSON.stringify(data),
      })
        .then(callback)
        .catch((err) => console.log(err));
    } else {
      fetch(URL, {
        method,
        headers: requestHeaders,
      })
        .then(callback)
        .catch((err) => console.log(err));
    }
  });
};

export const requestPostFetch = (
  url: string,
  data: object,
  callback: (res: Response) => void,
) => {
  return requestFetch(url, "POST", callback, data, {
    "Content-Type": "application/json",
  });
};

export const requestPutFetch = async (
  url: string,
  data: object,
  callback: (res: Response) => void,
) => {
  return await requestFetch(url, "PUT", callback, data, {
    "Content-Type": "application/json",
  });
};

export const requestGetFetch = async (
  url: string,
  callback: (res: Response) => void,
) => {
  return await requestFetch(url, "GET", callback);
};

export const requestDeleteFetch = async (
  url: string,
  callback: (res: Response) => void,
) => {
  return await requestFetch(url, "DELETE", callback);
};

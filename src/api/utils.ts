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
      callback(accessToken);
    }
  };

  window.addEventListener("message", messageHandler);
  document.addEventListener("message", messageHandler as EventListener);
};

const requestFetch = async (
  url: string,
  method: string,
  data?: object,
  option?: object,
) => {

  console.log("호출")
  const token = await new Promise<string>((resolve) => {
    requestToken(resolve);
  });

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Authorization", `Bearer ${token}`);
  requestHeaders.set("Accept", "*/*");
  if (option) {
    Object.entries(option).forEach(([key, value]) => {
      requestHeaders.set(key, value);
    });
  }

  const URL = API_URL + url;

  try {
    if (data !== undefined) {
      requestHeaders.set("Content-Type", "application/json");
      return await fetch(URL, {
        method,
        headers: requestHeaders,
        body: JSON.stringify(data),
      });
    } else {
      return await fetch(URL, {
        method,
        headers: requestHeaders,
      });
    }
  } catch (err) {
    console.error(err);
  }

  return null;
};

// const requestFetch = async (
//   url: string,
//   method: string,
//   data?: object,
//   option?: object,
// ) => {
//   // const token = await new Promise<string>((resolve) => {
//   //   requestToken(resolve);
//   // });

//   const token = await fetch(`${API_URL}account/login`, {
//     method: "POST",
//     headers: {
//       Accept: "*/*",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: "user1@naver.com",
//       password: "password",
//     }),
//   }).then((res) => res.json());

//   const requestHeaders: HeadersInit = new Headers();
//   requestHeaders.set("Authorization", `Bearer ${token}`);
//   requestHeaders.set("Accept", "*/*");
//   if (option) {
//     Object.entries(option).forEach(([key, value]) => {
//       requestHeaders.set(key, value);
//     });
//   }

//   const URL = API_URL + url;

//   try {
//     if (data !== undefined) {
//       requestHeaders.set("Content-Type", "application/json");
//       return await fetch(URL, {
//         method,
//         headers: requestHeaders,
//         body: JSON.stringify(data),
//       });
//     } else {
//       return await fetch(URL, {
//         method,
//         headers: requestHeaders,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//   }

//   return null;
// };

export const requestPostFetch = async (url: string, data: object) => {
  return await requestFetch(url, "POST", data);
};

export const requestPutFetch = async (url: string, data: object) => {
  return await requestFetch(url, "PUT", data);
};

export const requestGetFetch = async (url: string) => {
  return await requestFetch(url, "GET");
};

export const requestDeleteFetch = async (url: string) => {
  return await requestFetch(url, "DELETE");
};

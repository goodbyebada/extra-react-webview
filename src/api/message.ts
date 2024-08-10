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

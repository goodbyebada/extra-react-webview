import { UserFiled } from "@type/firebaseInterface";

export class ChatSessionManager {
  static saveChatRoomInfo(
    userId: number,
    chatRoomIdList: number[],
    userInfo: UserFiled,
  ) {
    sessionStorage.setItem("myUserId", JSON.stringify(userId));
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    sessionStorage.setItem("chatRoomIdList", JSON.stringify(chatRoomIdList));
  }

  static saveUserInfo(userId: number, userInfo: UserFiled) {
    sessionStorage.setItem("myUserId", JSON.stringify(userId));
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  }

  static getUserId(): number {
    return JSON.parse(sessionStorage.getItem("myUserId") || "0");
  }

  static getUserInfo(): UserFiled {
    return JSON.parse(sessionStorage.getItem("userInfo") || "{}");
  }

  static getChatRoomIdList(): number[] {
    return JSON.parse(sessionStorage.getItem("chatRoomIdList") || "[]");
  }

  static clearSession() {
    sessionStorage.clear();
  }
}

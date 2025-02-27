import { ParticipantInfoList, ChatUserInfo } from "@/types/firebaseInterface";

/**
 * 채팅 User 정보
 */
export class ChatUser {
  #userId: number;
  #userName: string;
  #admin: boolean;
  #createdAt: string;

  constructor(participantInfo: ChatUserInfo) {
    const { user_id, admin, created_at, name } = participantInfo;
    this.#userId = user_id;
    this.#userName = name;
    this.#admin = admin;
    this.#createdAt = created_at;
  }

  getUserName() {
    return this.#userName;
  }

  getUserId() {
    return this.#userId;
  }

  isAdminType() {
    return this.#admin;
  }

  getCreatedAt() {
    return this.#createdAt;
  }
}

/**
 * 채팅에 참여한 ChatUser 들의  정보
 *
 */
export class ChatUsersManager {
  chatUsers: ChatUser[] = [];
  participantInfoList: ParticipantInfoList = [];

  constructor(participantInfoList: ParticipantInfoList) {
    this.participantInfoList = participantInfoList;

    this.#setChatUsers();
  }

  #setChatUsers() {
    this.participantInfoList.forEach((participantInfo) => {
      this.#addChatUser(participantInfo);
    });
  }

  // TODO 채팅 유저가 나갔을시, 유저변동 => 실시간 연동 , API
  updateChatUsers() {}

  #addChatUser(participantInfo: ChatUserInfo) {
    const user = new ChatUser(participantInfo);
    this.chatUsers.push(user);
  }

  getAdminTypeUsersList() {
    return this.chatUsers.filter((chatUser) => chatUser.isAdminType);
  }

  getChatUserCount() {
    return this.chatUsers.length;
  }
}

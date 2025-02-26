import { UserDetailsInChat, UserFiled } from "@/types/firebase_db";

/**
 * 채팅 User 정보
 */
export class ChatUser {
  #userId: number;
  #userName: string;
  #admin: boolean;
  #createdAt: string;

  constructor(userId: number, userField: UserFiled) {
    const { name, admin, created_at } = userField;
    this.#userId = userId;
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
  userInfoMapById = new Map<number, UserFiled>();
  userIdList: number[] = [];
  chatUsers: ChatUser[] = [];

  constructor(chatUserDetails: UserDetailsInChat) {
    const { userIdList, userInfoMapById } = chatUserDetails;
    this.userIdList = userIdList;
    this.userInfoMapById = userInfoMapById;

    this.#setChatUsers();
  }

  #setChatUsers() {
    for (const userId of this.userIdList) {
      const userField = this.userInfoMapById.get(userId);
      if (userField) {
        this.#addChatUser(userId, userField);
      }
    }
  }

  // TODO 채팅 유저가 나갔을시, 유저변동 => 실시간 연동 , API
  updateChatUsers() {}

  #addChatUser(userId: number, userField: UserFiled) {
    const user = new ChatUser(userId, userField);
    this.chatUsers.push(user);
  }

  getAdminTypeUsersList() {
    return this.chatUsers.filter((chatUser) => chatUser.isAdminType);
  }

  getChatUserCount() {
    return this.chatUsers.length;
  }
}

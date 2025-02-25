import { ChatUser } from "@utills/chat/ChatUsers";
import { generateChosungRangePattern } from "@utills/chat/hangulSearch";

// 회원 리스트를 가지고 검색을 수행하는 클래스

/**
 * 검색
 * 카카오톡 기준
 * - 초성만 검색 가능
 * => 완전히 같지 않아도 포함가능
 *
 * => 나머지는 완전히 같아야함
 * - 중성 검색 가능 ex) ㅜ
 * - 글자 + 종성 => 완전히 같아야 검색됨
 *
 *
 * ex) 김수현 -> 김ㅅ 로는 검색이 안됨
 * ex) 서ㅈ -> 서ㅈ 로 검색됨
 */

// TODO 검색 키워드에 해당하는 chatUsers 반환
// TODO 매번 모든 userList를 검사하는 방식으로 설계됨 -> 리팩토링 예정
// [ ] 이름 공백 포함 가능한지 기획 체크할것
export class SearchChatUsersService {
  chatUserList: ChatUser[] = [];

  constructor(userList: ChatUser[]) {
    this.chatUserList = userList;
  }

  #makeRemovedSpaceString(str: string) {
    const SPACE_REGEX = /\s/g;
    return str.replace(SPACE_REGEX, "");
  }

  #isWhitespaceOnly(str: string) {
    const SPACE_REGEX = /\s/g;
    return SPACE_REGEX.test(str);
  }

  search(keyword: string) {
    // keyword가 모두 공백일때 로직을 실행하지 않는다.
    if (this.#isWhitespaceOnly(keyword)) {
      return [];
    }

    keyword = this.#makeRemovedSpaceString(keyword);

    if (this.#isOnlyChosung(keyword)) {
      const CHO_RANGE_REGEX = generateChosungRangePattern(keyword);
      return this.#filterUsersByRegExp(CHO_RANGE_REGEX);
    }

    const STRING_REGEX = new RegExp(keyword);
    return this.#filterUsersByRegExp(STRING_REGEX);
  }

  #isOnlyChosung(keyword: string) {
    const IS_ONLY_CHOSUNG_REGEX = new RegExp(/^[ㄱ-ㅎ]+$/);
    return IS_ONLY_CHOSUNG_REGEX.test(keyword);
  }

  #filterUsersByRegExp(regExp: RegExp) {
    return this.chatUserList.filter((chatUser) =>
      regExp.test(chatUser.getUserName()),
    );
  }
}

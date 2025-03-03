import { ChatUser } from "@utills/chat/ChatUsers";
import { generateChosungRangePattern } from "@utills/chat/hangulSearch";

/**
 * 채팅에 참여한 유저 목록에서 유저 이름으로 검색 수행하는 클래스
 *
 * 🔍 검색 규칙 (카카오톡 기준)
 *
 * ✅ 초성 검색 가능
 *    - 초성만 입력해도 검색 가능
 *    - 단, 완전히 같지 않아도 포함 검색 가능
 *    - 예: '홍길동' → 'ㅎㄱ' 으로 검색 가능
 *
 * ✅ 중성(모음) 단독 검색 가능
 *    - 예: 'ㅜ' 로 검색 가능
 *
 * ❌ 일부 조합은 검색 불가능
 *    - 초성과 다른 글자를 조합할 경우, 완전히 일치해야 함
 *    - 예: '김수현' → '김ㅅ' 으로는 검색 불가
 *
 * ✅ 완전 일치 검색 필요 조건
 *    - 글자 + 종성(받침)이 포함된 경우, 완전히 같아야 검색됨
 *    - 예: '서ㅈ' → '서ㅈ' 으로 검색 가능
 */

// TODO 매번 모든 userList를 검사하는 방식으로 설계됨 -> 리팩토링 예정
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

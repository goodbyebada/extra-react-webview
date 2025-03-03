const CHO_HANGUL = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const HANGUL_START_CHARCODE = "가".charCodeAt(0);
const CHO_PERIOD = Math.floor("까".charCodeAt(0) - "가".charCodeAt(0));
const JUNG_PERIOD = Math.floor("개".charCodeAt(0) - "가".charCodeAt(0));

function combine(cho: number, jung: number, jong: number) {
  return String.fromCharCode(
    HANGUL_START_CHARCODE + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong,
  );
}

/**
 * 초성 인덱스 0 (ㄱ)이라면 [가-깋]
 */
function getChosungBracket(choIndex: number) {
  return `[${combine(choIndex, 0, 0)}-${combine(choIndex + 1, 0, -1)}]`;
}

/**
 *
 * @param search
 * @returns
 *
 * 초성을 정규식 시작-끝 정규식으로 바꿔준다.
 * ex)
 *  ㄱ => [가-깋]
 * ㅅㄱ => [사-싷][가-깋]
 *
 */
export function generateChosungRangePattern(search = "") {
  const regex = CHO_HANGUL.reduce(
    (acc, cho, index) => acc.replace(new RegExp(cho), getChosungBracket(index)),
    search,
  );

  return new RegExp(`(${regex})`);
}

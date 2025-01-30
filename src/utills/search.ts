function cho(str: string): string {
  const choList: string[] = [
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
  let result: string[] = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const charCode = char.charCodeAt(0);
    const index = Math.floor((charCode - 44032) / 588);

    result.push(choList[index] || char);
  }

  return result.join("");
}

function match(keyword: string, data: string): number[] {
  const dataCho = cho(data);
  const keywordCho = cho(keyword);
  let result: number[] = [];
  let index = -1;

  do {
    index = dataCho.indexOf(keywordCho, index + 1);
    if (index > -1) result.push(index);
  } while (index > -1);

  return result;
}

export default function search(keyword: string, data: string): number {
  const indexes = match(keyword, data);
  const keywordLength = keyword.length;
  const dataCho = cho(data);
  let result = -1;

  for (const index of indexes) {
    let flag = true;

    for (let j = 0; j < keywordLength; j++) {
      const keywordChar = keyword[j];
      const dataChar = (/[ㄱ-ㅎ]/.test(keywordChar) ? dataCho : data).substr(
        index + j,
        1,
      );

      if (dataChar !== keywordChar) {
        flag = false;
        break;
      }
    }

    if (flag) {
      result = index;
      break;
    }
  }

  return result;
}

import { ItemProps } from "@components/mocules/Item";

/**
 * year month dateNum 을 하나의 숫자로 return
 * ex ) 2024-09-02 => 20240902
 */

export function converToDateObject(calenderItem: string): number {
  const dateNumber = calenderItem.split("-").join("");

  return +dateNumber;
}

const convertItemPropsAllType = (elem: {
  id: string;
  body: string;
  title: string;
}): ItemProps | null => {
  if (!elem) return null;
  let { id, body, title } = elem;

  // title = title ? title.split(" ").slice(0, 5).join(" ") : "none";
  const tmpDateStr = new Date().toString().split(" ").slice(0, 4).join(" ");
  const itemProps: ItemProps = {
    title,
    category: id.toString(),
    date: tmpDateStr,
    dDay: "D-3",
    company: "companyName",
    time: tmpDateStr,
    location: "서울시 강남역",
    onClick: () => {},
  };

  return itemProps;
};

const convertItemPropsMyType = (elem: {
  id: string;
  name: string;
  email: string;
  body: string;
}): ItemProps | null => {
  // 반환 타입을 ItemProps로 명시
  if (!elem) return null;
  const { id, name, email, body } = elem;

  console.log(elem);
  const tmpDateStr = new Date().toString().split(" ").slice(0, 4).join(" ");
  const itemProps: ItemProps = {
    title: name,
    category: id.toString(),
    date: tmpDateStr,
    dDay: "D-3",
    company: email,
    time: tmpDateStr,
    location: "어딘가",
    onClick: () => {},
  };

  return itemProps;
};

export const testConvertFun = {
  convertItemPropsAllType,
  convertItemPropsMyType,
};

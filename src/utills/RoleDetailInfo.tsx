import { styled } from "styled-components";
import splitAgeMinMax from "@utills/splitAgeMinMax";
import { ThemeText } from "@components/atoms/Text";
import RoleDetailConditonItem from "@components/mocules/RoleDetailConditionItem";

/*
 * return 한 역할 / 상세정보에 대한 UI
 * Ex) 학생역할 : { 성별 : 여자, ...} , { 성별 : 남자, ...}
 */
const RoleDetailItem = (
  idx: number,
  roleName: string,
  costumeList: string[],
  sex: boolean,
  roleAge: string | null,
  season: string,
) => {
  const roleString = (roleAge: string | null) => {
    if (!roleAge) {
      return "나이 무관";
    }
    const { minAge, maxAge } = splitAgeMinMax(roleAge);
    return `${minAge}세 ~ ${maxAge}세`;
  };

  const convertCoustumeStr = (costumeList: string[]) => {
    {
      if (costumeList.length > 0) {
        return costumeList.reduce((acc, curr, idx) => {
          if (costumeList.length === idx + 1) {
            return (acc += curr);
          }
          return (acc += curr + ",sdfsdfsdfsdskjdflsjflskdjflksjfjsldfksf");
        }, "");
      }
      return "";
    }
  };

  return (
    <RoleItem key={idx}>
      <ThemeText variant={"content-title"}>
        {idx + 1}&#41;{roleName}
      </ThemeText>

      <DetailItem>
        <RoleDetailConditonItem
          indexNumber={1}
          category={"성별"}
          value={sex ? "여자" : "남자"}
        />

        <RoleDetailConditonItem
          indexNumber={2}
          category={"나이"}
          value={roleString(roleAge)}
        />
        <RoleDetailConditonItem
          indexNumber={3}
          category={"계절"}
          value={season}
        />

        <RoleDetailConditonItem
          indexNumber={4}
          category={"의상"}
          value={convertCoustumeStr(costumeList)}
        />
      </DetailItem>
    </RoleItem>
  );
};

export default RoleDetailItem;

const RoleItem = styled.div`
  padding: 30px;
  margin: 0 auto;
  width: 100%;
  border-bottom: solid 2px white;

  &:last-child {
    border-style: none;
  }
`;

const DetailItem = styled.div`
  margin-top: 30px;

  min-height: 142px;
  border: 2px solid transparent;
  background-origin: border-box;
  background-clip: content-box, border-box;

  background-image: linear-gradient(#000000, #000000),
    linear-gradient(#545454, #bababa);

  border-radius: 18px;

  font-size: 14px;
  font-style: normal;
  font-weight: 900;
`;

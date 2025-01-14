import styled from "styled-components";
import { ItemWrapper, TagWrapper } from "@components/atoms/Wrapper";
import Text, { ThemeText } from "@components/atoms/Text";
import { StarToggleButton } from "@components/atoms/Button";
import StatusTag from "./Status";
import getDdayString from "@utills/getDdayString";
import getDateString from "@utills/getDateString";

export interface ItemProps {
  title: string;
  category: string;
  date: string[];
  dDay: string;
  company: string;
  time: string;
  location: string;
  status?: "applied" | "rejected" | "approved";
  statusText?: string;
  highlight?: boolean;
  isActiveStar?: boolean;
  isRecruit?: boolean;
  onClick: () => void;
  onClickStar?: () => void;
}

const ItemContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }
`;

const ItemRightContent = styled(ItemContent)`
  align-items: flex-end;
`;

const ItemDateWrapper = styled.div`
  display: flex;
  margin-top: 5px;
  margin-bottom: 25px;

  & > p:first-child {
    margin-right: 10px;
    align-items: center;
  }
`;

const ItemGatheringWrapper = styled.div`
  display: flex;
  & > div:first-child {
    margin-right: 10px;
  }
`;

/**
 * Recruitment List Item
 * highlight: 추천 공고 시 지정
 * isActiveStar: 즐겨찾기 활성화 여부
 * isRecruit: 즐겨찾기 버튼 표시 여부
 * @param title string (title)
 * @param category string (category)
 * @param date string[] (date: 배열로 변경)
 * @param dDay string (dDate: deadline Date)
 * @param company string (company name)
 * @param time string (time: 01:00)
 * @param location string (location)
 * @param status "applied" | "rejected" | "approved" (status)
 * @param statusText string (status text)
 * @param highlight boolean (specify when posting a recommendation)
 * @param isActiveStar boolean (favorites status)
 * @param isRecruit boolean (whether to enable the favorites button)
 */
const Item = ({
  title,
  category,
  date,
  dDay,
  company,
  time,
  location,
  status = "applied",
  statusText = "모집중",
  highlight = false,
  isActiveStar = false,
  isRecruit = false,
  onClick,
  onClickStar = () => {},
}: ItemProps) => {
  const dDate = getDdayString(dDay);
  const formattedDate = getDateString(date);

  return (
    <ItemWrapper highlight={highlight}>
      <ItemContent onClick={onClick}>
        <ThemeText variant="item-info">{category}</ThemeText>
        <ThemeText variant="item-title">{title}</ThemeText>
        <ItemDateWrapper>
          <ThemeText variant="item-subtitle">{formattedDate}</ThemeText>
          <TagWrapper>
            <Text size={11} weight={900} color="#888">
              {dDate}
            </Text>
          </TagWrapper>
        </ItemDateWrapper>
        <ThemeText variant="item-info">{company}</ThemeText>
      </ItemContent>
      <ItemRightContent>
        <ItemGatheringWrapper>
          <div>
            <Text size={11} weight={500} align="right">
              {time} 예정
            </Text>
            <Text size={11} weight={500} align="right">
              {location}
            </Text>
          </div>
          {isRecruit && (
            <StarToggleButton onClick={onClickStar} isActive={isActiveStar} />
          )}
        </ItemGatheringWrapper>
        <StatusTag status={status} statusText={statusText} />
      </ItemRightContent>
    </ItemWrapper>
  );
};

export default Item;

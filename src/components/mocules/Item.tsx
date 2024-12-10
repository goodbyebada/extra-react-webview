import React from "react";
import styled from "styled-components";
import {
  ItemWrapper,
  TagWrapper,
  StatusWrapper,
} from "@components/atoms/Wrapper";
import Text, { ThemeText } from "@components/atoms/Text";
import { StarToggleButton } from "@components/atoms/Button";

interface ItemProps {
  title: string;
  category: string;
  date: string;
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

const Item: React.FC<ItemProps> = ({
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
}) => {
  return (
    <ItemWrapper highlight={highlight}>
      <ItemContent onClick={onClick}>
        <ThemeText variant="item-info">{category}</ThemeText>
        <ThemeText variant="item-title">{title}</ThemeText>
        <ItemDateWrapper>
          <ThemeText variant="item-subtitle">{date}</ThemeText>
          <TagWrapper>
            <Text size={11} weight={900} color="#888">
              {dDay}
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
        <StatusWrapper status={status}>
          <Text
            size={12}
            weight={900}
            color={status == "applied" ? "#000" : "#fff"}
          >
            {statusText}
          </Text>
        </StatusWrapper>
      </ItemRightContent>
    </ItemWrapper>
  );
};

export default Item;

import { useState } from "react";

import styled from "styled-components";
import Color from "@/constants/color";
import Text from "@components/atoms/Text";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import Margin from "@components/atoms/Margin";

const FilterWrapper = styled.div`
  position: relative;
  width: 84px;
  height: 35px;
  background: ${Color.input};
  border-radius: 5px;

  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterItemWrapper = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  width: 100%;
  height: 35px;

  z-index: 1000;
`;

const FilterBackground = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 900;
  top: 0;
  left: 0;
`;

interface FilterItemProps {
  isActive: boolean;
}

const FilterItem = styled.div<FilterItemProps>`
  width: 100%;
  height: 100%;

  background: ${({ isActive }) => (isActive ? Color.input : "#222")};

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

interface FilterProps {
  items: string[];
  setValue: (value: number) => void;
}

const Filter = ({ items, setValue }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <FilterWrapper onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? (
        <GoTriangleUp size={15} color={Color.text} />
      ) : (
        <GoTriangleDown size={15} color={Color.text} />
      )}
      <Margin size={10} direction="horizontal" />
      <Text size={14} weight={900}>
        {currentIndex == -1 ? "전체" : items[currentIndex]}
      </Text>
      {isOpen && (
        <>
          {" "}
          <FilterBackground />
          <FilterItemWrapper>
            <FilterItem
              onClick={() => {
                setCurrentIndex(-1);
                setValue(-1);
              }}
              isActive={currentIndex == -1}
            >
              <Text size={14} weight={900}>
                전체
              </Text>
            </FilterItem>
            {items.map((v, i) => (
              <FilterItem
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  setValue(i);
                }}
                isActive={currentIndex == i}
              >
                <Text size={14} weight={900}>
                  {v}
                </Text>
              </FilterItem>
            ))}
          </FilterItemWrapper>
        </>
      )}
    </FilterWrapper>
  );
};

export default Filter;

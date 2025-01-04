import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { InputField } from "@components/atoms/Form";
import Text from "@components/atoms/Text";
import { Control } from "react-hook-form";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { FONT_COLORS } from "@/styled/colors";

interface DropDownInputProps {
  name: string;
  placeholder?: string;
  items: string[];
  control: Control;
  setValue: (name: string, value: unknown) => void;
}

const DropDownInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropDownIcon = styled.div`
  position: absolute;
  right: 20px;
  height: 100%;

  display: flex;
  align-items: center;
`;

const DropDownListContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  width: 100%;
  height: 100%;

  overflow: hidden;
`;

const DropDownListBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1100;

  width: 100%;
  height: 250px;
  background: #1a1a1a;
`;

const DropDownHighlighter = styled.div`
  position: absolute;
  z-index: 1003;
  top: 100px;
  left: 0;

  width: 100%;
  height: 50px;

  background: #292929;
`;

const DropDownListWrapper = styled.div`
  position: absolute;
  z-index: 1004;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const DropDownList = styled.ul`
  list-style: none;

  width: 100%;
  padding: 100px 0;
  box-sizing: content-box;
`;

const DropDownItem = styled.li`
  list-style: none;

  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropDownInput = ({
  name,
  placeholder,
  items,
  control,
  setValue,
}: DropDownInputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // scrolling
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePosition = (scrollY: number | undefined) => {
    if (scrollY != undefined) {
      const index = Math.round(scrollY / 50);
      setCurrentIndex(index);
      setValue(name, items[index]);
    }
  };

  const setScrollPosition = () => {
    if (scrollContainerRef.current != undefined) {
      scrollContainerRef.current.scrollTop = currentIndex * 50;
    }
  };

  const handleScroll = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // 기존 타이머 클리어
    }

    handlePosition(scrollContainerRef.current?.scrollTop);

    // 스크롤이 멈추면 특정 행동 실행
    timeoutRef.current = setTimeout(() => {
      setScrollPosition();
    }, 200);
  }, [currentIndex, handlePosition]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll); // 스크롤 이벤트 리스너 등록
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll); // 리스너 제거
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // 컴포넌트 언마운트 시 타이머 클리어
      }
    };
  }, [handleScroll]);

  return (
    <>
      <DropDownInputWrapper
        onClick={() => {
          setIsOpen(true);
          setValue(name, items[currentIndex]);
          setScrollPosition();
        }}
      >
        <DropDownIcon>
          <Text size={14} weight={900}>
            {isOpen ? <TfiAngleUp /> : <TfiAngleDown />}
          </Text>
        </DropDownIcon>
        <InputField
          name={name}
          placeholder={placeholder}
          control={control}
          inputProps={{ readOnly: true }}
        />
      </DropDownInputWrapper>
      <DropDownListContainer
        onClick={() => setIsOpen(false)}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <DropDownListBackground onClick={(e) => e.stopPropagation()}>
          <DropDownHighlighter />
          <DropDownListWrapper ref={scrollContainerRef}>
            <DropDownList style={{ height: items.length * 50 + "px" }}>
              {items.map((v, i) => (
                <DropDownItem
                  key={i}
                  style={{
                    transform: currentIndex == i ? "scale(1)" : "scale(0.9)",
                  }}
                >
                  <Text
                    size={16}
                    weight={900}
                    color={
                      currentIndex == i ? FONT_COLORS.white : FONT_COLORS.gray
                    }
                  >
                    {v}
                  </Text>
                </DropDownItem>
              ))}
            </DropDownList>
          </DropDownListWrapper>
        </DropDownListBackground>
      </DropDownListContainer>
    </>
  );
};

export default DropDownInput;

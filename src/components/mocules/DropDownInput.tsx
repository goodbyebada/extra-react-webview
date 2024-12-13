import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Input } from "@components/atoms/Form";
import Text from "@components/atoms/Text";

interface DropDownInputProps {
  name: string;
  placeholder: string;
  value: string;
  items: string[];
  required?: boolean;
  onChange: (value: string) => void;
}

const DropDownInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
`;

const DropDownIcon = styled.div`
  position: absolute;
  height: 100%;
  top: -5px;
  right: 20px;

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
  value,
  required = true,
  items,
  onChange,
}: DropDownInputProps) => {
  const [_value, setValue] = useState<string>(value);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // scrolling
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const handlePosition = (scrollY: number | undefined) => {
    if (scrollY != undefined) {
      const index = Math.round(scrollY / 50);
      setCurrentIndex(index);
      setValue(items[index]);
    }
  };

  const handleScroll = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // 기존 타이머 클리어
    }

    handlePosition(scrollContainerRef.current?.scrollTop);

    // 스크롤이 멈추면 특정 행동 실행
    timeoutRef.current = setTimeout(() => {
      if (scrollContainerRef.current != undefined) {
        scrollContainerRef.current.scrollTop = currentIndex * 50;
      }
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
      <DropDownInputWrapper onClick={() => setIsOpen(true)}>
        <DropDownIcon>
          <Text size={14} weight={900}>
            {isOpen ? "∧" : "∨"}
          </Text>
        </DropDownIcon>
        <Input
          name={name}
          placeholder={placeholder}
          value={_value}
          readOnly={true}
          onChange={onChange}
          required={required}
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
                  onClick={() => setValue(v)}
                  style={{
                    transform: currentIndex == i ? "scale(1)" : "scale(0.9)",
                  }}
                >
                  <Text
                    size={16}
                    weight={900}
                    color={currentIndex == i ? "#fff" : "#444"}
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

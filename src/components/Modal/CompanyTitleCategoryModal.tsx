import styled from "styled-components";
import React, { useState, useEffect } from "react";

interface CompanyTitleCategoryModalProps {
  closeModal: (title: string, category: string) => void;
}

export type TitleCategory = {
  title: string;
  category: string;
};

function CompanyTitleCategoryModal({
  closeModal,
}: CompanyTitleCategoryModalProps) {
  const [formState, setFormState] = useState<TitleCategory>({
    title: "",
    category: "",
  });
  const [categoryInput, setCategoryInput] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [boxes, setBoxes] = useState<string[]>([]);

  useEffect(() => {
    setIsFormValid(formState.title !== "" && formState.category !== "");
  }, [formState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "title") {
      setFormState((prevState) => ({
        ...prevState,
        title: value,
      }));
    } else if (name === "categoryInput") {
      setCategoryInput(value);
    }
  };

  const handlePlusClick = () => {
    if (categoryInput.trim() !== "" && !boxes.includes(categoryInput.trim())) {
      setBoxes((prevBoxes) => [...prevBoxes, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const handleCategoryClick = (category: string) => {
    setFormState((prevState) => {
      const newCategories = prevState.category
        .split(",")
        .map((cat) => cat.trim());
      if (newCategories.includes(category)) {
        // 이미 선택된 카테고리인 경우 제거
        const updatedCategories = newCategories.filter(
          (cat) => cat !== category,
        );
        return {
          ...prevState,
          category: updatedCategories.join(", "),
        };
      } else {
        // 선택되지 않은 카테고리인 경우 추가
        return {
          ...prevState,
          category: [...newCategories, category].join(", "),
        };
      }
    });
  };

  const handleSubmit = () => {
    if (isFormValid) {
      closeModal(formState.title, formState.category);
    }
  };

  return (
    <ModalContainer>
      <RoleBoxWrapper>
        <Row>
          <Txt>제목 :</Txt>
          <Input
            name="title"
            value={formState.title}
            onChange={handleChange}
            spellCheck="false"
          />
        </Row>
        <Row>
          <Txt>카테고리 :</Txt>
          <Input
            name="categoryInput"
            value={categoryInput}
            onChange={handleChange}
            spellCheck="false"
          />
          <PlusBtn onClick={handlePlusClick}>+</PlusBtn>
        </Row>
        <BoxesContainer>
          {boxes.map((box, index) => (
            <Box
              key={index}
              onClick={() => handleCategoryClick(box)}
              $isSelected={formState.category
                .split(",")
                .map((cat) => cat.trim())
                .includes(box)}
            >
              <span>{box}</span>
            </Box>
          ))}
        </BoxesContainer>
        <Btn $isValid={isFormValid} onClick={handleSubmit}>
          확인
        </Btn>
      </RoleBoxWrapper>
    </ModalContainer>
  );
}

export default CompanyTitleCategoryModal;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 329px;
  height: 320px;
  border-radius: 30px;
  background: #302e34;
`;

const RoleBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  box-sizing: border-box;
  line-height: 20px; /* 100% */
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Txt = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.2px;
  margin-right: 20px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  border-radius: 5px;
  background: #302e34;
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  border: none;
  outline: none;
  padding: 5px;
  margin-right: 10px;
`;

const PlusBtn = styled.div`
  width: 36px;
  height: 22px;
  border-radius: 5px;
  background: rgba(116, 116, 116, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 17px;
  font-weight: 700;
`;

const BoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: 120px;
  width: calc(100% - 120px);
`;

const Box = styled.div<{ $isSelected: boolean }>`
  width: 66px;
  height: 23px;
  border-radius: 5px;
  background: ${(props) =>
    props.$isSelected ? "rgba(116, 116, 116, 0.4)" : "#747474"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.$isSelected ? "rgba(255, 255, 255, 0.4)" : "#fff"};
  font-size: 13px;
  font-weight: 700;
  text-align: center;

  span {
    width: 50px;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    text-align: center;
  }
`;

const Btn = styled.button<{ $isValid: boolean }>`
  width: 93px;
  height: 40px;
  border-radius: 10px;
  background: ${(props) =>
    props.$isValid ? "#F5C001" : "rgba(245, 192, 1, 0.5)"};
  color: ${(props) => (props.$isValid ? "#FFF" : "rgba(255, 255, 255, 0.5)")};
  font-size: 24px;
  font-weight: 700;
  display: block;
  margin: 0px auto;
  position: absolute;
  bottom: 27px;
  left: 50%;
  transform: translateX(-50%);
`;

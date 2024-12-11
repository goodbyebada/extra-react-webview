import styled from "styled-components";
import React, { useState } from "react";
import { CategoryEnum } from "@api/interface";

interface CompanyTitleCategoryModalProps {
  onSubmit: (
    title: string,
    category: [keyof typeof CategoryEnum | null, string],
  ) => void;
  closeModal: () => void;
}

export type TitleCategory = {
  title: string;
  category: [keyof typeof CategoryEnum | null, string];
};

function CompanyTitleCategoryModal({
  onSubmit,
  closeModal,
}: CompanyTitleCategoryModalProps) {
  const [formState, setFormState] = useState<TitleCategory>({
    title: "",
    category: [null, ""],
  });
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryList, setCategoryList] = useState(CategoryEnum);

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
    if (categoryInput === "") return;
    const newCategoryList = { ...categoryList };
    newCategoryList["ETC"] = categoryInput;
    setCategoryList(newCategoryList);
    setCategoryInput("");
  };

  const handleCategoryClick = (
    key: keyof typeof CategoryEnum,
    value: string,
  ) => {
    setFormState((prevState) => ({
      title: prevState.title,
      category: key === prevState.category[0] ? [null, ""] : [key, value],
    }));
  };

  const handleSubmit = () => {
    if (formState.title !== "" && formState.category[0] !== null) {
      onSubmit(formState.title, formState.category);
      closeModal();
    }
  };

  return (
    <ModalOverlay>
      <ModalBackground onClick={closeModal} />
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
            {Object.entries(categoryList).map(([key, value], index) => (
              <Box
                key={index}
                onClick={() =>
                  handleCategoryClick(key as keyof typeof CategoryEnum, value)
                }
                $isSelected={
                  formState.category[0] !== null &&
                  key === formState.category[0]
                }
              >
                <span>{value}</span>
              </Box>
            ))}
          </BoxesContainer>
          <Btn
            $isValid={formState.title !== "" && formState.category !== null}
            onClick={handleSubmit}
          >
            확인
          </Btn>
        </RoleBoxWrapper>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default CompanyTitleCategoryModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
`;

const ModalContainer = styled.div`
  width: 329px;
  height: 320px;
  border-radius: 30px;
  background: #302e34;
  position: relative;
  z-index: 30;
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
  width: 50%;
  margin-left: 20px;
`;

const Box = styled.div<{ $isSelected: boolean }>`
  width: 45%;
  height: 20px;
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

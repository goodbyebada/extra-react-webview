import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@components/atoms/Modal";
import { MainButton, BoxButton } from "@components/atoms/Button";
import Text from "@components/atoms/Text";
import { CategoryEnum } from "@api/interface";
import { CiSquarePlus } from "react-icons/ci";

interface CompanyTitleCategoryModalProps {
  onSubmit: (
    title: string,
    category: [keyof typeof CategoryEnum | null, string],
  ) => void;
  closeModal: () => void;
  isVisible: boolean;
}

export type TitleCategory = {
  title: string;
  category: [keyof typeof CategoryEnum | null, string];
};

/**
 * CompanyTitleCategoryModal : 공고 등록 - 제목,카테고리 추가 모달
 * onSubmit: title, category
 * isVisible: boolean
 * closeModal: () => void
 */

function CompanyTitleCategoryModal({
  onSubmit,
  closeModal,
  isVisible,
}: CompanyTitleCategoryModalProps) {
  const [formState, setFormState] = useState<TitleCategory>({
    title: "",
    category: [null, ""],
  });
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryList, setCategoryList] = useState(CategoryEnum);

  const isSubmitActive =
    formState.title !== "" && formState.category[0] !== null;

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
    <Modal isVisible={isVisible} onClose={closeModal}>
      <RoleBoxWrapper>
        <Row>
          <Text size={20} weight={900} color="#fff">
            제목 :
          </Text>
          <Input
            name="title"
            value={formState.title}
            onChange={handleChange}
            spellCheck="false"
          />
        </Row>
        <Row>
          <Text size={20} weight={900} color="#fff">
            카테고리 :
          </Text>
          <Input
            name="categoryInput"
            value={categoryInput}
            onChange={handleChange}
            spellCheck="false"
          />
          <CiSquarePlus size={35} onClick={handlePlusClick} />
        </Row>
        <BoxesContainer>
          {Object.entries(categoryList).map(([key, value], index) => (
            <BoxButton
              key={index}
              onClick={() =>
                handleCategoryClick(key as keyof typeof CategoryEnum, value)
              }
              isActive={
                formState.category[0] !== null && key === formState.category[0]
              }
            >
              <span>{value}</span>
            </BoxButton>
          ))}
        </BoxesContainer>
        <MainButton isActive={isSubmitActive} onClick={handleSubmit}>
          확인
        </MainButton>
      </RoleBoxWrapper>
    </Modal>
  );
}

export default CompanyTitleCategoryModal;

const RoleBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  background: transparent;
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  border: none;
  outline: none;
  padding: 5px;
  margin: 0 10px;
`;

const BoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: 100px;
  margin-bottom: 30px;
`;

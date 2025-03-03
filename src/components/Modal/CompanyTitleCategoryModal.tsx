import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@components/atoms/Modal";
import { MainButton, BoxButton } from "@components/atoms/Button";
import Text from "@components/atoms/Text";
import { CategoryEnum } from "@/type/shared";
import { CiSquarePlus } from "react-icons/ci";

interface CompanyTitleCategoryModalProps {
  onSubmit: (
    title: string,
    category: [keyof typeof CategoryEnum | null, string],
    deadline: string,
  ) => void;
  closeModal: () => void;
  isVisible: boolean;
}

export type TitleCategory = {
  title: string;
  category: [keyof typeof CategoryEnum | null, string];
  deadline: string;
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
    deadline: "",
  });
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryList, setCategoryList] = useState(CategoryEnum);

  const isSubmitActive =
    formState.title.trim() !== "" && formState.category[0] !== null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "categoryInput") {
      setCategoryInput(value);
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value.trim(),
      }));
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
      deadline: prevState.deadline,
    }));
  };

  const handleSubmit = () => {
    if (
      formState.title.trim() !== "" &&
      formState.category[0] !== null &&
      formState.deadline.trim()
    ) {
      onSubmit(formState.title, formState.category, formState.deadline);
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
            placeholder="제목"
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
            placeholder="카테고리"
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
        <Row>
          <Text size={20} weight={900} color="#fff">
            마감기한 :
          </Text>
          <Input
            name="deadline"
            type="date"
            value={formState.deadline}
            onChange={handleChange}
            placeholder="마감기한"
          />
        </Row>
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

  &::-webkit-calendar-picker-indicator {
    filter: invert(1); /* 아이콘 색상 반전 */
  }
`;

const BoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: 100px;
  margin-bottom: 30px;
`;

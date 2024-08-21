import styled from "styled-components";
import { useState, useEffect } from "react";

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
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(formState.title !== "" && formState.category !== "");
  }, [formState]);

  const handleCategoryClick = (category: string) => {
    setFormState((prevState) => ({
      ...prevState,
      category: prevState.category === category ? "" : category,
    }));
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
            onChange={(e) =>
              setFormState((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
            spellCheck="false"
          />
        </Row>
        <Row>
          <Txt>카테고리 :</Txt>
          <ButtonsContainer>
            <CategoryButton
              $isSelected={formState.category === "DRAMA"}
              onClick={() => handleCategoryClick("DRAMA")}
            >
              드라마
            </CategoryButton>
            <CategoryButton
              $isSelected={formState.category === "MUSIC_VIDEO"}
              onClick={() => handleCategoryClick("MUSIC_VIDEO")}
            >
              뮤비촬영
            </CategoryButton>
          </ButtonsContainer>
        </Row>
        <AlignedRow>
          <ButtonsContainer>
            <CategoryButton
              $isSelected={formState.category === "ADVERTISEMENT"}
              onClick={() => handleCategoryClick("ADVERTISEMENT")}
            >
              광고
            </CategoryButton>
            <CategoryButton
              $isSelected={formState.category === "MOVIE"}
              onClick={() => handleCategoryClick("MOVIE")}
            >
              영화
            </CategoryButton>
            <CategoryButton
              $isSelected={formState.category === "ETC"}
              onClick={() => handleCategoryClick("ETC")}
              style={{ width: "36px", height: "22px" }}
            >
              기타
            </CategoryButton>
          </ButtonsContainer>
        </AlignedRow>
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
  margin-bottom: 30px;
`;

const AlignedRow = styled(Row)`
  margin-left: 114px;
  margin-top: -20px;
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
  font-size: 20px;
  font-weight: 900;
  border: none;
  outline: none;
  padding: 5px;
  margin-right: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CategoryButton = styled.div<{ $isSelected: boolean }>`
  width: 56px;
  height: 23px;
  border-radius: 5px;
  background: ${(props) =>
    props.$isSelected ? "#747474" : "rgba(116, 116, 116, 0.4)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.$isSelected ? "#fff" : "rgba(255, 255, 255, 0.4)"};
  font-size: 13px;
  font-weight: 700;
  text-align: center;
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

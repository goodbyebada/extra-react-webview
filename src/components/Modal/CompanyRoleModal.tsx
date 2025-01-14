import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RoleRegister, SeasonEnum } from "@api/interface";
import Modal from "@components/atoms/Modal";
import { MainButton, BoxButton } from "@components/atoms/Button";
import Text from "@components/atoms/Text";
import TypeSelector from "@components/mocules/company/TypeSelectorButton";

/**
 * 관리자 공고 화면 역할 상세 프로필(역할 등록) 모달
 *
 * 수정할 것
 * 1. API 연결 시 역할 상세 프로필 등록과 수정 구분
 * 2. 데이터가 있다면 수정, 없다면 등록
 *
 * 역할 등록 === 역할 생성
 * roleBodyType으로 수정 부탁드립니다.
 */

interface CompanyRoleModalProps {
  onSubmit: (role: RoleRegister) => void;
  closeModal: () => void;
  isVisible: boolean;
}

type TattooPart =
  | "face"
  | "chest"
  | "arm"
  | "leg"
  | "shoulder"
  | "back"
  | "hand"
  | "feet";

type TattooNames = {
  [key in TattooPart]: string;
};

const tattooNames: TattooNames = {
  face: "얼굴",
  chest: "가슴",
  arm: "팔",
  leg: "다리",
  shoulder: "어깨",
  back: "등",
  hand: "손",
  feet: "발",
};

function CompanyRoleModal({
  onSubmit,
  closeModal,
  isVisible,
}: CompanyRoleModalProps) {
  const [formState, setFormState] = useState<RoleRegister>({
    job_post_id: 1, // 임시, API 연결 시 수정
    sex: true, // 남: true, 여: false
    min_age: 0,
    max_age: 0,
    season: "SPRING",
    costume: "",
    etc: "",
    limit_personnal: 0,
    tattoo: {
      face: false,
      chest: false,
      arm: false,
      leg: false,
      shoulder: false,
      back: false,
      hand: false,
      feet: false,
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleGenderSelect = (value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      sex: value === "남",
    }));
  };

  const handleSeasonSelect = (value: string) => {
    if (Object.values(SeasonEnum).includes(value as keyof typeof SeasonEnum)) {
      setFormState((prevState) => ({
        ...prevState,
        season: value as keyof typeof SeasonEnum,
      }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTattooClick = (part: TattooPart) => {
    setFormState((prevState) => {
      const newTattoo = { ...prevState.tattoo };
      newTattoo[part] = !newTattoo[part];
      return {
        ...prevState,
        tattoo: newTattoo,
      };
    });
  };

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(formState);
      closeModal();
    }
  };

  useEffect(() => {
    const { min_age, max_age, costume, limit_personnal } = formState;
    const isValid =
      min_age > 0 && max_age > 0 && costume !== "" && limit_personnal > 0;
    setIsFormValid(isValid);
  }, [formState]);

  return (
    <Modal isVisible={isVisible} onClose={closeModal}>
      <RoleBoxWrapper>
        <Row>
          <Text size={20} weight={900} color="#fff">
            1.성별 :
          </Text>
          <TypeSelector
            options={["남", "여"]}
            selected={formState.sex ? "남" : "여"}
            onSelect={handleGenderSelect}
          />
        </Row>
        <Row>
          <Text size={20} weight={900} color="#fff">
            2.나이 :
          </Text>
          <NumInput
            type="number"
            name="min_age"
            value={formState.min_age}
            onChange={handleChange}
          />
          <AgeSeparator>~</AgeSeparator>
          <NumInput
            type="number"
            name="max_age"
            value={formState.max_age}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Text size={20} weight={900} color="#fff">
            3.계절 :
          </Text>
          <TypeSelector
            options={Object.values(SeasonEnum)}
            selected={formState.season || "SPRING"}
            onSelect={handleSeasonSelect}
          />
        </Row>
        <Row>
          <Text size={20} weight={900} color="#fff">
            4.의상 :
          </Text>
          <Input
            name="costume"
            spellCheck="false"
            value={formState.costume}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <RowWithTattoo>
            <Text size={20} weight={900} color="#fff">
              5.문신여부 :
            </Text>
            <TattooContainer>
              <TattooRow>
                {Object.keys(tattooNames)
                  .splice(0, 4)
                  .map((part, index) => {
                    const typedPart = part as TattooPart;
                    return (
                      <BoxButton
                        key={index}
                        onClick={() => handleTattooClick(typedPart)}
                        isActive={formState.tattoo[typedPart]}
                      >
                        {tattooNames[typedPart]}
                      </BoxButton>
                    );
                  })}
              </TattooRow>
              <TattooRow>
                {Object.keys(tattooNames)
                  .splice(4, 8)
                  .map((part, index) => {
                    const typedPart = part as TattooPart;
                    return (
                      <BoxButton
                        key={index}
                        onClick={() => handleTattooClick(typedPart)}
                        isActive={formState.tattoo[typedPart]}
                      >
                        {tattooNames[typedPart]}
                      </BoxButton>
                    );
                  })}
              </TattooRow>
            </TattooContainer>
          </RowWithTattoo>
        </Row>
        <Row>
          <Text size={20} weight={900} color="#fff">
            6.기타사항 :
          </Text>
          <Input
            name="etc"
            spellCheck="false"
            value={formState.etc}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Text size={20} weight={900} color="#fff">
            7.인원 :
          </Text>
          <NumInput
            type="number"
            name="limit_personnal"
            value={formState.limit_personnal}
            onChange={handleChange}
          />
        </Row>
      </RoleBoxWrapper>
      <MainButton isActive={isFormValid} onClick={handleSubmit}>
        확인
      </MainButton>
    </Modal>
  );
}

export default CompanyRoleModal;

const RoleBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: nowrap;
`;

const RowWithTattoo = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  background: transparent;
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  border: none;
  outline: none;
  padding: 5px;
  margin: 0 10px;
`;

const NumInput = styled.input`
  width: 60px;
  height: 35px;
  text-align: center;
  background: transparent;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  border: none;
  outline: none;
  padding: 5px;
`;

const AgeSeparator = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 900;
  margin-left: -12px;
`;

const TattooContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 20px;
`;

const TattooRow = styled.div`
  display: flex;
  gap: 8px;
`;

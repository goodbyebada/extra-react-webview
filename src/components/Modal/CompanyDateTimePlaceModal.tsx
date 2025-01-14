import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Modal from "@components/atoms/Modal";
import { MainButton } from "@components/atoms/Button";
import Text from "@components/atoms/Text";

interface CompanyDateTimePlaceModalProps {
  onSubmit: (date: string, time: string, place: string) => void;
  closeModal: () => void;
  isVisible: boolean;
}

export type FormType = {
  date: string;
  time: string;
  place: string;
};

/**
 * CompanyDateTimePlaceModal : 공고 등록 - 날짜,시간,장소 추가 모달
 * onSubmit: date, time, place
 * isVisible: boolean
 * closeModal: () => void
 */

function CompanyDateTimePlaceModal({
  onSubmit,
  closeModal,
  isVisible,
}: CompanyDateTimePlaceModalProps) {
  const [formState, setFormState] = useState<FormType>({
    date: "",
    time: "",
    place: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      formState.date !== "" && formState.time !== "" && formState.place !== "",
    );
  }, [formState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "date":
        setFormState((prevState) => ({
          ...prevState,
          date: value,
        }));
        break;
      case "time":
        setFormState((prevState) => ({
          ...prevState,
          time: value,
        }));
        break;
      case "place":
        setFormState((prevState) => ({
          ...prevState,
          place: value,
        }));
        break;
    }
  };

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(formState.date, formState.time, formState.place);
      closeModal();
    }
  };

  return (
    <Modal isVisible={isVisible} onClose={closeModal}>
      <RoleBoxWrapper>
        <Row>
          <Text size={20} weight={900} color="#fff">
            날짜 :
          </Text>
          <Input
            name="date"
            type="date"
            value={formState.date}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Text size={20} weight={900} color="#fff">
            시간 :
          </Text>
          <Input
            name="time"
            type="time"
            value={formState.time}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Text size={20} weight={900} color="#fff">
            장소 :
          </Text>
          <Input name="place" value={formState.place} onChange={handleChange} />
        </Row>
        <MainButton isActive={isFormValid} onClick={handleSubmit}>
          확인
        </MainButton>
      </RoleBoxWrapper>
    </Modal>
  );
}

export default CompanyDateTimePlaceModal;

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
  background: #333;
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  border: 1px solid #555;
  border-radius: 5px;
  outline: none;
  padding: 5px;
  margin: 0 10px;
`;

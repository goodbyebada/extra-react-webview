import styled from "styled-components";
import React, { useState, useEffect } from "react";

interface CompanyDateTimePlaceModalProps {
  onSubmit: (date: string, time: string, place: string) => void;
  closeModal: () => void;
}

export type FormType = {
  date: string;
  time: string;
  place: string;
};

function CompanyDateTimePlaceModal({
  onSubmit,
  closeModal,
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
    <ModalOverlay>
      <ModalBackground onClick={closeModal} />
      <ModalContainer>
        <RoleBoxWrapper>
          <Row>
            <Txt>날짜 :</Txt>
            <Input
              name="date"
              type="date"
              value={formState.date}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <Txt>시간 :</Txt>
            <Input
              name="time"
              type="time"
              value={formState.time}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <Txt>장소 :</Txt>
            <Input
              name="place"
              value={formState.place}
              onChange={handleChange}
            />
          </Row>
          <Btn $isValid={isFormValid} onClick={handleSubmit}>
            확인
          </Btn>
        </RoleBoxWrapper>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default CompanyDateTimePlaceModal;

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
  position: absolute;
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

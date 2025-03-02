import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "@components/atoms/Modal";
import { MainButton } from "@components/atoms/Button";
import Text from "@components/atoms/Text";
import { MdOutlineAddBox } from "react-icons/md";

interface CompanyAddRoleModalProps {
  onSubmit: (roleName: string) => void;
  closeModal: () => void;
  isVisible: boolean;
}

/**
 * CompanyAddRoleModal : 공고 등록 - 제목, 카테고리 추가 모달
 * onSubmit: (roleName: string) => void;
 * isVisible: 모달 표시 여부
 * closeModal: 모달 닫기 함수
 */

interface CompanyAddRoleModalProps {
  onSubmit: (roleName: string) => void;
  closeModal: () => void;
  isVisible: boolean;
  initialRoleName?: string;
}

function CompanyAddRoleModal({
  onSubmit,
  closeModal,
  isVisible,
  initialRoleName = "",
}: CompanyAddRoleModalProps) {
  const [roleName, setRoleName] = useState<string>(initialRoleName);

  const isSubmitActive = roleName !== "";

  useEffect(() => {
    if (isVisible) {
      setRoleName(initialRoleName);
    }
  }, [isVisible, initialRoleName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.target.value);
  };

  const handleSubmit = () => {
    if (roleName !== "") {
      onSubmit(roleName);
      closeModal();
    }
  };

  return (
    <Modal isVisible={isVisible} onClose={closeModal}>
      <RoleBoxWrapper>
        <Row>
          <Text size={20} weight={900} color="#fff">
            역할
          </Text>
          <Input
            name="role"
            placeholder="역할"
            value={roleName}
            onChange={handleChange}
            spellCheck="false"
          />
        </Row>
        <MdOutlineAddBox
          size={55}
          color="#fff"
          style={{ marginBottom: "50px" }}
        />
        <MainButton isActive={isSubmitActive} onClick={handleSubmit}>
          확인
        </MainButton>
      </RoleBoxWrapper>
    </Modal>
  );
}

export default CompanyAddRoleModal;

const RoleBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
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
  border-bottom: 1px solid #fff;
  outline: none;
  padding: 5px;
  margin: 0 25px;
`;

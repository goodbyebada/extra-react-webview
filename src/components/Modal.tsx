import React from "react";
import styled from "styled-components";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalBackdrop = styled.div.attrs<{ isVisible: boolean }>(
  ({ isVisible }) => ({
    style: {
      display: isVisible ? "flex" : "none",
    },
  }),
)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #302e34;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  z-index: 1001;
  width: 300px;
`;

const Modal = ({ isVisible, onClose, children }: ModalProps) => {
  const handleBackdropClick = () => {
    onClose();
  };

  const handleContentClick = (event: React.MouseEvent) => {
    // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지
    event.stopPropagation();
  };

  return (
    <ModalBackdrop isVisible={isVisible} onClick={handleBackdropClick}>
      <ModalContent onClick={handleContentClick}>{children}</ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;

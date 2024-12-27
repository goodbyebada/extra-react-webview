import React from "react";
import styled from "styled-components";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Common Modal
 * @param children string (modal inner text)
 * @param  onClose () => void (onClose method)
 * @param isVisible boolean (visivle type)
 */

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
      <ModalWrapper onClick={handleContentClick}>{children}</ModalWrapper>
    </ModalBackdrop>
  );
};

export default Modal;

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
  z-index: 10;
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background:
    linear-gradient(#000, #000) padding-box,
    linear-gradient(180deg, #666666 0%, #f5c001 100%) border-box;
  border: 3px solid transparent;
  width: 80%;
  max-width: 400px;
  min-height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  z-index: 10;
`;

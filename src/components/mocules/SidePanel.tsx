import { useEffect } from "react";
import styled from "styled-components";
import { COLORS, FONT_COLORS } from "@/styled/colors";

// 사이드 패널 컴포넌트
export const SidePanel = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <Panel>{children}</Panel>
    </Overlay>
  );
};

// TODO "desktop" | "tablet" | "phone"에 따라 width가 변경되어야함

const Overlay = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  color: ${({ isOpen }) => (isOpen ? `${FONT_COLORS.gray}` : "transparent")};

  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  z-index: 100000;
`;

const Panel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background-color: ${COLORS.darkGray};
`;

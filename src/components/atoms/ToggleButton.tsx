import styled from "styled-components";

interface ToggleButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const ToggleWrapper = styled.div<{ isActive: boolean }>`
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ isActive }) => (isActive ? "#f5c001" : "#cccccc")};
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ToggleBall = styled.div<{ isActive: boolean }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: white;
  transform: ${({ isActive }) =>
    isActive ? "translateX(30px)" : "translateX(0)"};
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ToggleButton = ({ isActive, onClick }: ToggleButtonProps) => {
  return (
    <ToggleWrapper isActive={isActive} onClick={onClick}>
      <ToggleBall isActive={isActive} />
    </ToggleWrapper>
  );
};

export default ToggleButton;

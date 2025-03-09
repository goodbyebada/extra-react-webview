import styled from "styled-components";
import { IoArrowBackOutline } from "react-icons/io5";

interface HeaderProps {
  title: string;
  onBack: () => void;
}

const BackHeader = ({ title, onBack }: HeaderProps) => {
  return (
    <HeaderContainer>
      <IoArrowBackOutline color="#fff" size={24} onClick={onBack} />
      <Title>{title}</Title>
      <IconWrapper />
    </HeaderContainer>
  );
};

export default BackHeader;

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: transparent;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
`;

import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Color from "@/constants/color";
import { Container } from "@components/atoms/Container";
import Text from "@components/atoms/Text";

import { FaAngleRight } from "react-icons/fa6";

interface LinkButtonProps {
  url: string;
  title: string;
}

const StyledLinkButton = styled.button`
  width: 180px;
  height: 120px;

  padding: 20px;

  border-radius: 20px;

  background: ${Color.input};
`;

const DashboardLinkButton = ({ url, title }: LinkButtonProps) => {
  const navigate = useNavigate();

  return (
    <StyledLinkButton
      onClick={(e) => {
        e.stopPropagation();
        navigate(url);
      }}
    >
      <Container alignItems="flex-start" flex={50} background="none">
        <Text size={24} weight={900}>
          {title}
        </Text>
      </Container>
      <Container alignItems="flex-end" flex={50} background="none">
        <FaAngleRight color={Color.text} size={24} />
      </Container>
    </StyledLinkButton>
  );
};

export default DashboardLinkButton;

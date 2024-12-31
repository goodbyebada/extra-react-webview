import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Container from "@components/atoms/Container";
import Text from "@components/atoms/Text";

import { FaAngleRight } from "react-icons/fa6";
import { BACKGROUND_COLORS, FONT_COLORS } from "@/styled/colors";

interface LinkButtonProps {
  url: string;
  title: string;
}

const StyledLinkButton = styled.button`
  width: 180px;
  height: 120px;

  padding: 20px;

  border-radius: 20px;

  background: ${BACKGROUND_COLORS.card};
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
      <Container alignItems="flex-start" flex={50}>
        <Text size={24} weight={900}>
          {title}
        </Text>
      </Container>
      <Container alignItems="flex-end" flex={50}>
        <FaAngleRight color={FONT_COLORS.white} size={24} />
      </Container>
    </StyledLinkButton>
  );
};

export default DashboardLinkButton;

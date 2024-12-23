import TypeSelector from "@components/mocules/TypeSelector";
import AllOrRecommendationToggleBar from "@components/mocules/ToggleBar";
import { styled } from "styled-components";
import { WithChildrenProps } from "@components/atoms/Wrapper";

const StyledSpaceBetweenNavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SpaceBetweenNavBar = ({ children }: WithChildrenProps) => {
  return <StyledSpaceBetweenNavBar>{children}</StyledSpaceBetweenNavBar>;
};

export function HomeNavBar() {
  return (
    <SpaceBetweenNavBar>
      <AllOrRecommendationToggleBar />
      <TypeSelector />
    </SpaceBetweenNavBar>
  );
}

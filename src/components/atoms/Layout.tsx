import { styled } from "styled-components";
import { WithChildrenProps } from "@components/atoms/Wrapper";
import { COLORS } from "@styled/colors";

interface LayOutProps extends WithChildrenProps {
  backGroundColor?: string | undefined;
}

interface WrapperProps extends LayOutProps {
  handler?: () => void;
}

const Layout = styled.div<{ $backGroundColor: string | undefined }>`
  width: 100%;
  height: 100%;
  max-height: 100vh;
  box-sizing: border-box;
  background-color: ${({ $backGroundColor }) =>
    $backGroundColor ? $backGroundColor : COLORS.black};
`;

const LayoutComponent = ({ children, backGroundColor }: LayOutProps) => {
  return <Layout $backGroundColor={backGroundColor}>{children}</Layout>;
};

const HandlerWrapper = ({ children, handler }: WrapperProps) => {
  return <div onClick={handler}>{children}</div>;
};

export const StyledHeader = styled.header<{
  $backGroundColor: string | undefined;
}>`
  z-index: 10;
  position: sticky;
  top: 0;
  padding: 10px;
  background-color: ${({ $backGroundColor }) =>
    $backGroundColor ? $backGroundColor : COLORS.black};
`;

const Header = ({ children, backGroundColor }: LayOutProps) => {
  return (
    <StyledHeader $backGroundColor={backGroundColor}>{children}</StyledHeader>
  );
};

const StyledSpaceBetweenNavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding: 10px;
  width: 100%;
`;

const SpaceBetweenNavBar = ({ children }: WithChildrenProps) => {
  return <StyledSpaceBetweenNavBar>{children}</StyledSpaceBetweenNavBar>;
};

export { LayoutComponent, HandlerWrapper, Header, SpaceBetweenNavBar };

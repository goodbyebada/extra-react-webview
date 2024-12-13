import { styled } from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100vh;
`;

const CenteredLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LayoutComoponent = ({ children }: LayoutProps) => {
  return <Layout>{children}</Layout>;
};

const CenteredLayoutComponent = ({ children }: LayoutProps) => {
  return <CenteredLayout>{children}</CenteredLayout>;
};

export { LayoutComoponent, CenteredLayoutComponent };

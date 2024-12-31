import React, { forwardRef, HTMLAttributes } from "react";
import styled from "styled-components";
import { BACKGROUND_COLORS } from "@/styled/colors";
import Container from "@components/atoms/Container";
import type { ContainerProps } from "@components/atoms/Container";

const defaultBackgroundColor = BACKGROUND_COLORS.default;

interface WindowProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  background?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
}

const StyledWindow = styled.div`
  margin: 0 auto;
  max-width: 460px;
  height: 100vh;
  background: ${defaultBackgroundColor};

  overflow: hidden;
`;

const Window = forwardRef<HTMLDivElement, WindowProps>(
  (
    {
      children,
      background,
      paddingHorizontal = 0,
      paddingVertical = 0,
      ...props
    }: ContainerProps,
    ref,
  ) => {
    return (
      <StyledWindow>
        <Container
          background={background}
          ref={ref}
          paddingHorizontal={paddingHorizontal}
          paddingVertical={paddingVertical}
          {...props}
        >
          {children}
        </Container>
      </StyledWindow>
    );
  },
);
Window.displayName = "Window";

export default Window;

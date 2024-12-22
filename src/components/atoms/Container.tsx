import React, { forwardRef } from "react";
import styled from "styled-components";
import getPlatform from "@utills/getPlatform";
import Color from "@/constants/color";

interface WindowProps {
  children: React.ReactNode;
  background?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
}

interface ContainerProps extends WindowProps {
  flex?: number;
  flexDirection?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  alignItems?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  flexWrap?: boolean;
}

const WebWindow = styled.div`
  width: 100vw;
  height: 100vh;
  background: #aaa;
  box-sizing: border-box;
`;

const StyledWindow = styled.div`
  margin: 0 auto;
  max-width: 460px;
  height: 100vh;
  background: ${Color.background};

  overflow: hidden;
`;

const StyledContainer = styled.div<ContainerProps>`
  ${({ flexDirection, flex }) => {
    if (flexDirection == "row") {
      return `
            width: ${flex}%;
            height: 100%;
        `;
    } else {
      return `
              width: 100%;
              height: ${flex}%;
          `;
    }
  }}
  box-sizing: border-box;

  background: ${({ background }) => background || Color.background};

  padding: ${({ paddingVertical, paddingHorizontal }) => {
    return `${paddingVertical}px ${paddingHorizontal}px`;
  }};

  position: relative;

  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-direction: ${({ flexDirection }) => flexDirection};
  ${({ flexWrap }) => flexWrap && `flex-wrap: wrap`}
`;

const PlatformWindow = ({ children }: ContainerProps) => {
  switch (getPlatform()) {
    case "Android":
    case "iOS":
      return <StyledWindow>{children}</StyledWindow>;
    case "Windows":
    case "MacOS":
    default:
      return (
        <WebWindow>
          <StyledWindow>{children}</StyledWindow>
        </WebWindow>
      );
  }
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      background,
      flex = 100,
      paddingVertical = 0,
      paddingHorizontal = 0,
      justifyContent = "center",
      alignItems = "center",
      flexDirection = "column",
      flexWrap = false,
    }: ContainerProps,
    ref,
  ) => {
    return (
      <StyledContainer
        background={background}
        ref={ref}
        flex={flex}
        paddingHorizontal={paddingHorizontal}
        paddingVertical={paddingVertical}
        justifyContent={justifyContent}
        alignItems={alignItems}
        flexDirection={flexDirection}
        flexWrap={flexWrap}
      >
        {children}
      </StyledContainer>
    );
  },
);
Container.displayName = "Container";

const Window = forwardRef<HTMLDivElement, WindowProps>(
  (
    {
      children,
      background,
      paddingHorizontal = 0,
      paddingVertical = 0,
    }: ContainerProps,
    ref,
  ) => {
    return (
      <PlatformWindow>
        <Container
          background={background}
          ref={ref}
          paddingHorizontal={paddingHorizontal}
          paddingVertical={paddingVertical}
        >
          {children}
        </Container>
      </PlatformWindow>
    );
  },
);
Window.displayName = "Window";

export { Window, Container };

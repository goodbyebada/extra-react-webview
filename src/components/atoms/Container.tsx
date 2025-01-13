import React, { forwardRef, HTMLAttributes } from "react";
import styled from "styled-components";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  background?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
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

  background: ${({ background }) => background || "none"};

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
      ...props
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
        {...props}
      >
        {children}
      </StyledContainer>
    );
  },
);
Container.displayName = "Container";

export default Container;
export type { ContainerProps };

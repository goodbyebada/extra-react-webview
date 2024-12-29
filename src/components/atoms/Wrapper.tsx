import React from "react";
import styled from "styled-components";
// children props 공통적으로 사용할 수 있게 선언함
export interface WithChildrenProps {
  children: React.ReactNode;
}

interface WrapperProps {
  children: React.ReactNode;
}

interface StatusWrapperProps extends WrapperProps {
  status: "applied" | "rejected" | "approved";
  bg?: string;
}

interface ItemWrapperProps extends WrapperProps {
  highlight?: boolean;
}

interface CalendarItemWrapperProps extends ItemWrapperProps {
  size?: number;
  isActive: boolean;
}

const StyledWrapper = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const StyledTagWrapper = styled(StyledWrapper)`
  background: #d9d9d9;
  border-radius: 20px;
  padding: 0 7px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledStatusWrapper = styled(StyledTagWrapper)<StatusWrapperProps>`
  border-width: 1px;
  border-style: solid;
  padding: 3px 8px;

  ${({ status, bg }) => {
    if (bg) {
      return `
            border-color: ${bg};
            background: ${bg};
        `;
    }
    switch (status) {
      case "applied":
        return `
            border-color: #767676;
            background: #d9d9d9;
        `;
      case "approved":
        return `
            border-color: #23d014;
            background: #23d014;
        `;
      case "rejected":
        return `
            border-color: #ff0000;
            background: #ff0000;
        `;
    }
  }}
`;

const StyledItemWrapper = styled(StyledWrapper)<ItemWrapperProps>`
  border-radius: 20px;
  width: 365px;
  height: 145px;

  ${({ highlight }) => {
    if (highlight) {
      return `
            border: 3px solid transparent;
            background: linear-gradient(#191919, #191919), linear-gradient(to bottom, #3c3c3c 0%, #f5c001 100%);
            background-origin: border-box;
            background-clip: content-box, border-box;
        `;
    } else {
      return `
        background: #191919;
        border: 1px solid #3c3c3c;
        `;
    }
  }}
`;

const StyledItemContentWrapper = styled(StyledWrapper)<ItemWrapperProps>`
  width: 100%;
  height: 100%;

  padding: ${({ highlight }) => (highlight ? "15px 20px;" : "17px 22px;")};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCalendarItemWrapper = styled(
  StyledWrapper,
)<CalendarItemWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  ${({ size }) => {
    if (size) {
      return `
            width: ${size}px;
            height: ${size}px;
        `;
    } else {
      return `
              width: 53px;
              height: 53px;
          `;
    }
  }}

  ${({ isActive, highlight }) => {
    if (isActive) {
      return `
            border: 2px solid transparent;
            background: linear-gradient(#212121, #212121), linear-gradient(to bottom, #3d3d3d 0%, ${highlight ? "#f5c001" : "#a3a3a3"} 100%);
            background-origin: border-box;
            background-clip: content-box, border-box;
        `;
    } else {
      return `
            background: #212121;
            border: 2px solid #3d3d3d;
      `;
    }
  }}
`;

/*
  Tag Wrapper
 */
const TagWrapper = ({ children }: WrapperProps) => {
  return <StyledTagWrapper>{children}</StyledTagWrapper>;
};

/**
 * Status Tag Wrapper
 */
const StatusWrapper = ({
  children,
  status = "applied",
}: StatusWrapperProps) => {
  return <StyledStatusWrapper status={status}>{children}</StyledStatusWrapper>;
};

/**
 * Recruit List Item Wrapper
 */
const ItemWrapper = ({ children, highlight = false }: ItemWrapperProps) => {
  return (
    <StyledItemWrapper highlight={highlight}>
      <StyledItemContentWrapper highlight={highlight}>
        {children}
      </StyledItemContentWrapper>
    </StyledItemWrapper>
  );
};

/**
 * Recruit Calendar Item Wrapper
 */
const CalendarItemWrapper = ({
  children,
  highlight = false,
  isActive,
  size = 53,
}: CalendarItemWrapperProps) => {
  return (
    <StyledCalendarItemWrapper
      highlight={highlight}
      size={size}
      isActive={isActive}
    >
      {children}
    </StyledCalendarItemWrapper>
  );
};

export { TagWrapper, StatusWrapper, ItemWrapper, CalendarItemWrapper };

import styled from "styled-components";

interface MarginProps {
  direction?: "horizontal" | "vertical";
  size: number;
}

const StyledMargin = styled.div<MarginProps>`
  ${({ direction, size }) => {
    if (direction == "horizontal") {
      return `width: ${size}px`;
    } else {
      return `height: ${size}px`;
    }
  }}
`;

/**
 * @param direction "horizontal" | "vertical" (margin direction)
 * @param size number (margin size)
 */
const Margin = ({ direction = "vertical", size }: MarginProps) => {
  return <StyledMargin direction={direction} size={size} />;
};

export default Margin;

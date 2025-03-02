import styled from "styled-components";

interface ImageProps {
  children?: React.ReactNode;
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
}

/**
 * Clothes Image : 의상 이미지 컴포넌트
 * @param src string
 * @param  alt string
 * @param width string
 * @param height string
 */

const ImageComponent = ({ src, alt, width, height }: ImageProps) => (
  <StyledImageBox width={width} height={height}>
    <img src={src} alt={alt} />
  </StyledImageBox>
);

export default ImageComponent;

const StyledImageBox = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "230px"};
  background-color: #ccc;
  border-radius: 12px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

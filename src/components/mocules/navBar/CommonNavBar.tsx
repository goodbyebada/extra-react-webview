import { SpaceBetweenNavBar } from "@components/atoms/Layout";
import { styled } from "styled-components";
import { BackButton } from "@components/atoms/Button";
import { BACKGROUND_COLORS, COLORS } from "@styled/colors";

//TODO z-index 통일해야함 -> 논의 예정
// TODO theme에 따라 background color 바뀌어야한다.
// TODO Wrapper 높이 크기 고정 || 전달해야함-> 가리기 때문에
// fixed 설정 시, width 따로 지정해줘야함
const Wrapper = styled.div<{ sticky?: boolean; bottomLine?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${BACKGROUND_COLORS.default};
  height: 80px;

  ${({ sticky }) =>
    sticky &&
    `
      position: sticky;
      top: 0;
      z-index: 10; 
  `}

  border-bottom: ${({ bottomLine }) =>
    bottomLine ? `2px solid ${COLORS.white}` : ""}
`;

export function NavBar({
  children,
  sticky = true,
  bottomLine = false,
}: {
  children: React.ReactNode;
  sticky?: boolean;
  bottomLine?: boolean;
}) {
  return (
    <Wrapper sticky={sticky} bottomLine={bottomLine}>
      <BackButton />
      <SpaceBetweenNavBar>{children}</SpaceBetweenNavBar>
    </Wrapper>
  );
}

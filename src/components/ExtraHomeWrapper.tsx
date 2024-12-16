import { styled } from "styled-components";
import ToggleBar from "@components/custom/ToggleBar";
import TypeSelector from "@components/custom/TypeSelector";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { USER_NAME } from "@/testFlag";

/**
 * 보조 출연자 홈화면
 *
 * @returns 보조 출연자 홈화면 UI
 */
export default function ExtraHomeWrapper({
  children,
}: {
  children: ReactNode;
}) {
  // 전체 || 추천
  const showRecommand = useSelector(
    (state: RootState) => state.showType.showRecommand,
  );
  const name = USER_NAME;

  return (
    <div className="extras-home">
      <TopBar>
        <Wrapper>
          <ToggleBar />
          <TypeSelector />
        </Wrapper>

        <h1>
          {!showRecommand
            ? `지금 당장 ${name}님이 필요해요 ⏰`
            : `${name}님한테 딱 맞는 역할이 있어요 🤩`}
        </h1>
      </TopBar>

      {children}
    </div>
  );
}

export const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopBar = styled.div`
  padding: 0 22px;
  position: sticky;
  top: 0;
  z-index: 9;
  background-color: #000000;
  padding-top: 25px;

  padding-bottom: 23px;

  h1 {
    color: #fff;
    font-size: 20px;
    font-weight: 900;
    line-height: 100%;
    letter-spacing: 0.2px;
    margin-top: 21px;
    top: 30px;
  }

  @media all and (max-width: 375px) {
    h1 {
      font-size: 18px;
    }
  }
`;

import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { useDispatch } from "react-redux";
import { setTypetoggle } from "@redux/home/showTypeSlice";

/**
 * 기본 상태 전체
 * toggle True시 : 전체
 * toggle False시 : 추천
 */
export default function ToggleBar() {
  const toggle = useSelector(
    (state: RootState) => state.showType.showRecommand,
  );
  const dispatch = useDispatch();
  const toggleHandler = () => dispatch(setTypetoggle());

  return (
    <Container>
      <label htmlFor="filter" className="switch" aria-label="Toggle Filter">
        <input
          type="checkbox"
          id="filter"
          onChange={toggleHandler}
          checked={toggle}
        />

        <Item $on={!toggle}>전체</Item>
        <Item $on={toggle}>추천</Item>
      </label>
    </Container>
  );
}

const Item = styled.span<{ $on: boolean }>`
  color: ${(props) => (props.$on ? "#000;" : "#7A7A7A")};
`;

const Container = styled.div`
  font-weight: 900;
  .switch {
    /* switch 배경 */
    --_switch-bg-clr: #252525;
    --_switch-padding: 4px; /* padding around button*/
    --_switch-border-clr: #707070;
    --_switch-txt-clr: #7a7a7a;

    /* slider color unchecked */
    --_slider-bg-clr: #252525;

    /* slider color checked */
    --_slider-bg-clr-on: rgba(245, 192, 1, 1);
    --_width: 128px;

    width: var(--_width);
    height: 27px;
    display: flex;
    align-items: center;

    position: relative;
    border-radius: 26px;
    border: solid 1px var(--_switch-border-clr);
    background-color: var(--_switch-bg-clr);
    position: relative;

    /**text & font */
    font-size: 12px;
    line-height: 166.667%;
    letter-spacing: 0.12px;

    /* span 초기화 */
    & span {
      width: 100%;
      text-align: center;
      z-index: 2;
    }
  }

  input[type="checkbox"] {
    appearance: none;
    text-align: center;
    order: 0;
  }

  input[type="checkbox"]::before {
    display: flex;
    justify-content: center;
    align-items: center;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: calc(var(--_width) / 2);
    height: 100%;
    border-radius: 13px;
    border-width: 2px;
    background-color: #f5c001;
    transition: left 250ms linear;
  }

  [type="checkbox"]:checked::before {
    left: calc(var(--_width) / 2);
  }
`;

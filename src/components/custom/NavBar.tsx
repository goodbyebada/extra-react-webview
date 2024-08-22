import { styled } from "styled-components";

import navBtn from "@assets/more-than-button.png";
//import { useNavigate } from "react-router-dom";

import { sendMessage } from "@api/utils";

type NavBarProps = {
  content: string;
};

/**
 * 버튼 누를 시 이전 화면으로 이동한다.
 *
 * @param param0 navBar에 작성될 내용
 * @returns navBar UI
 */
export default function NavBar({ content }: NavBarProps) {
  //  const navigate = useNavigate();

  return (
    <NavContainer>
      <div className="wrapper">
        <button
          onClick={() => {
            // navigate(-1)

            sendMessage({
              type: "HISTORY_BACK",
              version: "1.0",
            });
          }}
        >
          <img src={navBtn}></img>
        </button>

        <span id="content">{content}</span>
      </div>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  --_nav-height: 120px;

  background: #000;
  z-index: 10;
  position: sticky;
  height: var(--_nav-height);
  top: 0;

  font-size: 32px;
  font-weight: 900;
  line-height: 62.5%;
  letter-spacing: 0.32px;

  display: flex;
  align-items: center;

  .wrapper {
    box-sizing: border-box;
    padding-left: 30px;
    display: flex;
    align-items: center;
  }

  #content {
    margin: 0px 20px;
    height: 100%;
    line-height: var(--_nav-height);
  }

  button {
    display: flex;
    justify-content: center;
    align-self: center;

    img {
      width: 25px;
      height: 25px;
      transform: rotate(-180deg);
    }
  }
`;

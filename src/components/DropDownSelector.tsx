import { useState } from "react";
import dropDownBtn from "@assets/more-than-button.png";
import { styled } from "styled-components";
import { ApplyStatusLabel } from "@api/interface";

export default function DropDownSelector({
  currentIdx,
  modalIdxList,
  handler,
}: {
  currentIdx: number;
  modalIdxList: number[];
  handler: (value: number) => void;
}) {
  const [clicked, setClicked] = useState(false);

  return (
    <Container>
      <div className="item">
        {ApplyStatusLabel[currentIdx]}
        <button
          onClick={() => {
            setClicked((prev) => !prev);
          }}
          className={clicked ? "clicked" : ""}
        >
          <img src={dropDownBtn} alt="dropDownBtn" />
        </button>

        {clicked ? (
          <ul className="dropDown-list">
            {modalIdxList.map((idx, key) => {
              return (
                <li
                  key={key}
                  onClick={() => {
                    handler(idx);
                    setClicked(false);
                  }}
                >
                  {ApplyStatusLabel[idx]}
                </li>
              );
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
}

const Container = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 111.111%;
  letter-spacing: 0.18px;

  > * {
    padding: 5px;
  }

  .item {
    width: 110px;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dropDown-list {
    position: absolute;
    min-width: 110px;
    top: 40px;
    left: 0px;
    right: 0px;
    border-radius: 10px;
    background: #383838;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    text-align: center;
    z-index: 9;
    overflow-y: scroll;
    font-size: 16px;
    > * {
      font-weight: 700;
      line-height: 150%;
      margin: 3px;
    }
  }
  button {
    background-color: transparent;
    border: 0px;
    transform: rotate(90deg);
    padding: 5px;
    &.clicked {
      img {
        transform: rotate(-180deg);
      }
    }
    img {
      width: 17px;
      height: 17px;
    }
  }
`;

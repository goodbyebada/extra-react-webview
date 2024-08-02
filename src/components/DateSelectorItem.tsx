import { useState } from "react";
import dropDownBtn from "@assets/more-than-button.png";
import { styled } from "styled-components";

export default function DateSelectorItem({
  type,
  value,
  modalList,
  dateHandler,
}: {
  type: string;
  value: number;
  modalList: number[];
  dateHandler: (type: string, value: number) => void;
}) {
  const [clicked, setClicked] = useState(false);

  return (
    <Container>
      <span className="date-item" id={type}>
        {value}
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
            {modalList.map((date, key) => {
              return (
                <li
                  key={key}
                  onClick={() => {
                    dateHandler(type, date);
                    setClicked(false);
                  }}
                >
                  {date}
                </li>
              );
            })}
          </ul>
        ) : (
          ""
        )}
      </span>
    </Container>
  );
}

const Container = styled.span`
  font-size: 32px;
  font-weight: 900;
  line-height: 62.5%;
  letter-spacing: 0.32px;

  > * {
    padding: 5px;
  }

  .date-item {
    position: relative;

    &#year {
      .dropDown-list {
        position: absolute;
        width: 123px;
        height: 157px;
      }
    }

    &#month {
      .dropDown-list {
        position: absolute;
        left: 0px;
        width: 65px;
        height: 157px;
      }
    }

    .dropDown-list {
      border-radius: 10px;
      background: #383838;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      text-align: center;
      z-index: 9;
      overflow-y: scroll;

      > * {
        font-size: 16px;
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
        width: 25px;
        height: 25px;
      }
    }
  }
`;

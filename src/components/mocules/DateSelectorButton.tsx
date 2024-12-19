import { useState, useRef, useEffect } from "react";
import dropDownBtn from "@assets/more-than-button.png";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import Text from "@components/atoms/Text";
import { FONT_COLORS } from "@/styled/colors";
import { FONT_SIZE } from "@/styled/font";
import { DATE_SELECTOR_SIZE } from "@/styled/size";

type DateReducer = (
  elem: { month: number } | { year: number },
) =>
  | { payload: any; type: "selectedDate/setHomeDate" }
  | { payload: any; type: "selectedDate/setScheduleDate" };

/**
 *
 * @param param0
 * @returns
 * Button 변경했을때 dispatch 함
 */

export default function DateSelectorButton({
  setDateActionByType,
  type,
  value,
  modalList,
}: {
  setDateActionByType: DateReducer;
  type: string;
  value: number;
  modalList: number[];
}) {
  // TODO 반응형에 따라 달라지는 Heigth 처리 어떻게 할 것인지 고민
  const LI_ITEM_HEIGHT = DATE_SELECTOR_SIZE.liItemHeight;

  const [btnClicked, setBtnClicked] = useState(false);
  const ulRef = useRef<HTMLUListElement>(null);
  const setShowList = () => setBtnClicked((prev) => !prev);
  const dispatch = useDispatch<AppDispatch>();

  // year/month type에 따라 달라지는 dispatch
  const onClickedDropDownListItem = (date: number) => {
    if (type === "month") {
      const dateUINumber = date;

      //TODO month는 UI로 보이는 num보다 -1 작게 들어가야한다. 추후 수정할 것
      dispatch(setDateActionByType({ month: dateUINumber - 1 }));
      setBtnClicked(false);
      return;
    }

    dispatch(setDateActionByType({ year: date }));
    setBtnClicked(false);
  };

  useEffect(() => {
    if (btnClicked && ulRef.current) {
      const selectedIndex = modalList.findIndex((date) => date === value);

      // TODO 로직 수정 필요
      // ul.current.children.length가 0보다 커야한다.
      // index가 2 이상이어지 유효한 로직
      // 선택한 item이 list 중앙에 있기 위해 제작한 로직
      // 정중앙에 위치 하지는 않는다
      if (selectedIndex - 2 !== -1 && ulRef.current.children.length > 0) {
        ulRef.current.scrollTo({
          top: (selectedIndex - 2) * LI_ITEM_HEIGHT,
        });
      }
    }
  }, [btnClicked, value, modalList]);

  return (
    <DateSelector>
      <DateItem>{value}</DateItem>
      <Button onClick={setShowList} className={btnClicked ? "clicked" : ""}>
        <img src={dropDownBtn} alt="DropDownButton" />
      </Button>

      {/* DateSelector relative 사용위해 이곳에 위치 */}
      {btnClicked ? (
        <DropDownList ref={ulRef} id={type}>
          {modalList.map((date, key) => {
            return (
              <Item
                $height={LI_ITEM_HEIGHT}
                key={key}
                onClick={() => onClickedDropDownListItem(date)}
                className={date === value ? "selected" : ""}
              >
                <Text
                  size={FONT_SIZE.small}
                  color={FONT_COLORS.white}
                  weight={700}
                  align="center"
                >
                  {date}
                </Text>
              </Item>
            );
          })}
        </DropDownList>
      ) : (
        ""
      )}
    </DateSelector>
  );
}

const DropDownList = styled.ul`
  border-radius: 10px;
  background: #383838;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  z-index: 100;
  overflow-y: scroll;
`;

const Item = styled.li<{ $height: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $height }) => `${$height}px`};

  &:hover {
    border: 1px solid white;
    margin: 0px 10px;
  }

  &.selected {
    border: 1px solid white;
    margin: 0px 10px;
  }
`;

const DateItem = styled.span``;

const DateSelector = styled.span`
  position: relative;
  padding: 5px;
  font-size: 32px;
  font-weight: 900;
  line-height: 83.333%;
  letter-spacing: 0.24px;

  /* ID로 접근 할 수 있다.
  하지만 좋은 코드는 아닌 것 같다 -> 매번 selector 만들때마다 id를 추가할 수는 없으니까 */

  #year {
    position: absolute;
    width: 123px;
    height: 157px;
  }

  /* .DateSelctorWrapper #month.DropDownLisdt*/
  #month {
    position: absolute;
    left: 0px;
    width: 65px;
    height: 157px;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: 0px;
  transform: rotate(90deg);
  padding: 5px;

  img {
    width: 25px;
    height: 25px;
  }

  &.clicked {
    img {
      transform: rotate(-180deg);
    }
  }
`;

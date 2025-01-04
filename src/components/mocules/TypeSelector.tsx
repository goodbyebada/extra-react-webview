import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { setTypeShow } from "@redux/home/showTypeSlice";
import Text from "@components/atoms/Text";
import { DownArrow } from "@components/atoms/Icon";
import { HandlerWrapper } from "@components/template/Layout";

/**
 * UI 초기상태 :리스트로 보기
 * type true : 리스트로 보기
 * type false: 캘린더로 보기
 */

export default function TypeSelector() {
  const showAsCalender = useSelector(
    (state: RootState) => state.showType.showAsCalender,
  );
  const dispatch = useDispatch();
  const changeTypeHandler = () => {
    dispatch(setTypeShow());
  };

  return (
    <HandlerWrapper handler={changeTypeHandler}>
      <DownArrow />
      <Text
        children={<Message>{showAsCalender ? "캘린더" : "리스트"}</Message>}
        size={16}
        color=""
        align="left"
        weight={400}
        highlight={true}
        inline={true}
      ></Text>
      <Message>로 보기</Message>
    </HandlerWrapper>
  );
}

const Message = styled.span`
  font-size: 16px;
`;

import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { useDispatch } from "react-redux";
import { setTypetoggle } from "@redux/home/showTypeSlice";
import { Toggle } from "@components/atoms/Toggle";
import { TEXT_CONSTANTS } from "@/constants/TEXT_CONSTANTS";

/**
 * 기본 상태 전체
 * toggle True시 : 전체
 * toggle False시 : 추천
 */
export default function AllOrRecommendationToggleBar() {
  const toggleChecked = useSelector(
    (state: RootState) => state.showType.showRecommand,
  );
  const dispatch = useDispatch();
  const toggleCheckedHandler = () => dispatch(setTypetoggle());

  return (
    <Toggle
      toggleCheckedHandler={toggleCheckedHandler}
      toggleChecked={toggleChecked}
      leftText={TEXT_CONSTANTS.all}
      rightText={TEXT_CONSTANTS.recommend}
    />
  );
}

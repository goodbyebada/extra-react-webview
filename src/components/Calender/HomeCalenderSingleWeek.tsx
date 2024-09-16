/**
 *
 * @returns 한 주에 대한 UI return
 */
import { ObjectType } from "@api/interface";
import { styled } from "styled-components";

export default function HomeCalenderSingleWeek({
  height,
  item,
  gotJobDataList,
  dateOnClick,
  showRecommand,
}: {
  height: number;
  item: number[];
  gotJobDataList: ObjectType;
  dateOnClick: (dateNum: number, key: number) => void;
  showRecommand: boolean;
}) {
  return (
    <>
      <Week $weekcnt={height} className="week">
        {item.map((elem, key) => {
          // 0일때
          if (!elem) {
            return (
              <DateItem key={key} style={{ visibility: "hidden" }}></DateItem>
            );
          }

          // 0이 아닌 date일 때 UI
          return (
            <DateItem
              className={`${!gotJobDataList[elem] ? "" : "got-job"} ${showRecommand ? "recommand" : ""}`}
              key={key}
              onClick={() => dateOnClick(elem, key)}
            >
              <DateNumber>{elem}</DateNumber>
              {/* 공고 개수 표시하는 icon */}
              {!gotJobDataList[elem] || gotJobDataList[elem].length <= 0 ? (
                ""
              ) : (
                <JobCountIcon>{gotJobDataList[elem].length}</JobCountIcon>
              )}
            </DateItem>
          );
        })}
      </Week>
    </>
  );
}

const DateItem = styled.div`
  position: relative;
  /* width: calc(100% / 7); */
  justify-content: center;
  display: flex;
  align-self: center;
  align-items: center;

  width: 47px;
  height: 47px;
  box-sizing: border-box;

  /* 추천 X, 일정 X일때의 기본 set */
  color: #3d3d3d;
  border-radius: 50%;
  border: 2px solid #3d3d3d;
  background-color: #212121;
  border-image-slice: 1;
  background-origin: border-box;
  background-clip: content-box, border-box;

  &.got-job {
    color: #fff;
    border: 2px solid transparent;
    background-image: linear-gradient(rgba(33, 33, 33, 1), rgba(33, 33, 33, 1)),
      linear-gradient(rgba(61, 61, 61, 1), rgba(163, 163, 163, 1));
  }

  /* 추천일때 */
  &.recommand {
    background-image: linear-gradient(rgba(33, 33, 33, 1), rgba(33, 33, 33, 1)),
      linear-gradient(rgba(61, 61, 61, 1), rgba(245, 192, 1, 1));
  }
`;

const DateNumber = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: 900;
  line-height: 20px;
  letter-spacing: 0.01em;
`;

const JobCountIcon = styled.div`
  border-radius: 50%;
  background-color: #f00;
  width: 24px;
  height: 24px;
  text-align: center;
  font-size: 16px;
  line-height: 125%;
  letter-spacing: 0.16px;
`;

const Week = styled.div<{ $weekcnt: number }>`
  display: flex;
  height: ${(props) => `calc(100% / ${props.$weekcnt})`};
  box-sizing: border-box;
  width: 100%;
  color: white;
  justify-content: space-between;
  gap: 7px;

  ${JobCountIcon} {
    position: absolute;
    left: 29px;
    bottom: 32px;
  }

  @media all and (max-width: 375px) {
    ${DateItem} {
      width: 40px;
      height: 40px;
    }
    ${JobCountIcon} {
      left: 20px !important;
      bottom: 25px !important;
      width: 20px !important;
      height: 20px !important;
      font-size: 13px !important;
    }
    ${DateNumber} {
      font-size: 16px !important;
    }
  }
`;

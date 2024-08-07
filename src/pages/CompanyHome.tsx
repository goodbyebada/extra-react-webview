import { TopBar } from "@pages/ExtrasHome";
import { styled } from "styled-components";
import TypeSelector from "@components/TypeSelector";
import { useEffect, useState } from "react";
import Calender from "@components/Calender";
import { dummyMonthJobList } from "@api/dummyData";
import HomeRecruitBox from "@components/HomeRecruitBox";
import { useRef } from "react";
import CompanyModal from "@components/CompanyModal";
import { useNavigate } from "react-router-dom";

/**
 *추후 수정 예정
 * 1. HomeRecruitBox 공고 컴포넌트 선택시 지원현황으로 이동해야함. 주디님 지원현황 페이지 완료시, 연결 예정 [모달창/ 리스트로보기]
 * 2. API 호출 데이터 연결
 * @returns 회사 업체측 홈화면 UI
 */
export default function CompanyHome() {
  // date 관련
  const date = new Date();
  const today = {
    year: date.getFullYear(),
    month: date.getMonth(),
  };

  /**
   * date.getMonth는 항상 원래 월보다 -1이다.
   * useCaleder에 들어가는 값도 원래  month보다 -1 이어야한다.
   */
  const [dateYM, setDateYM] = useState(today);

  const dateYMHandler = (type: string, value: number) => {
    setDateYM((prev) => {
      return type === "month"
        ? { ...prev, [type]: value - 1 }
        : { ...prev, [type]: value };
    });
  };

  // dummydata
  const jobList = dummyMonthJobList;

  /**
   * 캘린더 / 리스트 버튼 state 관리
   * true시, 캘린더
   * false시, 리스트
   */
  const [type, setType] = useState(true);

  // 임시 경로
  const path = "company-job-list/";

  // 모달창 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 선택된 날짜 state
  const selectedDateInitState = {
    dateNum: "",
    dayOfWeek: "",
  };
  const [selectedDate, setSelectedDate] = useState(selectedDateInitState);

  const modalRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  /**
   * 일을 클릭했을때 일어날 Event
   */
  const clickedDateEvent = (dateNum: string, dayOfWeek: string) => {
    // 모달창을 연다
    openModal();

    const selectedDate = {
      dateNum: dateNum,
      dayOfWeek: `${dayOfWeek}요일`,
    };
    setSelectedDate(selectedDate);
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);
  return (
    <div className="company-home-container">
      <CompanyHomeTopBar>
        <nav>
          <TypeSelector
            type={type}
            changeTypeHandler={() => setType((prev) => !prev)}
          />
        </nav>
        <h1>내 촬영</h1>
      </CompanyHomeTopBar>

      <div className="content">
        {type ? (
          // 항상 전체 추천 UI
          <Calender
            dateYM={dateYM}
            dateYMHandler={dateYMHandler}
            jobPostList={jobList}
            showRecommand={true}
            clickedDateEvent={clickedDateEvent}
          />
        ) : (
          <ItemWrapper>
            {jobList.map((elem, key) => {
              return (
                <HomeRecruitBox
                  navigate={() => {
                    navigate(path + `${elem.job_post_id}`);
                  }}
                  key={key}
                  recruitInfo={elem}
                  recommand={false}
                />
              );
            })}
          </ItemWrapper>
        )}

        {isModalOpen && (
          <>
            <ModalOverlay
              ref={modalRef}
              onClick={(e) => {
                if (modalRef !== null && e.target === modalRef.current) {
                  closeModal();
                }
              }}
            >
              <CompanyModal
                dateMonth={(dateYM.month + 1).toString()}
                dayOfWeek={selectedDate.dayOfWeek}
                dateNum={selectedDate.dateNum}
                jobList={jobList}
              />
            </ModalOverlay>
          </>
        )}
      </div>
    </div>
  );
}

const CompanyHomeTopBar = styled(TopBar)`
  nav {
    display: flex;
    justify-content: end;
  }
  h1 {
    display: flex;
    justify-content: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 83.333%;
    letter-spacing: 0.24px;
    margin: 0px;
    padding-top: 20px;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

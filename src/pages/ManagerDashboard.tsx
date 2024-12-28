import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "@components/Modal";
import { requestGetFetch, sendMessage } from "@api/utils";
import { JobPost } from "@api/interface";
import HomeRecruitBox from "@components/HomeRecruitBox";
// import HomeRecruitBox from "@components/HomeRecruitBox";
// import { dummyMonthJobList } from "@api/dummyData";
// import { JobPost } from "@api/interface";

/**
 * Legacy
 * 이전에 작성된  업체 관리 화면
 * @returns
 */
function ManagerDashboard() {
  const navigate = useNavigate();

  const [jobPostList, setJobPostList] = useState<JobPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadData = useCallback(async () => {
    try {
      const res = await requestGetFetch(
        `jobposts/companies/company?page=${page}`,
      );
      if (res !== null) {
        if (res.status === 200) {
          res.json().then((data) => {
            if (data.length === 0) {
              setHasMore(false); // 더 이상 데이터가 없으면 hasMore를 false로 설정
            } else {
              setJobPostList((prevList) => [...prevList, ...data]);
            }
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [page]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // IntersectionObserver 설정
  useEffect(() => {
    if (!hasMore) return; // 더 이상 로드할 데이터가 없을 때 실행 방지

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 },
    );

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [hasMore]);

  const goToAdd = () => {
    navigate("/add-notice");
  };

  const [isMOdalOPen, setIsModalOpen] = useState(false);
  const handleAdd = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          marginLeft: "30px",
          marginRight: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "50px",
          }}
        >
          <p
            style={{
              fontWeight: "900",
              fontSize: "32px",
            }}
          >
            우리 회사 공고
          </p>
          <PlusButton onClick={handleAdd}>+</PlusButton>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "flex-end",
            marginTop: "10px",
            marginBottom: "15px",
            fontSize: "12px",
          }}
        >
          <p style={{ margin: "0 15px" }}>전체</p>
          <p style={{ margin: "0 0" }}>내게만 보기</p>
        </div>
      </div>
      <ItemWrapper>
        {jobPostList.map((jobPostInfo, index) => {
          const today = new Date(Date.now());
          today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 초기화하여 날짜 비교에만 집중

          const isTargetDate = jobPostInfo.calenderList.some((dateStr) => {
            const targetDate = new Date(dateStr);
            targetDate.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 초기화하여 날짜 비교에만 집중

            const oneDayBefore = new Date(targetDate);
            oneDayBefore.setDate(targetDate.getDate() - 1); // 전날 계산

            // 전날 또는 당일인지 확인
            return (
              today.getTime() === targetDate.getTime() ||
              today.getTime() === oneDayBefore.getTime()
            );
          });

          return (
            <HomeRecruitBox
              key={index}
              recruitInfo={jobPostInfo}
              navigate={() => {
                if (isTargetDate || !jobPostInfo.status) {
                  sendMessage({
                    type: "NAVIGATION_MANAGE",
                    payload: {
                      jobPostId: jobPostInfo.id,
                      roleIdList: jobPostInfo.roleIdList,
                      roleNameList: jobPostInfo.roleNameList,
                      seasonList: jobPostInfo.seasonList,
                    },
                    version: "1.0",
                  });
                } else {
                  sendMessage({
                    type: "NAVIGATION_DETAIL", // 다른 데이터로 전송하는 경우
                    payload: {
                      uri: `/detail/${jobPostInfo.id}`,
                    },
                    version: "1.0",
                  });
                }
              }}
            />
          );
        })}{" "}
        {/* 감시 대상 요소 */}
        {hasMore && <div ref={observerRef} style={{ height: "20px" }} />}
      </ItemWrapper>
      <Modal isVisible={isMOdalOPen} onClose={closeModal}>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          이전 양식
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <CreateNewButton onClick={goToAdd}>새로 만들기</CreateNewButton>
        </div>
      </Modal>
    </>
  );
}

export default ManagerDashboard;

const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const PlusButton = styled.button`
  font-size: 30px;
  border-radius: 5px;
  padding: 0 8px 0;
  background-color: #fff;
`;

const CreateNewButton = styled.button`
  background: #858585;
  color: #fff;
  border: none;
  border-radius: 10px;
  width: 284px;
  padding: 5px 0 5px;
  font-size: 20px;
  font-weight: bold;
`;

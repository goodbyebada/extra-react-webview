import styled from "styled-components";
import AdminManageRecruitBox from "@components/AdminManageRecruitBox";
import { sendMessage, requestGetFetch } from "@api/utils";
import { useEffect, useState, useRef, useCallback } from "react";
import { JobPost } from "@api/interface";

export default function CompanyShootManagePage() {
  const [jobPostList, setJobPostList] = useState<JobPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadData = useCallback(async () => {
    try {
      const res = await requestGetFetch(`jobposts?page=${page}`);
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

  return (
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
          <AdminManageRecruitBox
            key={index}
            jobPostInfo={jobPostInfo}
            navigate={() => {
              if (isTargetDate) {
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
  );
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

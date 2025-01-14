import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

interface InfiniteScrollProps {
  children: React.ReactNode;
  fetchData: () => void;
  loader: React.ReactNode;
  hasMore: boolean;
  endMessage?: React.ReactNode;
  hasError: boolean;
  errorMessage: React.ReactNode;
}

/**
 * InfiniteScroll 컴포넌트
 * 스크롤 이벤트를 감지해 데이터를 무한히 로드할 수 있는 컴포넌트입니다.
 *
 * @param {React.ReactNode} children - 스크롤 안에 렌더링될 콘텐츠.
 * @param {() => void} fetchData - 새로운 데이터를 가져오기 위한 함수.
 * @param {React.ReactNode} loader - 데이터 로딩 중 표시할 컴포넌트.
 * @param {boolean} hasMore - 추가 데이터가 더 있는지 여부.
 * @param {React.ReactNode} [endMessage] - 모든 데이터를 가져온 후 표시할 메시지 (선택 사항).
 * @param {React.ReactNode} [hasError] - fetching 중 애러 여부
 * @param {React.ReactNode} [errorMessage] - 에러 발생 시 표시할 컴포넌트
 */
export default function InfiniteScroll({
  children,
  fetchData,
  loader,
  hasMore,
  endMessage,
  hasError,
  errorMessage,
}: InfiniteScrollProps) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [loadNewData, setLoadNewData] = useState<boolean>(false);
  const target = useRef(null);

  useEffect(() => {
    if (!hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries[0]);
        if (entries[0].isIntersecting) {
          setLoadNewData(true);
        }
      },
      { threshold: 0.3 },
    );

    const currentObserverRef = target.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
      observer.disconnect();
    };
  }, [hasMore]);

  //   데이터 처리
  useEffect(() => {
    if (loadNewData && !isFetching) {
      const fetchDataAsync = async () => {
        setIsFetching(true);
        await fetchData();
        setIsFetching(false);
        setLoadNewData(false);
      };
      fetchDataAsync();
    }
  }, [loadNewData, isFetching]);

  return (
    <Wrapper>
      {children}
      {/* <div ref={target} style={{ height: "10px", visibility: "hidden" }}></div> */}
      <div ref={target}></div>
      {loadNewData && loader}
      {!hasMore && endMessage}
      {hasError && errorMessage}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

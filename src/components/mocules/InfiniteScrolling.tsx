import Item from "@components/mocules/Item";
import { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { ItemProps } from "@components/mocules/Item";

interface InfiniteScrollingTemplate {
  baseURL: string;
  query: string;
  convertResponse2ItemProps: (elem: any) => ItemProps | null;
}

export default function InfiniteScrollingTemplate({
  baseURL,
  query,
  convertResponse2ItemProps,
}: InfiniteScrollingTemplate) {
  const [dataList, setDataList] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const target = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  // baseURL, query 바뀔때 data 초기화
  useEffect(() => {
    setDataList([]);
    // url 특성상 1부터 시작
    setOffset(0);
    setHasMore(true);
  }, [baseURL, query]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prevOffset) => prevOffset + 1);
        }
      },
      { threshold: 1.0 },
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

  const loadData = useCallback(async () => {
    try {
      const data = await (
        await fetch(baseURL + `${query}=${offset}`)
      )
        .json();

      if (!data.length) {
        console.log("NO DATA");
        setHasMore(false);
        return;
      }
      setDataList((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  }, [offset]);

  //   데이터 처리
  useEffect(() => {
    if (hasMore && offset >= 1) {
      loadData();
    }
  }, [offset]);

  return (
    <Wrapper>
      {dataList.length > 0 &&
        dataList.map((elem, key) => {
          let props = convertResponse2ItemProps(elem);
          if (!props) return "";

          const {
            title,
            category,
            date,
            dDay,
            company,
            time,
            location,
            onClick,
          } = props;

          return (
            <Item
              key={key}
              title={title}
              category={category}
              date={date}
              dDay={dDay}
              company={company}
              time={time}
              onClick={onClick}
              location={location}
            ></Item>
          );
        })}
      <div ref={target}></div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

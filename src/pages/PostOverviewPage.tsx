import { Header } from "@components/atoms/Layout";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { SpaceBetweenNavBar } from "@components/atoms/Layout";
import addButtonImg from "@assets/addButton.jpg";
import { useNavigate } from "react-router-dom";
import { LabeledCheckBoxGroup } from "@components/mocules/LabeledCheckBoxGroup";
import InfiniteScroll from "@utills/InfiniteScroll";
import Item, { ItemProps } from "@components/mocules/Item";
import { testConvertFun } from "@utills/convert";

/**
 * 업체 측 공고 화면
 * (본인이 소속된 회사의 공고 리스트를 보여주는 화면)
 */

// TODO + 버튼 눌렀을때 역할 추가 페이지 역할로 이동
export default function PostOverviewPage() {
  const navigate = useNavigate();

  const OPTION_STR = {
    all: "전체 보기",
    my: "나만 보기",
  };

  // TMP URL 과 path
  const BASE_URL = `https://jsonplaceholder.typicode.com`;
  const TMP_ALL_BASE_URL = `${BASE_URL}/posts?`;
  const TMP_MY_BASE_URL = `${BASE_URL}/comments?`;
  const query = `_limit=10&_page`;

  const LABEL_ITEM_LIST = Object.values(OPTION_STR);
  const [checkedLabelIdx, setCheckedLabelIdx] = useState<number>(0); // 현재 체크된 인덱스
  const [url, setURL] = useState(TMP_ALL_BASE_URL); // baseURL 설정
  const { convertItemPropsAllType, convertItemPropsMyType } = testConvertFun;

  const [convertFunc, setConvertFunc] = useState<
    (elem: any) => ItemProps | null
  >(convertItemPropsAllType);

  const handleCheckedItemIdx = (checkedLabelIdx: number) => {
    setCheckedLabelIdx(checkedLabelIdx);
  };

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [offset, setOffset] = useState(0);
  const [dataList, setDataList] = useState<any[]>([]);

  useEffect(() => {
    const setInitState = () => {
      setDataList([]);
      setHasMore(true);
      setOffset(0);
    };

    setInitState();

    if (LABEL_ITEM_LIST[checkedLabelIdx] === OPTION_STR.all) {
      setURL(TMP_ALL_BASE_URL);
      setConvertFunc(() => convertItemPropsAllType);
      return;
    }

    if (LABEL_ITEM_LIST[checkedLabelIdx] === OPTION_STR.my) {
      setURL(TMP_MY_BASE_URL);
      setConvertFunc(() => convertItemPropsMyType);
      return;
    }
  }, [checkedLabelIdx]);

  const fetchData = async () => {
    try {
      const response = await fetch(url + `${query}=${offset}`);
      console.log(response);

      if (!response.ok) {
        throw new Error("ERROR");
      }

      const data = await response.json();
      console.log(data);

      if (!data.length) {
        console.log("NO DATA");
        setHasMore(false);
        return;
      }
      setDataList((prev) => [...prev, ...data]);
      setOffset((prev) => prev + 1);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      setHasError(true);
    }
  };

  // TODO 추후 공고 추가 페이제 path와 연결해야함
  const path = "/";
  const tmpPath = "/company/notice/post-status/2";

  return (
    <>
      <StickyWrapper>
        <Header>
          <SpaceBetweenNavBar>
            <h1>우리 회사 공고</h1>
            <IconImage
              src={addButtonImg}
              alt="공고 추가 버튼"
              onClick={() => {
                navigate(path);
              }}
            />
          </SpaceBetweenNavBar>
          <CheckBoxWrapper>
            <LabeledCheckBoxGroup
              lableItemList={LABEL_ITEM_LIST}
              handleCheckedItemIdx={handleCheckedItemIdx}
            />
          </CheckBoxWrapper>
        </Header>
      </StickyWrapper>

      <ContentWrapper>
        <InfiniteScroll
          fetchData={fetchData}
          hasMore={hasMore}
          loader={<h2>loading....!</h2>}
          endMessage={<h2>모든 공고를 업데이트 하였습니다.</h2>}
          hasError={hasError}
          errorMessage={<h2>에러가 발생했습니다.</h2>}
        >
          {dataList.length > 0 &&
            dataList.map((elem, key) => {
              let props = convertFunc(elem);
              if (!props) return "";

              const { title, category, date, dDay, company, time, location } =
                props;

              return (
                <Item
                  key={key}
                  title={title}
                  category={category}
                  date={date}
                  dDay={dDay}
                  company={company}
                  time={time}
                  onClick={() => navigate(tmpPath)}
                  location={location}
                ></Item>
              );
            })}
        </InfiniteScroll>
      </ContentWrapper>
    </>
  );
}

const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IconImage = styled.img`
  width: 50px;
  height: 50px;
`;

const StickyWrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
`;

const ContentWrapper = styled.div`
  margin-top: 10rem;
`;

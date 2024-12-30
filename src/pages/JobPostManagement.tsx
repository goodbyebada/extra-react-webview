import { Header } from "@components/template/Layout";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { SpaceBetweenNavBar } from "@components/template/Layout";
import addButtonImg from "@assets/addButton.jpg";
import { useNavigate } from "react-router-dom";
import { LabeledCheckBoxGroup } from "@components/mocules/LabeledCheckBoxGroup";
import InfiniteScrollingTemplate from "@components/template/InfiniteScrolling";
import { ItemProps } from "@components/mocules/Item"; // ItemProps import

/**
 * 업체 측 공고 관리 화면
 */

export default function JobPostManagement() {
  const navigate = useNavigate();

  const OPTION_STR = {
    all: "전체 보기",
    my: "나만 보기",
  };

  const BASE_URL = `https://jsonplaceholder.typicode.com`;
  const TMP_ALL_BASE_URL = `${BASE_URL}/posts?`;
  const TMP_MY_BASE_URL = `${BASE_URL}/comments?`;
  const query = `_limit=5&_page`;

  // TODO 최대 N 글자  명시 필요함 Itemp component 망가짐 추후 논의 예정
  const convertItemPropsAllType = (elem: {
    id: string;
    body: string;
    title: string;
  }): ItemProps | null => {
    if (!elem) return null;
    let { id, body, title } = elem;

    // title = title ? title.split(" ").slice(0, 5).join(" ") : "none";
    const tmpDateStr = new Date().toString().split(" ").slice(0, 4).join(" ");
    const itemProps: ItemProps = {
      title,
      category: id.toString(),
      date: tmpDateStr,
      dDay: "D-3",
      company: "companyName",
      time: tmpDateStr,
      location: "서울시 강남역",
      onClick: () => {},
    };

    return itemProps;
  };

  const convertItemPropsMyType = (elem: {
    id: string;
    name: string;
    email: string;
    body: string;
  }): ItemProps | null => {
    // 반환 타입을 ItemProps로 명시
    if (!elem) return null;
    const { id, name, email, body } = elem;
    const tmpDateStr = new Date().toString().split(" ").slice(0, 4).join(" ");
    const itemProps: ItemProps = {
      title: name,
      category: id.toString(),
      date: tmpDateStr,
      dDay: "D-3",
      company: email,
      time: tmpDateStr,
      location: "어딘가",
      onClick: () => {},
    };

    return itemProps;
  };

  const LABEL_ITEM_LIST = Object.values(OPTION_STR);
  const [checkedLabelIdx, setCheckedLabelIdx] = useState<number>(0); // 현재 체크된 인덱스
  const [url, setURL] = useState(TMP_ALL_BASE_URL); // baseURL 설정
  const [convertFunc, setConvertFunc] = useState<
    (elem: any) => ItemProps | null
  >(convertItemPropsAllType);

  const handleCheckedItemIdx = (checkedLabelIdx: number) => {
    setCheckedLabelIdx(checkedLabelIdx);
  };

  useEffect(() => {
    if (LABEL_ITEM_LIST[checkedLabelIdx] === OPTION_STR.all) {
      setURL(TMP_ALL_BASE_URL);
      setConvertFunc(() => convertItemPropsAllType);
    } else if (LABEL_ITEM_LIST[checkedLabelIdx] === OPTION_STR.my) {
      setURL(TMP_MY_BASE_URL);
      setConvertFunc(() => convertItemPropsMyType);
    }
  }, [checkedLabelIdx]);

  const path = "/";

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
        <InfiniteScrollingTemplate
          baseURL={url} // 동적으로 URL 전달
          query={query}
          convertResponse2ItemProps={convertFunc} // 동적으로 변환 함수 전달
        />
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
  margin-top: 100px;
`;

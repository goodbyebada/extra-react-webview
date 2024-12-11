import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { JobPost, ResponseStatus, dateYM } from "@api/interface";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";
import HomeRecruitBox from "@components/HomeRecruitBox";
import jobPostAPIForCom from "@api/jobPostAPIForCom";
import { sendMessage } from "@api/utils";

type ListProps = {
  dateYM: dateYM;
  showRecommand: boolean;
};

export default function CompanyList({ dateYM, showRecommand }: ListProps) {
  // const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(0);
  const [localJobPost, setLocalJobPost] = useState<JobPost[]>([]);
  const [status, setStatus] = useState<ResponseStatus>(ResponseStatus.loading);
  const [hasMore, setHasMore] = useState(true);
  const isFetching = useRef(false); // 추가된 변수: fetch 중복 방지용

  /**
   *
   * @param elem jobPost에 따른 navigate
   */
  const navigateToExtraCastingBoard = (elem: JobPost) => {
    // const basePath = ``;
    if (!elem.status) {
      sendMessage({
        type: "NAVIGATION_MANAGE",
        payload: {
          jobPostId: elem.id,
          roleIdList: elem.roleIdList,
          roleNameList: elem.roleNameList,
          seasonList: elem.seasonList,
        },
        version: "1.0",
      });
    } else {
      sendMessage({
        type: "NAVIGATION_DETAIL", // 다른 데이터로 전송하는 경우
        payload: {
          uri: `/detail/${elem.id}`,
        },
        version: "1.0",
      });
    }
    // navigate(path);
  };

  const fetchJobPosts = async () => {
    if (isFetching.current) return; // fetch 중이면 중복 실행 방지
    isFetching.current = true;

    try {
      const data = await jobPostAPIForCom.getAllJobPostByList(
        dateYM.year,
        dateYM.month,
        pageNum,
      );

      if (data.length === 0) {
        setHasMore(false);
      } else {
        const filteredData = data.filter(
          (newPost: JobPost) =>
            !localJobPost.some(
              (existingPost) => existingPost.id === newPost.id,
            ),
        );
        setLocalJobPost((prev) => [...prev, ...filteredData]);
        setPageNum((prev) => prev + 1);
      }
      setStatus(ResponseStatus.fullfilled);
    } catch (error) {
      setStatus(ResponseStatus.rejected);
      console.error(error);
    } finally {
      isFetching.current = false; // fetch가 끝난 후 false로 설정
    }
  };

  useEffect(() => {
    if (hasMore && !isFetching.current) {
      fetchJobPosts();
    }
  }, [dateYM, pageNum, hasMore]);

  const renderComponent = () => {
    switch (status) {
      case ResponseStatus.loading:
        return <Loading loading={true} />;

      case ResponseStatus.rejected:
        return <NotFoundPage />;

      case ResponseStatus.fullfilled:
        return (
          <ItemWrapper>
            {localJobPost.map((elem, key) => (
              <HomeRecruitBox
                navigate={() => navigateToExtraCastingBoard(elem)}
                key={key}
                recruitInfo={elem}
                recommand={showRecommand}
              />
            ))}
          </ItemWrapper>
        );

      default:
        return null;
    }
  };

  return <>{renderComponent()}</>;
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

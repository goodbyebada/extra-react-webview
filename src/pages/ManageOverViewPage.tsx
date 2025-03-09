import Text from "@components/atoms/Text";
import { ContentWrapper } from "@components/atoms/Wrapper";
import { DUMMY_MANAGER_JOB_LIST_VER_2 } from "@mocks/dummyJobData";
import Item from "@components/mocules/Item";
import styled from "styled-components";
import { NavBar } from "@components/mocules/navBar/CommonNavBar";
import MainWindow from "@components/mocules/MainWindow";
import { useNavigate } from "react-router-dom";
import { DUMMY_MANAGER_JOB_LIST_VER_1 } from "@mocks/dummyJobData";
import { useEffect, useState } from "react";
import { JobPostList } from "@type/shared";
import { DUMMY_ADMIN_INFO } from "@pages/Chat/ChatListForAdmin";
import Loading from "@components/Loading";
import ScrollingList from "@components/mocules/ScrollingList";

/**
 * 업체 측 현장관리 촬영목록 화면
 */

// TODO dummyData로 구현되어있음 추후 API로 수정 예정
export default function ManageOverViewPage() {
  const navigate = useNavigate();
  const DETAIL_PATH = `/company/manage/detail`;
  const [managedJobList, setManagedJobList] = useState<JobPostList>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchManagedData = async () => {
      const jobList = await new Promise<JobPostList>((resolve) =>
        setTimeout(() => {
          const data =
            DUMMY_ADMIN_INFO.user_id === 1
              ? DUMMY_MANAGER_JOB_LIST_VER_1
              : DUMMY_MANAGER_JOB_LIST_VER_2;

          resolve(data);
        }, 2000),
      );
      setManagedJobList(jobList);
    };

    fetchManagedData();
    setIsLoading(false);
  }, []);
  return (
    <MainWindow headerShown={false}>
      <ScrollingList>
        <NavBar>
          <Text size={25} weight={900}>
            현장 관리
          </Text>
        </NavBar>

        <ContentWrapper marginTop="2rem" paddingLeft="10px" paddingRight="10px">
          {isLoading ? (
            <Loading loading={true} />
          ) : (
            <>
              <Text weight={800}>촬영 목록</Text>
              <ItemWrapper>
                {managedJobList.length > 0 &&
                  managedJobList.map((elem, key) => (
                    <Item
                      key={key}
                      title={elem.title}
                      category={elem.category}
                      date={elem.calenderList}
                      dDay={"D-3"}
                      company={elem.companyName}
                      time={elem.gatheringTime}
                      location={elem.gatheringLocation.placeName}
                      status={"applied"}
                      onClick={() => {
                        navigate(DETAIL_PATH);
                      }}
                    />
                  ))}
              </ItemWrapper>
            </>
          )}
        </ContentWrapper>
      </ScrollingList>
    </MainWindow>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 10px;
`;

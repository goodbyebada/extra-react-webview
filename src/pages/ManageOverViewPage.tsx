import Text from "@components/atoms/Text";
import { ContentWrapper } from "@components/atoms/Wrapper";
import { memberRoleFrontDummyData } from "@mocks/dummyJobData";
import Item from "@components/mocules/Item";
import styled from "styled-components";
import { NavBar } from "@components/mocules/navBar/CommonNavBar";
import MainWindow from "@components/mocules/MainWindow";

/**
 * 업체 측 현장관리 촬영목록 화면
 */

// TODO dummyData로 구현되어있음 추후 API로 수정 예정
export default function ManageOverViewPage() {
  return (
    <MainWindow headerShown={false}>
      <NavBar>
        <Text size={25} weight={900}>
          현장 관리
        </Text>
      </NavBar>

      <ContentWrapper marginTop="2rem" paddingLeft="10px" paddingRight="10px">
        <Text weight={800}>촬영 목록</Text>

        <ItemWrapper>
          {memberRoleFrontDummyData.map((elem, key) => (
            <Item
              key={key}
              title={elem.title}
              category={elem.category}
              date={[elem.gatheringTime]}
              dDay={"D-3"}
              company={elem.companyName}
              time={elem.gatheringTime}
              location={elem.gatheringLocation}
              status={"applied"}
              onClick={() => {}}
            />
          ))}
        </ItemWrapper>
      </ContentWrapper>
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

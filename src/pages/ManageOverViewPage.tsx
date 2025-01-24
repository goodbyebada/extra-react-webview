/**
 * 업체 측 현장관리
 * 촬영목록 화면
 */

import Text from "@components/atoms/Text";
import { ContentWrapper, LineWrapper } from "@components/atoms/Wrapper";
import { memberRoleFrontDummyData } from "@/mocks/dummyData";
import Item from "@components/mocules/Item";
import styled from "styled-components";
import { NavBar } from "@components/mocules/navBar/CommonNavBar";

// TODO dummyData로 구현되어있음 추후 API로 수정 예정

export default function ManageOverViewPage() {
  return (
    <>
      <LineWrapper>
        <NavBar>
          <Text size={25} weight={900}>
            현장 관리
          </Text>
        </NavBar>
      </LineWrapper>
      <ContentWrapper marginTop="2rem" paddingLeft="10px" paddingRight="10px">
        <Text weight={800}>촬영 관리</Text>

        <ItemWrapper>
          {memberRoleFrontDummyData.map((elem) => (
            <Item
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
    </>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 10px;
`;

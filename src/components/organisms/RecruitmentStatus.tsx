import { NavBar } from "@components/mocules/navBar/CommonNavBar";
import Text, { ThemeText } from "@components/atoms/Text";
import { COLORS } from "@styled/colors";
import { ContentWrapper, LineWrapper } from "@components/atoms/Wrapper";
import { JobPost, RoleBodyType, SeasonLabel } from "@type/shared";
import styled from "styled-components";
import ScrollingList from "@components/mocules/ScrollingList";
import Container from "@components/atoms/Container";
import EditableRoleCard from "@components/organisms/EditableRoleCard";
import { useEffect, useState } from "react";

const MARGIN_TOP = 30;
/**
 * 공고 업체 측에서 볼 수 있는 지원 현황 화면
 */
export default function RecruitmentStatus({
  selectedJobPostItem,
}: {
  selectedJobPostItem: JobPost;
}) {
  const [convertedRoleDetails, setConvertedRoleDetails] = useState<
    RoleBodyType[]
  >([]);

  const onEdit = (formState: RoleBodyType) => {
    setConvertedRoleDetails((prev: RoleBodyType[]) => {
      const index = prev.findIndex((elem) => elem.id === formState.id);
      prev[index] = formState;
      const updatedRoleDetails = [...prev];

      return updatedRoleDetails;
    });

    // 공고 역할 수정된 값 POST API 하는 코드
  };

  const convertToDetailRole = (selectedJobPostItem: JobPost) => {
    const {
      roleIdList,
      roleNameList,
      costumeList,
      sexList,
      roleAgeList,
      limitPersonnelList,
      currentPersonnelList,
      seasonList,
      hourPay,
      tattooList,
    } = selectedJobPostItem;

    const RoleDetailList: RoleBodyType[] = [];
    for (let index = 0; index < roleNameList.length; index++) {
      // TODO  JobPost etc, imageSrc 넣거나  RoleBodyType에서 제거하거나 논의해아함

      // 더미데이터에 섞여있어서 비교 후  min,max 정하는 방향으로 수정함
      const ageList = roleAgeList[index].split("~").map(Number);
      const minAge = Math.min(...ageList);
      const maxAge = Math.max(...ageList);

      const roleDetail: RoleBodyType = {
        id: roleIdList[index],
        roleName: roleNameList[index],
        costume: {
          roleName: roleNameList[index],
          season: SeasonLabel[seasonList[index]],
          etc: costumeList[index],
          imageSrc: [""],
        },
        sex: sexList[index],
        minAge: minAge.toString(),
        maxAge: maxAge.toString(),
        limitPersonnel: limitPersonnelList[index],
        currentPersonnel: currentPersonnelList[index],
        tattoo: tattooList[index],
        hourPay: hourPay.toString(),
      };

      RoleDetailList.push(roleDetail);
    }

    return RoleDetailList;
  };

  useEffect(() => {
    const convertedRoleDetailList = convertToDetailRole(selectedJobPostItem);
    setConvertedRoleDetails(convertedRoleDetailList);
  }, []);

  return (
    <ScrollingList>
      <NavBar sticky={true}>
        <Text weight={900} color={COLORS.white}>
          모집 공고
        </Text>
        <Text weight={900} color={COLORS.darkGray}>
          드라마
        </Text>
      </NavBar>

      {/* 제목 */}
      <LineWrapper>
        <Text size={40} highlight={true} weight={700}>
          {selectedJobPostItem.title}
        </Text>
      </LineWrapper>
      {/* 장소 */}

      <LineWrapper>
        <InfoWrapper>
          <ThemeText variant={"item-title"}>
            {selectedJobPostItem.gatheringTime}
          </ThemeText>
          <ThemeText variant={"item-title"}>
            {selectedJobPostItem.gatheringLocation.placeName}
          </ThemeText>

          <StatusBadge $status={selectedJobPostItem.status ? true : false}>
            {selectedJobPostItem?.status ? "모집중" : "모집마감"}
          </StatusBadge>
        </InfoWrapper>
      </LineWrapper>

      <ContentWrapper marginTop={`${MARGIN_TOP}px`}>
        <Container>
          {convertedRoleDetails?.length > 0 &&
            convertedRoleDetails.map(
              (roleDetail: RoleBodyType, index: number) => (
                <EditableRoleCard
                  RoleDetail={roleDetail}
                  key={index}
                  indexNumber={index + 1}
                  onEdit={onEdit}
                />
              ),
            )}
          {/* 역할 컴포넌트 */}
        </Container>
      </ContentWrapper>
    </ScrollingList>
  );
}

const InfoWrapper = styled.div`
  width: 100%;
  padding: 10px 30px;
`;

const StatusBadge = styled.div<{ $status: boolean }>`
  margin-left: auto;
  border-radius: 20px;
  background-color: ${({ $status }) => ($status ? "#d9d9d9" : "#F00")};
  color: ${({ $status }) => ($status ? "#000" : "#fff")};
  width: 42px;
  height: 20px;
  font-weight: bold;
  font-size: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ $status }) => ($status ? "#767676" : "#F00")};
`;

import { styled } from "styled-components";
import { useEffect, useState } from "react";

import { JobPost } from "@/types/shared";
import RoleModal from "@components/Modal/RoleModal";
import { ReturnDateOfShooting } from "@utills/returnDateOfShooting";

import makeRoleList from "@utills/makeRoleList";
import RoleItemComponentList from "@utills/RoleItemComponentList";

import CustomCheckModal from "@components/Modal/CustomCheckModal";
import { NavBar } from "@components/mocules/navBar/CommonNavBar";
import { ThemeText } from "@components/atoms/Text";
import ShootSchedule from "@components/mocules/ShootSchedule";
import { ContentWrapper } from "@components/atoms/Wrapper";
import { MainButton } from "@components/atoms/Button";
import Modal from "@components/atoms/Modal";
import { useNavigate } from "react-router-dom";

/**
 *
 * @param param0
 * @returns 지원 공고 상세 정보 화면
 * - 페이지의 영역 같음
 */
export default function CastInfo({
  selectedJobPostItem,
}: {
  selectedJobPostItem: JobPost;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStarActive, setStarActive] = useState(false);

  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isApplied, setIsApplied] = useState(false);

  const handleStarClick = () => {
    // TODO 즐겨찾기 상태 추가 API 로직 추가
    setStarActive(() => !isStarActive);
  };

  const handleMapClick = () => {
    navigate("/member/kakaomap", {
      state: { place: selectedJobPostItem.gatheringLocation },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * 지원하기 버튼 onClick Event
   */
  const applyJob = () => {
    // 모달창에서 지원하기 버튼 눌렀을시
    openModal();
  };

  const {
    // category,
    title,
    calenderList,
    // companyName,
    gatheringTime,
    gatheringLocation,
    status,
  }: JobPost = selectedJobPostItem;

  // 추후 논의 예정
  const dateOfShotting = ReturnDateOfShooting(calenderList) || "";

  return (
    <Container>
      <NavBar>
        <ThemeText variant={"title"}>{title}</ThemeText>
      </NavBar>

      <ShootSchedule
        gatheringTime={gatheringTime}
        gatheringLocation={gatheringLocation.placeName}
        dateOfShotting={dateOfShotting}
        handleStarClick={handleStarClick}
        isStarActive={isStarActive}
        status={status}
        handleMapClick={handleMapClick}
      />

      {/* 역할 / 상세정보 리스트 */}
      {/* 한 item, RoleItem 컴포넌트 */}
      <ContentWrapper>
        {selectedJobPostItem && RoleItemComponentList(selectedJobPostItem)}
      </ContentWrapper>

      {/* 지원하기 버튼  */}

      <footer>
        <MainButton
          isActive={!isApplied}
          onClick={!isApplied ? applyJob : () => {}}
          disabled={isApplied}
        >
          {isApplied ? "지원완료" : "지원하기"}
        </MainButton>
      </footer>

      {/* 임시 모달창 구현 */}
      {/* API 로직 보충해야함 */}

      {!isApplied ? (
        <Modal isVisible={isModalOpen} onClose={closeModal}>
          <Wrapper>
            <RoleModal
              handleApply={(value) => setIsApplied(value)}
              closeModal={closeModal}
              roleList={makeRoleList(selectedJobPostItem)}
            />
          </Wrapper>
        </Modal>
      ) : (
        <CustomCheckModal closeModal={closeModal} />
      )}
    </Container>
  );
}

const Wrapper = styled.div`
  position: relative;
  height: 70vh;
`;

const Container = styled.div`
  overflow: none;
  color: #fff;

  footer {
    padding: 20px;
  }
`;

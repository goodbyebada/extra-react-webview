import { styled } from "styled-components";
import { toggleStar } from "@redux/recruitSlice";
import { useEffect, useState } from "react";
import NavBar from "@components/custom/NavBar";

import { JobPost } from "@api/interface";
import RoleModal from "@components/Modal/RoleModal";
import { useRef } from "react";
import { ReturnDateOfShooting } from "@utills/returnDateOfShooting";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

import makeRoleList from "@utills/makeRoleList";
import RoleItemComponentList from "@utills/RoleItemComponentList";

import CustomCheckModal from "@components/Modal/CustomCheckModal";

export default function ExtraCastsComponent({
  selectedJobPostItem,
}: {
  selectedJobPostItem: JobPost;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [apply, setApply] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handleStarClick = () => {
    dispatch(toggleStar());
  };

  const star = useSelector((state: RootState) => state.recruit.star);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * 지원하기 버튼 onClick Event
   */
  const onClick = () => {
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
  const dateOfShotting = ReturnDateOfShooting(calenderList);

  return (
    <Container>
      <NavBar content={title} />

      <ShootingSchedule className="shooting-schedule">
        <div className="time-location-set">
          <div>{gatheringTime} 예정</div>
          <div>{gatheringLocation}</div>
        </div>
        <div className="date-status-set">
          <StarIcon id="star" src={star} onClick={handleStarClick} />

          <div
            style={{
              position: "absolute",
              right: "0",
              bottom: "10px",
            }}
          >
            <span> {dateOfShotting}</span>

            {/* 추후 공통 컴포넌트의 모집중 컴포넌트로 통일 예정 */}
            <span id="status"> {status ? "모집중" : "모집완료"}</span>
          </div>
        </div>
      </ShootingSchedule>

      {/* 역할 / 상세정보 리스트 */}
      {/* 한 item, RoleItem 컴포넌트 */}
      <div className="role-list">
        {selectedJobPostItem && RoleItemComponentList(selectedJobPostItem)}
      </div>

      {/* 지원하기 버튼  */}
      <footer>
        <Button $apply={apply} onClick={onClick}>
          {apply ? "지원완료" : "지원하기"}
        </Button>
      </footer>

      {/* 임시 모달창 구현 */}
      {/* API 로직 보충해야함 */}
      {isModalOpen && (
        <>
          <ModalOverlay
            ref={modalRef}
            onClick={(e) => {
              if (modalRef !== null && e.target === modalRef.current) {
                setIsModalOpen(false);
              }
            }}
          >
            <Wrapper>
              {!apply ? (
                <RoleModal
                  handleApply={(value) => setApply(value)}
                  closeModal={closeModal}
                  roleList={makeRoleList(selectedJobPostItem)}
                />
              ) : (
                <CustomCheckModal closeModal={closeModal} />
              )}
            </Wrapper>
          </ModalOverlay>
        </>
      )}
    </Container>
  );
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Container = styled.div`
  overflow: none;
  color: #fff;

  --_nav-height: 120px;

  > * {
    width: 100%;
  }

  .shooting-schedule {
    top: var(--_nav-height);
  }

  footer {
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  .role-list {
    margin-bottom: 20px;
  }
`;

const ShootingSchedule = styled.div`
  display: flex;
  justify-content: space-around;
  height: 120px;

  border: 1px solid #bababa;
  border-right: 0px;
  border-left: 0px;

  background: #000;
  z-index: 9;
  position: sticky;
  top: 135px;

  font-size: 22px;
  font-weight: 700;
  line-height: 100%;

  .time-location-set {
    padding: 20px;
    width: 100%;
    align-self: center;
    font-size: 1rem;
  }
  .date-status-set {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: end;

    font-size: 20px;
    font-weight: 900;
    letter-spacing: 0.2px;

    #star {
      width: 40px;
      height: 40px;
    }

    #status {
      color: #000;

      -webkit-text-stroke-width: 1;
      -webkit-text-stroke-color: #f5c001;
      font-size: 12px;
      font-weight: 900;
      line-height: 166.667%;
      letter-spacing: 0.12px;

      border-radius: 20px;
      border: 1px solid #f5c001;
      background: #f5c001;

      width: min-content;

      padding: 3px;
      margin-left: 8px;
    }
  }
`;
const Button = styled.button<{ $apply: boolean }>`
  height: 63px;
  width: 100%;

  border-radius: 18px;
  background: ${(props) => (props.$apply ? "#595959" : "#f5c001")};
  border: none;

  /* font */
  color: ${(props) => (props.$apply ? "#AFAFAF" : "#000")};
  font-size: 25px;
  font-weight: 900;
  line-height: 80%;
  letter-spacing: 0.25px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const StarIcon = styled.img`
  image-rendering: -webkit-optimize-contrast;
  transform: translateZ(0);
  backface-visibility: hidden;
  width: 100%;
  object-fit: cover;
`;

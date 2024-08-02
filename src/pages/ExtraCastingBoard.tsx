import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { toggleStar } from "@redux/recruitSlice";

import NavBar from "@components/custom/NavBar";

import { dummyRoleList, dummyJobPostList } from "@api/dummyData";
import { Role, JobPost } from "@api/interface";

/**
 *
 * @returns 공고화면 UI
 */

export default function ExtraCastingBoard() {
  const [apply, setApply] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);

    // 지원했다 가정
    // 추후 수정 예정
    setApply(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const star = useSelector((state) => state.recruit.star);

  const handleStarClick = () => {
    dispatch(toggleStar());
  };

  // 임시 데이터 jobpostList
  const jobPostList = dummyJobPostList;

  const { jobPostId } = useParams();

  // jobPostId가 없다면 404 화면 return
  if (jobPostId === undefined) {
    return <div>404</div>;
  }

  /**
   * 데이터 연결 예정
   * url의 jobPostId를 통해, jobPostList 데이터에서 jobPostId 공고 JobPost 정보를 찾는다.
   */
  const jobPostItem = jobPostList.find(
    (elem) => elem.job_post_id === parseInt(jobPostId),
  );

  // jobPostId와 일치하는 jobPostItem 없다면 404 return
  if (jobPostItem === undefined) {
    return <div>404</div>;
  }

  const {
    calendar,
    status,
    title,
    gathering_location,
    gathering_time,
  }: JobPost = jobPostItem;

  /**
   * jobPostId로 request 보냈을때 response data
   */
  const roleList = dummyRoleList;

  /*
   * return 한 역할 / 상세정보에 대한 UI
   * Ex) 학생역할 : { 성별 : 여자, ...} , { 성별 : 남자, ...}
   */
  const generateRoleDetailItem = (
    cnt: number,
    tragetRoleName: string,
    selectedArr: Role[],
  ) => {
    // 공백제거

    const selectedRolenameObj = { [tragetRoleName]: selectedArr };

    for (const e in selectedRolenameObj) {
      return (
        <RoleItem key={cnt}>
          <h1 id="role-name">
            {cnt}&#41;{e}
          </h1>

          <div className="content">
            {selectedRolenameObj[e].map((elem) => {
              const { role_id, sex, season, role_age, costume } = elem;

              return (
                <DetailItem key={role_id}>
                  <ol className="details">
                    <li className="item">
                      <div id="notice-num">1</div>
                      <p>성별 : {sex ? "여자" : "남자"}</p>
                    </li>

                    <li className="item">
                      <div id="notice-num">2</div>
                      <p>나이 : {role_age}</p>
                    </li>

                    <li className="item">
                      <div id="notice-num">3</div>
                      <p>계절 : {season}</p>
                    </li>

                    <li className="item">
                      <div id="notice-num">4</div>
                      <p>의상 : {costume}</p>
                    </li>
                  </ol>
                </DetailItem>
              );
            })}
          </div>
        </RoleItem>
      );
    }
  };

  const generateRoleDetailItemList = () => {
    let remainRoleList = roleList;
    const roleComponents = [];
    let cnt = 0;

    while (remainRoleList.length !== 0) {
      const tragetRoleName = remainRoleList[0].role_name.replace(/\s/g, "");

      // 학생역할 : { 성별 : 여자, ...} , { 성별 : 남자, ...}
      const selectedArr = remainRoleList.filter(
        (elem) => elem.role_name.replace(/\s/g, "") === tragetRoleName,
      );

      const remainingArr = remainRoleList.filter(
        (elem) => elem.role_name.replace(/\s/g, "") !== tragetRoleName,
      );

      cnt++;
      remainRoleList = remainingArr;
      // 업데이트

      roleComponents.push(
        generateRoleDetailItem(cnt, tragetRoleName, selectedArr),
      );
    }

    return <>{roleComponents}</>;
  };

  /**
   * 지원하기 버튼 onClick Event
   */
  const onClick = () => {
    // 모달창에서 지원하기 버튼 눌렀을시
    openModal();
  };

  return (
    <Container>
      <NavBar content={title} />

      <ShootingSchedule className="shooting-schedule">
        <div className="time-location-set">
          <div>{gathering_time} 예정</div>
          <div>{gathering_location}</div>
        </div>
        <div className="date-status-set">
          <StarIcon id="star" src={star} onClick={handleStarClick} />

          <div>
            <span> {calendar}</span>

            {/* 추후 공통 컴포넌트의 모집중 컴포넌트로 통일 예정 */}
            <span id="status"> {status ? "모집중" : "모집완료"}</span>
          </div>
        </div>
      </ShootingSchedule>

      {/* 역할 / 상세정보 리스트 */}
      {/* 한 item, RoleItem 컴포넌트 */}
      <div className="role-list">{generateRoleDetailItemList()}</div>

      {/* 지원하기 버튼  */}
      <footer>
        <Button $apply={apply} onClick={onClick}>
          {apply ? "지원완료" : "지원하기"}
        </Button>
      </footer>

      {/* 임시 모달창 구현 */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent onClick={(e) => e.preventDefault()}>
            <h2>Modal Title</h2>
            <p>This is a temporary modal.</p>

            <Button $apply={apply} onClick={closeModal}>
              Close
            </Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

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
    align-self: center;
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
      margin-top: 20px;
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

const RoleItem = styled.div`
  padding: 30px;
  margin: 0 auto;
  width: 100%;
  #role-name {
    font-size: 19px;
    font-weight: 700;
    line-height: 115.789%;
    margin-bottom: 30px;
  }

  .content {
    height: fit-content;

    > * {
      margin-bottom: 20px;
    }
  }

  border-bottom: solid 2px white;
`;

const DetailItem = styled.div`
  min-height: 142px;
  position: relative;

  border: 2px solid transparent;
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-image: linear-gradient(#000000, #000000),
    linear-gradient(#545454, #bababa);

  border-radius: 18px;

  font-size: 14px;
  font-style: normal;
  font-weight: 900;
  line-height: 142.857%;
  letter-spacing: 0.14px;

  .details {
    list-style: none;
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
  }

  .item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    & #notice-num {
      width: 25px;
      height: fit-content;

      /* 정중앙 */
      display: flex;
      justify-content: center;
      align-self: center;

      border: solid 2px white;
      border-radius: 50%;

      margin-right: 0.5em;
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

const ModalContent = styled.div`
  position: absolute;
  top: 0;

  width: 400px; //모달의 가로크기
  height: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;

  h2 {
    margin: 0 0 10px;
  }

  p {
    margin: 0 0 20px;
  }
`;

const StarIcon = styled.img`
  image-rendering: -webkit-optimize-contrast;
  transform: translateZ(0);
  backface-visibility: hidden;
  width: 100%;
  object-fit: cover;
`;

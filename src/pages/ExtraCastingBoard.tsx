import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { toggleStar } from "@redux/recruitSlice";

import NavBar from "@components/custom/NavBar";

import { JobPost, ResponseStatus, RoleItemToShow } from "@api/interface";
import RoleModal from "@components/Modal/RoleModal";
import { useRef } from "react";
import CompleteModal from "@components/Modal/CompleteModal";
import { RootState } from "@redux/store";

import { fetchJobPostById } from "@redux/jobPost/jobPostSlice";
import { AppDispatch } from "@redux/store";
import { Loading } from "@components/Loading";
import { Err } from "@components/Err";
import { ReturnDateOfShooting } from "@utills/returnDateOfShooting";

/**
 *
 * @returns 공고화면 UI
 */

/**
 * 단건 조회할 예정
 */
export default function ExtraCastingBoard() {
  const [apply, setApply] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { jobPostId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const star = useSelector((state: RootState) => state.recruit.star);

  const handleStarClick = () => {
    dispatch(toggleStar());
  };

  const jobPostItem = useSelector(
    (state: RootState) => state.jobPosts.jobPostItem,
  );

  useEffect(() => {
    // 서버에서 데이터를 불러오는 createAsyncThunk 호출

    const fetch = () => {
      if (jobPostId !== undefined && jobPostId !== null) {
        dispatch(fetchJobPostById(parseInt(jobPostId)));
      }
    };

    fetch();
  }, [dispatch, jobPostId]);

  // 임시 선택된 데이터
  const selectedJobPostItem = jobPostItem.data;

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
  const generateRoleDetailItemList = (selectedJobPostItem: JobPost) => {
    const {
      roleNameList,
      costumeList,
      sexList,
      roleAgeList,
      // limitPersonnelList,
      // currentPersonnelList,
      seasonList,
    } = selectedJobPostItem;

    const roleComponents = [];

    // 서버 나이 현재 null 로 되어있음 나이 임시처리
    for (let i = 0; i < selectedJobPostItem.roleNameList.length; i++) {
      let roleDefaultList = "나이 무관";

      if (roleAgeList !== null) {
        roleDefaultList = selectedJobPostItem.roleAgeList[i][0];
      }

      console.log(costumeList[0]);
      roleComponents.push(
        RoleDetailItem(
          i,
          roleNameList[i],
          costumeList[i],
          sexList[i],
          roleDefaultList,
          seasonList[i],
        ),
      );
    }

    return <>{roleComponents}</>;
  };

  /*
   * return 한 역할 / 상세정보에 대한 UI
   * Ex) 학생역할 : { 성별 : 여자, ...} , { 성별 : 남자, ...}
   */
  const RoleDetailItem = (
    idx: number,
    roleName: string,
    costumeList: string[] | string,
    sex: boolean,
    roleAge: string,
    season: string,
  ) => {
    return (
      <RoleItem key={idx}>
        <h1 id="role-name">
          {idx + 1}&#41;{roleName}
        </h1>

        <div className="content">
          <DetailItem>
            <ol className="details">
              <li className="item">
                <div id="notice-num">1</div>
                <p>성별 : {sex ? "여자" : "남자"}</p>
              </li>

              <li className="item">
                <div id="notice-num">2</div>
                <p>나이 : {roleAge}</p>
              </li>

              <li className="item">
                <div id="notice-num">3</div>
                <p>계절 : {season}</p>
              </li>

              <li className="item">
                <div id="notice-num">4</div>
                <p>
                  의상:
                  {/* {costumeList.length > 0 &&
                    costumeList.map((elem, idx) => {
                      if (costumeList.length === idx + 1) {
                        return <span key={idx}>{elem}</span>;
                      }
                      return <span key={idx}>{elem},</span>;
                    })} */}
                  <>{costumeList}</>
                  ~~예상 서버 값과 다름
                </p>
              </li>
            </ol>
          </DetailItem>
        </div>
      </RoleItem>
    );
  };

  /**
   *
   * 모달창에 띄울 역할 리스트 생성
   * @param selectedJobPostItem
   * @returns
   */
  const makeRoleList = (selectedJobPostItem: JobPost) => {
    const RoleList = [];

    const { roleIdList, roleNameList, roleAgeList, sexList } =
      selectedJobPostItem;

    for (let i = 0; i < selectedJobPostItem.roleNameList.length; i++) {
      const Role: RoleItemToShow = {
        roleId: roleIdList[i],
        roleName: roleNameList[i],
        roleAge: roleAgeList[i][0],
        sex: sexList[i],
      };
      RoleList.push(Role);
    }
    return RoleList;
  };

  /**
   * 지원하기 버튼 onClick Event
   */
  const onClick = () => {
    // 모달창에서 지원하기 버튼 눌렀을시
    openModal();
  };

  return !(jobPostItem.status === ResponseStatus.fullfilled) ? (
    jobPostItem.status === ResponseStatus.loading ? (
      <Loading />
    ) : (
      <Err />
    )
  ) : (
    <Container>
      <NavBar content={title} />

      <ShootingSchedule className="shooting-schedule">
        <div className="time-location-set">
          <div>{gatheringTime} 예정</div>
          <div>{gatheringLocation}</div>
        </div>
        <div className="date-status-set">
          <StarIcon id="star" src={star} onClick={handleStarClick} />

          <div>
            <span> {dateOfShotting}</span>

            {/* 추후 공통 컴포넌트의 모집중 컴포넌트로 통일 예정 */}
            <span id="status"> {status ? "모집중" : "모집완료"}</span>
          </div>
        </div>
      </ShootingSchedule>

      {/* 역할 / 상세정보 리스트 */}
      {/* 한 item, RoleItem 컴포넌트 */}
      <div className="role-list">
        {selectedJobPostItem && generateRoleDetailItemList(selectedJobPostItem)}
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
                <CompleteModal
                  closeModal={closeModal}
                  type={"supportComplete"}
                />
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

const StarIcon = styled.img`
  image-rendering: -webkit-optimize-contrast;
  transform: translateZ(0);
  backface-visibility: hidden;
  width: 100%;
  object-fit: cover;
`;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import backIcon from "@assets/backIcon.png";
import reviseIcon from "@assets/reviseIcon.png";
import { dummyJobPostList } from "@api/dummyData";
import CompanyRoleModal from "@components/Modal/CompanyRoleModal";

function DetailPage() {
  const navigate = useNavigate();

  const { title } = useParams();

  const [gatheringTime, setGatheringTime] = useState(
    localStorage.getItem("gatheringTime") || "",
  );
  const [gatheringLocation, setGatheringLocation] = useState(
    localStorage.getItem("gatheringLocation") || "",
  );

  useEffect(() => {
    // localStorage에 모이는 시간과 장소를 저장하여 ShowApplicant 페이지에서 돌아올 때 정보 유지
    const savedGatheringTime = localStorage.getItem("gatheringTime");
    const savedGatheringLocation = localStorage.getItem("gatheringLocation");

    if (savedGatheringTime) setGatheringTime(savedGatheringTime);
    if (savedGatheringLocation) setGatheringLocation(savedGatheringLocation);
  }, []);

  const jobPost = dummyJobPostList;

  const goToCheckApplicant = (roleName: string, index: number) => {
    localStorage.setItem("roleName", roleName);

    navigate(`/detail/${title}/applicants`, { state: { roleName, index } });
  };

  const [isStatusIng, setisStatusIng] = useState(true);

  const makeStatusDone = () => {
    setisStatusIng(false);
  };

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const handleRoleModalOpen = () => {
    setIsRoleModalOpen(true);
  };
  const handleRoleModalClose = () => {
    setIsRoleModalOpen(false);
  };

  // 이전페이지로 돌아가기
  const goBackManager = () => {
    navigate("/manager-dashboard");
  };

  // 수정버튼을 누르면 나오는 "+역할 상세 프로필"이 보이는 유무
  const [isRevisionVisible, setIsRevisionVisible] = useState(false);
  // 수정완료 버튼 보이는 유무
  const [isCompleteRevVisible, setCompleteRevVisible] = useState(false);

  // 수정버튼을 눌렀을 때
  const handleReviseClick = () => {
    setIsRevisionVisible(true);
    setCompleteRevVisible(true);
  };
  // 수정완료 버튼을 눌렀을 때
  const handleCompleteRev = () => {
    setIsRevisionVisible(false);
    setCompleteRevVisible(false);
  };

  let previousRoleName = "";

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          padding: "10px",
          position: "relative",
          paddingTop: "50px",
        }}
      >
        <img
          src={backIcon}
          alt="back"
          style={{ margin: "12px 10px 10px" }}
          onClick={goBackManager}
        />
        <p
          style={{
            margin: "0 5px",
            fontSize: "36px",
            fontWeight: "600",
            color: "#F5C001",
          }}
        >
          {title}
        </p>
      </div>

      <CustomBorder>
        <p style={{ margin: 0, marginBottom: "5px" }}>{gatheringTime} 예정</p>
        <Row>
          <p style={{ margin: 0, marginRight: "auto" }}>{gatheringLocation}</p>

          {isStatusIng ? (
            <StatusBadge>모집중</StatusBadge>
          ) : (
            <StatusBadge>모집마감</StatusBadge>
          )}
        </Row>
      </CustomBorder>
      <div></div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <img
          src={reviseIcon}
          alt="revise"
          style={{
            width: "27px",
            height: "25px",
            cursor: "pointer",
            marginRight: "20px",
            marginTop: "10px",
          }}
          onClick={handleReviseClick}
        />
      </div>

      <Column>
        {jobPost.map((post) => (
          <React.Fragment key={post.id}>
            {post.roleNameList &&
              post.roleNameList.map((roleName, index) => {
                const sex = post.sexList[index];
                const roleAge = post.roleAgeList[index];
                const season = post.seasonList[index];
                const costume = post.costumeList[index];

                const displayRoleName = roleName !== previousRoleName;
                previousRoleName = roleName;

                return (
                  <React.Fragment key={`${post.id}-${index}`}>
                    {displayRoleName && <RoleName>{roleName}</RoleName>}

                    <RoleInfo
                      onClick={() => goToCheckApplicant(roleName, index)}
                    >
                      <RoleDetail style={{ fontSize: "12px" }}>
                        <p>1. 성별 : {sex === true ? "여" : "남"}</p>
                        <p>2. 나이 : {roleAge}</p>
                        <p>3. 계절 : {season}</p>
                        <p>4. 의상 : {costume.join(", ")}</p>
                      </RoleDetail>
                    </RoleInfo>

                    {isRevisionVisible && (
                      <DetailProfileButton onClick={handleRoleModalOpen}>
                        + 역할 상세 프로필
                      </DetailProfileButton>
                    )}
                  </React.Fragment>
                );
              })}
          </React.Fragment>
        ))}

        <RecruitDoneButton onClick={makeStatusDone}>마감</RecruitDoneButton>

        {isRoleModalOpen && (
          <ModalBackground onClick={handleRoleModalClose}>
            <div onClick={(e) => e.stopPropagation()}>
              <CompanyRoleModal closeModal={handleRoleModalClose} />
            </div>
          </ModalBackground>
        )}

        {isCompleteRevVisible && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CompleteRevButton onClick={handleCompleteRev}>
              수정완료
            </CompleteRevButton>
          </div>
        )}
      </Column>
    </>
  );
}

export default DetailPage;

const CustomBorder = styled.div`
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  border-left: 0;
  border-right: 0;
  padding: 10px;
  margin: 0 10px 0 10px;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatusBadge = styled.div`
  margin-left: auto;
  border-radius: 20px;
  background-color: white;
  color: black;
  width: 42px;
  height: 20px;
  font-weight: bold;
  font-size: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoleInfo = styled.div`
  background-color: #535255;
  width: 380px;
  height: 100px;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 20px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const RoleDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoleName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  text-align: left;
  margin-left: 50px;
  margin-bottom: -10px;
  font-weight: bold;
`;

const DetailProfileButton = styled.button`
  background-color: rgba(83, 82, 85, 0.7);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  border: none;
  cursor: pointer;
  width: 60%;
  height: 40px;
  text-align: center;
  margin-bottom: 15px;
`;

const CompleteRevButton = styled.button`
  background-color: #5bde0b;
  color: #fff;
  border-radius: 5px;
  border: none;
  margin-top: 10px;
  padding: 3px 8px;
`;

const RecruitDoneButton = styled.button`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: #f5c001;
  padding: 5px;
  width: 70px;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

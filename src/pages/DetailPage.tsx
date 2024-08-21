import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import backIcon from "@assets/backIcon.png";
import reviseIcon from "@assets/reviseIcon.png";
// import { dummyRoleList } from "@api/dummyData";
// import { JobPost } from "@api/interface";
import CompanyRoleModal from "@components/Modal/CompanyRoleModal";
import { requestGetFetch, sendMessage } from "@api/utils";
import { RoleList } from "@api/interface";

function DetailPage() {
  const navigate = useNavigate();

  const { jobPostId } = useParams();

  const [jobPost, setJobPost] = useState<{
    id: number;
    title: string;
    gatheringLocation: string;
    gatheringTime: string;
    imageUrl: string;
    status: boolean;
    hourPay: number;
    category: string;
    companyName: string;
  }>({
    id: 0,
    title: "",
    gatheringLocation: "",
    gatheringTime: "",
    imageUrl: "",
    status: true,
    hourPay: 0,
    category: "",
    companyName: "",
  });
  const [roleList, setRoleList] = useState<RoleList>([]);

  const loadData = useCallback(async () => {
    await requestGetFetch(`jobposts/${jobPostId}`).then((res) => {
      if (res !== null) {
        if (res.status === 200) {
          res.json().then((data) => {
            setJobPost({
              id: data.id,
              title: data.title,
              gatheringLocation: data.gatheringLocation,
              gatheringTime: data.gatheringTime,
              imageUrl: data.imageUrl,
              status: data.status,
              hourPay: data.hourPay,
              category: data.category,
              companyName: data.companyName,
            });
          });
        }
      }
    });
    await requestGetFetch(`jobposts/${jobPostId}/roles`).then((res) => {
      if (res !== null) {
        if (res.status === 200) {
          res.json().then((data) => {
            setRoleList(data);
          });
        }
      }
    });
  }, [jobPostId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const goToCheckApplicant = (roleId: number) => {
    navigate(`/detail/${roleId}/applicants`);
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
    // navigate("/manager-dashboard");
    sendMessage({
      type: "HISTORY_BACK",
      version: "1.0",
    });
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

  const convertTime = (time: string) => {
    const date = new Date(time);
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${hour}:${minute}`;
  };

  return (
    <>
      <Column
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={goBackManager}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={backIcon}
              alt="back"
              style={{
                height: "1.5rem",
                marginRight: "1rem",
              }}
            />
            <span
              style={{
                color: "#fff",
              }}
            >
              모집공고
            </span>
          </button>
          <div>{jobPost.category}</div>
        </div>
        <div
          style={{
            marginTop: "2rem",
            fontSize: "2rem",
            fontWeight: "600",
            color: "#F5C001",
            marginBottom: ".5rem",
            textAlign: "center",
          }}
        >
          {jobPost.title}
        </div>
      </Column>

      <CustomBorder>
        <p style={{ margin: 0, marginBottom: "5px" }}>
          {jobPost.gatheringTime !== "" && convertTime(jobPost.gatheringTime)}{" "}
          예정
        </p>
        <Row>
          <p style={{ margin: 0, marginRight: "auto" }}>
            {jobPost.gatheringLocation}
          </p>

          {jobPost.status ? (
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
        {roleList.map((role, index) => {
          const showRoleName =
            index === 0 || roleList[index - 1].roleName !== role.roleName;
          const showProfileButton =
            index === roleList.length - 1 ||
            roleList[index].roleName !== roleList[index + 1].roleName;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              {showRoleName && (
                <RoleName>
                  {index + 1}) {role.roleName} 역할
                </RoleName>
              )}

              <RoleInfo onClick={() => goToCheckApplicant(role.id)}>
                <RoleDetail style={{ fontSize: "12px" }}>
                  <p>1. 성별 : {role.sex ? "남" : "여"}</p>
                  <p>
                    2. 나이 : {role.minAge}~{role.maxAge}
                  </p>
                  <p>3. 계절 : {role.season}</p>
                  <p>4. 의상 : {role.costume}</p>
                </RoleDetail>
              </RoleInfo>

              {showProfileButton && isRevisionVisible && (
                <DetailProfileButton onClick={handleRoleModalOpen}>
                  + 역할 상세 프로필
                </DetailProfileButton>
              )}
            </div>
          );
        })}

        {jobPost.status && !isRevisionVisible && (
          <RecruitDoneButton onClick={() => {}}>마감</RecruitDoneButton>
        )}

        {isRoleModalOpen && (
          <CompanyRoleModal
            onSubmit={() => {}}
            closeModal={handleRoleModalClose}
          />
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
  width: 90%;
  height: 100px;
  margin-top: 20px;
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
  margin: 0 auto;
  margin-top: 20px;
`;

const CompleteRevButton = styled.button`
  background-color: #5bde0b;
  color: #fff;
  border-radius: 5px;
  border: none;
  margin-top: 20px;
  padding: 3px 8px;
`;

const RecruitDoneButton = styled.button`
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: #f5c001;
  padding: 5px;
  width: 70px;
`;

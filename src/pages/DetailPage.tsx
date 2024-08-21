import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import backIcon from "@assets/backIcon.png";
import reviseIcon from "@assets/reviseIcon.png";
import CompanyRoleModalUpdate from "@components/Modal/CompanyRoleModalUpdate";
import CompanyRoleModalCreate from "@components/Modal/CompanyRoleModalCreate";
import { JobPost } from "@api/interface";
import RoleInfoComponent from "@components/custom/RoleInfo";

interface RoleInfo {
  index: number;
  sex: boolean;
  roleAge: string[];
  season: string;
  costume: string[];
  currentPersonnel: number;
  limitPersonnel: number;
  roleId: number;
}

const groupRolesByName = (jobPost: JobPost): { [key: string]: RoleInfo[] } => {
  const roleGroups: { [key: string]: RoleInfo[] } = {};

  jobPost.roleNameList.forEach((roleName, index) => {
    if (!roleGroups[roleName]) {
      roleGroups[roleName] = [];
    }

    roleGroups[roleName].push({
      index,
      sex: jobPost.sexList[index],
      roleAge: jobPost.roleAgeList[index] || [],
      season: jobPost.seasonList[index],
      costume: jobPost.costumeList[index] || [],
      currentPersonnel: jobPost.currentPersonnelList[index],
      limitPersonnel: jobPost.limitPersonnelList[index],
      roleId: jobPost.roleIdList[index],
    });
  });

  return roleGroups;
};

function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [jobPost, setJobPost] = useState<JobPost | null>(null);
  const [isStatusIng, setIsStatusIng] = useState(true);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isRevisionVisible, setIsRevisionVisible] = useState(false);
  const [isCompleteRevVisible, setCompleteRevVisible] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedRoleName, setSelectedRoleName] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"update" | "create">("update");

  const fetchJobPost = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}api/v1/jobposts/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch job posts: ${response.statusText}`);
      }

      const data: JobPost = await response.json();
      console.log("Job post fetched successfully:", data);
      setJobPost(data);
      setIsStatusIng(data.status);
    } catch (error) {
      console.error("Failed to fetch job posts", error);
    }
  }, [id]);

  useEffect(() => {
    fetchJobPost();
  }, [id, fetchJobPost]);

  const goToCheckApplicant = (roleName: string, index: number) => {
    localStorage.setItem("roleName", roleName);
    navigate(`/detail/${id}/applicants`, { state: { roleName, index } });
  };

  const makeStatusDone = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    try {
      const updatedJobPost = {
        ...jobPost,
        status: false,
      };

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}api/v1/jobposts/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedJobPost),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update job post status: ${response.statusText}`,
        );
      }

      setJobPost((prevJobPost) => {
        if (prevJobPost) {
          return { ...prevJobPost, status: false };
        }
        return prevJobPost;
      });

      setIsStatusIng(false);
      console.log("Job post status updated successfully.");
    } catch (error) {
      console.error("Failed to update job post status", error);
    }
  };

  const handleRoleModalOpen = (
    roleId: number,
    roleName: string,
    type: "update" | "create",
  ) => {
    setSelectedRoleId(roleId);
    setSelectedRoleName(roleName);
    setModalType(type);
    setIsRoleModalOpen(true);
  };

  const handleRoleModalClose = () => {
    setIsRoleModalOpen(false);
    setSelectedRoleId(null);
    setSelectedRoleName(null);
  };

  const goBackManager = () => {
    navigate("/manager-dashboard");
  };

  const handleReviseClick = () => {
    setIsRevisionVisible(true);
    setCompleteRevVisible(true);
  };

  const handleCompleteRev = () => {
    setIsRevisionVisible(false);
    setCompleteRevVisible(false);
  };

  const handleRoleInfoClick = (roleName: string, index: number) => {
    const roleId = jobPost?.roleIdList[index];
    if (isRevisionVisible && roleId !== undefined) {
      handleRoleModalOpen(roleId, roleName, "update");
    } else {
      goToCheckApplicant(roleName, index);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const roleGroups = jobPost ? groupRolesByName(jobPost) : {};

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
          {jobPost?.title}
        </p>
        <p
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
        >
          {jobPost?.category || "Unknown"}
        </p>
      </div>

      <CustomBorder>
        <p style={{ margin: 0, marginBottom: "5px" }}>
          {jobPost?.gatheringTime}
        </p>
        <Row>
          <p style={{ margin: 0, marginRight: "auto" }}>
            {jobPost?.gatheringLocation}
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ margin: "0 10px 0 0" }}>
              {jobPost?.calenderList?.map(formatDate).join(", ") ||
                "캘린더 정보 없음"}
            </p>
            <StatusBadge $status={isStatusIng}>
              {jobPost?.status ? "모집중" : "모집마감"}
            </StatusBadge>
          </div>
        </Row>
      </CustomBorder>

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
        {Object.keys(roleGroups).map((roleName, roleIndex) => (
          <React.Fragment key={roleName}>
            <RoleName>
              {roleIndex + 1}) {roleName}
            </RoleName>
            {roleGroups[roleName].map((role, index, array) => (
              <React.Fragment key={role.index}>
                <RoleInfoComponent
                  role={role}
                  roleName={roleName}
                  index={role.index}
                  onClick={handleRoleInfoClick}
                />
                {isRevisionVisible && index === array.length - 1 && (
                  <DetailProfileButton
                    onClick={() =>
                      handleRoleModalOpen(role.roleId, roleName, "create")
                    }
                  >
                    + 역할 상세 프로필
                  </DetailProfileButton>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}

        <RecruitDoneButton onClick={makeStatusDone}>마감</RecruitDoneButton>

        {isRoleModalOpen &&
          selectedRoleId !== null &&
          selectedRoleName !== null && (
            <ModalBackground onClick={handleRoleModalClose}>
              <div onClick={(e) => e.stopPropagation()}>
                {modalType === "update" ? (
                  <CompanyRoleModalUpdate
                    closeModal={handleRoleModalClose}
                    roleId={selectedRoleId}
                    jobPostId={id}
                    roleName={selectedRoleName}
                    onRoleUpdated={fetchJobPost}
                  />
                ) : (
                  <CompanyRoleModalCreate
                    closeModal={handleRoleModalClose}
                    jobPostId={id}
                    roleName={selectedRoleName}
                    onRoleCreated={fetchJobPost}
                  />
                )}
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
  position: relative;
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
  margin-bottom: 30px;
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

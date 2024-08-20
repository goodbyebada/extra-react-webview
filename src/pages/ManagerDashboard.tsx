import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "@components/Modal";
import HomeRecruitBox from "@components/HomeRecruitBox";
import { JobPost } from "@api/interface";
import { useEffect, useState } from "react";

function ManagerDashboard() {
  const navigate = useNavigate();
  const [jobPostList, setJobPostList] = useState<JobPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // jobPost API 호출
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    fetch(`${import.meta.env.VITE_SERVER_URL}api/v1/jobposts?page=0`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Failed to fetch job posts", response.statusText);
          return [];
        }
      })
      .then((data: JobPost[]) => {
        console.log("Job posts fetched successfully:", data);
        setJobPostList(data);
      })
      .catch((error) => {
        console.error("Failed to fetch job posts", error);
      });
  }, []);

  const goToDetail = ({ title, gatheringTime, gatheringLocation }: JobPost) => {
    localStorage.setItem("gatheringTime", gatheringTime);
    localStorage.setItem("gatheringLocation", gatheringLocation);

    navigate(`/detail/${title}`);
  };

  const goToAdd = () => {
    navigate("/add-notice");
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          marginLeft: "30px",
          marginRight: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "50px",
          }}
        >
          <p style={{ fontWeight: "900", fontSize: "32px" }}>우리 회사 공고</p>
          <PlusButton onClick={handleAdd}>+</PlusButton>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "flex-end",
            marginTop: "10px",
            marginBottom: "15px",
            fontSize: "12px",
          }}
        >
          <p style={{ margin: "0 15px" }}>전체</p>
          <p style={{ margin: "0 0" }}>내게만 보기</p>
        </div>
      </div>

      {jobPostList.map((elem) => (
        <Column key={elem.id}>
          <HomeRecruitBox
            navigate={() => goToDetail(elem)}
            recruitInfo={elem}
          />
        </Column>
      ))}

      <Modal isVisible={isModalOpen} onClose={closeModal}>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          이전 양식
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <CreateNewButton onClick={goToAdd}>새로 만들기</CreateNewButton>
        </div>
      </Modal>
    </>
  );
}

export default ManagerDashboard;

const Column = styled.div`
  display: flex;
  justify-content: center;
`;

const PlusButton = styled.button`
  font-size: 30px;
  border-radius: 5px;
  padding: 0 8px 0;
  background-color: #fff;
`;

const CreateNewButton = styled.button`
  background: #858585;
  color: #fff;
  border: none;
  border-radius: 10px;
  width: 284px;
  padding: 5px 0 5px;
  font-size: 20px;
  font-weight: bold;
`;

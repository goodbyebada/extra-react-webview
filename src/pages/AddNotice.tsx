import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "@assets/backIcon.png";
import styled from "styled-components";
import Modal from "../components/Modal";
import CompanyRoleModal from "@/components/Modal/CompanyRoleModalCreate";
import CompanyTitleCategoryModal from "@components/Modal/CompanyTitleCategoryModal";

function AddNotice() {
  const navigate = useNavigate();
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [roleName, setRoleName] = useState("");

  const [jobId, setJobId] = useState<string | undefined>(undefined);

  const goBackManager = () => {
    navigate("/manager-dashboard");
  };

  const handlePlusButtonClick1 = (type: 1) => {
    setModalType(type);
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  const handlePlusButtonClick2 = (type: 2) => {
    setModalType(type);
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
    handleConfirmToAdd(); // 날짜 시간 장소 모달을 닫을 때 jobposts API 호출
  };

  const handleConfirmClick = () => {
    if (modalType === 1) {
      setTitle(title);
      setCategory(category);
      closeModal1();
    } else if (modalType === 2) {
      setDate(date);
      setTime(time);
      setPlace(place);
      closeModal2(); // 모달을 닫고 jobposts API 호출
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.currentTarget.value);
  };

  const closeTitleCategoryModal = (title: string, category: string) => {
    setTitle(title);
    setCategory(category);
    setIsModalOpen1(false);
  };

  const openRoleModal = () => {
    setIsRoleModalOpen(true);
  };

  const closeRoleModal = () => {
    setIsRoleModalOpen(false);
  };

  const handleConfirmToAdd = () => {
    const newJobPost = {
      title,
      gatheringLocation: place,
      gatheringTime: `${time} 예정`,
      hourPay: 9860,
      category,
    };

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    fetch(`${import.meta.env.VITE_SERVER_URL}api/v1/jobposts`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newJobPost),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create job post");
        }
      })
      .then((data) => {
        const jobId = String(data.id);
        console.log("Job Post created with ID:", jobId);
        setJobId(jobId);
      })
      .catch((error) => {
        console.error("An error occurred while creating job post:", error);
      });
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "start", padding: "10px" }}>
        <img
          src={backIcon}
          alt="back"
          onClick={goBackManager}
          style={{ margin: "12px 10px 10px" }}
        />
        <p style={{ margin: "12px 5px", fontSize: "25px", fontWeight: "bold" }}>
          공고 등록
        </p>
      </div>
      <Column>
        {title.length > 0 && category.length > 0 ? (
          <Column style={{ background: "#000" }}>
            <p
              style={{
                color: "#F5C001",
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              {title}
            </p>
            <p
              style={{
                color: "#5A5A5A",
                marginBottom: "10px",
              }}
            >
              {category}
            </p>
          </Column>
        ) : (
          <Container>
            <Column>
              <PlusButton onClick={() => handlePlusButtonClick1(1)}>
                +
              </PlusButton>
              <p style={{ color: "#5A5A5A" }}>제목, 카테고리</p>
            </Column>
          </Container>
        )}
        {date.length > 0 && time.length && place.length > 0 ? (
          <Column
            style={{
              background: "#000",
              width: "90%",
              borderTop: "1px solid white",
              borderBottom: "1px solid white",
              alignItems: "flex-start",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            <div style={{ margin: "10px 0" }}>
              <div>
                <p>{time} 예정</p>
                <p>{place}</p>
              </div>
              <p>{date}</p>
            </div>
          </Column>
        ) : (
          <Container>
            <Column>
              <PlusButton onClick={() => handlePlusButtonClick2(2)}>
                +
              </PlusButton>
              <p style={{ color: "#5A5A5A" }}>날짜, 시간, 장소</p>
            </Column>
          </Container>
        )}
        <Container
          style={{
            height: "200px",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <div style={{ marginTop: "15px", marginLeft: "15px" }}>
            <CustomInput2
              type="text"
              value={roleName}
              onChange={handleInputChange}
            />
            역할
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
              width: "100%",
              height: "100%",
            }}
          >
            <Container2 onClick={openRoleModal}>
              <p>+ 역할 상세 프로필</p>
            </Container2>
          </div>
        </Container>

        <FinalConfirmButton onClick={handleConfirmToAdd}>
          확인
        </FinalConfirmButton>
      </Column>

      {isModalOpen1 && (
        <ModalBackground onClick={() => closeTitleCategoryModal("", "")}>
          <div onClick={(e) => e.stopPropagation()}>
            <CompanyTitleCategoryModal closeModal={closeTitleCategoryModal} />
          </div>
        </ModalBackground>
      )}

      <Modal isVisible={isModalOpen2} onClose={closeModal2}>
        <Row>
          <Txt>날짜 : </Txt>
          <CustomInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></CustomInput>
        </Row>
        <Row>
          <Txt>시간 : </Txt>
          <CustomInput
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          ></CustomInput>
        </Row>
        <Row>
          <Txt>장소 : </Txt>
          <CustomInput
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          ></CustomInput>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "25px",
          }}
        >
          <CheckButton onClick={handleConfirmClick}>확인</CheckButton>
        </div>
      </Modal>

      {isRoleModalOpen && (
        <ModalBackground onClick={closeRoleModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <CompanyRoleModal
              closeModal={closeRoleModal}
              roleName={roleName}
              jobPostId={jobId}
            />
          </div>
        </ModalBackground>
      )}
    </>
  );
}

export default AddNotice;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Container = styled.div`
  background: #302e34;
  width: 90%;
  height: 150px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Container2 = styled.div`
  background-color: rgba(83, 82, 85, 0.7);
  color: rgba(255, 255, 255, 0.7);
  width: 90%;
  height: 80px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
`;

const PlusButton = styled.button`
  font-size: 30px;
  border-radius: 5px;
  padding: 0 8px 0;
  background-color: #fff;
  margin-bottom: 10px;
`;

const CheckButton = styled.button`
  background: #f5c001;
  color: white;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 700;
  padding: 5px 14px 5px;
  width: 93px;
  height: 40px;
`;

const FinalConfirmButton = styled.button`
  background: #f5c001;
  color: white;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 14px 5px;
`;

const CustomInput = styled.input`
  border: none;
  outline: none;
  background: #302e34;
  height: 25px;
  margin-left: 10px;
  padding-left: 15px;
  color: white;
  margin-right: 10px;
  width: 60%;
`;

const CustomInput2 = styled.input`
  border: none;
  border-bottom: 1px solid white;
  outline: none;
  background: #302e34;
  height: 25px;
  margin-left: 10px;
  padding-left: 10px;
  color: white;
  margin-right: 10px;
  width: 40%;
`;

const Txt = styled.p`
  color: #fff;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.2px;
  margin-right: 20px;
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

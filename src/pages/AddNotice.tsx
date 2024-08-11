import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../asset/backIcon.png";
import styled from "styled-components";
import Modal from "../components/Modal";
import CompanyRoleModal from "@/components/Modal/CompanyRoleModal";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
`;

const CheckButton = styled.button`
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
  width: 40%;
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

function AddNotice() {
  const navigate = useNavigate();
  // 제목과 카테고리 모달
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  // 날짜 시간 장소 모달
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  // 모달의 종류 지정 ( 1: 제목 카테고리 / 2: 날짜 시간 장소 )
  const [modalType, setModalType] = useState(0);

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false); // 역할 모달 열림 상태 추가

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

  const [role, setRole] = useState("");
  // const [gender, setGender] = useState("");
  // const [season, setSeason] = useState("");
  // const [costume, setCostume] = useState("");
  // const [tattoo, setTattoo] = useState("");
  // const [people, setPeople] = useState(0);

  const goBackManager = () => {
    navigate("/");
  };

  // 제목과 카테고리 설정을 위한
  const handlePlusButtonClick1 = (type: 1) => {
    setModalType(type);
    setIsModalOpen1(true);
  };
  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  // 날짜 시간 장소 설정을 위한
  const handlePlusButtonClick2 = (type: 2) => {
    setModalType(type);
    setIsModalOpen2(true);
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  // 확인 버튼 구현
  const handleConfirmClick = () => {
    // 제목과 카테고리 모달의 경우
    if (modalType === 1) {
      setTitle(title);
      setCategory(category);

      closeModal1();
    }
    // 날짜 시간 장소 모달의 경우
    else if (modalType === 2) {
      setDate(date);
      setTime(time);
      setPlace(place);

      closeModal2();
    }
  };

  // 역할을 작성했을 때
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setRole(e.currentTarget.value);
    }
  };

  const openRoleModal = () => {
    setIsRoleModalOpen(true);
  };

  const closeRoleModal = () => {
    setIsRoleModalOpen(false);
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
              style={{ color: "#F5C001", fontSize: "32px", fontWeight: "bold" }}
            >
              {title}
            </p>
            <p style={{ color: "#5A5A5A" }}>{category}</p>
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
            }}
          >
            <div>
              <p>{time} 예정</p>
              <p>{place}</p>
            </div>
            <p>{date}</p>
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
        {role.length > 0 ? (
          // ??????????????????? role에 저장이 되는지 추적 불가 ㅜ
          <p>{role}</p>
        ) : (
          <Container
            style={{
              height: "200px",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <div style={{ marginTop: "15px", marginLeft: "15px" }}>
              {/* // error  'e' is defined but never used
                                <CustomInput2 type="text" onKeyDown={(e) => {handleKeyDown}}/> 
                                */}
              <CustomInput2 type="text" onKeyDown={handleKeyDown} />
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
              {/* 눌렀을 때 7개의 조율 사항 모달이 뜨도록 구현해야함!!!! */}

              <Container2 onClick={openRoleModal}>
                <p>+ 역할 상세 프로필</p>
              </Container2>
            </div>
          </Container>
        )}

        <CheckButton>확인</CheckButton>
      </Column>

      {/* 제목과 카테고리 모달 내용 */}
      <Modal isVisible={isModalOpen1} onClose={closeModal1}>
        <Row>
          <p style={{ fontSize: "17px", fontWeight: "bold" }}>제목 : </p>
          <CustomInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></CustomInput>
        </Row>
        <Row>
          <p style={{ fontSize: "17px", fontWeight: "bold" }}>카테고리 : </p>
          <CustomInput
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

      {/* 날짜 시간 장소 모달의 내용 */}
      <Modal isVisible={isModalOpen2} onClose={closeModal2}>
        <Row>
          <p style={{ fontSize: "17px", fontWeight: "bold" }}>날짜 : </p>
          <CustomInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></CustomInput>
        </Row>
        <Row>
          <p style={{ fontSize: "17px", fontWeight: "bold" }}>시간 : </p>
          <CustomInput
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          ></CustomInput>
        </Row>
        <Row>
          <p style={{ fontSize: "17px", fontWeight: "bold" }}>장소 : </p>
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

      {/* 역할 상세 모달 */}
      {isRoleModalOpen && <CompanyRoleModal closeModal={closeRoleModal} />}
    </>
  );
}

export default AddNotice;

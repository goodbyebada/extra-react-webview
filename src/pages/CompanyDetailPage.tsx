import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backIcon from "../asset/backIcon.png";
import reviseIcon from "../asset/reviseIcon.png";
import { sendMessage } from "@api/message";

const CustomBorder = styled.div`
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  border-left: 0;
  border-right: 0;
  padding: 10px;
  margin: 0 10px 0 10px;
  font-size: 13px;
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
  background-color: #302e34;
  width: 380px;
  height: 100px;
  margin: 20px 0;
  cursor: pointer;
  font-size: 10px;
`;

const DetailProfileButton = styled.button`
  background-color: rgba(83, 82, 85, 0.7);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  border: none;
  padding: 10px;
  cursor: pointer;
  display: block;
  margin-top: -10px;
  margin-bottom: 10px;
  width: 60%;
  height: 40px;
  text-align: center;
`;

const CompleteRevButton = styled.button`
  background-color: #5bde0b;
  color: #fff;
  border-radius: 5px;
  border: none;
  margin-top: 20px;
  padding: 3px 8px;
`;

function CompanyDetailPage() {
  const navigate = useNavigate();

  // 이전페이지로 돌아가기
  const goBackManager = () => {
    //navigate("/");
    sendMessage({
      type: "HISTORY_BACK",
      version: "1.0",
    });
  };

  const goToCheckApplicant = () => {
    navigate("/applicants");
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

  return (
    <div
      style={{
        overflowX: "hidden",
      }}
    >
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
          {/* 데이터 연결!!!!!! */}
          드라마제목
        </p>
      </div>

      <CustomBorder>
        <p style={{ margin: 0 }}>시간</p>
        <Row>
          <p style={{ margin: 0, marginRight: "auto" }}>위치</p>

          {/* 모집중인지 판단하도록 로직을 구현해야함!!!!!!! */}
          <StatusBadge>모집중</StatusBadge>
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
        {/* 데이터를 연결해야하는 부분 */}

        <p
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            textAlign: "left",
            marginLeft: "50px",
            marginBottom: "-10px",
            fontWeight: "bold",
          }}
        >
          학생 역할
        </p>

        <RoleInfo onClick={goToCheckApplicant}>
          <p>1. 성별: 남</p>
          <p>2. 나이: 20~35세</p>
          <p>3. 계절: 여름</p>
          <p>4. 의상: 정장1, 세미정장1, 캐주얼2</p>
        </RoleInfo>
        {isRevisionVisible && (
          <DetailProfileButton>+ 역할 상세 프로필</DetailProfileButton>
        )}
        <RoleInfo />
        {isRevisionVisible && (
          <DetailProfileButton>+ 역할 상세 프로필</DetailProfileButton>
        )}
        <RoleInfo />
        {isRevisionVisible && (
          <DetailProfileButton>+ 역할 상세 프로필</DetailProfileButton>
        )}

        {isCompleteRevVisible && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CompleteRevButton onClick={handleCompleteRev}>
              수정완료
            </CompleteRevButton>
          </div>
        )}
      </Column>
    </div>
  );
}

export default CompanyDetailPage;

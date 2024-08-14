import { useEffect, useState } from "react";
import styled from "styled-components";
import backIcon from "@assets/backIcon.png";
import reviseIcon from "@assets/reviseIcon.png";
import { sendMessage } from "@api/utils";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoleName = styled.p`
  margin-bottom: 20px;
  font-size: 20px;
  color: #fff;
  font-weight: 700;
`;

const RoleInfo = styled.div`
  background-color: #535255;
  width: "80%";
  height: 100px;
  margin-bottom: 20px;
  font-size: 10px;
  border-radius: 20px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const RolePersonnal = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
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
  // 이전페이지로 돌아가기
  const goBackManager = () => {
    //navigate("/");
    sendMessage({
      type: "HISTORY_BACK",
      version: "1.0",
    });
  };

  const goToCheckApplicant = () => {
    // navigate("/applicants");
    sendMessage({
      type: "NAVIGATION_APPLICANTS",
      payload: {
        uri: "/applicants",
      },
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

  const [data, setData] = useState({
    id: 0,
    title: "",
    category: "",
    time: "",
    place: "",
    date: "",
    limit_personnal: 0,
    current_personnal: 0,
  });

  useEffect(() => {
    setData({
      id: 1,
      title: "테스트",
      category: "테스트",
      time: "테스트",
      place: "테스트",
      date: "2021-08-01",
      limit_personnal: 10,
      current_personnal: 5,
    });
  }, []);

  return (
    <Column>
      <Column
        style={{
          width: "90%",
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
          <div>{data.category}</div>
        </div>
        <div
          style={{
            marginTop: "2rem",
            fontSize: "2rem",
            fontWeight: "600",
            color: "#F5C001",
            marginBottom: ".5rem",
          }}
        >
          {data.title}
        </div>
      </Column>

      <Column
        style={{
          background: "#000",
          width: "90%",
          borderTop: "1px solid #fff",
          borderBottom: "1px solid #fff",
          padding: ".5rem 0 .5rem",
          marginBottom: "1rem",
        }}
      >
        <p style={{ width: "100%", fontSize: "1rem", fontWeight: "700" }}>
          {data.time} 예정
        </p>
        <p style={{ width: "100%", fontSize: "1rem", fontWeight: "700" }}>
          {data.place}
        </p>
        <p
          style={{
            width: "100%",
            fontSize: "1rem",
            fontWeight: "700",
            textAlign: "right",
          }}
        >
          {data.date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3")}
        </p>
      </Column>
      <div
        style={{
          width: "90%",
        }}
      >
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
      </div>

      <div
        style={{
          width: "90%",
        }}
      >
        {/* 데이터를 연결해야하는 부분 */}

        <RoleName>1) 학생 역할</RoleName>

        <RoleInfo onClick={goToCheckApplicant}>
          <p>1. 성별: 남</p>
          <p>2. 나이: 20~35세</p>
          <p>3. 계절: 여름</p>
          <p>4. 의상: 정장1, 세미정장1, 캐주얼2</p>
          <RolePersonnal>
            ({data.limit_personnal}/{data.current_personnal})
          </RolePersonnal>
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
      </div>
    </Column>
  );
}

export default CompanyDetailPage;

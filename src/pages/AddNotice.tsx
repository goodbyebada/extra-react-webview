import React, { useState } from "react";
import backIcon from "@assets/backIcon.png";
import styled from "styled-components";
import CompanyRoleModal from "@/components/Modal/CompanyRoleModal";
import CompanyTitleCategoryModal from "@components/Modal/CompanyTitleCategoryModal";
import CompanyDateTimePlaceModal from "@components/Modal/CompanyDateTimePlaceModal";
import type { RoleRegister } from "@api/interface";
import { requestPostFetch } from "@api/utils";
import { useNavigate } from "react-router-dom";

const Column = styled.div`
  display: flex;
  flex-direction: column;
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

const Container3 = styled.div`
  border-radius: 10px;
  background: rgba(83, 82, 85, 0.7);
  width: 264px;
  height: 49px;
  flex-shrink: 0;
  font-size: 12px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 14px 5px;
  margin-bottom: 30px;
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

const RoleInfo = styled.div`
  background-color: #302e34;
  width: 90%;
  height: 100px;
  margin-bottom: 20px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 20px;
  position: relative;
`;

function AddNotice() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState<boolean[]>(
    Array.from({ length: 3 }, () => false),
  );

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

  const [roleName, setRoleName] = useState<string[]>([]);
  const [roleList, setRoleList] = useState<RoleRegister[][]>([]);
  const [roleValue, setRoleValue] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goBackManager = () => {
    navigate("/manager-dashboard");
  };

  // 모달 열기
  const handlePlusButtonClick = (type: number) => {
    const newOpenModal = [...openModal];
    newOpenModal[type - 1] = true;
    setOpenModal(newOpenModal);
  };

  const submitTitleCategoryModal = (title: string, category: string) => {
    setTitle(title);
    setCategory(category);
  };

  const submitDateTimePlaceModal = (
    date: string,
    time: string,
    place: string,
  ) => {
    setDate(date);
    setTime(time);
    setPlace(place);
  };

  const submitRoleModal = (role: RoleRegister) => {
    const newRoleList = [...roleList];
    newRoleList[currentIndex] = newRoleList[currentIndex]
      ? [...newRoleList[currentIndex], role]
      : [role];
    setRoleList(newRoleList);
  };

  const closeModal = () => {
    setOpenModal(Array.from({ length: 3 }, () => false));
  };

  // 역할을 작성했을 때
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      setRoleName([...roleName, e.currentTarget.value]);
      setRoleValue("");
    }
  };

  // const openTitleCategoryModal = () => {
  //   setIsModalOpen1(true);
  // };

  const convertTime = (date: string, time: string) => {
    const newDate = new Date(`${date}T${time}:00.000`);
    return newDate.toISOString();
  };

  function ageToBirthdate(age: number): string {
    const today = new Date();

    // 현재 연도에서 나이를 빼서 출생 연도 계산
    let birthYear = today.getFullYear() - age;

    // 기본적으로 오늘의 월과 일을 사용
    const birthMonth = today.getMonth(); // 0부터 시작 (0: 1월, 11: 12월)
    const birthDay = today.getDate();

    // 생일이 지나지 않았다면 출생 연도를 1년 빼줌
    const birthdate = new Date(birthYear, birthMonth, birthDay);
    if (birthdate > today) {
      birthYear--;
    }

    // yyyy-mm-dd 형식으로 반환
    return `${birthYear}-${String(birthMonth + 1).padStart(2, "0")}-${String(birthDay).padStart(2, "0")}`;
  }

  const handleConfirmToAdd = async () => {
    if (isSubmitting) return; // 이미 요청 중이면 실행하지 않음
    setIsSubmitting(true);

    if (title && category && date && time && place) {
      try {
        const jobPostResponse = await requestPostFetch("jobposts", {
          title,
          gatheringLocation: place,
          gatheringTime: convertTime(date, time),
          imageUrl: "",
          hourPay: 0,
          category,
        });

        if (jobPostResponse !== null) {
          if (jobPostResponse.status === 201) {
            const data = await jobPostResponse.json();
            const id = data.id;

            const scheduleResponse = await requestPostFetch(
              `jobposts/${id}/schedules`,
              { calender: date },
            );

            if (scheduleResponse !== null) {
              alert(`s: ${scheduleResponse.status}`);
              if (scheduleResponse.status === 201) {
                const roleRequests = roleList.map((roles, index) =>
                  Promise.all(
                    roles.map((r) =>
                      requestPostFetch(`jobposts/${id}/roles`, {
                        roleName: roleName[index],
                        costume: r.costume,
                        sex: r.sex,
                        minAge: ageToBirthdate(r.min_age),
                        maxAge: ageToBirthdate(r.max_age),
                        limitPersonnal: r.limit_personnal,
                        currentPersonnal: 0,
                        season: r.season,
                        tattoo: r.tattoo,
                      }),
                    ),
                  ),
                );
                await Promise.all(roleRequests);
                navigate("/manager-dashboard");
              }
            }
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsSubmitting(false); // 요청 완료 후 상태를 false로 변경
      }
    }
  };

  const RoleRegisterContainer = (index: number) => {
    return (
      <Container
        style={{
          height: "200px",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "15px", marginLeft: "15px" }}>
          {index + 1}){" "}
          {/* // error  'e' is defined but never used
                                      <CustomInput2 type="text" onKeyDown={(e) => {handleKeyDown}}/> 
                                      */}
          {roleName[index] || (
            <CustomInput2
              type="text"
              value={roleValue}
              onChange={(event) => setRoleValue(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          )}{" "}
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

          <Container2
            onClick={() => {
              setCurrentIndex(index);
              handlePlusButtonClick(3);
            }}
          >
            <p>+ 역할 상세 프로필</p>
          </Container2>
        </div>
      </Container>
    );
  };

  return (
    <>
      <Column
        style={{
          marginTop: "3rem",
          width: "100%",
        }}
      >
        {title.length > 0 && category.length > 0 ? (
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
              <div>{category}</div>
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
              {title}
            </div>
          </Column>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "start",
                padding: "10px",
              }}
            >
              <img
                src={backIcon}
                alt="back"
                onClick={goBackManager}
                style={{ margin: "12px 10px 10px" }}
              />
              <p
                style={{
                  margin: "12px 5px",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                공고 등록
              </p>
            </div>
            <Container>
              <Column>
                <PlusButton onClick={() => handlePlusButtonClick(1)}>
                  +
                </PlusButton>
                <p style={{ color: "#5A5A5A" }}>제목, 카테고리</p>
              </Column>
            </Container>
          </>
        )}
        {date.length > 0 && time.length && place.length > 0 ? (
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
              {time} 예정
            </p>
            <p style={{ width: "100%", fontSize: "1rem", fontWeight: "700" }}>
              {place}
            </p>
            <p
              style={{
                width: "100%",
                fontSize: "1rem",
                fontWeight: "700",
                textAlign: "right",
              }}
            >
              {date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3")}
            </p>
          </Column>
        ) : (
          <Container>
            <Column>
              <PlusButton onClick={() => handlePlusButtonClick(2)}>
                +
              </PlusButton>
              <p style={{ color: "#5A5A5A" }}>날짜, 시간, 장소</p>
            </Column>
          </Container>
        )}
        {roleName.length > 0 &&
          roleName.map((name, index) => (
            <>
              {roleList.length > 0 ? (
                <>
                  <p
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                      textAlign: "left",
                      marginLeft: "50px",
                      marginBottom: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}) {name} 역할
                  </p>
                  {roleList[index].map((role, key) => (
                    <RoleInfo key={key}>
                      <p>1. 성별: {role.sex ? "남" : "여"}</p>
                      <p>
                        2. 나이: {role.min_age}~{role.max_age}세
                      </p>
                      <p>3. 계절: {role.season}</p>
                      <p>4. 의상: {role.costume}</p>
                      <p
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "15px",
                          width: "50px",
                          height: "50px",
                          fontSize: "12px",
                        }}
                      >
                        (0/{role.limit_personnal})
                      </p>
                    </RoleInfo>
                  ))}
                  <Container3
                    onClick={() => {
                      setCurrentIndex(index);
                      handlePlusButtonClick(3);
                    }}
                  >
                    <p>+</p>
                    <p>역할 상세 프로필</p>
                  </Container3>
                </>
              ) : (
                RoleRegisterContainer(index)
              )}
            </>
          ))}
        {RoleRegisterContainer(roleName.length)}

        <CheckButton onClick={handleConfirmToAdd}>확인</CheckButton>
      </Column>

      {/* 제목 카테고리 모달의 내용 */}
      {openModal[0] && (
        <CompanyTitleCategoryModal
          onSubmit={submitTitleCategoryModal}
          closeModal={closeModal}
        />
      )}

      {/* 날짜 시간 장소 모달의 내용 */}
      {openModal[1] && (
        <CompanyDateTimePlaceModal
          onSubmit={submitDateTimePlaceModal}
          closeModal={closeModal}
        />
      )}

      {/* 역할 상세 모달 */}
      {openModal[2] && (
        <CompanyRoleModal onSubmit={submitRoleModal} closeModal={closeModal} />
      )}
    </>
  );
}

export default AddNotice;

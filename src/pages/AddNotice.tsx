import React, { useState } from "react";
import styled from "styled-components";
import PostFormCard from "@components/mocules/company/PostFormCard";
import RoleDetailBox from "@components/mocules/company/RoleDetailBox";
import CompanyRoleModal from "@/components/Modal/CompanyRoleModal";
import CompanyTitleCategoryModal from "@components/Modal/CompanyTitleCategoryModal";
import CompanyDateTimePlaceModal from "@components/Modal/CompanyDateTimePlaceModal";
import { MainButton } from "@components/atoms/Button";
import Text from "@components/atoms/Text";
import {
  SeasonEnum,
  type CategoryEnum,
  type RoleRegister,
} from "@api/interface";
import { requestPostFetch } from "@api/utils";
import { useNavigate } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";

/**
 * AddNotice : 업체 - 공고 등록록 화면
 * 추후 수정 :
 * 1. 역할 등록 시 모집 공고 화면 컴포넌트 추가
 * 2. 구조가 비효율적
 */

function AddNotice() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTitleModalVisible, setTitleModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [isRoleModalVisible, setRoleModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<
    [keyof typeof CategoryEnum | null, string]
  >([null, ""]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

  const [roleName, setRoleName] = useState<string[]>([]);
  const [roleList, setRoleList] = useState<RoleRegister[][]>([]);
  const [roleValue, setRoleValue] = useState<string>("");
  const [currentIndex] = useState<number>(0);

  const handleOpenTitleModal = () => {
    setTitleModalVisible(true);
  };
  const handleOpenDateModal = () => {
    setDateModalVisible(true);
  };
  const handleOpenRoleModal = () => {
    setRoleModalVisible(true);
  };
  const handleCloseTitleModal = () => {
    setTitleModalVisible(false);
  };
  const handleCloseDateModal = () => {
    setDateModalVisible(false);
  };
  const handleCloseRoleModal = () => {
    setRoleModalVisible(false);
  };

  const goBackManager = () => {
    navigate("/manager-dashboard");
  };

  const submitTitleCategoryModal = (
    title: string,
    category: [keyof typeof CategoryEnum | null, string],
  ) => {
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

  // 역할을 작성했을 때
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      setRoleName([...roleName, e.currentTarget.value]);
      setRoleValue("");
      setRoleList([...roleList, []]);
    }
  };

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

    if (title && category[0] !== null && date && time && place) {
      try {
        const jobPostResponse = await requestPostFetch("jobposts", {
          title,
          gatheringLocation: place,
          gatheringTime: convertTime(date, time),
          imageUrl: "",
          status: false,
          hourPay: 0,
          category: category[0],
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
              if (scheduleResponse.status === 201) {
                const roleRequests = roleList.map((roles, index) =>
                  Promise.all(
                    roles.map(async (r) => {
                      const postRole = async () => {
                        const roleResponse = await requestPostFetch(
                          `jobposts/${id}/roles`,
                          {
                            roleName: roleName[index],
                            costume: r.costume,
                            sex: r.sex,
                            minAge: ageToBirthdate(r.min_age),
                            maxAge: ageToBirthdate(r.max_age),
                            limitPersonnel: r.limit_personnal,
                            currentPersonnel: 0,
                            season: r.season,
                            tattoo: r.tattoo,
                          },
                        );

                        if (roleResponse !== null) {
                          if (roleResponse.status === 201) {
                            return true;
                          }
                        }
                      };
                      postRole();
                    }),
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
      <RoleContainer
        style={{
          height: "200px",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          marginTop: "15px",
        }}
      >
        <div style={{ marginTop: "15px", marginLeft: "15px" }}>
          {index + 1})
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
          }}
        >
          <RoleDetailBox onClick={handleOpenRoleModal} />
        </div>
      </RoleContainer>
    );
  };

  return (
    <>
      <Header>
        <IoCaretBackOutline size={40} onClick={goBackManager} />
        <Text size={25} color="#fff" weight={900}>
          공고 등록
        </Text>
      </Header>

      <Column>
        {title.length > 0 && category[0] !== null ? (
          <div>
            <Text size={32} color="#F5C001" weight={600}>
              {title}
            </Text>
            <Text size={16} color="#fff" weight={600}>
              {category[1]}
            </Text>
          </div>
        ) : (
          <>
            <PostFormCard
              title="제목, 카테고리"
              onClick={handleOpenTitleModal}
            />
          </>
        )}
        {date.length > 0 && time.length && place.length > 0 ? (
          <div
            style={{
              borderTop: "1px solid #fff",
              borderBottom: "1px solid #fff",
              padding: ".5rem 0 .5rem",
              margin: "1rem 0",
              width: "100%",
            }}
          >
            <Row>
              <Text size={16} weight={700} align="left">
                {time} 예정
              </Text>
              <Text size={16} weight={700} align="right">
                {date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3")}
              </Text>
            </Row>
            <Text size={16} weight={700} align="left">
              {place}
            </Text>
          </div>
        ) : (
          <PostFormCard
            title="날짜, 시간, 장소"
            onClick={handleOpenDateModal}
          />
        )}
        {roleName.length > 0 &&
          roleName.map((name, index) => (
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
                  marginTop: "20px",
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
                  <p>3. 계절: {SeasonEnum[role.season]}</p>
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
              <RoleDetailBox onClick={handleOpenRoleModal} />
            </>
          ))}
        {RoleRegisterContainer(roleName.length)}

        <MainButton onClick={handleConfirmToAdd}>확인</MainButton>
      </Column>

      <CompanyTitleCategoryModal
        isVisible={isTitleModalVisible}
        onSubmit={submitTitleCategoryModal}
        closeModal={handleCloseTitleModal}
      />
      <CompanyDateTimePlaceModal
        isVisible={isDateModalVisible}
        onSubmit={submitDateTimePlaceModal}
        closeModal={handleCloseDateModal}
      />
      <CompanyRoleModal
        isVisible={isRoleModalVisible}
        onSubmit={submitRoleModal}
        closeModal={handleCloseRoleModal}
      />
    </>
  );
}

export default AddNotice;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

const RoleContainer = styled.div`
  background-color: #302e34;
  width: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
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
  width: 100%;
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

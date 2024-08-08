import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RoleRegister } from "../api/interface";
// import { dummyRoleResister } from "@api/dummyData";

/**
 * 관리자 공고 화면 역할 상세 프로필(역할 등록) 모달
 *
 * 수정할 것
 * 1. API 연결 시 역할 상세 프로필 등록과 수정 구분
 * 2. 데이터가 있다면 수정, 없다면 등록
 */

function CompanyRoleModal() {
  const [formState, setFormState] = useState<RoleRegister>({
    job_post_id: 1, // 임시, API 연결 시 수정
    sex: false, // 남: false, 여: true
    min_age: 0,
    max_age: 0,
    season: "봄",
    costume: "",
    check_tatto: "",
    etc: "",
    limit_personnal: 0,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // //dummyData
  // useEffect(() => {
  //   setFormState(dummyRoleResister);
  // }, []);

  const handleGenderClick = (gender: string) => {
    setFormState((prevState) => ({
      ...prevState,
      sex: gender === "여",
    }));
  };

  const handleSeasonClick = (season: string) => {
    setFormState((prevState) => ({
      ...prevState,
      season,
    }));
  };

  const handleIncrement = (
    field: "min_age" | "max_age" | "limit_personnal",
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: prevState[field] + 1,
    }));
  };

  const handleDecrement = (
    field: "min_age" | "max_age" | "limit_personnal",
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: prevState[field] > 0 ? prevState[field] - 1 : 0,
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTattooClick = (part: string) => {
    setFormState((prevState) => {
      const selectedParts = prevState.check_tatto.split(",").filter(Boolean);
      const newSelectedParts = selectedParts.includes(part)
        ? selectedParts.filter((p) => p !== part)
        : [...selectedParts, part];
      return {
        ...prevState,
        check_tatto: newSelectedParts.join(","),
      };
    });
  };

  const handleSubmit = () => {
    console.log(formState);
  };

  useEffect(() => {
    const { min_age, max_age, season, costume, etc, limit_personnal } =
      formState;
    const isValid =
      min_age > 0 &&
      max_age > 0 &&
      season !== "" &&
      costume !== "" &&
      etc !== "" &&
      limit_personnal > 0;
    setIsFormValid(isValid);
  }, [formState]);

  return (
    <ModalContainer>
      <RoleBoxWrapper>
        <Row>
          <Txt>1.성별: </Txt>
          <GenderButton
            selected={!formState.sex}
            onClick={() => handleGenderClick("남")}
          >
            남
          </GenderButton>
          <GenderButton
            selected={formState.sex}
            onClick={() => handleGenderClick("여")}
          >
            여
          </GenderButton>
        </Row>
        <Row>
          <Txt>2.나이: </Txt>
          <CountDisplay>
            {formState.min_age.toString().padStart(2, "0")}
          </CountDisplay>
          <CountControls>
            <CountButton onClick={() => handleIncrement("min_age")}>
              &lt;
            </CountButton>
            <LineSeparator />
            <CountButton onClick={() => handleDecrement("min_age")}>
              &gt;
            </CountButton>
          </CountControls>
          <AgeSeparator>~</AgeSeparator>
          <CountDisplay>
            {formState.max_age.toString().padStart(2, "0")}
          </CountDisplay>
          <CountControls>
            <CountButton onClick={() => handleIncrement("max_age")}>
              &lt;
            </CountButton>
            <LineSeparator />
            <CountButton onClick={() => handleDecrement("max_age")}>
              &gt;
            </CountButton>
          </CountControls>
        </Row>
        <Row>
          <Txt>3.계절: </Txt>
          <SeasonButton
            selected={formState.season === "봄"}
            onClick={() => handleSeasonClick("봄")}
            $first
          >
            봄
          </SeasonButton>
          <SeasonButton
            selected={formState.season === "여름"}
            onClick={() => handleSeasonClick("여름")}
          >
            여름
          </SeasonButton>
          <SeasonButton
            selected={formState.season === "가을"}
            onClick={() => handleSeasonClick("가을")}
          >
            가을
          </SeasonButton>
          <SeasonButton
            selected={formState.season === "겨울"}
            onClick={() => handleSeasonClick("겨울")}
            $last
          >
            겨울
          </SeasonButton>
        </Row>
        <Row>
          <Txt>4.의상: </Txt>
          <Input
            name="costume"
            spellCheck="false"
            value={formState.costume}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <RowWithTattoo>
            <Txt>5.문신여부: </Txt>
            <TattooContainer>
              <TattooRow>
                {["얼굴", "가슴", "다리", "어깨"].map((part, index) => (
                  <TattooBox
                    key={index}
                    onClick={() => handleTattooClick(part)}
                    selected={formState.check_tatto.split(",").includes(part)}
                  >
                    {part}
                  </TattooBox>
                ))}
              </TattooRow>
              <TattooRow>
                {["팔", "등", "손", "발"].map((part, index) => (
                  <TattooBox
                    key={index}
                    onClick={() => handleTattooClick(part)}
                    selected={formState.check_tatto.split(",").includes(part)}
                  >
                    {part}
                  </TattooBox>
                ))}
              </TattooRow>
            </TattooContainer>
          </RowWithTattoo>
        </Row>
        <Row>
          <Txt>6.기타사항: </Txt>
          <Input
            name="etc"
            spellCheck="false"
            value={formState.etc}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Txt>7.인원: </Txt>
          <CountDisplay>
            {formState.limit_personnal.toString().padStart(2, "0")}
          </CountDisplay>
          <CountControls>
            <CountButton onClick={() => handleIncrement("limit_personnal")}>
              &lt;
            </CountButton>
            <LineSeparator />
            <CountButton onClick={() => handleDecrement("limit_personnal")}>
              &gt;
            </CountButton>
          </CountControls>
        </Row>
      </RoleBoxWrapper>
      <Btn onClick={handleSubmit} $isValid={isFormValid}>
        확인
      </Btn>
    </ModalContainer>
  );
}

export default CompanyRoleModal;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 343px;
  height: 518px;
  border-radius: 30px;
  background: #302e34;
  z-index: 10;
`;

const RoleBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 50px;
  padding-left: 32px;
  padding-right: 15px;
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: nowrap;
`;

const RowWithTattoo = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Txt = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.2px;
  margin-right: 20px;
  line-height: 1.5;
`;

const GenderButton = styled.button<{ selected: boolean }>`
  width: 37px;
  height: 29px;
  flex-shrink: 0;
  border-radius: 30px 0 0 30px;
  background: ${(props) => (props.selected ? "#F5C001" : "#D9D9D9")};
  color: #fff;
  font-weight: 700;
  border: none;

  &:last-child {
    border-radius: 0 30px 30px 0;
    margin-right: 0;
  }
`;

const SeasonButton = styled.button<{
  selected: boolean;
  $first?: boolean;
  $last?: boolean;
}>`
  width: 37px;
  height: 29px;
  flex-shrink: 0;
  background: ${(props) => (props.selected ? "#F5C001" : "#D9D9D9")};
  color: #fff;
  font-weight: 700;
  border: none;

  ${(props) =>
    props.$first &&
    `
    border-radius: 30px 0 0 30px;
  `}
  ${(props) =>
    props.$last &&
    `
    border-radius: 0 30px 30px 0;
    margin-right: 0;
  `}
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  border-radius: 5px;
  background: #302e34;
  color: #fff;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: "dlig" on;
  font-family: Inter;
  font-size: 15px;
  font-weight: 900;
  border: none;
  outline: none;
  line-height: 1.5;
  padding: 5px;
  box-sizing: border-box;
`;

const CountDisplay = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 900;
  margin-right: 8px;
`;

const CountControls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CountButton = styled.button`
  display: flex;
  width: 8px;
  height: 10px;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: none;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 300;
  transform: rotate(90deg);
`;

const LineSeparator = styled.div`
  width: 10px;
  height: 0.5px;
  stroke: #fff;
  background-color: #fff;
`;

const AgeSeparator = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 900;
  margin-left: 7px;
  margin-right: 4px;
`;

const Btn = styled.button<{ $isValid: boolean }>`
  width: 93px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${(props) =>
    props.$isValid ? "#F5C001" : "rgba(245, 192, 1, 0.5)"};
  color: ${(props) => (props.$isValid ? "#FFF" : "rgba(255, 255, 255, 0.5)")};
  font-size: 24px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.24px;
  display: block;
  margin: 0px auto;
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ${(props) => (props.$isValid ? "pointer" : "not-allowed")};
`;

const TattooContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TattooRow = styled.div`
  display: flex;
  gap: 8px;
`;

const TattooBox = styled.button<{ selected: boolean }>`
  width: 36px;
  height: 23px;
  border-radius: 5px;
  background: ${(props) =>
    props.selected ? "rgba(116, 116, 116, 0.40)" : "#747474"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.selected ? "rgba(255, 255, 255, 0.50)" : "#fff")};
  font-size: 13px;
  font-weight: 700;
  border: none;
`;
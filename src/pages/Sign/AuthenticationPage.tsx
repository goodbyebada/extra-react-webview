import { useState, useRef } from "react";
import { Control, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Container from "@/components/atoms/Container";
import Window from "@components/mocules/Window";
import Text from "@components/atoms/Text";

import { SiAuthelia } from "react-icons/si";
import Margin from "@components/atoms/Margin";
import { InputField } from "@components/atoms/Form";
import { MainButton } from "@components/atoms/Button";
import { BACKGROUND_COLORS, COMMON_COLORS, FONT_COLORS } from "@/styled/colors";

const NumberInputGroup = ({
  control,
  inputRefs,
  handleInputChange,
  isDisabled,
}: {
  control: Control;
  inputRefs: Record<"1" | "2" | "3" | "4", React.RefObject<HTMLInputElement>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: "1" | "2" | "3" | "4",
  ) => void;
  isDisabled: boolean;
}) => {
  return (
    <Container flexDirection="row" flex={80} justifyContent="space-between">
      {(["1", "2", "3", "4"] as const).map((name) => (
        <Container flexDirection="row" flex={20} key={name}>
          <InputField
            name={name}
            control={control}
            placeholder="0"
            type="number"
            inputProps={{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e, name),
              disabled: isDisabled,
              style: {
                padding: "0",
                textAlign: "center",
              },
            }}
            ref={inputRefs[name]}
            rules={{
              required: true,
              pattern: /[0-9]{1}/,
            }}
          />
        </Container>
      ))}
    </Container>
  );
};

const AuthenticationPage = () => {
  const { control, setValue, getValues } = useForm();

  const [isSended, setIsSended] = useState<boolean>(false);
  const [status, setStatus] = useState<"waiting" | "checking" | "completion">(
    "waiting",
  );

  const navigate = useNavigate();

  const inputRefs = {
    "1": useRef<HTMLInputElement>(null),
    "2": useRef<HTMLInputElement>(null),
    "3": useRef<HTMLInputElement>(null),
    "4": useRef<HTMLInputElement>(null),
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: "1" | "2" | "3" | "4",
  ) => {
    const value = e.target.value;
    console.log(inputRefs);

    if (value.length === 1 && !isNaN(Number(value))) {
      setValue(name, Number(value));

      if (name === "1") {
        inputRefs["2"].current?.focus();
        console.log(inputRefs["2"]);
      } else if (name === "2") {
        inputRefs["3"].current?.focus();
        console.log(inputRefs["3"]);
      } else if (name === "3") {
        inputRefs["4"].current?.focus();
      }
    }

    // 마지막 필드 입력 시 종료 로직 실행
    if (name === "4" && value.length === 1) {
      setStatus("checking");
      setTimeout(() => {
        setStatus("completion");
        const { phone } = getValues();
        localStorage.setItem("phone", phone);
        setTimeout(() => {
          navigate("/user-type");
        }, 2000);
      }, 2000);
    }
  };

  return (
    <Window background={BACKGROUND_COLORS.sign}>
      <Container>
        <Margin size={40} />
        <SiAuthelia
          size={60}
          color={
            status == "completion"
              ? COMMON_COLORS.main
              : BACKGROUND_COLORS.disabled
          }
        />
        <Margin size={20} />
        <Text
          size={20}
          color={
            status == "completion" ? COMMON_COLORS.main : FONT_COLORS.white
          }
        >
          {!isSended
            ? "전송 대기"
            : status == "waiting"
              ? "인증 대기"
              : status == "checking"
                ? "인증 중"
                : "인증 완료"}
        </Text>
      </Container>
      <Container paddingHorizontal={40}>
        {isSended ? (
          <Container>
            <NumberInputGroup
              control={control}
              inputRefs={inputRefs}
              handleInputChange={handleInputChange}
              isDisabled={!isSended || status !== "waiting"}
            />
          </Container>
        ) : (
          <Container>
            <InputField
              name="phone"
              control={control}
              placeholder="전화번호 ('-' 없이 입력)"
            />
            <Margin size={30} />
            <MainButton
              onClick={() => {
                console.log("sending");
                setIsSended(true);
              }}
              isActive={!isSended}
              disabled={isSended}
            >
              {isSended ? "전송 완료" : "인증 번호 전송"}
            </MainButton>
          </Container>
        )}
      </Container>
    </Window>
  );
};

export default AuthenticationPage;

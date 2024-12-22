import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Margin from "@components/atoms/Margin";
import { InputField } from "@components/atoms/Form";
import SignWindow from "@components/mocules/SignWindow";

const MainFormPage = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm();

  const navigate = useNavigate();

  return (
    <SignWindow
      title="회원가입"
      subTitle="계정 생성을 위해 필요한 정보를 입력해주세요"
      buttonProps={{
        isActive: isValid,
        disabled: !isValid,
        onClick: handleSubmit((data) => {
          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email);
          localStorage.setItem("password", data.password);
          navigate("/auth");
        }),
      }}
    >
      <InputField
        name="name"
        control={control}
        placeholder="이름"
        rules={{
          required: true,
        }}
      />
      <Margin size={10} />
      <InputField
        name="email"
        control={control}
        placeholder="이메일"
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        }}
      />
      <Margin size={10} />
      <InputField
        name="password"
        control={control}
        placeholder="비밀번호"
        rules={{
          required: true,
        }}
        type="password"
      />
      <Margin size={10} />
      <InputField
        name="passwordChk"
        control={control}
        placeholder="비밀번호 확인"
        rules={{
          required: true,
          validate: {
            matchPassword: (value) => {
              const { password } = getValues();
              return password === value;
            },
          },
        }}
        type="password"
      />
    </SignWindow>
  );
};

export default MainFormPage;

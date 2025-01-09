import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import Container from "@components/atoms/Container";
import { InputField } from "@components/atoms/Form";
import { MainButton } from "@components/atoms/Button";
import Margin from "@components/atoms/Margin";
import Text from "@components/atoms/Text";

import logoImage from "@/assets/logo.png";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FONT_COLORS } from "@/styled/colors";
import Window from "@components/mocules/Window";
import KakaoLogin from "react-kakao-login";

const SocialLoginButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    max-width: 120px;
  }
`;

interface KakaoSuccessResponse {
  response: {
    access_token: string;
  };
}

interface KakaoFailureResponse {
  error: string; // Adjust based on the actual error structure.
}

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const navigate = useNavigate();

  const kakaoClientId = import.meta.env.VITE_KAKAO_API_KEY;
  const kakaoOnSuccess = async (data: KakaoSuccessResponse) => {
    console.log(data);
    const idToken = data.response.access_token;
    console.log(idToken);
    navigate("/member/home");
  };
  const kakaoOnFailure = (error: KakaoFailureResponse) => {
    console.log(error);
    console.log(error);
  };

  return (
    <Window>
      <Container flex={20}>
        <LogoImageWrapper>
          <img src={logoImage} alt="extra" />
        </LogoImageWrapper>
      </Container>
      <Container flex={25} paddingHorizontal={30}>
        <InputField
          name="email"
          placeholder="이메일"
          control={control}
          rules={{
            required: true,
            pattern: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          }}
        />
        <Margin size={15} />
        <InputField
          name="password"
          placeholder="비밀번호"
          control={control}
          rules={{
            required: true,
          }}
        />
        <Margin size={15} />
        <MainButton
          isActive={isValid}
          disabled={!isValid}
          onClick={handleSubmit((data) => {
            localStorage.setItem("email", data.email);
            localStorage.setItem("password", data.password);
            navigate("/");
          })}
        >
          로그인
        </MainButton>
      </Container>
      <Container flex={10}>
        <Container flexDirection="row">
          <Margin direction="horizontal" size={20} />
          <button onClick={() => navigate("/main-form")}>
            <Text size={12} color={FONT_COLORS.gray}>
              회원가입{"  "}
            </Text>
          </button>
          <Margin direction="horizontal" size={40} />
          <button onClick={() => console.log("비밀번호 찾기")}>
            <Text size={12} color={FONT_COLORS.gray}>
              비밀번호 찾기
            </Text>
          </button>
        </Container>
      </Container>
      <Container flex={10}>
        <Container flexDirection="row">
          {/* <SocialLoginButton
            style={{ background: "#FEE501" }}
            onClick={() => console.log("kakao")}
          >
            <RiKakaoTalkFill color="#000" size={30} />
          </SocialLoginButton> */}
          <KakaoLogin
            style={{
              background: "#FEE501",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            token={kakaoClientId}
            onSuccess={kakaoOnSuccess}
            onFail={kakaoOnFailure}
          >
            <RiKakaoTalkFill color="#000" size={30} />
          </KakaoLogin>
          <Margin direction="horizontal" size={15} />
          <SocialLoginButton
            style={{ background: "#fff" }}
            onClick={() => console.log("kakao")}
          >
            <FcGoogle size={25} />
          </SocialLoginButton>
        </Container>
      </Container>
    </Window>
  );
};

export default LoginPage;

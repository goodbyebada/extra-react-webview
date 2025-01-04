import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Margin from "@components/atoms/Margin";
import TypeSelectButton from "@components/mocules/TypeSelectButton";

import SignWindow from "@components/mocules/SignWindow";

import { RiMovie2Line } from "react-icons/ri";
import { GiDirectorChair } from "react-icons/gi";
import { FONT_COLORS } from "@/styled/colors";

const SelectUserTypePage = () => {
  const navigate = useNavigate();

  const [type, setType] = useState<0 | 1 | 2>(0);

  return (
    <SignWindow
      title="회원 유형 선택"
      subTitle="어떤 회원으로 가입하시겠습니까?"
      submitText="선택"
      buttonProps={{
        isActive: type !== 0,
        disabled: type === 0,
        onClick: () => {
          if (type === 0) {
            return;
          } else {
            if (type === 1) {
              localStorage.setItem("type", "member");
              navigate("/member-info-form");
            } else {
              localStorage.setItem("type", "company");
              navigate("/company-info");
            }
          }
        },
      }}
    >
      <TypeSelectButton
        onClick={() => {
          setType(1);
        }}
        isActive={type === 1}
        text="보조출연자"
        icon={
          <RiMovie2Line
            color={type === 1 ? FONT_COLORS.white : FONT_COLORS.gray}
            size={50}
          />
        }
      />
      <Margin size={20} />
      <TypeSelectButton
        onClick={() => {
          setType(2);
        }}
        isActive={type === 2}
        text="업체관리자"
        icon={
          <GiDirectorChair
            color={type === 2 ? FONT_COLORS.white : FONT_COLORS.gray}
            size={50}
          />
        }
      />
    </SignWindow>
  );
};

export default SelectUserTypePage;

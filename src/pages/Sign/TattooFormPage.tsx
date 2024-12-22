import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Margin from "@components/atoms/Margin";
import SignWindow from "@components/mocules/SignWindow";
import TypeSelectButton from "@components/mocules/TypeSelectButton";

const TattooFormPage = () => {
  const [hasTattoo, setHasTattoo] = useState(false);

  const navigate = useNavigate();

  return (
    <SignWindow
      title="타투 여부"
      subTitle="타투 여부를 선택해주세요"
      buttonProps={{
        onClick: () => {
          localStorage.setItem("hasTattoo", `${hasTattoo ? 1 : 0}`);
          navigate(hasTattoo ? "/tattoo-select-form" : "/account-form");
        },
      }}
    >
      <TypeSelectButton
        onClick={() => {
          setHasTattoo(false);
        }}
        isActive={!hasTattoo}
        text="없음"
      />
      <Margin size={20} />
      <TypeSelectButton
        onClick={() => {
          setHasTattoo(true);
        }}
        isActive={hasTattoo}
        text="있음"
      />
    </SignWindow>
  );
};

export default TattooFormPage;

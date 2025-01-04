import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

import { styled } from "styled-components";
import Container from "@components/atoms/Container";
import { MainButton } from "@components/atoms/Button";
import Margin from "@components/atoms/Margin";
import { FONT_COLORS } from "@/styled/colors";
import MainWindow from "@components/mocules/MainWindow";

const QRBackground = styled.div`
  background: ${FONT_COLORS.white};

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const MemberShootManageDetailPage = () => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const data = {
      name: "이름",
      age: "26",
    };
    setValue(JSON.stringify(data));
  }, []);

  return (
    <MainWindow bottomNavigationShown={false}>
      <Container flex={60} paddingHorizontal={40} paddingVertical={40}>
        <QRBackground>
          <QRCodeCanvas value={value} size={150} />
        </QRBackground>
      </Container>
      <Container flex={40} paddingHorizontal={40}>
        <MainButton isActive={true}>채팅방</MainButton>
        <Margin size={20} />
        <MainButton isActive={true}>의상</MainButton>
        <Margin size={20} />
        <MainButton isActive={true}>계약서</MainButton>
      </Container>
    </MainWindow>
  );
};

export default MemberShootManageDetailPage;

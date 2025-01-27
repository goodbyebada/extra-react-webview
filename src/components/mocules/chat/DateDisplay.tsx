import { styled } from "styled-components";
import { FONT_COLORS, BACKGROUND_COLORS, COLORS } from "@/styled/colors";
import { WEEK_DAY_LABELS } from "@components/mocules/WeekdayLabels";
import Container from "@components/atoms/Container";

export default function DateDisplay({ date }: { date: Date }) {
  const today = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${WEEK_DAY_LABELS[date.getDay()]}요일`;
  const MARGIN_BOTTOM = 30;

  return (
    <Container style={{ marginBottom: MARGIN_BOTTOM }}>
      <Content>{today}</Content>
    </Container>
  );
}

const Content = styled.div`
  font-size: small;
  color: ${FONT_COLORS.white};
  display: flex;
  justify-content: center;
  padding: 5px 20px;
  background-color: ${BACKGROUND_COLORS.default};
  border-radius: 50px;
  border-color: ${COLORS.lightGray};
  border-style: solid;
`;

import { useState } from "react";
import styled from "styled-components";
import Text, { ThemeText } from "@components/atoms/Text";
import Item from "@components/mocules/Item";
import CalendarItem from "@components/mocules/CalendarItem";
import { MainButton } from "@components/atoms/Button";
// import { InputField } from "@components/atoms/Form";
import DropDownInput from "@components/mocules/DropDownInput";
import { useForm } from "react-hook-form";

const PreviewContainer = styled.section`
  background: #000;
  padding: 20px;
`;

const ThemePreviewPage = () => {
  const [activeStar, setActiveStar] = useState(false);
  const { control, setValue } = useForm();

  return (
    <PreviewContainer>
      <ThemeText variant="title">페이지 상단 제목</ThemeText>
      <ThemeText variant="content-title">페이지 메인 컨텐츠 제목</ThemeText>
      <ThemeText variant="item-title">아이템 제목</ThemeText>
      <ThemeText variant="item-subtitle">아이템 부제목</ThemeText>
      <ThemeText variant="item-info">아이템 부가정보</ThemeText>

      <Text size={20} color="#0aa" weight={400} align="center">
        font-size: 20px; color: #0aa; font-weight: 400; text-align: center;
      </Text>

      <Text>
        <Text inline={true} highlight={true}>
          &lt;Text inline=&#123;true&#125;
          highlight=&#123;true&#125;&gt;&lt;&#47;Text&gt;
        </Text>{" "}
        defaultText
      </Text>

      <Text>
        <Text highlight={true}>
          &lt;Text highlight=&#123;true&#125;&gt;&lt;&#47;Text&gt;
        </Text>{" "}
        defaultText
      </Text>

      <Item
        title="UMC 드라마 촬영 조연"
        category="드라마"
        date="8/3 - 8/4"
        dDay="D-1"
        company="유엠씨 촬영팀"
        time="07:00"
        location="신사역 6번출구"
        isRecruit={true}
        onClickStar={() => setActiveStar(!activeStar)}
        isActiveStar={activeStar}
        onClick={() => alert("클릭")}
      />
      <Item
        title="UMC 드라마 촬영 조연"
        category="드라마"
        date="8/3 - 8/4"
        dDay="D-1"
        company="유엠씨 촬영팀"
        time="07:00"
        location="신사역 6번출구"
        highlight={true}
        onClick={() => alert("클릭")}
      />
      <Item
        title="UMC 드라마 촬영 조연"
        category="드라마"
        date="8/3 - 8/4"
        dDay="D-1"
        company="유엠씨 촬영팀"
        time="07:00"
        location="신사역 6번출구"
        status="approved"
        statusText="승인됨"
        onClick={() => alert("클릭")}
      />
      <Item
        title="UMC 드라마 촬영 조연"
        category="드라마"
        date="8/3 - 8/4"
        dDay="D-1"
        company="유엠씨 촬영팀"
        time="07:00"
        location="신사역 6번출구"
        status="rejected"
        statusText="거절됨"
        onClick={() => alert("클릭")}
      />

      <CalendarItem count={3} highlight={true} onClick={() => alert("클릭")}>
        5
      </CalendarItem>
      <CalendarItem count={3} onClick={() => alert("클릭")}>
        3
      </CalendarItem>
      <CalendarItem count={0} onClick={() => alert("클릭")}>
        2
      </CalendarItem>

      <MainButton onClick={() => alert("클릭")}>다음</MainButton>
      <MainButton isActive={false} disabled={true}>
        다음
      </MainButton>

      <DropDownInput
        control={control}
        setValue={setValue}
        name="나이"
        placeholder="나이를 입력하세요"
        items={[...Array(10)].map((_, i) => `${i}`)}
      />
    </PreviewContainer>
  );
};

export default ThemePreviewPage;

import { useState } from "react";
import styled from "styled-components";
import Text, { ThemeText } from "@components/atoms/Text";
import Item from "@components/mocules/Item";
import CalendarItem from "@components/mocules/calender/CalendarItem";
import { MainButton } from "@components/atoms/Button";
import SwipeableItem from "@components/mocules/SwipeableItem";
import RoleInfo from "@components/custom/RoleInfo";

const PreviewContainer = styled.section`
  background: #000;
  padding: 20px;
`;

const ThemePreviewPage = () => {
  const [activeStar, setActiveStar] = useState(false);
  const handleDelete = () => {
    alert("아이템이 삭제되었습니다!");
  };
  const roleExample = {
    sex: true,
    roleAge: ["20", "30"],
    season: "봄",
    costume: ["드레스", "정장"],
    currentPersonnel: 3,
    limitPersonnel: 5,
    roleId: 101,
  };

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

      <RoleInfo
        role={roleExample}
        roleName="주연 배우"
        index={0}
        onClick={(roleName, index) => {
          console.log(`Role Name: ${roleName}, Index: ${index}`);
        }}
      />

      <SwipeableItem
        title="UMC 드라마 촬영"
        category="드라마"
        dDay="2025-01-25"
        date={["2024-12-13", "2024-12-14", "2024-12-15"]}
        company="유명한 제작팀"
        time="07:00"
        location="신사역 6번출구"
        status="applied"
        statusText="승인대기"
        onClick={() => console.log("Item 클릭됨")}
        onDelete={handleDelete}
      />
      <SwipeableItem
        title="UMC 드라마 촬영"
        category="드라마"
        dDay="2024-12-29"
        date={["2024-12-10"]}
        company="유명한 제작팀"
        time="07:00"
        location="신사역 6번출구"
        status="rejected"
        statusText="미승인"
        onClick={() => console.log("Item 클릭됨")}
        onDelete={handleDelete}
      />
      <SwipeableItem
        title="UMC 드라마 촬영"
        category="드라마"
        dDay="2024-12-25"
        date={["2024-12-25"]}
        company="유명한 제작팀"
        time="07:00"
        location="신사역 6번출구"
        status="approved"
        statusText="승인완료"
        onClick={() => console.log("Item 클릭됨")}
        onDelete={handleDelete}
      />

      <Item
        title="UMC 드라마 촬영 조연"
        category="드라마"
        dDay="2024-12-25"
        date={["2024-12-25"]}
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
        dDay="2024-12-30"
        date={["2024-12-25"]}
        company="유엠씨 촬영팀"
        time="07:00"
        location="신사역 6번출구"
        highlight={true}
        onClick={() => alert("클릭")}
      />
      <Item
        title="UMC 드라마 촬영 조연"
        category="드라마"
        dDay="2024-12-25"
        date={["2024-12-13", "2024-12-25"]}
        company="유엠씨 촬영팀"
        time="07:00"
        location="신사역 6번출구"
        status="approved"
        statusText="승인완료"
        onClick={() => alert("클릭")}
      />
      <Item
        title="UMC 드라마 촬영 조연"
        category="드라마"
        dDay="2024-12-25"
        date={["2024-12-25"]}
        company="유엠씨 촬영팀"
        time="07:00"
        location="신사역 6번출구"
        status="rejected"
        statusText="미승인"
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
    </PreviewContainer>
  );
};

export default ThemePreviewPage;

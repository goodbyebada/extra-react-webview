import { useState } from "react";
import styled from "styled-components";
import RoleCheckItem from "@components/mocules/company/RoleCheckItem";
import Text from "@components/atoms/Text";
import { MainButton } from "@components/atoms/Button";
import { dummyUserRoleData } from "@api/dummyData";

/**
 * ShowApplicant : 업체 - 역할 별 지원현황
 * 추후 수정
 * - 역할 이름 전 화면에서 넘겨 받아야 함
 * - 역할 상세 내역 전 화면에서 컴포넌트 만들어지면 추가
 */

const role = "학생";

const ShowApplicant = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("시간순");

  // 체크박스 클릭 시 상태 업데이트
  const handleCheckClick = (name: string, isChecked: boolean) => {
    setSelectedItems((prev) => {
      if (isChecked) {
        return [...prev, name];
      } else {
        return prev.filter((item) => item !== name);
      }
    });
  };

  const handleTabClick = (tab: string) => {
    if (tab === "전체선택") {
      if (selectedItems.length === dummyUserRoleData.length) {
        setSelectedItems([]);
      } else {
        setSelectedItems(dummyUserRoleData.map((item) => item.name)); // 전체 선택
      }
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <Container>
      <Text size={20} weight={700} color="#fff">
        {role || "role"} 역할
      </Text>
      <TabWrapper>
        <LeftTabs>
          {["시간순", "온도순", "경력순"].map((tab) => (
            <TabItem
              key={tab}
              isActive={activeTab === tab}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </TabItem>
          ))}
        </LeftTabs>
        <RightTab>
          <TabItem
            isActive={selectedItems.length === dummyUserRoleData.length}
            onClick={() => handleTabClick("전체선택")}
          >
            전체선택
          </TabItem>
        </RightTab>
      </TabWrapper>
      <RoleList>
        {dummyUserRoleData.map((item) => {
          return (
            <RoleCheckItem
              key={item.id}
              userId={item.userId}
              name={item.name}
              isChecked={selectedItems.includes(item.name)} // 선택된 항목인지 여부 전달
              onCheckClick={(isChecked) =>
                handleCheckClick(item.name, isChecked)
              }
            />
          );
        })}
      </RoleList>
      <Footer>
        <MainButton onClick={() => console.log("승인: ", selectedItems)}>
          승인
        </MainButton>
        <MainButton
          isActive={false}
          onClick={() => console.log("미승인: ", selectedItems)}
        >
          미승인
        </MainButton>
      </Footer>
    </Container>
  );
};

export default ShowApplicant;

const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const TabWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 12px 0;
`;

const LeftTabs = styled.div`
  display: flex;
  gap: 10px;
`;

const RightTab = styled.div`
  display: flex;
`;

const TabItem = styled.div<{ isActive: boolean }>`
  font-size: 10px;
  font-weight: 700;
  color: ${({ isActive }) => (isActive ? "#ffffff" : "#cccccc")};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: ${({ isActive }) => (isActive ? "#ffffff" : "#cccccc")};
  }
`;

const RoleList = styled.div`
  width: 100%;
  margin: 20px 0;
  flex: 1;
  overflow-y: auto;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

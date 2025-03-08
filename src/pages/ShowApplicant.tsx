import { useState } from "react";
import styled from "styled-components";
import RoleCheckItem from "@components/mocules/company/RoleCheckItem";
import Text from "@components/atoms/Text";
import { MainButton } from "@components/atoms/Button";
import { dummyUserRoleData } from "@mocks/dummyJobData";
import MainWindow from "@components/mocules/MainWindow";
import Container from "@components/atoms/Container";

/**
 * ShowApplicant : 업체 - 역할 별 지원현황
 */

const role = "학생";

const TABS = {
  ORDER_BY_TIME: "시간순",
  ORDER_BY_TEMP: "온도순",
  ORDER_BY_EXPERIENCE: "경력순",
  SELECT_ALL: "전체선택",
};

const ShowApplicant = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>(TABS.ORDER_BY_TIME);
  const [approvalStatus, setApprovalStatus] = useState<
    Record<string, "approved" | "rejected" | "none">
  >({});

  const handleCheckClick = (name: string, isChecked: boolean) => {
    setSelectedItems((prev) => {
      if (isChecked) {
        return [...prev, name];
      } else {
        return prev.filter((item) => item !== name);
      }
    });
  };

  const handleApproval = (status: "approved" | "rejected") => {
    setApprovalStatus((prev) => {
      const updatedStatus = { ...prev };
      selectedItems.forEach((name) => {
        updatedStatus[name] = status;
      });
      return updatedStatus;
    });
    setSelectedItems([]);
  };

  const handleTabClick = (tab: string) => {
    if (tab === TABS.SELECT_ALL) {
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
    <MainWindow>
      <Container>
        <RoleNameWrapper>
          <Text size={20} weight={700} color="#fff">
            {role || "role"} 역할
          </Text>
        </RoleNameWrapper>

        <TabWrapper>
          <LeftTabs>
            {[
              TABS.ORDER_BY_TIME,
              TABS.ORDER_BY_TEMP,
              TABS.ORDER_BY_EXPERIENCE,
            ].map((tab) => (
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
              onClick={() => handleTabClick(TABS.SELECT_ALL)}
            >
              {TABS.SELECT_ALL}
            </TabItem>
          </RightTab>
        </TabWrapper>

        <RoleList>
          {dummyUserRoleData.map((item) => {
            return (
              <RoleCheckItem
                key={item.id}
                userId={item.userId.toString()}
                name={item.name}
                isChecked={selectedItems.includes(item.name)}
                onCheckClick={(isChecked) =>
                  handleCheckClick(item.name, isChecked)
                }
                approvalStatus={approvalStatus[item.name] || "none"}
              />
            );
          })}
        </RoleList>

        <Footer>
          <MainButton onClick={() => handleApproval("approved")}>
            승인
          </MainButton>
          <MainButton onClick={() => handleApproval("rejected")}>
            미승인
          </MainButton>
        </Footer>
      </Container>
    </MainWindow>
  );
};

export default ShowApplicant;

const RoleNameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
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
  cursor: pointer;

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

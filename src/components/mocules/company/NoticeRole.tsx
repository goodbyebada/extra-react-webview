import { useState } from "react";
import styled from "styled-components";
import Text from "@components/atoms/Text";
import { SubButton } from "@components/atoms/Button";
import PostFormCard from "./PostFormCard";
import RoleDetailBox from "@components/mocules/company/RoleDetailBox";
import CompanyAddRoleModal from "@components/Modal/CompanyAddRoleModal";
import CompanyRoleModal from "@components/Modal/CompanyRoleModal";
import { RoleBodyType } from "@api/interface";
import RoleInfo from "@components/custom/RoleInfo";
import { MdEdit } from "react-icons/md";

interface NoticeRoleProps {
  roleList: { roleName: string; details: RoleBodyType[] }[];
  onRoleListChange: (
    newRoleList: { roleName: string; details: RoleBodyType[] }[],
  ) => void;
}

/**
 * NoticeRole: AddNotice 역할 부분
 * roleList - 역할 목록 (roleName과 해당 역할의 세부 정보 배열)
 * onRoleListChange - 역할 목록이 변경될 때 호출되는 함수
 */

const NoticeRole = ({ roleList, onRoleListChange }: NoticeRoleProps) => {
  const [modals, setModals] = useState({
    roleName: false,
    role: false,
  });
  const [selectedRole, setSelectedRole] = useState<RoleBodyType | null>(null);
  const [selectedRoleName, setSelectedRoleName] = useState<string | null>(null);

  const toggleModal = (modalName: string, isOpen: boolean) => {
    setModals((prev) => ({ ...prev, [modalName]: isOpen }));
  };

  // 역할 이름 추가
  const submitRoleNameModal = (newRoleName: string) => {
    const updatedRoleList = selectedRoleName
      ? roleList.map((role) =>
          role.roleName === selectedRoleName
            ? {
                ...role,
                roleName: newRoleName,
                details: role.details.map((detail) => ({
                  ...detail,
                  roleName: newRoleName,
                  costume: { ...detail.costume, roleName: newRoleName },
                })),
              }
            : role,
        )
      : [...roleList, { roleName: newRoleName, details: [] }];

    onRoleListChange(updatedRoleList);
    setSelectedRoleName(null);
    toggleModal("roleName", false);
  };

  // 역할 이름 수정 모달 열기
  const openEditRoleNameModal = (roleName: string) => {
    setSelectedRoleName(roleName);
    toggleModal("roleName", true);
  };

  // 역할 정보 추가
  const handleRoleSubmit = (newRole: RoleBodyType) => {
    const updatedList = [...roleList];
    const roleIndex = updatedList.findIndex(
      (role) => role.roleName === newRole.costume.roleName,
    );

    if (roleIndex > -1) {
      const detailIndex = updatedList[roleIndex].details.findIndex(
        (detail) => detail.id === newRole.id,
      );

      if (detailIndex > -1) {
        updatedList[roleIndex].details[detailIndex] = newRole;
      } else {
        updatedList[roleIndex].details.push(newRole);
      }
    }
    onRoleListChange(updatedList);
    setSelectedRole(null);
    toggleModal("role", false);
  };

  // 역할 정보 수정
  const handleRoleEdit = (role: RoleBodyType) => {
    setSelectedRole(role);
    toggleModal("role", true);
  };

  // 역할 상세 모달 열기
  const openRoleModal = (roleName: string) => {
    setSelectedRole({
      id: Date.now(),
      roleName,
      costume: { roleName, season: "", etc: "", imageSrc: [] },
      sex: true,
      minAge: "0",
      maxAge: "0",
      limitPersonnel: 0,
      currentPersonnel: 0,
      tattoo: {
        face: false,
        chest: false,
        arm: false,
        leg: false,
        shoulder: false,
        back: false,
        hand: false,
        feet: false,
      },
      hourPay: "",
    });
    toggleModal("role", true);
  };

  return (
    <Container>
      {roleList.length > 0 ? (
        <Wrapper>
          <Text size={22} color="#fff" weight={700}>
            보조 출연자 역할
          </Text>
          {roleList.map((role, index) => (
            <div key={index} style={{ margin: "10px 0" }}>
              <Text size={18} color="#fff" weight={700}>
                {index + 1}: {role.roleName}
                <MdEdit
                  style={{ margin: "0 0 -2px 15px" }}
                  onClick={() => openEditRoleNameModal(role.roleName)}
                />
              </Text>

              <RoleItemsWrapper>
                {role.details.map((detail, detailIndex) => (
                  <RoleInfo
                    key={detailIndex}
                    role={detail}
                    index={detailIndex}
                    onClick={() => handleRoleEdit(detail)}
                  />
                ))}

                <RoleDetailBox onClick={() => openRoleModal(role.roleName)} />
              </RoleItemsWrapper>
            </div>
          ))}

          <ButtonWrapper>
            <SubButton
              width="120px"
              onClick={() => toggleModal("roleName", true)}
            >
              역할 추가
            </SubButton>
          </ButtonWrapper>
        </Wrapper>
      ) : (
        <PostFormCard
          title="역할 추가"
          onClick={() => toggleModal("roleName", true)}
        />
      )}

      <CompanyAddRoleModal
        isVisible={modals.roleName}
        onSubmit={submitRoleNameModal}
        closeModal={() => toggleModal("roleName", false)}
        initialRoleName={selectedRoleName || ""}
      />

      <CompanyRoleModal
        isVisible={modals.role}
        role={selectedRole}
        onSubmit={handleRoleSubmit}
        closeModal={() => toggleModal("role", false)}
      />
    </Container>
  );
};

export default NoticeRole;

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  width: 100%;
  gap: 20px;
`;

const RoleItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  margin: 30px 0;
`;

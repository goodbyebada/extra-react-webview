import styled from "styled-components";
import Text from "@components/atoms/Text";
import { RoleBodyType } from "@api/interface";

interface RoleInfoProps {
  role: RoleBodyType;
  index: number;
  onClick: (roleName: string, index: number) => void;
}

/**
 * RoleInfo : 업체 역할 정보 박스
 */

const RoleInfo = ({ role, index, onClick }: RoleInfoProps) => {
  const RoleDetailText = (label: string, value: string) => (
    <Text size={14} weight={700}>
      {label} : {value || "정보 없음"}
    </Text>
  );

  return (
    <RoleInfoContainer onClick={() => onClick(role.costume.roleName, index)}>
      <RoleDetail>
        {RoleDetailText("1. 성별", role.sex ? "여" : "남")}
        {RoleDetailText("2. 나이", `${role.minAge} - ${role.maxAge}`)}
        {RoleDetailText("3. 계절", role.costume.season)}
        {RoleDetailText("4. 의상", role.costume.etc)}
        {RoleDetailText("5. 시급", role.hourPay)}
      </RoleDetail>
      <RolePersonnel>
        <Text size={16} weight={700} color="#fff">
          ({role.currentPersonnel}/{role.limitPersonnel})
        </Text>
      </RolePersonnel>
    </RoleInfoContainer>
  );
};

export default RoleInfo;

const RoleInfoContainer = styled.div`
  background-color: #535255;
  box-shadow: 5px 5px 4px 0px #000;
  width: 90%;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  position: relative;
  font-style: normal;
  line-height: 20px;
  letter-spacing: 0.12px;
`;

const RoleDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const RolePersonnel = styled.div`
  position: absolute;
  top: 14px;
  right: 20px;
`;

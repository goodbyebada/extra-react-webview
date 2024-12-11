import React from "react";
import styled from "styled-components";

interface RoleInfoProps {
  role: {
    sex: boolean;
    roleAge: string[];
    season: string;
    costume: string[];
    currentPersonnel: number;
    limitPersonnel: number;
    roleId: number;
  };
  roleName: string;
  index: number;
  onClick: (roleName: string, index: number) => void;
}
const RoleInfoComponent: React.FC<RoleInfoProps> = ({
  role,
  roleName,
  index,
  onClick,
}) => {
  return (
    <RoleInfoContainer onClick={() => onClick(roleName, index)}>
      <RoleDetail>
        <p>1. 성별 : {role.sex ? "여" : "남"}</p>
        <p>2. 나이 : {role.roleAge}</p>
        <p>3. 계절 : {role.season}</p>
        <p>4. 의상 : {role.costume}</p>
      </RoleDetail>
      <RolePersonnel>
        ({role.currentPersonnel}/{role.limitPersonnel})
      </RolePersonnel>
    </RoleInfoContainer>
  );
};

export default RoleInfoComponent;

const RoleInfoContainer = styled.div`
  background-color: #535255;
  box-shadow: 5px 5px 4px 0px #000;
  width: 340px;
  height: 105px;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 20px;
  font-size: 12px;
  font-weight: 700;
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
`;

const RolePersonnel = styled.div`
  position: absolute;
  top: 7px;
  right: 15px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`;

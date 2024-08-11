import { Role } from "@api/interface";
import styled from "styled-components";

interface RoleBoxProps {
  styled: { color: string; borderColor: string; backgroundColor: string };
  roleInfo: Role;
  isSelected: boolean;
  handleClick: (idx: number) => void;
  index: number;
}

type RoleContainerProps = {
  $borderColor: string;
  $backgroundColor: string;
};

type InfoContainerProps = {
  color: string;
};

const RoleBox = ({
  styled,
  roleInfo,
  handleClick,
  isSelected,
  index,
}: RoleBoxProps) => {
  const { role_name, role_age, sex } = roleInfo;
  const { borderColor, backgroundColor, color } = styled;

  const selectedStyled = {
    borderColor: "transparent",
    backgroundColor: `linear-gradient(#000, #000) padding-box,
    linear-gradient(180deg, #FFFFFF 0%, #F5C001 100%) border-box;`,
    color: "#fff",
  };

  return (
    <RoleBoxWrapper onClick={() => handleClick(index)}>
      <RoleContainer
        $borderColor={isSelected ? selectedStyled.borderColor : borderColor}
        $backgroundColor={
          isSelected ? selectedStyled.backgroundColor : backgroundColor
        }
      >
        <InfoContainer color={isSelected ? selectedStyled.color : color}>
          <RoleTxt>{role_name}</RoleTxt>
          <Line />
          <AgeTxt>{role_age}</AgeTxt>
          <Line />

          <GenderTxt>{sex ? "여" : "남"}</GenderTxt>
        </InfoContainer>
      </RoleContainer>
    </RoleBoxWrapper>
  );
};

export default RoleBox;

const RoleBoxWrapper = styled.div`
  padding-bottom: 23px;
`;

const RoleContainer = styled.div<RoleContainerProps>`
  width: 298px;
  height: 67px;
  flex-shrink: 0;
  border-radius: 18px;
  border: 3px solid ${(props) => props.$borderColor};
  background: ${(props) => props.$backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div<InfoContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.color};
`;

const RoleTxt = styled.div`
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  margin-left: 10px;
  margin-right: 10px;
`;

const AgeTxt = styled.div`
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  margin-left: 10px;
  margin-right: 10px;
`;

const GenderTxt = styled.div`
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Line = styled.div`
  width: 1px;
  height: 31px;
  background: #6a6a6a;
`;

import styled from "styled-components";

interface RoleBoxProps {
  color: string;
  borderColor: string;
  backgroundColor: string;
}

const RoleBox: React.FC<RoleBoxProps> = ({
  color,
  borderColor,
  backgroundColor,
}) => {
  return (
    <RoleBoxWrapper>
      <RoleContainer
        borderColor={borderColor}
        backgroundColor={backgroundColor}
      >
        <InfoContainer color={color}>
          <RoleTxt>Role</RoleTxt>
          <Line />
          <AgeTxt>Age</AgeTxt>
          <Line />
          <GenderTxt>Gender</GenderTxt>
        </InfoContainer>
      </RoleContainer>
    </RoleBoxWrapper>
  );
};

export default RoleBox;

const RoleBoxWrapper = styled.div`
  padding-bottom: 23px;
`;

const RoleContainer = styled.div`
  width: 298px;
  height: 67px;
  flex-shrink: 0;
  border-radius: 18px;
  border: 3px solid ${(props) => props.borderColor};
  background: ${(props) => props.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
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

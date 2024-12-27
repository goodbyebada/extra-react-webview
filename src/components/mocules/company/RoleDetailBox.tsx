import styled from "styled-components";
import Text from "@components/atoms/Text";
import { IoIosAdd } from "react-icons/io";

/**
 * RoleDetailBox : 업체 - 역할 상세 프로필 버튼
 * onClick: 클릭 시 상세 정보 모달
 */

interface RoleDetailBoxProps {
  onClick?: () => void;
}

function RoleDetailBox({ onClick }: RoleDetailBoxProps) {
  return (
    <BoxWrapper onClick={onClick}>
      <IoIosAdd size={35} color="#fff" />
      <Text size={10} color="#fff" align="center">
        역할 상세 프로필
      </Text>
    </BoxWrapper>
  );
}

export default RoleDetailBox;

const BoxWrapper = styled.div`
  width: 70%;
  background-color: #535255;
  opacity: 0.7;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 4px;
`;

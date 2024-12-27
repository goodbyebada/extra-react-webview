import styled from "styled-components";
import Text from "@components/atoms/Text";
import { IoCheckmarkCircle } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { useState } from "react";
import DetailProfileModal from "@components/Modal/DetailProfileModal";

/**
 * RoleCheckItem : 업체 - 역할 별 지원현황 체크 리스트 아이템
 * name: 지원자 이름
 * isChecked: 클릭 상태
 * onCheckClick: 체크버튼 클릭 이벤트
 * onNextClick: 상세 프로필 이동
 */

interface RoleCheckItemProps {
  name: string;
  isChecked: boolean;
  onCheckClick?: (isChecked: boolean) => void;
}

const RoleCheckItem = ({
  name,
  isChecked,
  onCheckClick,
}: RoleCheckItemProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCheckClick = () => {
    if (onCheckClick) {
      onCheckClick(!isChecked);
    }
  };

  const handleNextClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <ListItemWrapper>
        <CheckIconWrapper
          size={30}
          isChecked={isChecked}
          onClick={handleCheckClick}
        />
        <TextWrapper>
          <Text size={16} weight={700} color="#fff" align="left" inline={true}>
            {name}
          </Text>
        </TextWrapper>
        <GrFormNext size={35} onClick={handleNextClick} />
      </ListItemWrapper>

      <DetailProfileModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        name={name}
      />
    </>
  );
};

export default RoleCheckItem;

const CheckIconWrapper = styled(IoCheckmarkCircle)<{ isChecked: boolean }>`
  color: ${(props) => (props.isChecked ? "#F5C001" : "#D9D9D9")};
  margin-right: 12px;
`;

const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 8px;
  background-color: #575757;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const TextWrapper = styled.div`
  flex: 1;
`;

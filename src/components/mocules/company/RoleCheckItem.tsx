import styled from "styled-components";
import Text from "@components/atoms/Text";
import { IoCheckmarkCircle } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { useState } from "react";
import DetailProfileModal from "@components/Modal/DetailProfileModal";
import { TbCheck } from "react-icons/tb";
import { HiMiniXMark } from "react-icons/hi2";

/**
 * RoleCheckItem : 업체 - 역할 별 지원현황 체크 리스트 아이템
 * name: 지원자 이름
 * isChecked: 클릭 상태
 * onCheckClick: 체크버튼 클릭 이벤트
 * onNextClick: 상세 프로필 이동
 * approvalStatus: 승인 상태 ('approved', 'rejected', 'none')
 */

interface RoleCheckItemProps {
  userId: string;
  name: string;
  isChecked: boolean;
  onCheckClick?: (isChecked: boolean) => void;
  approvalStatus: "approved" | "rejected" | "none";
}

const RoleCheckItem = ({
  userId,
  name,
  isChecked,
  onCheckClick,
  approvalStatus,
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

        {approvalStatus === "approved" ? (
          <TbCheck size={25} color="#4caf50" />
        ) : approvalStatus === "rejected" ? (
          <HiMiniXMark size={25} color="#f44336" />
        ) : null}

        <GrFormNext size={35} onClick={handleNextClick} />
      </ListItemWrapper>

      <DetailProfileModal
        userId={userId}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        name={name}
        isApprovalModal={false}
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

import styled from "styled-components";
import Modal from "@components/atoms/Modal";
import Text from "@components/atoms/Text";
import { HiMiniXMark } from "react-icons/hi2";
import { MainButton } from "@components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { dummyUserRoleData } from "@api/dummyData";

interface DetailProfileProps {
  isVisible: boolean;
  onClose: () => void;
  userId: string;
  name: string;
  imageUrl?: string;
  isApprovalModal: boolean;
}

/**
 * DetailProfileModal : 지원자 상세 프로필 모달
 * name: 지원자 이름
 * userId: 지원자 id
 * imageUrl: 지원자 이미지
 * isVisible: boolean
 * onClose: () => void
 * isApprovalModal: 승인/미승인 모달 여부
 * - true: 승인/미승인, false: 온도평가 (기본값: true)
 */

const DetailProfileModal = ({
  isVisible,
  onClose,
  userId,
  isApprovalModal = true,
}: DetailProfileProps) => {
  const navigate = useNavigate();
  const user = dummyUserRoleData.find((user) => user.userId === userId);

  const handleApprove = () => {
    console.log("승인");
    onClose();
  };

  const handleReject = () => {
    console.log("미승인");
    onClose();
  };

  const handleEvaluate = () => {
    navigate(`/temp/${userId}`);
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Header>
        <Text size={24} weight={700} color="#fff">
          상세 프로필
        </Text>
        <HiMiniXMark size={30} color="#fff" onClick={onClose} />
      </Header>
      <Content>
        <ProfileImage
          src={user?.imageUrl || "https://via.placeholder.com/100"}
          alt="Profile"
        />
        <Text size={18} weight={600} color="#fff">
          이름: {user?.name || "name"}
        </Text>
      </Content>
      <Footer>
        {isApprovalModal ? (
          <>
            <MainButton onClick={handleApprove}>승인</MainButton>
            <MainButton isActive={false} onClick={handleReject}>
              미승인
            </MainButton>
          </>
        ) : (
          <MainButton isActive={true} onClick={handleEvaluate}>
            온도 평가
          </MainButton>
        )}
      </Footer>
    </Modal>
  );
};

export default DetailProfileModal;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 140px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

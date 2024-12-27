import styled from "styled-components";
import Modal from "@components/atoms/Modal";
import Text from "@components/atoms/Text";
import { HiMiniXMark } from "react-icons/hi2";
import { MainButton } from "@components/atoms/Button";

interface DetailProfileProps {
  isVisible: boolean;
  onClose: () => void;
  name: string;
  imageUrl?: string;
}

/**
 * DetailProfileModal : 지원자 상세 프로필 모달
 * name: 지원자 이름
 * imageUrl: 지원자 이미지
 * isVisible: boolean
 * onClose: () => void
 */

const DetailProfileModal = ({
  isVisible,
  onClose,
  name,
  imageUrl,
}: DetailProfileProps) => {
  const handleApprove = () => {
    console.log("승인");
    onClose();
  };

  const handleReject = () => {
    console.log("미승인");
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
          src={imageUrl || "https://via.placeholder.com/100"}
          alt="Profile"
        />
        <Text size={18} weight={600} color="#fff">
          이름: {name || "name"}
        </Text>
      </Content>
      <Footer>
        <MainButton onClick={handleApprove}>승인</MainButton>
        <MainButton isActive={false} onClick={handleReject}>
          미승인
        </MainButton>
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

import styled from "styled-components";
import Text from "@components/atoms/Text";
import { GrFormNext } from "react-icons/gr";

/**
 * ClothesMemberItem : 업체 - 의상관리 사용자 별 등록된 의상 컨펌
 * userId: 지원자 id
 * name: 지원자 이름
 * imageUrl: 지원자 이미지
 * clotheNum: 등록된 의상 개수
 * onClick: () => void;
 */

interface ClothesMemberItemProps {
  userId: string;
  name: string;
  imageUrl: string;
  clothesNum: number;
  onClick?: () => void;
}

const ClothesMemberItem = ({
  name,
  imageUrl,
  clothesNum,
  onClick,
}: ClothesMemberItemProps) => {
  return (
    <ListItemWrapper onClick={onClick}>
      <ProfileImage
        src={imageUrl || "https://via.placeholder.com/100"}
        alt="Profile"
      />
      <TextWrapper>
        <Text size={16} color="#fff" align="left" inline={true}>
          {name}
        </Text>
        <Text size={14} color="#F5C001" align="left" inline={true}>
          등록된 의상: {clothesNum}개
        </Text>
      </TextWrapper>
      <GrFormNext size={35} />
    </ListItemWrapper>
  );
};

export default ClothesMemberItem;

const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 450px;
  margin-bottom: 16px;
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 16px;
`;

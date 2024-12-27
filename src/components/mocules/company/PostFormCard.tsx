import styled from "styled-components";
import Text from "@components/atoms/Text";
import { MdOutlineAddBox } from "react-icons/md";

/**
 * PostFormCard : 업체 - 공고 등록 카드
 * title: 제목,카테고리/날짜,시간,장소
 * onClick: 카드 클릭 이벤트
 */

interface PostFormCardProps {
  title: string;
  onClick?: () => void;
}

function PostFormCard({ title, onClick }: PostFormCardProps) {
  return (
    <CardWrapper onClick={onClick}>
      <MdOutlineAddBox size={55} color="#fff" />
      <Text size={20} weight={900} color="#fff" align="center">
        {title}
      </Text>
    </CardWrapper>
  );
}

export default PostFormCard;

const CardWrapper = styled.div`
  width: 90%;
  height: 20%;
  background-color: #535255;
  opacity: 0.7;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px;
  gap: 12px;
`;

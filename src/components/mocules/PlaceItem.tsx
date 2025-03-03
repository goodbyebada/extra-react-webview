import styled from "styled-components";
import Text from "@components/atoms/Text";
import { MdOutlinePlace } from "react-icons/md";

/**
 * PlaceItem : 업체 - 공고 등록 장소검색 api 사용시 나오는 item
 */

interface PlaceItemProps {
  placeName: string;
  roadAddress: string;
  jibunAddress: string;
  isSelected: boolean;
  onSelect?: () => void;
}

const PlaceItem = ({
  placeName,
  roadAddress,
  jibunAddress,
  isSelected,
  onSelect,
}: PlaceItemProps) => {
  return (
    <ListItemWrapper onClick={onSelect} isSelected={isSelected}>
      <IconWrapper>
        <MdOutlinePlace size={32} color="#F5C001" />
      </IconWrapper>
      <ContentWrapper>
        <Text size={18} weight={700} color="#fff">
          {placeName}
        </Text>
        <AddressWrapper>
          <AddressLine>
            <Tag>도로명</Tag>
            <Text size={12} weight={400} color="#fff">
              {roadAddress}
            </Text>
          </AddressLine>
          <AddressLine>
            <Tag>지번</Tag>
            <Text size={12} weight={400} color="#fff">
              {jibunAddress}
            </Text>
          </AddressLine>
        </AddressWrapper>
      </ContentWrapper>
    </ListItemWrapper>
  );
};

export default PlaceItem;

const ListItemWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ isSelected }) => (isSelected ? "#F5C001" : "#E0E0E0")};
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: transparent;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const AddressWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const AddressLine = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const Tag = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  background-color: #f5c001;
  width: 52px;
  padding: 2px;
  border-radius: 12px;
  text-align: center;
`;

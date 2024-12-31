import styled from "styled-components";
import Text from "@components/atoms/Text";
import { useNavigate } from "react-router-dom";
import Margin from "@components/atoms/Margin";
import { FaAngleRight } from "react-icons/fa6";
import { BACKGROUND_COLORS, FONT_COLORS } from "@/styled/colors";

interface StyledCardItemProps {
  name: string;
  statusComponent: React.ReactNode;
  url: string;
}

interface CardStatus {
  status: boolean;
}

interface CardItemProps {
  name: string;
  status: boolean;
  url: string;
}

const CardItemWrapper = styled.div`
  width: 100%;
  height: 60px;

  border-radius: 10px;

  background: ${BACKGROUND_COLORS.card};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 17px;
  & > div {
    display: flex;
    height: 100%;
    align-items: center;
  }
`;

const StyledCardItem = ({
  name,
  statusComponent,
  url,
}: StyledCardItemProps) => {
  const navigate = useNavigate();

  return (
    <CardItemWrapper
      onClick={() => {
        navigate(url);
      }}
    >
      <Text size={20} weight={900}>
        {name}
      </Text>
      <div>
        {statusComponent}
        <Margin size={14} direction="horizontal" />
        <FaAngleRight size={24} color={FONT_COLORS.white} />
      </div>
    </CardItemWrapper>
  );
};

const ActorStatus = styled.div<CardStatus>`
  background: ${({ status }) => (status ? "#35EB17" : "#E00338")};

  width: 13px;
  height: 13px;
  border-radius: 50%;
`;

const ClothesStatus = styled.div<CardStatus>`
  background: ${({ status }) =>
    status ? "#35EB17" : BACKGROUND_COLORS.disabled};

  width: 62px;
  height: 20px;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActorCardItem = ({ name, status, url }: CardItemProps) => {
  return (
    <StyledCardItem
      name={name}
      url={url}
      statusComponent={<ActorStatus status={status} />}
    />
  );
};

const ClothesConfirmCardItem = ({ name, status, url }: CardItemProps) => {
  return (
    <StyledCardItem
      name={name}
      url={url}
      statusComponent={
        <ClothesStatus status={status}>
          <Text size={11} weight={900}>
            {status ? "컨펌 완료" : "컨펌 전"}
          </Text>
        </ClothesStatus>
      }
    />
  );
};

export { ActorCardItem, ClothesConfirmCardItem };

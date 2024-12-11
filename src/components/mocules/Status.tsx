import Text from "@components/atoms/Text";
import { StatusWrapper } from "@components/atoms/Wrapper";

interface StatusTagProps {
  status: "applied" | "rejected" | "approved";
  statusText: string;
}

/**
 * Status Tag
 * status로 지정된 상태에 따른 디자인 적용
 * @param status "applied" | "rejected" | "approved" (status)
 * @param statusText string (status text)
 */
const StatusTag = ({ status, statusText }: StatusTagProps) => {
  return (
    <StatusWrapper status={status}>
      <Text
        size={12}
        weight={900}
        color={status == "applied" ? "#000" : "#fff"}
      >
        {statusText}
      </Text>
    </StatusWrapper>
  );
};

export default StatusTag;

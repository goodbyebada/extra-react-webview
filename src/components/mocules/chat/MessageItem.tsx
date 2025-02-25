import styled from "styled-components";
import { FONT_COLORS, BACKGROUND_COLORS } from "@styled/colors";

const UserImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  font-weight: bold;
  color: ${FONT_COLORS.white};
`;

const MessageBubble = styled.div`
  background-color: ${BACKGROUND_COLORS.card};
  padding: 12px;
  border-radius: 12px;
  max-width: 300px;
  word-wrap: break-word;
  font-size: 14px;
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: #999;
`;

const TimestampCover = styled.div`
  display: flex;
`;

interface MessageItemProps {
  user_image?: string;
  user_name: string;
  message: string;
  created_at: string;
  my_message: boolean;
}

const MessageItemContainer = styled.div<{ isMyMessage: boolean }>`
  display: flex;
  align-items: flex-start;
  flex-direction: ${({ isMyMessage }) => (isMyMessage ? "row-reverse" : "row")};
  margin-bottom: 16px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 12px;
`;

const MessageItem = ({
  user_image,
  user_name,
  message,
  created_at,
  my_message,
}: MessageItemProps) => {
  return (
    <MessageItemContainer isMyMessage={my_message}>
      {my_message ? (
        ""
      ) : (
        <UserImage
          src={
            user_image ||
            "https://w7.pngwing.com/pngs/384/868/png-transparent-person-profile-avatar-user-basic-ui-icon.png"
          }
          alt={user_name}
        />
      )}
      <MessageContent>
        {my_message ? "" : <UserName>{user_name}</UserName>}
        <div
          style={{
            display: "flex",
            flexDirection: my_message ? "row-reverse" : "row",
            alignItems: "flex-end",
          }}
        >
          <MessageBubble>{message}</MessageBubble>
          <TimestampCover>
            <Timestamp>{created_at}</Timestamp>
          </TimestampCover>
        </div>
      </MessageContent>
    </MessageItemContainer>
  );
};

export default MessageItem;

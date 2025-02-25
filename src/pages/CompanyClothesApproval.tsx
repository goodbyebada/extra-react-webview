import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ImageComponent from "@components/atoms/Image";
import Text from "@components/atoms/Text";
import { MainButton } from "@components/atoms/Button";
import BackHeader from "@components/custom/BackHeader";
import { GoPaperAirplane } from "react-icons/go";
import { IoIosLink } from "react-icons/io";

type ClothesItem = {
  id: number;
  src: string;
  description: string;
};

/**
 * CompanyClothesApproval : 업체 - 사용자 의상컨펌 (승인/코멘트)
 */

const CompanyClothesApproval = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clothes = [] } = location.state || {};
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [isCommentMode, setIsCommentMode] = useState(false);

  const handleApprove = () => {
    const newComments = [...comments];
    newComments[currentItemIndex] = comment || comments[currentItemIndex] || "";
    setComments(newComments);

    if (currentItemIndex < clothes.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
      setIsCommentMode(false);
      setComment("");
    } else {
      navigate("/company/clothes-confirm", {
        state: {
          images: clothes.map((item: ClothesItem) => item.src),
          comments: newComments,
        },
      });
    }
  };

  const handleComment = () => {
    setIsCommentMode(true);
  };

  const handleCommentSubmit = () => {
    const newComments = [...comments];
    newComments[currentItemIndex] = comment;
    setComments(newComments);
    setComment("");
  };

  const currentClothing = clothes[currentItemIndex];

  return (
    <>
      <BackHeader onBack={() => navigate(-1)} title="의상" />
      <Container>
        <Text size={18} weight={700}>
          의상 세부사항
        </Text>
        <Space />
        <ImageComponent
          src={currentClothing?.src}
          alt={currentClothing?.description || "의상"}
          height="20rem"
        />
        <Details>
          {!isCommentMode ? (
            <ButtonContainer>
              <MainButton onClick={handleApprove}>승인</MainButton>
              <MainButton isActive={false} onClick={handleComment}>
                코멘트
              </MainButton>
            </ButtonContainer>
          ) : (
            <CommentWrapper>
              <ManagerComment>
                <Text size={16} weight={700}>
                  관리자
                </Text>
                <Text size={16}>{comments[currentItemIndex] || "comment"}</Text>
              </ManagerComment>
              <InputContainer>
                <Input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <GoPaperAirplane
                  size={25}
                  color="#fff"
                  onClick={handleCommentSubmit}
                />
                <IoIosLink size={25} color="#fff" />
              </InputContainer>
              <MainButton onClick={handleApprove}>
                다음 의상 컨펌하기
              </MainButton>
            </CommentWrapper>
          )}
        </Details>
      </Container>
    </>
  );
};

export default CompanyClothesApproval;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Details = styled.div`
  width: 100%;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ManagerComment = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #fff;
  border-radius: 12px;
  background-color: transparent;
  margin: 30px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-top: 150px;
`;

const InputContainer = styled.div`
  display: flex;
  border-radius: 12px;
  background-color: #d4af2a;
  padding: 12px;
  gap: 10px;
  margin-bottom: 90px;
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  font-size: 16px;
  color: #fff;
`;

const Space = styled.div`
  padding: 10px;
`;

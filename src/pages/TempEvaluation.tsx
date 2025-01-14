import React, { useState, useRef } from "react";
import styled from "styled-components";
import Text from "@components/atoms/Text";
import { MainButton } from "@components/atoms/Button";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { dummyUserRoleData } from "@api/dummyData";

/**
 * TempEvaluation : 지원자 온도 평가 화면
 */

const TempEvaluation = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { id } = useParams<{ id: string }>();
  const isDragging = useRef(false); // 드래그 중 여부 추적
  const user = dummyUserRoleData.find((user) => user.userId === id);

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    updateRating(event);
  };

  const handleDragMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (isDragging.current) {
      updateRating(event);
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const updateRating = (event: React.MouseEvent | React.TouchEvent) => {
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const starsElement = document.getElementById("stars-container");
    if (starsElement) {
      const rect = starsElement.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const newRating = Math.ceil((relativeX / rect.width) * 5);
      if (newRating >= 1 && newRating <= 5) {
        setRating(newRating);
      }
    }
  };

  const handleSubmit = () => {
    console.log({
      userId: id,
      name: user?.name,
      category: user?.category,
      role: user?.role,
      rating,
      review,
    });
  };

  return (
    <Container>
      <ImageContainer>
        <ProfileImage
          src={user?.imageUrl || "https://via.placeholder.com/100"}
          alt="Profile"
        />
      </ImageContainer>
      <Text size={20} weight={700} align="left">
        이름: {user?.name}
      </Text>
      <Row>
        <Text size={20} weight={700} align="left">
          상세 정보:
        </Text>
        <Text size={20} weight={700} align="left">
          {user?.category} / {user?.role}
        </Text>
      </Row>

      <Row>
        <Text size={20} weight={700} align="left">
          별점
        </Text>
        <StarsContainer
          id="stars-container"
          // 마우스 드래그
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          // 터치 드래그
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {[...Array(5)].map((_, index) => (
            <StarIcon key={index} isActive={index < rating} />
          ))}
        </StarsContainer>
      </Row>
      <Text size={20} weight={700} align="left">
        한 줄 평가
      </Text>
      <TextArea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="평가를 작성해주세요."
      />
      <MainButton onClick={handleSubmit}>등록</MainButton>
    </Container>
  );
};

export default TempEvaluation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 30px;
`;

const StarsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  width: 100%;
  gap: 5px;
`;

const StarIcon = styled(FaStar)<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "#F5C001" : "#D9D9D9")};
  font-size: 30px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 160px;
  background-color: #d9d9d9;
  border: none;
  border-radius: 10px;
  margin: 10px 0 60px 0;
  padding: 10px;
  font-size: 16px;
  color: black;
`;

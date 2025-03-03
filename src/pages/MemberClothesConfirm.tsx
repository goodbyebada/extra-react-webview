import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Text from "@components/atoms/Text";
import { MainButton } from "@components/atoms/Button";
import { FaPlus } from "react-icons/fa";
import ImageComponent from "@components/atoms/Image";
import { handleImageUpload } from "@utills/imageUpload";
import BackHeader from "@components/custom/BackHeader";

const dummyClothesInfo = {
  images: [
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100",
  ],
  role: "학생",
  season: "봄",
  description: "회색옷",
};

/**
 * MemberClothesConfirm : 사용자 - 의상 컨펌 등록
 */

const MemberClothesConfirm = () => {
  const navigate = useNavigate();
  const [myImages, setMyImages] = useState<string[]>([]);

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(event, setMyImages);
  };

  const handleRegister = () => {
    // 등록 버튼 클릭 시 뒤로가기 (임시)
    navigate(-1);
  };

  return (
    <>
      <BackHeader onBack={() => navigate(-1)} title="의상" />
      <Container>
        <Text size={18} weight={700} align="left">
          의상 이미지
        </Text>

        <ImageGrid>
          {dummyClothesInfo.images.map((src, index) => (
            <ImageComponent
              key={index}
              src={src}
              alt={`placeholder-${index}`}
            />
          ))}
        </ImageGrid>

        <InfoWrapper>
          <Text size={16} weight={700} align="left">
            역할
          </Text>
          <Text size={16} color="#f5c001" align="left">
            {dummyClothesInfo.role}
          </Text>
        </InfoWrapper>
        <InfoWrapper>
          <Text size={16} weight={700} align="left">
            계절
          </Text>
          <Text size={16} color="#f5c001" align="left">
            {dummyClothesInfo.season}
          </Text>
        </InfoWrapper>
        <InfoWrapper>
          <Text size={16} weight={700} align="left">
            상세설명
          </Text>
          <Text size={16} color="#f5c001" align="left">
            {dummyClothesInfo.description}
          </Text>
        </InfoWrapper>

        <Text size={18} weight={700} align="left">
          내 의상 등록
        </Text>

        <ImageGrid>
          {myImages.map((src, index) => (
            <ImageComponent
              key={index}
              src={src}
              alt={`my-uploaded-image-${index}`}
            />
          ))}
        </ImageGrid>

        <AddImageButtonWrapper>
          <label htmlFor="image-upload">
            <AddImageButton>
              <FaPlus style={{ marginRight: "10px" }} />
              의상 추가
            </AddImageButton>
          </label>
          <HiddenInput
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={onImageUpload}
          />
        </AddImageButtonWrapper>

        <MainButton onClick={handleRegister}>등록</MainButton>
      </Container>
    </>
  );
};

export default MemberClothesConfirm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
  margin: 26px 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 12px;
  border: solid 1px #f5c001;
  width: 100%;
  padding: 20px;
  margin-bottom: 34px;
`;

const AddImageButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const AddImageButton = styled.div`
  width: 150px;
  background-color: #f5c001;
  border: none;
  color: #000;
  border-radius: 26px;
  font-size: 16px;
  font-weight: bold;
  padding: 16px 24px;
  margin-bottom: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

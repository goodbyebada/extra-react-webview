import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Text from "@components/atoms/Text";
import { MainButton } from "@components/atoms/Button";
import { FaPlus } from "react-icons/fa";
import ImageComponent from "@components/atoms/Image";
import { handleImageUpload } from "@utills/imageUpload";
import Modal from "@components/atoms/Modal";
import { Costume } from "@api/interface";

interface CompanyClothesModalProps {
  onSubmit: (costume: Costume) => void;
  closeModal: () => void;
  isVisible: boolean;
  roleName: string;
  initialCostume?: Costume;
}

/**
 * CompanyClothesModal : 공고 등록 - 의상 등록 모달
 * onSubmit: (costume: Costume) => void;
 * isVisible: 모달 표시 여부
 * closeModal: 모달 닫기 함수
 * roleName: string;
 * initialCostume?: Costume; 수정 시 사용
 */

const CompanyClothesModal = ({
  isVisible,
  closeModal,
  onSubmit,
  roleName,
  initialCostume,
}: CompanyClothesModalProps) => {
  const [images, setImages] = useState<string[]>(
    initialCostume?.imageSrc || [],
  );
  const [season, setSeason] = useState(initialCostume?.season || "");
  const [etc, setEtc] = useState(initialCostume?.etc || "");

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(event, setImages);
  };

  const handleSubmit = () => {
    const costume: Costume = {
      roleName: roleName || "none",
      season,
      etc,
      imageSrc: images,
    };
    onSubmit(costume);
    closeModal();
  };

  useEffect(() => {
    if (initialCostume) {
      setImages(initialCostume.imageSrc);
      setSeason(initialCostume.season);
      setEtc(initialCostume.etc);
    }
  }, [initialCostume]);

  return (
    <Modal isVisible={isVisible} onClose={closeModal}>
      <ScrollContainer>
        <Container>
          <InfoWrapper>
            <Text size={16} align="left">
              역할
            </Text>
            <Input value={roleName || ""} readOnly />
          </InfoWrapper>
          <InfoWrapper>
            <Text size={16} align="left">
              계절
            </Text>
            <Input
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              placeholder="계절을 입력하세요"
            />
          </InfoWrapper>
          <InfoWrapper>
            <Text size={16} align="left">
              상세설명
            </Text>
            <Input
              value={etc}
              onChange={(e) => setEtc(e.target.value)}
              placeholder="상세설명을 입력하세요"
            />
          </InfoWrapper>

          <Text size={18} weight={700} align="left">
            의상 등록
          </Text>

          <ImageGrid>
            {images.map((src, index) => (
              <ImageComponent
                key={index}
                src={src}
                alt={`uploaded-image-${index}`}
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

          <MainButton
            onClick={handleSubmit}
            disabled={!roleName || !season || !etc}
            isActive={!!roleName && !!season && !!etc}
          >
            등록
          </MainButton>
        </Container>
      </ScrollContainer>
    </Modal>
  );
};

export default CompanyClothesModal;

const ScrollContainer = styled.div`
  max-height: 80vh;
  overflow-y: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 12px;
  width: 100%;
  margin: 26px 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 24px;
`;

const Input = styled.textarea`
  border-radius: 12px;
  border: solid 1px #f5c001;
  background-color: transparent;
  color: #fff;
  height: 100px;
  padding: 20px;
  font-size: 16px;
  line-height: 1.5;
  outline: none;
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

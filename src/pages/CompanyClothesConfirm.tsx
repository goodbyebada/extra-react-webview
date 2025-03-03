import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Text from "@components/atoms/Text";
import { MainButton } from "@components/atoms/Button";
import ImageComponent from "@components/atoms/Image";
import BackHeader from "@components/custom/BackHeader";

/**
 * CompanyClothesConfirm : 업체 - 사용자 의상컨펌 (최종)
 */

const CompanyClothesConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { images = [], comments = [] } = location.state || {};

  const hasValidComments = comments.some(
    (comment: string) => comment && comment.trim(),
  );

  const handleNext = () => {
    navigate("/company/clothes-member");
  };

  return (
    <>
      <BackHeader onBack={() => navigate(-1)} title="의상" />
      <Container>
        <Text size={18} weight={700} align="left">
          의상 세부사항
        </Text>
        <Space />
        <ImageGrid>
          {images.map((src: string, index: number) => (
            <ImageComponent key={index} src={src} alt={`image-${index}`} />
          ))}
        </ImageGrid>

        <InfoWrapper>
          <Text size={16} weight={700} align="left">
            관리자 전체 코멘트
          </Text>
          <Text size={16} color="#f5c001" align="left">
            {hasValidComments ? (
              comments.map((comment: string, index: number) => (
                <div key={index}>{comment}</div>
              ))
            ) : (
              <div>No Comment</div>
            )}
          </Text>
        </InfoWrapper>
        <MainButton onClick={handleNext}>현장 컨펌 등록</MainButton>
      </Container>
    </>
  );
};

export default CompanyClothesConfirm;

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
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 12px;
  border: solid 1px #fff;
  width: 100%;
  padding: 20px;
  margin: 30px 0;
`;

const Space = styled.div`
  padding: 10px;
`;

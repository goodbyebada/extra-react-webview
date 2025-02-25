import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ImageComponent from "@components/atoms/Image";
import Text from "@components/atoms/Text";
import { MainButton } from "@components/atoms/Button";
import BackHeader from "@components/custom/BackHeader";

/**
 * MemberClothesConfirm : 사용자 - 의상 컨펌 확인
 */

const dummyData = [
  {
    id: 1,
    src: "image1.jpg",
    isApproved: true,
    comment: "",
  },
  {
    id: 2,
    src: "image2.jpg",
    isApproved: false,
    comment: "어두운 색상으로 해주세요.",
  },
  {
    id: 3,
    src: "image3.jpg",
    isApproved: false,
    comment: "청바지가 필요합니다.",
  },
  {
    id: 4,
    src: "image4.jpg",
    isApproved: true,
    comment: "",
  },
];

const MemberClothesComment = () => {
  const navigate = useNavigate();
  const approvedClothes = dummyData.filter((item) => item.isApproved);
  const unapprovedClothes = dummyData.filter((item) => !item.isApproved);

  const handleCheck = () => {
    // 확인 버튼 클릭 시 뒤로가기 (임시)
    navigate(-1);
  };

  return (
    <>
      <BackHeader onBack={() => navigate(-1)} title="의상" />
      <Container>
        <InfoWrapper>
          <Text size={16} weight={700} align="left">
            관리자 전체 코멘트
          </Text>
          {dummyData.some((item) => item.comment) ? (
            dummyData.map(
              (item) =>
                item.comment && (
                  <Text key={item.id} size={16} color="#f5c001">
                    {item.comment}
                  </Text>
                ),
            )
          ) : (
            <Text size={16} color="#f5c001">
              All Approved
            </Text>
          )}
        </InfoWrapper>

        <Section>
          <Text size={18} weight={700}>
            승인 의상
          </Text>
          <Space />
          {approvedClothes.map((item) => (
            <ClothingItem key={item.id}>
              <ImageComponent src={item.src} height="20rem" />
            </ClothingItem>
          ))}
        </Section>

        <Section>
          <Text size={18} weight={700}>
            미승인 의상
          </Text>
          <Space />
          {unapprovedClothes.map((item) => (
            <ClothingItem key={item.id}>
              <ImageComponent src={item.src} height="20rem" />
              <InfoWrapper>
                <Text size={16} weight={700} align="left">
                  관리자
                </Text>
                <Text size={16} color="#f5c001" align="left">
                  {item.comment || "No Comment"}
                </Text>
              </InfoWrapper>
            </ClothingItem>
          ))}
        </Section>

        <MainButton onClick={handleCheck}>확인</MainButton>
      </Container>
    </>
  );
};

export default MemberClothesComment;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const ClothingItem = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 12px;
  border: solid 1px #fff;
  width: 100%;
  padding: 20px;
  margin: 20px 0;
`;

const Space = styled.div`
  padding: 10px;
`;

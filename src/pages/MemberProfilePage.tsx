import { BACKGROUND_COLORS, COMMON_COLORS, FONT_COLORS } from "@/styled/colors";
import Container from "@components/atoms/Container";
import Margin from "@components/atoms/Margin";
import Text from "@components/atoms/Text";
import MainWindow from "@components/mocules/MainWindow";
import styled from "styled-components";

import { IoIosStarHalf, IoIosStarOutline, IoIosStar } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import ScrollingList from "@components/mocules/ScrollingList";
import { useNavigate } from "react-router-dom";

const ProfileImage = styled.div`
  width: 90px;
  height: 90px;

  border-radius: 50%;
  overflow: hidden;

  background: #d9d9d9;

  & > img {
    max-width: 100%;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${FONT_COLORS.gray};

  margin: 10px 0;
`;

const MemberProfilePage = () => {
  const navigate = useNavigate();
  const getRatingComponents = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [
      ...Array(fullStars).fill(
        <IoIosStar color={COMMON_COLORS.main} size={20} />,
      ),
      ...(hasHalfStar
        ? [<IoIosStarHalf key={1} color={COMMON_COLORS.main} size={20} />]
        : []), // 반쪽 별
      ...Array(emptyStars).fill(<IoIosStarOutline color="gray" size={20} />), // 빈 별
    ];

    return <>{stars}</>;
  };

  return (
    <MainWindow headerShown={false} activeDefaultPadding={false}>
      <ScrollingList>
        <Container
          background={BACKGROUND_COLORS.sign}
          style={{
            height: "300px",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          <ProfileImage>{/* <img src="" alt="profile" /> */}</ProfileImage>
          <Margin size={20} />
          <Text size={20} weight={900}>
            출연자1
          </Text>
          <Text size={15} weight={600} color={FONT_COLORS.gray}>
            24세
          </Text>
          <Margin size={10} />
          <Container flexDirection="row" style={{ height: "30px" }}>
            <Text size={16}>평점: </Text>
            <Margin direction="horizontal" size={10} />
            {getRatingComponents(4.5)}
          </Container>
        </Container>
        <Container paddingHorizontal={20} paddingVertical={30}>
          <Container alignItems="flex-start">
            <Container
              alignItems="flex-start"
              background={BACKGROUND_COLORS.card}
              paddingHorizontal={20}
              paddingVertical={20}
              style={{ borderRadius: "15px" }}
            >
              <Text size={18} weight={900}>
                프로필 정보
              </Text>
              <Margin size={15} />
              <Text size={16} color={FONT_COLORS.gray}>
                신장:{" "}
                <Text size={16} color={FONT_COLORS.white} inline>
                  170cm
                </Text>
              </Text>
              <Margin size={5} />
              <Text size={16} color={FONT_COLORS.gray}>
                몸무게:{" "}
                <Text size={16} color={FONT_COLORS.white} inline>
                  50kg
                </Text>
              </Text>
              <Margin size={5} />
              <Text size={16} color={FONT_COLORS.gray}>
                타투:{" "}
                <Text size={16} color={FONT_COLORS.white} inline>
                  등, 왼쪽 팔
                </Text>
              </Text>
            </Container>
            <Margin size={30} />
            <Container
              alignItems="flex-start"
              background={BACKGROUND_COLORS.card}
              paddingHorizontal={20}
              paddingVertical={20}
              style={{ borderRadius: "15px" }}
            >
              <Container
                flexDirection="row"
                justifyContent="space-between"
                onClick={() => {}}
              >
                <Text size={14}>프로필 수정</Text>
                <FaAngleRight />
              </Container>
              <Divider />
              <Container
                flexDirection="row"
                justifyContent="space-between"
                onClick={() => {}}
              >
                <Text size={14}>계좌 관리</Text>
                <FaAngleRight />
              </Container>
              <Divider />
              <Container
                flexDirection="row"
                justifyContent="space-between"
                onClick={() => {
                  navigate("/member/profile/setting");
                }}
              >
                <Text size={14}>설정</Text>
                <FaAngleRight />
              </Container>
            </Container>
          </Container>
        </Container>
      </ScrollingList>
    </MainWindow>
  );
};

export default MemberProfilePage;

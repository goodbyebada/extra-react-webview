import { BACKGROUND_COLORS, FONT_COLORS } from "@/styled/colors";
import Container from "@components/atoms/Container";
import Text from "@components/atoms/Text";
import MainWindow from "@components/mocules/MainWindow";
import styled from "styled-components";

import { FaAngleRight } from "react-icons/fa6";
import ScrollingList from "@components/mocules/ScrollingList";
import { useNavigate } from "react-router-dom";

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${FONT_COLORS.gray};

  margin: 10px 0;
`;

const CompanyProfilePage = () => {
  const navigate = useNavigate();

  return (
    <MainWindow headerShown={false} activeDefaultPadding={false}>
      <ScrollingList>
        <Container
          background={BACKGROUND_COLORS.sign}
          style={{
            height: "150px",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          <Text size={20} weight={900}>
            업체 관리자1
          </Text>
          <Text size={15} weight={600} color={FONT_COLORS.gray}>
            A회사
          </Text>
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
              <Container
                flexDirection="row"
                justifyContent="space-between"
                onClick={() => {}}
              >
                <Text size={14}>계정 관리</Text>
                <FaAngleRight />
              </Container>
              <Divider />
              <Container
                flexDirection="row"
                justifyContent="space-between"
                onClick={() => {
                  navigate("/company/profile/setting");
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

export default CompanyProfilePage;

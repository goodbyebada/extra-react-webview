import Container from "@components/atoms/Container";
import MainWindow from "@components/mocules/MainWindow";
import DashboardLinkButton from "@components/mocules/manage/DashboardLinkButton";

// ?? 계약서 url 안 보임
const BASE = "/company/manage";
const PATH = {
  출석: `${BASE}/attendance`,
  출연자목록: `${BASE}/actor`,
  퇴근: `${BASE}/clock-out`,
  출근: `${BASE}/clock-in`,
  계약서: `${BASE}/actor`,
  의상컨펌: `${BASE}/clothes-member`,
};

const CompanyShootManageDetailPage = () => {
  return (
    <MainWindow>
      <Container
        flexWrap
        flexDirection="row"
        // paddingHorizontal={10}
        // paddingVertical={50}
        justifyContent="space-between"
      >
        <DashboardLinkButton url={PATH["출석"]} title="출석" />
        <DashboardLinkButton url={PATH["출연자목록"]} title="출연자 목록" />
        <DashboardLinkButton url={PATH["퇴근"]} title="퇴근" />
        <DashboardLinkButton url={PATH["출근"]} title="출근" />
        <DashboardLinkButton url={PATH["계약서"]} title="계약서" />
        <DashboardLinkButton url={PATH["의상컨펌"]} title="의상 컨펌" />
      </Container>
    </MainWindow>
  );
};

export default CompanyShootManageDetailPage;

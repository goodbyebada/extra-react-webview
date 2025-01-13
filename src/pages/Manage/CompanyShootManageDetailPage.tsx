import Container from "@components/atoms/Container";
import MainWindow from "@components/mocules/MainWindow";
import DashboardLinkButton from "@components/mocules/manage/DashboardLinkButton";

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
        <DashboardLinkButton url="/" title="출석" />
        <DashboardLinkButton url="/actor-list" title="출연자 목록" />
        <DashboardLinkButton url="/" title="퇴근" />
        <DashboardLinkButton url="/" title="출근" />
        <DashboardLinkButton url="/" title="계약서" />
        <DashboardLinkButton url="/" title="의상 컨펌" />
      </Container>
    </MainWindow>
  );
};

export default CompanyShootManageDetailPage;

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
        <DashboardLinkButton url="/company/manage/attendance" title="출석" />
        <DashboardLinkButton url="/company/manage/actor" title="출연자 목록" />
        <DashboardLinkButton url="/company/manage/clock-out" title="퇴근" />
        <DashboardLinkButton url="/company/manage/clock-in" title="출근" />
        <DashboardLinkButton url="/company/manage/upload-pdf" title="계약서" />
        <DashboardLinkButton
          url="/company/manage/clothes-confirm"
          title="의상 컨펌"
        />
      </Container>
    </MainWindow>
  );
};

export default CompanyShootManageDetailPage;

import { Container, Window } from "@components/atoms/Container";
import DashboardLinkButton from "@components/mocules/manage/DashboardLinkButton";

const CompanyShootManageDetailPage = () => {
  return (
    <Window>
      <Container flex={50}>
        <Container
          flexWrap
          flexDirection="row"
          paddingHorizontal={40}
          justifyContent="space-between"
        >
          <DashboardLinkButton url="/" title="출석" />
          <DashboardLinkButton url="/actor-list" title="출연자 목록" />
          <DashboardLinkButton url="/" title="퇴근" />
          <DashboardLinkButton url="/" title="출근" />
          <DashboardLinkButton url="/" title="계약서" />
          <DashboardLinkButton url="/" title="의상 컨펌" />
        </Container>
      </Container>
    </Window>
  );
};

export default CompanyShootManageDetailPage;

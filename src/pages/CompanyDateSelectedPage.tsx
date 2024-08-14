import CompanyModal from "@components/CompanyModal";
import { dummyMonthJobList } from "@api/dummyData";

function CompanyDateSelectedPage() {
  const jobList = dummyMonthJobList;

  return <CompanyModal jobList={jobList} />;
}

export default CompanyDateSelectedPage;

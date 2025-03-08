import { requestDeleteFetch, requestGetFetch } from "@api/utils";
import { ShootManageList } from "@type/shared";
import { dummyShootManageList } from "@mocks/dummyJobData";

export const handleDeleteOrCancel = async (
  id: number,
  isCancel: boolean,
  setRecruitBoxes: (boxes: ShootManageList) => void,
  recruitBoxes: ShootManageList,
  closeCancelModal: () => void,
  openCompleteModal: () => void,
) => {
  try {
    const res = await requestDeleteFetch(
      `application-request/member/application-requests/${id}`,
    );

    if (res !== null) {
      if (!res.ok) {
        throw new Error(`API call failed with status ${res.status}`);
      }

      setRecruitBoxes(recruitBoxes.filter((box) => box.id !== id));

      if (isCancel) {
        closeCancelModal();
        openCompleteModal();
      }
    }
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

export const loadData = async (
  statusUrl: string,
  applyStatusIdx: number,
  setRecruitBoxes: (boxes: ShootManageList) => void,
  filterDataByStatus: (
    data: typeof dummyShootManageList,
    statusIdx: number,
  ) => ShootManageList,
) => {
  try {
    const res = await requestGetFetch(
      `application-request/member/roles${statusUrl}`,
    );
    if (res && res.ok) {
      const data = await res.json();
      setRecruitBoxes(data);
    } else {
      const filteredData = filterDataByStatus(
        dummyShootManageList,
        applyStatusIdx,
      );
      setRecruitBoxes(filteredData);
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    const filteredData = filterDataByStatus(
      dummyShootManageList,
      applyStatusIdx,
    );
    setRecruitBoxes(filteredData);
  }
};

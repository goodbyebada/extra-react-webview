/**
 * 보조출연자 촬영관리 화면
 * @returns
 *
 * api 연결 shootManageAPI.ts에 분리
 * -> 현재 dummy data 적용
 */

import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import DropDownSelector from "@components/DropDownSelector";
import CancelCheckModal from "@components/Modal/CancelCheckModal";
import CompleteModal from "@components/Modal/CompleteModal";
import MainWindow from "@components/mocules/MainWindow";
import SwipeableItem from "@components/mocules/SwipeableItem";
import {
  ShootManage,
  ShootManageList,
  ShootManageSelectStatus,
} from "@type/shared";
import { dummyShootManageList } from "@mocks/dummyJobData";

export default function ExtraShootManagePage() {
  const [applyStatusIdx, setApplyStatusIdx] = useState(0);
  const [recruitBoxes, setRecruitBoxes] = useState<ShootManageList>([]);
  const [modalData, setModalData] = useState<ShootManage | null>(null);
  const [isCancelCheckModalOpen, setIsCancelCheckModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"supportCancel" | "delete">(
    "delete",
  );

  const filterDataByStatus = (
    data: typeof dummyShootManageList,
    statusIdx: number,
  ) => {
    return data.filter((item) => {
      if (statusIdx === 0) return true;
      if (statusIdx === 1 && item.applyStatus === "applied") return true;
      if (statusIdx === 2 && item.applyStatus === "rejected") return true;
      if (statusIdx === 3 && item.applyStatus === "approved") return true;
      return false;
    });
  };

  const loadData = useCallback(
    (statusUrl: string) => {
      const filteredData = filterDataByStatus(
        dummyShootManageList,
        applyStatusIdx,
      );
      setRecruitBoxes(filteredData);
      console.log(`Fetching data from: ${statusUrl}`);
    },
    [applyStatusIdx],
  );

  useEffect(() => {
    const status = ShootManageSelectStatus[applyStatusIdx];
    const statusUrl =
      applyStatusIdx === 0
        ? "" // 전체 목록은 /roles만 호출
        : `/${status.toLowerCase()}`;

    loadData(statusUrl);
  }, [loadData, applyStatusIdx]);

  const selcetorList = [0, 1, 2, 3];

  const handler = (selectedIdx: number) => {
    setApplyStatusIdx(selectedIdx);
  };

  const handleDeleteOrCancel = async (id: number, isCancel: boolean) => {
    setRecruitBoxes(recruitBoxes.filter((box) => box.id !== id));
    if (isCancel) {
      closeCancelModal();
      openCompleteModal("supportCancel");
    } else {
      openCompleteModal("delete");
    }
  };

  const openCancelModal = (item: ShootManage) => {
    setModalData(item);
    setIsCancelCheckModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelCheckModalOpen(false);
    setModalData(null);
  };

  const openCompleteModal = (type: "supportCancel" | "delete") => {
    setIsCompleteModalOpen(true);
    setModalType(type);
  };

  const closeCompleteModal = () => {
    setIsCompleteModalOpen(false);
  };

  const handleConfirmCancel = () => {
    if (modalData) {
      handleDeleteOrCancel(modalData.id, true);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <MainWindow>
        <Top>
          <DropDownSelector
            currentIdx={applyStatusIdx}
            modalIdxList={selcetorList}
            handler={handler}
          />
        </Top>
        <ListContainer>
          {recruitBoxes.map((box) => (
            <Wrapper key={box.id}>
              <SwipeableItem
                title={box.title}
                category={box.category}
                date={box.calenderList}
                dDay={box.dDay}
                company={box.company}
                time={box.time}
                location={box.location}
                status={box.applyStatus}
                statusText={box.applyStatusText}
                onClick={() => console.log("Item clicked")}
                onDelete={() => {
                  if (box.applyStatus === "applied") {
                    openCancelModal(box);
                  } else {
                    handleDeleteOrCancel(box.id, false);
                  }
                }}
              />
            </Wrapper>
          ))}
        </ListContainer>
        {isCancelCheckModalOpen && modalData && (
          <CancelCheckModal
            title={modalData.title}
            date={modalData.calenderList}
            onConfirm={handleConfirmCancel}
            onCancel={closeCancelModal}
          />
        )}
        {isCompleteModalOpen && (
          <CompleteModal type={modalType} closeModal={closeCompleteModal} />
        )}
      </MainWindow>
    </div>
  );
}

const Wrapper = styled.div`
  width: 365px;
  height: 145px;
`;

const Top = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: end;
  position: sticky;
  top: 0;
  left: 0;
  background-color: black;
  z-index: 9;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin: 10px 0;
  }
`;

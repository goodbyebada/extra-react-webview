/**
 * 보조출연자 촬영관리 화면
 * @returns
 *
 * 수정사항
 * 1. 로그인 api 연결은 추후 삭제 예정
 */

import StatusRecruitBox from "@components/StatusRecruitBox";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import DropDownSelector from "@components/DropDownSelector";
import CancelCheckModal from "@components/Modal/CancelCheckModal";
import CompleteModal from "@components/Modal/CompleteModal";
import {
  ShootManageList,
  ShootManageSelectStatus,
  ShootManage,
} from "@api/interface";
import { requestDeleteFetch, requestGetFetch } from "@api/utils";

export default function ExtraShootManagePage() {
  const [applyStatusIdx, setApplyStatusIdx] = useState(0);
  const [recruitBoxes, setRecruitBoxes] = useState<ShootManageList>([]);
  const [modalData, setModalData] = useState<ShootManage | null>(null);
  const [isCancelCheckModalOpen, setIsCancelCheckModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const loadData = useCallback(
    async (statusUrl: string) => {
      try {
        const res = await requestGetFetch(
          `application-request/member/roles${statusUrl}`,
        );

        if (res !== null) {
          if (!res.ok) {
            throw new Error(`API call failed with status ${res.status}`);
          }
          res.json().then((data) => {
            setRecruitBoxes(data);
            const mappedData = data.map((item: ShootManage) => ({
              ...item,
              applyStatus:
                ShootManageSelectStatus[
                  item.applyStatus as unknown as keyof typeof ShootManageSelectStatus
                ],
            }));

            setRecruitBoxes(mappedData);
            const status =
              ShootManageSelectStatus[applyStatusIdx] || "Unknown status";
            console.log(`Data fetched successfully for ${status}:`, data);
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    },
    [applyStatusIdx],
  );

  // applyStatusIdx가 변경될 때마다 API 호출
  useEffect(() => {
    const status = ShootManageSelectStatus[applyStatusIdx];
    const statusUrl =
      applyStatusIdx === 0
        ? "" // 전체 목록은 /roles만 호출
        : `/${status.toLowerCase()}`;

    loadData(statusUrl);
  }, [loadData, applyStatusIdx]);

  // 1~3까지의 배열
  const selcetorList = Array.from({ length: 4 }, (_, i) => i);
  const handler = (selectedIdx: number) => {
    setApplyStatusIdx(selectedIdx);
  };

  const handleDeleteOrCancel = async (id: number, isCancel: boolean) => {
    try {
      const res = await requestDeleteFetch(
        `application-request/member/application-requests/${id}`,
      );

      if (res !== null) {
        if (!res.ok) {
          throw new Error(`API call failed with status ${res.status}`);
        }

        if (isCancel) {
          setRecruitBoxes(recruitBoxes.filter((box) => box.id !== id));
          closeCancelModal();
          openCompleteModal();
        } else {
          setRecruitBoxes(recruitBoxes.filter((box) => box.id !== id));
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
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

  const openCompleteModal = () => {
    setIsCompleteModalOpen(true);
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
    <div
      style={{
        marginTop: "10px",
      }}
    >
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
            <StatusRecruitBox
              shootManageInfo={box}
              onDelete={(id) => handleDeleteOrCancel(id, false)}
              onOpenCancelModal={openCancelModal}
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
        <CompleteModal type="supportCancel" closeModal={closeCompleteModal} />
      )}
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
  /* width: 100%; */
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > * {
    margin-bottom: 10px;
  }
`;

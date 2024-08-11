/**
 * 보조출연자 촬영관리 화면
 * @returns
 */

import StatusRecruitBox from "@components/StatusRecruitBox";
import styled from "styled-components";
import { useState } from "react";
import DropDownSelector from "@components/DropDownSelector";
import { dummyRecruitList } from "@api/dummyData";
import { Recruit } from "@api/interface";

// {
//   "id": 1,
//   "category": "공고 카테고리",
//   "title": "공고 제목",
//   "gatheringTime": "2024-01-06T00:29:55",
//   "gatheringLocation": "어디어디",
//   "name": “업체 이름",
//   "applyStatus": "APPLIED(지원 상태 enum- APPLIED, REJECTED, APPROVED)"
//   }

export default function ExtraShootManagePage() {
  const [applyStatusIdx, setApplyStatusIdx] = useState(0);
  // 1~3까지의 배열
  const selcetorList = Array.from({ length: 4 }, (_, i) => i);
  const handler = (selectedIdx: number) => {
    setApplyStatusIdx(selectedIdx);
  };

  const recruitList = dummyRecruitList;

  const element = (key: number, elem: Recruit) => (
    <Wrapper key={key}>
      <StatusRecruitBox recruitInfo={elem} />
    </Wrapper>
  );

  const elementList = recruitList
    .filter(
      (elem) =>
        applyStatusIdx === 0 ||
        (applyStatusIdx === 1 && elem.status.pending) ||
        (applyStatusIdx === 2 && elem.status.rejected) ||
        (applyStatusIdx === 3 && elem.status.approved),
    )
    .map((elem, key) => element(key, elem));

  return (
    <div>
      <Top>
        <DropDownSelector
          currentIdx={applyStatusIdx}
          modalIdxList={selcetorList}
          handler={handler}
        />
      </Top>
      <ListContainer>{elementList}</ListContainer>
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
  margin: 20px 0 10px;
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

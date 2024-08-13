/**
 * 보조출연자 촬영관리 화면
 * @returns
 */

import StatusRecruitBox from "@components/StatusRecruitBox";
import styled from "styled-components";
import { useState } from "react";
import DropDownSelector from "@components/DropDownSelector";
import { dummyShootManageList } from "@api/dummyData";

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
  const [recruitBoxes, setRecruitBoxes] = useState(dummyShootManageList);

  // 1~3까지의 배열
  const selcetorList = Array.from({ length: 4 }, (v, i) => i);
  const handler = (selectedIdx: number) => {
    setApplyStatusIdx(selectedIdx);
  };

  const handleDelete = (id: number) => {
    setRecruitBoxes(recruitBoxes.filter((box) => box.id !== id));
  };

  return (
    <div>
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
            <StatusRecruitBox shootManageInfo={box} onDelete={handleDelete} />
          </Wrapper>
        ))}
      </ListContainer>
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

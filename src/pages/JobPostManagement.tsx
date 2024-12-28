import { Header } from "@components/template/Layout";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { SpaceBetweenNavBar } from "@components/template/Layout";
import addButtonImg from "@assets/addButton.jpg";
import { useNavigate } from "react-router-dom";
import { LabeledCheckBoxGroup } from "@components/mocules/LabeledCheckBoxGroup";

/**
 * 업체 측 공고 관리 화면
 */
export default function JobPostManagement() {
  const navigate = useNavigate();

  const LABEL_ITEM_LIST = ["전체 보기", "나만 보기"];
  const [checkedLabel, setCheckedLabel] = useState<string>(LABEL_ITEM_LIST[0]);

  const handleCheckedItemLable = (checkedLabel: string | undefined) => {
    setCheckedLabel(() => {
      if (checkedLabel) return checkedLabel;
      return "undefined";
    });
  };

  //   임시 경로
  const path = "/";
  return (
    <>
      <Header>
        <SpaceBetweenNavBar>
          <h1>우리 회사 공고</h1>
          <div>{checkedLabel}</div>
          <IconImage
            src={addButtonImg}
            alt="공고 추가 버튼"
            onClick={() => {
              navigate(path);
            }}
          />
        </SpaceBetweenNavBar>
      </Header>

      <LabeledCheckBoxGroup
        lableItemList={LABEL_ITEM_LIST}
        handleCheckedItemLable={handleCheckedItemLable}
      />
    </>
  );
}

const IconImage = styled.img`
  width: 50px;
  height: 50px;
`;

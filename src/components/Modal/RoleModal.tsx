import styled from "styled-components";
import multiply from "@assets/Multiply.png";
import RoleBox from "@components/RoleBox";
import { RoleListToShow } from "@api/interface";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { appliedRole } from "@redux/memberRoles/memberRolesSlice";
import { AppDispatch } from "@redux/store";

type ModalProps = {
  handleApply: (value: boolean) => void;
  closeModal: () => void;
  roleList: RoleListToShow;
};

/**
 * Info에 대한 정보
 * 예시) 학생 | 20~25 | 남
 *
 *
 * 1.성별이 맞지 않으면 추천하지 않음 로직만 적용된 상태,
 * 2. 중복지원이 되서는 안된다.
 */

function RoleModal({ roleList, closeModal, handleApply }: ModalProps) {
  /**
   * 임시 사용자 정보
   */
  const DummyUser = {
    name: "미뇽",
    sex: true,
  };

  const user = DummyUser;
  const dispatch = useDispatch<AppDispatch>();

  const [isSelected, setSelected] = useState<boolean[]>(
    new Array(roleList.length).fill(false),
  );
  const [selectedRoleId, setSelectedRoleId] = useState<number>(-1);

  // !!! 데이터 연결 문제 있음
  // !! 이미 접수 완료 되었을 시 모달 추가 해야함

  /**
   * 역할에 지원신청하고자 하는 유저 인터랙션 있을때마다 해당 역할에 대한 유저의 상태 확인한다.
   * 정확하겠지만, 서버 부하 증가 예상
   * @param idx
   */

  /**
   * 여러개의 역할 중 하나만 선택될 수 있는 로직
   */
  const handleClick = (idx: number) => {
    const newArr = Array(roleList.length).fill(false);
    newArr[idx] = true;
    setSelected(newArr);
  };

  /**
   * POST API 호출
   * roleList[idx].role_id로 접근 예정
   */

  const postEvent = (id: number) => {
    dispatch(appliedRole(id));
  };

  return (
    <ModalContainer>
      <MultiplyIcon src={multiply} onClick={closeModal} />

      <RoleBoxWrapper>
        {roleList.length > 0 &&
          roleList.map((elem, idx) => {
            let styled = {
              borderColor: "#fff",
              backgroundColor: "#000",
              color: "#fff",
            };

            // 사용자의 정보와 맞는 조건일시,
            //  추후 수정 예정, API 형식 미정

            if (elem.sex === user.sex) {
              return (
                <RoleBox
                  key={idx}
                  index={idx}
                  roleInfo={elem}
                  handleClick={() => {
                    handleClick(idx);
                    setSelectedRoleId(elem.roleId);
                  }}
                  isSelected={isSelected[idx]}
                  styled={styled}
                />
              );
            }

            styled = {
              borderColor: "#666666",
              backgroundColor: "#000",
              color: "#666666",
            };

            return (
              <RoleBox
                key={idx}
                index={idx}
                roleInfo={elem}
                handleClick={() => {}}
                isSelected={isSelected[idx]}
                styled={styled}
              />
            );
          })}
      </RoleBoxWrapper>

      {/* undefined를 걸러낼수있다.*/}
      <Btn
        className={
          isSelected.find((elem) => elem === true) ? "" : "non-selected"
        }
        onClick={() => {
          handleApply(!!isSelected.find((elem) => elem === true));
          if (selectedRoleId > 0) {
            postEvent(selectedRoleId);
          }
        }}
      >
        지원하기
      </Btn>
    </ModalContainer>
  );
}

export default RoleModal;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 345px;
  height: 537px;
  flex-shrink: 0;
  border-radius: 18px;
  z-index: 10;
  background:
    linear-gradient(#000, #000) padding-box,
    linear-gradient(180deg, #666666 0%, #f5c001 100%) border-box;
  border: 4px solid transparent;
`;

const MultiplyIcon = styled.img`
  position: absolute;
  top: 18px;
  right: 23px;
`;

const RoleBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 70px;
  margin-bottom: 20px;
  max-height: 380px;
  overflow-y: auto;
`;

const Btn = styled.button`
  width: 299px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 18px;
  background: #f5c001;
  color: #000;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  display: block;
  margin: 0px auto;
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);

  /* 선택되지 않았을시 비활성화 버튼  css 추가  */

  &.non-selected {
    background: #595959;
    color: #b0b0b0;
  }
`;

import styled from "styled-components";
import multiply from "@assets/Multiply.png";
import RoleBox from "@components/RoleBox";
import { RoleListToShow } from "@/type/shared";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { appliedRole } from "@redux/memberRoles/memberRolesSlice";
import { AppDispatch } from "@redux/store";
import { ContentWrapper } from "@components/atoms/Wrapper";
import { MainButton } from "@components/atoms/Button";

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
    sex: false,
  };

  const user = DummyUser;
  const dispatch = useDispatch<AppDispatch>();
  const INIT_SELECTED_STATUS = new Array(roleList.length).fill(false);

  const [selectedStatus, setSelectedStauts] =
    useState<boolean[]>(INIT_SELECTED_STATUS);
  const [selectedRoleId, setSelectedRoleId] = useState<number>(-1);
  const [isAppliedRole, setIsAppliedRole] = useState<boolean>(false);

  /**
   * 역할에 지원신청하고자 하는 유저 인터랙션 있을때마다 해당 역할에 대한 유저의 상태 확인한다.
   * 정확하겠지만, 서버 부하 증가 예상
   * @param idx
   */

  /**
   * 여러개의 역할 중 하나만 선택될 수 있는 로직
   */
  const handleClick = (idx: number) => {
    const updatedSelectedStatus = [...selectedStatus];

    updatedSelectedStatus[idx] = !updatedSelectedStatus[idx];
    setSelectedStauts(updatedSelectedStatus);
  };

  useEffect(() => {
    const result = Boolean(selectedStatus.find((elem) => elem === true));
    setIsAppliedRole(result);
  }, [selectedStatus]);

  /**
   * POST API 호출
   * roleList[idx].role_id로 접근 예정
   */

  const postEvent = (id: number) => {
    dispatch(appliedRole(id));
    console.log("1!!");
  };

  return (
    <ContentWrapper>
      <MultiplyIcon
        src={multiply}
        onClick={() => {
          setSelectedStauts(INIT_SELECTED_STATUS);
          closeModal();
        }}
      />

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
                  isSelected={selectedStatus[idx]}
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
                isSelected={selectedStatus[idx]}
                styled={styled}
              />
            );
          })}
      </RoleBoxWrapper>

      <MainButton
        onClick={() => {
          handleApply(isAppliedRole);

          if (selectedRoleId > 0) {
            console.log(selectedRoleId);
            postEvent(selectedRoleId);
          }
        }}
        isActive={isAppliedRole}
        disabled={!isAppliedRole}
      >
        지원하기
      </MainButton>
    </ContentWrapper>
  );
}

export default RoleModal;

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

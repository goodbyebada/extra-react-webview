import CompanyRoleModal from "@components/Modal/CompanyRoleModal";
import { MainButton } from "@components/atoms/Button";
import Container from "@components/atoms/Container";
import Text from "@components/atoms/Text";
import { ContentWrapper } from "@components/atoms/Wrapper";
import RoleInfo from "@components/custom/RoleInfo";
import { RoleBodyType } from "@type/shared";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MARGIN = 20;

/**
 * 역할에 대한 상세 정보 컴포넌트(RoleInfo) + 수정하기 버튼
 *
 *
 * 역할에 대한 상세 정보 수정 가능한 컴포넌트
 * @param param0
 * @returns
 */
export default function EditableRoleCard({
  RoleDetail,
  indexNumber,
  onEdit,
}: {
  RoleDetail: RoleBodyType;
  indexNumber: number;
  onEdit: (formState: RoleBodyType) => void;
}) {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const clickRoleInfoItemEvent = (id: number) => {
    const BASE_PATH = "/applicants";
    navigate(BASE_PATH + `/${id}`);
  };

  const onSubmit = (RoleDetail: RoleBodyType) => {
    onEdit(RoleDetail);
    closeModal();
  };

  return (
    <>
      <Container flexDirection="row" justifyContent="flex-start">
        <ContentWrapper marginBottom={`${MARGIN}px`} marginTop={`${MARGIN}px`}>
          <Text weight={900}>
            {indexNumber} &#41; {RoleDetail.roleName}{" "}
          </Text>
        </ContentWrapper>
      </Container>

      <RoleInfo
        roleDetailInfo={RoleDetail}
        index={indexNumber}
        onClick={() => {
          clickRoleInfoItemEvent(RoleDetail.id);
        }}
      />

      <MainButton isActive={true} onClick={openModal}>
        수정하기
      </MainButton>

      {isOpenModal && (
        <CompanyRoleModal
          onSubmit={onSubmit}
          closeModal={closeModal}
          isVisible={isOpenModal}
          role={RoleDetail}
          isEditMode={true}
        />
      )}
    </>
  );
}

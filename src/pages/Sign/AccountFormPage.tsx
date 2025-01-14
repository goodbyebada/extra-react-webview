import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Margin from "@components/atoms/Margin";
import { InputField } from "@components/atoms/Form";
import SignWindow from "@components/mocules/SignWindow";
import TermModal from "@components/organisms/TermModal";

const AccountFormPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <SignWindow
        title="계좌 등록"
        subTitle="정산 받을 계좌를 입력해주세요"
        buttonProps={{
          isActive: isValid,
          disabled: !isValid,
          onClick: handleSubmit((data) => {
            localStorage.setItem("backName", data.backName);
            localStorage.setItem("accountNumber", data.accountNumber);
            setIsOpenModal(true);
          }),
        }}
      >
        <InputField
          name="backName"
          control={control}
          placeholder="은행"
          rules={{
            required: true,
          }}
        />
        <Margin size={10} />
        <InputField
          name="accountNumber"
          control={control}
          placeholder="계좌 번호"
          rules={{
            required: true,
            pattern: /\d/,
          }}
        />
      </SignWindow>
      {isOpenModal && (
        <TermModal
          handleClose={() => setIsOpenModal(false)}
          handleSubmit={() => {
            navigate("/");
          }}
        />
      )}
    </>
  );
};

export default AccountFormPage;

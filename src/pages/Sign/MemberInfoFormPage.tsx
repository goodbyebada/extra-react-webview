import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Margin from "@components/atoms/Margin";
import { InputField } from "@components/atoms/Form";
import DropDownInput from "@components/mocules/DropDownInput";
import SignWindow from "@components/mocules/SignWindow";
// import DatePicker from "@components/mocules/DatePicker";

const MemberInfoFormPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm();

  const navigate = useNavigate();

  return (
    <SignWindow
      title="보조출연자 정보"
      subTitle="보조출연을 위해 필요한 부가정보를 입력해주세요"
      buttonProps={{
        isActive: isValid,
        disabled: !isValid,
        onClick: handleSubmit((data) => {
          localStorage.setItem("sex", data.sex);
          localStorage.setItem("birthday", data.birthday);
          localStorage.setItem("address", data.address);
          localStorage.setItem("height", data.height);
          localStorage.setItem("weight", data.weight);
          navigate("/tattoo-form");
        }),
      }}
    >
      {/* <DatePicker
          name="birthday"
          control={control}
          placeholder="생일"
          setValue={setValue}
          startYear={new Date(Date.now()).getFullYear() - 100}
          endYear={new Date(Date.now()).getFullYear()}
        /> */}
      <InputField
        name="birthday"
        control={control}
        placeholder="생일 (20010101)"
        rules={{
          required: true,
          pattern: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/,
        }}
      />
      <Margin size={10} />
      <DropDownInput
        name="sex"
        placeholder="성별"
        control={control}
        items={["남자", "여자"]}
        setValue={setValue}
      />
      <Margin size={10} />
      <InputField
        name="address"
        control={control}
        placeholder="주소"
        rules={{
          required: true,
        }}
      />
      <Margin size={10} />
      <InputField
        name="height"
        control={control}
        placeholder="키"
        rules={{
          required: true,
          pattern: /^[1-9][0-9]{2}(\.[0-9]{1,2})*$/,
        }}
      />
      <Margin size={10} />
      <InputField
        name="weight"
        control={control}
        placeholder="몸무게"
        rules={{
          required: true,
          pattern: /^[1-9][0-9](\.[0-9]{1,2})?$/,
        }}
      />
    </SignWindow>
  );
};

export default MemberInfoFormPage;

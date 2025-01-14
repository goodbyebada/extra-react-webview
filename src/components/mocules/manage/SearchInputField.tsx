import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { BACKGROUND_COLORS, FONT_COLORS } from "@/styled/colors";

interface SearchInputFieldProps {
  value: string;
  setValue: (value: string) => void;
}

const InputWrapper = styled.div`
  width: 190px;
  height: 35px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 9px;
  background: ${BACKGROUND_COLORS.card};
`;

const Input = styled.input`
  outline: none;
  color: ${FONT_COLORS.white};
  font-size: 13px;
  width: 100%;
  border: none;
  background: none;
`;

const SearchInputField = ({ value, setValue }: SearchInputFieldProps) => {
  return (
    <InputWrapper>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <CiSearch />
    </InputWrapper>
  );
};

export default SearchInputField;

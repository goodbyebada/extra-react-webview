import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ClothesMemberItem from "@components/mocules/company/ClothesMemberItem";
import { dummyUserClothes } from "@api/dummyData";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import BackHeader from "@components/custom/BackHeader";

type ClothesItem = {
  id: number;
  src: string;
  description: string;
};

/**
 * CompanyClothesMemberList : 업체 - 사용자 의상관리
 */

const CompanyClothesMemberList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = (userId: string, clothes: ClothesItem[]) => {
    navigate("/company/clothes-approval", {
      state: { userId, clothes },
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredItems = dummyUserClothes.filter((item) =>
    item.name.toLowerCase().includes(searchQuery),
  );

  return (
    <>
      <BackHeader onBack={() => navigate(-1)} title="의상 관리" />
      <ClothesMemberList>
        <InputContainer>
          <Input
            placeholder="사용자 검색"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IoSearch size={24} style={{ marginLeft: "10px" }} />
        </InputContainer>
        {filteredItems.map((item) => {
          return (
            <ClothesMemberItem
              key={item.userId}
              userId={item.userId}
              name={item.name}
              imageUrl={item.imageUrl}
              clothesNum={item.clothesNum}
              onClick={() => handleClick(item.userId, item.clothes)}
            />
          );
        })}
      </ClothesMemberList>
    </>
  );
};

export default CompanyClothesMemberList;

const ClothesMemberList = styled.div`
  width: 100%;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #302e34;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  font-size: 1rem;
  color: #fff;
  background-color: transparent;
  border: none;
  flex-grow: 1;
  font-weight: 500;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #d9d9d9;
  }
`;

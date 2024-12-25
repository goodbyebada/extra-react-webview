import { useEffect, useState } from "react";

import { Container, Window } from "@components/atoms/Container";
import { ClothesConfirmCardItem } from "@components/mocules/manage/CardItem";
import ScrollingList from "@components/mocules/ScrollingList";
import Margin from "@components/atoms/Margin";
import SearchInputField from "@components/mocules/manage/SearchInputField";
import Text from "@components/atoms/Text";

interface ClothesConfirmStatusItem {
  name: string;
  roles: string;
  status: boolean;
}

const dummyClothesConfirmStatusList = [
  {
    name: "이름1",
    roles: "역할1",
    status: true,
  },
  {
    name: "이름2",
    roles: "역할1",
    status: false,
  },
  {
    name: "이름3",
    roles: "역할1",
    status: true,
  },
  {
    name: "이름4",
    roles: "역할2",
    status: true,
  },
  {
    name: "이름5",
    roles: "역할2",
    status: false,
  },
  {
    name: "이름6",
    roles: "역할2",
    status: true,
  },
  {
    name: "이름7",
    roles: "역할3",
    status: true,
  },
  {
    name: "이름8",
    roles: "역할3",
    status: true,
  },
  {
    name: "이름9",
    roles: "역할3",
    status: true,
  },
];

const ClothesConfirmStatusListPage = () => {
  const [clothesConfirmStatusList, setClothesConfirmStatusList] = useState<
    ClothesConfirmStatusItem[]
  >([]);
  const [searchKeyList, setSearchKeyList] = useState<string[]>([]);

  useEffect(() => {
    const sortedList = [...dummyClothesConfirmStatusList].sort((a, b) =>
      a.roles.localeCompare(b.roles),
    );

    setClothesConfirmStatusList(sortedList);
  }, []);

  const setSearchKey = (index: number) => {
    return (value: string) => {
      const newSearchKeyList = [...searchKeyList];
      newSearchKeyList[index] = value;
      setSearchKeyList(newSearchKeyList);
    };
  };

  let currentRoleIndex = -1;
  let lastRole = "";

  return (
    <Window paddingHorizontal={33}>
      <ScrollingList>
        {clothesConfirmStatusList.map((v, i) => {
          let roleHeader = null;

          if (v.roles !== lastRole) {
            currentRoleIndex += 1;
            lastRole = v.roles;

            roleHeader = (
              <li key={`header-${i}`}>
                <Margin size={30} />
                <Container
                  flexDirection="row"
                  justifyContent="space-between"
                  paddingHorizontal={10}
                >
                  <Text size={20} weight={900}>
                    {currentRoleIndex + 1}. {v.roles}
                  </Text>
                  <SearchInputField
                    value={searchKeyList[currentRoleIndex]}
                    setValue={setSearchKey(currentRoleIndex)}
                  />
                </Container>
                <Margin size={20} />
              </li>
            );
          }

          return (
            <>
              {roleHeader}
              <li key={`item-${i}`}>
                <ClothesConfirmCardItem
                  name={`${v.name}`}
                  status={v.status}
                  url="/"
                />
                <Margin size={7} />
              </li>
            </>
          );
        })}
      </ScrollingList>
    </Window>
  );
};

export default ClothesConfirmStatusListPage;

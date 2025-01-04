import { useEffect, useState } from "react";

import Container from "@components/atoms/Container";
import { ClothesConfirmCardItem } from "@components/mocules/manage/CardItem";
import ScrollingList from "@components/mocules/ScrollingList";
import Margin from "@components/atoms/Margin";
import SearchInputField from "@components/mocules/manage/SearchInputField";
import Text from "@components/atoms/Text";
import MainWindow from "@components/mocules/MainWindow";

interface ClothesConfirmStatusItem {
  name: string;
  status: boolean;
}

interface ClothesConfirmStatusList {
  [key: string]: ClothesConfirmStatusItem[];
}

const dummyClothesConfirmStatusList: ClothesConfirmStatusList = {
  역할1: [
    { name: "이름1", status: true },
    { name: "이름2", status: false },
    { name: "이름3", status: true },
  ],
  역할2: [
    { name: "이름4", status: true },
    { name: "이름5", status: false },
    { name: "이름6", status: true },
  ],
  역할3: [
    { name: "이름7", status: true },
    { name: "이름8", status: true },
    { name: "이름9", status: true },
  ],
};

const ClothesConfirmStatusListPage = () => {
  const [clothesConfirmStatusList, setClothesConfirmStatusList] =
    useState<ClothesConfirmStatusList>({});
  const [searchKeyList, setSearchKeyList] = useState<{ [key: string]: string }>(
    {},
  );

  useEffect(() => {
    setClothesConfirmStatusList(dummyClothesConfirmStatusList);
  }, []);

  const setFilterList = (role: string, searchKey: string) => {
    const newClothesConfirmStatusList = { ...dummyClothesConfirmStatusList };
    newClothesConfirmStatusList[role] = newClothesConfirmStatusList[
      role
    ].filter((actor: ClothesConfirmStatusItem) =>
      actor.name.includes(searchKey),
    );
    setClothesConfirmStatusList(newClothesConfirmStatusList);
  };

  const setSearchKey = (role: string) => {
    return (value: string) => {
      const newSearchKeyList = { ...searchKeyList };
      newSearchKeyList[role] = value;
      setSearchKeyList(newSearchKeyList);
      setFilterList(role, value);
    };
  };

  return (
    <MainWindow>
      <ScrollingList>
        {Object.entries(clothesConfirmStatusList).map(
          ([role, items], roleIndex) => (
            <li key={`group-${roleIndex}`}>
              <Margin size={30} />
              <Container
                flexDirection="row"
                justifyContent="space-between"
                paddingHorizontal={10}
              >
                <Text size={20} weight={900}>
                  {roleIndex + 1}. {role}
                </Text>
                <SearchInputField
                  value={searchKeyList[role] || ""}
                  setValue={setSearchKey(role)}
                />
              </Container>
              <Margin size={20} />
              {items.map((item, itemIndex) => (
                <li key={`item-${roleIndex}-${itemIndex}`}>
                  <ClothesConfirmCardItem
                    name={item.name}
                    status={item.status}
                    url="/"
                  />
                  <Margin size={7} />
                </li>
              ))}
            </li>
          ),
        )}
      </ScrollingList>
    </MainWindow>
  );
};

export default ClothesConfirmStatusListPage;

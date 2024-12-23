import { useEffect, useState } from "react";

import { Container, Window } from "@components/atoms/Container";
import { ActorCardItem } from "@components/mocules/manage/CardItem";
import ScrollingList from "@components/mocules/ScrollingList";
import Margin from "@components/atoms/Margin";
import Filter from "@components/mocules/manage/Filter";
import SearchInputField from "@components/mocules/manage/SearchInputField";

interface ActorItem {
  name: string;
  roles: string;
  status: boolean;
  sex: boolean;
  birthday: string;
}

const dummyActorList = [
  {
    name: "이름1",
    roles: "역할1",
    status: true,
    sex: true,
    birthday: "1995-03-25",
  },
  {
    name: "이름2",
    roles: "역할1",
    status: false,
    sex: true,
    birthday: "1988-06-12",
  },
  {
    name: "이름3",
    roles: "역할1",
    status: true,
    sex: false,
    birthday: "2000-11-09",
  },
  {
    name: "이름4",
    roles: "역할2",
    status: true,
    sex: false,
    birthday: "1992-01-14",
  },
  {
    name: "이름5",
    roles: "역할2",
    status: false,
    sex: true,
    birthday: "1985-07-30",
  },
  {
    name: "이름6",
    roles: "역할2",
    status: true,
    sex: false,
    birthday: "1998-05-17",
  },
  {
    name: "이름7",
    roles: "역할3",
    status: true,
    sex: true,
    birthday: "1993-08-21",
  },
  {
    name: "이름8",
    roles: "역할3",
    status: true,
    sex: true,
    birthday: "1990-12-03",
  },
  {
    name: "이름9",
    roles: "역할3",
    status: true,
    sex: false,
    birthday: "1989-04-16",
  },
];

const ActorListPage = () => {
  const [actorList, setActorList] = useState<ActorItem[]>([]);
  const [searchKey, setSearchKey] = useState("");
  const [filterIndex, setFilterIndex] = useState(-1);

  useEffect(() => {
    let filteredList = [...dummyActorList];

    if (searchKey) {
      filteredList = filteredList.filter((actor) =>
        actor.name.includes(searchKey),
      );
    }

    switch (filterIndex) {
      case 0:
        filteredList.sort((a, b) => a.roles.localeCompare(b.roles));
        break;
      case 1:
        filteredList.sort((a, b) => Number(a.sex) - Number(b.sex));
        break;
      case 2:
        filteredList.sort(
          (a, b) =>
            new Date(b.birthday).getTime() - new Date(a.birthday).getTime(),
        );
        break;
      default:
        break;
    }

    setActorList(filteredList);
  }, [filterIndex, searchKey]);

  return (
    <Window paddingHorizontal={33}>
      <Container flex={10}>
        <Container flexDirection="row" justifyContent="space-between">
          <Filter
            items={["역할별", "성별", "나이별"]}
            setValue={setFilterIndex}
          />
          <SearchInputField value={searchKey} setValue={setSearchKey} />
        </Container>
      </Container>
      <Margin size={23} />
      <ScrollingList>
        {actorList.map((v, i) => (
          <li key={i}>
            <ActorCardItem
              name={`${v.name}/${v.roles}`}
              status={v.status}
              url="/"
            />
            <Margin size={15} />
          </li>
        ))}
      </ScrollingList>
    </Window>
  );
};

export default ActorListPage;

import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Modal from "@components/atoms/Modal";
import { MainButton } from "@components/atoms/Button";
import Text from "@components/atoms/Text";
import { IoIosSearch } from "react-icons/io";
import PlaceItem from "@components/mocules/PlaceItem";
import useKakaoPlaceSearch from "../../customHook/useKakaoPlaceSearch";
import { Place } from "@type/shared";

interface CompanyDateTimePlaceModalProps {
  onSubmit: (dates: string[], time: string, place: Place) => void;
  closeModal: () => void;
  isVisible: boolean;
}

export type FormType = {
  dates: string[];
  time: string;
  place: string;
};

/**
 * CompanyDateTimePlaceModal : 공고 등록 - 날짜,시간,장소 추가 모달
 * onSubmit: date, time, place
 * isVisible: boolean
 * closeModal: () => void
 */

function CompanyDateTimePlaceModal({
  onSubmit,
  closeModal,
  isVisible,
}: CompanyDateTimePlaceModalProps) {
  const [formState, setFormState] = useState<FormType>({
    dates: [],
    time: "",
    place: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPlaceList, setShowPlaceList] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const { filteredPosts, searchKakaoPlaces, error } = useKakaoPlaceSearch();

  useEffect(() => {
    setIsFormValid(
      formState.dates.length > 0 && formState.time !== "" && !!selectedPlace,
    );
  }, [formState, selectedPlace]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setFormState((prevState) => {
      const newDates = prevState.dates.includes(selectedDate)
        ? prevState.dates.filter((date) => date !== selectedDate) // 선택 해제
        : [...prevState.dates, selectedDate]; // 날짜 추가
      return { ...prevState, dates: newDates };
    });
  };

  const handleDateRemove = (dateToRemove: string) => {
    setFormState((prevState) => ({
      ...prevState,
      dates: prevState.dates.filter((date) => date !== dateToRemove),
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({ ...prevState, time: e.target.value }));
  };

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({ ...prevState, place: e.target.value }));
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
  };

  const handleSubmit = () => {
    if (isFormValid && selectedPlace) {
      onSubmit(formState.dates, formState.time, selectedPlace);
      closeModal();
    }
  };

  const handleSearchClick = () => {
    searchKakaoPlaces(formState.place);
    setShowPlaceList(true);
  };

  return (
    <Modal isVisible={isVisible} onClose={closeModal}>
      <RoleBoxWrapper>
        <Row>
          <Text size={20} weight={900} color="#fff">
            날짜 :
          </Text>
          <Input type="date" onChange={handleDateChange} placeholder="날짜" />
        </Row>

        {/* 선택한 날짜 목록 표시 */}
        <SelectedDates>
          {formState.dates.map((date) => (
            <SelectedDate key={date} onClick={() => handleDateRemove(date)}>
              {date} ❌
            </SelectedDate>
          ))}
        </SelectedDates>

        <Row>
          <Text size={20} weight={900} color="#fff">
            시간 :
          </Text>
          <Input
            name="time"
            type="time"
            value={formState.time}
            onChange={handleTimeChange}
            placeholder="시간"
          />
        </Row>

        <Row>
          <Text size={20} weight={900} color="#fff">
            장소 :
          </Text>
          <Input
            name="place"
            value={formState.place}
            onChange={handlePlaceChange}
            placeholder="장소"
          />
          <IoIosSearch size={24} onClick={handleSearchClick} />
        </Row>

        {showPlaceList && (
          <PlaceList>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((place) => (
                <PlaceItem
                  key={place.id}
                  placeName={place.placeName}
                  roadAddress={place.roadAddress}
                  jibunAddress={place.jibunAddress}
                  isSelected={selectedPlace?.id === place.id}
                  onSelect={() => handlePlaceSelect(place)}
                />
              ))
            ) : (
              <Text size={16} color="#fff">
                {error || "검색 결과가 없습니다."}
              </Text>
            )}
          </PlaceList>
        )}

        <MainButton isActive={isFormValid} onClick={handleSubmit}>
          확인
        </MainButton>
      </RoleBoxWrapper>
    </Modal>
  );
}

export default CompanyDateTimePlaceModal;

const RoleBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  background: #333;
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  border: 1px solid #555;
  border-radius: 5px;
  outline: none;
  padding: 5px;
  margin: 0 10px;
`;

const PlaceList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SelectedDates = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const SelectedDate = styled.div`
  background: #444;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
`;

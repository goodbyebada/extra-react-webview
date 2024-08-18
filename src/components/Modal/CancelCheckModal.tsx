import styled from "styled-components";

interface CancelCheckModalProps {
  title: string;
  date: string[];
  onConfirm: () => void;
  onCancel: () => void;
}

// 날짜 문자열 배열에서 가장 가까운 날짜를 찾는 함수 (촬영날짜가 여러날일 경우)
const getClosestDate = (dates: string[]): Date => {
  const today = new Date();
  let closestDate = new Date(dates[0]);

  dates.forEach((dateStr) => {
    const date = new Date(dateStr);
    if (date > today && (date < closestDate || closestDate <= today)) {
      closestDate = date;
    }
  });

  return closestDate;
};

// 디데이를 계산하는 함수
const calculateDday = (calendarList: string[]): string => {
  const today = new Date();
  const target = getClosestDate(calendarList);

  // 시간을 00:00:00으로 설정
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  // 날짜 차이 계산 (밀리초 단위)
  const differenceInTime = target.getTime() - today.getTime();

  // 밀리초를 일수로 변환
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  if (differenceInDays === 0) {
    return "D-day";
  } else if (differenceInDays > 0) {
    return `D-${Math.ceil(differenceInDays)}`;
  } else {
    return "종료";
  }
};

// 날짜를 MM/DD 형식으로 변환하는 함수
const formatDate = (date: Date): string => {
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1 필요
  const day = date.getDate();
  return `${month}/${day}`;
};

// 날짜 배열을 MM/DD - MM/DD 형식으로 변환하는 함수
const formatDateRange = (dates: string[]): string => {
  if (dates.length === 1) {
    return formatDate(new Date(dates[0]));
  } else {
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[dates.length - 1]);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }
};

function CancelCheckModal({
  title,
  date,
  onConfirm,
  onCancel,
}: CancelCheckModalProps) {
  const formattedDate = formatDateRange(date);
  const dDay = calculateDday(date);

  return (
    <ModalContainer>
      <ModalText>
        해당 공고의 지원을 <br /> 취소하시겠어요?
      </ModalText>
      <HomeBox>
        <InfoContainer>
          <TitleTxt>{title}</TitleTxt>
          <DateAndDeadlineContainer>
            <DateTxt>{formattedDate}</DateTxt>
            <DeadlineBox>{dDay}</DeadlineBox>
          </DateAndDeadlineContainer>
        </InfoContainer>
      </HomeBox>
      <ButtonContainer>
        <BtnY onClick={onConfirm}>예</BtnY>
        <BtnN onClick={onCancel}>아니요</BtnN>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default CancelCheckModal;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 345px;
  height: 537px;
  flex-shrink: 0;
  border-radius: 18px;
  z-index: 10;
  background:
    linear-gradient(#000, #000) padding-box,
    linear-gradient(180deg, #666666 0%, #f5c001 100%) border-box;
  border: 4px solid transparent;
`;

const ModalText = styled.div`
  color: #fff;
  text-align: center;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: "dlig" on;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 37px;
  letter-spacing: 0.24px;
  margin-top: 75px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: "dlig" on;
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.2px;
  gap: 11px;
`;

const BtnY = styled.button`
  width: 134px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 18px;
  background: #f5c001;
  color: #000;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnN = styled.button`
  width: 134px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 18px;
  background: #3a3a3a;
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeBox = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  align-items: center;
  border-radius: 20px;
  margin-left: 50px;
  margin-top: 90px;
  margin-bottom: 115px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TitleTxt = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.16px;
  margin-bottom: 5px;
`;

const DateAndDeadlineContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const DateTxt = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.14px;
  margin-right: 10px;
`;

const DeadlineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 18px;
  border-radius: 20px;
  background: #d9d9d9;
  color: #888;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.11px;
`;

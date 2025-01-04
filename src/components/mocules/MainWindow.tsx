import Container, { ContainerProps } from "@components/atoms/Container";
import { HistoryBackButton } from "@components/atoms/Button";
import Window from "./Window";
import Margin from "@components/atoms/Margin";

import styled from "styled-components";
import { FONT_SIZE } from "@/styled/font";
import Text from "@components/atoms/Text";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import { PiListDashesFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { AiFillTool } from "react-icons/ai";
import { BACKGROUND_COLORS, COMMON_COLORS, FONT_COLORS } from "@/styled/colors";

const ICON_SIZE = 40;
const ACTIVE_COLOR = COMMON_COLORS.main;
const INACTIVE_COLOR = FONT_COLORS.gray;
const headerHeight = 155;
const bottomHeight = 160;

const BottomNavigationWrapper = styled.footer`
  width: 100%;
  height: ${bottomHeight}px;
  padding-top: 38px;

  background: ${BACKGROUND_COLORS.navigation};

  justify-self: flex-end;
`;

const IconWrapper = styled.div`
  height: 59px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface NavigationIconProps {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const NavigationIcon = ({
  icon,
  title,
  isActive,
  onClick,
}: NavigationIconProps) => {
  return (
    <IconWrapper onClick={onClick}>
      {icon}
      <Margin size={10} />
      <Text
        size={FONT_SIZE.small}
        weight={900}
        color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
      >
        {title}
      </Text>
    </IconWrapper>
  );
};

const MemberNavigationIconList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    switch (location.pathname.split("/")[2]) {
      case "home":
        setIndex(0);
        break;
      case "scheduler":
        setIndex(1);
        break;
      case "manage":
        setIndex(2);
        break;
      case "profile":
        setIndex(3);
        break;
    }
  }, []);

  return (
    <>
      <NavigationIcon
        icon={
          <AiFillHome
            color={index == 0 ? ACTIVE_COLOR : INACTIVE_COLOR}
            size={ICON_SIZE}
          />
        }
        title="홈"
        isActive={index == 0}
        onClick={() => {
          if (index != 0) {
            setIndex(0);
            navigate("/member/home");
          }
        }}
      />
      <NavigationIcon
        icon={
          <BsFillCalendar2CheckFill
            color={index == 1 ? ACTIVE_COLOR : INACTIVE_COLOR}
            size={ICON_SIZE}
          />
        }
        title="스케줄표"
        isActive={index == 1}
        onClick={() => {
          if (index != 1) {
            setIndex(1);
            navigate("/member/scheduler");
          }
        }}
      />
      <NavigationIcon
        icon={
          <PiListDashesFill
            color={index == 2 ? ACTIVE_COLOR : INACTIVE_COLOR}
            size={ICON_SIZE}
          />
        }
        title="촬영관리"
        isActive={index == 2}
        onClick={() => {
          if (index != 2) {
            setIndex(2);
            navigate("/member/manage");
          }
        }}
      />
      <NavigationIcon
        icon={
          <FaUserCircle
            color={index == 3 ? ACTIVE_COLOR : INACTIVE_COLOR}
            size={ICON_SIZE}
          />
        }
        title="마이페이지"
        isActive={index == 3}
        onClick={() => {
          if (index != 3) {
            setIndex(3);
            navigate("/");
          }
        }}
      />
    </>
  );
};

const CompanyNavigationIconList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    switch (location.pathname.split("/")[2]) {
      case "notice":
        setIndex(0);
        break;
      case "manage":
        setIndex(1);
        break;
      case "home":
        setIndex(2);
        break;
      case "profile":
        setIndex(3);
        break;
    }
  }, []);

  return (
    <>
      <NavigationIcon
        icon={
          <IoDocumentText
            color={index == 0 ? ACTIVE_COLOR : INACTIVE_COLOR}
            size={ICON_SIZE}
          />
        }
        title="공고"
        isActive={index == 0}
        onClick={() => {
          if (index != 0) {
            setIndex(0);
            navigate("/company/notice");
          }
        }}
      />
      <NavigationIcon
        icon={
          <AiFillTool
            color={index == 1 ? ACTIVE_COLOR : INACTIVE_COLOR}
            size={ICON_SIZE}
          />
        }
        title="현장관리"
        isActive={index == 1}
        onClick={() => {
          if (index != 1) {
            setIndex(1);
            navigate("/company/manage");
          }
        }}
      />
      <NavigationIcon
        icon={
          <AiFillHome
            color={index == 2 ? ACTIVE_COLOR : INACTIVE_COLOR}
            size={ICON_SIZE}
          />
        }
        title="홈"
        isActive={index == 2}
        onClick={() => {
          if (index != 2) {
            setIndex(2);
            navigate("/company/home");
          }
        }}
      />
      <NavigationIcon
        icon={
          <FaUserCircle
            color={index == 3 ? ACTIVE_COLOR : INACTIVE_COLOR}
            size={ICON_SIZE}
          />
        }
        title="마이페이지"
        isActive={index == 3}
        onClick={() => {
          if (index != 3) {
            setIndex(3);
            navigate("/company/profile");
          }
        }}
      />
    </>
  );
};

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <BottomNavigationWrapper>
      <Container
        flexDirection="row"
        paddingHorizontal={28}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {location.pathname.split("/")[1] == "member" ? (
          <MemberNavigationIconList />
        ) : (
          <CompanyNavigationIconList />
        )}
      </Container>
    </BottomNavigationWrapper>
  );
};

interface MainWindowProps extends ContainerProps {
  headerShown?: boolean;
  title?: string;
  bottomNavigationShown?: boolean;
}

const MainWindow = ({
  children,
  headerShown = true,
  title = "",
  bottomNavigationShown = true,
  ...props
}: MainWindowProps) => {
  return (
    <Window>
      {headerShown && (
        <Container
          style={{ height: `${headerHeight}px` }}
          background={BACKGROUND_COLORS.navigation}
          paddingHorizontal={40}
        >
          <Margin size={100} />
          <Container flexDirection="row" justifyContent="space-between">
            <HistoryBackButton />
            <Text size={24} color={FONT_COLORS.white} weight={900}>
              {title}
            </Text>
            <Margin size={1} />
          </Container>
        </Container>
      )}
      <Container
        paddingHorizontal={34}
        paddingVertical={20}
        style={{
          height:
            headerShown && bottomNavigationShown
              ? `calc(100% - ${headerHeight}px - ${bottomHeight}px)`
              : headerShown
                ? `calc(100% - ${headerHeight}px)`
                : bottomNavigationShown
                  ? `calc(100% - ${bottomHeight}px)`
                  : "100%",
        }}
        {...props}
      >
        {children}
      </Container>
      {bottomNavigationShown && <BottomNavigation />}
    </Window>
  );
};

export default MainWindow;

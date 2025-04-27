import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, Suspense } from "react";
import Loading from "@components/Loading";

import AddNotice from "./pages/AddNotice";
import ShowApplicant from "./pages/ShowApplicant";

import MemberHome from "@pages/Member/MemberHome";
import ExtraCastingBoard from "@pages/Member/ExtraCastingBoard";
import DateSelectedNoticeList from "@pages/Member/DateSelectedNoticeList";
import CompanyHome from "@pages/CompanyHome";
import ExtraShootManagePage from "@pages/Member/ExtraShootManagePage";
import ApplicantDetail from "@pages/ApplicantDetail";
import NotFound from "@pages/Error/NotFound";
import DateSelectedNoticeListForCom from "@pages/DateSelectedNoticeListForCom";
import TempEvaluation from "@pages/TempEvaluation";
import CompanyClothesMemberList from "@pages/CompanyClothesMemberList";
import MemberClothesConfirm from "@pages/MemberClothesConfirm";
import CompanyClothesApproval from "@pages/CompanyClothesApproval";
import CompanyClothesConfirm from "@pages/CompanyClothesConfirm";
import MemberClothesComment from "@pages/MemberClothesComment";
import KakaoMap from "@pages/KakaoMap";

import ThemePreviewPage from "@pages/ThemePreview";
import LoginPage from "@pages/Sign/LoginPage";
import MainFormPage from "@pages/Sign/MainFormPage";
import AuthenticationPage from "@pages/Sign/AuthenticationPage";
import SelectUserTypePage from "@pages/Sign/SelectUserTypePage";
import MemberInfoFormPage from "@pages/Sign/MemberInfoFormPage";
import AccountFormPage from "@pages/Sign/AccountFormPage";
import TattooFormPage from "@pages/Sign/TattooFormPage";
import TattooSelectFormPage from "@pages/Sign/TattooSelectFormPage";
import CompanyInfoFormPage from "@pages/Sign/CompanyInfoFormPage";
import CompanyShootManageDetailPage from "@pages/Manage/CompanyShootManageDetailPage";
import ActorListPage from "@pages/Manage/ActorListPage";
import ClothesConfirmStatusListPage from "@pages/Manage/ClothesConfirmStatusListPage";
import CameraPage from "@pages/Manage/CameraPage";
import MemberShootManageDetailPage from "@pages/Manage/MemberShootManageDetailPage";
import AttendancePage from "@pages/Manage/AttendancePage";
import ClockInPage from "@pages/Manage/ClockInPage";
import ClockOutPage from "@pages/Manage/ClockOutPage";
import MemberProfilePage from "@pages/MemberProfilePage";
import MemberSettingPage from "@pages/MemberSettingPage";
import CompanyProfilePage from "@pages/CompanyProfilePage";
import CompanySettingPage from "@pages/CompanySettingPage";
import PostOverviewPage from "@pages/PostOverviewPage";
import RecruitmentStatusPage from "@pages/RecruitmentStatusPage";

import handleAllowNotification from "@utills/pushNotification/notificationPermission";
import ManageOverViewPage from "@pages/ManageOverViewPage";
import SchedulerPage from "@pages/Member/SchedulerPage";

import { lazy } from "react";
const ChatRoomPage = lazy(() => import("@pages/Chat/ChatRoomPage"));
const ChatListForAdmin = lazy(() => import("@pages/Chat/ChatListForAdmin"));
const ChatPreviewForUser = lazy(() => import("@pages/Chat/ChatPreviewForUser"));
const UploadPDFPage = lazy(() => import("@pages/Manage/UploadPDF"));
const SignaturePage = lazy(() => import("@pages/Manage/SignaturePage"));

function App() {
  useEffect(() => {
    handleAllowNotification();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading loading={true} />}>
          <Routes>
            {/* sign process */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/main-form" element={<MainFormPage />} />
            <Route path="/auth" element={<AuthenticationPage />} />
            <Route path="/user-type" element={<SelectUserTypePage />} />
            <Route path="/member-info-form" element={<MemberInfoFormPage />} />
            <Route path="/tattoo-form" element={<TattooFormPage />} />
            <Route
              path="/tattoo-select-form"
              element={<TattooSelectFormPage />}
            />
            <Route
              path="/company-info-form"
              element={<CompanyInfoFormPage />}
            />
            <Route path="/account-form" element={<AccountFormPage />} />

            {/* member */}
            {/* member home */}
            <Route path="/member/home" element={<MemberHome />} />
            <Route
              path="/member/home/extra-casting-board/:jobPostId"
              element={<ExtraCastingBoard />}
            />
            <Route
              path="/member/home/date-selected-notice-list"
              element={<DateSelectedNoticeList />}
            />
            {/* scheduler */}
            <Route path="/member/scheduler" element={<SchedulerPage />} />
            {/* member manage */}
            <Route path="/member/manage" element={<ExtraShootManagePage />} />
            <Route
              path="/member/manage/detail"
              element={<MemberShootManageDetailPage />}
            />
            {/* member profile */}
            <Route path="/member/profile" element={<MemberProfilePage />} />
            <Route
              path="/member/profile/setting"
              element={<MemberSettingPage />}
            />

            {/* company */}
            {/* home */}
            <Route path="/company/home" element={<CompanyHome />} />
            <Route
              path="/company/home/date-selected-notice-list"
              element={<DateSelectedNoticeListForCom />}
            />

            {/* company manage */}
            <Route path="/company/manage" element={<ManageOverViewPage />} />
            <Route
              path="/company/manage/detail"
              element={<CompanyShootManageDetailPage />}
            />
            <Route path="/company/manage/actor" element={<ActorListPage />} />

            {/* TODO 의상연결 */}
            <Route
              path="/company/manage/clothes-confirm"
              element={<ClothesConfirmStatusListPage />}
            />

            <Route path="/company/manage/camera" element={<CameraPage />} />
            <Route
              path="/company/manage/attendance"
              element={<AttendancePage />}
            />
            <Route path="/company/manage/clock-in" element={<ClockInPage />} />
            <Route
              path="/company/manage/clock-out"
              element={<ClockOutPage />}
            />
            {/* company notice */}

            {/* 업체 측 공고 리스트 페이지 화면 */}
            <Route path="/company/notice" element={<PostOverviewPage />} />

            <Route
              path="/company/notice/post-status/:id"
              element={<RecruitmentStatusPage />}
            />

            <Route path="/company/profile" element={<CompanyProfilePage />} />
            <Route
              path="/company/profile/setting"
              element={<CompanySettingPage />}
            />

            <Route path="/applicants/:id" element={<ShowApplicant />} />
            <Route
              path="/applicants/:id/detail"
              element={<ApplicantDetail />}
            />

            <Route
              path="/detail/:jobPostId/applicants"
              element={<ShowApplicant />}
            />
            <Route path="/add-notice" element={<AddNotice />} />
            <Route path="/temp/:id" element={<TempEvaluation />} />
            <Route
              path="/member/clothes-confirm"
              element={<MemberClothesConfirm />}
            />
            <Route
              path="/member/clothes-comment"
              element={<MemberClothesComment />}
            />
            <Route
              path="/company/clothes-member"
              element={<CompanyClothesMemberList />}
            />
            <Route
              path="/company/clothes-approval"
              element={<CompanyClothesApproval />}
            />
            <Route
              path="/company/clothes-confirm"
              element={<CompanyClothesConfirm />}
            />
            <Route path="/member/kakaomap" element={<KakaoMap />} />

            <Route path="/*" element={<NotFound />} />

            {/* signature */}
            <Route
              path="/member/manage/signature"
              element={<SignaturePage />}
            />
            <Route
              path="/company/manage/upload-pdf"
              element={<UploadPDFPage />}
            />

            {/* for testing theme */}
            <Route path="/theme-preview" element={<ThemePreviewPage />} />

            {/* 관리자 계정으로 채팅 들어가기 */}
            <Route path="/chatRoom" element={<ChatListForAdmin />} />

            {/* 테스트 위해 유저 계정으로 들어가기 */}
            <Route path="/chat-preview/user" element={<ChatPreviewForUser />} />

            <Route path="/chatRoom/channel/:id" element={<ChatRoomPage />} />

            <Route path="/chatRoom/channel/-1" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;

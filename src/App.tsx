import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Suspense, lazy } from "react";

const AddNotice = lazy(() => import("./pages/AddNotice"));
const ShowApplicant = lazy(() => import("./pages/ShowApplicant"));

const MemberHome = lazy(() => import("@pages/Member/MemberHome"));
const ExtraCastingBoard = lazy(() => import("@pages/Member/ExtraCastingBoard"));
const DateSelectedNoticeList = lazy(
  () => import("@pages/Member/DateSelectedNoticeList"),
);
const CompanyHome = lazy(() => import("@pages/CompanyHome"));
const ExtraShootManagePage = lazy(
  () => import("@pages/Member/ExtraShootManagePage"),
);
const ApplicantDetail = lazy(() => import("@pages/ApplicantDetail"));
const NotFound = lazy(() => import("@pages/Error/NotFound"));
const DateSelectedNoticeListForCom = lazy(
  () => import("@pages/DateSelectedNoticeListForCom"),
);
const TempEvaluation = lazy(() => import("@pages/TempEvaluation"));
const CompanyClothesMemberList = lazy(
  () => import("@pages/CompanyClothesMemberList"),
);
const MemberClothesConfirm = lazy(() => import("@pages/MemberClothesConfirm"));
const CompanyClothesApproval = lazy(
  () => import("@pages/CompanyClothesApproval"),
);
const CompanyClothesConfirm = lazy(
  () => import("@pages/CompanyClothesConfirm"),
);
const MemberClothesComment = lazy(() => import("@pages/MemberClothesComment"));
const KakaoMap = lazy(() => import("@pages/KakaoMap"));

const ThemePreviewPage = lazy(() => import("@pages/ThemePreview"));
const LoginPage = lazy(() => import("@pages/Sign/LoginPage"));
const MainFormPage = lazy(() => import("@pages/Sign/MainFormPage"));
const AuthenticationPage = lazy(() => import("@pages/Sign/AuthenticationPage"));
const SelectUserTypePage = lazy(() => import("@pages/Sign/SelectUserTypePage"));
const MemberInfoFormPage = lazy(() => import("@pages/Sign/MemberInfoFormPage"));
const AccountFormPage = lazy(() => import("@pages/Sign/AccountFormPage"));
const TattooFormPage = lazy(() => import("@pages/Sign/TattooFormPage"));
const TattooSelectFormPage = lazy(
  () => import("@pages/Sign/TattooSelectFormPage"),
);
const CompanyInfoFormPage = lazy(
  () => import("@pages/Sign/CompanyInfoFormPage"),
);
const CompanyShootManageDetailPage = lazy(
  () => import("@pages/Manage/CompanyShootManageDetailPage"),
);
const ActorListPage = lazy(() => import("@pages/Manage/ActorListPage"));
const ClothesConfirmStatusListPage = lazy(
  () => import("@pages/Manage/ClothesConfirmStatusListPage"),
);
const CameraPage = lazy(() => import("@pages/Manage/CameraPage"));
const MemberShootManageDetailPage = lazy(
  () => import("@pages/Manage/MemberShootManageDetailPage"),
);
const AttendancePage = lazy(() => import("@pages/Manage/AttendancePage"));
const ClockInPage = lazy(() => import("@pages/Manage/ClockInPage"));
const ClockOutPage = lazy(() => import("@pages/Manage/ClockOutPage"));
const MemberProfilePage = lazy(() => import("@pages/MemberProfilePage"));
const MemberSettingPage = lazy(() => import("@pages/MemberSettingPage"));
const CompanyProfilePage = lazy(() => import("@pages/CompanyProfilePage"));
const CompanySettingPage = lazy(() => import("@pages/CompanySettingPage"));
const PostOverviewPage = lazy(() => import("@pages/PostOverviewPage"));
const RecruitmentStatusPage = lazy(
  () => import("@pages/RecruitmentStatusPage"),
);
const ManageOverViewPage = lazy(() => import("@pages/ManageOverViewPage"));
const ChatRoomPage = lazy(() => import("@pages/Chat/ChatRoomPage"));
const ChatListForAdmin = lazy(() => import("@pages/Chat/ChatListForAdmin"));
const ChatPreviewForUser = lazy(() => import("@pages/Chat/ChatPreviewForUser"));
const SchedulerPage = lazy(() => import("@pages/Member/SchedulerPage"));
const UploadPDFPage = lazy(() => import("@pages/Manage/UploadPDF"));
const SignaturePage = lazy(() => import("@pages/Manage/SignaturePage"));

import { useEffect } from "react";
import handleAllowNotification from "@utills/pushNotification/notificationPermission";
import Loading from "@components/Loading";

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

import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// SNPE 운동영상으로 즉시 redirect — SNPE 기본 1번 동작
// (운동영상 전용 페이지 없음, 외부 영상으로 직접 연결)
function YoutubeRedirect() {
  useEffect(() => {
    window.location.replace('https://www.youtube.com/watch?v=J4ewoypgqP4&t=778s')
  }, [])
  return null
}
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/about/About'
import Philosophy from './pages/about/Philosophy'
import History from './pages/about/History'
import Certification from './pages/about/Certification'
import BrandAssets from './pages/about/BrandAssets'
import CompanyClass from './pages/activity/CompanyClass'
import CultureCenter from './pages/activity/CultureCenter'
import Training from './pages/activity/Training'
import Degree from './pages/activity/Degree'
import Level1 from './pages/activity/Level1'
import Level2 from './pages/activity/Level2'
import Level3 from './pages/activity/Level3'
import Master from './pages/activity/Master'
import ResearchRedirect from './pages/activity/Research'
import Research from './pages/about/Research'
import BeginnerGuide from './pages/exercise/BeginnerGuide'
import Programs from './pages/exercise/Programs'
import Assessment from './pages/exercise/Assessment'
import SnpeApp from './pages/exercise/SnpeApp'
import BaseExercise from './pages/exercise/BaseExercise'
import ExperienceCase from './pages/exercise/ExperienceCase'
import Notice from './pages/news/Notice'
import Activity from './pages/news/Activity'
import SearchCenter from './pages/support/SearchCenter'
import Studio from './pages/support/Studio'
import CertTeacher from './pages/support/CertTeacher'
import Franchise from './pages/support/Franchise'
import Faq from './pages/support/Faq'
import CustomerInquiry from './pages/support/CustomerInquiry'
import Online from './pages/support/Online'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBranches from './pages/admin/AdminBranches'
import AdminCenters from './pages/admin/AdminCenters'
import AdminStudios from './pages/admin/AdminStudios'
import AdminNotices from './pages/admin/AdminNotices'
import AdminActivityFeed from './pages/admin/AdminActivityFeed'
import AdminCertTeachers from './pages/admin/AdminCertTeachers'
import AdminExperienceCases from './pages/admin/AdminExperienceCases'
import AdminResearch from './pages/admin/AdminResearch'
import AdminFaqs from './pages/admin/AdminFaqs'
import AdminDegreePage from './pages/admin/AdminDegreePage'
import AdminLevelPage from './pages/admin/AdminLevelPage'
import AdminInquiries from './pages/admin/AdminInquiries'

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="philosophy" element={<Philosophy />} />
        <Route path="history" element={<History />} />
        <Route path="brand-assets" element={<BrandAssets />} />
        {/* 레거시 호환 - /bi, /intellectual-property는 브랜드자산으로 통합 */}
        <Route path="bi" element={<Navigate to="/brand-assets" replace />} />
        <Route path="intellectual-property" element={<Navigate to="/brand-assets?tab=ip" replace />} />
        <Route path="certification" element={<Certification />} />
        <Route path="companyclass" element={<CompanyClass />} />
        <Route path="culturecenter" element={<CultureCenter />} />
        <Route path="training" element={<Training />} />
        <Route path="degree" element={<Degree />} />
        <Route path="level1" element={<Level1 />} />
        <Route path="level2" element={<Level2 />} />
        <Route path="level3" element={<Level3 />} />
        <Route path="master" element={<Master />} />
        <Route path="research" element={<Research />} />
        <Route path="beginnerguide" element={<BeginnerGuide />} />
        <Route path="programs" element={<Programs />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="snpeapp" element={<SnpeApp />} />
        <Route path="baseexercise" element={<BaseExercise />} />
        <Route path="snpevideo" element={<YoutubeRedirect />} />
        <Route path="snpe-video" element={<YoutubeRedirect />} />
        <Route path="experiencecase" element={<ExperienceCase />} />
        {/* 운동경험은 체험사례(SNPE 체험사례)로 통합 — 레거시 경로 리다이렉트 */}
        <Route path="snpe-experience" element={<Navigate to="/experiencecase" replace />} />
        <Route path="notice" element={<Notice />} />
        {/* 언론보도는 활동소식 내 탭으로 통합 — /news 진입 시 자동 이동 */}
        <Route path="news" element={<Navigate to="/activity?tab=press" replace />} />
        <Route path="activity" element={<Activity />} />
        <Route path="search-center" element={<SearchCenter />} />
        <Route path="studio" element={<Studio />} />
        <Route path="certification-teacher" element={<CertTeacher />} />
        <Route path="franchise" element={<Franchise />} />
        <Route path="faq" element={<Faq />} />
        <Route path="customerinquiry" element={<CustomerInquiry />} />
        <Route path="online" element={<Online />} />
        <Route path="login" element={<Navigate to="/admin/login" replace />} />
        <Route path="provision" element={<Navigate to="/" replace />} />
      </Route>

      {/* Admin */}
      <Route path="admin/login" element={<AdminLogin />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="branches" element={<AdminBranches />} />
        <Route path="centers" element={<AdminCenters />} />
        <Route path="studios" element={<AdminStudios />} />
        <Route path="notices" element={<AdminNotices />} />
        {/* 언론보도 + 활동내역 통합 관리 화면 */}
        <Route path="activity-feed" element={<AdminActivityFeed />} />
        {/* 레거시 호환 — 기존 메뉴/북마크 진입 시 통합 화면으로 이동 */}
        <Route path="news" element={<Navigate to="/admin/activity-feed?tab=press" replace />} />
        <Route path="activities" element={<Navigate to="/admin/activity-feed" replace />} />
        <Route path="cert-teachers" element={<AdminCertTeachers />} />
        <Route path="experience-cases" element={<AdminExperienceCases />} />
        <Route path="research" element={<AdminResearch />} />
        <Route path="faqs" element={<AdminFaqs />} />
        <Route path="educations" element={<Navigate to="/admin/level-pages" replace />} />
        <Route path="degree-page" element={<AdminDegreePage />} />
        <Route path="level-pages" element={<AdminLevelPage />} />
        <Route path="inquiries" element={<AdminInquiries />} />
      </Route>
    </Routes>
  )
}

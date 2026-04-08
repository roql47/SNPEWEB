import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/about/About'
import History from './pages/about/History'
import Bi from './pages/about/Bi'
import Certification from './pages/about/Certification'
import CompanyClass from './pages/activity/CompanyClass'
import CultureCenter from './pages/activity/CultureCenter'
import Training from './pages/activity/Training'
import Degree from './pages/activity/Degree'
import Level1 from './pages/activity/Level1'
import Level2 from './pages/activity/Level2'
import Level3 from './pages/activity/Level3'
import Master from './pages/activity/Master'
import ResearchRedirect from './pages/activity/Research'
import IntellectualProperty from './pages/about/IntellectualProperty'
import Research from './pages/about/Research'
import BeginnerGuide from './pages/exercise/BeginnerGuide'
import SnpeApp from './pages/exercise/SnpeApp'
import BaseExercise from './pages/exercise/BaseExercise'
import SnpeVideo from './pages/exercise/SnpeVideo'
import ExperienceCase from './pages/exercise/ExperienceCase'
import Notice from './pages/news/Notice'
import News from './pages/news/News'
import Activity from './pages/news/Activity'
import SearchCenter from './pages/support/SearchCenter'
import Studio from './pages/support/Studio'
import CertTeacher from './pages/support/CertTeacher'
import Franchise from './pages/support/Franchise'
import Faq from './pages/support/Faq'
import CustomerInquiry from './pages/support/CustomerInquiry'
import Online from './pages/support/Online'
import MyPage from './pages/auth/MyPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCenters from './pages/admin/AdminCenters'
import AdminStudios from './pages/admin/AdminStudios'
import AdminNotices from './pages/admin/AdminNotices'
import AdminNews from './pages/admin/AdminNews'
import AdminActivities from './pages/admin/AdminActivities'
import AdminCertTeachers from './pages/admin/AdminCertTeachers'
import AdminExperienceCases from './pages/admin/AdminExperienceCases'
import AdminResearch from './pages/admin/AdminResearch'

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="history" element={<History />} />
        <Route path="bi" element={<Bi />} />
        <Route path="certification" element={<Certification />} />
        <Route path="intellectual-property" element={<IntellectualProperty />} />
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
        <Route path="snpeapp" element={<SnpeApp />} />
        <Route path="baseexercise" element={<BaseExercise />} />
        <Route path="snpevideo" element={<Navigate to="/baseexercise" replace />} />
        <Route path="experiencecase" element={<ExperienceCase />} />
        <Route path="notice" element={<Notice />} />
        <Route path="news" element={<News />} />
        <Route path="activity" element={<Activity />} />
        <Route path="search-center" element={<SearchCenter />} />
        <Route path="studio" element={<Studio />} />
        <Route path="certification-teacher" element={<CertTeacher />} />
        <Route path="franchise" element={<Franchise />} />
        <Route path="faq" element={<Faq />} />
        <Route path="customerinquiry" element={<CustomerInquiry />} />
        <Route path="online" element={<Online />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="login" element={<Navigate to="/admin/login" replace />} />
        <Route path="provision" element={<Navigate to="/" replace />} />
      </Route>

      {/* Admin */}
      <Route path="admin/login" element={<AdminLogin />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="centers" element={<AdminCenters />} />
        <Route path="studios" element={<AdminStudios />} />
        <Route path="notices" element={<AdminNotices />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="activities" element={<AdminActivities />} />
        <Route path="cert-teachers" element={<AdminCertTeachers />} />
        <Route path="experience-cases" element={<AdminExperienceCases />} />
        <Route path="research" element={<AdminResearch />} />
      </Route>
    </Routes>
  )
}

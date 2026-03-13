import { Routes, Route } from 'react-router-dom'
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
import Research from './pages/activity/Research'
import BeginnerGuide from './pages/exercise/BeginnerGuide'
import SnpeApp from './pages/exercise/SnpeApp'
import BaseExercise from './pages/exercise/BaseExercise'
import SnpeVideo from './pages/exercise/SnpeVideo'
import ExperienceCase from './pages/exercise/ExperienceCase'
import Notice from './pages/news/Notice'
import News from './pages/news/News'
import Activity from './pages/news/Activity'
import SearchCenter from './pages/support/SearchCenter'
import CertTeacher from './pages/support/CertTeacher'
import Franchise from './pages/support/Franchise'
import Faq from './pages/support/Faq'
import CustomerInquiry from './pages/support/CustomerInquiry'
import Online from './pages/support/Online'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import MyPage from './pages/auth/MyPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {/* SNPE 운동이란? */}
        <Route path="about" element={<About />} />
        <Route path="history" element={<History />} />
        <Route path="bi" element={<Bi />} />
        <Route path="certification" element={<Certification />} />
        {/* 교육과정 */}
        <Route path="companyclass" element={<CompanyClass />} />
        <Route path="culturecenter" element={<CultureCenter />} />
        <Route path="training" element={<Training />} />
        <Route path="degree" element={<Degree />} />
        <Route path="level1" element={<Level1 />} />
        <Route path="level2" element={<Level2 />} />
        <Route path="level3" element={<Level3 />} />
        <Route path="research" element={<Research />} />
        {/* 운동 정보 */}
        <Route path="beginnerguide" element={<BeginnerGuide />} />
        <Route path="snpeapp" element={<SnpeApp />} />
        <Route path="baseexercise" element={<BaseExercise />} />
        <Route path="snpevideo" element={<SnpeVideo />} />
        <Route path="experiencecase" element={<ExperienceCase />} />
        {/* NEWS */}
        <Route path="notice" element={<Notice />} />
        <Route path="news" element={<News />} />
        <Route path="activity" element={<Activity />} />
        {/* 고객지원 */}
        <Route path="search-center" element={<SearchCenter />} />
        <Route path="certification-teacher" element={<CertTeacher />} />
        <Route path="franchise" element={<Franchise />} />
        <Route path="faq" element={<Faq />} />
        <Route path="customerinquiry" element={<CustomerInquiry />} />
        <Route path="online" element={<Online />} />
        {/* 인증 */}
        <Route path="login" element={<Login />} />
        <Route path="provision" element={<Register />} />
        <Route path="mypage" element={<MyPage />} />
      </Route>
    </Routes>
  )
}

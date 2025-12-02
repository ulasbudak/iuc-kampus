import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import NewsPage from './pages/NewsPage'
import EventsPage from './pages/EventsPage'
import AnnouncementsPage from './pages/AnnouncementsPage'
import QAPage from './pages/QAPage'
import ScholarshipsPage from './pages/ScholarshipsPage'
import CareersPage from './pages/CareersPage'
import NotesPage from './pages/NotesPage'
import CoursesPage from './pages/CoursesPage'
import DormsPage from './pages/DormsPage'
import CafeteriaPage from './pages/CafeteriaPage'
import RingSchedulePage from './pages/RingSchedulePage'
import AcademicCalendarPage from './pages/AcademicCalendarPage'
import SummaryAcademicCalendarPage from './pages/SummaryAcademicCalendarPage'
import DetailedAcademicCalendarPage from './pages/DetailedAcademicCalendarPage'
import MedicineFacultyCalendarPage from './pages/MedicineFacultyCalendarPage'
import DentistryFacultyCalendarPage from './pages/DentistryFacultyCalendarPage'
import PharmacyFacultyCalendarPage from './pages/PharmacyFacultyCalendarPage'
import NursingFacultyCalendarPage from './pages/NursingFacultyCalendarPage'
import VeterinaryFacultyCalendarPage from './pages/VeterinaryFacultyCalendarPage'
import ParkingPage from './pages/ParkingPage'
import BaseScoresPage from './pages/BaseScoresPage'
import WhatsAppPage from './pages/WhatsAppPage'
import CompetitionsPage from './pages/CompetitionsPage'
import ClubActivitiesPage from './pages/ClubActivitiesPage'
import ProfilePage from './pages/ProfilePage'
import AddContentPage from './pages/AddContentPage'
import MyContentPage from './pages/MyContentPage'
import AdminPanelPage from './pages/AdminPanelPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="qa" element={<QAPage />} />
          <Route path="scholarships" element={<ScholarshipsPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="dorms" element={<DormsPage />} />
          <Route path="cafeteria" element={<CafeteriaPage />} />
          <Route path="ring-schedule" element={<RingSchedulePage />} />
          <Route path="academic-calendar" element={<AcademicCalendarPage />} />
          <Route path="academic-calendar/summary" element={<SummaryAcademicCalendarPage />} />
          <Route path="academic-calendar/detailed" element={<DetailedAcademicCalendarPage />} />
          <Route path="academic-calendar/medicine" element={<MedicineFacultyCalendarPage />} />
          <Route path="academic-calendar/dentistry" element={<DentistryFacultyCalendarPage />} />
          <Route path="academic-calendar/pharmacy" element={<PharmacyFacultyCalendarPage />} />
          <Route path="academic-calendar/nursing" element={<NursingFacultyCalendarPage />} />
          <Route path="academic-calendar/veterinary" element={<VeterinaryFacultyCalendarPage />} />
          <Route path="parking" element={<ParkingPage />} />
          <Route path="base-scores" element={<BaseScoresPage />} />
          <Route path="whatsapp" element={<WhatsAppPage />} />
          <Route path="competitions" element={<CompetitionsPage />} />
          <Route path="club-activities" element={<ClubActivitiesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="add-content" element={<AddContentPage />} />
          <Route path="my-content" element={<MyContentPage />} />
          <Route path="admin" element={<AdminPanelPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App


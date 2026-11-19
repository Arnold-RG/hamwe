import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { GisubizoPage } from './pages/GisubizoPage'
import { AboutPage } from './pages/AboutPage'
import { ActivitiesPage } from './pages/ActivitiesPage'
import { ActivityDetailPage } from './pages/ActivityDetailPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ConfirmationPage } from './pages/ConfirmationPage'
import { DestinationsPage } from './pages/DestinationsPage'
import { AlbumPage } from './pages/AlbumPage'
import { FaqPage } from './pages/FaqPage'
import { HomePage } from './pages/HomePage'
import { IncludedPage } from './pages/IncludedPage'
import { PlanPage } from './pages/PlanPage'
import { ResponsiblePage } from './pages/ResponsiblePage'
import { ContactPage } from './pages/ContactPage'
import { TicketsPage } from './pages/TicketsPage'
import { TourDetailPage } from './pages/TourDetailPage'
import { ToursPage } from './pages/ToursPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/tours/:slug" element={<TourDetailPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:slug" element={<ActivityDetailPage />} />
        <Route path="/circles" element={<Navigate to="/tours" replace />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/membership" element={<Navigate to="/tours" replace />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/included" element={<IncludedPage />} />
        <Route path="/responsible" element={<ResponsiblePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/ticket/:id" element={<ConfirmationPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gisubizo" element={<GisubizoPage />} />
      </Route>
    </Routes>
  )
}

import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { ToastProvider } from './context/ToastContext'
import { LanguageProvider } from './context/LanguageContext'
import { Layout } from './components/layout/Layout'

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const TrainsPage = lazy(() => import('./pages/TrainsPage').then((m) => ({ default: m.TrainsPage })))
const PassengerDetailsPage = lazy(() => import('./pages/PassengerDetailsPage').then((m) => ({ default: m.PassengerDetailsPage })))
const ReviewPage = lazy(() => import('./pages/ReviewPage').then((m) => ({ default: m.ReviewPage })))
const PaymentPage = lazy(() => import('./pages/PaymentPage').then((m) => ({ default: m.PaymentPage })))
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage').then((m) => ({ default: m.ConfirmationPage })))
const PNRStatusPage = lazy(() => import('./pages/PNRStatusPage').then((m) => ({ default: m.PNRStatusPage })))
const MyBookingsPage = lazy(() => import('./pages/MyBookingsPage').then((m) => ({ default: m.MyBookingsPage })))
const CancelTicketPage = lazy(() => import('./pages/CancelTicketPage').then((m) => ({ default: m.CancelTicketPage })))
const TrackTrainPage = lazy(() => import('./pages/TrackTrainPage').then((m) => ({ default: m.TrackTrainPage })))
const TransactionHistoryPage = lazy(() => import('./pages/TransactionHistoryPage').then((m) => ({ default: m.TransactionHistoryPage })))
const FileTDRPage = lazy(() => import('./pages/FileTDRPage').then((m) => ({ default: m.FileTDRPage })))
const OffersPage = lazy(() => import('./pages/OffersPage').then((m) => ({ default: m.OffersPage })))
const TravelInfoPage = lazy(() => import('./pages/TravelInfoPage').then((m) => ({ default: m.TravelInfoPage })))
const StationInfoPage = lazy(() => import('./pages/StationInfoPage').then((m) => ({ default: m.StationInfoPage })))
const FAQPage = lazy(() => import('./pages/FAQPage').then((m) => ({ default: m.FAQPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const FeedbackPage = lazy(() => import('./pages/FeedbackPage').then((m) => ({ default: m.FeedbackPage })))
const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })))
const SeatSelectionPage = lazy(() => import('./pages/SeatSelectionPage').then((m) => ({ default: m.SeatSelectionPage })))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-8 h-8 border-2 border-irctc-blue border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <BookingProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/seat-selection" element={<SeatSelectionPage />} />
                  <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/trains" element={<TrainsPage />} />
                    <Route path="/passenger-details" element={<PassengerDetailsPage />} />
                    <Route path="/review" element={<ReviewPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                    <Route path="/pnr-status" element={<PNRStatusPage />} />
                    <Route path="/my-bookings" element={<MyBookingsPage />} />
                    <Route path="/cancel-ticket" element={<CancelTicketPage />} />
                    <Route path="/track-train" element={<TrackTrainPage />} />
                    <Route path="/transaction-history" element={<TransactionHistoryPage />} />
                    <Route path="/file-tdr" element={<FileTDRPage />} />
                    <Route path="/offers" element={<OffersPage />} />
                    <Route path="/travel-info" element={<TravelInfoPage />} />
                    <Route path="/station-info" element={<StationInfoPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/feedback" element={<FeedbackPage />} />
                    <Route path="/login" element={<LoginPage />} />
                  </Route>
                </Routes>
              </Suspense>
            </BookingProvider>
          </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}

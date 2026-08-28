import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { ToastProvider } from './context/ToastContext'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { BookTicketPage } from './pages/BookTicketPage'
import { TrainsPage } from './pages/TrainsPage'
import { PassengerDetailsPage } from './pages/PassengerDetailsPage'
import { ReviewPage } from './pages/ReviewPage'
import { PaymentPage } from './pages/PaymentPage'
import { ConfirmationPage } from './pages/ConfirmationPage'
import { PNRStatusPage } from './pages/PNRStatusPage'
import { MyBookingsPage } from './pages/MyBookingsPage'
import { CancelTicketPage } from './pages/CancelTicketPage'
import { EWalletPage } from './pages/EWalletPage'
import { FileTDRPage } from './pages/FileTDRPage'
import { OffersPage } from './pages/OffersPage'
import { TravelInfoPage } from './pages/TravelInfoPage'
import { StationInfoPage } from './pages/StationInfoPage'
import { FAQPage } from './pages/FAQPage'
import { ContactPage } from './pages/ContactPage'
import { FeedbackPage } from './pages/FeedbackPage'
import { LoginPage } from './pages/LoginPage'
import { SeatSelectionPage } from './pages/SeatSelectionPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ToastProvider>
        <AuthProvider>
          <BookingProvider>
            <Routes>
              <Route path="/seat-selection" element={<SeatSelectionPage />} />
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/book-ticket" element={<BookTicketPage />} />
                <Route path="/trains" element={<TrainsPage />} />
                <Route path="/passenger-details" element={<PassengerDetailsPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/pnr-status" element={<PNRStatusPage />} />
                <Route path="/my-bookings" element={<MyBookingsPage />} />
                <Route path="/cancel-ticket" element={<CancelTicketPage />} />
                <Route path="/e-wallet" element={<EWalletPage />} />
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
          </BookingProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

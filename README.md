# IRCTC Train Booking - Frontend Prototype

A fully functional frontend prototype of the IRCTC (Indian Railway Catering and Tourism Corporation) train booking website, built with React, TypeScript, and Tailwind CSS.

## Features

- **Homepage** matching the IRCTC reference design with hero section, search card, quick actions, trust bar, offers, and help section
- **Station Selector** with 300+ Indian railway stations, searchable by name, code, city, and aliases
- **From/To Swap** functionality
- **Date Picker** with past date prevention
- **Class & Passenger Selectors** with full dropdown interactions
- **Train Search & Results** with filters (departure time, train type, class, availability)
- **Complete Booking Flow**: Search → Select Train → Passenger Details → Review → Payment → Confirmation
- **PNR Status** enquiry with mock results
- **My Bookings**, **Cancel Ticket**, **E-Wallet**, **File TDR**
- **Offers** page with coupon copy functionality
- **Travel Info**, **Station Info**, **FAQs**, **Contact**, **Feedback**
- **Login/Signup** modal with mock authentication
- **Responsive design** for desktop, tablet, and mobile

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS 4
- React Router 7
- Lucide React (icons)
- date-fns (date formatting)
- Vite (build tool)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:43123`.

## Project Structure

```
src/
├── components/
│   ├── booking/       # Search card, station selector, date picker, etc.
│   ├── home/          # Hero, quick actions, offers, help sections
│   ├── layout/        # Header, layout wrapper
│   └── ui/            # Reusable UI components (Modal, Button, Toast)
├── context/           # React contexts (Auth, Booking, Toast)
├── data/              # Mock data (stations, trains, bookings, offers, FAQs)
├── pages/             # Route pages
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/book-ticket` | Book ticket page |
| `/trains` | Train search results |
| `/passenger-details` | Enter passenger info |
| `/review` | Review booking |
| `/payment` | Payment page |
| `/confirmation` | Booking confirmation |
| `/pnr-status` | PNR enquiry |
| `/my-bookings` | View bookings |
| `/cancel-ticket` | Cancel ticket |
| `/e-wallet` | E-wallet management |
| `/file-tdr` | File TDR |
| `/offers` | All offers |
| `/travel-info` | Travel information |
| `/station-info` | Station search |
| `/faq` | FAQs |
| `/contact` | Contact us |
| `/feedback` | Feedback form |
| `/login` | Login (redirects to home with modal) |

## Note

This is a **frontend prototype** for demonstration purposes. It uses mock data and does not connect to actual IRCTC booking systems or process real payments.

## Sample PNR Numbers

- `4521879630` - Mumbai Rajdhani (Confirmed)
- `8745213690` - Sealdah Duronto (Confirmed)
- `9632587410` - Karnataka Express (RAC)

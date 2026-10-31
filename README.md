# AfterBuy

**Never miss a return window or warranty deadline again.**

AfterBuy is a purchase tracking application designed to help users organise their purchases, monitor product return periods, and keep track of warranty expiration dates in one place.

The project is being developed as a responsive, user-friendly frontend application using React and TypeScript.

> **Project status:** In development. The dashboard supports purchase management, dynamic statistics, automatic deadline calculations, browser localStorage persistence and activity history. Backend synchronisation and other cross-device features are not implemented.

## The Problem

People frequently forget when they purchased products, how long they have to return them, and when their warranties expire.

Important purchase information often ends up scattered across emails, receipts and personal notes.

AfterBuy aims to solve this by providing a centralised place to record purchases and monitor important deadlines.

## Planned Features

- **Purchase Management:** Add, edit, view and delete purchase records.
- **Return Window Tracking:** Automatically calculate product return deadlines.
- **Warranty Tracking:** Calculate warranty expiration dates and identify approaching expirations.
- **Purchase Status Management:** Track the status of individual purchases.
- **Activity History:** Keep a record of purchase-related updates.
- **Dashboard Overview:** Display purchase statistics and important reminders.
- **Local Data Persistence:** Preserve purchase and activity information between browser sessions using browser localStorage.
- **Responsive Interface:** Provide a consistent experience across desktop, tablet and mobile devices.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface development |
| TypeScript | Static typing and data modelling |
| Vite | Development server and build tooling |
| Tailwind CSS v4 | Styling and responsive layouts |
| shadcn/ui | Reusable interface components |
| Radix UI | Accessible interface primitives |
| Lucide React | Icon library |
| date-fns | Date calculations and formatting |
| React Hook Form | Form state management |
| Zod | Data validation |
| Sonner | User notifications |

## Design Direction

AfterBuy uses a warm, minimal visual identity built around:

- Evergreen and forest-green brand colours.
- Warm ivory application backgrounds.
- Soft sage surfaces.
- Amber deadline indicators.
- Terracotta overdue indicators.
- Figtree Variable typography.

The interface prioritises readability, clear visual hierarchy and consistent interactions.

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── dashboard/
│   ├── layout/
│   └── ui/
├── data/
├── lib/
├── types/
├── App.tsx
├── index.css
└── main.tsx
```

## Getting Started

### Prerequisites

- Node.js compatible with the installed Vite version.
- npm.
- Git.

### Installation

Clone the repository:

```bash
git clone https://github.com/lloydgapton/afterbuy.git
```

Navigate into the project:

```bash
cd afterbuy
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

### Production Build

To check TypeScript compilation and generate an optimised production build:

```bash
npm run build
```

### Linting

Run:

```bash
npm run lint
```

## Current Implementation Status

The initial development milestone includes:

- React and TypeScript project configuration.
- Tailwind CSS v4 integration.
- shadcn/ui component library.
- AfterBuy global design theme.
- Initial dashboard component structure.
- Sample purchase and activity records.
- Dynamic dashboard statistics derived from purchase records.
- Automatic return-window and warranty deadline calculations using local calendar dates.
- Purchase creation and editing through a shared validated form.
- Purchase detail viewing and deletion with confirmation.
- Purchase form validation for required fields, positive values, valid statuses and non-future purchase dates.
- Browser localStorage persistence for purchases and activity history using versioned storage keys.
- Activity records for purchase creation, updates, status transitions and deletion.

Persistent storage is local to the current browser and device. Backend synchronisation, reminder delivery and cross-device access are still pending.

## Future Improvements

Potential future enhancements include:

- User authentication.
- Cloud-based purchase synchronisation.
- Receipt attachment management.
- Purchase reminders and notifications.
- Exporting purchase records.
- Detailed purchase analytics.

These improvements are outside the scope of the initial frontend version.

## Repository

[View AfterBuy on GitHub](https://github.com/lloydgapton/afterbuy)

---

**AfterBuy — Keep track of what you buy, and never miss what matters.**

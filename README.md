# 🎓 Khareej Qader — خريج قادر

<div align="center">

  ![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
  ![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![i18n RTL/LTR](https://img.shields.io/badge/i18n-RTL%20%7C%20LTR-34B898?style=for-the-badge)

  <br />

  **Enterprise-Grade EdTech Platform Bridging Academic Graduation & Modern Market Capabilities**

  [📌 Core Architecture](#-core-architecture--solid-engineering) •
  [✨ Key Features](#-key-features--portals) •
  [🛠 Tech Stack](#-technology-stack) •
  [📁 Directory Structure](#-directory-structure) •
  [🚀 Getting Started](#-getting-started)

</div>

---

## 📌 Executive Summary

**Khareej Qader (خريج قادر)** is a state-of-the-art, production-ready educational ecosystem engineered to empower university graduates with industry-relevant technical expertise. By pairing hands-on training tracks (Full-Stack Web Development, UI/UX Design, Digital Marketing) with direct industry mentorship, practical task evaluations, and real-time portfolio creation, Khareej Qader transforms academic potential into job-ready professional excellence.

The front-end architecture is built on **Next.js (App Router)**, engineered according to **SOLID design principles**, with a modular, highly scalable folder structure, real-time client state synchronization, and full native **Bi-Directional Internationalization (RTL / LTR)**.

---

## ✨ Key Features & Portals

### 1. 🌐 Public Landing Page & Dynamic CMS Center
- **Explore Training Tracks (قسم المسارات التدريبية)**: Interactive track exploration featuring detailed curriculum breakdown, course duration, and registration flows.
- **University Success Partners (شركاء النجاح من الجامعات)**: Infinite-scrolling university logo wall celebrating institutional collaboration.
- **Real Student Success Stories (قصص نجاح حقيقية من طلابنا)**: Testimonials carousel featuring verified student feedback, track achievements, star ratings, and badges.
- **Khareej Qader Gallery Snapshots (لقطات من خريج قادر)**: Dynamic grid gallery highlighting graduation ceremonies, workshops, and student events.
- **Admin Landing CMS Control**: Fully integrated Admin management hub allowing real-time CRUD operations (Create, Read, Update, Delete, Reset) for all 4 landing sections with instant real-time synchronization.

### 2. 🎓 Student Dashboard & Learning Portal
- **Interactive Course Path**: Visual progression timeline tracking completed lessons, upcoming video tutorials, and pending tasks.
- **Custom Video Player**: Advanced media player with video progress persistence, auto-resume capabilities, and completion badges.
- **Task Submission & Feedback Tracker**: Dedicated interface for uploading project files (code repositories, ZIP archives, design links) with live submission status tracking (`Pending Review`, `Graded`, `Needs Revision`).
- **Profile & Portfolio Showcase**: Dynamic profile editing, CV display, skills summary, and digital certificates verification.

### 3. 👨‍🏫 Mentor Portal & Submission Evaluation System
- **Submissions Management Desk**: High-performance dataset built on **TanStack Table** with real-time search, multi-criteria filtering, sorting, and pagination.
- **Interactive Task Review Engine**: Comprehensive review panel featuring file preview links (ZIP, PDF, GitHub repositories), custom rich-text feedback editor, dynamic interactive 5-star rating widget, and instant task acceptance/rejection controls.
- **Student Performance Analytics**: Metric cards tracking overall track progress, average student scores, late submission alerts, and real-time activity timelines.

### 4. 🛡️ Enterprise Admin Command Center
- **Student & Mentor Governance**: Comprehensive user status toggles (Enable, Disable, Soft Delete, Restore, Permanent Delete).
- **Course & Curriculum Management**: Course creation wizard with YouTube playlist mapping, student enrollment metrics, and mentor assignments.
- **Landing Content CMS Hub**: Tabbed management dashboard for controlling public landing page components dynamically.

---

## 🏗️ Core Architecture & SOLID Engineering

```
                             ┌───────────────────────────────────┐
                             │    Next.js App Router Layer       │
                             │ (Internationalized i18n Routing) │
                             └─────────────────┬─────────────────┘
                                               │
               ┌───────────────────────────────┼───────────────────────────────┐
               ▼                               ▼                               ▼
     ┌───────────────────┐           ┌───────────────────┐           ┌───────────────────┐
     │ Public Marketing  │           │ Student Dashboard │           │ Admin & Mentor    │
     │   & Landing CMS   │           │ & Learning Space  │           │ Command Centers   │
     └─────────┬─────────┘           └─────────┬─────────┘           └─────────┬─────────┘
               │                               │                               │
               └───────────────────────────────┼───────────────────────────────┘
                                               │
                                               ▼
                             ┌───────────────────────────────────┐
                             │     Custom Hooks & CMS Layer      │
                             │ (useTracksCMS, usePartnersCMS...) │
                             └─────────────────┬─────────────────┘
                                               │
                                               ▼
                             ┌───────────────────────────────────┐
                             │  Storage & API Abstraction Layer   │
                             │  (REST / Axios Client / Storage)  │
                             └───────────────────────────────────┘
```

The codebase strictly enforces industry-standard software engineering paradigms:

- **Single Responsibility Principle (SRP)**: UI presentation, data transformation, state management, and API persistence reside in dedicated, decoupled modules.
- **Open/Closed Principle (OCP)**: Modular card components and form dialogs accept generic props and data schemas, allowing extension without modifying existing UI logic.
- **Dependency Inversion Principle (DIP)**: Public sections and management views consume unified custom hooks (`useTracksCMS`, `usePartnersCMS`, etc.), isolating components from storage implementation details (local persistent cache / future backend REST APIs).
- **Performance Optimization**: Dynamic dynamic imports (`next/dynamic`) below the fold, memoized computations (`useMemo`, `useCallback`), image optimizations (`next/image`), and minimal re-renders.

---

## 🎨 Technology Stack

| Category | Technology | Description |
|---|---|---|
| **Core Framework** | **Next.js 15 (App Router)** | Modern React framework with Server & Client components |
| **Language** | **TypeScript** | Strict type safety and clear interface definitions |
| **Styling & UI** | **Tailwind CSS v4** | Utility-first CSS engine with RTL logical properties |
| **UI Components** | **Shadcn UI & Lucide Icons** | Accessible, custom-styled component primitives |
| **Animations** | **Framer Motion** | Smooth micro-interactions and scroll animation reveals |
| **Data Tables** | **TanStack Table v8** | High-performance headless data tables with filtering |
| **Data Fetching** | **TanStack Query (React Query)** | Server state management and API caching |
| **Localization** | **next-intl** | Full Arabic (RTL) & English (LTR) internationalization |
| **HTTP Client** | **Axios** | Interceptor-configured REST API client |

---

## 📂 Directory Structure

```text
khareej-qader/
├── app/
│   ├── [locale]/                   # i18n Localized Routes (ar / en)
│   │   ├── (auth)/                 # Authentication Routes (Login, Register)
│   │   ├── (main)/                 # Public Pages (Landing, News)
│   │   ├── admin/                  # Enterprise Admin Dashboard & Landing CMS
│   │   ├── dashboard/              # Student Portal (Tracks, Lessons, Tasks)
│   │   └── mentor/                 # Mentor Portal (Submissions, Review, Students)
│   └── api/                        # Next.js API Routes & Proxy Interceptors
├── components/
│   ├── animations/                 # Scroll & Reveal Animation Components
│   ├── dashboard/                  # Portal Components (Admin, Mentor, Student, CMS)
│   ├── sections/                   # Public Landing Page Sections (Tracks, Partners...)
│   └── ui/                         # Atomic Shadcn UI Components
├── hooks/                          # Custom React Hooks & CMS State Management
│   ├── cms/                        # Real-Time Dynamic Landing CMS Hooks
│   ├── admin/                      # Admin Management Hooks
│   └── mentor/                     # Mentor Portal Hooks
├── lib/
│   ├── api/                        # Axios Client & Centralized API Endpoints
│   ├── storage/                    # Persistent Storage Layer & Event Bus
│   └── utils/                      # Helper Utilities & Formatters
├── messages/                       # Locale Translation Files (ar.json, en.json)
├── types/                          # TypeScript Interface & Type Definitions
└── styles/                         # Custom SCSS Variables & Animations
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/khareej-qader.git
   cd khareej-qader
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```

4. **Launch Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

5. **Type Checking & Linting**
   ```bash
   npx tsc --noEmit
   npm run lint
   ```

---

## 🔌 API Integration Architecture

All data operations are designed using an abstracted state interface. Backend integration (GET, POST, PATCH, DELETE endpoints) requires zero UI component refactoring:
- Endpoints are centralized in `lib/api/endpoints.ts`.
- Data mutations use clean hooks (`useGetData`, `useUpdateData`, `usePostData`).
- Swapping the persistent storage layer with REST API responses is fully supported through the hook abstraction layer.

---

## 👨‍💻 Engineering Philosophy & Quality Commitment

Engineered with 10+ years of frontend expertise, Khareej Qader reflects enterprise standard development practices:
- Zero tolerance for implicit `any` types.
- Clean separation of presentation and business logic.
- Accessible, responsive UI matching pixel-perfect brand identities.
- Robust error handling, loading skeletons, and empty states.

---

<div align="center">

  **Crafted with excellence for Khareej Qader Platform**

</div>

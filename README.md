````md
# 🚀 Kharij Qader (خريج قادر)

<p align="center">
  منصة تعليمية لتمكين الخريجين وربطهم بسوق العمل من خلال مسارات عملية بإشراف خبراء.
</p>

---

## 📌 Overview

**Kharij Qader** is an educational platform designed to bridge the gap between academic learning and real-world job requirements.

توفر المنصة:
- مسارات تدريبية (Web, Design, Marketing)
- مشاريع عملية (Hands-on)
- إشراف خبراء (Mentorship)
- شهادات معتمدة

🌍 الواجهة تدعم:
- العربية (RTL)
- الإنجليزية (LTR)

---

## 🧱 Project Structure

```bash
khareej-qader/
├── public/                 # Assets (images, icons, fonts)
├── app/
│   ├── [locale]/           # i18n routing (ar / en)
│   │   ├── layout.tsx      # Root layout
│   │   ├── (main)/         # Main pages (with Header)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── news/
│   │   └── (auth)/         # Auth pages (no Header)
│   │       ├── layout.tsx
│   │       ├── login/
│   │       └── register/
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx
│   │   ├── AuthIllustration.tsx
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── ui/                 # Shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── SectionTitle.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── VideoSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── tracks/
│   │   │   ├── index.tsx
│   │   │   ├── use-track-slider.ts
│   │   │   └── components/
│   │   └── HowItWorksSection.tsx
├── lib/
│   └── utils.ts
└── styles/
    └── globals.css
````

---

## ⚙️ Tech Stack

| Layer        | Technology           |
| ------------ | -------------------- |
| Framework    | Next.js (App Router) |
| Language     | TypeScript           |
| Styling      | TailwindCSS          |
| UI System    | Shadcn UI            |
| Architecture | Component-Driven     |

---

## 🧠 Architecture Principles

* Separation of concerns:

  * UI
  * Logic
  * Layout
* `page.tsx` = Composition Layer فقط
* كل Section = Component مستقل
* قابلية إعادة الاستخدام (Reusable)

---

## 🎨 Styling Strategy

* Mobile-First Approach
* دعم RTL / LTR
* استخدام:

  * `ms` / `me`
  * `ps` / `pe`
    بدل `left / right`

---

## 🌍 Internationalization (i18n)

* Dynamic routing: `[locale]`
* Languages:

  * Arabic 🇵🇸 (RTL)
  * English 🇺🇸 (LTR)

---

## 🧩 Reusable Components

### 🔘 Button

* Primary
* Outline
* Ghost

---

### 🏷️ SectionHeader

* Title
* Description
* Configurable alignment

---

### 🧾 TrackCard

* Image
* Duration
* Title
* Description
* CTA

---

### ⭐ FeatureCard

* Icon
* Title
* Description

---

### 📊 StatItem

* Number
* Label

---

### 🪜 StepItem

* Step indicator
* Connected flow

---

## 📋 Page Composition

### 1. Navbar

* Logo
* Navigation Links
* Auth Buttons

---

### 2. HeroSection

* Headline
* CTA
* Illustration
* Floating stats

---

### 3. StatsSection

* Metrics Grid

---

### 4. VideoSection

* Intro video داخل mockup

---

### 5. FeaturesSection

* 3 FeatureCards:

  * Expert Mentors
  * Flexible Learning
  * Industry Certified

---

### 6. TracksSection

* Grid / Slider

---

### 7. HowItWorksSection

* Step-by-step flow

---

### 8. Footer

* Links + Copyright

---

## 🧼 Code Standards

* SOLID Principles
* Clean Code
* Reusability
* Performance Optimization
* Accessibility (a11y)
* SEO Best Practices

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build project
npm run build

# Start production
npm start
```

---

## 📦 Deployment

Recommended:

* Vercel (Next.js native support)

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a Pull Request

---

## 💡 Developer Notes

### 📌 Source of Truth

هذا الملف هو المرجع الأساسي للمشروع.

---

### ⚡ Working with AI

بدل ما تشرح كل مرة:

> "Build HeroSection based on README"

وسيتم التنفيذ مباشرة بنفس المعايير.

---

## 📄 License

This project is licensed under the MIT License.


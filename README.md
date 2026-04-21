# Kharij Qader — خريج قادر

> منصة تعليمية تسد الفجوة بين الحياة الأكاديمية وسوق العمل

---

## 📌 نبذة عن المشروع

مشروع **خريج قادر** منصة تعليمية توفر مسارات تدريبية متخصصة (تطوير الويب، التصميم، التسويق) بإشراف خبراء من الصناعة، وتتضمن مشاريع عملية تؤهل الخريجين للحصول على شهادات معتمدة.

الواجهة الأمامية مبنية بـ **Next.js (App Router)** وتدعم تصميمَين — عربي (RTL) وإنجليزي (LTR).

---

## 🏗️ هيكل المشروع

```text
khareej-qader/
├── public/                         # الصور، الأيقونات (SVGs)، والخطوط
├── app/
│   └── [locale]/                   # دعم تعدد اللغات (RTL / LTR)
│       ├── layout.tsx              # Root Providers
│       ├── (main)/                 # الصفحات الرئيسية (مع Header)
│       │   ├── layout.tsx
│       │   ├── page.tsx            # الصفحة الرئيسية
│       │   └── news/               # صفحة الأخبار والفرص
│       └── (auth)/                 # صفحات التوثيق (بدون Header)
│       │   ├── layout.tsx
│       │   ├── login/
│       │   └── register/
│       └── dashboard/              # لوحة تحكم الطالب (Student Dashboard)
│           ├── layout.tsx          # تخطيط لوحة التحكم (Sidebar + TopNav)
│           └── page.tsx            # الصفحة الرئيسية للوحة التحكم
├── components/
│   ├── auth/                       # مكونات صفحات التوثيق
│   │   ├── AuthLayout.tsx
│   │   ├── AuthIllustration.tsx
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── dashboard/                  # مكونات لوحة التحكم
│   │   ├── Sidebar.tsx
│   │   ├── TopNav.tsx
│   │   ├── ProgressHero.tsx
│   │   ├── MentorCard.tsx
│   │   ├── TaskCard.tsx
│   │   ├── Announcements.tsx
│   │   └── CertificateCard.tsx
│   ├── layout/                     # مكونات التخطيط الثابتة
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── ui/                         # مكونات Shadcn UI
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── SectionTitle.tsx
│   └── sections/                   # أقسام الصفحة الرئيسية
│       ├── HeroSection.tsx
│       ├── StatsSection.tsx
│       ├── VideoSection.tsx
│       ├── FeaturesSection.tsx
│       ├── HowItWorksSection.tsx
│       └── tracks/
│           ├── index.tsx           # Orchestrator
│           ├── use-track-slider.ts # Logic Hook
│           └── ...
├── lib/
│   └── utils.ts                    # دوال مساعدة (clsx + tailwind-merge)
└── styles/
    └── globals.css                 # إعدادات Tailwind والمتغيرات العامة
```

---

## 🎨 التقنيات المستخدمة

| التقنية | الاستخدام |
|---|---|
| **Next.js (App Router)** | إطار العمل الأساسي |
| **TypeScript** | Strict Typing لتجنب أخطاء وقت التشغيل |
| **TailwindCSS** | التصميم المتجاوب + دعم RTL عبر خصائص `start/end` |
| **Shadcn UI** | مكتبة المكونات الأساسية (أزرار، بطاقات، علامات) |
| **i18n (Localization)** | دعم العربية والإنجليزية مع تغيير اتجاه الصفحة |

---

## 🧩 المكونات القابلة لإعادة الاستخدام

| المكوّن | الوصف |
|---|---|
| `Button` | مولَّد بـ Shadcn — متعدد الـ Variants (Primary / Outline / Ghost) |
| `SectionTitle` | عنوان القسم + وصف، مع دعم التحكم بالمحاذاة |
| `TrackCard` | بطاقة المسار — صورة، مدة، عنوان، وصف، زر تسجيل |
| `FeatureCard` | أيقونة + عنوان + نص — تُستخدم في قسم المميزات |
| `StatItem` | رقم مميز + عنوان + أيقونة — يُستخدم في Hero وشريط الإحصائيات |
| `StepItem` | دائرة بها رقم/أيقونة مع أسهم توضيحية بين الخطوات |

---

## 📋 خريطة الصفحة الرئيسية

```
page.tsx
├── <Header />              — الشعار، الروابط، أزرار الدخول والتسجيل
├── <HeroSection />         — العنوان الرئيسي، CTA، صورة إيضاحية + Floating Stats
├── <StatsSection />        — شريط مؤشرات النجاح (+10 مسارات، +50 مشروع...)
├── <VideoSection />        — مشغّل الفيديو التعريفي داخل إطار لابتوب
├── <FeaturesSection />     — Expert Mentors / Flexible Learning / Industry Certified
├── <TracksSection />       — شبكة بطاقات المسارات التدريبية
├── <HowItWorksSection />   — خطوات: تسجيل ← تعلّم ← احصل على شهادة
└── <Footer />              — الحقوق والروابط الإضافية
```

---

## 💡 للمطور

هذا الملف هو **المصدر الأساسي للحقيقة** للمشروع.

عند طلب بناء قسم جديد، يكفي أن تقول:

> *"ابنِ قسم `HeroSection` بناءً على الـ README"*

وسيُفهَم السياق الكامل — التقنيات، المكونات، والمنهجيات — مباشرةً من هنا.

### قواعد الكود

- استخدم `start/end` بدلاً من `left/right` في Tailwind لضمان توافق RTL
- كل قسم كبير → ملف مستقل في `components/sections/`
- تجنب تكدس الكود في `page.tsx` — تبقى مجرد wrapper يستدعي المكونات
- أي تغيير في تصميم عنصر (مثل الأزرار) → يُعدَّل في ملفه فقط وينعكس على النظام كله
- لوحة تحكم الأدمن (Admin Dashboard) → مخطط لها مستقبلاً وسيتم فصلها عن لوحة تحكم الطالب لضمان قابلية التوسع.


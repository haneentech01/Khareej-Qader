import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      "use client";

      import {Card, CardContent} from "@/components/ui/card";
      import {Play} from "lucide-react";

      const steps = [
      {
        number: "1",
      title: "سجل في البرنامج",
      description: "أنشئ حسابك بسهولة وابدأ رحلتك التعليمية معنا",
      icon: "👤", // أو استخدم Lucide icon
  },
      {
        number: "2",
      title: "اختر المسار المناسب",
      description: "اختر المسار الذي يناسب أهدافك المهنية من بين الخيارات المتاحة",
      icon: "🎯",
  },
      {
        number: "3",
      title: "تعلم وطبق",
      description: "تعلم المهارات العملية من خلال الدروس التفاعلية والمشاريع الحقيقية",
      icon: "⚡",
  },
      {
        number: "4",
      title: "احصل على شهادة",
      description: "احصل على شهادة معتمدة تثبت مهاراتك وتفتح لك أبواب العمل",
      icon: "🏆",
  },
      ];

      export default function ProcessSteps() {
  return (
      <div className="w-full bg-white py-20 px-6 font-sans" dir="rtl">
        <div className="max-w-7xl mx-auto">
          {/* العنوان الرئيسي */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              كيف يعمل برنامج خريج قادر؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              لتعرف الخطوات التي ستساعدك للوصول إلى سوق العمل والانطلاق نحو مهنة مستقبلية
            </p>
          </div>

          {/* الـ Steps Container */}
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
            {/* الخط الواصل (Dotted Line) */}
            <div className="absolute top-[52px] left-1/2 md:left-0 md:right-0 h-0.5 w-full md:w-[calc(100%-80px)] bg-gradient-to-r from-transparent via-emerald-200 to-transparent hidden md:block" />

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center z-10 w-full max-w-[260px]"
              >
                {/* الدائرة المرقمة */}
                <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-6 relative">
                  {step.number}
                  {/* النقطة الصغيرة للدلالة على الاتصال */}
                  {index < steps.length - 1 && (
                    <div className="absolute -right-4 top-1/2 w-8 h-0.5 bg-emerald-200 hidden md:block" />
                  )}
                </div>

                {/* الكارت */}
                <Card className="w-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-3xl overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl mb-6">{step.icon}</div>

                    <h3 className="font-semibold text-xl text-gray-900 mb-3 leading-tight">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 text-[15px] leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}

            {/* زر الـ Play في المنتصف (مثل الصورة) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 md:relative md:left-auto md:top-auto md:translate-x-0 md:translate-y-0 md:mt-8">
              <button
                className="w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border border-emerald-100"
                aria-label="تشغيل الفيديو"
              >
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </button>
            </div>
          </div>

          {/* السؤال في الأسفل */}
          <div className="text-center mt-20">
            <h3 className="text-3xl font-bold text-gray-900">
              لماذا تُعد برنامج خريج قادر خيارك الأمثل؟
            </h3>
          </div>
        </div>
      </div>
      );
}
    </div>
  );
}

import {
  TrackCMSItem,
  PartnerCMSItem,
  TestimonialCMSItem,
  GalleryCMSItem,
} from "@/types/landing-cms";

// Storage Keys
const STORAGE_KEYS = {
  TRACKS: "khareej_qader_cms_tracks",
  PARTNERS: "khareej_qader_cms_partners",
  TESTIMONIALS: "khareej_qader_cms_testimonials",
  GALLERY: "khareej_qader_cms_gallery",
} as const;

export const CMS_UPDATE_EVENT = "khareej_qader_cms_updated";

// Initial Fallback Data
export const INITIAL_TRACKS: TrackCMSItem[] = [
  {
    id: "track-1",
    name: "تطوير تطبيقات الويب (Full Stack Web Development)",
    desc: "تعلم بناء تطبيقات ويب متكاملة مع أحدث تقنيات React و Next.js و Node.js والمشاريع العملية.",
    time: "3 أشهر - مكثف",
    img: "/images/web.png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "track-2",
    name: "تصميم واجهات وتجربة المستخدم (UI/UX Design)",
    desc: "احترف تصميم الواجهات الرقمية، إنشاء البروتوتايبس، ودراسات تجربة المستخدم باستخدام Figma.",
    time: "2 شهر - عملي",
    img: "/images/uxui.png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "track-3",
    name: "التسويق الرقمي وإدارة الحملات (Digital Marketing)",
    desc: "استراتيجيات التسويق عبر منصات التواصل، إدارة الإعلانات المدفوعة، وتحليل البيانات.",
    time: "2 شهر - تفاعلي",
    img: "/images/digitalMarketing.png",
    createdAt: new Date().toISOString(),
  },
];

export const INITIAL_PARTNERS: PartnerCMSItem[] = [
  { id: "partner-1", name: "جامعة الأزهر - غزة", logo: "/images/partners/AUG.png", createdAt: new Date().toISOString() },
  { id: "partner-2", name: "الجامعة الإسلامية - غزة", logo: "/images/partners/IUG.png", createdAt: new Date().toISOString() },
  { id: "partner-3", name: "جامعة فلسطين", logo: "/images/partners/UP.png", createdAt: new Date().toISOString() },
  { id: "partner-4", name: "جامعة الأقصى", logo: "/images/partners/AAU.png", createdAt: new Date().toISOString() },
  { id: "partner-5", name: "جامعة غزة", logo: "/images/partners/GU.png", createdAt: new Date().toISOString() },
  { id: "partner-6", name: "الكلية الجامعية للعلوم التطبيقية", logo: "/images/partners/UCAS.png", createdAt: new Date().toISOString() },
];

export const INITIAL_TESTIMONIALS: TestimonialCMSItem[] = [
  {
    id: "testimonial-1",
    name: "أحمد محمود",
    role: "مطور خريج - مسار الويب",
    quote: "تجربة برنامج خريج قادر كانت نقطة التحول في مسيرتي المهنية. التطبيق العملي والمتابعة اليومية ساعدتني للحصول على عمل كـ Full Stack Developer.",
    badge: "قصة نجاح متميزة",
    image: "/images/personsImages.png",
    rating: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "testimonial-2",
    name: "سارة خليل",
    role: "مصممة واجهات UI/UX",
    quote: "البرنامج وفر لي التوجيه والإرشاد من قبل خبراء في المجال. تمكنت من بناء بورتفوليو قوي والمشاركة في مشاريع حقيقية.",
    badge: "قصة نجاح متميزة",
    image: "/images/personsImages.png",
    rating: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "testimonial-3",
    name: "محمد علي",
    role: "أخصائي تسويق رقمي",
    quote: "المهارات العملية التي اكتسبتها في خريج قادر أهلتني لإدارة حملات تسويقية ناجحة والعمل مع شركات عالمية.",
    badge: "قصة نجاح متميزة",
    image: "/images/personsImages.png",
    rating: 5,
    createdAt: new Date().toISOString(),
  },
];

export const INITIAL_GALLERY: GalleryCMSItem[] = Array.from({ length: 8 }).map(
  (_, i) => ({
    id: `gallery-${i + 1}`,
    title: `لقطة من فعاليات خريج قادر #${i + 1}`,
    image: "/images/logo.png",
    createdAt: new Date().toISOString(),
  })
);

// Helper for broadcasting updates
function notifyChange(section: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(CMS_UPDATE_EVENT, { detail: { section } })
    );
  }
}

// Storage Manager Generic Functions
function getItems<T>(key: string, initialData: T[]): T[] {
  if (typeof window === "undefined") return initialData;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : initialData;
  } catch (error) {
    console.error(`Error reading storage key ${key}:`, error);
    return initialData;
  }
}

function setItems<T>(key: string, data: T[], section: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    notifyChange(section);
  } catch (error) {
    console.error(`Error saving storage key ${key}:`, error);
  }
}

// Public CMS Storage API
export const cmsStorage = {
  // Tracks
  getTracks: (): TrackCMSItem[] => getItems(STORAGE_KEYS.TRACKS, INITIAL_TRACKS),
  saveTracks: (tracks: TrackCMSItem[]): void => setItems(STORAGE_KEYS.TRACKS, tracks, "tracks"),
  resetTracks: (): TrackCMSItem[] => {
    setItems(STORAGE_KEYS.TRACKS, INITIAL_TRACKS, "tracks");
    return INITIAL_TRACKS;
  },

  // Partners
  getPartners: (): PartnerCMSItem[] => getItems(STORAGE_KEYS.PARTNERS, INITIAL_PARTNERS),
  savePartners: (partners: PartnerCMSItem[]): void => setItems(STORAGE_KEYS.PARTNERS, partners, "partners"),
  resetPartners: (): PartnerCMSItem[] => {
    setItems(STORAGE_KEYS.PARTNERS, INITIAL_PARTNERS, "partners");
    return INITIAL_PARTNERS;
  },

  // Testimonials
  getTestimonials: (): TestimonialCMSItem[] => getItems(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS),
  saveTestimonials: (testimonials: TestimonialCMSItem[]): void => setItems(STORAGE_KEYS.TESTIMONIALS, testimonials, "testimonials"),
  resetTestimonials: (): TestimonialCMSItem[] => {
    setItems(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS, "testimonials");
    return INITIAL_TESTIMONIALS;
  },

  // Gallery
  getGallery: (): GalleryCMSItem[] => getItems(STORAGE_KEYS.GALLERY, INITIAL_GALLERY),
  saveGallery: (gallery: GalleryCMSItem[]): void => setItems(STORAGE_KEYS.GALLERY, gallery, "gallery"),
  resetGallery: (): GalleryCMSItem[] => {
    setItems(STORAGE_KEYS.GALLERY, INITIAL_GALLERY, "gallery");
    return INITIAL_GALLERY;
  },
};

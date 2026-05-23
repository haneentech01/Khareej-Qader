export interface StepItem {
    number: string;
    title: string;
    desc: string;
    icon: string;
}

export interface FeatureItem {
    title: string;
    desc: string;
    icon: string;
}

export interface TestimonialItem {
    id: string | number;
    quote: string;
    name: string;
    role: string;
    badge: string;
    image: string;
    rating: number;
}

export interface GalleryItem {
    id: string | number;
    image: string;
    title: string;
}

export interface FaqItem {
    q: string;
    a: string;
}

export interface CtaData {
    title: string;
    subtitle: string;
    buttonText: string;
}

export interface HeroStatItem {
  key: string;
  count: string;
  label: string;
  images: string;
}

export interface HeroData {
  titleStart: string;
  brandName: string;
  description: string;
  registerButton: string;
  learnMore: string;
}

export interface TrackItem {
  name: string;
  desc: string;
  time: string;
  img: string;
}

export interface TrackData {
  registerText: string;
  tracks: TrackItem[];
}

export interface NewsItem {
  date: string;
  title: string;
  description: string;
}

export interface NewsLabels {
  smallSubtitle: string;
  viewAll: string;
  readMore: string;
}

export interface TaskDetailsPageProps {
  params: Promise<{
    locale: string;
    taskId: string;
  }>;
  searchParams: Promise<{
    status?: string;
  }>;
}

export interface TaskDetailsViewProps {
  id?: string;
  locale: string;
  status: "pending" | "completed";
  title: string;
  subtitle: string;
  breadcrumbItems: { label: string; href?: string }[];
  switcherCompleted: string;
  switcherPending: string;
}

export type LessonStatus = "completed" | "current" | "locked";

export interface LessonItemProps {
  id: string;
  number: number;
  title: string;
  duration?: string;
  status: LessonStatus;
  isLast?: boolean;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  duration?: string;
  status: LessonStatus;
}

export interface LessonTimelineProps {
  lessons: Lesson[];
}

export interface SubmissionInfoCardProps {
  status: "pending" | "completed";
}


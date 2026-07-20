// ─── Common ────────────────────────────────────────────────────────────────
export type {
  Role,
  ApiResponse,
  ValidationErrors,
  TopNavVariant,
  ContributionType,
  ToolbarButtonProps,
  EditorToolbarProps,
  PaginationLink,
  PaginatedResponse,
  TaskDetailsPageProps,
  SubmissionReviewPageProps,
} from "./common";

// ─── Marketing ─────────────────────────────────────────────────────────────
export type {
  StepItem,
  FeatureItem,
  TestimonialItem,
  GalleryItem,
  FaqItem,
  CtaData,
  HeroStatItem,
  HeroData,
  TrackItem,
  TrackData,
  NewsItem,
  NewsLabels,
} from "./marketing";

// ─── Auth ──────────────────────────────────────────────────────────────────
export type {
  RegisterResponse,
  RegisterFormData,
  MentorRegisterFormData,
  MentorRegisterPayload,
  LoginResponse,
  LoginFormData,
  AuthUser,
} from "./auth";

// ─── Lookup ────────────────────────────────────────────────────────────────
export type {
  Country,
  University,
  Major,
  CourseListItem,
  StateListItem,
} from "./lookup";

// ─── Student ───────────────────────────────────────────────────────────────
export type {
  DashboardStudent,
  DashboardCourse,
  DashboardProgress,
  DashboardCurrentLesson,
  DashboardNextTask,
  DashboardMentor,
  DashboardCertificate,
  DashboardAnnouncement,
  DashboardData,
  StudentProfile,
  StudentFormData,
  UpdateStudentDataPayload,
  UpdatedStudentData,
} from "./student";

// ─── Student Path + Video ──────────────────────────────────────────────────
export type {
  PathInfo,
  PathProgress,
  CurrentVideo,
  PathVideo,
  LessonStatus,
  StudentPathData,
  VideoResumeData,
  VideoProgressResponse,
  VideoCompleteResponse,
  VideoProgressPayload,
  VideoHookProps,
  VideoDetails,
} from "./student-path";

// ─── Submissions + Tasks  ───────────────────────────────────────────
export type {
  Submission,
  SubmissionStudent,
  SubmissionTask,
  SubmissionReviewer,
  AllTaskItem,
  StudentTaskDetails,
  UploadedFile,
  SubmissionInfoCardProps,
  TaskDetailsViewProps,
  CreateTaskPayload,
  CreateTaskResponse,
  SubmitTaskResponse,
  ReviewSubmissionPayload,
  ReviewSubmissionResponse,
  MentorTasksCountData,
  MentorTaskListItem,
  MentorCourseItem,
  SubmissionsListResponse,
  TaskStatus,
  TaskType,
} from "./submission";

// ─── Mentor ────────────────────────────────────────────────────────────────
export type {
  MentorDashboardLastSubmission,
  MentorDashboard,
  MentorDashboardCourse,
  MentorDashboardData,
  TrackCourses,
  UpdateMentorDataPayload,
  UpdatedMentorData,
  MentorFormData,
  MentorProfile,
  MentorStudentListItem,
  MentorStudentsListResponse,
  MentorStudentCourse,
  MentorStudentDetails,
  MentorLessonStatus,
  MentorLesson,
} from "./mentor";

export type { Submission as TaskSubmissionListItem } from "./submission";
export type { Submission as SubmissionDetail } from "./submission";
export type { SubmissionStudent as TaskSubmissionListStudent } from "./submission";
export type { SubmissionTask as TaskSubmissionListTask } from "./submission";
export type { SubmissionReviewer as TaskSubmissionListReviewer } from "./submission";
export type { SubmissionReviewer as MentorReviewer } from "./submission";
export type { Submission as StudentTaskSubmission } from "./submission";

// ─── SubmissionStatus — حالات التسليم الممكنة ─────────────────────────────
export type SubmissionStatus = "pending" | "evaluated" | "late" | "not_submitted";


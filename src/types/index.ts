export type Language = 'uz' | 'ru' | 'en';

export type UserRole = 
  | 'guest' 
  | 'student' 
  | 'teacher' 
  | 'advertiser' 
  | 'moderator' 
  | 'admin' 
  | 'superadmin';

export interface User {
  id: string; // 10-digit unique ID
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  telegramUsername?: string;
  credits: number;
  subscriptionPlan: 'free' | 'student' | 'premium' | 'vip';
  subscriptionExpiresAt?: string;
  enrolledCourseIds: string[];
  createdAt: string;
}

export type PaymentStatus = 
  | 'pending'      // kutilmoqda
  | 'checking'     // tekshirilmoqda
  | 'approved'     // tasdiqlandi
  | 'rejected'     // rad etildi
  | 'cancelled'    // bekor qilindi
  | 'refunded';    // qaytarildi

export type PaymentCategory = 'ai_service' | 'subscription' | 'course' | 'advertisement' | 'credits';

export interface PaymentOrder {
  orderId: string;
  userId: string; // 10-digit user ID
  userName: string;
  userEmail: string;
  category: PaymentCategory;
  itemTitle: string;
  itemId?: string;
  amountUZS: number;
  recipientType: 'admin' | 'teacher';
  recipientName: string;
  recipientCardNumber: string;
  recipientTelegram: string;
  status: PaymentStatus;
  rejectionReason?: string;
  receiptNote?: string;
  receiptFileUrl?: string;
  createdAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  teacherId: string;
  teacherName: string;
  teacherPhoto: string;
  priceUZS: number;
  durationMonths: number;
  weeklySchedule: string; // e.g. "Dush / Chor / Juma 18:00 - 20:00"
  startDate: string;
  maxStudents: number;
  enrolledCount: number;
  language: 'uz' | 'ru' | 'en' | 'all';
  isActive: boolean;
  level: 'Boshlang\'ich' | 'O\'rtacha' | 'Yuqori';
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  specialty: string;
  bio: string;
  experienceYears: number;
  photo: string;
  subjects: string[];
  cardNumber: string;
  cardHolder: string;
  telegramUsername: string;
  rating: number;
  activeCourseIds: string[];
}

export interface SlideElement {
  id: string;
  type: 'heading' | 'subheading' | 'bullet' | 'text' | 'quote' | 'stat';
  content: string;
}

export interface PresentationSlide {
  id: string;
  title: string;
  subtitle?: string;
  layout: 'title_bullets' | 'two_columns' | 'stat_highlight' | 'quote_centered' | 'comparison' | 'conclusion';
  elements: SlideElement[];
  notes?: string;
  bgColor?: string;
  textColor?: string;
  iconName?: string;
}

export interface Presentation {
  id: string;
  userId: string;
  title: string;
  topic: string;
  language: Language;
  templateCategory: string;
  templateId?: string;
  slides: PresentationSlide[];
  createdAt: string;
  updatedAt: string;
}

export interface SlideTemplate {
  id: string;
  title: string;
  category: 
    | 'school' 
    | 'university' 
    | 'business' 
    | 'it' 
    | 'medicine' 
    | 'history' 
    | 'economics' 
    | 'ecology' 
    | 'minimalist' 
    | 'creative';
  categoryLabelUz: string;
  categoryLabelRu: string;
  categoryLabelEn: string;
  previewColor: string;
  slideCount: number;
  isPremium: boolean;
  downloads: number;
  rating: number;
  tags: string[];
}

export interface AdPackage {
  id: string;
  code: 'mini' | 'standard' | 'premium' | 'vip' | 'custom';
  nameUz: string;
  nameRu: string;
  nameEn: string;
  priceUZS: number;
  durationDays: number;
  featuresUz: string[];
  featuresRu: string[];
  featuresEn: string[];
  badge?: string;
  isPopular?: boolean;
}

export interface Advertisement {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  contactInfo: string;
  externalLink: string;
  packageCode: 'mini' | 'standard' | 'premium' | 'vip' | 'custom';
  priceUZS: number;
  status: 'pending' | 'active' | 'expired' | 'rejected';
  rejectionReason?: string;
  paymentOrderId: string;
  viewsCount: number;
  clicksCount: number;
  startsAt?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'olympiad';
  questions: QuizQuestion[];
  createdAt: string;
}

export interface HomeworkSolution {
  id: string;
  userId: string;
  subject: string;
  gradeLevel: string;
  problemText: string;
  hasImageAttachment?: boolean;
  stepByStepSolution: string[];
  finalAnswer: string;
  formulaExplanations: string[];
  practiceProblems: string[];
  createdAt: string;
}

export interface GeneratedDoc {
  id: string;
  userId: string;
  type: 'referat' | 'esse' | 'kurs_ishi' | 'mustaqil_ish' | 'maqola';
  title: string;
  subject: string;
  outline: string[];
  introduction: string;
  bodySections: { heading: string; content: string }[];
  conclusion: string;
  literatureSources: string[];
  createdAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  performedBy: string; // email or user ID
  action: string;
  target: string;
  details: string;
  ipAddress?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

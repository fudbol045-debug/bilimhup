import { UserRole, PaymentCategory, Teacher } from '../types';

export const SUPER_ADMIN_EMAIL = 'fudbol045@gmail.com';

/**
 * Generates a unique 10-digit ID string (1000000000 - 9999999999).
 */
export function generate10DigitId(): string {
  const min = 1000000000;
  const max = 9999999999;
  const rand = Math.floor(Math.random() * (max - min + 1)) + min;
  return rand.toString();
}

/**
 * Validates whether an ID is a valid 10-digit user ID.
 */
export function isValid10DigitId(id: string): boolean {
  return /^[1-9]\d{9}$/.test(id);
}

/**
 * Checks if the given email belongs to the protected Super Administrator.
 */
export function isSuperAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
}

/**
 * Evaluates whether an actor role can manage (edit/delete) a target role.
 * Super Admin cannot be deleted or demoted by standard Admins.
 */
export function canManageRole(actorRole: UserRole, targetRole: UserRole): boolean {
  if (actorRole === 'superadmin') {
    return true; // Super admin can manage any role
  }
  if (actorRole === 'admin') {
    // Normal admin cannot modify or delete Super Admin or another Admin
    return targetRole !== 'superadmin' && targetRole !== 'admin';
  }
  return false;
}

/**
 * Routes payment recipient according to BilimHub AI payment rules:
 * - O'quv kurslari -> Tegishli o'qituvchi kartasi va Telegram akkaunti.
 * - AI xizmatlari, Premium obunalar, Reklama va E'lonlar -> Administrator kartasi va Telegram akkaunti.
 */
export function determinePaymentRecipient(
  category: PaymentCategory,
  courseTeacher?: Teacher | null,
  adminDetails = {
    name: "BilimHub Boshqaruv / Bosh Admin",
    cardNumber: "8600 5304 9921 4410",
    telegram: "BilimHubAdmin"
  }
): {
  recipientType: 'admin' | 'teacher';
  recipientName: string;
  recipientCardNumber: string;
  recipientTelegram: string;
} {
  if (category === 'course' && courseTeacher) {
    return {
      recipientType: 'teacher',
      recipientName: courseTeacher.name,
      recipientCardNumber: courseTeacher.cardNumber || "8600 0000 0000 0000",
      recipientTelegram: courseTeacher.telegramUsername.replace('@', ''),
    };
  }

  // All AI services, subscriptions, credits, and advertisements go to Admin card
  return {
    recipientType: 'admin',
    recipientName: adminDetails.name,
    recipientCardNumber: adminDetails.cardNumber,
    recipientTelegram: adminDetails.telegram.replace('@', ''),
  };
}

/**
 * Calculate quiz results: score, total, percentage and pass indicator (>= 60%).
 */
export function calculateQuizScore(
  userAnswers: (number | null)[],
  correctAnswers: number[]
): {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
} {
  let score = 0;
  const total = correctAnswers.length;

  for (let i = 0; i < total; i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      score++;
    }
  }

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  return {
    score,
    total,
    percentage,
    passed: percentage >= 60,
  };
}

/**
 * Formats amount into standard Uzbek sum string (e.g. 50 000 so'm).
 */
export function formatCurrencyUZS(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
}

/**
 * Validates advertisement requirements before publishing.
 */
export function validateAdvertisement(ad: {
  title: string;
  description: string;
  contactInfo: string;
}): { isValid: boolean; error?: string } {
  if (!ad.title || ad.title.trim().length < 5) {
    return { isValid: false, error: "Reklama sarlavhasi kamida 5 ta belgidan iborat bo'lishi kerak" };
  }
  if (!ad.description || ad.description.trim().length < 15) {
    return { isValid: false, error: "Reklama tavsifi kamida 15 ta belgidan iborat bo'lishi kerak" };
  }
  if (!ad.contactInfo || ad.contactInfo.trim().length < 5) {
    return { isValid: false, error: "Aloqa ma'lumoti yoki Telegram havolasi kiritilishi shart" };
  }
  return { isValid: true };
}

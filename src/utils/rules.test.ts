import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generate10DigitId,
  isValid10DigitId,
  isSuperAdminEmail,
  canManageRole,
  determinePaymentRecipient,
  calculateQuizScore,
  formatCurrencyUZS,
  validateAdvertisement,
  SUPER_ADMIN_EMAIL
} from './rules';

test('10-digit ID generation produces valid 10-digit number strings', () => {
  for (let i = 0; i < 20; i++) {
    const id = generate10DigitId();
    assert.equal(id.length, 10, 'ID must be 10 characters long');
    assert.match(id, /^[1-9]\d{9}$/, 'ID must not start with 0 and contain only digits');
    assert.equal(isValid10DigitId(id), true);
  }
});

test('isValid10DigitId correctly validates edge cases', () => {
  assert.equal(isValid10DigitId('1234567890'), true);
  assert.equal(isValid10DigitId('9999999999'), true);
  assert.equal(isValid10DigitId('0123456789'), false, 'Cannot start with 0');
  assert.equal(isValid10DigitId('12345'), false, 'Too short');
  assert.equal(isValid10DigitId('12345678901'), false, 'Too long');
  assert.equal(isValid10DigitId('12345abcde'), false, 'Non-digits not allowed');
});

test('Super admin email check protects fudbol045@gmail.com', () => {
  assert.equal(isSuperAdminEmail('fudbol045@gmail.com'), true);
  assert.equal(isSuperAdminEmail('FUDBOL045@GMAIL.COM'), true, 'Case insensitive');
  assert.equal(isSuperAdminEmail(' fudbol045@gmail.com '), true, 'Trims whitespace');
  assert.equal(isSuperAdminEmail('other@gmail.com'), false);
  assert.equal(isSuperAdminEmail(''), false);
  assert.equal(SUPER_ADMIN_EMAIL, 'fudbol045@gmail.com');
});

test('Role management permissions prevent standard admin from modifying superadmin', () => {
  // Super admin can manage anyone
  assert.equal(canManageRole('superadmin', 'admin'), true);
  assert.equal(canManageRole('superadmin', 'teacher'), true);
  assert.equal(canManageRole('superadmin', 'student'), true);

  // Normal admin CANNOT manage superadmin or other admins
  assert.equal(canManageRole('admin', 'superadmin'), false);
  assert.equal(canManageRole('admin', 'admin'), false);
  assert.equal(canManageRole('admin', 'student'), true);
  assert.equal(canManageRole('admin', 'teacher'), true);

  // Student cannot manage anyone
  assert.equal(canManageRole('student', 'teacher'), false);
});

test('Payment routing directs course fees to teacher, AI/Ads to admin', () => {
  const teacher = {
    id: 't-1',
    name: 'Dilshod Karimov',
    email: 'dilshod@math.uz',
    specialty: 'Oliy Matematika',
    bio: '15 yillik tajribaga ega',
    experienceYears: 15,
    photo: '',
    subjects: ['Matematika'],
    cardNumber: '9860 1234 5678 9012',
    cardHolder: 'Dilshod Karimov',
    telegramUsername: '@dilshod_math',
    rating: 4.9,
    activeCourseIds: ['c-1']
  };

  // Course payment
  const courseRoute = determinePaymentRecipient('course', teacher);
  assert.equal(courseRoute.recipientType, 'teacher');
  assert.equal(courseRoute.recipientName, 'Dilshod Karimov');
  assert.equal(courseRoute.recipientCardNumber, '9860 1234 5678 9012');
  assert.equal(courseRoute.recipientTelegram, 'dilshod_math');

  // AI service payment -> Admin
  const aiRoute = determinePaymentRecipient('ai_service', null);
  assert.equal(aiRoute.recipientType, 'admin');
  assert.equal(aiRoute.recipientTelegram, 'BilimHubAdmin');

  // Ad package payment -> Admin
  const adRoute = determinePaymentRecipient('advertisement', teacher);
  assert.equal(adRoute.recipientType, 'admin');
});

test('calculateQuizScore correctly handles all answers', () => {
  const correct = [0, 2, 1, 3, 0];
  const user1 = [0, 2, 1, 3, 0]; // 5/5 = 100%
  const res1 = calculateQuizScore(user1, correct);
  assert.equal(res1.score, 5);
  assert.equal(res1.percentage, 100);
  assert.equal(res1.passed, true);

  const user2 = [0, 1, 1, 3, 2]; // 3/5 = 60%
  const res2 = calculateQuizScore(user2, correct);
  assert.equal(res2.score, 3);
  assert.equal(res2.percentage, 60);
  assert.equal(res2.passed, true);

  const user3 = [1, 1, 0, 0, 1]; // 0/5 = 0%
  const res3 = calculateQuizScore(user3, correct);
  assert.equal(res3.score, 0);
  assert.equal(res3.percentage, 0);
  assert.equal(res3.passed, false);
});

test('Currency formatting produces clean Uzbek sum string', () => {
  const formatted = formatCurrencyUZS(50000);
  assert.match(formatted, /50.*000.*so'm/);
});

test('Advertisement validation catches short text and empty contacts', () => {
  const valid = validateAdvertisement({
    title: 'Ingliz tili kursi',
    description: 'Zamonaviy metodika asosida darslar o‘tiladi',
    contactInfo: '@bilim_markazi'
  });
  assert.equal(valid.isValid, true);

  const invalidTitle = validateAdvertisement({
    title: 'Hi',
    description: 'Zamonaviy metodika asosida darslar o‘tiladi',
    contactInfo: '@bilim_markazi'
  });
  assert.equal(invalidTitle.isValid, false);
});

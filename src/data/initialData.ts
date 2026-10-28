import { 
  Teacher, 
  Course, 
  AdPackage, 
  Advertisement, 
  SlideTemplate, 
  PaymentOrder, 
  AuditLog,
  Quiz
} from '../types';

export const TEMPLATE_CATEGORIES = [
  { id: 'school', nameUz: 'Maktab va umumiy ta’lim', nameRu: 'Школа и общее образование', nameEn: 'School & General Education', totalCount: 800, icon: 'GraduationCap' },
  { id: 'university', nameUz: 'Universitet va ilmiy tadqiqotlar', nameRu: 'Университет и наука', nameEn: 'University & Research', totalCount: 700, icon: 'BookOpen' },
  { id: 'business', nameUz: 'Biznes va marketing', nameRu: 'Бизнес и маркетинг', nameEn: 'Business & Marketing', totalCount: 600, icon: 'Briefcase' },
  { id: 'it', nameUz: 'IT va texnologiyalar', nameRu: 'IT и технологии', nameEn: 'IT & Technology', totalCount: 500, icon: 'Code' },
  { id: 'medicine', nameUz: 'Tibbiyot va biologiya', nameRu: 'Медицина и биология', nameEn: 'Medicine & Biology', totalCount: 500, icon: 'Activity' },
  { id: 'history', nameUz: 'Tarix va geografiya', nameRu: 'История и география', nameEn: 'History & Geography', totalCount: 400, icon: 'Compass' },
  { id: 'economics', nameUz: 'Iqtisodiyot va moliya', nameRu: 'Экономика и финансы', nameEn: 'Economics & Finance', totalCount: 400, icon: 'TrendingUp' },
  { id: 'ecology', nameUz: 'Tabiat va ekologiya', nameRu: 'Природа и экология', nameEn: 'Nature & Ecology', totalCount: 300, icon: 'Leaf' },
  { id: 'minimalist', nameUz: 'Minimalist va korporativ', nameRu: 'Минимализм и корпоративный', nameEn: 'Minimalist & Corporate', totalCount: 500, icon: 'Layers' },
  { id: 'creative', nameUz: 'Kreativ, san’at va dizayn', nameRu: 'Креатив и искусство', nameEn: 'Creative & Art', totalCount: 500, icon: 'Palette' },
];

export const TOTAL_TEMPLATES_COUNT = 5200;

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 't-1',
    name: 'Dilshod Karimov',
    email: 'dilshod.math@bilimhub.uz',
    specialty: 'Oliy Matematika va DTM/SAT Tayyorlov',
    bio: '14 yillik pedagogik tajriba, fizika-matematika fanlari nomzodi, 400 dan ortiq talabalari grant asosida o‘qishga kirgan.',
    experienceYears: 14,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    subjects: ['Matematika', 'Geometriya', 'Mantiqiy masalalar'],
    cardNumber: '9860 1904 8820 4491',
    cardHolder: 'Dilshod Karimov',
    telegramUsername: 'dilshod_math_uz',
    rating: 4.95,
    activeCourseIds: ['c-1', 'c-4']
  },
  {
    id: 't-2',
    name: 'Nodira Rahimova',
    email: 'nodira.ielts@bilimhub.uz',
    specialty: 'Ingliz tili (IELTS 8.5) & Akademik yozish',
    bio: 'CELTA xalqaro sertifikatiga ega ustoz. 7 yildan buyon xalqaro imtihonlarga tayyorlab kelmoqda.',
    experienceYears: 7,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    subjects: ['IELTS', 'General English', 'Academic Writing'],
    cardNumber: '8600 4402 7712 9984',
    cardHolder: 'Nodira Rahimova',
    telegramUsername: 'nodira_ielts_expert',
    rating: 4.98,
    activeCourseIds: ['c-2']
  },
  {
    id: 't-3',
    name: 'Farrux Rustamov',
    email: 'farrux.it@bilimhub.uz',
    specialty: 'Full-Stack Web dasturlash & Sun’iy Intellekt',
    bio: 'Katta dasturchi (Senior Software Engineer), AI startaplar asoschisi. O‘quvchilarga amaliy loyihalar orqali o‘rgatadi.',
    experienceYears: 9,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    subjects: ['React & Next.js', 'Python & AI', 'PostgreSQL'],
    cardNumber: '9860 3311 0029 4811',
    cardHolder: 'Farrux Rustamov',
    telegramUsername: 'farrux_dev_mentor',
    rating: 4.92,
    activeCourseIds: ['c-3', 'c-5']
  },
  {
    id: 't-4',
    name: 'Shahnoza Alimova',
    email: 'shahnoza.bio@bilimhub.uz',
    specialty: 'Biologiya, Kimyo va Tibbiyotga tayyorlov',
    bio: 'Tibbiyot akademiyasi o‘qituvchisi, Milliy sertifikat va olimpiadachilar ustozi.',
    experienceYears: 11,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    subjects: ['Biologiya', 'Anatomiya', 'Organik kimyo'],
    cardNumber: '8600 5001 8832 1923',
    cardHolder: 'Shahnoza Alimova',
    telegramUsername: 'shahnoza_biomed',
    rating: 4.94,
    activeCourseIds: ['c-6']
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c-1',
    title: 'DTM va SAT Oliy Matematika Intensiv Kursi',
    description: 'Barcha maktab va litsey bitiruvchilari uchun chuqurlashtirilgan algebra, geometriya va trigonometriya kursi. Har hafta haqiqiy test sinovlari.',
    category: 'Aniq fanlar',
    teacherId: 't-1',
    teacherName: 'Dilshod Karimov',
    teacherPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    priceUZS: 450000,
    durationMonths: 6,
    weeklySchedule: 'Dushanba, Chorshanba, Juma 18:00 - 20:00',
    startDate: '2026-11-05',
    maxStudents: 25,
    enrolledCount: 19,
    language: 'uz',
    isActive: true,
    level: 'Yuqori'
  },
  {
    id: 'c-2',
    title: 'IELTS 7.5+ Band Masterclass & Academic Essay',
    description: 'Reading, Listening, Writing Task 1 & 2 va Speaking bo‘yicha individual ko‘rsatmalar, AI orqali insholarni tekshirish va jonli mock imtihonlar.',
    category: 'Xorijiy tillar',
    teacherId: 't-2',
    teacherName: 'Nodira Rahimova',
    teacherPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    priceUZS: 550000,
    durationMonths: 4,
    weeklySchedule: 'Seshanba, Payshanba, Shanba 16:30 - 18:30',
    startDate: '2026-11-10',
    maxStudents: 20,
    enrolledCount: 16,
    language: 'en',
    isActive: true,
    level: 'O\'rtacha'
  },
  {
    id: 'c-3',
    title: 'Zamonaviy Full-Stack Veb Dasturlash (React & Node)',
    description: 'Noldan professional darajagacha veb saytlar va ilovalar yaratish, ma’lumotlar bazasi, API va bulutli hosting bilan ishlash.',
    category: 'IT va Dasturlash',
    teacherId: 't-3',
    teacherName: 'Farrux Rustamov',
    teacherPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    priceUZS: 700000,
    durationMonths: 6,
    weeklySchedule: 'Dushanba, Chorshanba, Juma 19:30 - 21:30',
    startDate: '2026-11-12',
    maxStudents: 30,
    enrolledCount: 22,
    language: 'uz',
    isActive: true,
    level: 'Boshlang\'ich'
  },
  {
    id: 'c-4',
    title: 'Olimpiada Matematikasi va Mantiqiy Masalalar',
    description: 'Respublika va xalqaro olimpiadalarga tayyorgarlik ko‘ruvchilar uchun murakkab nostandart masalalar tahlili.',
    category: 'Aniq fanlar',
    teacherId: 't-1',
    teacherName: 'Dilshod Karimov',
    teacherPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    priceUZS: 500000,
    durationMonths: 5,
    weeklySchedule: 'Shanba va Yakshanba 10:00 - 13:00',
    startDate: '2026-11-15',
    maxStudents: 15,
    enrolledCount: 11,
    language: 'uz',
    isActive: true,
    level: 'Yuqori'
  },
  {
    id: 'c-5',
    title: 'Python, Sun’iy Intellekt va Neyrotarmoqlar Asoslari',
    description: 'Sun’iy intellekt modellarini o‘qitish, ma’lumotlarni tahlil qilish, kompyuter ko‘rishi va LLM integratsiyasi.',
    category: 'IT va Dasturlash',
    teacherId: 't-3',
    teacherName: 'Farrux Rustamov',
    teacherPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    priceUZS: 750000,
    durationMonths: 4,
    weeklySchedule: 'Seshanba, Payshanba 19:00 - 21:30',
    startDate: '2026-11-20',
    maxStudents: 20,
    enrolledCount: 14,
    language: 'uz',
    isActive: true,
    level: 'O\'rtacha'
  },
  {
    id: 'c-6',
    title: 'Tibbiyot OTMlariga Tayyorgarlik (Biologiya & Kimyo)',
    description: 'Anatomiya, genetika, sitologiya va noorganik/organik kimyo masalalari. DTM testlarining barcha nozik sirlari.',
    category: 'Tabiiy fanlar',
    teacherId: 't-4',
    teacherName: 'Shahnoza Alimova',
    teacherPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    priceUZS: 480000,
    durationMonths: 8,
    weeklySchedule: 'Dushanba, Chorshanba, Juma 16:00 - 18:00',
    startDate: '2026-11-08',
    maxStudents: 25,
    enrolledCount: 20,
    language: 'uz',
    isActive: true,
    level: 'Yuqori'
  }
];

export const INITIAL_AD_PACKAGES: AdPackage[] = [
  {
    id: 'pkg-1',
    code: 'mini',
    nameUz: '1. Mini E’lon',
    nameRu: '1. Мини Объявление',
    nameEn: '1. Mini Notice',
    priceUZS: 10000,
    durationDays: 3,
    badge: 'Tejamkor',
    featuresUz: [
      'Amal qilish muddati: 3 kun',
      'Sarlavha va qisqa matn',
      'Bitta rasm biriktirish',
      'E’lonlar katalogida joylashuv',
      'To‘g‘ridan-to‘g‘ri Telegram havolasi'
    ],
    featuresRu: [
      'Срок размещения: 3 дня',
      'Заголовок и краткое описание',
      'Одно изображение',
      'Размещение в каталоге объявлений',
      'Прямая ссылка на Telegram'
    ],
    featuresEn: [
      'Duration: 3 days',
      'Headline and concise copy',
      'One image attachment',
      'Directory listing',
      'Direct Telegram link'
    ]
  },
  {
    id: 'pkg-2',
    code: 'standard',
    nameUz: '2. Standart Reklama',
    nameRu: '2. Стандарт Реклама',
    nameEn: '2. Standard Ad',
    priceUZS: 25000,
    durationDays: 7,
    isPopular: true,
    badge: 'Ommabop',
    featuresUz: [
      'Amal qilish muddati: 7 kun',
      'Batafsil tavsif va kontaktlar',
      'Yuqori sifatli rasm',
      'E’lonlar ro‘yxatida ustuvor ko‘rinish',
      'Bosh sahifa e’lonlar blokida namoyish',
      'Statistika (ko‘rishlar soni)'
    ],
    featuresRu: [
      'Срок размещения: 7 дней',
      'Подробное описание и контакты',
      'Качественное изображение',
      'Приоритетное отображение в списке',
      'Показ в блоке на главной странице',
      'Статистика просмотров'
    ],
    featuresEn: [
      'Duration: 7 days',
      'Detailed description and contacts',
      'High quality image',
      'Priority directory sorting',
      'Homepage showcase block',
      'Live view counter'
    ]
  },
  {
    id: 'pkg-3',
    code: 'premium',
    nameUz: '3. Premium Reklama',
    nameRu: '3. Премиум Реклама',
    nameEn: '3. Premium Ad',
    priceUZS: 50000,
    durationDays: 14,
    badge: 'Kengaytirilgan',
    featuresUz: [
      'Amal qilish muddati: 14 kun',
      'Kattaroq reklama kartasi va ajratilgan dizayn',
      'Bir nechta rasm biriktirish',
      'Bosh sahifada doimiy ko‘rinish',
      'Telegram va ijtimoiy tarmoq tugmalari',
      'Bosishlar va ko‘rishlar analitikasi'
    ],
    featuresRu: [
      'Срок размещения: 14 дней',
      'Увеличенная карточка и выделенный дизайн',
      'Возможность нескольких изображений',
      'Постоянный блок на главной странице',
      'Кнопки Telegram и соцсетей',
      'Аналитика кликов и переходов'
    ],
    featuresEn: [
      'Duration: 14 days',
      'Enlarged card with featured styling',
      'Multiple images allowed',
      'Consistent home view presence',
      'Telegram & social buttons',
      'Click & view analytics'
    ]
  },
  {
    id: 'pkg-4',
    code: 'vip',
    nameUz: '4. VIP Reklama',
    nameRu: '4. VIP Реклама',
    nameEn: '4. VIP Ad',
    priceUZS: 100000,
    durationDays: 30,
    badge: 'Maksimal Natija',
    featuresUz: [
      'Amal qilish muddati: 30 kun',
      'Bosh sahifaning eng yuqori qismida maxsus joy',
      'O‘quvchilar va talabalar kabinetida ko‘rinish',
      'Oltin "VIP E’lon" belgisi',
      'Admin tomonidan shaxsiy moderatsiya va maslahat',
      'To‘liq konversiya statistikasi'
    ],
    featuresRu: [
      'Срок размещения: 30 дней',
      'Специальный блок в верхней части главной',
      'Отображение в кабинетах учащихся',
      'Золотой бейдж "VIP Объявление"',
      'Персональная модерация и консультация',
      'Полная статистика конверсии'
    ],
    featuresEn: [
      'Duration: 30 days',
      'Prime spot above header on main page',
      'Displayed inside student dashboards',
      'Golden "VIP Ad" badge',
      'Personal admin moderation assistance',
      'Full conversion reporting'
    ]
  },
  {
    id: 'pkg-5',
    code: 'custom',
    nameUz: '5. Maxsus Reklama',
    nameRu: '5. Специальная Реклама',
    nameEn: '5. Custom / Enterprise Ad',
    priceUZS: 200000,
    durationDays: 30,
    badge: 'Eksklyuziv',
    featuresUz: [
      'Amal qilish muddati: 30 kun (kengaytirilgan)',
      'Katta banner, slaydlar va video havola',
      'Barcha sahifalarda ustuvor namoyish',
      'BilimHub Telegram kanalida e’lon berish',
      'Haftalik batafsil auditoriya hisoboti',
      'Individual dizayn moslashtirish'
    ],
    featuresRu: [
      'Срок размещения: 30 дней (расширенный)',
      'Большой баннер, слайды и видео-ссылка',
      'Приоритетный показ на всех страницах',
      'Публикация в Telegram-канале BilimHub',
      'Еженедельный детальный отчет аудитории',
      'Индивидуальный дизайн оформления'
    ],
    featuresEn: [
      'Duration: 30 days (extended)',
      'Large banner, slide gallery and video embed',
      'Priority showcase across all app views',
      'Shoutout on BilimHub official Telegram channel',
      'Weekly audience report & metrics',
      'Custom branding styling'
    ]
  }
];

export const INITIAL_ADS: Advertisement[] = [
  {
    id: 'ad-1',
    userId: '8392014820',
    title: 'Cambridge Academy — IELTS 8.0 Kafolatlangan Kurslari',
    description: 'Toshkent shahrida joylashgan zamonaviy o‘quv markazimizda yangi guruhlar ochilmoqda. Birinchi dars bepul! Shoshiling, joylar cheklangan.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    contactInfo: '+998 (90) 123-45-67 / @cambridge_academy_uz',
    externalLink: 'https://t.me/cambridge_academy_uz',
    packageCode: 'vip',
    priceUZS: 100000,
    status: 'active',
    paymentOrderId: 'ord-ad-1',
    viewsCount: 3840,
    clicksCount: 420,
    startsAt: '2026-10-20',
    expiresAt: '2026-11-20',
    createdAt: '2026-10-20T10:00:00Z'
  },
  {
    id: 'ad-2',
    userId: '7192083910',
    title: 'Genius Kids — Robototexnika va Dasturlash Maktabi',
    description: '8-16 yoshli bolalar uchun Lego Mindstorms, Python va Scratch darslari. Farzandingiz kelajak kasbini hozirdan o‘rgansin.',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    contactInfo: '+998 (97) 777-88-99 / @genius_kids_uz',
    externalLink: 'https://t.me/genius_kids_uz',
    packageCode: 'premium',
    priceUZS: 50000,
    status: 'active',
    paymentOrderId: 'ord-ad-2',
    viewsCount: 1920,
    clicksCount: 215,
    startsAt: '2026-10-25',
    expiresAt: '2026-11-08',
    createdAt: '2026-10-25T14:30:00Z'
  },
  {
    id: 'ad-3',
    userId: '6291038491',
    title: 'Koreya va Yaponiya Universitetlariga 100% Grantlar',
    description: 'GKS va MEXT grantlari bo‘yicha bepul konsultatsiya. Hujjatlarni to‘g‘ri tayyorlash va intervyuga tayyorgarlik.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    contactInfo: '@study_abroad_consulting_uz',
    externalLink: 'https://t.me/study_abroad_consulting_uz',
    packageCode: 'standard',
    priceUZS: 25000,
    status: 'active',
    paymentOrderId: 'ord-ad-3',
    viewsCount: 940,
    clicksCount: 108,
    startsAt: '2026-10-26',
    expiresAt: '2026-11-02',
    createdAt: '2026-10-26T09:15:00Z'
  }
];

// Generate rich featured slide templates
export const INITIAL_SLIDE_TEMPLATES: SlideTemplate[] = [
  // School & General Education (800 in total catalog)
  {
    id: 'tpl-sch-1',
    title: 'Maktab Darslari va Ochiq Dars Taqdimoti',
    category: 'school',
    categoryLabelUz: 'Maktab va umumiy ta’lim',
    categoryLabelRu: 'Школа и образование',
    categoryLabelEn: 'School & Education',
    previewColor: 'from-blue-600 to-indigo-700',
    slideCount: 12,
    isPremium: false,
    downloads: 1420,
    rating: 4.9,
    tags: ['dars', 'maktab', 'ochiq dars', 'metodika']
  },
  {
    id: 'tpl-sch-2',
    title: 'Matematika va Geometriya Interaktiv Slaydlari',
    category: 'school',
    categoryLabelUz: 'Maktab va umumiy ta’lim',
    categoryLabelRu: 'Школа и образование',
    categoryLabelEn: 'School & Education',
    previewColor: 'from-cyan-600 to-blue-700',
    slideCount: 15,
    isPremium: true,
    downloads: 980,
    rating: 4.85,
    tags: ['matematika', 'formulalar', 'diagramma']
  },
  {
    id: 'tpl-sch-3',
    title: 'Boshlang‘ich Sinf Qiziqarli Viktorinalari',
    category: 'school',
    categoryLabelUz: 'Maktab va umumiy ta’lim',
    categoryLabelRu: 'Школа и образование',
    categoryLabelEn: 'School & Education',
    previewColor: 'from-amber-500 to-orange-600',
    slideCount: 10,
    isPremium: false,
    downloads: 2100,
    rating: 4.92,
    tags: ['boshlangich', 'o‘yin', 'savol-javob']
  },

  // University & Research (700)
  {
    id: 'tpl-uni-1',
    title: 'Magistrlik va Dissertatsiya Himoyasi',
    category: 'university',
    categoryLabelUz: 'Universitet va ilmiy tadqiqotlar',
    categoryLabelRu: 'Университет и наука',
    categoryLabelEn: 'University & Research',
    previewColor: 'from-slate-800 to-indigo-900',
    slideCount: 20,
    isPremium: true,
    downloads: 1850,
    rating: 4.96,
    tags: ['dissertatsiya', 'ilmiy ish', 'himoya', 'diplom']
  },
  {
    id: 'tpl-uni-2',
    title: 'Xalqaro Ilmiy Konferensiya Taqdimoti',
    category: 'university',
    categoryLabelUz: 'Universitet va ilmiy tadqiqotlar',
    categoryLabelRu: 'Университет и наука',
    categoryLabelEn: 'University & Research',
    previewColor: 'from-blue-900 to-teal-800',
    slideCount: 18,
    isPremium: false,
    downloads: 1220,
    rating: 4.88,
    tags: ['konferensiya', 'tadqiqot', 'akademik']
  },

  // Business & Marketing (600)
  {
    id: 'tpl-biz-1',
    title: 'Startap Pitch Deck va Investorlar Uchun Prezentatsiya',
    category: 'business',
    categoryLabelUz: 'Biznes va marketing',
    categoryLabelRu: 'Бизнес и маркетинг',
    categoryLabelEn: 'Business & Marketing',
    previewColor: 'from-violet-700 to-purple-900',
    slideCount: 16,
    isPremium: true,
    downloads: 3200,
    rating: 4.98,
    tags: ['startap', 'investor', 'pitch deck', 'moliya']
  },
  {
    id: 'tpl-biz-2',
    title: 'Marketing Strategiyasi va Brend Rivoji',
    category: 'business',
    categoryLabelUz: 'Biznes va marketing',
    categoryLabelRu: 'Бизнес и маркетинг',
    categoryLabelEn: 'Business & Marketing',
    previewColor: 'from-rose-600 to-pink-800',
    slideCount: 14,
    isPremium: false,
    downloads: 1640,
    rating: 4.87,
    tags: ['marketing', 'brend', 'savdo', 'mijozlar']
  },

  // IT & Technology (500)
  {
    id: 'tpl-it-1',
    title: 'Sun’iy Intellekt va Neyrotarmoqlar Tahlili',
    category: 'it',
    categoryLabelUz: 'IT va texnologiyalar',
    categoryLabelRu: 'IT и технологии',
    categoryLabelEn: 'IT & Technology',
    previewColor: 'from-emerald-600 to-cyan-800',
    slideCount: 15,
    isPremium: true,
    downloads: 2450,
    rating: 4.94,
    tags: ['ai', 'neyrotarmoq', 'dasturlash', 'texnologiya']
  },
  {
    id: 'tpl-it-2',
    title: 'Kiberxavfsizlik va Bulutli Arxitektura',
    category: 'it',
    categoryLabelUz: 'IT va texnologiyalar',
    categoryLabelRu: 'IT и технологии',
    categoryLabelEn: 'IT & Technology',
    previewColor: 'from-gray-900 to-blue-950',
    slideCount: 16,
    isPremium: false,
    downloads: 1390,
    rating: 4.89,
    tags: ['xavfsizlik', 'cloud', 'server', 'devops']
  },

  // Medicine & Biology (500)
  {
    id: 'tpl-med-1',
    title: 'Klinik Tibbiyot va Kasalliklar Diagnostikasi',
    category: 'medicine',
    categoryLabelUz: 'Tibbiyot va biologiya',
    categoryLabelRu: 'Медицина и биология',
    categoryLabelEn: 'Medicine & Biology',
    previewColor: 'from-teal-600 to-emerald-800',
    slideCount: 18,
    isPremium: true,
    downloads: 1720,
    rating: 4.93,
    tags: ['tibbiyot', 'anatomiya', 'klinika', 'dorilar']
  },

  // History & Geography (400)
  {
    id: 'tpl-his-1',
    title: 'Amir Temur Davlati va Buyuk Ipak Yo‘li',
    category: 'history',
    categoryLabelUz: 'Tarix va geografiya',
    categoryLabelRu: 'История и география',
    categoryLabelEn: 'History & Geography',
    previewColor: 'from-amber-700 to-yellow-900',
    slideCount: 14,
    isPremium: false,
    downloads: 2280,
    rating: 4.95,
    tags: ['tarix', 'ipak yo‘li', 'temuriylar', 'madaniyat']
  },

  // Economics & Finance (400)
  {
    id: 'tpl-eco-1',
    title: 'Bank Tizimi va FinTech Innovatsiyalari',
    category: 'economics',
    categoryLabelUz: 'Iqtisodiyot va moliya',
    categoryLabelRu: 'Экономика и финансы',
    categoryLabelEn: 'Economics & Finance',
    previewColor: 'from-green-700 to-emerald-900',
    slideCount: 15,
    isPremium: true,
    downloads: 1540,
    rating: 4.91,
    tags: ['bank', 'fintech', 'iqtisodiyot', 'investitsiya']
  },

  // Nature & Ecology (300)
  {
    id: 'tpl-eco-2',
    title: 'Global Isish va Yashil Energetika',
    category: 'ecology',
    categoryLabelUz: 'Tabiat va ekologiya',
    categoryLabelRu: 'Природа и экология',
    categoryLabelEn: 'Nature & Ecology',
    previewColor: 'from-emerald-700 to-lime-800',
    slideCount: 12,
    isPremium: false,
    downloads: 1110,
    rating: 4.86,
    tags: ['ekologiya', 'tabiat', 'quyosh panellari', 'iqlim']
  },

  // Minimalist & Corporate (500)
  {
    id: 'tpl-min-1',
    title: 'Minimalist Clean White & Dark Accent',
    category: 'minimalist',
    categoryLabelUz: 'Minimalist va korporativ',
    categoryLabelRu: 'Минимализм и корпоративный',
    categoryLabelEn: 'Minimalist & Corporate',
    previewColor: 'from-slate-900 to-black',
    slideCount: 22,
    isPremium: true,
    downloads: 4100,
    rating: 4.99,
    tags: ['minimalizm', 'zamonaviy', 'toza', 'elegans']
  },

  // Creative & Art (500)
  {
    id: 'tpl-cre-1',
    title: 'Kreativ Portfoli va Dizayn Ko‘rgazmasi',
    category: 'creative',
    categoryLabelUz: 'Kreativ, san’at va dizayn',
    categoryLabelRu: 'Креатив и искусство',
    categoryLabelEn: 'Creative & Art',
    previewColor: 'from-fuchsia-600 to-pink-700',
    slideCount: 16,
    isPremium: false,
    downloads: 1980,
    rating: 4.92,
    tags: ['portfoli', 'san’at', 'grafika', 'kreativ']
  }
];

export const INITIAL_PAYMENTS: PaymentOrder[] = [
  {
    orderId: 'ORD-894102',
    userId: '8392014820',
    userName: 'Jamshid Beknazarov',
    userEmail: 'jamshid.student@gmail.com',
    category: 'course',
    itemTitle: 'DTM va SAT Oliy Matematika Intensiv Kursi',
    itemId: 'c-1',
    amountUZS: 450000,
    recipientType: 'teacher',
    recipientName: 'Dilshod Karimov',
    recipientCardNumber: '9860 1904 8820 4491',
    recipientTelegram: 'dilshod_math_uz',
    status: 'approved',
    receiptNote: '9860 kartaga 450 000 so‘m o‘tkazildi. Chek skrinshoti Telegram orqali yuborildi.',
    createdAt: '2026-10-26T11:20:00Z',
    verifiedAt: '2026-10-26T12:00:00Z',
    verifiedBy: 'Dilshod Karimov (O\'qituvchi)'
  },
  {
    orderId: 'ORD-772910',
    userId: '7192083910',
    userName: 'Azizbek Qodirov',
    userEmail: 'azizbek.ai@gmail.com',
    category: 'subscription',
    itemTitle: 'Student Pro Yillik AI Obunasi',
    amountUZS: 120000,
    recipientType: 'admin',
    recipientName: 'BilimHub Boshqaruv / Bosh Admin',
    recipientCardNumber: '8600 5304 9921 4410',
    recipientTelegram: 'BilimHubAdmin',
    status: 'approved',
    receiptNote: 'Humo orqali to‘landi.',
    createdAt: '2026-10-27T08:15:00Z',
    verifiedAt: '2026-10-27T08:45:00Z',
    verifiedBy: 'Super Admin (fudbol045@gmail.com)'
  },
  {
    orderId: 'ORD-651039',
    userId: '6291038491',
    userName: 'Malika Karimova',
    userEmail: 'malika.study@mail.ru',
    category: 'advertisement',
    itemTitle: 'Standard Reklama — 7 kunlik joylashtirish',
    amountUZS: 25000,
    recipientType: 'admin',
    recipientName: 'BilimHub Boshqaruv / Bosh Admin',
    recipientCardNumber: '8600 5304 9921 4410',
    recipientTelegram: 'BilimHubAdmin',
    status: 'checking',
    receiptNote: 'Click orqali to‘lov qilindi. Chek kodi: 94018274.',
    createdAt: '2026-10-28T02:00:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-28T00:00:00Z',
    performedBy: 'fudbol045@gmail.com',
    action: 'SYSTEM_STARTUP',
    target: 'BilimHub AI Core Platform',
    details: 'Super administrator xavfsizlik protokollari va Telegram to‘lov shlyuzlari faollashtirildi.'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-27T18:30:00Z',
    performedBy: 'fudbol045@gmail.com',
    action: 'TEMPLATE_CATALOG_SYNC',
    target: '5,200 Slide Templates',
    details: '10 ta kategoriya bo‘yicha 5 200 ta slayd shablonlari indeksi va metadata tasdiqlandi.'
  },
  {
    id: 'log-3',
    timestamp: '2026-10-27T14:10:00Z',
    performedBy: 'dilshod_math_uz',
    action: 'PAYMENT_APPROVED',
    target: 'Order ORD-894102',
    details: 'Matematika kursi uchun 450 000 so‘m to‘lov tasdiqlandi va o‘quvchi guruhga biriktirildi.'
  }
];

export const SAMPLE_QUIZZES: Quiz[] = [
  {
    id: 'q-1',
    title: 'Matematika: Funksiyalar va Hosilalar Testi',
    subject: 'Matematika',
    gradeLevel: '10-11 sinf / Abituriyent',
    difficulty: 'medium',
    createdAt: '2026-10-25',
    questions: [
      {
        id: 'q1-1',
        question: 'f(x) = 3x² - 5x + 7 funksiyasining x = 2 nuqtadagi hosilasini toping.',
        options: ['7', '12', '1', '19'],
        correctAnswerIndex: 0,
        explanation: 'f\'(x) = 6x - 5. x = 2 bo‘lganda: f\'(2) = 6*(2) - 5 = 12 - 5 = 7.'
      },
      {
        id: 'q1-2',
        question: 'Quyidagi sonlardan qaysi biri tub son hisoblanadi?',
        options: ['91', '51', '97', '87'],
        correctAnswerIndex: 2,
        explanation: '97 faqat 1 va o‘ziga bo‘linadi (tub son). 91 = 7*13, 51 = 3*17, 87 = 3*29.'
      },
      {
        id: 'q1-3',
        question: 'Tenglamani yeching: 2^(x+1) = 32',
        options: ['x = 4', 'x = 5', 'x = 3', 'x = 6'],
        correctAnswerIndex: 0,
        explanation: '32 = 2^5. Demak x + 1 = 5 => x = 4.'
      },
      {
        id: 'q1-4',
        question: 'To‘g‘ri burchakli uchburchakning katetlari 6 va 8 ga teng. Gipotenuzasini toping.',
        options: ['12', '10', '14', '100'],
        correctAnswerIndex: 1,
        explanation: 'Pifagor teoremasi: c² = a² + b² = 6² + 8² = 36 + 64 = 100. c = √100 = 10.'
      },
      {
        id: 'q1-5',
        question: 'log₂(64) ifodaning qiymatini toping.',
        options: ['4', '8', '6', '32'],
        correctAnswerIndex: 2,
        explanation: '2^6 = 64 bo‘lgani sababli, log₂(64) = 6.'
      }
    ]
  },
  {
    id: 'q-2',
    title: 'Informatika va Sun’iy Intellekt Asoslari',
    subject: 'Informatika',
    gradeLevel: 'Bakalavr / IT',
    difficulty: 'hard',
    createdAt: '2026-10-26',
    questions: [
      {
        id: 'q2-1',
        question: 'Neyrotarmoqlarda gradient tushishi (Gradient Descent) qanday vazifani bajaradi?',
        options: [
          'Vaznlarni yangilab xatolik funksiyasini minimallashtiradi',
          'Ma’lumotlar bazasini indekslaydi',
          'Kompilyatsiya vaqtini tezlashtiradi',
          'Rasmlarni siqish uchun xizmat qiladi'
        ],
        correctAnswerIndex: 0,
        explanation: 'Gradient tushishi loss funksiyasining minimumini topish uchun parametrlarni qadamma-qadam sozlaydi.'
      },
      {
        id: 'q2-2',
        question: 'Python dasturlash tilida qaysi ma’lumot turi o‘zgarmas (immutable) hisoblanadi?',
        options: ['list', 'dict', 'tuple', 'set'],
        correctAnswerIndex: 2,
        explanation: 'Tuple (kortej) yaratilgandan keyin uning elementlarini o‘zgartirib bo‘lmaydi.'
      },
      {
        id: 'q2-3',
        question: 'Relyatsion ma’lumotlar bazasida birlamchi kalit (PRIMARY KEY) qanday talabga javob berishi kerak?',
        options: [
          'Har doim matnli bo‘lishi',
          'Noyob (unique) va NULL bo‘lmasligi',
          'Faqat musbat juft son bo‘lishi',
          'Har bir jadvalda kamida 5 ta bo‘lishi'
        ],
        correctAnswerIndex: 1,
        explanation: 'Birlamchi kalit har bir yozuvni yagona identifikatsiya qilishi uchun UNIQUE va NOT NULL bo‘lishi shart.'
      }
    ]
  }
];

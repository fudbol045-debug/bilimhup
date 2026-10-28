import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  User, 
  UserRole, 
  Teacher, 
  Course, 
  AdPackage, 
  Advertisement, 
  SlideTemplate, 
  PaymentOrder, 
  PaymentStatus,
  PaymentCategory,
  AuditLog,
  Presentation,
  HomeworkSolution,
  GeneratedDoc,
  Quiz
} from '../types';
import { translations } from '../data/translations';
import { 
  INITIAL_TEACHERS, 
  INITIAL_COURSES, 
  INITIAL_AD_PACKAGES, 
  INITIAL_ADS, 
  INITIAL_SLIDE_TEMPLATES, 
  INITIAL_PAYMENTS, 
  INITIAL_AUDIT_LOGS,
  SAMPLE_QUIZZES
} from '../data/initialData';
import { generate10DigitId, isSuperAdminEmail, determinePaymentRecipient } from '../utils/rules';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;

  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  loginWithGoogleOrApple: (email: string, name?: string) => void;
  switchUserRoleForDemo: (role: UserRole) => void;
  logout: () => void;

  teachers: Teacher[];
  updateTeacher: (teacher: Teacher) => void;

  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  enrollInCourse: (courseId: string) => void;

  adPackages: AdPackage[];
  updateAdPackage: (pkg: AdPackage) => void;

  ads: Advertisement[];
  submitAd: (adData: Omit<Advertisement, 'id' | 'createdAt' | 'status' | 'viewsCount' | 'clicksCount' | 'paymentOrderId'>) => PaymentOrder;
  moderateAd: (adId: string, status: 'active' | 'rejected', reason?: string) => void;

  slideTemplates: SlideTemplate[];
  totalTemplatesCatalogCount: number;

  paymentOrders: PaymentOrder[];
  initiatePayment: (params: {
    category: PaymentCategory;
    itemTitle: string;
    itemId?: string;
    amountUZS: number;
    courseTeacherId?: string;
  }) => PaymentOrder;
  updatePaymentStatus: (orderId: string, status: PaymentStatus, rejectionReason?: string) => void;
  activePaymentModal: PaymentOrder | null;
  setActivePaymentModal: (order: PaymentOrder | null) => void;

  presentations: Presentation[];
  savePresentation: (presentation: Presentation) => void;
  deletePresentation: (id: string) => void;

  homeworks: HomeworkSolution[];
  saveHomework: (hw: HomeworkSolution) => void;

  documents: GeneratedDoc[];
  saveDocument: (doc: GeneratedDoc) => void;

  quizzes: Quiz[];
  saveQuiz: (quiz: Quiz) => void;

  auditLogs: AuditLog[];
  logAction: (action: string, target: string, details: string) => void;

  adminSettings: {
    adminCard: string;
    adminCardHolder: string;
    adminTelegram: string;
    superAdminEmail: string;
    siteTitle: string;
    centerPhone: string;
    centerAddress: string;
  };
  updateAdminSettings: (newSettings: Partial<AppContextType['adminSettings']>) => void;

  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'bilimhub_v1_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}lang`) as Language) || 'uz';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}lang`, lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['uz']?.[key] || key;
  };

  // 2. User state with guaranteed 10-digit unique ID
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}user`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    const newId = generate10DigitId();
    return {
      id: newId,
      name: 'Azizbek Talaba',
      email: 'azizbek@bilimhub.uz',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: 'student',
      phone: '+998 (90) 876-54-32',
      telegramUsername: '@azizbek_student',
      credits: 25,
      subscriptionPlan: 'free',
      enrolledCourseIds: ['c-1'],
      createdAt: new Date().toISOString()
    };
  });

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}user`, JSON.stringify(currentUser));
  }, [currentUser]);

  // 3. Database collections state
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}teachers`);
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}courses`);
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [adPackages, setAdPackages] = useState<AdPackage[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}ad_packages`);
    return saved ? JSON.parse(saved) : INITIAL_AD_PACKAGES;
  });

  const [ads, setAds] = useState<Advertisement[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}ads`);
    return saved ? JSON.parse(saved) : INITIAL_ADS;
  });

  const [slideTemplates] = useState<SlideTemplate[]>(INITIAL_SLIDE_TEMPLATES);

  const [paymentOrders, setPaymentOrders] = useState<PaymentOrder[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}payments`);
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [presentations, setPresentations] = useState<Presentation[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}presentations`);
    return saved ? JSON.parse(saved) : [];
  });

  const [homeworks, setHomeworks] = useState<HomeworkSolution[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}homeworks`);
    return saved ? JSON.parse(saved) : [];
  });

  const [documents, setDocuments] = useState<GeneratedDoc[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}docs`);
    return saved ? JSON.parse(saved) : [];
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}quizzes`);
    return saved ? JSON.parse(saved) : SAMPLE_QUIZZES;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}audit_logs`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [adminSettings, setAdminSettings] = useState({
    adminCard: '8600 5304 9921 4410',
    adminCardHolder: 'BilimHub Admin / Moliya Bo\'limi',
    adminTelegram: 'BilimHubAdmin',
    superAdminEmail: 'fudbol045@gmail.com',
    siteTitle: 'BilimHub AI — Ta\'lim va Sun\'iy Intellekt Platformasi',
    centerPhone: '+998 (71) 200-45-45',
    centerAddress: 'Toshkent shahri, Yunusobod tumani, Amir Temur ko‘chasi, 107-B'
  });

  const [activePaymentModal, setActivePaymentModal] = useState<PaymentOrder | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const logAction = (action: string, target: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      performedBy: currentUser.email || currentUser.id,
      action,
      target,
      details,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Sync collections to local storage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}teachers`, JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}courses`, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}ads`, JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}payments`, JSON.stringify(paymentOrders));
  }, [paymentOrders]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}presentations`, JSON.stringify(presentations));
  }, [presentations]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}homeworks`, JSON.stringify(homeworks));
  }, [homeworks]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}docs`, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}quizzes`, JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}audit_logs`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Auth functions
  const loginWithGoogleOrApple = (email: string, name?: string) => {
    const isSuper = isSuperAdminEmail(email);
    const existingId = currentUser.id || generate10DigitId();
    const updatedUser: User = {
      id: existingId,
      name: name || (isSuper ? 'Super Administrator' : email.split('@')[0]),
      email: email.trim(),
      role: isSuper ? 'superadmin' : 'student',
      credits: isSuper ? 999999 : 50,
      subscriptionPlan: isSuper ? 'vip' : 'free',
      enrolledCourseIds: currentUser.enrolledCourseIds || [],
      createdAt: currentUser.createdAt || new Date().toISOString()
    };
    setCurrentUser(updatedUser);
    logAction('USER_LOGIN', email, `Kirish amalga oshirildi. Rol: ${updatedUser.role}`);
    showToast(`Hush kelibsiz, ${updatedUser.name}! (${updatedUser.role})`, 'success');
  };

  const switchUserRoleForDemo = (role: UserRole) => {
    const isSuper = role === 'superadmin';
    const email = isSuper ? 'fudbol045@gmail.com' : `${role}@bilimhub.uz`;
    const updated: User = {
      ...currentUser,
      role,
      email,
      name: isSuper ? 'Super Admin (fudbol045)' : `${role.toUpperCase()} Foydalanuvchi`,
      credits: isSuper ? 999999 : (role === 'teacher' ? 500 : 30)
    };
    setCurrentUser(updated);
    logAction('ROLE_SWITCH', role, `Rol almashtirildi: ${role}`);
    showToast(`Rol o'zgartirildi: ${role}`, 'info');
  };

  const logout = () => {
    const freshId = generate10DigitId();
    const guestUser: User = {
      id: freshId,
      name: 'Mehmon Foydalanuvchi',
      email: '',
      role: 'guest',
      credits: 10,
      subscriptionPlan: 'free',
      enrolledCourseIds: [],
      createdAt: new Date().toISOString()
    };
    setCurrentUser(guestUser);
    showToast('Tizimdan chiqildi', 'info');
  };

  // Teacher methods
  const updateTeacher = (updated: Teacher) => {
    setTeachers(prev => prev.map(t => t.id === updated.id ? updated : t));
    logAction('TEACHER_UPDATED', updated.name, `O'qituvchi ma'lumotlari va rekvizitlari yangilandi`);
    showToast('O‘qituvchi ma’lumotlari saqlandi', 'success');
  };

  // Course methods
  const addCourse = (course: Course) => {
    setCourses(prev => [course, ...prev]);
    logAction('COURSE_CREATED', course.title, `Yangi kurs qo'shildi`);
    showToast('Yangi kurs muvaffaqiyatli qo‘shildi', 'success');
  };

  const updateCourse = (updated: Course) => {
    setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
    logAction('COURSE_UPDATED', updated.title, `Kurs yangilandi`);
    showToast('Kurs ma’lumotlari yangilandi', 'success');
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    logAction('COURSE_DELETED', id, `Kurs o'chirildi`);
    showToast('Kurs o‘chirildi', 'info');
  };

  const enrollInCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const teacher = teachers.find(t => t.id === course.teacherId);
    // Trigger Telegram payment workflow
    const order = initiatePayment({
      category: 'course',
      itemTitle: course.title,
      itemId: course.id,
      amountUZS: course.priceUZS,
      courseTeacherId: teacher?.id
    });
    setActivePaymentModal(order);
  };

  // Payment workflow
  const initiatePayment = (params: {
    category: PaymentCategory;
    itemTitle: string;
    itemId?: string;
    amountUZS: number;
    courseTeacherId?: string;
  }): PaymentOrder => {
    const courseTeacher = params.courseTeacherId 
      ? teachers.find(t => t.id === params.courseTeacherId) 
      : null;

    const recipient = determinePaymentRecipient(
      params.category, 
      courseTeacher, 
      {
        name: adminSettings.adminCardHolder,
        cardNumber: adminSettings.adminCard,
        telegram: adminSettings.adminTelegram
      }
    );

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ORD-${randomSuffix}`;

    const newOrder: PaymentOrder = {
      orderId,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email || `${currentUser.id}@guest.bilimhub.uz`,
      category: params.category,
      itemTitle: params.itemTitle,
      itemId: params.itemId,
      amountUZS: params.amountUZS,
      recipientType: recipient.recipientType,
      recipientName: recipient.recipientName,
      recipientCardNumber: recipient.recipientCardNumber,
      recipientTelegram: recipient.recipientTelegram,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setPaymentOrders(prev => [newOrder, ...prev]);
    logAction('PAYMENT_INITIATED', orderId, `${params.itemTitle} (${params.amountUZS} so'm) uchun to'lov arizasi yaratildi`);
    return newOrder;
  };

  const updatePaymentStatus = (orderId: string, status: PaymentStatus, rejectionReason?: string) => {
    setPaymentOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          status,
          rejectionReason,
          verifiedAt: new Date().toISOString(),
          verifiedBy: currentUser.email || currentUser.name
        };
      }
      return o;
    }));

    // If approved, fulfill the service
    const targetOrder = paymentOrders.find(o => o.orderId === orderId);
    if (targetOrder && status === 'approved') {
      if (targetOrder.category === 'course' && targetOrder.itemId) {
        // Enroll user in course
        setCurrentUser(u => ({
          ...u,
          enrolledCourseIds: Array.from(new Set([...u.enrolledCourseIds, targetOrder.itemId!]))
        }));
      } else if (targetOrder.category === 'subscription') {
        setCurrentUser(u => ({
          ...u,
          subscriptionPlan: 'premium',
          credits: u.credits + 200
        }));
      } else if (targetOrder.category === 'credits') {
        setCurrentUser(u => ({
          ...u,
          credits: u.credits + 100
        }));
      } else if (targetOrder.category === 'advertisement' && targetOrder.itemId) {
        // Activate ad
        setAds(prev => prev.map(ad => ad.id === targetOrder.itemId ? { ...ad, status: 'active' } : ad));
      }
    }

    logAction('PAYMENT_STATUS_CHANGE', orderId, `Holat o'zgardi: ${status}${rejectionReason ? ` (${rejectionReason})` : ''}`);
    showToast(`To'lov holati yangilandi: ${status}`, status === 'approved' ? 'success' : 'info');
  };

  // Ads methods
  const submitAd = (adData: Omit<Advertisement, 'id' | 'createdAt' | 'status' | 'viewsCount' | 'clicksCount' | 'paymentOrderId'>): PaymentOrder => {
    const pkg = adPackages.find(p => p.code === adData.packageCode) || adPackages[0];
    const adId = `ad-${Date.now()}`;
    
    // Create payment order for Admin
    const order = initiatePayment({
      category: 'advertisement',
      itemTitle: `Reklama: ${adData.title} (${pkg.nameUz})`,
      itemId: adId,
      amountUZS: pkg.priceUZS
    });

    const newAd: Advertisement = {
      ...adData,
      id: adId,
      status: 'pending',
      paymentOrderId: order.orderId,
      viewsCount: 0,
      clicksCount: 0,
      createdAt: new Date().toISOString()
    };

    setAds(prev => [newAd, ...prev]);
    logAction('AD_SUBMITTED', adData.title, `Yangi reklama arizasi yuborildi (${pkg.priceUZS} so'm)`);
    showToast('Reklama arizasi qabul qilindi. To‘lov bosqichiga o‘tildi.', 'success');
    return order;
  };

  const moderateAd = (adId: string, status: 'active' | 'rejected', reason?: string) => {
    setAds(prev => prev.map(ad => {
      if (ad.id === adId) {
        return {
          ...ad,
          status,
          rejectionReason: reason,
          startsAt: status === 'active' ? new Date().toISOString() : ad.startsAt,
        };
      }
      return ad;
    }));
    logAction('AD_MODERATED', adId, `Reklama moderatsiyasi: ${status}`);
    showToast(`Reklama ${status === 'active' ? 'tasdiqlandi va chop etildi' : 'rad etildi'}`, 'info');
  };

  const updateAdPackage = (updatedPkg: AdPackage) => {
    setAdPackages(prev => prev.map(p => p.id === updatedPkg.id ? updatedPkg : p));
    logAction('AD_PACKAGE_UPDATED', updatedPkg.nameUz, `Tarif narxi yoki shartlari yangilandi: ${updatedPkg.priceUZS} so'm`);
    showToast('Reklama tarifi saqlandi', 'success');
  };

  // Presentation saving
  const savePresentation = (pres: Presentation) => {
    setPresentations(prev => {
      const idx = prev.findIndex(p => p.id === pres.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = pres;
        return next;
      }
      return [pres, ...prev];
    });
    showToast('Taqdimot saqlandi', 'success');
  };

  const deletePresentation = (id: string) => {
    setPresentations(prev => prev.filter(p => p.id !== id));
    showToast('Taqdimot o‘chirildi', 'info');
  };

  // Homework saving
  const saveHomework = (hw: HomeworkSolution) => {
    setHomeworks(prev => [hw, ...prev]);
    showToast('Uy vazifasi yechimi kabinetga saqlandi', 'success');
  };

  // Document saving
  const saveDocument = (doc: GeneratedDoc) => {
    setDocuments(prev => [doc, ...prev]);
    showToast('Akademik hujjat kabinetga saqlandi', 'success');
  };

  // Quiz saving
  const saveQuiz = (quiz: Quiz) => {
    setQuizzes(prev => [quiz, ...prev]);
    showToast('Yangi test to‘plami yaratildi', 'success');
  };

  // Admin settings
  const updateAdminSettings = (newSettings: Partial<typeof adminSettings>) => {
    setAdminSettings(prev => ({ ...prev, ...newSettings }));
    logAction('ADMIN_SETTINGS_UPDATED', 'Platform Settings', `To'lov rekvizitlari yoki aloqa ma'lumotlari yangilandi`);
    showToast('Tizim sozlamalari yangilandi', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentUser,
        setCurrentUser,
        loginWithGoogleOrApple,
        switchUserRoleForDemo,
        logout,
        teachers,
        updateTeacher,
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        enrollInCourse,
        adPackages,
        updateAdPackage,
        ads,
        submitAd,
        moderateAd,
        slideTemplates,
        totalTemplatesCatalogCount: 5200,
        paymentOrders,
        initiatePayment,
        updatePaymentStatus,
        activePaymentModal,
        setActivePaymentModal,
        presentations,
        savePresentation,
        deletePresentation,
        homeworks,
        saveHomework,
        documents,
        saveDocument,
        quizzes,
        saveQuiz,
        auditLogs,
        logAction,
        adminSettings,
        updateAdminSettings,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

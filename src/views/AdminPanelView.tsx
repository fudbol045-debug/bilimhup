import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrencyUZS, canManageRole, SUPER_ADMIN_EMAIL } from '../utils/rules';
import { UserRole, PaymentStatus, Course } from '../types';
import { 
  ShieldAlert, 
  ShieldCheck, 
  CreditCard, 
  Users, 
  BookOpen, 
  Megaphone, 
  Layers, 
  Settings, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Send, 
  Plus, 
  Trash2, 
  Edit3, 
  Lock, 
  Unlock, 
  BarChart3, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const AdminPanelView: React.FC = () => {
  const { 
    currentUser, 
    paymentOrders, 
    updatePaymentStatus, 
    courses, 
    addCourse, 
    updateCourse, 
    deleteCourse, 
    teachers, 
    updateTeacher, 
    ads, 
    moderateAd, 
    adPackages, 
    updateAdPackage, 
    adminSettings, 
    updateAdminSettings, 
    auditLogs, 
    showToast 
  } = useApp();

  const isSuperAdmin = currentUser.role === 'superadmin' || currentUser.email === SUPER_ADMIN_EMAIL;

  const [activeTab, setActiveTab] = useState<
    'stats' | 'payments' | 'ads' | 'courses' | 'teachers' | 'packages' | 'settings' | 'audit'
  >('payments');

  // Payment filters & Reject modal
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'pending' | 'checking' | 'approved' | 'rejected'>('all');
  const [rejectModalOrder, setRejectModalOrder] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Course Add/Edit modal
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Stats calculation
  const totalApprovedSum = paymentOrders
    .filter(o => o.status === 'approved')
    .reduce((acc, curr) => acc + curr.amountUZS, 0);

  const pendingPaymentsCount = paymentOrders.filter(o => o.status === 'pending' || o.status === 'checking').length;
  const pendingAdsCount = ads.filter(a => a.status === 'pending').length;

  const handleApprovePayment = (orderId: string) => {
    updatePaymentStatus(orderId, 'approved');
  };

  const handleOpenRejectPayment = (orderId: string) => {
    setRejectModalOrder(orderId);
    setRejectionReason('To‘lov summasi hisobga kelib tushmadi yoki kvitansiya noto‘g‘ri.');
  };

  const handleConfirmRejectPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectModalOrder) return;
    updatePaymentStatus(rejectModalOrder, 'rejected', rejectionReason);
    setRejectModalOrder(null);
    setRejectionReason('');
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    if (courses.some(c => c.id === editingCourse.id)) {
      updateCourse(editingCourse);
    } else {
      addCourse(editingCourse);
    }
    setCourseModalOpen(false);
    setEditingCourse(null);
  };

  const handleOpenNewCourse = () => {
    setEditingCourse({
      id: `c-${Date.now()}`,
      title: '',
      description: '',
      category: 'Aniq fanlar',
      teacherId: teachers[0]?.id || 't-1',
      teacherName: teachers[0]?.name || 'Ustoz',
      teacherPhoto: teachers[0]?.photo || '',
      priceUZS: 400000,
      durationMonths: 6,
      weeklySchedule: 'Dushanba, Chorshanba, Juma 18:00 - 20:00',
      startDate: '2026-11-15',
      maxStudents: 25,
      enrolledCount: 0,
      language: 'uz',
      isActive: true,
      level: 'O\'rtacha'
    });
    setCourseModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Super Admin Top Badge & Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-600/20 border border-rose-500/40 text-rose-400 flex items-center justify-center">
            {isSuperAdmin ? <ShieldCheck className="w-8 h-8 text-rose-400" /> : <ShieldAlert className="w-8 h-8 text-indigo-400" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
                {isSuperAdmin ? 'Super Administrator' : 'Administrator'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentUser.email || SUPER_ADMIN_EMAIL}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">
              Boshqaruv va Moderatsiya Paneli
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              To‘lovlar tasdiqlanishi, reklamalar moderatsiyasi, kurslar, slaydlar va Telegram sozlamalari
            </p>
          </div>
        </div>

        {/* Quick summary badges */}
        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 text-center">
            <span className="text-xs text-slate-400 block font-medium">Kutilayotgan to‘lovlar</span>
            <span className="text-lg font-black text-amber-400 font-mono">{pendingPaymentsCount}</span>
          </div>
          <div className="px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 text-center">
            <span className="text-xs text-slate-400 block font-medium">Yangi reklamalar</span>
            <span className="text-lg font-black text-blue-400 font-mono">{pendingAdsCount}</span>
          </div>
        </div>
      </div>

      {/* Admin Subtabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'payments', label: `To‘lovlar tekshiruvi (${pendingPaymentsCount})`, icon: CreditCard },
          { id: 'ads', label: `Reklamalar moderatsiyasi (${pendingAdsCount})`, icon: Megaphone },
          { id: 'courses', label: `Kurslar boshqaruvi (${courses.length})`, icon: BookOpen },
          { id: 'teachers', label: `O‘qituvchilar (${teachers.length})`, icon: Users },
          { id: 'packages', label: '5 ta Reklama tarifi', icon: BarChart3 },
          { id: 'settings', label: 'Telegram & Karta sozlamasi', icon: Settings },
          { id: 'audit', label: `Xavfsizlik loglari (${auditLogs.length})`, icon: FileText },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Payments Verification */}
      {activeTab === 'payments' && (
        <div className="space-y-6 animate-fade-in">
          {/* Filters & Revenue summary */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {(['all', 'pending', 'checking', 'approved', 'rejected'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setPaymentFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                    paymentFilter === st
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {st === 'all' ? 'Barcha arizalar' : st}
                </button>
              ))}
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 font-medium block">Tasdiqlangan umumiy tushum:</span>
              <span className="text-xl font-black text-emerald-600 font-mono">
                {formatCurrencyUZS(totalApprovedSum)}
              </span>
            </div>
          </div>

          {/* Payment list table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                    <th className="p-4">Buyurtma & ID</th>
                    <th className="p-4">Mijoz ma’lumoti</th>
                    <th className="p-4">Xizmat / Kurs</th>
                    <th className="p-4">Summa</th>
                    <th className="p-4">To‘lov oluvchi</th>
                    <th className="p-4">Holat</th>
                    <th className="p-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {paymentOrders
                    .filter(o => paymentFilter === 'all' || o.status === paymentFilter)
                    .map(order => {
                      const isPending = order.status === 'pending' || order.status === 'checking';
                      return (
                        <tr key={order.orderId} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4">
                            <span className="font-bold font-mono text-slate-900 block">{order.orderId}</span>
                            <span className="font-mono text-amber-900 font-bold bg-amber-100 px-1.5 py-0.5 rounded text-[11px]">
                              ID: {order.userId}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-bold block">{order.userName}</span>
                            <span className="text-xs text-slate-500 font-mono">{order.userEmail}</span>
                          </td>
                          <td className="p-4 max-w-xs">
                            <span className="font-semibold block line-clamp-1">{order.itemTitle}</span>
                            <span className="text-[11px] text-slate-500 uppercase">{order.category}</span>
                          </td>
                          <td className="p-4 font-black font-mono text-blue-700">
                            {formatCurrencyUZS(order.amountUZS)}
                          </td>
                          <td className="p-4">
                            <span className="font-semibold block">{order.recipientName}</span>
                            <span className="text-[11px] text-indigo-700 font-mono block">
                              @{order.recipientTelegram} ({order.recipientType === 'teacher' ? 'Ustoz' : 'Admin'})
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              order.status === 'approved' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : order.status === 'rejected'
                                ? 'bg-rose-100 text-rose-800'
                                : order.status === 'checking'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {order.status}
                            </span>
                            {order.rejectionReason && (
                              <span className="text-[10px] text-rose-700 block mt-1 line-clamp-1">
                                {order.rejectionReason}
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            {isPending ? (
                              <div className="flex items-center justify-end space-x-1.5">
                                <button
                                  onClick={() => handleApprovePayment(order.orderId)}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                                  title="To‘lov tushganini tasdiqlash"
                                >
                                  Tasdiqlash
                                </button>
                                <button
                                  onClick={() => handleOpenRejectPayment(order.orderId)}
                                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                                  title="To‘lovni rad etish"
                                >
                                  Rad etish
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400 font-mono">
                                {order.verifiedBy ? `Tasdiqladi: ${order.verifiedBy.split('@')[0]}` : '—'}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ads Moderation */}
      {activeTab === 'ads' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ads.map(ad => (
              <div key={ad.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-amber-100 text-amber-950 uppercase">
                      {ad.packageCode} tarifi • {formatCurrencyUZS(ad.priceUZS)}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      ad.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ad.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{ad.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ad.description}</p>
                  
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-700">
                    <div>Aloqa: <strong>{ad.contactInfo}</strong></div>
                    <div>Havola: <a href={ad.externalLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">{ad.externalLink}</a></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Ko‘rishlar: {ad.viewsCount}</span>

                  {ad.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => moderateAd(ad.id, 'active')}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                      >
                        Chop etish (Faollashtirish)
                      </button>
                      <button
                        onClick={() => moderateAd(ad.id, 'rejected', 'Mazmuni sayt talablariga mos kelmadi.')}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold"
                      >
                        Rad etish
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Courses Management */}
      {activeTab === 'courses' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800">Barcha o‘quv kurslari ro‘yxati</span>
            <button
              onClick={handleOpenNewCourse}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi kurs qo‘shish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
                      {course.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-blue-800">
                      {formatCurrencyUZS(course.priceUZS)}/oy
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{course.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{course.description}</p>
                  <p className="text-xs text-slate-500">Jadval: {course.weeklySchedule}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">
                    Ustoz: {course.teacherName}
                  </span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => {
                        setEditingCourse(course);
                        setCourseModalOpen(true);
                      }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                      title="Tahrirlash"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                      title="O‘chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Teachers Management */}
      {activeTab === 'teachers' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teachers.map(teacher => (
              <div key={teacher.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-4">
                  <img src={teacher.photo} alt={teacher.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">{teacher.name}</h4>
                    <span className="text-xs text-blue-600 block">{teacher.specialty}</span>
                    <span className="text-xs font-mono text-slate-500">Telegram: @{teacher.telegramUsername}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 font-mono text-slate-700">
                  <div>Karta raqami: <strong>{teacher.cardNumber}</strong></div>
                  <div>Karta egasi: <strong>{teacher.cardHolder}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Ad Packages */}
      {activeTab === 'packages' && (
        <div className="space-y-6 animate-fade-in">
          <span className="text-xs text-slate-500 block">
            Admin panel orqali har bir reklama tarifining narxi va muddatini o‘zgartirish mumkin.
          </span>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {adPackages.map(pkg => (
              <div key={pkg.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase">{pkg.code}</span>
                <h4 className="font-bold text-slate-900 text-sm">{pkg.nameUz}</h4>
                <div className="text-xs font-bold text-blue-700">{formatCurrencyUZS(pkg.priceUZS)}</div>
                <div className="text-[11px] text-slate-500">Muddati: {pkg.durationDays} kun</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Admin Settings & Telegram */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl space-y-6 animate-fade-in">
          <div>
            <h3 className="font-bold text-slate-900 text-base">To‘lov Rekvizitlari va Telegram Sozlamalari</h3>
            <p className="text-xs text-slate-500">
              AI xizmatlari va reklama to‘lovlari tushadigan administrator rekvizitlari
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Admin Humo / Uzcard Karta Raqami
              </label>
              <input
                type="text"
                value={adminSettings.adminCard}
                onChange={e => updateAdminSettings({ adminCard: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Admin Karta Egasi (F.I.O)
              </label>
              <input
                type="text"
                value={adminSettings.adminCardHolder}
                onChange={e => updateAdminSettings({ adminCardHolder: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Admin Telegram Akkaunt (@)
              </label>
              <input
                type="text"
                value={adminSettings.adminTelegram}
                onChange={e => updateAdminSettings({ adminTelegram: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                O‘quv Markazi Aloqa Telefoni
              </label>
              <input
                type="text"
                value={adminSettings.centerPhone}
                onChange={e => updateAdminSettings({ centerPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Security Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-fade-in">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900">Platforma Xavfsizlik Audit Yozuvlari</span>
            <span className="text-slate-500">O‘zgarmas moliyaviy va ma’muriy tarix</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs font-mono">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3.5 hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="font-bold text-blue-700">[{log.action}]</span>{' '}
                  <span className="text-slate-800 font-semibold">{log.target}:</span>{' '}
                  <span className="text-slate-600 font-sans">{log.details}</span>
                </div>
                <div className="text-right text-[11px] text-slate-400 shrink-0">
                  <span>{new Date(log.timestamp).toLocaleTimeString()} • {log.performedBy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reject Payment Reason Modal */}
      {rejectModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">To‘lov arizasini rad etish</h3>
            <p className="text-xs text-slate-500">
              Buyurtma: <strong>{rejectModalOrder}</strong>. Foydalanuvchiga rad etish sababi ko‘rsatiladi.
            </p>

            <form onSubmit={handleConfirmRejectPayment} className="space-y-3">
              <textarea
                rows={3}
                required
                value={rejectionReason}
                onChange={e => setRejectionReason(e.target.value)}
                placeholder="Rad etish sababini yozing..."
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
              />

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectModalOrder(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Rad etishni tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Add / Edit Modal */}
      {courseModalOpen && editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 my-8">
            <h3 className="text-lg font-bold text-slate-900">Kursni Saqlash / Tahrirlash</h3>
            
            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kurs Nomi</label>
                <input
                  type="text"
                  required
                  value={editingCourse.title}
                  onChange={e => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kategoriya</label>
                <input
                  type="text"
                  required
                  value={editingCourse.category}
                  onChange={e => setEditingCourse({ ...editingCourse, category: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Oylik Narxi (UZS)</label>
                  <input
                    type="number"
                    required
                    value={editingCourse.priceUZS}
                    onChange={e => setEditingCourse({ ...editingCourse, priceUZS: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Davomiyligi (oy)</label>
                  <input
                    type="number"
                    required
                    value={editingCourse.durationMonths}
                    onChange={e => setEditingCourse({ ...editingCourse, durationMonths: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Dars Jadvali</label>
                <input
                  type="text"
                  required
                  value={editingCourse.weeklySchedule}
                  onChange={e => setEditingCourse({ ...editingCourse, weeklySchedule: e.target.value })}
                  placeholder="Dushanba, Chorshanba, Juma 18:00 - 20:00"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setCourseModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

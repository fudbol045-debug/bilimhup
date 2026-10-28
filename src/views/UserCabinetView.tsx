import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrencyUZS } from '../utils/rules';
import { 
  User as UserIcon, 
  Copy, 
  Check, 
  BookOpen, 
  Presentation, 
  FileText, 
  GraduationCap, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Eye, 
  Download,
  Calendar
} from 'lucide-react';

interface UserCabinetViewProps {
  setActiveTab: (tab: string) => void;
}

export const UserCabinetView: React.FC<UserCabinetViewProps> = ({ setActiveTab }) => {
  const { 
    currentUser, 
    setCurrentUser, 
    courses, 
    presentations, 
    deletePresentation, 
    homeworks, 
    documents, 
    paymentOrders, 
    showToast 
  } = useApp();

  const [copiedId, setCopiedId] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'courses' | 'presentations' | 'documents' | 'payments'>('overview');

  const handleCopyId = () => {
    navigator.clipboard.writeText(currentUser.id);
    setCopiedId(true);
    showToast(`10 xonali ID nusxalandi: ${currentUser.id}`, 'success');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const myCourses = courses.filter(c => currentUser.enrolledCourseIds.includes(c.id));
  const myOrders = paymentOrders.filter(o => o.userId === currentUser.id);

  const statusBadges: Record<string, { label: string; color: string }> = {
    pending: { label: 'To‘lov kutilmoqda', color: 'bg-amber-100 text-amber-800' },
    checking: { label: 'Tekshirilmoqda', color: 'bg-blue-100 text-blue-800' },
    approved: { label: 'Tasdiqlangan (Faol)', color: 'bg-emerald-100 text-emerald-800' },
    rejected: { label: 'Rad etilgan', color: 'bg-rose-100 text-rose-800' },
    cancelled: { label: 'Bekor qilingan', color: 'bg-slate-100 text-slate-800' },
    refunded: { label: 'Qaytarilgan', color: 'bg-purple-100 text-purple-800' }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            {currentUser.name.charAt(0)}
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-slate-900">{currentUser.name}</h1>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">{currentUser.email || 'Google / Apple ID orqali kirgan'}</p>
            <span className="text-xs text-indigo-700 font-semibold block">
              Tarif: <strong className="uppercase">{currentUser.subscriptionPlan}</strong> • AI Kreditlar: <strong>{currentUser.credits}</strong>
            </span>
          </div>
        </div>

        {/* 10-Digit ID Display Card */}
        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-center space-x-4 shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
              Sizning 10 xonali ID raqamingiz:
            </span>
            <span className="text-2xl font-black font-mono text-amber-950 tracking-wider">
              {currentUser.id}
            </span>
          </div>
          <button
            onClick={handleCopyId}
            className="p-2.5 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-xl transition-colors"
            title="Nusxalash"
          >
            {copiedId ? <Check className="w-5 h-5 text-emerald-700" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'overview', label: 'Umumiy hisobot' },
          { id: 'courses', label: `Mening kurslarim (${myCourses.length})` },
          { id: 'presentations', label: `Taqdimotlarim (${presentations.length})` },
          { id: 'documents', label: `Referat & Esselarim (${documents.length})` },
          { id: 'payments', label: `To‘lovlar tarixi (${myOrders.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeSubTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* Metrics summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 text-center">
              <span className="text-2xl sm:text-3xl font-black text-blue-700 font-mono block">
                {currentUser.credits}
              </span>
              <span className="text-xs font-semibold text-slate-500 mt-1 block">Qolgan AI kreditlar</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 text-center">
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono block">
                {myCourses.length}
              </span>
              <span className="text-xs font-semibold text-slate-500 mt-1 block">A’zo bo‘lingan kurslar</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 text-center">
              <span className="text-2xl sm:text-3xl font-black text-purple-700 font-mono block">
                {presentations.length}
              </span>
              <span className="text-xs font-semibold text-slate-500 mt-1 block">Yaratilgan taqdimotlar</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-700 font-mono block">
                {documents.length + homeworks.length}
              </span>
              <span className="text-xs font-semibold text-slate-500 mt-1 block">Hujjat va yechimlar</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Tezkor harakatlar
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('homework')}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-xs"
              >
                + Yangi uy vazifasini yechish
              </button>
              <button
                onClick={() => setActiveTab('presentations')}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-xs"
              >
                + AI Taqdimot yaratish
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-xs"
              >
                + Yangi referat tayyorlash
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                Kurslarga yozilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: My Courses */}
      {activeSubTab === 'courses' && (
        <div className="space-y-6 animate-fade-in">
          {myCourses.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800">Siz hali birorta kursga a’zo bo‘lmagansiz</h3>
              <p className="text-xs text-slate-500">Kurslar katalogidan o‘zingizga mos yo‘nalishni tanlang.</p>
              <button
                onClick={() => setActiveTab('courses')}
                className="mt-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Kurslar katalogini ochish
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myCourses.map(course => (
                <div key={course.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700">
                      {course.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Faol a’zolik
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{course.title}</h3>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1">
                    <div className="flex items-center space-x-1 font-semibold text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Dars jadvali:</span>
                    </div>
                    <p className="pl-4.5">{course.weeklySchedule}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    <span className="text-slate-600">Ustoz: <strong>{course.teacherName}</strong></span>
                    <span className="font-bold text-blue-700">{formatCurrencyUZS(course.priceUZS)}/oy</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Presentations */}
      {activeSubTab === 'presentations' && (
        <div className="space-y-6 animate-fade-in">
          {presentations.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <Presentation className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800">Hozircha saqlangan taqdimotlar yo‘q</h3>
              <p className="text-xs text-slate-500">AI yordamida bir necha daqiqada slaydlar yarating.</p>
              <button
                onClick={() => setActiveTab('presentations')}
                className="mt-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Taqdimot yaratish
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {presentations.map(p => (
                <div key={p.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                      {p.slides.length} ta slayd
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{p.title}</h4>
                    <span className="text-xs text-slate-400 block font-mono">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setActiveTab('presentations')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Muharrirda ochish</span>
                    </button>
                    <button
                      onClick={() => deletePresentation(p.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="O‘chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Documents & Homeworks */}
      {activeSubTab === 'documents' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map(d => (
              <div key={d.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {d.type.toUpperCase()}
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{d.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{d.introduction}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{new Date(d.createdAt).toLocaleDateString()}</span>
                  <button onClick={() => setActiveTab('documents')} className="text-indigo-600 font-bold hover:underline">
                    Ko‘rish
                  </button>
                </div>
              </div>
            ))}

            {homeworks.map(h => (
              <div key={h.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  UY VAZIFASI: {h.subject}
                </span>
                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{h.problemText}</h4>
                <p className="text-xs text-emerald-800 bg-emerald-50 p-2 rounded-lg font-medium">
                  Javob: {h.finalAnswer}
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{new Date(h.createdAt).toLocaleDateString()}</span>
                  <button onClick={() => setActiveTab('homework')} className="text-blue-600 font-bold hover:underline">
                    Qayta ochish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Payments History */}
      {activeSubTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-fade-in">
          <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">Barcha to‘lovlar va arizalar tarixi</span>
            <span className="text-xs text-slate-500 font-mono">Foydalanuvchi ID: {currentUser.id}</span>
          </div>

          <div className="divide-y divide-slate-100">
            {myOrders.map(o => {
              const badge = statusBadges[o.status] || { label: o.status, color: 'bg-slate-100 text-slate-800' };
              return (
                <div key={o.orderId} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold font-mono text-slate-900">{o.orderId}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <span className="font-semibold text-slate-800 block">{o.itemTitle}</span>
                    <span className="text-xs text-slate-500 block">
                      Oluvchi: <strong>{o.recipientName}</strong> ({o.recipientType === 'teacher' ? 'O‘qituvchi' : 'Admin'}) • Telegram: @{o.recipientTelegram}
                    </span>
                  </div>

                  <div className="text-right sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
                    <span className="font-black text-slate-900 text-base text-blue-700">
                      {formatCurrencyUZS(o.amountUZS)}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

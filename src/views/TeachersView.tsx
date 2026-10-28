import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Teacher } from '../types';
import { 
  Users, 
  CreditCard, 
  Send, 
  Star, 
  Award, 
  Edit3, 
  CheckCircle2, 
  BookOpen, 
  ShieldCheck,
  Save,
  X
} from 'lucide-react';

export const TeachersView: React.FC = () => {
  const { teachers, updateTeacher, currentUser, courses, showToast } = useApp();
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const isTeacherUser = currentUser.role === 'teacher' || currentUser.role === 'superadmin' || currentUser.role === 'admin';

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;
    updateTeacher(editingTeacher);
    setEditingTeacher(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Users className="w-4 h-4 text-emerald-600" />
          <span>Ustozlar Ekotizimi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          O‘qituvchilar Katalogi va Shaxsiy Kabinet
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Tajribali mutaxassislar va ustozlar. Kurs to‘lovlari to‘g‘ridan-to‘g‘ri har bir o‘qituvchining o‘z kartasiga Telegram orqali qabul qilinadi.
        </p>
      </div>

      {/* Teachers Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teachers.map(teacher => {
          const teacherCourses = courses.filter(c => c.teacherId === teacher.id);
          const canEditThisTeacher = 
            currentUser.role === 'superadmin' || 
            currentUser.role === 'admin' || 
            (currentUser.role === 'teacher' && currentUser.email === teacher.email);

          return (
            <div
              key={teacher.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={teacher.photo}
                      alt={teacher.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
                    />
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                        {teacher.name}
                      </h3>
                      <span className="text-xs font-semibold text-blue-600 block">
                        {teacher.specialty}
                      </span>
                      <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                        <span className="flex items-center space-x-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <strong className="text-slate-800">{teacher.rating}</strong>
                        </span>
                        <span>•</span>
                        <span>{teacher.experienceYears} yillik tajriba</span>
                      </div>
                    </div>
                  </div>

                  {canEditThisTeacher && (
                    <button
                      onClick={() => setEditingTeacher(teacher)}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      title="Rekvizitlar va ma'lumotlarni tahrirlash"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {teacher.bio}
                </p>

                {/* Subjects tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {teacher.subjects.map((sub, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Assigned Courses Count */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-slate-800 block">Faol o‘quv kurslari:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    {teacherCourses.map(c => (
                      <li key={c.id} className="line-clamp-1">{c.title}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Verified Card & Telegram details */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-1.5 font-bold text-emerald-900">
                    <CreditCard className="w-4 h-4 text-emerald-700" />
                    <span>To‘lov kartasi: <span className="font-mono">{teacher.cardNumber}</span></span>
                  </div>
                  <span className="text-[11px] text-emerald-800 block">
                    Karta egasi: {teacher.cardHolder}
                  </span>
                </div>

                <a
                  href={`https://t.me/${teacher.telegramUsername.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-colors shadow-sm shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>@{teacher.telegramUsername.replace('@', '')}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Teacher Profile Edit Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setEditingTeacher(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold">O‘qituvchi Profilini Tahrirlash</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                To‘lov kartasi va Telegram akkauntini yangilash
              </p>
            </div>

            <form onSubmit={handleSaveTeacher} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  O‘qituvchi Ismi
                </label>
                <input
                  type="text"
                  required
                  value={editingTeacher.name}
                  onChange={e => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Mutaxassisligi
                </label>
                <input
                  type="text"
                  required
                  value={editingTeacher.specialty}
                  onChange={e => setEditingTeacher({ ...editingTeacher, specialty: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    To‘lov karta raqami
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.cardNumber}
                    onChange={e => setEditingTeacher({ ...editingTeacher, cardNumber: e.target.value })}
                    placeholder="9860 0000 0000 0000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Telegram akkaunt (@)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.telegramUsername}
                    onChange={e => setEditingTeacher({ ...editingTeacher, telegramUsername: e.target.value })}
                    placeholder="username_uz"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Karta egasi (F.I.O)
                </label>
                <input
                  type="text"
                  required
                  value={editingTeacher.cardHolder}
                  onChange={e => setEditingTeacher({ ...editingTeacher, cardHolder: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingTeacher(null)}
                  className="px-4 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md"
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

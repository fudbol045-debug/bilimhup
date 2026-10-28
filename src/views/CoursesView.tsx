import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import { formatCurrencyUZS } from '../utils/rules';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  Users, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Send, 
  Star, 
  ArrowRight, 
  Filter,
  X,
  CreditCard
} from 'lucide-react';

export const CoursesView: React.FC = () => {
  const { courses, teachers, enrollInCourse, adminSettings, currentUser } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);

  const categories = ['all', 'Aniq fanlar', 'Xorijiy tillar', 'IT va Dasturlash', 'Tabiiy fanlar'];

  const filteredCourses = courses.filter(c => {
    return selectedCategory === 'all' || c.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      {/* Study Center Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-md">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Zamonaviy Ta’lim Markazi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            BilimHub O‘quv Markazi va Kurslar
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Respublikaning eng kuchli ustozlari, DTM, SAT va IELTS imtihonlariga intensiv tayyorgarlik, IT dasturlash akademiyasi. Har bir guruhda o‘quvchilar soni cheklangan, individual yondashuv kafolatlanadi.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>{adminSettings.centerAddress}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{adminSettings.centerPhone}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Send className="w-4 h-4 text-sky-400" />
              <span>Admin: @{adminSettings.adminTelegram}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-blue-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'Barcha Kurslar' : cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-semibold">
          Jami faol kurslar: <strong>{filteredCourses.length} ta</strong>
        </span>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => {
          const isEnrolled = currentUser.enrolledCourseIds.includes(course.id);
          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.durationMonths} oy davomiyligi</span>
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                {/* Schedule Box */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs text-slate-700">
                  <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Haftalik dars jadvali:</span>
                  </div>
                  <p className="text-slate-600 pl-5">{course.weeklySchedule}</p>
                </div>

                {/* Teacher Profile Info */}
                <div className="flex items-center space-x-3 pt-2">
                  <img
                    src={course.teacherPhoto}
                    alt={course.teacherName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                  />
                  <div>
                    <span className="text-[11px] text-slate-500 block">Kurs ustozi:</span>
                    <span className="text-sm font-bold text-slate-900">{course.teacherName}</span>
                    <span className="text-[11px] text-blue-600 block">
                      To‘lov to‘g‘ridan-to‘g‘ri ustoz kartasiga
                    </span>
                  </div>
                </div>

                {/* Capacity Counter */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span className="flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Guruh to‘lishi:</span>
                  </span>
                  <span className="font-bold text-slate-700">
                    {course.enrolledCount} / {course.maxStudents} o‘quvchi
                  </span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                    Oylik to‘lov
                  </span>
                  <span className="text-lg sm:text-xl font-black text-blue-700">
                    {formatCurrencyUZS(course.priceUZS)}
                  </span>
                </div>

                {isEnrolled ? (
                  <span className="px-4 py-2 bg-emerald-100 text-emerald-800 font-bold rounded-xl text-xs flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>A’zo bo‘lingan</span>
                  </span>
                ) : (
                  <button
                    onClick={() => enrollInCourse(course.id)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center space-x-1.5"
                  >
                    <span>Yozilish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

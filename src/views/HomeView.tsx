import React from 'react';
import { useApp } from '../context/AppContext';
import { ThreeKnowledgeSphere } from '../components/ThreeKnowledgeSphere';
import { formatCurrencyUZS } from '../utils/rules';
import { 
  Sparkles, 
  GraduationCap, 
  FileText, 
  Presentation, 
  Layers, 
  BookOpen, 
  ArrowRight, 
  Copy, 
  Check, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Activity, 
  FileCheck, 
  Megaphone,
  Star,
  Clock,
  Users,
  Eye,
  ExternalLink
} from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const { t, currentUser, slideTemplates, courses, ads, adPackages, showToast } = useApp();
  const [copiedId, setCopiedId] = React.useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(currentUser.id);
    setCopiedId(true);
    showToast(`10 xonali ID nusxalandi: ${currentUser.id}`, 'success');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const coreTools = [
    {
      id: 'homework',
      title: 'AI Uy Vazifalari',
      desc: 'Matematika, fizika, kimyo va boshqa fanlardan masalalarni bosqichma-bosqich yechish.',
      icon: GraduationCap,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Barcha sinflar',
    },
    {
      id: 'documents',
      title: 'Referat va Esse Generatori',
      desc: 'Mundarija, kirish, ilmiy manbalar va GOST talablari asosida to‘liq akademik ishlar.',
      icon: FileText,
      color: 'from-indigo-600 to-purple-600',
      badge: 'Haqiqiy manbalar',
    },
    {
      id: 'presentations',
      title: 'AI Taqdimot & Slayd Muharriri',
      desc: 'Mavzuni kiriting va professional slaydlar oling. Muharrirda tahrirlang va PPTX/PDF yuklab oling.',
      icon: Presentation,
      color: 'from-purple-600 to-pink-600',
      badge: 'PPTX & PDF',
    },
    {
      id: 'templates',
      title: '5 200+ Slayd Dizaynlari',
      desc: 'Maktab, universitet, biznes, IT, tibbiyot va boshqa 10 ta yo‘nalishdagi tayyor shablonlar.',
      icon: Layers,
      color: 'from-pink-600 to-rose-600',
      badge: '5 200 shablon',
    },
    {
      id: 'docAnalyzer',
      title: 'PDF & Hujjat Tahlili',
      desc: 'Katta PDF va kitoblardan qisqacha xulosa chiqarish, savollarga javob va test tuzish.',
      icon: Activity,
      color: 'from-teal-600 to-emerald-600',
      badge: 'OCR & PDF',
    },
    {
      id: 'quizzes',
      title: 'Test & Imtihon Yaratish',
      desc: 'Mavzuga mos testlar yaratish, to‘g‘ri/noto‘g‘ri tahlili va interaktiv imtihon topshirish.',
      icon: FileCheck,
      color: 'from-amber-600 to-orange-600',
      badge: 'DTM & Imtihon',
    },
  ];

  const activeAds = ads.filter(a => a.status === 'active');

  return (
    <div className="space-y-16 pb-20 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-200 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t('hero.badge')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Ta’lim va sun’iy intellektni birlashtirgan platforma
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero.desc')}
            </p>

            {/* 10-Digit ID Callout */}
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-md mx-auto lg:mx-0 flex items-center justify-between shadow-xl">
              <div>
                <span className="text-[11px] font-semibold text-blue-200 uppercase tracking-wide block">
                  {t('hero.myId')}
                </span>
                <span className="text-2xl font-black font-mono tracking-wider text-amber-300">
                  {currentUser.id}
                </span>
              </div>
              <button
                onClick={handleCopyId}
                className="flex items-center space-x-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                {copiedId ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId ? 'Nusxalandi' : t('hero.copyId')}</span>
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => setActiveTab('homework')}
                className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-102"
              >
                <span>Uy vazifasini yechish</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('templates')}
                className="flex items-center space-x-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold backdrop-blur-md transition-all"
              >
                <Layers className="w-4 h-4 text-amber-300" />
                <span>5 200+ Slayd dizaynlari</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className="flex items-center space-x-2 px-5 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl font-semibold transition-all text-sm"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>O‘quv kurslari</span>
              </button>
            </div>

            {/* Micro assurances */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>3 tilda to‘liq faol (UZ / RU / EN)</span>
              </span>
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Telegram xavfsiz to‘lov tizimi</span>
              </span>
            </div>
          </div>

          {/* Right 3D Visualizer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full aspect-square max-w-md bg-gradient-to-b from-blue-950/40 to-indigo-900/40 rounded-3xl border border-white/10 backdrop-blur-sm p-4 flex flex-col items-center justify-center shadow-2xl">
              <ThreeKnowledgeSphere />
              <div className="text-center mt-2">
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest block">
                  BilimHub AI 3D Knowledge Core
                </span>
                <span className="text-[11px] text-slate-400">
                  Sun’iy intellekt va fanlar ekotizimi
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numerical Stats Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
          <div className="text-center p-3">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-mono block">
              {t('stats.templates')}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 block">
              {t('stats.templatesLabel')}
            </span>
          </div>

          <div className="text-center p-3 border-l border-slate-100">
            <span className="text-3xl sm:text-4xl font-extrabold text-indigo-700 font-mono block">
              {t('stats.activeStudents')}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 block">
              {t('stats.activeStudentsLabel')}
            </span>
          </div>

          <div className="text-center p-3 border-l border-slate-100">
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 font-mono block">
              {t('stats.courses')}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 block">
              {t('stats.coursesLabel')}
            </span>
          </div>

          <div className="text-center p-3 border-l border-slate-100">
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-mono block">
              {t('stats.accuracy')}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 block">
              {t('stats.accuracyLabel')}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Sponsored Advertisements (if any active VIP/Premium) */}
      {activeAds.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-300 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Megaphone className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  Homiy va Hamkorlar E’lonlari
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('ads')}
                className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center space-x-1"
              >
                <span>Reklama joylashtirish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeAds.map(ad => (
                <div 
                  key={ad.id}
                  className="bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        {ad.packageCode.toUpperCase()} REKLAMA
                      </span>
                      <span className="text-xs text-slate-400 flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{ad.viewsCount}</span>
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{ad.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{ad.description}</p>
                  </div>

                  <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-slate-700 truncate max-w-[180px]">
                      {ad.contactInfo}
                    </span>
                    <a
                      href={ad.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Havolani ochish"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6 Core AI Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t('features.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreTools.map(tool => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${tool.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Foydalanish</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5,200 Slide Templates Preview Section */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-1">
                Katta Dizayn Kutubxonasi
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                {t('tpl.title')}
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                10 ta toifaga ajratilgan: maktab, universitet, biznes, IT, tibbiyot, iqtisodiyot, tarix va boshqalar.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('templates')}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all w-fit"
            >
              <span>Barcha 5 200 shablonlarni ko‘rish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Cards Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {slideTemplates.slice(0, 4).map(tpl => (
              <div
                key={tpl.id}
                onClick={() => setActiveTab('templates')}
                className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden hover:border-blue-500 transition-all cursor-pointer group flex flex-col"
              >
                {/* Visual Thumbnail */}
                <div className={`h-36 bg-gradient-to-tr ${tpl.previewColor} p-4 flex flex-col justify-between text-white relative`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/40 backdrop-blur-md">
                      {tpl.slideCount} ta slayd
                    </span>
                    {tpl.isPremium && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-amber-950">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="w-16 h-1 bg-white/40 rounded"></div>
                    <div className="w-24 h-1 bg-white/30 rounded"></div>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] text-blue-400 font-semibold block uppercase">
                      {tpl.categoryLabelUz}
                    </span>
                    <h4 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors line-clamp-1 mt-0.5">
                      {tpl.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/60">
                    <span className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{tpl.rating}</span>
                    </span>
                    <span>{tpl.downloads} yuklab olish</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Study Center Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
              Malakali O‘qituvchilar va Markaz
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              O‘quv Markazi Kurslari
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Kurs to‘lovlari to‘g‘ridan-to‘g‘ri o‘qituvchining o‘z kartasiga Telegram orqali yo‘naltiriladi.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('courses')}
            className="flex items-center space-x-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all w-fit"
          >
            <span>Barcha kurslarni ko‘rish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.slice(0, 3).map(course => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {course.durationMonths} oy
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center space-x-3 pt-2">
                  <img
                    src={course.teacherPhoto}
                    alt={course.teacherName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <span className="text-xs text-slate-500 block">Ustoz:</span>
                    <span className="text-xs font-bold text-slate-800">{course.teacherName}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Oylik to‘lov</span>
                  <span className="text-sm font-black text-blue-700">
                    {formatCurrencyUZS(course.priceUZS)}
                  </span>
                </div>

                <button
                  onClick={() => setActiveTab('courses')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  Kursga yozilish
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Ad Packages Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Biznes va O‘quv Markazlar Uchun
            </span>
            <h2 className="text-2xl sm:text-4xl font-black">
              5 ta qulay reklama tarifi orqali o‘z xizmatlaringizni taniting
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              10 000 so‘mdan boshlanadigan tariflar: Mini, Standart, Premium, VIP va Maxsus. Admin tomonidan tekshirilgandan so‘ng saytda faol ko‘rsatiladi.
            </p>
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('ads')}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-extrabold text-sm shadow-lg transition-all"
              >
                Reklama tariflarini ko‘rish
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold text-sm transition-all"
              >
                Platforma tariflari
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

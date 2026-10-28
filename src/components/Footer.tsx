import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Send, ShieldCheck, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { language, setLanguage, t, adminSettings } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                BILIMHUB<span className="text-blue-500 ml-1">AI</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              O‘quvchilar, talabalar, o‘qituvchilar va o‘quv markazlari uchun sun’iy intellektga asoslangan zamonaviy ta’lim platformasi. AI uy vazifalari, referat va ilmiy ishlar, 5 200+ taqdimot dizaynlari hamda xavfsiz Telegram to‘lov tizimi.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Super Administrator: <strong className="text-white">fudbol045@gmail.com</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Telegram to‘lovlari va ma’muriyat: <strong className="text-sky-300">@{adminSettings.adminTelegram}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Aloqa markazi: <span className="text-slate-300">{adminSettings.centerPhone}</span></span>
              </div>
            </div>
          </div>

          {/* AI Xizmatlari */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              AI Xizmatlari
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('homework')} className="hover:text-blue-400 transition-colors">
                  Uy vazifalari yordamchisi
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('documents')} className="hover:text-blue-400 transition-colors">
                  Referat, esse va kurs ishlari
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('presentations')} className="hover:text-blue-400 transition-colors">
                  AI Taqdimot generatori
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('templates')} className="hover:text-blue-400 transition-colors">
                  5 200+ Slayd dizaynlari
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('docAnalyzer')} className="hover:text-blue-400 transition-colors">
                  PDF va hujjat tahlili
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quizzes')} className="hover:text-blue-400 transition-colors">
                  Test va imtihon tuzish
                </button>
              </li>
            </ul>
          </div>

          {/* O‘quv Markazi va Reklama */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Markaz & Reklama
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-blue-400 transition-colors">
                  O‘quv kurslari katalogi
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('teachers')} className="hover:text-blue-400 transition-colors">
                  O‘qituvchilar profillari
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ads')} className="hover:text-blue-400 transition-colors">
                  Reklama joylashtirish (5 ta tarif)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pricing')} className="hover:text-blue-400 transition-colors">
                  Tariflar va narxlar
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('cabinet')} className="hover:text-blue-400 transition-colors">
                  Shaxsiy 10 xonali ID kabineti
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="text-rose-400 hover:text-rose-300 font-semibold transition-colors">
                  Boshqaruv (Admin Panel)
                </button>
              </li>
            </ul>
          </div>

          {/* Tillarni Tanlash va Rekvizitlar */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Tillarni tanlash
            </h4>
            <div className="flex flex-col space-y-2 mb-6">
              <button
                onClick={() => setLanguage('uz')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  language === 'uz' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>🇺🇿 O‘zbek tili</span>
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  language === 'ru' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>🇷🇺 Русский язык</span>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  language === 'en' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>🇬🇧 English language</span>
              </button>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-400">
              <span className="font-semibold text-white block mb-1">To‘lovlar tartibi:</span>
              <span>Kurslar — o‘qituvchiga, AI va reklamalar — adminga Telegram orqali.</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p>© 2026 BilimHub AI. Barcha huquqlar himoyalangan. O‘zbekiston, MDH va xalqaro ta’lim standarti.</p>
          <div className="flex items-center space-x-6">
            <span>HTTPS xavfsiz protokoli</span>
            <span>10 xonali noyob foydalanuvchi ID</span>
            <span>Telegram to‘lov shlyuzi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

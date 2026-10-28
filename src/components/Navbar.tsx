import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language, UserRole } from '../types';
import { 
  Sparkles, 
  Globe, 
  Menu, 
  X, 
  User as UserIcon, 
  Copy, 
  Check, 
  ShieldAlert, 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Presentation, 
  Layers, 
  Activity, 
  FileCheck, 
  Megaphone,
  CreditCard
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { 
    language, 
    setLanguage, 
    t, 
    currentUser, 
    switchUserRoleForDemo, 
    loginWithGoogleOrApple, 
    logout,
    showToast 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [idCopied, setIdCopied] = useState(false);

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Sparkles },
    { id: 'homework', label: t('nav.homework'), icon: GraduationCap },
    { id: 'documents', label: t('nav.documents'), icon: FileText },
    { id: 'presentations', label: t('nav.presentations'), icon: Presentation },
    { id: 'templates', label: t('nav.templates'), icon: Layers },
    { id: 'docAnalyzer', label: t('nav.docAnalyzer'), icon: Activity },
    { id: 'quizzes', label: t('nav.quizzes'), icon: FileCheck },
    { id: 'courses', label: t('nav.courses'), icon: BookOpen },
    { id: 'ads', label: t('nav.ads'), icon: Megaphone },
    { id: 'pricing', label: t('nav.pricing'), icon: CreditCard },
  ];

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentUser.id);
    setIdCopied(true);
    showToast(`10 xonali ID nusxalandi: ${currentUser.id}`, 'success');
    setTimeout(() => setIdCopied(false), 2000);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      showToast('Iltimos email manzilini kiriting', 'error');
      return;
    }
    loginWithGoogleOrApple(loginEmail.trim(), loginName.trim() || undefined);
    setAuthModalOpen(false);
    setLoginEmail('');
    setLoginName('');
  };

  const handleQuickSuperAdmin = () => {
    loginWithGoogleOrApple('fudbol045@gmail.com', 'Super Administrator');
    setAuthModalOpen(false);
  };

  const roleBadgeStyles: Record<UserRole, string> = {
    guest: 'bg-slate-100 text-slate-700 border-slate-300',
    student: 'bg-blue-100 text-blue-800 border-blue-300',
    teacher: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    advertiser: 'bg-amber-100 text-amber-800 border-amber-300',
    moderator: 'bg-purple-100 text-purple-800 border-purple-300',
    admin: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    superadmin: 'bg-rose-100 text-rose-800 border-rose-300 font-bold',
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        {/* Top utility bar */}
        <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>AI Ta’lim platformasi faol</span>
              </span>
              <span>•</span>
              <span>Super Administrator: <strong className="text-white">fudbol045@gmail.com</strong></span>
              <span>•</span>
              <span>Telegram to‘lovlari: <strong className="text-sky-300">@BilimHubAdmin</strong></span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Demo quick role switcher */}
              <div className="flex items-center space-x-1.5 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                <span className="text-slate-400">Rol almashtirish:</span>
                <button 
                  onClick={() => switchUserRoleForDemo('student')} 
                  className={`px-1.5 py-0.5 rounded text-[11px] ${currentUser.role === 'student' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  Talaba
                </button>
                <button 
                  onClick={() => switchUserRoleForDemo('teacher')} 
                  className={`px-1.5 py-0.5 rounded text-[11px] ${currentUser.role === 'teacher' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  O‘qituvchi
                </button>
                <button 
                  onClick={() => switchUserRoleForDemo('superadmin')} 
                  className={`px-1.5 py-0.5 rounded text-[11px] ${currentUser.role === 'superadmin' ? 'bg-rose-600 text-white font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  Super Admin
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center space-x-3 text-left group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  BILIMHUB<span className="text-blue-600 ml-1">AI</span>
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 block font-medium -mt-1 tracking-wide">
                  {t('brand.tagline')}
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.slice(0, 7).map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right side controls (Language, ID pill, Cabinet, Admin, Mobile Toggle) */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* 10-Digit ID pill */}
              <button
                onClick={handleCopyId}
                className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-300 text-xs font-mono font-bold transition-all shadow-sm"
                title="Sizning noyob 10 xonali ID raqamingiz (Nusxalash uchun bosing)"
              >
                <span className="text-[10px] text-slate-500 font-sans uppercase">ID:</span>
                <span>{currentUser.id}</span>
                {idCopied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center space-x-1 px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-300 text-xs font-semibold shadow-sm"
                  aria-label="Tilni tanlash"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span className="uppercase">{language}</span>
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 animate-fade-in">
                    <button
                      onClick={() => { setLanguage('uz'); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between ${language === 'uz' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'}`}
                    >
                      <span>🇺🇿 O‘zbekcha</span>
                      {language === 'uz' && <Check className="w-3 h-3 text-blue-600" />}
                    </button>
                    <button
                      onClick={() => { setLanguage('ru'); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between ${language === 'ru' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'}`}
                    >
                      <span>🇷🇺 Русский</span>
                      {language === 'ru' && <Check className="w-3 h-3 text-blue-600" />}
                    </button>
                    <button
                      onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between ${language === 'en' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'}`}
                    >
                      <span>🇬🇧 English</span>
                      {language === 'en' && <Check className="w-3 h-3 text-blue-600" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Shaxsiy Kabinet Button */}
              <button
                onClick={() => setActiveTab('cabinet')}
                className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  activeTab === 'cabinet'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{t('nav.cabinet')}</span>
              </button>

              {/* Admin Panel Button (for Admin & Super Admin) */}
              {(currentUser.role === 'admin' || currentUser.role === 'superadmin') && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    activeTab === 'admin'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-500/20'
                      : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span className="hidden sm:inline">
                    {currentUser.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                  </span>
                </button>
              )}

              {/* Login / Auth Modal Trigger */}
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
              >
                <span>{currentUser.email ? currentUser.name.split(' ')[0] : t('nav.login')}</span>
              </button>

              {/* Mobile hamburger button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 lg:hidden rounded-lg hover:bg-slate-100"
                aria-label="Menyu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 animate-fade-in shadow-xl max-h-[80vh] overflow-y-auto">
            {/* Role switch in mobile */}
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-600 font-medium">Faol rol:</span>
              <span className={`px-2 py-0.5 rounded-full border text-[11px] font-semibold ${roleBadgeStyles[currentUser.role]}`}>
                {currentUser.role}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setActiveTab('cabinet');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold text-center flex items-center justify-center space-x-2"
              >
                <UserIcon className="w-4 h-4" />
                <span>{t('nav.cabinet')} ({currentUser.id})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 bg-rose-50 text-rose-700 rounded-xl text-xs font-bold text-center flex items-center justify-center space-x-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Administrator va Super Admin Paneli</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Auth / Profile Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white relative">
              <button
                onClick={() => setAuthModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold">Google & Apple ID orqali kirish</h3>
              <p className="text-blue-100 text-xs mt-1">
                Har bir foydalanuvchiga avtomatik noyob 10 xonali ID beriladi
              </p>
            </div>

            <div className="p-6 space-y-4">
              {/* Quick Super Admin Button */}
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                <span className="text-xs font-bold text-rose-900 block mb-1">
                  ⭐️ Super Administrator sifatida kirish:
                </span>
                <p className="text-xs text-rose-700 mb-2">
                  fudbol045@gmail.com — tizimning eng yuqori vakolatli boshqaruvchisi.
                </p>
                <button
                  type="button"
                  onClick={handleQuickSuperAdmin}
                  className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  fudbol045@gmail.com bilan 1-klikda kirish
                </button>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-slate-400 text-xs">yoki o‘z hisobingiz</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ism-familiyangiz
                  </label>
                  <input
                    type="text"
                    value={loginName}
                    onChange={e => setLoginName(e.target.value)}
                    placeholder="Masalan: Sardor Rustamov"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Google yoki Apple Email
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="foydalanuvchi@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition-all"
                >
                  Tizimga kirish / Ro‘yxatdan o‘tish
                </button>
              </form>

              {currentUser.email && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Faol hisob: <strong className="text-slate-800">{currentUser.email}</strong>
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setAuthModalOpen(false);
                    }}
                    className="text-rose-600 hover:text-rose-700 font-semibold"
                  >
                    Chiqish
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

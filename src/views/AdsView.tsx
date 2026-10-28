import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrencyUZS, validateAdvertisement } from '../utils/rules';
import { 
  Megaphone, 
  Check, 
  Send, 
  Eye, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Plus, 
  X,
  CreditCard
} from 'lucide-react';

export const AdsView: React.FC = () => {
  const { adPackages, ads, submitAd, setActivePaymentModal, showToast } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPkgCode, setSelectedPkgCode] = useState<'mini' | 'standard' | 'premium' | 'vip' | 'custom'>('standard');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [externalLink, setExternalLink] = useState('');

  const activeAds = ads.filter(a => a.status === 'active');

  const handleOpenSubmit = (pkgCode?: typeof selectedPkgCode) => {
    if (pkgCode) setSelectedPkgCode(pkgCode);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const val = validateAdvertisement({ title, description, contactInfo });
    if (!val.isValid) {
      showToast(val.error || 'Ma’lumotlarni to‘liq to‘ldiring', 'error');
      return;
    }

    const pkg = adPackages.find(p => p.code === selectedPkgCode) || adPackages[0];

    const order = submitAd({
      userId: '', // auto-assigned in context
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      contactInfo: contactInfo.trim(),
      externalLink: externalLink.trim() || 'https://t.me/BilimHubAdmin',
      packageCode: selectedPkgCode,
      priceUZS: pkg.priceUZS
    });

    setModalOpen(false);
    setTitle('');
    setDescription('');
    setImageUrl('');
    setContactInfo('');
    setExternalLink('');

    // Open Telegram payment modal for Admin
    setActivePaymentModal(order);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
          <Megaphone className="w-4 h-4 text-amber-600" />
          <span>Reklama va E’lonlar Xizmati</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          5 Ta Qulay Reklama Tarifi
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          O‘quv markazingiz, repetitorlik xizmati yoki ta’lim mahsulotlaringizni 48 000+ faol talaba va o‘quvchilarga taniting. To‘lovlar administrator kartasiga amalga oshiriladi va tekshiruvdan so‘ng faollashadi.
        </p>

        <button
          onClick={() => handleOpenSubmit()}
          className="mt-3 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 rounded-xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi e’lon joylashtirish</span>
        </button>
      </div>

      {/* 5 Packages Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {adPackages.map(pkg => (
          <div
            key={pkg.id}
            className={`rounded-3xl border p-6 flex flex-col justify-between transition-all ${
              pkg.isPopular
                ? 'bg-gradient-to-b from-blue-900 to-indigo-950 text-white border-blue-500 shadow-xl scale-102 ring-2 ring-blue-500'
                : 'bg-white text-slate-900 border-slate-200 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  pkg.isPopular ? 'bg-amber-400 text-amber-950' : 'bg-slate-100 text-slate-700'
                }`}>
                  {pkg.badge || `${pkg.durationDays} kun`}
                </span>
                <span className={`text-xs font-mono font-semibold ${pkg.isPopular ? 'text-blue-300' : 'text-slate-500'}`}>
                  {pkg.durationDays} kun
                </span>
              </div>

              <div>
                <h3 className={`font-black text-base sm:text-lg ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>
                  {pkg.nameUz}
                </h3>
                <div className="mt-2">
                  <span className={`text-xl sm:text-2xl font-black ${pkg.isPopular ? 'text-amber-300' : 'text-blue-700'}`}>
                    {formatCurrencyUZS(pkg.priceUZS)}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className={`space-y-2 text-xs pt-3 border-t ${pkg.isPopular ? 'border-white/10 text-slate-300' : 'border-slate-100 text-slate-600'}`}>
                {pkg.featuresUz.map((feat, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${pkg.isPopular ? 'text-amber-400' : 'text-emerald-600'}`} />
                    <span className="leading-tight">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleOpenSubmit(pkg.code)}
              className={`w-full mt-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                pkg.isPopular
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              Tanlash va to‘lov
            </button>
          </div>
        ))}
      </div>

      {/* Active Live Advertisements Showcase */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center space-x-2">
            <Megaphone className="w-5 h-5 text-amber-500" />
            <span>Faol Joylashtirilgan E’lonlar ({activeAds.length})</span>
          </h2>
          <span className="text-xs text-slate-500">Moderatsiyadan o‘tgan</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeAds.map(ad => (
            <div
              key={ad.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      {ad.packageCode.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center space-x-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{ad.viewsCount} ko‘rildi</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base line-clamp-1">{ad.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{ad.description}</p>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-700 truncate max-w-[180px]">
                  {ad.contactInfo}
                </span>

                <a
                  href={ad.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1 transition-colors"
                >
                  <span>Bog‘lanish</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Advertisement Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold">Yangi Reklama E’loni Berish</h3>
              <p className="text-xs text-amber-100 mt-1">
                To‘lov administrator kartasiga o‘tkaziladi. Moderatsiya tasdiqlangach e’lon saytda faollashadi.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Reklama Tarifi
                </label>
                <select
                  value={selectedPkgCode}
                  onChange={e => setSelectedPkgCode(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold"
                >
                  {adPackages.map(pkg => (
                    <option key={pkg.code} value={pkg.code}>
                      {pkg.nameUz} — {formatCurrencyUZS(pkg.priceUZS)} ({pkg.durationDays} kun)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  E’lon Sarlavhasi
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Masalan: IELTS 8.0 Kafolatlangan Kurslar"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Batafsil Tavsif
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Xizmat yoki kursingiz haqida qiziqarli ma’lumot..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Banner Rasm Havolasi (URL)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Aloqa / Telefon
                  </label>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={e => setContactInfo(e.target.value)}
                    placeholder="+998 (90) 123-45-67"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Telegram / Veb Havola
                  </label>
                  <input
                    type="url"
                    value={externalLink}
                    onChange={e => setExternalLink(e.target.value)}
                    placeholder="https://t.me/kanal_nomi"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-1.5"
                >
                  <span>To‘lovga o‘tish (Telegram)</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

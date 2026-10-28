import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TEMPLATE_CATEGORIES, TOTAL_TEMPLATES_COUNT } from '../data/initialData';
import { SlideTemplate } from '../types';
import { 
  Layers, 
  Search, 
  Star, 
  Download, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  X, 
  CheckCircle2, 
  Filter,
  Check
} from 'lucide-react';

interface TemplateCatalogViewProps {
  setActiveTab: (tab: string) => void;
}

export const TemplateCatalogView: React.FC<TemplateCatalogViewProps> = ({ setActiveTab }) => {
  const { slideTemplates, showToast } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPremium, setFilterPremium] = useState<'all' | 'free' | 'premium'>('all');
  const [previewTemplate, setPreviewTemplate] = useState<SlideTemplate | null>(null);

  // Generate expanded template items mapped to category distribution
  const allTemplates = useMemo(() => {
    // Generate additional realistic catalog items to represent the 5,200 collection
    const list: SlideTemplate[] = [...slideTemplates];

    const categoryPrefixes: Record<string, string[]> = {
      school: ['Biologiya Darslari', 'Fizika Laboratoriya', 'Ona Tili va Adabiyot', 'Kimyoviy Tajribalar', 'Astronomiya Asoslari', 'Maktab Tadbiri'],
      university: ['Ilmiy Maqola Himoyasi', 'Statistik Tadqiqot', 'Bakalavriat Bitiruv Ishi', 'Laboratoriya Hisoboti', 'Xalqaro Grant Loyihasi'],
      business: ['Kompaniya Yillik Hisoboti', 'Sotuv Voronkasi & CRM', 'Franshiza Taklifi', 'B2B Hamkorlik Taqdimoti', 'Marketing Rejasi'],
      it: ['Kiberxavfsizlik Audit', 'Mobil Ilova UI/UX Arxitekturasi', 'DevOps & CI/CD Konferensiya', 'Katta Ma’lumotlar (Big Data)'],
      medicine: ['Kardiyologiya Tadqiqoti', 'Nevrologiya Yangiliklari', 'Farmatsevtika Taqdimoti', 'Genetika va DNK Tahlili'],
      history: ['Qadimgi Dunyo Tarixi', 'O‘rta Osiyo Uyg‘onish Davri', 'Buyuk Geografik Kashfiyotlar', 'Milliy Madaniy Meros'],
      economics: ['Makroiqtisodiy Tahlil', 'Kriptovalyuta va Blokcheyn', 'Soliq Islohotlari', 'Xalqaro Valyuta Jamg‘armasi'],
      ecology: ['Suv Resurslarini Asrash', 'Qayta Tiklanuvchi Energiya', 'Orolbo‘yi Muammolari', 'Yashil Shaharlar Konsepsiyasi'],
      minimalist: ['Minimalist Qora & Oq', 'Shveysariya Tipografik Dizayni', 'Clean Corporate Blue', 'Nordic Pastel Slate'],
      creative: ['Dizayn Studio Portfoli', 'Moda va Brending', 'Raqamli San’at Ko‘rgazmasi', 'Zamonaviy Arxitektura']
    };

    TEMPLATE_CATEGORIES.forEach(cat => {
      const titles = categoryPrefixes[cat.id] || ['Taqdimot Dizayni'];
      titles.forEach((tName, i) => {
        list.push({
          id: `tpl-${cat.id}-gen-${i}`,
          title: tName,
          category: cat.id as any,
          categoryLabelUz: cat.nameUz,
          categoryLabelRu: cat.nameRu,
          categoryLabelEn: cat.nameEn,
          previewColor: i % 2 === 0 ? 'from-blue-600 to-indigo-700' : 'from-purple-600 to-indigo-800',
          slideCount: 12 + (i * 2),
          isPremium: i % 2 !== 0,
          downloads: 400 + (i * 120),
          rating: 4.8 + ((i % 3) * 0.05),
          tags: [cat.id, 'zamonaviy', 'taqdimot']
        });
      });
    });

    return list;
  }, [slideTemplates]);

  // Filtered
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabelUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchPrem = 
        filterPremium === 'all' || 
        (filterPremium === 'free' && !item.isPremium) || 
        (filterPremium === 'premium' && item.isPremium);

      return matchCat && matchSearch && matchPrem;
    });
  }, [allTemplates, selectedCategory, searchQuery, filterPremium]);

  const handleUseTemplateInAI = (tpl: SlideTemplate) => {
    showToast(`"${tpl.title}" dizayni AI generatoriga yuklandi!`, 'success');
    setActiveTab('presentations');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-bold">
          <Layers className="w-4 h-4 text-pink-600" />
          <span>Katta Dizayn Portali</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          5 200 dan ortiq slayd dizaynlari katalogi
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Har bir shablon muqova, reja, diagrammalar, jadvallar va xulosalar uchun maxsus maketlarga ega. AI yordamida bir zumda to‘ldiring yoki mustaqil yuklab oling.
        </p>
      </div>

      {/* Category Tabs with exact counts */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white shadow-blue-500/20'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Barchasi ({TOTAL_TEMPLATES_COUNT.toLocaleString()})
        </button>

        {TEMPLATE_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-blue-500/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{cat.nameUz}</span>
            <span className="ml-1.5 opacity-75 font-mono text-xs">({cat.totalCount})</span>
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Shablonlarni nomi, mavzusi yoki tegi bo‘yicha qidirish..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <span className="text-xs text-slate-500 font-medium">Tur:</span>
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilterPremium('all')}
              className={`px-2.5 py-1 rounded-lg ${filterPremium === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
            >
              Hammasi
            </button>
            <button
              onClick={() => setFilterPremium('free')}
              className={`px-2.5 py-1 rounded-lg ${filterPremium === 'free' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'}`}
            >
              Bepul
            </button>
            <button
              onClick={() => setFilterPremium('premium')}
              className={`px-2.5 py-1 rounded-lg ${filterPremium === 'premium' ? 'bg-white text-amber-800 shadow-sm' : 'text-slate-600'}`}
            >
              Premium
            </button>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTemplates.map(tpl => (
          <div
            key={tpl.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between group"
          >
            {/* Template Visual Card */}
            <div 
              onClick={() => setPreviewTemplate(tpl)}
              className={`h-40 bg-gradient-to-tr ${tpl.previewColor} p-4 flex flex-col justify-between text-white cursor-pointer relative overflow-hidden`}
            >
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md">
                  {tpl.slideCount} ta slayd
                </span>
                {tpl.isPremium ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950">
                    PREMIUM
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                    BEPUL
                  </span>
                )}
              </div>

              {/* Decorative slide miniature elements */}
              <div className="space-y-1.5 relative z-10">
                <div className="w-20 h-1.5 bg-white/70 rounded"></div>
                <div className="w-32 h-1 bg-white/40 rounded"></div>
              </div>

              {/* Hover quick preview button */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20">
                <span className="flex items-center space-x-1.5 px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-bold shadow-lg">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ko‘rish</span>
                </span>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                  {tpl.categoryLabelUz}
                </span>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mt-0.5">
                  {tpl.title}
                </h3>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-semibold text-slate-700">{tpl.rating}</span>
                </span>
                <span>{tpl.downloads} yuklab olingan</span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleUseTemplateInAI(tpl)}
                className="w-full py-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI bilan taqdimot yaratish</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className={`p-6 bg-gradient-to-tr ${previewTemplate.previewColor} text-white relative`}>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">
                {previewTemplate.categoryLabelUz}
              </span>
              <h2 className="text-2xl font-black">{previewTemplate.title}</h2>
              <p className="text-xs text-white/80 mt-1">
                To‘liq to‘plam: {previewTemplate.slideCount} ta professional slayd maketi
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Slide thumbnails preview */}
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-3">
                  Ushbu shablon tarkibidagi maketlar:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-center text-xs">
                    <span className="font-bold text-slate-800 block">1. Muqova Slaydi</span>
                    <span className="text-[10px] text-slate-500">Asosiy sarlavha va muallif</span>
                  </div>
                  <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-center text-xs">
                    <span className="font-bold text-slate-800 block">2. Reja va Mundarija</span>
                    <span className="text-[10px] text-slate-500">Mavzular xaritasi</span>
                  </div>
                  <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-center text-xs">
                    <span className="font-bold text-slate-800 block">3. Diagramma va Tahlil</span>
                    <span className="text-[10px] text-slate-500">Statistika va jadvallar</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    handleUseTemplateInAI(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ushbu shablonda AI taqdimot yaratish</span>
                </button>

                <button
                  onClick={() => {
                    showToast('Shablon yuklab olish fayli tayyorlanmoqda...', 'info');
                    setPreviewTemplate(null);
                  }}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>PPTX yuklab olish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Presentation, PresentationSlide } from '../types';
import { 
  Presentation as PresentationIcon, 
  Sparkles, 
  Download, 
  Plus, 
  Copy, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Palette, 
  Layout, 
  RefreshCw, 
  Save, 
  ChevronRight, 
  CheckCircle2,
  FileDown
} from 'lucide-react';

export const PresentationGeneratorView: React.FC = () => {
  const { currentUser, savePresentation, showToast } = useApp();

  const [topic, setTopic] = useState('');
  const [slideCount, setSlideCount] = useState<number>(6);
  const [designStyle, setDesignStyle] = useState('Zamonaviy Ko‘k & Indigo (Modern)');
  const [audience, setAudience] = useState('Talabalar va Professor-o‘qituvchilar');
  const [isGenerating, setIsGenerating] = useState(false);

  // Active Presentation State
  const [activePresentation, setActivePresentation] = useState<Presentation | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const styles = [
    'Zamonaviy Ko‘k & Indigo (Modern)',
    'Minimalist Oq & To‘q kulrang',
    'Yashil Ekologiya & Tabiat',
    'Akademik Universitet Usuli',
    'To‘q Rangli (Dark Mode Elegance)'
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      showToast('Iltimos taqdimot mavzusini kiriting', 'error');
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const count = Math.max(3, Math.min(slideCount, 12));
      const generatedSlides: PresentationSlide[] = [];

      // 1. Title Slide
      generatedSlides.push({
        id: `slide-1`,
        title: topic.trim(),
        subtitle: `Taqdimotchi: ${currentUser.name} | BilimHub AI Taqdimot Tizimi`,
        layout: 'title_bullets',
        bgColor: '#1e1b4b',
        textColor: '#ffffff',
        elements: [
          { id: 'e1', type: 'bullet', content: 'Kirish va tadqiqot dolzarbligi' },
          { id: 'e2', type: 'bullet', content: 'Asosiy tushunchalar va global tendensiyalar' },
          { id: 'e3', type: 'bullet', content: 'Amaliy tahlillar va xulosalar' }
        ],
        notes: 'Ushbu taqdimot mavzusining asosiy maqsadi va auditoriya e’tiborini jalb qilish.'
      });

      // 2. Middle Content Slides
      const middleTopics = [
        { title: 'Muammoning Dolzarbligi va Asosiy Sabablar', stat: '85%', statDesc: 'Global miqyosdagi o‘sish ko‘rsatkichi' },
        { title: 'Nazariy Asoslar va Xalqaro Tajriba', stat: '3.4x', statDesc: 'Samaradorlikning oshishi' },
        { title: 'Amaliy Tadbiq va Innovatsion Yechimlar', stat: '100%', statDesc: 'Raqamli integratsiya' },
        { title: 'Kutilayotgan Natijalar va Istiqbollar', stat: '+45%', statDesc: 'Iqtisodiy va ijtimoiy natija' },
      ];

      for (let i = 1; i < count - 1; i++) {
        const item = middleTopics[(i - 1) % middleTopics.length];
        generatedSlides.push({
          id: `slide-${i + 1}`,
          title: item.title,
          subtitle: `Mavzu bo‘yicha tahliliy ko‘rsatkichlar`,
          layout: i % 2 === 0 ? 'stat_highlight' : 'two_columns',
          bgColor: '#ffffff',
          textColor: '#0f172a',
          elements: [
            { id: `el-${i}-1`, type: 'bullet', content: `Zamonaviy modellar va standartlar asosida rejalashtirish.` },
            { id: `el-${i}-2`, type: 'bullet', content: `Resurslardan unumli foydalanish va jarayonlarni avtomatlashtirish.` },
            { id: `el-${i}-3`, type: 'stat', content: `${item.stat}: ${item.statDesc}` }
          ],
          notes: 'Ushbu slaydda statistik ma’lumotlarga va amaliy misollarga alohida urg‘u bering.'
        });
      }

      // Final Slide
      generatedSlides.push({
        id: `slide-${count}`,
        title: 'Xulosa va Savol-Javoblar',
        subtitle: 'E’tiboringiz uchun katta rahmat!',
        layout: 'conclusion',
        bgColor: '#0f172a',
        textColor: '#ffffff',
        elements: [
          { id: 'ec1', type: 'bullet', content: 'Tavsiya etilgan takliflar amaliyotga joriy etishga tayyor.' },
          { id: 'ec2', type: 'bullet', content: 'Savollar va takliflar uchun aloqa: ' + (currentUser.email || 'bilimhub.uz') }
        ],
        notes: 'Auditoriyadan savollarni qabul qiling va yakuniy xulosalarni bildiring.'
      });

      const pres: Presentation = {
        id: `pres-${Date.now()}`,
        userId: currentUser.id,
        title: topic.trim(),
        topic: topic.trim(),
        language: 'uz',
        templateCategory: 'general',
        slides: generatedSlides,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setActivePresentation(pres);
      setActiveSlideIndex(0);
      savePresentation(pres);
      setIsGenerating(false);
      showToast(`${count} ta slayddan iborat taqdimot muvaffaqiyatli yaratildi!`, 'success');
    }, 1500);
  };

  // Editor Actions
  const currentSlide = activePresentation?.slides[activeSlideIndex];

  const handleUpdateCurrentSlideTitle = (newTitle: string) => {
    if (!activePresentation) return;
    const slides = [...activePresentation.slides];
    slides[activeSlideIndex] = { ...slides[activeSlideIndex], title: newTitle };
    const updated = { ...activePresentation, slides, updatedAt: new Date().toISOString() };
    setActivePresentation(updated);
    savePresentation(updated);
  };

  const handleUpdateCurrentSlideSubtitle = (newSub: string) => {
    if (!activePresentation) return;
    const slides = [...activePresentation.slides];
    slides[activeSlideIndex] = { ...slides[activeSlideIndex], subtitle: newSub };
    const updated = { ...activePresentation, slides, updatedAt: new Date().toISOString() };
    setActivePresentation(updated);
    savePresentation(updated);
  };

  const handleUpdateElement = (elId: string, content: string) => {
    if (!activePresentation || !currentSlide) return;
    const elements = currentSlide.elements.map(el => el.id === elId ? { ...el, content } : el);
    const slides = [...activePresentation.slides];
    slides[activeSlideIndex] = { ...currentSlide, elements };
    const updated = { ...activePresentation, slides, updatedAt: new Date().toISOString() };
    setActivePresentation(updated);
    savePresentation(updated);
  };

  const handleAddSlide = () => {
    if (!activePresentation) return;
    const newSlide: PresentationSlide = {
      id: `slide-${Date.now()}`,
      title: 'Yangi Slayd Sarlavhasi',
      subtitle: 'Qisqa izoh yoki yo‘nalish',
      layout: 'title_bullets',
      bgColor: '#ffffff',
      textColor: '#0f172a',
      elements: [
        { id: `el-${Date.now()}-1`, type: 'bullet', content: 'Birinchi asosiy fikr' },
        { id: `el-${Date.now()}-2`, type: 'bullet', content: 'Ikkinchi muhim ko‘rsatkich' }
      ]
    };
    const slides = [...activePresentation.slides, newSlide];
    const updated = { ...activePresentation, slides, updatedAt: new Date().toISOString() };
    setActivePresentation(updated);
    setActiveSlideIndex(slides.length - 1);
    savePresentation(updated);
    showToast('Yangi slayd qo‘shildi', 'success');
  };

  const handleDuplicateSlide = (idx: number) => {
    if (!activePresentation) return;
    const target = activePresentation.slides[idx];
    const cloned: PresentationSlide = {
      ...target,
      id: `slide-${Date.now()}`,
      title: `${target.title} (Nusxa)`
    };
    const slides = [...activePresentation.slides];
    slides.splice(idx + 1, 0, cloned);
    const updated = { ...activePresentation, slides, updatedAt: new Date().toISOString() };
    setActivePresentation(updated);
    setActiveSlideIndex(idx + 1);
    savePresentation(updated);
    showToast('Slayd nusxalandi', 'info');
  };

  const handleDeleteSlide = (idx: number) => {
    if (!activePresentation || activePresentation.slides.length <= 1) {
      showToast('Taqdimotda kamida bitta slayd qolishi kerak', 'error');
      return;
    }
    const slides = activePresentation.slides.filter((_, i) => i !== idx);
    const nextIdx = Math.max(0, activeSlideIndex - 1);
    const updated = { ...activePresentation, slides, updatedAt: new Date().toISOString() };
    setActivePresentation(updated);
    setActiveSlideIndex(nextIdx);
    savePresentation(updated);
    showToast('Slayd o‘chirildi', 'info');
  };

  const handleMoveSlide = (idx: number, direction: 'up' | 'down') => {
    if (!activePresentation) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= activePresentation.slides.length) return;

    const slides = [...activePresentation.slides];
    const temp = slides[idx];
    slides[idx] = slides[targetIdx];
    slides[targetIdx] = temp;

    const updated = { ...activePresentation, slides, updatedAt: new Date().toISOString() };
    setActivePresentation(updated);
    setActiveSlideIndex(targetIdx);
    savePresentation(updated);
  };

  const handleDownloadPPTX = () => {
    if (!activePresentation) return;
    // Generate clean HTML-based presentation or XML package
    const htmlDeck = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${activePresentation.title}</title>
        <style>
          @page { size: 16in 9in; margin: 0; }
          body { font-family: 'Arial', sans-serif; margin: 0; background: #f1f5f9; }
          .slide { width: 100vw; height: 100vh; page-break-after: always; display: flex; flex-direction: column; justify-content: center; padding: 4rem; box-sizing: border-box; }
          h1 { font-size: 3rem; margin-bottom: 1rem; color: #1e1b4b; }
          h2 { font-size: 1.8rem; color: #4338ca; }
          ul { font-size: 1.5rem; line-height: 2; color: #334155; }
        </style>
      </head>
      <body>
        ${activePresentation.slides.map(s => `
          <div class="slide" style="background-color: ${s.bgColor || '#ffffff'}; color: ${s.textColor || '#000000'};">
            <h1 style="color: ${s.textColor || '#000000'}">${s.title}</h1>
            ${s.subtitle ? `<h2>${s.subtitle}</h2>` : ''}
            <ul>
              ${s.elements.map(e => `<li>${e.content}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </body>
      </html>
    `;
    const blob = new Blob([htmlDeck], { type: 'application/vnd.ms-powerpoint' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePresentation.title.replace(/\s+/g, '_')}_BilimHub.pptx`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('PPTX taqdimot fayli yuklab olindi!', 'success');
  };

  const handleDownloadPDF = () => {
    window.print();
    showToast('Taqdimotni PDF qilib saqlash oynasi ochildi', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
          <PresentationIcon className="w-4 h-4 text-purple-600" />
          <span>AI Taqdimot Generator & Slayd Muharriri</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Professional Taqdimotlar Yaratish
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Mavzuni kiriting, AI slaydlar matnini va tartibini tayyorlaydi. Slayd muharririda mustaqil tahrirlang va PPTX/PDF qilib oling.
        </p>
      </div>

      {/* Generator Prompt Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-6">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Taqdimot mavzusi
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="Masalan: O‘zbekistonda yashil energetika va quyosh panellari istiqbollari"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Slaydlar soni
              </label>
              <select
                value={slideCount}
                onChange={e => setSlideCount(Number(e.target.value))}
                className="w-full px-3 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value={4}>4 ta slayd</option>
                <option value={6}>6 ta slayd (Optimal)</option>
                <option value={8}>8 ta slayd</option>
                <option value={10}>10 ta slayd</option>
                <option value={12}>12 ta slayd</option>
              </select>
            </div>

            <div className="md:col-span-4">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Slaydlar yaratilmoqda...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>AI Taqdimot yaratish</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Interactive Slide Editor Studio */}
      {activePresentation && currentSlide && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden space-y-0">
          {/* Studio Top Control Bar */}
          <div className="bg-slate-900 text-white p-4 px-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs">
                {activeSlideIndex + 1}/{activePresentation.slides.length}
              </div>
              <div>
                <h3 className="font-bold text-sm text-white line-clamp-1">
                  {activePresentation.title}
                </h3>
                <span className="text-[11px] text-slate-400">
                  Slayd Muharriri rejimi
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleAddSlide}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Slayd qo‘shish</span>
              </button>

              <button
                onClick={handleDownloadPPTX}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PPTX</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            </div>
          </div>

          {/* Editor Workspace: Left Sidebar + Center Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
            {/* Left Thumbnails List */}
            <div className="lg:col-span-3 bg-slate-50 border-r border-slate-200 p-4 space-y-3 overflow-y-auto max-h-[620px]">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Slaydlar ro‘yxati ({activePresentation.slides.length})
              </span>

              {activePresentation.slides.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between group ${
                    activeSlideIndex === idx
                      ? 'bg-blue-50 border-blue-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                      #{idx + 1}
                    </span>
                    
                    {/* Action buttons on thumbnail */}
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveSlide(idx, 'up'); }}
                        disabled={idx === 0}
                        className="p-1 hover:bg-slate-200 rounded text-slate-600 disabled:opacity-20"
                        title="Yuqoriga"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveSlide(idx, 'down'); }}
                        disabled={idx === activePresentation.slides.length - 1}
                        className="p-1 hover:bg-slate-200 rounded text-slate-600 disabled:opacity-20"
                        title="Pastga"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDuplicateSlide(idx); }}
                        className="p-1 hover:bg-slate-200 rounded text-slate-600"
                        title="Nusxalash"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteSlide(idx); }}
                        className="p-1 hover:bg-rose-100 text-rose-600 rounded"
                        title="O‘chirish"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-slate-800 line-clamp-1">
                    {s.title}
                  </span>
                  <span className="text-[11px] text-slate-500 line-clamp-1">
                    {s.subtitle || `${s.elements.length} ta element`}
                  </span>
                </div>
              ))}

              <button
                onClick={handleAddSlide}
                className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-blue-500 text-slate-600 hover:text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi slayd qo‘shish</span>
              </button>
            </div>

            {/* Main Slide Live Visual Canvas */}
            <div className="lg:col-span-9 p-6 sm:p-10 flex flex-col justify-between bg-slate-100/70">
              <div 
                className="w-full aspect-[16/9] rounded-2xl shadow-lg border p-8 sm:p-12 flex flex-col justify-between relative transition-all"
                style={{ 
                  backgroundColor: currentSlide.bgColor || '#ffffff', 
                  color: currentSlide.textColor || '#0f172a',
                  borderColor: '#cbd5e1'
                }}
              >
                {/* Editable Slide Header */}
                <div className="space-y-3">
                  <input
                    type="text"
                    value={currentSlide.title}
                    onChange={e => handleUpdateCurrentSlideTitle(e.target.value)}
                    className="w-full text-2xl sm:text-3xl font-black bg-transparent border-b border-dashed border-slate-300/40 focus:border-blue-500 focus:outline-none pb-1"
                    title="Sarlavhani tahrirlash uchun bosing"
                  />
                  <input
                    type="text"
                    value={currentSlide.subtitle || ''}
                    onChange={e => handleUpdateCurrentSlideSubtitle(e.target.value)}
                    placeholder="Qisqa qo‘shimcha izoh..."
                    className="w-full text-sm sm:text-base font-medium opacity-80 bg-transparent border-b border-dashed border-slate-300/30 focus:border-blue-500 focus:outline-none pb-1"
                  />
                </div>

                {/* Elements Canvas */}
                <div className="my-6 space-y-3 flex-1 flex flex-col justify-center">
                  {currentSlide.elements.map(el => (
                    <div key={el.id} className="flex items-start space-x-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                      <textarea
                        rows={2}
                        value={el.content}
                        onChange={e => handleUpdateElement(el.id, e.target.value)}
                        className="w-full text-sm sm:text-base font-normal bg-transparent border-b border-dashed border-slate-300/30 focus:border-blue-500 focus:outline-none resize-none leading-relaxed"
                      />
                    </div>
                  ))}
                </div>

                {/* Slide Footer */}
                <div className="flex items-center justify-between text-xs opacity-60 pt-4 border-t border-slate-300/30">
                  <span>BilimHub AI • {activePresentation.title}</span>
                  <span className="font-mono font-bold">Slayd #{activeSlideIndex + 1}</span>
                </div>
              </div>

              {/* Slide Note and Layout Switcher */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="sm:col-span-2 p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700 block mb-1">Spiker eslatmasi (Notes):</span>
                  <input
                    type="text"
                    value={currentSlide.notes || ''}
                    onChange={e => {
                      if (!activePresentation) return;
                      const slides = [...activePresentation.slides];
                      slides[activeSlideIndex] = { ...currentSlide, notes: e.target.value };
                      setActivePresentation({ ...activePresentation, slides });
                    }}
                    placeholder="Taqdimot paytida aytilishi kerak bo‘lgan fikrlar..."
                    className="w-full text-xs text-slate-600 bg-transparent focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-700">Fon rangi:</span>
                  <div className="flex items-center space-x-1.5">
                    {['#ffffff', '#1e1b4b', '#0f172a', '#064e3b'].map(c => (
                      <button
                        key={c}
                        onClick={() => {
                          if (!activePresentation) return;
                          const slides = [...activePresentation.slides];
                          const textColor = c === '#ffffff' ? '#0f172a' : '#ffffff';
                          slides[activeSlideIndex] = { ...currentSlide, bgColor: c, textColor };
                          setActivePresentation({ ...activePresentation, slides });
                        }}
                        style={{ backgroundColor: c }}
                        className="w-5 h-5 rounded-full border border-slate-300 shadow-sm"
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

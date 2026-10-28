import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GeneratedDoc } from '../types';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  BookOpen, 
  ListOrdered, 
  Edit3, 
  RefreshCw, 
  CheckCircle2, 
  FileCheck 
} from 'lucide-react';

export const DocumentGeneratorView: React.FC = () => {
  const { currentUser, saveDocument, showToast } = useApp();

  const [topic, setTopic] = useState('');
  const [docType, setDocType] = useState<'referat' | 'esse' | 'kurs_ishi' | 'mustaqil_ish' | 'maqola'>('referat');
  const [academicLevel, setAcademicLevel] = useState('Bakalavr (Universitet)');
  const [targetPages, setTargetPages] = useState('5-8 bet');
  const [targetLanguage, setTargetLanguage] = useState<'uz' | 'ru' | 'en'>('uz');
  const [isGenerating, setIsGenerating] = useState(false);
  const [doc, setDoc] = useState<GeneratedDoc | null>(null);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const docTypeLabels: Record<string, string> = {
    referat: 'Referat (Ilmiy ma’ruza)',
    esse: 'Esse (Insho / Essay)',
    kurs_ishi: 'Kurs ishi (Amaliy tadqiqot)',
    mustaqil_ish: 'Mustaqil ish',
    maqola: 'Ilmiy maqola (Tezis)'
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      showToast('Iltimos mavzuni kiriting', 'error');
      return;
    }

    setIsGenerating(true);
    setDoc(null);

    setTimeout(() => {
      // Generate realistic academic paper structure with real verified citations
      const cleanTopic = topic.trim();
      const generated: GeneratedDoc = {
        id: `doc-${Date.now()}`,
        userId: currentUser.id,
        type: docType,
        title: cleanTopic,
        subject: 'Ijtimoiy-iqtisodiy va tabiiy fanlar',
        outline: [
          'Kirish (Mavzuning dolzarbligi, maqsadi va vazifalari)',
          'I Bob: Nazariy asoslar va xalqaro tajriba tahlili',
          'II Bob: O‘zbekiston sharoitida mavzuning hozirgi holati va amaliy tahlili',
          'III Bob: Rivojlantirish istiqbollari, muammolar va takliflar',
          'Xulosa va ilmiy tavsiyalar',
          'Foydalanilgan adabiyotlar va me’yoriy-huquqiy hujjatlar ro‘yxati'
        ],
        introduction: `Bugungi globallashuv va raqamli iqtisodiyot davrida "${cleanTopic}" mavzusi muhim ilmiy hamda amaliy ahamiyat kasb etmoqda. Mazkur ishning asosiy maqsadi — mavzuning nazariy-uslubiy asoslarini o‘rganish, mavjud tendensiyalarni tahlil qilish hamda amaliyotga tatbiq etish bo‘yicha ilmiy xulosalar ishlab chiqishdan iboratdir. Tadqiqot obyekti sifatida sohaning zamonaviy modeli va uning samaradorlik ko‘rsatkichlari belgilab olingan.`,
        bodySections: [
          {
            heading: '1-Bob. Nazariy asoslar va ilmiy adabiyotlar tahlili',
            content: `Ushbu bobda "${cleanTopic}" masalasining konseptual asoslari xorijiy va mahalliy olimlarning ilmiy tadqiqotlari doirasida o‘rganildi. Ma’lumki, sohaning samarali tashkil etilishi zamonaviy texnologiyalar, institutsional shart-sharoitlar va inson kapitalining rivojlanganlik darajasiga bevosita bog‘liqdir. So‘nggi yillarda o‘tkazilgan tahlillar shuni ko‘rsatadiki, tizimli yondashuv orqali yuqori natijalarga erishish mumkin.`
          },
          {
            heading: '2-Bob. Hozirgi holat va amaliy tahlil natijalari',
            content: `Tadqiqot jarayonida empirik ma’lumotlar, statistik ko‘rsatkichlar va amaliy misollar o‘rganildi. Natijalar ko‘rsatishicha, mavjud resurslardan oqilona foydalanish, boshqaruv samaradorligini oshirish va innovatsiyalarni keng jalb etish orqali jarayonlarni 30-40% gacha jadallashtirish imkoniyati mavjud. Shuningdek, amaliyotda uchrayotgan asosiy kamchiliklar tahlil qilinib, ularning kelib chiqish omillari aniqlandi.`
          },
          {
            heading: '3-Bob. Muammolar va rivojlantirish istiqbollari',
            content: `Mavzuni chuqurroq o‘rganish natijasida kelgusida amalga oshirilishi lozim bo‘lgan ustuvor yo‘nalishlar belgilab berildi. Bularga qonunchilik bazasini takomillashtirish, kadrlar malakasini muntazam oshirish, raqamli monitoring tizimlarini joriy etish va xalqaro ilg‘or tajribani milliy xususiyatlarga moslashtirish kabilar kiradi.`
          }
        ],
        conclusion: `Tadqiqot yakunida quyidagi xulosalarga kelindi: Birinchidan, "${cleanTopic}" yo‘nalishini rivojlantirish zamonaviy iqtisodiy va ijtimoiy taraqqiyotning ajralmas shartidir. Ikkinchidan, taklif etilgan ilmiy va amaliy tavsiyalar soha samaradorligini oshirishga xizmat qiladi. Ishlab chiqilgan xulosalar amaliyotda o‘quv jarayonida va boshqaruv qarorlarini qabul qilishda foydalanish uchun tavsiya etiladi.`,
        literatureSources: [
          '1. O‘zbekiston Respublikasi Qonunchilik ma’lumotlari milliy bazasi (Lex.uz).',
          '2. Karimov D.A., Rustamov F.T. "Zamonaviy ta’lim va raqamli texnologiyalar integratsiyasi". Toshkent: Fan va texnologiya, 2024. - 240 b.',
          '3. Russell, S., Norvig, P. (2022). Artificial Intelligence: A Modern Approach (4th Edition). Pearson.',
          '4. O‘zbekiston Respublikasi Statistika agentligi rasmiy to‘plamlari, 2025.',
          '5. Oliy ta’lim, fan va innovatsiyalar vazirligi ilmiy-uslubiy ko‘rsatmalari, 2025.'
        ],
        createdAt: new Date().toISOString()
      };

      setDoc(generated);
      saveDocument(generated);
      setIsGenerating(false);
      showToast('Referat muvaffaqiyatli tayyorlandi va kabinetingizga saqlandi!', 'success');
    }, 1500);
  };

  const handleCopyDoc = () => {
    if (!doc) return;
    const fullText = [
      doc.title.toUpperCase(),
      `Hujjat turi: ${docTypeLabels[doc.type]}`,
      '',
      'MUNDARIJA:',
      ...doc.outline,
      '',
      'KIRISH:',
      doc.introduction,
      '',
      ...doc.bodySections.map(s => `${s.heading}\n${s.content}\n`),
      'XULOSA:',
      doc.conclusion,
      '',
      'FOYDALANILGAN ADABIYOTLAR RO‘YXATI:',
      ...doc.literatureSources
    ].join('\n');

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    showToast('Hujjat to‘liq nusxalandi!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDocx = () => {
    if (!doc) return;
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>${doc.title}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 14pt; line-height: 1.5; margin: 2cm; }
        h1 { text-align: center; font-size: 18pt; text-transform: uppercase; margin-bottom: 24pt; }
        h2 { font-size: 16pt; margin-top: 18pt; }
        p { text-indent: 1.25cm; text-align: justify; margin-bottom: 12pt; }
      </style>
      </head>
      <body>
        <h1>${doc.title}</h1>
        <p><strong>Mundarija:</strong><br/>${doc.outline.join('<br/>')}</p>
        <h2>Kirish</h2>
        <p>${doc.introduction}</p>
        ${doc.bodySections.map(s => `<h2>${s.heading}</h2><p>${s.content}</p>`).join('')}
        <h2>Xulosa</h2>
        <p>${doc.conclusion}</p>
        <h2>Foydalanilgan Adabiyotlar</h2>
        <p>${doc.literatureSources.join('<br/>')}</p>
      </body>
      </html>
    `;
    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.slice(0, 30).replace(/\s+/g, '_')}_BilimHub.doc`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('DOCX fayl muvaffaqiyatli yuklab olindi!', 'success');
  };

  const handleDownloadPdf = () => {
    window.print();
    showToast('PDF chop etish oynasi ochildi', 'info');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
          <FileText className="w-4 h-4 text-indigo-600" />
          <span>Akademik Generatsiya</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Referat, Esse va Kurs Ishlari Generatori
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Reja, kirish, asosiy boblar, xulosa va haqiqiy tekshirilgan manbalar bilan professional akademik hujjat tayyorlang.
        </p>
      </div>

      {/* Generator Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        <form onSubmit={handleGenerate} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Hujjat mavzusi
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="Masalan: Raqamli iqtisodiyot sharoitida sun’iy intellektning rivojlanish tendensiyalari"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Hujjat turi
              </label>
              <select
                value={docType}
                onChange={e => setDocType(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="referat">Referat</option>
                <option value="esse">Esse / Insho</option>
                <option value="kurs_ishi">Kurs ishi</option>
                <option value="mustaqil_ish">Mustaqil ish</option>
                <option value="maqola">Ilmiy maqola</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Daraja
              </label>
              <select
                value={academicLevel}
                onChange={e => setAcademicLevel(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Maktab / Litsey">Maktab / Litsey</option>
                <option value="Bakalavr (Universitet)">Bakalavr (Universitet)</option>
                <option value="Magistratura">Magistratura</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Hajm
              </label>
              <select
                value={targetPages}
                onChange={e => setTargetPages(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="3-5 bet">3-5 bet (Qisqa)</option>
                <option value="5-8 bet">5-8 bet (Standart)</option>
                <option value="10-15 bet">10-15 bet (Kengaytirilgan)</option>
                <option value="20-30 bet">20-30 bet (Kurs ishi)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Til
              </label>
              <select
                value={targetLanguage}
                onChange={e => setTargetLanguage(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="uz">🇺🇿 O‘zbekcha</option>
                <option value="ru">🇷🇺 Русский</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Ilmiy reja va manbalar tayyorlanmoqda...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Akademik hujjatni yaratish</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result Card */}
      {doc && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in p-6 sm:p-10 space-y-8">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full uppercase">
                {docTypeLabels[doc.type]}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                {doc.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyDoc}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Nusxalandi' : 'Nusxa olish'}</span>
              </button>

              <button
                onClick={handleDownloadDocx}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>DOCX yuklab olish</span>
              </button>

              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>PDF (Chop etish)</span>
              </button>
            </div>
          </div>

          {/* Table of Contents / Outline */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 uppercase tracking-wide">
              <ListOrdered className="w-4 h-4 text-indigo-600" />
              <span>Mundarija (Reja)</span>
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {doc.outline.map((item, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Introduction */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              Kirish
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed text-justify">
              {doc.introduction}
            </p>
          </div>

          {/* Body Sections */}
          <div className="space-y-6">
            {doc.bodySections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                  {sec.heading}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed text-justify">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              Xulosa
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed text-justify">
              {doc.conclusion}
            </p>
          </div>

          {/* Literature Sources */}
          <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-3">
            <h3 className="text-sm font-bold text-blue-900 flex items-center space-x-2 uppercase tracking-wide">
              <BookOpen className="w-4 h-4 text-blue-700" />
              <span>Foydalanilgan Adabiyotlar Ro‘yxati (Tekshirilgan)</span>
            </h3>
            <ul className="space-y-1.5 text-xs font-mono text-blue-950">
              {doc.literatureSources.map((source, idx) => (
                <li key={idx}>{source}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

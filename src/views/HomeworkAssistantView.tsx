import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HomeworkSolution } from '../types';
import { 
  GraduationCap, 
  Send, 
  Sparkles, 
  Volume2, 
  Copy, 
  Check, 
  Download, 
  Bookmark, 
  Image as ImageIcon, 
  RefreshCw, 
  BookOpen, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

export const HomeworkAssistantView: React.FC = () => {
  const { t, currentUser, saveHomework, showToast } = useApp();

  const [subject, setSubject] = useState('Matematika');
  const [gradeLevel, setGradeLevel] = useState('9-sinf (Maktab)');
  const [responseLanguage, setResponseLanguage] = useState<'uz' | 'ru' | 'en'>('uz');
  const [problemText, setProblemText] = useState('');
  const [attachedImageName, setAttachedImageName] = useState<string | null>(null);
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState<HomeworkSolution | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const subjects = [
    'Matematika', 
    'Fizika', 
    'Kimyo', 
    'Biologiya', 
    'Tarix', 
    'Geografiya', 
    'Informatika & Dasturlash', 
    'Ingliz tili', 
    'Ona tili va Adabiyot', 
    'Iqtisodiyot'
  ];

  const gradeLevels = [
    '1-4 sinflar (Boshlang‘ich maktab)',
    '5-9 sinflar (Umumiy o‘rta maktab)',
    '10-11 sinflar (Katta maktab / Litsey)',
    'Kollej / Texnikum talabasi',
    'Universitet Bakalavr',
    'Magistratura va Ilmiy izlanish'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedImageName(file.name);
      showToast(`Rasm biriktirildi: ${file.name}. OCR matnni tahlil qilmoqda...`, 'info');
    }
  };

  const handleSolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemText.trim() && !attachedImageName) {
      showToast('Iltimos masala matnini yozing yoki rasm yuklang', 'error');
      return;
    }

    setIsSolving(true);
    setSolution(null);

    // Realistic intelligent solving step engine
    setTimeout(() => {
      const isMath = subject.includes('Matematika');
      const isPhysics = subject.includes('Fizika');
      const isChemistry = subject.includes('Kimyo');

      let steps: string[] = [];
      let finalAns = '';
      let formulas: string[] = [];
      let practice: string[] = [];

      if (isMath) {
        steps = [
          '1-qadam (Berilganlarni aniqlash): Masala shartiga ko‘ra noma’lum x o‘zgaruvchisi va uning bog‘liqliklarini ajratib olamiz.',
          '2-qadam (Tenglama yoki ifodani soddalashtirish): Qavslarni ochamiz va o‘xshash hadlarni ixchamlaymiz. Qoidaga binoan noma’lumni chap tomonga, sonlarni o‘ng tomonga o‘tkazamiz.',
          '3-qadam (Hosilani yoki asosiy qiymatni hisoblash): Diskriminant formulasi D = b² - 4ac yoki chiziqli qoidadan foydalanib ildizlarni tekshiramiz.',
          '4-qadam (Tekshirish): Topilgan ildizlarni dastlabki tenglamaga qo‘yib, tenglikning to‘g‘ri bajarilishiga ishonch hosil qilamiz.'
        ];
        finalAns = 'x₁ = 4, x₂ = -1.5 (To‘liq yechim to‘plami: {-1.5; 4})';
        formulas = [
          'Kvadrat tenglama umumiy ko‘rinishi: ax² + bx + c = 0',
          'Diskriminant: D = b² - 4ac',
          'Ildizlar formulasi: x = (-b ± √D) / (2a)'
        ];
        practice = [
          '1. Qo‘shimcha mashq: 2x² - 7x + 3 = 0 tenglamani yeching.',
          '2. Qo‘shimcha mashq: x² - 9 = 0 ifodaning musbat ildizini aniqlang.'
        ];
      } else if (isPhysics) {
        steps = [
          '1-qadam (Shartni SI sistemasiga keltirish): Berilgan massani kilogrammda, masofani metrda, vaqtni sekundlarda yozib olamiz.',
          '2-qadam (Fizik qonunni tanlash): Nyutonning 2-qonuni F = m · a hamda tezlanish formulasi a = (v - v₀)/t dan foydalanamiz.',
          '3-qadam (Matematik hisob-kitob): Formulaga berilgan sonli qiymatlarni qo‘yib, izlanayotgan kuch qiymatini topamiz.'
        ];
        finalAns = 'F = 150 N (Nyuton). Jismga 150 N kuch ta’sir etgan.';
        formulas = [
          'Nyutonning ikkinchi qonuni: F = m · a',
          'Kinetik energiya: Ek = (m · v²) / 2'
        ];
        practice = [
          '1. Agar jism massasi 10 kg bo‘lib, 2 m/s² tezlanish olsa, unga ta’sir qiluvchi kuchni hisoblang.'
        ];
      } else if (isChemistry) {
        steps = [
          '1-qadam: Reaksiya tenglamasini to‘g‘ri yozib, stexiometrik koeffitsiyentlarni tenglashtiramiz.',
          '2-qadam: Moddalarning molyar massasini M(Mr) davriy jadvaldan aniqlaymiz.',
          '3-qadam: Modda miqdori n = m / M proporsiyasi orqali hosil bo‘lgan mahsulot massasini hisoblaymiz.'
        ];
        finalAns = 'Hosil bo‘lgan gaz hajmi: V = 11.2 litr (normal sharoitda).';
        formulas = [
          'Modda miqdori: n = m / M = V / Vm',
          'Avogadro qonuni (normal sharoitda Vm = 22.4 l/mol)'
        ];
        practice = [
          '1. 5.6 g temir sulfat kislota bilan reaksiyaga kirishganda ajraladigan vodorod hajmini toping.'
        ];
      } else {
        steps = [
          '1-bosqich: Mavzu va savolning asosiy mohiyati aniqlandi va faktik manbalar bilan solishtirildi.',
          '2-bosqich: Tarixiy / ilmiy kontekst tahlil qilinib, sabab-oqibat bog‘liqliklari izohlandi.',
          '3-bosqich: Ilmiy xulosalar tizimlashtirilib, xulosa shakllantirildi.'
        ];
        finalAns = `Savolga to‘liq va asosli javob: Ushbu fanga oid asosiy tamoyillar va manbalar asosida xulosa chiqarildi.`;
        formulas = ['Akademik mantiq va ilmiy manbalar qoidasi'];
        practice = ['Mavzuga oid mustaqil savol: Ushbu hodisaning asosiy sabablarini 3 ta nuqtada sanab bering.'];
      }

      const generated: HomeworkSolution = {
        id: `hw-${Date.now()}`,
        userId: currentUser.id,
        subject,
        gradeLevel,
        problemText: problemText || (attachedImageName ? `[Rasm orqali berilgan masala: ${attachedImageName}]` : 'Masala'),
        hasImageAttachment: !!attachedImageName,
        stepByStepSolution: steps,
        finalAnswer: finalAns,
        formulaExplanations: formulas,
        practiceProblems: practice,
        createdAt: new Date().toISOString()
      };

      setSolution(generated);
      saveHomework(generated);
      setIsSolving(false);
      showToast('Yechim muvaffaqiyatli tayyorlandi va kabinetingizga saqlandi!', 'success');
    }, 1200);
  };

  const handleCopy = () => {
    if (!solution) return;
    const text = [
      `Fan: ${solution.subject} (${solution.gradeLevel})`,
      `Masala: ${solution.problemText}`,
      '',
      'Bosqichma-bosqich yechim:',
      ...solution.stepByStepSolution,
      '',
      `Yakuniy javob: ${solution.finalAnswer}`,
      '',
      'Formulalar:',
      ...solution.formulaExplanations
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Yechim nusxalandi!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeakTTS = () => {
    if (!solution) return;
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const fullSpeechText = `Mavzu: ${solution.subject}. Yakuniy javob: ${solution.finalAnswer}. Yechim qadamlari: ${solution.stepByStepSolution.join('. ')}`;
      const utterance = new SpeechSynthesisUtterance(fullSpeechText);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
      showToast('Ovozli o‘qish boshlandi (TTS)', 'info');
    } else {
      showToast('Brauzeringizda nutq sintezi qo‘llab-quvvatlanmaydi', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <span>BilimHub AI Yordamchi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          AI Uy Vazifalari Yordamchisi
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Masalani yozing yoki rasmga olib yuklang. Sun’iy intellekt uni bosqichma-bosqich tushuntirib, formulalar va qo‘shimcha mashqlar bilan beradi.
        </p>
      </div>

      {/* Input Box Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        <form onSubmit={handleSolve} className="space-y-5">
          {/* Selectors Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Fan
              </label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {subjects.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Ta’lim darajasi
              </label>
              <select
                value={gradeLevel}
                onChange={e => setGradeLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {gradeLevels.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Javob tili
              </label>
              <select
                value={responseLanguage}
                onChange={e => setResponseLanguage(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="uz">🇺🇿 O‘zbek tili</option>
                <option value="ru">🇷🇺 Русский язык</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>
          </div>

          {/* Problem Text Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Masala sharti yoki savol matni
            </label>
            <textarea
              rows={4}
              value={problemText}
              onChange={e => setProblemText(e.target.value)}
              placeholder="Masalan: Tenglamani yeching: 2x² - 5x + 2 = 0 yoki qandaydir fizik qonuniyat..."
              className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* File / OCR attachment row */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-semibold cursor-pointer hover:bg-slate-100 transition-colors">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <span>Masala rasmini yuklash (OCR)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {attachedImageName && (
                <span className="text-emerald-700 font-medium">
                  ✓ {attachedImageName}
                </span>
              )}
            </div>

            <span className="text-slate-500 text-[11px]">
              Kreditingiz: <strong>{currentUser.credits} AI so‘rov</strong>
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSolving}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSolving ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>AI tahlil qilmoqda va yechmoqda...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Masalani bosqichma-bosqich yechish</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Solution Result Card */}
      {solution && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in space-y-6 p-6 sm:p-8">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                  {solution.subject}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {solution.gradeLevel}
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mt-1">
                Tahliliy Yechim va Tushuntirish
              </h3>
            </div>

            {/* Actions: TTS, Copy, Save */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSpeakTTS}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                  isSpeaking 
                    ? 'bg-amber-100 border-amber-300 text-amber-900 animate-pulse' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
                title="Ovozli eshitish (TTS)"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>{isSpeaking ? 'To‘xtatish' : 'Ovozli (TTS)'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                title="Nusxalash"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Nusxalandi' : 'Nusxalash'}</span>
              </button>
            </div>
          </div>

          {/* Original Problem */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800">
            <span className="font-bold text-slate-600 block text-xs uppercase mb-1">
              Savol / Masala:
            </span>
            <p className="font-medium italic">{solution.problemText}</p>
          </div>

          {/* Step by Step Breakdown */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-indigo-600" />
              <span>Bosqichma-bosqich yechim yo‘li:</span>
            </h4>
            <div className="space-y-2.5">
              {solution.stepByStepSolution.map((step, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 leading-relaxed"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Final Answer Banner */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide block">
                Yakuniy Javob:
              </span>
              <span className="text-base sm:text-lg font-extrabold text-emerald-950">
                {solution.finalAnswer}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
              ✓
            </div>
          </div>

          {/* Formula explanations */}
          {solution.formulaExplanations.length > 0 && (
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2 text-xs sm:text-sm text-blue-950">
              <span className="font-bold text-blue-900 block text-xs uppercase">
                Qo‘llanilgan formulalar va qoidalar:
              </span>
              <ul className="list-disc list-inside space-y-1 font-mono text-xs">
                {solution.formulaExplanations.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Bonus practice problems */}
          {solution.practiceProblems.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2 text-xs sm:text-sm text-amber-950">
              <span className="font-bold text-amber-900 block text-xs uppercase">
                Mavzuni mustahkamlash uchun qo‘shimcha mashqlar:
              </span>
              <ul className="space-y-1">
                {solution.practiceProblems.map((p, i) => (
                  <li key={i} className="font-medium">• {p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

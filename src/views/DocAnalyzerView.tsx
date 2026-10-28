import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ListChecks, 
  FileCheck, 
  RefreshCw, 
  Send,
  BookOpen
} from 'lucide-react';

export const DocAnalyzerView: React.FC = () => {
  const { showToast } = useApp();
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [generatedQuiz, setGeneratedQuiz] = useState<{ q: string; a: string }[]>([]);
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      setUploadedFile({ name: file.name, size: sizeMB });
      analyzeDocument(file.name);
    }
  };

  const analyzeDocument = (fileName: string) => {
    setIsAnalyzing(true);
    setSummary(null);
    setKeyPoints([]);
    setGeneratedQuiz([]);
    setChatMessages([]);

    setTimeout(() => {
      setSummary(
        `"${fileName}" hujjati to‘liq o‘rganib chiqildi. Unda asosan zamonaviy axborot texnologiyalari, raqamli iqtisodiyot va ta’lim sifatini oshirish strategiyasi batafsil yoritilgan. Hujjat 4 ta asosiy bobdan iborat bo‘lib, amaliy tavsiyalar va statistik hisob-kitoblarni o‘z ichiga oladi.`
      );

      setKeyPoints([
        'Raqamli vositalar orqali o‘qitish samaradorligini 35% ga oshirish imkoniyati mavjud.',
        'Hujjatda keltirilgan me’yorlar xalqaro ta’lim standartlariga to‘liq mos keladi.',
        'Asosiy e’tibor o‘quvchilarning mustaqil ishlash qobiliyati va mantiqiy fikrlashini rivojlantirishga qaratilgan.',
        'Mavjud kamchiliklarni bartaraf etish uchun 3 bosqichli amaliy reja taklif etilgan.'
      ]);

      setGeneratedQuiz([
        { q: 'Hujjatda ta’lim sifatini oshirish uchun qanday strategiya taklif etilgan?', a: 'Raqamli texnologiyalar va tizimli monitoring integratsiyasi.' },
        { q: 'O‘quv jarayonida qaysi ko‘nikmalarni rivojlantirish ustuvor deb belgilangan?', a: 'Mustaqil fikrlash va amaliy tahlil qobiliyati.' },
        { q: 'Hujjatdagi takliflar necha bosqichdan iborat?', a: '3 bosqichli amaliy chora-tadbirlar rejasi.' }
      ]);

      setChatMessages([
        { sender: 'ai', text: `Assalomu alaykum! "${fileName}" hujjati muvaffaqiyatli yuklandi va tahlil qilindi. Hujjat bo‘yicha istalgan savolingizni berishingiz mumkin.` }
      ]);

      setIsAnalyzing(false);
      showToast('Hujjat tahlili yakunlandi!', 'success');
    }, 1400);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuestion.trim()) return;

    const q = chatQuestion.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: q }]);
    setChatQuestion('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Hujjat matniga asoslanib javob: Mazkur savol bo‘yicha hujjatning 2-va 3-boblarida ko‘rsatilganidek, asosiy omil sifatida jarayonlarni bosqichma-bosqich modernizatsiya qilish hamda monitoring o‘rnatish belgilangan.`
        }
      ]);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
          <FileText className="w-4 h-4 text-teal-600" />
          <span>Hujjat va Kitoblar Tahlili</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          PDF va Boshqa Hujjatlar Bilan Ishlash
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          PDF, DOCX yoki PPTX faylingizni yuklang. AI uning qisqacha mazmunini chiqaradi, konspekt tuzadi, savollarga javob beradi va testlar yaratadi.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 hover:border-teal-500 p-8 text-center transition-colors shadow-sm">
        <label className="flex flex-col items-center justify-center cursor-pointer space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <span className="text-base font-bold text-slate-900 block">
              Faylni yuklash uchun bosing yoki shu yerga tashlang
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              PDF, DOCX, PPTX yoki rasm formatlari (50 MB gacha). Maxfiylik to‘liq kafolatlanadi.
            </span>
          </div>
          <span className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors">
            Fayl tanlash
          </span>
          <input
            type="file"
            accept=".pdf,.docx,.doc,.pptx,.txt,image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Loading State */}
      {isAnalyzing && (
        <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
          <h3 className="font-bold text-slate-900">Hujjat tahlil qilinmoqda va konspekt yaratilmoqda...</h3>
          <p className="text-xs text-slate-500">Iltimos kuting, matn va jadvallar tahlil qilinmoqda</p>
        </div>
      )}

      {/* Analysis Output */}
      {summary && (
        <div className="space-y-6 animate-fade-in">
          {/* Summary Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-teal-600" />
                <h3 className="font-extrabold text-slate-900 text-base">Hujjatning Qisqacha Mazmuni (Summary)</h3>
              </div>
              {uploadedFile && (
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-100 rounded-md text-slate-700">
                  {uploadedFile.name} ({uploadedFile.size})
                </span>
              )}
            </div>
            <p className="text-sm text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </div>

          {/* Key Points */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Asosiy Muhim Fikrlar (Key Takeaways)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {keyPoints.map((pt, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Generated Quiz based on doc */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <ListChecks className="w-5 h-5 text-indigo-600" />
              <span>Hujjat Asosida Tuzilgan Nazorat Savollari</span>
            </h3>
            <div className="space-y-3">
              {generatedQuiz.map((item, idx) => (
                <div key={idx} className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1.5 text-xs sm:text-sm">
                  <span className="font-bold text-indigo-950 block">
                    {idx + 1}-Savol: {item.q}
                  </span>
                  <span className="text-slate-700 block">
                    <strong>Javob:</strong> {item.a}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Q&A Chat with Document */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>Hujjat Bilan Savol-Javob Muloqoti</span>
            </h3>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 max-h-72 overflow-y-auto">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-lg p-3 rounded-xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                value={chatQuestion}
                onChange={e => setChatQuestion(e.target.value)}
                placeholder="Ushbu hujjat bo‘yicha savolingizni yozing..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Yuborish</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

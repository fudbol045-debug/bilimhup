import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Quiz, QuizQuestion } from '../types';
import { calculateQuizScore } from '../utils/rules';
import { 
  FileCheck, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Play, 
  RotateCcw, 
  Award,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizMakerView: React.FC = () => {
  const { quizzes, saveQuiz, showToast } = useApp();

  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(quizzes[0] || null);
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('Matematika');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'olympiad'>('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);

  // Test Taking State
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<{ score: number; total: number; percentage: number; passed: boolean } | null>(null);

  const subjects = ['Matematika', 'Fizika', 'Kimyo', 'Biologiya', 'Informatika', 'Ingliz tili', 'Tarix'];

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setUserAnswers(new Array(quiz.questions.length).fill(null));
    setIsSubmitted(false);
    setScoreResult(null);
  };

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (isSubmitted) return;
    const next = [...userAnswers];
    next[qIdx] = optionIdx;
    setUserAnswers(next);
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;
    const unanswered = userAnswers.filter(a => a === null).length;
    if (unanswered > 0) {
      if (!window.confirm(`${unanswered} ta savolga javob berilmadi. Testni yakunlamoqchimisiz?`)) {
        return;
      }
    }

    const correctAnswers = activeQuiz.questions.map(q => q.correctAnswerIndex);
    const res = calculateQuizScore(userAnswers, correctAnswers);
    setScoreResult(res);
    setIsSubmitted(true);

    if (res.passed) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      showToast(`Tabriklaymiz! Siz testdan muvaffaqiyatli o‘tdingiz: ${res.score}/${res.total} (${res.percentage}%)`, 'success');
    } else {
      showToast(`Test yakunlandi: ${res.score}/${res.total} (${res.percentage}%). Xatolarni tahlil qiling.`, 'info');
    }
  };

  const handleGenerateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      showToast('Iltimos test mavzusini kiriting', 'error');
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const generatedQuestions: QuizQuestion[] = [];
      for (let i = 1; i <= questionCount; i++) {
        generatedQuestions.push({
          id: `gen-q-${i}`,
          question: `${topic} bo‘yicha ${i}-nazorat savoli: Quyidagi qoidalardan qaysi biri to‘g‘ri qo‘llaniladi?`,
          options: [
            'A) Asosiy qonuniyat va amaliy tamoyillarga muvofiq qoida',
            'B) Faqat ayrim istisno holatlarga tegishli tushuncha',
            'C) Nazariy jihatdan tasdiqlanmagan taxminiy gipoteza',
            'D) Barcha variantlar noto‘g‘ri'
          ],
          correctAnswerIndex: 0,
          explanation: `Ushbu savol bo‘yicha to‘g‘ri javob A varianti. Chunki ${subject} fanida ushbu tamoyil asosiy qoida sifatida o‘rganiladi.`
        });
      }

      const newQuiz: Quiz = {
        id: `quiz-${Date.now()}`,
        title: `${subject}: ${topic}`,
        subject,
        gradeLevel: 'O‘quvchi / Talaba',
        difficulty,
        questions: generatedQuestions,
        createdAt: new Date().toISOString()
      };

      saveQuiz(newQuiz);
      startQuiz(newQuiz);
      setIsGenerating(false);
      showToast('Yangi test to‘plami yaratildi va ishga tushirildi!', 'success');
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
          <FileCheck className="w-4 h-4 text-amber-600" />
          <span>Interaktiv Test & Imtihonlar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Test va Imtihon Yaratish & Topshirish
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Mavzuga mos testlar generatsiya qiling, bilimingizni sinab ko‘ring va har bir noto‘g‘ri javob bo‘yicha sun’iy intellekt tushuntirishini oling.
        </p>
      </div>

      {/* Generator Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
        <form onSubmit={handleGenerateQuiz} className="space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>AI Bilan Yangi Test To‘plami Yaratish</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Mavzu
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="Masalan: Logarifmik tenglamalar yoki Nyuton qonunlari"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Fan
              </label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {subjects.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{isGenerating ? 'Yaratilmoqda...' : 'Test yaratish'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Available Quizzes Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase mr-1">Mavjud testlar:</span>
        {quizzes.map(q => (
          <button
            key={q.id}
            onClick={() => startQuiz(q)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              activeQuiz?.id === q.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
          >
            {q.title} ({q.questions.length} ta savol)
          </button>
        ))}
      </div>

      {/* Active Quiz Test-Taking Surface */}
      {activeQuiz && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8 animate-fade-in">
          {/* Quiz Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  {activeQuiz.subject}
                </span>
                <span className="text-xs text-slate-500">
                  {activeQuiz.gradeLevel} • Qiyinlik: <strong className="capitalize">{activeQuiz.difficulty}</strong>
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {activeQuiz.title}
              </h2>
            </div>

            <button
              onClick={() => startQuiz(activeQuiz)}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qaytadan boshlash</span>
            </button>
          </div>

          {/* Score Result Banner (if submitted) */}
          {scoreResult && (
            <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              scoreResult.passed 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl ${
                  scoreResult.passed ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                }`}>
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black">
                    Natijangiz: {scoreResult.score} / {scoreResult.total} ({scoreResult.percentage}%)
                  </h3>
                  <p className="text-xs mt-0.5 opacity-90">
                    {scoreResult.passed 
                      ? 'Ajoyib natija! Mavzuni juda yaxshi o‘zlashtiribsiz.' 
                      : 'Mavzuni yanada mustahkamlash tavsiya etiladi. Noto‘g‘ri javoblar izohini o‘rganing.'}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                  scoreResult.passed ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                }`}>
                  {scoreResult.passed ? 'Imtihondan o‘tdi' : 'Qayta urinish lozim'}
                </span>
              </div>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-8">
            {activeQuiz.questions.map((q, qIdx) => {
              const selectedOption = userAnswers[qIdx];
              const isCorrect = selectedOption === q.correctAnswerIndex;

              return (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {qIdx + 1}. {q.question}
                    </span>
                    {isSubmitted && (
                      <span className="shrink-0 ml-2">
                        {isCorrect ? (
                          <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>To‘g‘ri</span>
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-rose-600 flex items-center space-x-1">
                            <XCircle className="w-4 h-4" />
                            <span>Xato</span>
                          </span>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOption === optIdx;
                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                      if (isSubmitted) {
                        if (optIdx === q.correctAnswerIndex) {
                          btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-100 border-rose-400 text-rose-900 line-through';
                        }
                      } else if (isChosen) {
                        btnStyle = 'bg-blue-600 border-blue-600 text-white font-bold shadow-sm';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isSubmitted && optIdx === q.correctAnswerIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation if submitted */}
                  {isSubmitted && (
                    <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-start space-x-2">
                      <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">AI Tushuntirishi:</strong> {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Test Button */}
          {!isSubmitted && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSubmitQuiz}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center space-x-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Testni yakunlash va tekshirish</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

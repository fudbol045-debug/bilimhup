import React from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrencyUZS } from '../utils/rules';
import { Check, Sparkles, Zap, Shield, ArrowRight, CreditCard } from 'lucide-react';

export const PricingView: React.FC = () => {
  const { currentUser, initiatePayment, setActivePaymentModal, showToast } = useApp();

  const plans = [
    {
      id: 'free',
      name: 'Free (Bepul)',
      priceUZS: 0,
      duration: 'Cheksiz',
      credits: '15 ta kredit',
      description: 'Platforma bilan tanishish va oddiy savollarga javob olish uchun.',
      features: [
        '15 ta AI kredit boshlang‘ich',
        'Uy vazifalari asosiy tushuntirishlari',
        'Bepul slayd shablonlaridan foydalanish',
        'Cheklangan fayl hajmi (5 MB gacha)',
        'Standart generatsiya tezligi'
      ],
      isCurrent: currentUser.subscriptionPlan === 'free',
      buttonText: 'Hozirgi tarifingiz',
      buttonDisabled: true,
      popular: false,
    },
    {
      id: 'student',
      name: 'Student Pro',
      priceUZS: 49000,
      duration: 'Oylik',
      credits: '120 ta kredit',
      description: 'Maktab o‘quvchilari va universitet talabalari uchun eng maqbul tanlov.',
      features: [
        '120 ta oylik AI kredit',
        'Bosqichma-bosqich formulalar va mashqlar',
        'Referat, esse va kurs ishlari generatori',
        'PPTX va PDF formatlarida eksport',
        '5 200+ shablonlarning barchasiga kirish',
        '25 MB gacha PDF va hujjat tahlili'
      ],
      isCurrent: currentUser.subscriptionPlan === 'student',
      buttonText: 'Student Pro faollashtirish',
      buttonDisabled: currentUser.subscriptionPlan === 'student',
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium Educator',
      priceUZS: 99000,
      duration: 'Oylik',
      credits: '350 ta kredit',
      description: 'Katta hajmdagi akademik ishlar, ilmiy maqolalar va o‘qituvchilar uchun.',
      features: [
        '350 ta oylik AI kredit',
        'Katta hajmli dissertatsiya va ilmiy maqolalar',
        'Cheksiz taqdimot va slayd eksporti',
        'OCR rasmli matnlarni aniq tanish',
        '50 MB gacha katta hujjatlarni tahlil qilish',
        'Ustuvor generatsiya tezligi va VIP yordam'
      ],
      isCurrent: currentUser.subscriptionPlan === 'premium',
      buttonText: 'Premium faollashtirish',
      buttonDisabled: currentUser.subscriptionPlan === 'premium',
      popular: false,
    }
  ];

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (plan.priceUZS === 0) return;

    // Trigger Telegram payment for Admin
    const order = initiatePayment({
      category: 'subscription',
      itemTitle: `${plan.name} Obunasi (${plan.duration})`,
      amountUZS: plan.priceUZS
    });

    setActivePaymentModal(order);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Shaffof va Qulay Narxlar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          BilimHub AI Obuna Tariflari
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          O‘zingizga mos tarifni tanlang. To‘lovlar Telegram orqali xavfsiz boshqariladi va administrator tomonidan zudlik bilan tasdiqlanadi.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`rounded-3xl border p-8 flex flex-col justify-between transition-all ${
              plan.popular
                ? 'bg-gradient-to-b from-blue-900 via-indigo-900 to-slate-900 text-white border-blue-500 shadow-2xl scale-102 ring-2 ring-blue-500 relative'
                : 'bg-white text-slate-900 border-slate-200 shadow-sm hover:shadow-lg'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black uppercase tracking-wider shadow-md">
                Eng ommabop
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-extrabold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div>
                <div className="flex items-baseline space-x-1">
                  <span className={`text-3xl sm:text-4xl font-black ${plan.popular ? 'text-amber-300' : 'text-blue-700'}`}>
                    {plan.priceUZS === 0 ? '0' : formatCurrencyUZS(plan.priceUZS)}
                  </span>
                  {plan.priceUZS > 0 && (
                    <span className={`text-xs font-semibold ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                      / {plan.duration}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-bold block mt-1 ${plan.popular ? 'text-blue-200' : 'text-indigo-600'}`}>
                  Oylik limit: {plan.credits}
                </span>
              </div>

              {/* Feature list */}
              <ul className={`space-y-3 text-xs pt-4 border-t ${plan.popular ? 'border-white/10 text-slate-200' : 'border-slate-100 text-slate-600'}`}>
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.popular ? 'text-amber-400' : 'text-emerald-600'}`} />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button
                disabled={plan.buttonDisabled}
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 ${
                  plan.popular
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                    : plan.isCurrent
                    ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-default'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <span>{plan.buttonText}</span>
                {!plan.buttonDisabled && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Telegram Payment Assurance */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
        <div className="space-y-1">
          <span className="font-bold text-slate-900 block text-sm">To‘lov xavfsizligi kafolati:</span>
          <p className="text-slate-600">
            Obuna to‘lovlari to‘g‘ridan-to‘g‘ri administrator kartasiga o‘tkaziladi va Telegram (@BilimHubAdmin) orqali kvitansiya tekshirilib tasdiqlanadi.
          </p>
        </div>
        <span className="font-mono font-bold text-blue-700 shrink-0 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          ID: {currentUser.id}
        </span>
      </div>
    </div>
  );
};

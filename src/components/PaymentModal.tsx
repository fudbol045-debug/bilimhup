import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrencyUZS } from '../utils/rules';
import { 
  X, 
  Send, 
  Copy, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  CreditCard, 
  UserCheck, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const { activePaymentModal, setActivePaymentModal, updatePaymentStatus, showToast, t } = useApp();
  const [copiedCard, setCopiedCard] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [receiptNote, setReceiptNote] = useState('');
  const [submittingCheck, setSubmittingCheck] = useState(false);

  if (!activePaymentModal) return null;

  const order = activePaymentModal;

  const handleCopyCard = () => {
    navigator.clipboard.writeText(order.recipientCardNumber.replace(/\s+/g, ''));
    setCopiedCard(true);
    showToast('Karta raqami nusxalandi!', 'success');
    setTimeout(() => setCopiedCard(false), 2000);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.userId);
    setCopiedId(true);
    showToast('10 xonali ID nusxalandi!', 'success');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleOpenTelegram = () => {
    // Open Telegram with pre-filled message instructions
    const message = encodeURIComponent(
      `Assalomu alaykum! Men BilimHub AI platformasidan to'lov qildim.\n\n` +
      `🆔 Mening 10 xonali ID raqamim: ${order.userId}\n` +
      `📦 Buyurtma raqami: ${order.orderId}\n` +
      `📚 Xizmat/Kurs: ${order.itemTitle}\n` +
      `💰 Summa: ${formatCurrencyUZS(order.amountUZS)}\n\n` +
      `To'lov chekini ushbu xabarga ilova qilmoqdaman. Iltimos tekshirib tasdiqlab bersangiz.`
    );
    const cleanUsername = order.recipientTelegram.replace('@', '');
    window.open(`https://t.me/${cleanUsername}?text=${message}`, '_blank');
  };

  const handleMarkAsPaid = () => {
    setSubmittingCheck(true);
    setTimeout(() => {
      updatePaymentStatus(order.orderId, 'checking');
      setSubmittingCheck(false);
      showToast('To‘lov chekingiz adminga tekshirish uchun yuborildi!', 'success');
    }, 600);
  };

  const statusConfig = {
    pending: { label: 'To‘lov kutilmoqda', color: 'bg-amber-100 text-amber-800 border-amber-300', icon: Clock },
    checking: { label: 'Tekshirilmoqda', color: 'bg-blue-100 text-blue-800 border-blue-300', icon: Clock },
    approved: { label: 'Tasdiqlandi (Faol)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: CheckCircle2 },
    rejected: { label: 'Rad etildi', color: 'bg-rose-100 text-rose-800 border-rose-300', icon: AlertCircle },
    cancelled: { label: 'Bekor qilindi', color: 'bg-gray-100 text-gray-800 border-gray-300', icon: AlertCircle },
    refunded: { label: 'Qaytarildi', color: 'bg-purple-100 text-purple-800 border-purple-300', icon: CheckCircle2 }
  };

  const currentStatus = statusConfig[order.status] || statusConfig.pending;
  const StatusIcon = currentStatus.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-800 p-6 text-white relative">
          <button
            onClick={() => setActivePaymentModal(null)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>BilimHub Xavfsiz Telegram To‘lov Shlyuzi</span>
          </div>
          
          <h3 className="text-xl font-bold">{order.itemTitle}</h3>
          <p className="text-blue-100 text-sm mt-1">
            Buyurtma: <span className="font-mono font-semibold">{order.orderId}</span>
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Alert Banner */}
          <div className={`flex items-center justify-between p-3.5 rounded-xl border ${currentStatus.color}`}>
            <div className="flex items-center space-x-2.5">
              <StatusIcon className="w-5 h-5" />
              <span className="font-semibold text-sm">{currentStatus.label}</span>
            </div>
            <span className="text-xs font-mono font-medium opacity-80">{order.orderId}</span>
          </div>

          {order.rejectionReason && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm">
              <span className="font-semibold">Rad etish sababi:</span> {order.rejectionReason}
            </div>
          )}

          {/* User 10-Digit ID Warning Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold uppercase text-amber-900 tracking-wide block">
                  {t('payment.yourId')}
                </span>
                <span className="text-2xl font-bold font-mono text-amber-950 tracking-wider">
                  {order.userId}
                </span>
                <p className="text-xs text-amber-800 mt-1">
                  Telegram orqali to‘lov qilganda ushbu 10 xonali ID raqamingizni albatta ko‘rsating!
                </p>
              </div>
              <button
                onClick={handleCopyId}
                className="flex items-center space-x-1 px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-lg text-xs font-medium transition-colors"
              >
                {copiedId ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId ? 'Nusxalandi' : 'Nusxa'}</span>
              </button>
            </div>
          </div>

          {/* Amount and Recipient Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="text-xs font-medium text-slate-500 block mb-1">
                {t('payment.amount')}
              </span>
              <span className="text-2xl font-extrabold text-blue-700">
                {formatCurrencyUZS(order.amountUZS)}
              </span>
              <span className="text-xs text-slate-500 block mt-1">
                Kategoriya: <strong className="text-slate-700">{order.category}</strong>
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="text-xs font-medium text-slate-500 block mb-1">
                To‘lov oluvchi ({order.recipientType === 'teacher' ? "Tegishli o‘qituvchi" : "Administrator"})
              </span>
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-slate-800 text-sm">{order.recipientName}</span>
              </div>
              <span className="text-xs text-indigo-700 font-mono block mt-1">
                @{order.recipientTelegram.replace('@', '')}
              </span>
            </div>
          </div>

          {/* Plastic Card Box */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <span className="text-xs uppercase tracking-wider text-slate-300 font-medium">
                  {order.recipientType === 'teacher' ? "O‘qituvchi Kartasi" : "Admin Humo / Uzcard"}
                </span>
              </div>
              <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded font-mono text-emerald-300">
                UZS
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-mono text-lg sm:text-xl font-bold tracking-widest text-white">
                {order.recipientCardNumber}
              </span>
              <button
                onClick={handleCopyCard}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                {copiedCard ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCard ? 'Nusxalandi' : 'Karta nusxalash'}</span>
              </button>
            </div>
            
            <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
              <span>{order.recipientName}</span>
              <span>Online o‘tkazma (Click / Payme / Uzum)</span>
            </div>
          </div>

          {/* Step by Step Instructions */}
          <div className="text-xs text-slate-600 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="font-bold text-slate-800 text-sm mb-1">To‘lovni amalga oshirish tartibi:</p>
            <div className="flex items-start space-x-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">1</span>
              <span>Yuqoridagi karta raqamiga <strong>{formatCurrencyUZS(order.amountUZS)}</strong> o‘tkazing.</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">2</span>
              <span>Pastdagi <strong>Telegram tugmasi</strong> orqali mas’ul shaxsga to‘lov chekini va o‘zingizning <strong>10 xonali ID: {order.userId}</strong> raqamingizni yuboring.</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">3</span>
              <span>Mas’ul shaxs hisobiga pul tushganini tekshirib tasdiqlagach, xizmatingiz darhol faollashadi.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleOpenTelegram}
              className="flex-1 flex items-center justify-center space-x-2 px-5 py-3.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Telegram orqali bog‘lanish</span>
            </button>

            {order.status === 'pending' && (
              <button
                onClick={handleMarkAsPaid}
                disabled={submittingCheck}
                className="flex items-center justify-center space-x-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{submittingCheck ? 'Yuborilmoqda...' : 'To‘lov qildim (Chek yuborildi)'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

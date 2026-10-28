/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';

import { HomeView } from './views/HomeView';
import { HomeworkAssistantView } from './views/HomeworkAssistantView';
import { DocumentGeneratorView } from './views/DocumentGeneratorView';
import { PresentationGeneratorView } from './views/PresentationGeneratorView';
import { TemplateCatalogView } from './views/TemplateCatalogView';
import { DocAnalyzerView } from './views/DocAnalyzerView';
import { QuizMakerView } from './views/QuizMakerView';
import { CoursesView } from './views/CoursesView';
import { TeachersView } from './views/TeachersView';
import { AdsView } from './views/AdsView';
import { PricingView } from './views/PricingView';
import { UserCabinetView } from './views/UserCabinetView';
import { AdminPanelView } from './views/AdminPanelView';

import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { toast } = useApp();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} />;
      case 'homework':
        return <HomeworkAssistantView />;
      case 'documents':
        return <DocumentGeneratorView />;
      case 'presentations':
        return <PresentationGeneratorView />;
      case 'templates':
        return <TemplateCatalogView setActiveTab={setActiveTab} />;
      case 'docAnalyzer':
        return <DocAnalyzerView />;
      case 'quizzes':
        return <QuizMakerView />;
      case 'courses':
        return <CoursesView />;
      case 'teachers':
        return <TeachersView />;
      case 'ads':
        return <AdsView />;
      case 'pricing':
        return <PricingView />;
      case 'cabinet':
        return <UserCabinetView setActiveTab={setActiveTab} />;
      case 'admin':
        return <AdminPanelView />;
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Global Payment Modal */}
      <PaymentModal />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-xl border animate-fade-in text-sm font-semibold max-w-md bg-white border-slate-200">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-600 shrink-0" />}
          <span className="text-slate-800 leading-snug">{toast.message}</span>
        </div>
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

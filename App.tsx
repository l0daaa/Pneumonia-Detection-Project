
import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ChevronRight,
  Activity,
  BrainCircuit,
  LayoutDashboard,
  History as HistoryIcon,
  MessageSquare,
  Settings,
  LogOut,
  Stethoscope,
  User,
  ScanLine
} from './components/Icons';
import { Steps } from './components/Steps';
import { Analyzer } from './components/Analyzer';
import { MedicalChat } from './components/MedicalChat';
import { HistoryDashboard } from './components/HistoryDashboard';
import { RecordDetail } from './components/RecordDetail';
import { ViewType, AnalysisResult, HistoryItem } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('LANDING');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<HistoryItem | null>(null);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('neuroscan_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load history');
      }
    }
  }, []);

  const saveToHistory = (result: AnalysisResult, image: string) => {
    const newItem: HistoryItem = { ...result, imageUrl: image };
    const newHistory = [newItem, ...history];
    setHistory(newHistory);
    localStorage.setItem('neuroscan_history', JSON.stringify(newHistory));
    setCurrentAnalysis(result);
  };

  const navigateTo = (newView: ViewType) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView(newView);
  };

  const handleStartChat = (context: AnalysisResult) => {
    setCurrentAnalysis(context);
    navigateTo('DASHBOARD_CHAT');
  };

  const renderDashboardContent = () => {
    switch (view) {
      case 'DASHBOARD_ANALYZER':
        return <Analyzer onAnalysisComplete={saveToHistory} onChatStart={handleStartChat} />;
      case 'DASHBOARD_CHAT':
        return <MedicalChat initialContext={currentAnalysis} />;
      case 'DASHBOARD_HISTORY':
        return <HistoryDashboard history={history} onSelect={(item) => {
          setSelectedRecord(item);
          navigateTo('DASHBOARD_DETAIL');
        }} />;
      case 'DASHBOARD_DETAIL':
        return selectedRecord ? (
          <RecordDetail
            record={selectedRecord}
            onBack={() => navigateTo('DASHBOARD_HISTORY')}
            onStartChat={(record) => handleStartChat(record)}
          />
        ) : (
          <div className="text-center text-slate-500 mt-12">No record selected</div>
        );
      default:
        return <Analyzer onAnalysisComplete={saveToHistory} onChatStart={handleStartChat} />;
    }
  };

  // --- LANDING PAGE LAYOUT ---
  if (view === 'LANDING') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-600">
                  NeuroScan AI
                </span>
              </div>
              <div className="hidden md:flex space-x-8">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-600 hover:text-blue-600 font-medium">Home</button>
                <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="text-slate-600 hover:text-blue-600 font-medium">Technology</button>
                <button onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth' })} className="text-slate-600 hover:text-blue-600 font-medium">Validation</button>
              </div>
              <button
                onClick={() => navigateTo('DASHBOARD_ANALYZER')}
                className="bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
              >
                Launch App
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white pt-16 pb-32">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl animate-in slide-in-from-bottom duration-700">
                  <span className="block">Advanced AI for</span>
                  <span className="block text-blue-600">Medical Imaging</span>
                </h1>
                <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 animate-in slide-in-from-bottom duration-700 delay-100">
                  Instant, accurate pneumonia detection using state-of-the-art deep learning.
                  Upload chest X-rays and get detailed diagnostic insights in seconds.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 animate-in slide-in-from-bottom duration-700 delay-200">
                  <button
                    onClick={() => navigateTo('DASHBOARD_ANALYZER')}
                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-blue-500 hover:bg-blue-600 shadow-xl hover:shadow-blue-200 transition-all md:text-lg md:px-10 active:scale-95"
                  >
                    Start Diagnosis <ChevronRight className="ml-2 w-5 h-5" />
                  </button>
                  <div className="mt-6 flex items-center gap-6 justify-center lg:justify-start text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Activity className="w-4 h-4 text-blue-500" /> 95% Accuracy</span>
                  </div>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center animate-in fade-in zoom-in duration-1000 delay-300">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <div className="relative block w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl">
                    <div className="absolute top-0 bg-slate-100 w-full h-8 flex items-center gap-2 px-3 border-b border-slate-200">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <img
                      className="w-full pt-8 filter grayscale contrast-125"
                      src="https://picsum.photos/600/600?grayscale"
                      alt="AI Analysis Dashboard"
                    />
                    <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <Activity className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase font-bold">Confidence</div>
                          <div className="text-xl font-bold text-slate-900">95%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Steps />

        <footer className="bg-white border-t border-slate-200 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Stethoscope className="w-6 h-6 text-slate-400" />
              <span className="text-lg font-bold text-slate-700">NeuroScan AI</span>
            </div>
            <div className="text-slate-500 text-sm">
              © 2025 NeuroScan Medical Systems. Research Prototype. Powered by Khaled Youssef.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // --- DASHBOARD LAYOUT ---
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 text-slate-700 hidden md:flex flex-col flex-shrink-0 transition-all duration-300 shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <BrainCircuit className="w-6 h-6 text-blue-500 mr-2" />
          <span className="text-lg font-bold text-slate-900 tracking-wide">NeuroScan</span>
        </div>

        <div className="flex-1 py-6 space-y-1 px-3">
          <button
            onClick={() => navigateTo('DASHBOARD_ANALYZER')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${view === 'DASHBOARD_ANALYZER' ? 'bg-blue-500 text-white' : 'text-slate-700 hover:bg-blue-50'}`}
          >
            <ScanLine className="w-5 h-5" />
            <span>New Analysis</span>
          </button>
          <button
            onClick={() => navigateTo('DASHBOARD_HISTORY')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${view === 'DASHBOARD_HISTORY' ? 'bg-blue-500 text-white' : 'text-slate-700 hover:bg-blue-50'}`}
          >
            <HistoryIcon className="w-5 h-5" />
            <span>Patient History</span>
          </button>
          <button
            onClick={() => navigateTo('DASHBOARD_CHAT')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${view === 'DASHBOARD_CHAT' ? 'bg-blue-500 text-white' : 'text-slate-700 hover:bg-blue-50'}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>AI Assistant</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>
            <div className="text-sm">
              <div className="text-slate-900 font-medium">Dr. Radiologist</div>
              <div className="text-slate-500 text-xs">Pro License</div>
            </div>
          </div>
          <button
            onClick={() => navigateTo('LANDING')}
            className="w-full flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors px-2 py-1"
          >
            <LogOut className="w-4 h-4" /> <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            {view === 'DASHBOARD_ANALYZER' && 'Diagnostic Console'}
            {view === 'DASHBOARD_HISTORY' && 'Patient Records'}
            {view === 'DASHBOARD_CHAT' && 'Dr. Neuro Assistant'}
            {view === 'DASHBOARD_DETAIL' && 'Record Details'}
          </h1>
          <div className="md:hidden">
            {/* Mobile menu trigger could go here */}
            <button onClick={() => navigateTo('LANDING')} className="text-sm text-slate-500">Back</button>
          </div>
        </header>

        <div className="flex-1 p-6">
          {renderDashboardContent()}
        </div>
      </main>
    </div>
  );
};

export default App;

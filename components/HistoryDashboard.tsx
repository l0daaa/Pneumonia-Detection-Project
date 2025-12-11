
import React from 'react';
import { HistoryItem } from '../types';
import { FileText, Calendar, Activity, ChevronRight, AlertCircle, History } from './Icons';

interface HistoryDashboardProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export const HistoryDashboard: React.FC<HistoryDashboardProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400">
          <History className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No Scan History</h3>
        <p className="text-slate-500 max-w-sm">
          Your analyzed X-rays and reports will appear here automatically after processing.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <History className="w-6 h-6 text-slate-500" /> Patient History
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item, idx) => (
          <div 
            key={item.id || idx}
            onClick={() => onSelect(item)}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
          >
            <div className="h-40 overflow-hidden relative bg-slate-100">
               <img src={item.imageUrl} alt="Scan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold shadow-sm ${
                      item.diagnosis === 'Pneumonia' ? 'bg-red-100 text-red-700' :
                      item.diagnosis === 'Normal' ? 'bg-green-100 text-green-700' :
                      'bg-amber-100 text-amber-700'
                  }`}>
                    {item.diagnosis}
                  </span>
               </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                 <Calendar className="w-3 h-3" />
                 {item.date ? new Date(item.date).toLocaleDateString() : 'Unknown Date'}
              </div>
              <div className="flex justify-between items-end">
                 <div>
                    <p className="text-slate-500 text-sm">Confidence</p>
                    <p className="text-lg font-bold text-slate-900">{item.confidence}%</p>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5" />
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
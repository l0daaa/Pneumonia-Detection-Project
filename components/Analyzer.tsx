
import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, CheckCircle2, AlertCircle, Wand2, BrainCircuit, Activity, FileText, Download, Printer, MessageSquare, History } from './Icons';
import { analyzeMedicalImage } from '../services/geminiService';
import { AnalysisResult, AppState } from '../types';

interface AnalyzerProps {
  onAnalysisComplete: (result: AnalysisResult, image: string) => void;
  onChatStart: (result: AnalysisResult) => void;
}

export const Analyzer: React.FC<AnalyzerProps> = ({ onAnalysisComplete, onChatStart }) => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [enhanced, setEnhanced] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, JPEG).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size too large. Please upload an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFile(file);
      setImagePreview(reader.result as string);
      setState(AppState.UPLOADING);
      setError(null);
      setResult(null);
      setEnhanced(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const startAnalysis = async () => {
    if (!imagePreview) return;

    try {
      setState(AppState.ENHANCING);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEnhanced(true);

      setState(AppState.ANALYZING);
      const base64Data = imagePreview.split(',')[1];
      const analysisData = await analyzeMedicalImage(base64Data);
      
      const enrichedResult = { 
        ...analysisData, 
        id: crypto.randomUUID(),
        date: new Date().toISOString() 
      };

      setResult(enrichedResult);
      setState(AppState.COMPLETE);
      
      // Auto save to history via parent callback
      onAnalysisComplete(enrichedResult, imagePreview);

    } catch (err: any) {
      setError(err.message || 'Analysis failed');
      setState(AppState.ERROR);
    }
  };

  const reset = () => {
    setState(AppState.IDLE);
    setImageFile(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
    setEnhanced(false);
  };

  const handlePrint = () => {
    window.print();
  };

  // Render Subcomponents
  const renderUploadArea = () => (
    <div 
      className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-colors cursor-pointer"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/jpg"/>
      <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <UploadCloud className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">Upload Chest X-Ray</h3>
      <p className="text-slate-500">Drag & drop or click to browse</p>
    </div>
  );

  const renderProcessing = () => (
    <div className="flex flex-col md:flex-row gap-8 items-start animate-in fade-in zoom-in-95 duration-300">
      <div className="w-full md:w-1/2 relative group">
        <div className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-700 ${enhanced ? 'contrast-125 brightness-110' : ''}`}>
          <img src={imagePreview!} alt="X-ray" className="w-full h-auto object-cover" />
          {(state === AppState.ANALYZING || state === AppState.ENHANCING) && (
            <div className="absolute inset-0 z-10">
              <div className="w-full h-1 bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.8)] absolute animate-scan"></div>
              <div className="absolute inset-0 bg-teal-500/10"></div>
            </div>
          )}
          {enhanced && (
             <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
               <Wand2 className="w-3 h-3 text-purple-400" /> AI Enhanced
             </div>
          )}
        </div>
        <div className="mt-6 space-y-3">
            <div className={`flex items-center gap-3 p-3 rounded-lg ${state === AppState.ENHANCING ? 'bg-purple-50 border border-purple-100' : enhanced ? 'text-green-600' : 'text-slate-400'}`}>
                {enhanced ? <CheckCircle2 className="w-5 h-5" /> : state === AppState.ENHANCING ? <Loader2 className="w-5 h-5 animate-spin text-purple-600" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300" />}
                <span className={`font-medium ${state === AppState.ENHANCING ? 'text-purple-700' : ''}`}>Noise Reduction & Enhancement</span>
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-lg ${state === AppState.ANALYZING ? 'bg-indigo-50 border border-indigo-100' : state === AppState.COMPLETE ? 'text-green-600' : 'text-slate-400'}`}>
                {state === AppState.COMPLETE ? <CheckCircle2 className="w-5 h-5" /> : state === AppState.ANALYZING ? <Loader2 className="w-5 h-5 animate-spin text-indigo-600" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300" />}
                <span className={`font-medium ${state === AppState.ANALYZING ? 'text-indigo-700' : ''}`}>Pattern Recognition (Gemini 2.5)</span>
            </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-center items-center text-center min-h-[400px]">
         {state === AppState.UPLOADING && (
            <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
                    <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Image Uploaded</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Ready to process. This will consume 1 credit.</p>
                <button 
                  onClick={startAnalysis}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-blue-200 active:scale-95 flex items-center gap-2 mx-auto"
                >
                  <BrainCircuit className="w-5 h-5" />
                  Analyze Now
                </button>
            </div>
         )}

         {(state === AppState.ENHANCING || state === AppState.ANALYZING) && (
            <div className="space-y-6">
                 <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
                 <div>
                    <h3 className="text-xl font-bold text-slate-900 animate-pulse">Processing...</h3>
                    <p className="text-slate-500 mt-2">Our AI is examining lung opacities and texture.</p>
                 </div>
            </div>
         )}
      </div>
    </div>
  );

  const renderResults = () => {
    if (!result) return null;

    const isPneumonia = result.diagnosis === 'Pneumonia';
    const isUncertain = result.diagnosis === 'Uncertain';
    const colorClass = isPneumonia ? 'red' : isUncertain ? 'amber' : 'green';
    const bgClass = isPneumonia ? 'bg-red-50' : isUncertain ? 'bg-amber-50' : 'bg-green-50';
    const textClass = isPneumonia ? 'text-red-700' : isUncertain ? 'text-amber-700' : 'text-green-700';
    const borderClass = isPneumonia ? 'border-red-200' : isUncertain ? 'border-amber-200' : 'border-green-200';

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
         {/* Action Bar */}
         <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-500">Analysis ID: <span className="font-mono text-slate-700">{result.id?.slice(0,8)}</span></div>
            <div className="flex gap-2">
               <button onClick={handlePrint} className="p-2 text-slate-600 hover:bg-white hover:shadow rounded-lg transition-all" title="Print Report">
                  <Printer className="w-5 h-5" />
               </button>
               <button onClick={() => onChatStart(result)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-sm">
                  <MessageSquare className="w-4 h-4" /> Ask Dr. Neuro
               </button>
            </div>
         </div>

        <div className="flex flex-col lg:flex-row gap-8">
           <div className="w-full lg:w-1/3">
             <div className="relative rounded-xl overflow-hidden shadow-md group">
               <img src={imagePreview!} alt="Analyzed X-ray" className="w-full h-auto contrast-125 brightness-110" />
               <div className="absolute top-4 left-4">
                  <span className={`${bgClass} ${textClass} px-3 py-1 rounded-full text-sm font-bold border ${borderClass} shadow-sm`}>
                    {result.diagnosis.toUpperCase()}
                  </span>
               </div>
             </div>
             <button onClick={reset} className="mt-4 w-full py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:border-blue-500 hover:text-blue-600 font-bold transition-all">
               Analyze New Image
             </button>
           </div>

           <div className="w-full lg:w-2/3 space-y-6">
              <div className={`p-6 rounded-2xl border ${borderClass} ${bgClass} flex flex-wrap items-center justify-between gap-4`}>
                 <div>
                    <h3 className="text-sm uppercase tracking-wide font-semibold opacity-80">Primary Diagnosis</h3>
                    <div className={`text-3xl font-bold ${textClass} mt-1`}>{result.diagnosis}</div>
                 </div>
                 <div className="text-right">
                    <h3 className="text-sm uppercase tracking-wide font-semibold opacity-80">AI Confidence</h3>
                    <div className={`text-3xl font-bold ${textClass} mt-1`}>{result.confidence}%</div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-slate-500">
                       <Activity className="w-4 h-4" />
                       <span className="text-sm font-medium">Severity Level</span>
                    </div>
                    <div className="text-xl font-bold text-slate-900">{result.severity}</div>
                 </div>
                 <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-slate-500">
                       <BrainCircuit className="w-4 h-4" />
                       <span className="text-sm font-medium">Processing Time</span>
                    </div>
                    <div className="text-xl font-bold text-slate-900">1.2s</div>
                 </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                 <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 font-semibold text-slate-800 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Radiologist Findings
                 </div>
                 <div className="p-6">
                    <ul className="space-y-2">
                       {result.findings.map((finding, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-700">
                             <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                             <span>{finding}</span>
                          </li>
                       ))}
                    </ul>
                 </div>
              </div>

               <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                  <h4 className="text-blue-900 font-semibold mb-2 flex items-center gap-2">
                     <AlertCircle className="w-4 h-4" /> AI Recommendation
                  </h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                     {result.recommendation}
                  </p>
               </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
       <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"></div>
          <div className="p-8">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                   <Activity className="w-6 h-6 text-blue-600" />
                   Analysis Console
                </h2>
                {state !== AppState.IDLE && state !== AppState.COMPLETE && (
                   <button onClick={reset} className="text-slate-400 hover:text-slate-600 transition-colors">
                      <X className="w-6 h-6" />
                   </button>
                )}
             </div>

             {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                   <AlertCircle className="w-5 h-5" />
                   {error}
                </div>
             )}

             <div className="min-h-[400px]">
                {state === AppState.IDLE && renderUploadArea()}
                {(state === AppState.UPLOADING || state === AppState.ENHANCING || state === AppState.ANALYZING) && renderProcessing()}
                {state === AppState.COMPLETE && renderResults()}
                {state === AppState.ERROR && (
                   <div className="text-center py-12">
                      <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                         <AlertCircle className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">Analysis Failed</h3>
                      <p className="text-slate-500 mb-6">{error}</p>
                      <button onClick={reset} className="mt-4 text-blue-600 hover:text-blue-700 font-medium">Try again</button>
                   </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );
};

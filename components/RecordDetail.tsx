
import React from 'react';
import { HistoryItem } from '../types';
import {
    ArrowLeft,
    Activity,
    AlertTriangle,
    CheckCircle2,
    Download,
    Printer,
    MessageSquare,
    Calendar,
    FileText,
    BarChart3
} from './Icons';

interface RecordDetailProps {
    record: HistoryItem;
    onBack: () => void;
    onStartChat: (record: HistoryItem) => void;
}

export const RecordDetail: React.FC<RecordDetailProps> = ({ record, onBack, onStartChat }) => {
    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const reportContent = `
NeuroScan AI - Medical Analysis Report
======================================

Date: ${record.date ? new Date(record.date).toLocaleString() : 'Unknown'}
Patient ID: ${record.id || 'N/A'}

DIAGNOSIS
---------
${record.diagnosis}

CONFIDENCE
----------
${record.confidence}%

SEVERITY
--------
${record.severity}

FINDINGS
--------
${record.findings.join('\n')}

RECOMMENDATION
--------------
${record.recommendation}

---
This is a computer-generated report. Please consult with a qualified healthcare professional.
© 2025 NeuroScan Medical Systems. Research Prototype. Powered by Khaled Youssef.
    `.trim();

        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `neuroscan-report-${record.id || Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getDiagnosisColor = () => {
        switch (record.diagnosis) {
            case 'Normal':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'Pneumonia':
                return 'bg-red-50 text-red-700 border-red-200';
            case 'Uncertain':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            default:
                return 'bg-blue-50 text-blue-700 border-blue-200';
        }
    };

    const getSeverityColor = () => {
        switch (record.severity) {
            case 'High':
                return 'text-red-600';
            case 'Medium':
                return 'text-amber-600';
            case 'Low':
                return 'text-yellow-600';
            default:
                return 'text-slate-600';
        }
    };

    const getDiagnosisIcon = () => {
        switch (record.diagnosis) {
            case 'Normal':
                return <CheckCircle2 className="w-6 h-6" />;
            case 'Pneumonia':
                return <AlertTriangle className="w-6 h-6" />;
            default:
                return <Activity className="w-6 h-6" />;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header with Back Button */}
            <div className="mb-6 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to History
                </button>

                <div className="flex gap-3">
                    <button
                        onClick={() => onStartChat(record)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <MessageSquare className="w-4 h-4" />
                        Discuss with AI
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        <Printer className="w-4 h-4" />
                        Print
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Image */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-slate-500" />
                            X-Ray Image
                        </h2>
                        <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                            <img
                                src={record.imageUrl}
                                alt="Medical scan"
                                className="w-full h-auto"
                            />
                        </div>
                        {record.date && (
                            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                                <Calendar className="w-4 h-4" />
                                {new Date(record.date).toLocaleString()}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Analysis Results */}
                <div className="space-y-6">
                    {/* Diagnosis Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-slate-500" />
                            Diagnosis
                        </h2>
                        <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${getDiagnosisColor()}`}>
                            {getDiagnosisIcon()}
                            <div className="flex-1">
                                <div className="font-bold text-lg">{record.diagnosis}</div>
                                <div className="text-sm opacity-75">Primary Finding</div>
                            </div>
                        </div>
                    </div>

                    {/* Confidence & Severity Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-slate-500" />
                            Analysis Metrics
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <div className="text-sm text-slate-500 mb-1">Confidence</div>
                                <div className="text-3xl font-bold text-slate-900">{record.confidence}%</div>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <div className="text-sm text-slate-500 mb-1">Severity</div>
                                <div className={`text-3xl font-bold ${getSeverityColor()}`}>{record.severity}</div>
                            </div>
                        </div>
                    </div>

                    {/* Findings Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Key Findings</h2>
                        <ul className="space-y-3">
                            {record.findings.map((finding, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                    <span className="text-slate-700">{finding}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recommendation Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border border-blue-100 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-3">Recommendation</h2>
                        <p className="text-slate-700 leading-relaxed">{record.recommendation}</p>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-900">
                        <strong>Medical Disclaimer:</strong> This analysis is generated by AI and should be used for
                        research purposes only. Always consult with qualified healthcare professionals for medical decisions.
                    </div>
                </div>
            </div>
        </div>
    );
};

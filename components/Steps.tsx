import React from 'react';
import { UploadCloud, Wand2, BrainCircuit, FileText } from './Icons';

const steps = [
  {
    id: 1,
    title: 'Upload Image',
    description: 'Upload a chest X-ray image in PNG, JPG, or JPEG format.',
    icon: UploadCloud,
    color: 'text-blue-500 bg-blue-50'
  },
  {
    id: 2,
    title: 'Image Enhancement',
    description: 'AI applies advanced preprocessing techniques for optimal quality.',
    icon: Wand2,
    color: 'text-purple-500 bg-purple-50'
  },
  {
    id: 3,
    title: 'AI Analysis',
    description: 'Deep learning model analyzes the image for pneumonia detection.',
    icon: BrainCircuit,
    color: 'text-indigo-500 bg-indigo-50'
  },
  {
    id: 4,
    title: 'Get Results',
    description: 'Receive instant results with confidence scores and visualizations.',
    icon: FileText,
    color: 'text-teal-500 bg-teal-50'
  }
];

export const Steps: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our state-of-the-art pipeline ensures fast and accurate diagnostic support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="relative group">
              <div className="h-full border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 bg-white z-10 relative">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${step.color}`}>
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="absolute top-6 right-6 text-6xl font-bold text-slate-100 -z-10 select-none">
                  {step.id}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
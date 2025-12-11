
import React from 'react';

export interface AnalysisResult {
  id?: string;
  date?: string;
  diagnosis: 'Pneumonia' | 'Normal' | 'Uncertain' | 'Other Findings';
  confidence: number;
  severity: 'Low' | 'Medium' | 'High' | 'N/A';
  findings: string[];
  recommendation: string;
}

export enum AppState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  ENHANCING = 'ENHANCING',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface HistoryItem extends AnalysisResult {
  imageUrl: string; // Base64 thumbnail
}

export type ViewType = 'LANDING' | 'DASHBOARD_ANALYZER' | 'DASHBOARD_HISTORY' | 'DASHBOARD_CHAT';

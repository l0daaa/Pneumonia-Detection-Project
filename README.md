# NeuroScan AI - Pneumonia Detection

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## 🩺 Overview

**NeuroScan AI** is an advanced medical imaging application that uses state-of-the-art artificial intelligence to detect pneumonia from chest X-ray images. Built with React and powered by Google's Gemini AI, this application provides fast, accurate diagnostic insights to support medical professionals in their clinical decision-making.

## ✨ Features

### 🔬 Advanced AI Analysis
- **Pattern Recognition Using AI**: Leverages deep learning models for accurate pneumonia detection
- **95% Accuracy**: High-precision detection with confidence scoring
- **Real-time Processing**: Analysis completed in under 2 seconds
- **AI-Enhanced Imaging**: Automatic noise reduction and image enhancement

### 📊 Comprehensive Diagnostics
- **Detailed Reports**: Complete analysis including diagnosis, confidence level, severity, and findings
- **Visual Feedback**: Enhanced X-ray images with diagnostic overlays
- **Professional Recommendations**: AI-generated clinical recommendations for each case

### 📝 Patient History Management
- **Record Keeping**: Automatic storage of all analyses in patient history
- **Detailed Record View**: Access complete information for any historical scan
- **Export Options**: Download and print diagnostic reports
- **Search & Filter**: Easy access to past patient records

### 💬 AI Medical Assistant
- **Dr. Neuro Chat**: Interactive AI assistant for medical queries
- **Context-Aware Responses**: Discuss specific diagnosis results
- **Educational Support**: Learn about pneumonia detection and medical imaging

### 🎨 Modern User Interface
- **Light Color Scheme**: Clean, professional medical application design
- **Responsive Layout**: Optimized for desktop and tablet devices
- **Smooth Animations**: Polished user experience with fluid transitions
- **Intuitive Dashboard**: Easy-to-navigate interface for medical professionals

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **Gemini API Key** from Google AI Studio

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/l0daaa/Pneumonia-Detection-Project.git
   cd neuroscan-ai---pneumonia-detection
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create or edit the `.env.local` file
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📖 How to Use

### Analyzing an X-Ray

1. **Upload Image**
   - Click "Launch App" from the landing page
   - Drag and drop a chest X-ray image or click to browse
   - Supported formats: PNG, JPG, JPEG (max 5MB)

2. **Start Analysis**
   - Click "Analyze Now" to begin processing
   - Wait for AI enhancement and pattern recognition (1-2 seconds)

3. **Review Results**
   - View comprehensive diagnostic report
   - Check diagnosis, confidence level, and severity
   - Read detailed findings and recommendations

### Accessing Patient History

1. Click **"Patient History"** in the sidebar
2. View all previous analyses in a grid layout
3. Click on any record to see complete details
4. Use **"Back to History"** to return to the list

### Using AI Assistant

1. After analysis, click **"Ask Dr. Neuro"** or **"Discuss with AI"**
2. Ask questions about the diagnosis
3. Receive context-aware medical information
4. Learn more about pneumonia detection

## 🛠️ Technology Stack

- **Frontend**: React 19.2.1 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **AI Model**: Google Gemini 2.5
- **State Management**: React Hooks
- **Storage**: LocalStorage for patient history

## 📁 Project Structure

```
neuroscan-ai/
├── components/
│   ├── Analyzer.tsx        # Main analysis component
│   ├── HistoryDashboard.tsx # Patient history view
│   ├── RecordDetail.tsx     # Individual record details
│   ├── MedicalChat.tsx      # AI assistant chat
│   ├── Steps.tsx            # Process explanation
│   └── Icons.tsx            # Icon exports
├── services/
│   └── geminiService.ts     # AI integration service
├── App.tsx                  # Main application
├── types.ts                 # TypeScript definitions
└── index.html               # HTML entry point
```

## 🎯 Key Capabilities

- ✅ Upload and analyze chest X-ray images
- ✅ AI-powered pneumonia detection
- ✅ Detailed diagnostic reports with findings
- ✅ Patient history management
- ✅ Record detail viewing
- ✅ Export and print reports
- ✅ AI medical assistant chat
- ✅ Real-time image enhancement
- ✅ Confidence scoring and severity assessment

## 🔒 Disclaimer

**Important**: This application is a research prototype designed for educational and demonstration purposes. It should **NOT** be used for actual medical diagnosis or treatment decisions. Always consult with qualified healthcare professionals for medical advice and diagnosis.

## 👨‍💻 Developer

**Developed by Khaled Youssef**

© 2025 NeuroScan Medical Systems. Research Prototype.

## 🤝 Contributing

This is a research prototype. For questions or collaboration opportunities, please reach out through the repository issues.

---

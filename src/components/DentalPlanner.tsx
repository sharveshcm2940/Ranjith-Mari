import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Sparkles, ShieldAlert, CheckCircle, ChevronRight, ChevronLeft, 
  RefreshCw, FileText, Calendar, Activity, Smile, Info
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  text: string;
  category: 'gum' | 'implant' | 'cosmetic' | 'general';
  options: {
    text: string;
    score: number; // 0 to 10 points
    implantNeed: boolean;
    gumRisk: 'none' | 'mild' | 'severe';
  }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "What is your primary dental health or cosmetic goal?",
    category: 'general',
    options: [
      { text: "Replace a missing tooth or loose teeth securely", score: 8, implantNeed: true, gumRisk: 'none' },
      { text: "Stop gum bleeding, soreness, or swelling", score: 9, implantNeed: false, gumRisk: 'severe' },
      { text: "Enhance smile aesthetics (whitening, veneers, veneers align)", score: 6, implantNeed: false, gumRisk: 'none' },
      { text: "Schedule standard clinical cleaning & general preventative care", score: 10, implantNeed: false, gumRisk: 'mild' }
    ]
  },
  {
    id: 2,
    text: "How often do you observe bleeding from your gums during brushing or flossing?",
    category: 'gum',
    options: [
      { text: "Never - my gums are pink and firm", score: 10, implantNeed: false, gumRisk: 'none' },
      { text: "Occasionally - standard pink trace on floss", score: 8, implantNeed: false, gumRisk: 'mild' },
      { text: "Frequently - gums bleed almost every time I brush", score: 4, implantNeed: false, gumRisk: 'severe' },
      { text: "Spontaneously - gums bleed on their own or when chewing soft food", score: 2, implantNeed: false, gumRisk: 'severe' }
    ]
  },
  {
    id: 3,
    text: "Do you experience persistent tooth sensitivity, pain, or looseness?",
    category: 'implant',
    options: [
      { text: "None - all my teeth are firm and fully comfortable", score: 10, implantNeed: false, gumRisk: 'none' },
      { text: "Slight localized cold or hot sensitivity", score: 8, implantNeed: false, gumRisk: 'mild' },
      { text: "Intermittent sharp pain when chewing solid food", score: 5, implantNeed: false, gumRisk: 'severe' },
      { text: "One or more of my teeth feel slightly loose or shift", score: 2, implantNeed: true, gumRisk: 'severe' }
    ]
  },
  {
    id: 4,
    text: "What is your current jawbone and surgical history?",
    category: 'implant',
    options: [
      { text: "No history of tooth loss or bone degradation", score: 10, implantNeed: false, gumRisk: 'none' },
      { text: "Have missing teeth but jawbone looks intact", score: 8, implantNeed: true, gumRisk: 'none' },
      { text: "I was told I have severe bone loss or require a bone graft", score: 4, implantNeed: true, gumRisk: 'severe' },
      { text: "I have standard bridges or existing dentures but want a permanent solution", score: 6, implantNeed: true, gumRisk: 'none' }
    ]
  }
];

export default function DentalPlanner() {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: Intro, 1-4: Quiz, 5: Results
  const [answers, setAnswers] = useState<number[]>([]);
  const [implantRequiredCount, setImplantRequiredCount] = useState<number>(0);
  const [highestGumRisk, setHighestGumRisk] = useState<'none' | 'mild' | 'severe'>('none');

  const handleOptionSelect = (option: typeof QUIZ_QUESTIONS[0]['options'][0]) => {
    const updatedAnswers = [...answers, option.score];
    setAnswers(updatedAnswers);

    if (option.implantNeed) {
      setImplantRequiredCount(prev => prev + 1);
    }

    if (option.gumRisk === 'severe') {
      setHighestGumRisk('severe');
    } else if (option.gumRisk === 'mild' && highestGumRisk !== 'severe') {
      setHighestGumRisk('mild');
    }

    if (currentStep < QUIZ_QUESTIONS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setImplantRequiredCount(0);
    setHighestGumRisk('none');
  };

  const calculateOverallScore = () => {
    if (answers.length === 0) return 100;
    const sum = answers.reduce((acc, curr) => acc + curr, 0);
    return Math.round((sum / (QUIZ_QUESTIONS.length * 10)) * 100);
  };

  const getDiagnosis = (score: number) => {
    if (score >= 85) {
      return {
        title: "Excellent Preventive Status",
        color: "text-emerald-600 bg-emerald-50 border-emerald-200",
        desc: "Your overall dental matrix and gum structures indicate healthy oral hygiene! Continued daily flossing and routine scaling every 6 months are recommended.",
        specialty: "Standard Prophylaxis & Smile Whitening",
        urgency: "Routine Assessment advised."
      };
    } else if (score >= 60 || highestGumRisk === 'mild') {
      return {
        title: "Mild Periodontal Advisory",
        color: "text-amber-600 bg-amber-50 border-amber-200",
        desc: "You have minor signs of early plaque build-up or mild gingivitis. Early intervention with scaling and localized gum care can fully reverse these symptoms.",
        specialty: "Laser Assisted Cleaning & Root Planing",
        urgency: "Highly recommended within the next 30 days."
      };
    } else {
      return {
        title: "Advanced Periodontal & Restorative Advisory",
        color: "text-rose-600 bg-rose-50 border-rose-200",
        desc: "Your symptoms point to advanced attachment loss, potential periodontal pockets, or unstable structures. Dr. Ranjith specializes in advanced Bone Regrafts, Laser-guided Periodontics, and implant restorations to secure your teeth.",
        specialty: "Guided Bone Regeneration (GBR) & Titanium Dental Implants",
        urgency: "Urgent Consultation is advised to prevent tooth loss."
      };
    }
  };

  const overallScore = calculateOverallScore();
  const diagnosis = getDiagnosis(overallScore);

  const currentQuestion = QUIZ_QUESTIONS[currentStep - 1];

  return (
    <section id="treatment-planner" className="py-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100 relative overflow-hidden font-sans">
      {/* Aesthetic geometric background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a03_1px,transparent_1px),linear-gradient(to_bottom,#0f172a03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute -top-40 right-10 w-96 h-96 bg-brand-blue/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-96 h-96 bg-brand-navy/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Section Heading */}
        <div className="space-y-4 mb-12">
          <span className="px-3 py-1.5 rounded-full bg-brand-navy/5 text-brand-blue text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Interactive Diagnostics
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy font-sans leading-none">
            Interactive Smile Assessor & Treatment Planner
          </h2>
          <p className="text-slate-500 font-semibold max-w-xl mx-auto text-sm md:text-base">
            Assess your gum health risk, bone structure density, and calculate a custom treatment pathway formulated by Dr. Ranjith Mari, MDS.
          </p>
        </div>

        {/* Main Quiz & Score Card Glass Panel */}
        <div className="bg-white/95 rounded-3xl p-8 md:p-12 border border-brand-navy/5 shadow-2xl backdrop-blur-md max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 0: Welcome / Landing Page */}
            {currentStep === 0 && (
              <motion.div
                key="step-intro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto text-brand-blue shadow-inner">
                  <Smile className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-brand-navy">What is your oral health profile?</h3>
                  <p className="text-sm text-slate-500 font-semibold max-w-md mx-auto">
                    Answer 4 short clinical questions regarding your current gum sensitivity, history of tooth loss, and oral pain to get an immediate assessment.
                  </p>
                </div>

                {/* Features list */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto py-4 text-left">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-brand-navy">Gum Index</h4>
                      <p className="text-[11px] text-slate-400 font-semibold">Checks inflammatory risks</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-brand-navy">Implant Eligibility</h4>
                      <p className="text-[11px] text-slate-400 font-semibold">Analyzes restorative foundations</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-brand-navy">Regeneration Need</h4>
                      <p className="text-[11px] text-slate-400 font-semibold">Evaluates bone support</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-navy text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-brand-blue/20 inline-flex items-center gap-2 group hover:-translate-y-0.5"
                >
                  Begin Assessment
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {/* Steps 1 to 4: Active Questions */}
            {currentStep > 0 && currentStep <= QUIZ_QUESTIONS.length && (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-left"
              >
                {/* Progress Indicators */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-5 px-2 rounded bg-brand-blue/15 text-brand-blue text-[10px] font-bold uppercase tracking-wider flex items-center justify-center">
                      Question {currentStep} of {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-xs text-slate-400 font-bold capitalize">
                      Category: {currentQuestion.category}
                    </span>
                  </div>
                  {/* Visual Dot Progress */}
                  <div className="flex gap-1">
                    {QUIZ_QUESTIONS.map((_, qIdx) => (
                      <span
                        key={qIdx}
                        className={`h-1.5 rounded-full transition-all ${
                          qIdx + 1 === currentStep ? 'w-4 bg-brand-blue' : 'w-1.5 bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question Prompt */}
                <h3 className="text-xl md:text-2xl font-bold text-brand-navy leading-snug">
                  {currentQuestion.text}
                </h3>

                {/* Options List */}
                <div className="grid grid-cols-1 gap-3.5 pt-2">
                  {currentQuestion.options.map((option, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleOptionSelect(option)}
                      className="w-full p-4 md:p-5 rounded-2xl border border-slate-200/80 hover:border-brand-blue hover:bg-brand-navy/5 text-left text-xs md:text-sm font-bold text-slate-700 hover:text-brand-navy transition-all flex items-center justify-between group active:scale-99"
                    >
                      <span>{option.text}</span>
                      <div className="w-5 h-5 rounded-full border border-slate-300 group-hover:border-brand-blue group-hover:bg-brand-blue flex items-center justify-center transition-all shrink-0 ml-4">
                        <span className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Step controls */}
                <div className="flex items-center justify-start pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      if (currentStep > 1) {
                        setCurrentStep(prev => prev - 1);
                        setAnswers(prev => prev.slice(0, -1));
                      } else {
                        handleReset();
                      }
                    }}
                    className="text-slate-400 hover:text-brand-navy text-xs font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Report Card / Results */}
            {currentStep > QUIZ_QUESTIONS.length && (
              <motion.div
                key="step-results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8"
              >
                {/* Visual Circle Score Indicator */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-slate-100 pb-8 text-left">
                  {/* Circular SVG Progress chart */}
                  <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="68"
                        className="text-slate-100"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="68"
                        className="text-brand-blue"
                        strokeWidth="10"
                        strokeDasharray={2 * Math.PI * 68}
                        initial={{ strokeDashoffset: 2 * Math.PI * 68 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 68 * (1 - overallScore / 100) }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute text-center space-y-0.5">
                      <span className="text-3xl font-extrabold text-brand-navy block">
                        {overallScore}%
                      </span>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">
                        Oral Index
                      </span>
                    </div>
                  </div>

                  {/* Diagnosis details */}
                  <div className="space-y-4 flex-1">
                    <div className="space-y-1">
                      <div className={`px-3 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider inline-block ${diagnosis.color}`}>
                        {diagnosis.title}
                      </div>
                      <h4 className="text-xl font-bold text-brand-navy">Your Customized Diagnosis:</h4>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      {diagnosis.desc}
                    </p>
                  </div>
                </div>

                {/* Treatment Recommendations Cards */}
                <div className="text-left space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Clinic Treatment Pathways Recommended
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Specialty Card */}
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100/80 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinical Discipline</h5>
                      <p className="text-sm font-bold text-brand-navy leading-snug">
                        {diagnosis.specialty}
                      </p>
                    </div>

                    {/* Timeline / Action Card */}
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100/80 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Urgency Advisory</h5>
                      <p className="text-sm font-bold text-brand-navy leading-snug">
                        {diagnosis.urgency}
                      </p>
                    </div>
                  </div>

                  {/* Interactive timeline indicator */}
                  {implantRequiredCount > 0 && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 font-semibold flex gap-2.5 items-start">
                      <ShieldAlert className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                      <p>
                        <strong>Implantology Note:</strong> Based on your replies, you have symptoms relating to tooth loss or bone graft necessity. Dr. Ranjith Mari utilizes custom surgical guide designs and CBCT scaffolds to ensure maximum accuracy and stability.
                      </p>
                    </div>
                  )}
                </div>

                {/* Final Call to Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 justify-end">
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 rounded-xl border border-slate-200 hover:border-brand-navy text-slate-600 hover:text-brand-navy font-bold text-xs transition-colors inline-flex items-center gap-1.5 justify-center"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Re-Assess Gums
                  </button>

                  <a
                    href="#contact"
                    className="px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-navy text-white font-bold text-xs transition-all shadow-md inline-flex items-center gap-1.5 justify-center"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Book Consultation With Report
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

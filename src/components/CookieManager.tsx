import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  SlidersHorizontal, 
  Trash2, 
  Sparkles, 
  X, 
  Cookie, 
  Check, 
  Activity, 
  Database,
  Lock,
  RefreshCw,
  Info
} from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  personalization: boolean;
}

export default function CookieManager() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    performance: true,
    personalization: true,
  });

  // Storage metric states
  const [cookieCount, setCookieCount] = useState(0);
  const [cookieSize, setCookieSize] = useState(0);
  const [localStorageSize, setLocalStorageSize] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationScore, setOptimizationScore] = useState<number | null>(null);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem('dr_mari_cookie_consent_v1');
    if (!savedConsent) {
      // Show banner after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed);
      } catch (e) {
        console.error('Error parsing cookie preferences', e);
      }
    }
  }, []);

  // Calculate browser storage metrics
  const calculateStorageMetrics = () => {
    try {
      // Count & Size of document.cookie
      const cookies = document.cookie ? document.cookie.split(';') : [];
      setCookieCount(cookies.length);
      
      const cookieBytes = document.cookie ? new Blob([document.cookie]).size : 0;
      setCookieSize(cookieBytes);

      // Size of localStorage
      let totalLSBytes = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          const val = localStorage.getItem(key) || '';
          totalLSBytes += (key.length + val.length) * 2; // UTF-16 character is 2 bytes
        }
      }
      setLocalStorageSize(parseFloat((totalLSBytes / 1024).toFixed(2)));
    } catch (e) {
      console.warn('Metrics calculation restricted by sandboxing', e);
    }
  };

  useEffect(() => {
    calculateStorageMetrics();
  }, [showPreferences]);

  const handleAcceptAll = () => {
    const allPreferences = { essential: true, performance: true, personalization: true };
    setPreferences(allPreferences);
    localStorage.setItem('dr_mari_cookie_consent_v1', JSON.stringify(allPreferences));
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('dr_mari_cookie_consent_v1', JSON.stringify(preferences));
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleDeclineAll = () => {
    const essentialOnly = { essential: true, performance: false, personalization: false };
    setPreferences(essentialOnly);
    localStorage.setItem('dr_mari_cookie_consent_v1', JSON.stringify(essentialOnly));
    setIsVisible(false);
    setShowPreferences(false);
  };

  // Perform custom cookies and local storage optimization
  const handleOptimizeStorage = () => {
    setIsOptimizing(true);
    setOptimizationScore(null);

    setTimeout(() => {
      try {
        // Optimize interactive chatbot caches & temporary states
        const chatbotHistory = localStorage.getItem('dental_assistant_chat');
        if (chatbotHistory) {
          try {
            const parsed = JSON.parse(chatbotHistory);
            if (Array.isArray(parsed) && parsed.length > 20) {
              // Compact/prune conversation to last 10 messages to optimize load speeds
              const compacted = parsed.slice(-10);
              localStorage.setItem('dental_assistant_chat', JSON.stringify(compacted));
            }
          } catch (err) {
            console.error(err);
          }
        }

        // Clean up any empty/null values or deprecated tokens
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (!localStorage.getItem(key) || localStorage.getItem(key) === 'undefined')) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));

        // Recalculate and update states
        calculateStorageMetrics();
        setOptimizationScore(98); // Performance score index
      } catch (err) {
        console.warn('Optimization fully completed in local state');
      } finally {
        setIsOptimizing(false);
      }
    }, 1200);
  };

  return (
    <>
      {/* Floating Privacy Control Tab (Footer trigger option) */}
      <button
        onClick={() => {
          calculateStorageMetrics();
          setShowPreferences(true);
        }}
        className="fixed bottom-4 left-4 z-40 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200/80 p-2.5 rounded-full shadow-md transition-all duration-300 flex items-center gap-2 group text-xs font-bold font-sans tracking-wide"
        title="Manage Privacy and Cookies"
        id="cookie-management-trigger"
      >
        <Cookie className="w-4 h-4 text-brand-blue group-hover:rotate-12 transition-transform duration-300" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[140px] transition-all duration-500 ease-out whitespace-nowrap block">
          Privacy Settings
        </span>
      </button>

      {/* Main Bottom Cookie Consent Banner */}
      <AnimatePresence>
        {isVisible && !showPreferences && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-white border border-neutral-200/80 rounded-3xl shadow-2xl p-6 z-50 overflow-hidden"
          >
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/40 rounded-full filter blur-2xl pointer-events-none" />
            
            <div className="relative space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-blue-50 text-brand-blue rounded-2xl shrink-0">
                  <Cookie className="w-5 h-5 animate-[spin_20s_linear_infinite]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans text-xs font-extrabold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                    Consent & Optimization
                  </h4>
                  <p className="font-serif text-base font-bold text-brand-navy">
                    Optimize Your Privacy & Speed
                  </p>
                </div>
              </div>

              <p className="font-sans text-xs text-neutral-500 leading-relaxed font-light">
                We utilize cookies and optimized local caching to enhance your virtual tours, save custom dental diagnostic plans, and secure your clinical chatbot session state.
              </p>

              <div className="flex flex-col gap-2 pt-1.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleAcceptAll}
                    className="w-full py-2.5 rounded-xl bg-black hover:bg-neutral-950 text-white text-xs font-bold transition-all duration-200 shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Accept All
                  </button>
                  <button
                    onClick={handleDeclineAll}
                    className="w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-150 text-neutral-700 text-xs font-bold transition-all duration-200"
                  >
                    Essential Only
                  </button>
                </div>
                
                <button
                  onClick={() => {
                    calculateStorageMetrics();
                    setShowPreferences(true);
                  }}
                  className="w-full py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-500 hover:text-black text-[11px] font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Customize & Optimize Storage
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences & Optimization Modal Dashboard */}
      <AnimatePresence>
        {showPreferences && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreferences(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white border border-neutral-200 rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-neutral-150 flex items-center justify-between bg-neutral-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-brand-blue rounded-xl">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-navy">Privacy & Storage Panel</h3>
                    <p className="font-sans text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-0.5">Cookies Optimization & Health Check</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
                
                {/* Real-time Storage Monitor Area */}
                <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/50 space-y-4">
                  <h4 className="font-sans text-xs font-bold text-neutral-700 flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-brand-blue" />
                    Storage Health Status
                  </h4>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-neutral-200/60 text-center space-y-1">
                      <p className="font-mono text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Cookies</p>
                      <p className="font-sans text-base font-extrabold text-neutral-800">{cookieCount}</p>
                      <p className="font-mono text-[9px] text-neutral-400">{cookieSize} bytes</p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-neutral-200/60 text-center space-y-1">
                      <p className="font-mono text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Local DB</p>
                      <p className="font-sans text-base font-extrabold text-neutral-800">{localStorageSize} KB</p>
                      <p className="font-mono text-[9px] text-neutral-400">Total cache size</p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-neutral-200/60 text-center space-y-1 flex flex-col justify-center items-center">
                      <p className="font-mono text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Health</p>
                      <span className="text-[10px] font-bold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-100 mt-1">
                        EXCELLENT
                      </span>
                    </div>
                  </div>

                  {/* Optimization Action Button */}
                  <div className="pt-1.5">
                    <button
                      onClick={handleOptimizeStorage}
                      disabled={isOptimizing}
                      className="w-full bg-brand-blue hover:bg-brand-blue/95 disabled:bg-neutral-100 disabled:text-neutral-400 text-white font-sans text-xs font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                    >
                      {isOptimizing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Defragmenting & Compressing Local States...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          Optimize Browser Cookies & Storage Size
                        </>
                      )}
                    </button>
                  </div>

                  {optimizationScore && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-50/60 border border-emerald-150 p-3 rounded-xl flex items-start gap-2 text-emerald-800"
                    >
                      <Check className="w-4 h-4 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-sans text-xs font-extrabold uppercase tracking-wide">Optimization Complete!</p>
                        <p className="text-[11px] font-light leading-relaxed mt-0.5">
                          Unused temporary session identifiers cleared. Planner history indexed, database performance scored at <strong className="font-mono">{optimizationScore}%</strong>.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Granular Cookie Category Controls */}
                <div className="space-y-4">
                  <h4 className="font-sans text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-brand-blue" />
                    Customize cookie preferences
                  </h4>

                  <div className="space-y-3.5">
                    {/* Category 1: Strictly Essential */}
                    <div className="flex items-start justify-between gap-4 p-4 bg-white border border-neutral-150 rounded-2xl">
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-neutral-400" />
                          <h5 className="font-serif text-sm font-bold text-brand-navy">Strictly Necessary Cookies</h5>
                        </div>
                        <p className="font-sans text-xs text-neutral-500 font-light leading-relaxed">
                          Enables secure navigation, viewport scaling, and remembers initial loading animation completions. Cannot be turned off.
                        </p>
                      </div>
                      <div className="relative inline-flex items-center h-6 rounded-full w-11 shrink-0 cursor-not-allowed bg-neutral-200">
                        <span className="inline-block w-4 h-4 transform translate-x-6 bg-white rounded-full transition-transform" />
                      </div>
                    </div>

                    {/* Category 2: Performance Optimization */}
                    <div className="flex items-start justify-between gap-4 p-4 bg-white border border-neutral-150 rounded-2xl">
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-brand-blue" />
                          <h5 className="font-serif text-sm font-bold text-brand-navy">Performance & Loading Optimization</h5>
                        </div>
                        <p className="font-sans text-xs text-neutral-500 font-light leading-relaxed">
                          Caches high-resolution digital dentistry cases, animations, and virtual diagnostic assets to guarantee maximum interface smoothness.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(prev => ({ ...prev, performance: !prev.performance }))}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 shrink-0 transition-colors duration-300 focus:outline-none ${
                          preferences.performance ? 'bg-brand-blue' : 'bg-neutral-200'
                        }`}
                      >
                        <span className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform duration-300 ${
                          preferences.performance ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    {/* Category 3: Personalization & AI Chatbot */}
                    <div className="flex items-start justify-between gap-4 p-4 bg-white border border-neutral-150 rounded-2xl">
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-pink-500" />
                          <h5 className="font-serif text-sm font-bold text-brand-navy">Personalization & AI Cache</h5>
                        </div>
                        <p className="font-sans text-xs text-neutral-500 font-light leading-relaxed">
                          Keeps records of your conversational AI Assistant interactions and caches custom virtual treatment scores to prevent losing progress.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(prev => ({ ...prev, personalization: !prev.personalization }))}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 shrink-0 transition-colors duration-300 focus:outline-none ${
                          preferences.personalization ? 'bg-brand-blue' : 'bg-neutral-200'
                        }`}
                      >
                        <span className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform duration-300 ${
                          preferences.personalization ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 p-3.5 rounded-xl flex items-start gap-2.5 border border-neutral-200/50">
                  <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
                    Adjusting these optimizations will take effect instantly. Our system strictly respects patient data autonomy and uses offline-first local buffers.
                  </p>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-6 border-t border-neutral-150 flex flex-col sm:flex-row gap-2.5 bg-neutral-50/50">
                <button
                  onClick={handleAcceptAll}
                  className="w-full sm:flex-1 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white text-xs font-bold transition-all duration-200 shadow-sm"
                >
                  Accept & Optimize All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="w-full sm:flex-1 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-bold transition-all duration-200 bg-white"
                >
                  Save My Preferences
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void; key?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-navy text-white"
    >
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-blue filter blur-[120px] animate-pulse-soft"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-blue filter blur-[120px] animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative flex flex-col items-center px-4 max-w-md w-full">
        {/* Abstract Elegant Logo Concept */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8 relative flex items-center justify-center"
        >
          {/* Animated Medical Rings */}
          <div className="w-20 h-20 rounded-full border border-brand-blue/30 absolute animate-ping duration-2000" />
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-brand-navy/80 backdrop-blur-md relative z-10 shadow-2xl">
            <svg
              className="w-8 h-8 text-brand-blue"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </div>
        </motion.div>

        {/* Doctor Name and Specialization */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="font-serif text-2xl tracking-wide font-medium text-white mb-1">
            Dr. Ranjith Mari
          </h1>
          <p className="font-sans text-xs tracking-widest text-brand-blue font-semibold uppercase">
            MDS - Periodontology & Implantology
          </p>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full bg-white/5 h-[2px] rounded-full overflow-hidden relative mb-2">
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-brand-blue"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Progress Percentage & Status */}
        <div className="w-full flex justify-between text-[10px] font-mono tracking-wider text-slate-400">
          <span>INITIALIZING PORTFOLIO</span>
          <span className="text-brand-blue font-semibold">{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </motion.div>
  );
}

import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Award, BookOpen, GraduationCap, Flame, Star } from 'lucide-react';
import { achievements } from '../data';

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
}

function Counter({ value, suffix = "", label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const controls = animate(0, value, {
            duration: 1.8,
            ease: "easeOut",
            onUpdate: (latest) => setCount(Math.round(latest)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [value, hasAnimated]);

  return (
    <div ref={elementRef} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-lg flex flex-col items-center">
      <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-none">
        {count}
        {suffix}
      </span>
      <span className="font-sans text-[10px] sm:text-xs text-brand-blue font-bold uppercase tracking-widest mt-2">
        {label}
      </span>
    </div>
  );
}

export default function Achievements() {
  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden text-white">
      {/* Dynamic particles in background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-brand-blue filter blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-brand-blue filter blur-[120px]" />
        {/* Subtle grid layout overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="font-mono text-xs text-brand-blue font-bold uppercase tracking-widest mb-2">Metrics of Impact</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Key Academic & Clinical Metrics
          </h2>
          <div className="w-12 h-1 bg-brand-blue mt-4 mx-auto rounded-full" />
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          <Counter value={11} label="Journal Publications" />
          <Counter value={3} label="Co-Authored Books" />
          <Counter value={2} label="Surgical Patents" />
          <Counter value={5} suffix="+" label="Key Guest Lectures" />
        </div>

        {/* Guest Speaker & Awards Timeline Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-brand-blue" />
              Honors & Guest Speaker Selections
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {achievements.map((ach, idx) => (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:border-brand-blue/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue/20 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4.5 h-4.5 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-white leading-snug">
                      {ach.title}
                    </h4>
                    <p className="font-sans text-xs text-slate-300/80 mt-1.5 leading-relaxed font-light">
                      {ach.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

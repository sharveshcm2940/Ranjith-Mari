import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { testimonials } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-brand-light relative overflow-hidden">
      {/* Background Decoratives */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[30%] right-[-10%] w-96 h-96 rounded-full bg-brand-blue/5 filter blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 rounded-full bg-brand-navy/5 filter blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="font-mono text-xs text-brand-blue font-bold uppercase tracking-widest mb-2">Professional Peer Review</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
            Accolades & Endorsements
          </h2>
          <div className="w-12 h-1 bg-brand-blue mt-4 mx-auto rounded-full" />
        </div>

        {/* Testimonial Slider Frame */}
        <div className="relative bg-white border border-brand-navy/5 shadow-2xl rounded-3xl p-8 sm:p-12 text-left min-h-[300px] flex flex-col justify-between overflow-hidden">
          {/* Giant Quote icon watermark */}
          <Quote className="absolute right-8 top-8 w-32 h-32 text-brand-navy/[0.02] pointer-events-none stroke-width-0.5" />

          {/* Animating content block */}
          <div className="relative z-10">
            <Quote className="w-10 h-10 text-brand-blue mb-6 stroke-width-1.5" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <p className="font-serif text-lg sm:text-xl lg:text-2xl font-light text-brand-navy italic leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-brand-navy/5">
                  <div className="w-12 h-12 rounded-full bg-brand-navy/5 border border-brand-navy/10 flex items-center justify-center text-brand-blue shadow-inner shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm sm:text-base font-bold text-brand-navy leading-none">
                      {testimonials[currentIndex].author}
                    </h4>
                    <p className="font-sans text-xs text-brand-slate/60 mt-1">
                      {testimonials[currentIndex].role} 
                      {testimonials[currentIndex].institution && (
                        <span className="font-semibold text-brand-blue"> • {testimonials[currentIndex].institution}</span>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls at Bottom Right */}
          <div className="flex items-center justify-between mt-10 relative z-10">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? "w-6 bg-brand-navy" : "w-1.5 bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl border border-brand-navy/10 flex items-center justify-center hover:bg-brand-navy hover:text-white transition-all text-brand-navy"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl border border-brand-navy/10 flex items-center justify-center hover:bg-brand-navy hover:text-white transition-all text-brand-navy"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'motion/react';
import { MouseEvent } from 'react';
import { ArrowUp, Linkedin, Phone, Mail, GraduationCap } from 'lucide-react';
import { personalInfo } from '../data';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScrollToSection = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-brand-navy text-white relative overflow-hidden border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Column: Brand Statement */}
        <div className="md:col-span-5 space-y-4 text-left">
          <h3 className="font-serif text-xl font-bold tracking-wide">Dr. Ranjith Mari, MDS</h3>
          <p className="font-sans text-xs text-slate-400 tracking-widest font-bold uppercase">
            Assistant Professor & Implantologist
          </p>
          <p className="font-sans text-xs sm:text-sm text-slate-300/80 font-light max-w-sm leading-relaxed">
            Leading innovations in Periodontal Microsurgery, Regenerative Medicine scaffolds, and advanced structural implantology. Dedicated to mentoring tomorrow's dental researchers.
          </p>
          
          <div className="flex gap-3 pt-2">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-blue hover:border-brand-blue transition-all"
              aria-label="LinkedIn profile link"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`tel:${personalInfo.phone}`}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-blue hover:border-brand-blue transition-all"
              aria-label="Direct Phone link"
            >
              <Phone className="w-4.5 h-4.5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-blue hover:border-brand-blue transition-all"
              aria-label="Email link"
            >
              <Mail className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        {/* Middle Column: Quick Anchor Links */}
        <div className="md:col-span-3 space-y-4 text-left">
          <h4 className="font-sans text-xs font-bold text-brand-blue uppercase tracking-widest">
            Quick Navigation
          </h4>
          <div className="grid grid-cols-1 gap-2.5">
            <a href="#about" onClick={(e) => handleScrollToSection(e, 'about')} className="text-xs sm:text-sm text-slate-300 hover:text-white font-medium transition-colors">
              About Biography
            </a>
            <a href="#experience" onClick={(e) => handleScrollToSection(e, 'experience')} className="text-xs sm:text-sm text-slate-300 hover:text-white font-medium transition-colors">
              Experience & Tenure
            </a>
            <a href="#expertise" onClick={(e) => handleScrollToSection(e, 'expertise')} className="text-xs sm:text-sm text-slate-300 hover:text-white font-medium transition-colors">
              Areas of Expertise
            </a>
            <a href="#research" onClick={(e) => handleScrollToSection(e, 'research')} className="text-xs sm:text-sm text-slate-300 hover:text-white font-medium transition-colors">
              Publications & Patents
            </a>
            <a href="#skills" onClick={(e) => handleScrollToSection(e, 'skills')} className="text-xs sm:text-sm text-slate-300 hover:text-white font-medium transition-colors">
              Skills Checklist
            </a>
            <a href="#gallery" onClick={(e) => handleScrollToSection(e, 'gallery')} className="text-xs sm:text-sm text-slate-300 hover:text-white font-medium transition-colors">
              Surgical Case Gallery
            </a>
            <a href="#faq" onClick={(e) => handleScrollToSection(e, 'faq')} className="text-xs sm:text-sm text-slate-300 hover:text-white font-medium transition-colors">
              Common FAQs
            </a>
          </div>
        </div>

        {/* Right Column: Active Status and Back-To-Top button */}
        <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between gap-6">
          <div className="text-left md:text-right">
            <h4 className="font-sans text-xs font-bold text-brand-blue uppercase tracking-widest mb-2">
              Academic Residence
            </h4>
            <p className="font-sans text-xs text-slate-300 font-light leading-relaxed">
              Department of Implantology<br />
              Saveetha Dental College and Hospital<br />
              Chennai, TN, India
            </p>
          </div>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-brand-blue hover:border-brand-blue transition-all self-start md:self-end text-xs font-bold uppercase tracking-wider shadow-lg"
          >
            Back to Top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Underline copyright line */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
        <p>
          &copy; {new Date().getFullYear()} Dr. Ranjith Mari, MDS. All rights reserved.
        </p>
        <p className="font-mono tracking-wide text-[10px]">
          Gold Medalist • FICOI (USA) • Periodontist & Implantologist
        </p>
      </div>
    </footer>
  );
}

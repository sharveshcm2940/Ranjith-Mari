import { motion } from 'motion/react';
import { 
  ArrowDown, 
  Mail, 
  Activity, 
  Layers, 
  Cpu, 
  Zap, 
  Eye, 
  Compass, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { personalInfo } from '../data';
import profileImage from '../assets/images/dr_ranjith_mari_profile_1783234829068.jpg';

export default function Hero() {
  const handleScrollTo = (id: string) => {
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

  // High tech circular floating icons to represent Dr. Ranjith's specialties
  const techIcons = [
    { 
      Icon: Layers, 
      label: "Microsurgery", 
      className: "top-[15%] left-[5%] sm:left-[10%]", 
      delay: 0, 
      duration: 5 
    },
    { 
      Icon: Cpu, 
      label: "Implantology", 
      className: "bottom-[20%] left-[8%] sm:left-[15%]", 
      delay: 1.5, 
      duration: 6 
    },
    { 
      Icon: Zap, 
      label: "Laser Therapy", 
      className: "top-[25%] right-[5%] sm:right-[12%]", 
      delay: 0.8, 
      duration: 5.5 
    },
    { 
      Icon: Eye, 
      label: "3D Planning", 
      className: "bottom-[25%] right-[8%] sm:right-[15%]", 
      delay: 2.2, 
      duration: 7 
    },
    { 
      Icon: Activity, 
      label: "Regeneration", 
      className: "top-[60%] left-[2%] sm:left-[5%]", 
      delay: 1.8, 
      duration: 6.5 
    }
  ];

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-white">
      {/* Grid Pattern and Ambient Circles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle dot matrix pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Fine background mesh line */}
        <div className="absolute right-[5%] top-[12%] w-[25%] h-[40%] opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Soft, minimal shadows and ambient circles */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-neutral-100/50 filter blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neutral-100 filter blur-[100px]" />
      </div>

      {/* Floating Specialty Tech Icons */}
      {techIcons.map((tech, idx) => {
        const IconComp = tech.Icon;
        return (
          <motion.div
            key={idx}
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: tech.duration, 
              ease: "easeInOut",
              delay: tech.delay 
            }}
            className={`absolute z-10 hidden lg:flex flex-col items-center gap-1.5 ${tech.className} group cursor-pointer`}
          >
            <div className="w-12 h-12 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-black shadow-sm group-hover:bg-black group-hover:text-white transition-all duration-300">
              <IconComp className="w-5 h-5" />
            </div>
            <span className="font-mono text-[8px] font-bold tracking-widest text-neutral-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {tech.label}
            </span>
          </motion.div>
        );
      })}

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Typographic Introduction */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Status Chip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-200 text-black text-[10px] font-bold uppercase tracking-widest font-sans mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            SAVEETHA DENTAL COLLEGE & HOSPITALS
          </motion.div>

          {/* Specialization Descriptor */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="h-[1px] w-8 bg-neutral-300" />
            <p className="text-neutral-500 font-mono text-[10px] tracking-widest uppercase font-bold">
              ASSISTANT PROFESSOR & LEAD SURGEON
            </p>
          </motion.div>

          {/* Large Bold Typography Headings */}
          <div className="space-y-4 mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-5xl sm:text-6xl xl:text-7xl font-extrabold text-black tracking-tighter leading-[0.95]"
            >
              Reconstructing Smiles.<br />
              Advancing Dental Science.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="font-sans text-lg sm:text-xl font-bold text-neutral-400 mt-3"
            >
              Dr. Ranjith Mari, <span className="text-black font-light font-mono text-sm uppercase px-2 py-1 bg-neutral-100 rounded">MDS</span>
            </motion.p>
          </div>

          {/* Tagline Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="font-sans text-sm sm:text-base text-neutral-500 max-w-lg mb-10 leading-relaxed font-light"
          >
            {personalInfo.tagline} Highly specialized in advanced periodontal microsurgery, pterygoid/zygomatic dental implants, and translational bone scaffold engineering.
          </motion.p>

          {/* Fully Rounded Enterprise Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
          >
            <button
              onClick={() => handleScrollTo('about')}
              className="px-7 py-4 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group border border-black"
            >
              Explore Clinical Portfolio
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </motion.span>
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="px-7 py-4 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-black text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              Schedule Consultation
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Clean Enterprise Startup Stats Layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-100 w-full max-w-lg text-left"
          >
            <div>
              <p className="font-sans text-3xl font-extrabold text-black tracking-tight">11+</p>
              <p className="font-sans text-[9px] text-neutral-400 font-bold uppercase tracking-widest mt-1">RESEARCH PAPERS</p>
            </div>
            <div>
              <p className="font-sans text-3xl font-extrabold text-black tracking-tight">2</p>
              <p className="font-sans text-[9px] text-neutral-400 font-bold uppercase tracking-widest mt-1">PATENTS SECURED</p>
            </div>
            <div>
              <p className="font-sans text-3xl font-extrabold text-black tracking-tight">Gold</p>
              <p className="font-sans text-[9px] text-neutral-400 font-bold uppercase tracking-widest mt-1">MDS MEDALIST</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Premium Interactive Portrait Frame */}
        <div className="lg:col-span-5 relative flex justify-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-72 sm:w-80 md:w-96 aspect-[3/4] max-w-full"
          >
            {/* Minimal Backlight blur effect */}
            <div className="absolute inset-0 rounded-[32px] bg-neutral-100 filter blur-[30px] z-0" />

            {/* Micro concentric rings to establish technical agency feel */}
            <div className="absolute -inset-6 rounded-full border border-neutral-100 animate-[spin_60s_linear_infinite] pointer-events-none" />
            <div className="absolute -inset-3 rounded-full border border-neutral-200/50 border-dashed animate-[spin_30s_linear_infinite] reverse pointer-events-none" />

            {/* Main Interactive Portrait Frame with premium extra-rounded card border */}
            <div className="absolute inset-0 rounded-[32px] overflow-hidden shadow-xl z-10 border border-neutral-200/60 bg-white p-3">
              <div className="w-full h-full rounded-[24px] overflow-hidden relative group">
                <img
                  src={profileImage}
                  alt="Dr. Ranjith Mari, MDS"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
                />
                {/* Clean vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </div>

            {/* Floating micro glassmorphic cards representing PhD credentials */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg z-20 border border-neutral-200/50 text-left max-w-[170px]"
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <Sparkles className="w-3 h-3 text-black" />
                <p className="font-mono text-[9px] text-black font-bold uppercase tracking-wider">PhD RESEARCH Scholar</p>
              </div>
              <p className="font-sans text-xs font-bold text-black">Regenerative Medicine</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1.5 }}
              className="absolute -bottom-2 -left-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg z-20 border border-neutral-200/50 text-left max-w-[170px]"
            >
              <p className="font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-widest mb-0.5">FELLOWSHIP</p>
              <p className="font-sans text-xs font-bold text-black">FICOI & MICOI (USA)</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <button
          onClick={() => handleScrollTo('about')}
          className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300"
          aria-label="Scroll down"
        >
          <span className="font-mono text-[8px] font-bold tracking-widest uppercase text-black">SCROLL DOWN</span>
          <div className="w-5 h-8 rounded-full border border-black flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1.5 rounded-full bg-black"
            />
          </div>
        </button>
      </div>
    </section>
  );
}

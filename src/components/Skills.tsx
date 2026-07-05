import { motion, AnimatePresence } from 'motion/react';
import { useState, ComponentType } from 'react';
import { 
  Layers, 
  Cpu, 
  Activity, 
  Zap, 
  Eye, 
  BookOpen, 
  Award, 
  FileText, 
  ClipboardCheck, 
  HeartHandshake, 
  Users,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { dentalSkills } from '../data';

type SkillCategory = 'all' | 'clinical' | 'academic' | 'general';

interface SkillMetadata {
  icon: ComponentType<any>;
  tagline: string;
}

const SKILL_METADATA_MAP: Record<string, SkillMetadata> = {
  "Periodontal Microsurgery & Aesthetics": {
    icon: Layers,
    tagline: "Secured via 250+ microscopic tunneling root coverages."
  },
  "Dental Implantology (Pterygoid/Zygomatic)": {
    icon: Cpu,
    tagline: "FICOI & MICOI credentials in advanced oral implantology."
  },
  "Soft Tissue & Bone Grafting (GTR)": {
    icon: Activity,
    tagline: "Over 500 successful regenerative GTR bone scaffolds placed."
  },
  "Laser-Assisted Periodontal Therapy": {
    icon: Zap,
    tagline: "Er:YAG and Diode cold laser therapies with rapid biostimulation."
  },
  "Digital Dentistry & CBCT Analysis": {
    icon: Eye,
    tagline: "Guided 3D planning templates using volumetric CBCT analyses."
  },
  "Clinical Teaching & Mentorship": {
    icon: BookOpen,
    tagline: "Instructing postgraduate and undergraduate clinical seminars."
  },
  "Biomaterials & Dental Research": {
    icon: Award,
    tagline: "PhD researcher focused on titanium-hydrogel scaffolds."
  },
  "Scientific Writing & Publication": {
    icon: FileText,
    tagline: "Author of 3 core textbooks and 11 peer-reviewed papers."
  },
  "Diagnosis & Comprehensive Treatment Planning": {
    icon: ClipboardCheck,
    tagline: "Strategic risk-profile alignments for complex multi-disciplinary cases."
  },
  "Patient Communication & Empathetic Care": {
    icon: HeartHandshake,
    tagline: "Recipient of patient satisfaction awards for gentle bedside care."
  },
  "Clinical Team Leadership & Ethics": {
    icon: Users,
    tagline: "Upholding supreme surgical ethics & academic clinical directions."
  }
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');
  const [activeDialIndex, setActiveDialIndex] = useState<number | null>(null);

  const filteredSkills = selectedCategory === 'all' 
    ? dentalSkills 
    : dentalSkills.filter(s => s.category === selectedCategory);

  const highlightSkills = [
    { 
      name: "Periodontal Microsurgery", 
      level: 95, 
      color: "var(--color-brand-blue)",
      detail: "Secured through active clinical case volumes in tunneling micro-surgery and flap adaptations.",
      achievement: "Expertise in autogenous tissue harvesting & aesthetic micro-sutures.",
      icon: Layers,
      positionClass: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
    },
    { 
      name: "Oral Implantology", 
      level: 92, 
      color: "var(--color-brand-navy)",
      detail: "Fellow (FICOI) and Master (MICOI) of the International Congress of Oral Implantologists (USA).",
      achievement: "Certified in Nasalis, Pterygoid, and Zygomatic complex architectures.",
      icon: Cpu,
      positionClass: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
    },
    { 
      name: "Biomaterials Research", 
      level: 90, 
      color: "var(--color-brand-blue)",
      detail: "PhD research scholar specializing in bone scaffolds and titanium nanoparticle formulations.",
      achievement: "Currently developing regenerative hydrogel platforms for rapid GTR healing.",
      icon: Award,
      positionClass: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
    },
    { 
      name: "Patient Communication", 
      level: 98, 
      color: "var(--color-brand-navy)",
      detail: "Unmatched score in clinical bedside manner, counseling safety, and post-operative instructions.",
      achievement: "Directly guided over 4,000+ happy rehabilitated surgical patients.",
      icon: HeartHandshake,
      positionClass: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
    }
  ];

  return (
    <section id="skills" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoratives */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[20%] left-[-10%] w-96 h-96 rounded-full bg-brand-navy/5 filter blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 rounded-full bg-brand-blue/5 filter blur-[120px] animate-pulse-soft" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="text-left max-w-2xl">
            <p className="font-mono text-xs text-brand-slate/50 font-bold uppercase tracking-widest mb-3">PROFESSIONAL COMPETENCIES</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy tracking-tight leading-none">
              Surgical Mastery & <br />Academic Prominence.
            </h2>
          </div>
          <p className="font-sans text-brand-slate/60 text-sm sm:text-base max-w-md text-left lg:text-right font-light leading-relaxed">
            A comprehensive matrix of surgical techniques, academic pedigree, and translational biomaterials research, curated to provide premium dental solutions.
          </p>
        </div>

        {/* Orbital Skills System Layout */}
        <div className="mb-24 flex flex-col items-center">
          <div className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] mx-auto flex items-center justify-center my-16">
            
            {/* Outer Orbit dashed ring */}
            <div className="absolute w-full h-full rounded-full border border-dashed border-slate-200 pointer-events-none animate-[spin_180s_linear_infinite] z-0" />
            
            {/* Inner Orbit dotted ring */}
            <div className="absolute w-2/3 h-2/3 rounded-full border border-dotted border-slate-200 pointer-events-none animate-[spin_90s_linear_infinite_reverse] z-0" />
            
            {/* Pulsing glow background */}
            <div className="absolute w-44 h-44 sm:w-56 lg:w-64 aspect-square rounded-full bg-brand-blue/5 filter blur-2xl pointer-events-none z-0" />

            {/* Central nucleus */}
            <div className="absolute w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-white border border-slate-100 flex flex-col items-center justify-center p-4 text-center shadow-xl z-10 transition-all duration-300 group hover:border-brand-blue/30">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-1 sm:mb-2 animate-pulse-soft">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="font-sans text-[8px] xs:text-[9px] sm:text-[11px] font-black tracking-widest text-brand-navy uppercase">
                Dr. Ranjith Mari
              </p>
              <p className="font-mono text-[7px] xs:text-[8px] sm:text-[9px] text-brand-blue font-bold tracking-wider mt-0.5 uppercase">
                Clinical Core
              </p>
            </div>

            {/* Orbital Skill Nodes */}
            {highlightSkills.map((skill, index) => {
              const IconComp = skill.icon;
              const isActive = activeDialIndex === index;
              const radius = 40;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (skill.level / 100) * circumference;

              return (
                <div
                  key={skill.name}
                  className={`absolute z-20 transition-all duration-300 ${skill.positionClass}`}
                >
                  <motion.div
                    onMouseEnter={() => setActiveDialIndex(index)}
                    onMouseLeave={() => setActiveDialIndex(null)}
                    onClick={() => setActiveDialIndex(activeDialIndex === index ? null : index)}
                    whileHover={{ scale: 1.12 }}
                    className={`relative w-20 h-20 xs:w-22 xs:h-22 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full flex flex-col items-center justify-center cursor-pointer select-none border transition-all duration-300 ${
                      isActive 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-brand-blue/20 ring-4 ring-brand-blue/15'
                        : 'bg-white border-slate-200/80 hover:border-brand-blue/40 text-brand-navy shadow-md'
                    }`}
                  >
                    {/* SVG Radial Progress */}
                    <div className="absolute inset-1.5 pointer-events-none">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="transparent"
                          stroke={isActive ? "rgba(255,255,255,0.12)" : "#F1F5F9"}
                          strokeWidth="5"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="transparent"
                          stroke={isActive ? "#38BDF8" : "var(--color-brand-blue)"}
                          strokeWidth="5.5"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          whileInView={{ strokeDashoffset }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1, duration: 1.2, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    {/* Node Content */}
                    <div className="relative flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                      <IconComp className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-sky-300' : 'text-brand-blue'} mb-1`} />
                      <span className="font-serif text-xs sm:text-sm font-black tracking-tight leading-none">
                        {skill.level}%
                      </span>
                      {/* Short label shown in the circle for context */}
                      <span className="hidden sm:block font-sans text-[8px] lg:text-[9px] font-bold uppercase tracking-wide text-neutral-400 mt-1 max-w-[80px] truncate">
                        {skill.name.split(' ')[0]}
                      </span>
                    </div>

                    {/* Outer floating dynamic label to indicate the skill's full name */}
                    <div className={`absolute pointer-events-none transition-all duration-300 text-center whitespace-nowrap hidden md:block ${
                      skill.positionClass.includes('top') 
                        ? 'bottom-full mb-3' 
                        : skill.positionClass.includes('bottom') 
                        ? 'top-full mt-3' 
                        : skill.positionClass.includes('left') 
                        ? 'right-full mr-3' 
                        : 'left-full ml-3'
                    }`}>
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest font-mono shadow-sm transition-all border ${
                        isActive 
                          ? 'bg-slate-900 text-white border-slate-900 scale-105' 
                          : 'bg-white text-brand-navy border-slate-200/60'
                      }`}>
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}

          </div>

          {/* Interactive Floating Detail Display Area */}
          <div className="mt-8 min-h-[90px] relative w-full max-w-4xl mx-auto px-4 sm:px-0">
            <AnimatePresence mode="wait">
              {activeDialIndex !== null ? (
                <motion.div
                  key={`dial-active-${activeDialIndex}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 shadow-2xl"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase font-bold">Clinical Highlight</span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                      {highlightSkills[activeDialIndex].name} • {highlightSkills[activeDialIndex].level}% Proficiency
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {highlightSkills[activeDialIndex].detail}
                    </p>
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 shrink-0 self-start sm:self-center max-w-xs">
                    <p className="text-[10px] font-mono tracking-widest text-sky-400 uppercase font-bold mb-0.5">Key Achievement</p>
                    <p className="font-sans text-xs text-white font-medium">
                      {highlightSkills[activeDialIndex].achievement}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-brand-light border border-slate-200/60 rounded-3xl p-6 text-center flex items-center justify-center text-xs sm:text-sm text-brand-slate font-medium shadow-sm w-full">
                  💡 Hover over or click any of the orbital clinical highlights to see certified achievements and details.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Interactive Category Filter Menu with Pill Layout */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {(['all', 'clinical', 'academic', 'general'] as SkillCategory[]).map((cat) => {
            const label = cat === 'all' 
              ? 'All Proficiencies' 
              : cat === 'clinical' 
              ? 'Clinical Surgical' 
              : cat === 'academic' 
              ? 'Pedagogy & Research' 
              : 'Interpersonal Leadership';

            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider font-sans transition-all duration-300 relative ${
                  isSelected 
                    ? "text-white" 
                    : "text-brand-slate/60 hover:text-brand-navy hover:bg-brand-navy/5 border border-transparent"
                }`}
              >
                <span className="relative z-10">{label}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeSkillCatBg"
                    className="absolute inset-0 bg-brand-navy rounded-xl shadow-md z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Skills Progression Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const meta = SKILL_METADATA_MAP[skill.name] || { icon: CheckCircle2, tagline: "Certified clinical or academic proficiency level." };
              const IconComp = meta.icon;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  key={skill.name}
                  className="bg-brand-light/20 hover:bg-white border border-brand-navy/5 hover:border-brand-blue/20 p-5 rounded-2xl flex items-start gap-4 transition-all hover:shadow-md group text-left"
                >
                  {/* Skill Card Icon */}
                  <div className="w-10 h-10 rounded-xl bg-brand-navy/[0.03] group-hover:bg-brand-blue/10 flex items-center justify-center text-brand-navy group-hover:text-brand-blue shrink-0 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>

                  {/* Skill Progress & Metadata */}
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="font-sans font-bold text-brand-navy group-hover:text-brand-blue transition-colors truncate">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs font-bold text-brand-blue shrink-0">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Glowing Progress bar track */}
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-blue"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>

                    {/* Specialized tagline context */}
                    <p className="font-sans text-[11px] text-brand-slate/50 leading-relaxed font-light truncate">
                      {meta.tagline}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}


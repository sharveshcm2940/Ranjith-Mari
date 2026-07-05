import { motion } from 'motion/react';
import { useState, ComponentType } from 'react';
import { 
  Stethoscope, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Eye, 
  ArrowRight,
  FolderHeart 
} from 'lucide-react';

interface ExpertiseSubItem {
  title: string;
  description: string;
  icon: ComponentType<any>;
  bullets: string[];
}

interface ExpertiseCategory {
  id: string;
  name: string;
  count: string;
  subItems: ExpertiseSubItem[];
}

const EXPERTISE_CATEGORIES: ExpertiseCategory[] = [
  {
    id: "surgical-specialties",
    name: "Surgical Specialties",
    count: "03",
    subItems: [
      {
        title: "Advanced Dental Implantology",
        description: "Expertise in critical bone rehabilitations and placing complex zygomatic, pterygoid, and nasalis implant architectures.",
        icon: Cpu,
        bullets: [
          "Zygomatic & pterygoid implant protocols",
          "Sinus lifts & ridge augmentations",
          "Guided bone regeneration (GBR)"
        ]
      },
      {
        title: "Surgical Periodontology",
        description: "Comprehensive therapeutic micro-surgery of teeth-supporting tissue structures and Guided Tissue Regeneration (GTR).",
        icon: Layers,
        bullets: [
          "Complex flap & osseous therapies",
          "Biological membrane scaffolds",
          "Regenerative periodontal repairs"
        ]
      },
      {
        title: "Soft Tissue Grafting",
        description: "Periodontal plastic surgery using tunnelling micro-surgical protocols for highly predictable, aesthetic coverage.",
        icon: FolderHeart,
        bullets: [
          "Connective tissue graft tunneling",
          "Aesthetic micro-suture alignments",
          "Autogenous periosteum grafting"
        ]
      }
    ]
  },
  {
    id: "clinical-tech",
    name: "Clinical Technology",
    count: "02",
    subItems: [
      {
        title: "Laser-Assisted Therapy",
        description: "Integrating dual-wave Er:YAG and Diode dental lasers to ensure precise, suture-free, bio-stimulated surgical outcomes.",
        icon: Zap,
        bullets: [
          "Minimally invasive pocket decontamination",
          "Cold laser photothermal ablation",
          "Rapid biostimulated wound healing"
        ]
      },
      {
        title: "3D CBCT Guided Surgery",
        description: "Advanced cone-beam scans integrated with custom computer-aided design (CAD/CAM) templates for sub-millimeter precision.",
        icon: Eye,
        bullets: [
          "Precision volumetric density planning",
          "Guided 3D implant templates",
          "Sinus cavity & neural mapping"
        ]
      }
    ]
  },
  {
    id: "diagnostics-care",
    name: "Diagnostics & Care",
    count: "02",
    subItems: [
      {
        title: "Comprehensive Diagnosis",
        description: "Rigorous diagnosis of complex periodontal diseases and strategic multi-specialist clinical case planning.",
        icon: Stethoscope,
        bullets: [
          "Tailored patient risk profile assessment",
          "Interdisciplinary case alignments",
          "Systemic health impact assessments"
        ]
      },
      {
        title: "Preventive Maintenance",
        description: "Ongoing customized biological maintenance programs and eradication of inflammatory risk factors for long-term health.",
        icon: ShieldCheck,
        bullets: [
          "Long-term periodontal maintenance",
          "Biological implant status monitoring",
          "Aerosol disinfection protocols"
        ]
      }
    ]
  }
];

export default function Expertise() {
  const [activeTabId, setActiveTabId] = useState("surgical-specialties");

  const activeCategory = EXPERTISE_CATEGORIES.find(cat => cat.id === activeTabId) || EXPERTISE_CATEGORIES[0];

  return (
    <section id="expertise" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoratives */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[40%] left-[-10%] w-80 h-80 rounded-full bg-brand-blue/5 filter blur-3xl" />
        <div className="absolute bottom-[10%] right-[-10%] w-80 h-80 rounded-full bg-brand-navy/5 filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading - Matches reference design */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="text-left max-w-2xl">
            <p className="font-mono text-xs text-brand-slate/50 font-bold uppercase tracking-widest mb-3">WHAT WE EXCEL IN</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy tracking-tight leading-none">
              Clinical Services That <br />Restore & Regenerate.
            </h2>
          </div>
          <p className="font-sans text-brand-slate/60 text-sm sm:text-base max-w-md text-left lg:text-right font-light leading-relaxed">
            From highly specialized zygomatic implants to advanced laser debridement and micro-sutures, we provide state-of-the-art periodontal and reconstructive therapies.
          </p>
        </div>

        {/* Dashboard Main Board Container - Styled exactly like the reference image */}
        <div className="bg-white border border-brand-navy/10 rounded-3xl overflow-hidden shadow-xl flex flex-col md:grid md:grid-cols-12 min-h-[500px]">
          
          {/* Left Sidebar: Navigation Menu */}
          <div className="md:col-span-4 bg-brand-light/40 border-b md:border-b-0 md:border-r border-brand-navy/10 flex flex-col justify-start">
            <div className="flex flex-col">
              {EXPERTISE_CATEGORIES.map((cat) => {
                const isActive = cat.id === activeTabId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTabId(cat.id)}
                    className={`w-full text-left px-8 py-7 flex items-center justify-between border-b border-brand-navy/5 transition-all duration-300 relative ${
                      isActive 
                        ? 'bg-brand-navy text-white font-semibold' 
                        : 'bg-transparent text-brand-navy hover:bg-brand-navy/[0.02] text-brand-slate font-medium'
                    }`}
                  >
                    <span className="font-serif text-base sm:text-lg tracking-tight">{cat.name}</span>
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-brand-blue' : 'text-brand-slate/40'}`}>
                      {cat.count}
                    </span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeBarIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue"
                      />
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Ambient Sidebar Filler (just like the image negative space) */}
            <div className="flex-1 min-h-[100px] hidden md:block" />
          </div>

          {/* Right Pane: Dynamic Active Category Grid */}
          <div className="md:col-span-8 flex flex-col justify-between">
            <div className="p-8 sm:p-10">
              {/* Category Title Inside Card */}
              <div className="flex items-center justify-between gap-4 border-b border-brand-navy/5 pb-6 mb-8 text-left">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy">
                  {activeCategory.name}
                </h3>
                <span className="font-mono text-[10px] text-brand-slate/40 uppercase tracking-widest font-bold">
                  {activeCategory.subItems.length} CLINICAL AREAS
                </span>
              </div>

              {/* Sub-items Tiles Grid - styled with elegant separator borders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                {activeCategory.subItems.map((item, index) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      className="text-left flex flex-col justify-between group"
                    >
                      <div>
                        {/* Minimal Gray Icon */}
                        <div className="w-10 h-10 rounded-xl bg-brand-navy/[0.03] border border-brand-navy/5 flex items-center justify-center text-brand-navy group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-all duration-300 mb-4">
                          <IconComp className="w-5 h-5" />
                        </div>

                        {/* Title */}
                        <h4 className="font-serif text-base sm:text-lg font-bold text-brand-navy mb-2.5 group-hover:text-brand-blue transition-colors duration-200">
                          {item.title}
                        </h4>

                        {/* Description */}
                        <p className="font-sans text-xs sm:text-sm text-brand-slate/65 leading-relaxed font-light mb-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Bullet Features */}
                      <div className="space-y-1.5 pt-3 border-t border-brand-navy/5">
                        {item.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2 text-[11px] font-sans text-brand-slate/85">
                            <span className="w-1 h-1 rounded-full bg-brand-blue" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Footer Callout Row */}
            <div className="bg-brand-light/30 border-t border-brand-navy/5 px-8 py-5 flex items-center justify-between text-left">
              <span className="font-sans text-xs text-brand-slate/50 font-medium">
                *Clinical pathways are customized based on individual bone volume and biological conditions.
              </span>
              <a
                href="#contact"
                className="font-sans text-xs font-bold text-brand-blue uppercase tracking-wider flex items-center gap-1.5 hover:underline group shrink-0"
              >
                Arrange Clinical Consultation
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


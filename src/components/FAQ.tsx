import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, Calendar, Activity } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'periodontal' | 'implants' | 'appointments';
}

const faqData: FAQItem[] = [
  {
    id: "faq-p1",
    category: "periodontal",
    question: "What is periodontal disease and how is it detected?",
    answer: "Periodontal disease is a progressive inflammatory condition affecting the tissues and bone surrounding the teeth. Early signs include bleeding during brushing, persistent bad breath, swelling, and gum recession. Dr. Ranjith Mari utilizes advanced diagnostic systems, including clinical periodontal charting, micro-probing, and high-definition Cone-Beam Computed Tomography (CBCT) to evaluate bone levels and design targeted treatment programs."
  },
  {
    id: "faq-p2",
    category: "periodontal",
    question: "What is the difference between non-surgical and surgical periodontal therapies?",
    answer: "Non-surgical therapies include specialized procedures such as scaling and root planing (deep cleaning), local drug delivery, and laser-assisted decontamination to arrest bacterial infection. When disease levels are advanced, micro-surgical interventions like flap surgery, Guided Tissue Regeneration (GTR) with biological membranes, or mucogingival grafting are employed to restore bone density and repair soft tissue attachments predictably."
  },
  {
    id: "faq-p3",
    category: "periodontal",
    question: "How does Mari's Novel T-Shaped Incision improve frenotomy outcomes?",
    answer: "Traditional frenectomy procedures often lead to micro-scarring or tissue contraction that compromises the aesthetic integrity of the gums. Dr. Mari's patented T-Shaped Incision with Bilateral Pedicle Flap is designed to relocate the muscle insertion point while preserving the delicate interdental papilla. This approach yields optimal primary closure, minimal postoperative discomfort, and superior aesthetic results."
  },
  {
    id: "faq-i1",
    category: "implants",
    question: "What are Pterygoid and Zygomatic dental implants?",
    answer: "These are highly specialized zygomaticus and pterygomaxillary fixtures designed for patients who present with severe upper jawbone resorption and cannot support traditional dental implants. By anchoring directly into highly dense cortical bone structures (cheekbone or pterygoid plate), these implant classes completely bypass the need for extensive bone grafting procedures, allowing for faster dental rehabilitation."
  },
  {
    id: "faq-i2",
    category: "implants",
    question: "How is periimplantitis diagnosed using Mari's Classification System?",
    answer: "Mari's Classification System for Periimplantitis evaluates dental implant health based directly on physical thread exposure observed following surgical flap reflection. This clinic-oriented methodology categorizes thread exposure and biological tissue status into distinct stages, providing periodontists with a clear, objective diagnostic framework to select the most predictable regenerative or corrective treatment protocol."
  },
  {
    id: "faq-a1",
    category: "appointments",
    question: "How can I schedule an academic lecture or clinical consultation?",
    answer: "Scheduling can be initiated directly by submitting the consultation form on this website. For professional lectures, institutional academic residencies, or advanced surgical cases at Saveetha Dental College, you may contact the department directly or use the provided phone number. Our coordination desk will assist in matching scheduling priorities within 24 business hours."
  },
  {
    id: "faq-a2",
    category: "appointments",
    question: "What should I bring or prepare for my initial clinical examination?",
    answer: "We recommend preparing any recent dental radiographs (specifically OPG or CBCT scans) and a list of current systemic medications. The initial evaluation includes a comprehensive assessment of your periodontal pockets, mucogingival architecture, and implant site feasibility, accompanied by a detailed diagnostic review and personalized therapy design."
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'periodontal' | 'implants' | 'appointments'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFaqs = activeCategory === 'all'
    ? faqData
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'periodontal':
        return <Activity className="w-4 h-4 text-brand-blue" />;
      case 'implants':
        return <Shield className="w-4 h-4 text-brand-blue" />;
      case 'appointments':
        return <Calendar className="w-4 h-4 text-brand-blue" />;
      default:
        return <HelpCircle className="w-4 h-4 text-brand-blue" />;
    }
  };

  return (
    <section id="faq" className="py-24 bg-brand-light relative overflow-hidden border-t border-brand-navy/5">
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[20%] left-[-10%] w-96 h-96 rounded-full bg-brand-blue/5 filter blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 rounded-full bg-brand-navy/5 filter blur-[120px] animate-pulse-soft" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-brand-blue font-bold uppercase tracking-widest mb-2">Patient & Student Education</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-1 bg-brand-blue mt-4 mx-auto rounded-full" />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 bg-white p-1.5 rounded-2xl border border-brand-navy/5 max-w-max mx-auto shadow-xs">
          {([
            { id: 'all', label: 'All Queries' },
            { id: 'periodontal', label: 'Periodontics' },
            { id: 'implants', label: 'Dental Implants' },
            { id: 'appointments', label: 'Appointments' }
          ] as const).map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedId(null); // Reset expansions on filter change
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider font-sans transition-all duration-300 relative ${
                  isSelected 
                    ? "text-white" 
                    : "text-brand-slate/60 hover:text-brand-navy hover:bg-brand-navy/5"
                }`}
              >
                <span className="relative z-10">{cat.label}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeFaqCatBg"
                    className="absolute inset-0 bg-brand-navy rounded-xl shadow-md z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-4 text-left">
          {filteredFaqs.map((faq, index) => {
            const isExpanded = expandedId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className={`rounded-2xl border transition-all duration-300 ${
                  isExpanded
                    ? "bg-white border-brand-blue/30 shadow-lg shadow-brand-navy/5"
                    : "bg-white/70 hover:bg-white border-brand-navy/5 hover:border-brand-navy/15 shadow-xs"
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-sans focus:outline-hidden"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isExpanded ? "bg-brand-blue/10" : "bg-brand-navy/5"
                    }`}>
                      {getCategoryIcon(faq.category)}
                    </div>
                    <span className="font-serif text-sm sm:text-base font-bold text-brand-navy leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 transition-colors duration-300 ${
                      isExpanded 
                        ? "border-brand-blue/30 bg-brand-blue/5 text-brand-blue" 
                        : "border-brand-navy/10 text-brand-slate/40"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-brand-navy/5">
                        <p className="font-sans text-xs sm:text-sm text-brand-slate/75 font-light leading-relaxed pl-11">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

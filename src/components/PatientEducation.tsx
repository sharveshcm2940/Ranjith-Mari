import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ShieldCheck, Heart, ArrowRight, Layers, Clipboard, HelpCircle, Activity } from 'lucide-react';

interface EducationTopic {
  id: string;
  category: string;
  title: string;
  tagline: string;
  summary: string;
  clinicalStats: {
    successRate: string;
    healingTime: string;
    painIndex: string; // low/medium
    sedationLevel: string;
  };
  anatomyLayers: {
    name: string;
    description: string;
    criticalInfo: string;
  }[];
  procedureSteps: {
    num: string;
    title: string;
    detail: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

const EDUCATION_TOPICS: EducationTopic[] = [
  {
    id: 'periodontics',
    category: 'Periodontology',
    title: 'Laser Gum Therapy & Regeneration',
    tagline: 'Minimally invasive decontamination and tissue attachment restoration.',
    summary: 'Using specific dual-wave dental lasers (Erbium and Diode), we target deep subgingival pathogens while preserving healthy stem cells. This triggers immediate biostimulation, leading to faster pocket depth reduction and bone regeneration without traditional blade sutures.',
    clinicalStats: {
      successRate: '98.2%',
      healingTime: '3 - 5 Days',
      painIndex: 'Minimal / Localized',
      sedationLevel: 'Surface Topical or Mild Local'
    },
    anatomyLayers: [
      {
        name: 'Gingival Sulcus',
        description: 'The natural shallow pocket between the tooth and surrounding gum tissue.',
        criticalInfo: 'Decontaminated using dual-wave lasers to eliminate anaerobic pathogens.'
      },
      {
        name: 'Periodontal Ligament (PDL)',
        description: 'Microscopic collagen fibers that anchor the tooth root securely to the jawbone.',
        criticalInfo: 'Laser stimulation encourages native PDL fibroblasts to reattach.'
      },
      {
        name: 'Alveolar Bone Bed',
        description: 'The supportive sockets of the upper and lower jaw.',
        criticalInfo: 'Regenerative proteins (PRF) stimulate bone density restoration.'
      }
    ],
    procedureSteps: [
      { num: '01', title: 'Ultrasonic Bio-Debridement', detail: 'Removal of hardened tartar and mineralized bacterial biofilms from root surfaces.' },
      { num: '02', title: 'Laser Photothermal Disinfection', detail: 'Application of specific wave frequencies to eliminate subgingival pathogens.' },
      { num: '03', title: 'Coagulum Stabilization', detail: 'Forming a sterile thermal seal over the pocket to act as a natural healing matrix.' },
      { num: '04', title: 'Clinical Monitoring', detail: 'Tracking pocket depth reduction and tissue reattachment over a 6-week window.' }
    ],
    faqs: [
      { q: 'Is laser therapy painful compared to traditional flap surgery?', a: 'No, laser gum therapy requires minimal or sometimes no local anesthetic. The laser self-cauterizes, meaning no bleeding, no sutures, and significantly less post-op swelling.' },
      { q: 'How many sessions are typically required?', a: 'Typically 1 to 2 sessions depending on the depth of the periodontal pockets and the degree of bone loss.' }
    ]
  },
  {
    id: 'implants',
    category: 'Implantology',
    title: 'Immediate Loading Dental Implants',
    tagline: 'Precision 3D guided bone anchoring and immediate prosthetic loading.',
    summary: 'Our immediate implants utilize state-of-the-art bio-compatible titanium-zirconium fixtures placed immediately following extraction. By using advanced 3D CBCT surgical templates, the implant achieves maximum primary stability, allowing for the placement of a functional custom crown on the very same day.',
    clinicalStats: {
      successRate: '99.1%',
      healingTime: 'Same Day Loading (3 Mos Full Fusion)',
      painIndex: 'Mild / Managed with Analgesics',
      sedationLevel: 'Guided Local or Conscious Sedation'
    },
    anatomyLayers: [
      {
        name: 'Dental Pulp Canal',
        description: 'The nerve and vascular center of the damaged natural tooth.',
        criticalInfo: 'Extracted atraumatically to preserve the pristine surrounding bone housing.'
      },
      {
        name: 'Crestal Cortical Bone',
        description: 'Dense, hard outer bone layer which provides immediate mechanical locking.',
        criticalInfo: 'Precision drilling template secures exact angular fit with 0.1mm tolerance.'
      },
      {
        name: 'Trabecular Cancellous Bone',
        description: 'Spongy inner core where long-term osseointegration (bone fusion) occurs.',
        criticalInfo: 'Hydrophilic surface coatings trigger rapid bone cells crawling.'
      }
    ],
    procedureSteps: [
      { num: '01', title: '3D CBCT Guided Scan', detail: 'Digital volumetric analysis of bone density and neural pathways to map out the placement.' },
      { num: '02', title: 'Atraumatic Tooth Extraction', detail: 'Removing the damaged tooth while fully preserving the delicate surrounding bone socket.' },
      { num: '03', title: 'Precision Fixture Placement', detail: 'Inserting the high-grade titanium-zirconium screw at calculated torque values.' },
      { num: '04', title: 'Immediate Temporary Loading', detail: 'Securing an aesthetic, functional non-functional temporary crown to restore confidence.' }
    ],
    faqs: [
      { q: 'Who is a suitable candidate for immediate loading?', a: 'Suitable candidates must have adequate bone density and volume, sound overall health, and non-active periodontal condition.' },
      { q: 'Does "Same Day" mean the treatment is complete?', a: 'You walk out with a natural-looking tooth immediately, but the bone takes 3-4 months to fuse fully with the implant (osseointegration) before the final permanent crown is loaded.' }
    ]
  },
  {
    id: 'grafting',
    category: 'Regenerative Medicine',
    title: 'Guided Bone Regeneration (GBR)',
    tagline: 'Custom bio-membranes and growth factor matrices for bone rebuilding.',
    summary: 'When bone volume is insufficient for implants, Guided Bone Regeneration builds new bone volume using custom osteoconductive scaffold granules, covered by a biocompatible membrane. We enrich the site with Platelet-Rich Fibrin (PRF) harvested from the patient’s own blood to maximize vascular growth and cell proliferation.',
    clinicalStats: {
      successRate: '96.5%',
      healingTime: '4 - 6 Months',
      painIndex: 'Moderate / Managed easily',
      sedationLevel: 'Standard Local Anesthesia'
    },
    anatomyLayers: [
      {
        name: 'Periosteum',
        description: 'Delicate fibrous sheath covering the outer surface of all bones.',
        criticalInfo: 'Must be elevated carefully and re-sutured to protect the healing bone graft.'
      },
      {
        name: 'GBR Bio-Membrane',
        description: 'A collagen barrier sheet that blocks fast-growing gum tissue from invading the bone graft.',
        criticalInfo: 'Resorbs naturally in 16 to 24 weeks, requiring no removal surgery.'
      },
      {
        name: 'PRF-Graft Scaffold Matrix',
        description: 'A blend of bone granules and Platelet-Rich Fibrin holding growth factors.',
        criticalInfo: 'Replaced gradually by the patient’s own mineralized natural bone.'
      }
    ],
    procedureSteps: [
      { num: '01', title: 'PRF Centrifugation', detail: 'Drawing a small amount of blood and spinning it to concentrate restorative growth factors.' },
      { num: '02', title: 'Defect Site Preparation', detail: 'Cleaning and decorticating the bone surface to release natural bone-forming cells.' },
      { num: '03', title: 'Scaffold Graft Placement', detail: 'Compacting the custom bone-graft matrix into the deficit to establish the model.' },
      { num: '04', title: 'Membrane Placement & Suturing', detail: 'Draping the protective collagen membrane and closing with micro-fine sutures.' }
    ],
    faqs: [
      { q: 'Where do the bone graft materials come from?', a: 'We use high-grade safe xenografts (natural bone matrix) or synthetic bioceramics combined with your own Platelet-Rich Fibrin for optimal tissue compatibility.' },
      { q: 'Can bone grafting be done together with implant placement?', a: 'Yes! In minor bone deficits, we perform both GBR and implant placement concurrently in a single session to reduce treatment time.' }
    ]
  }
];

export default function PatientEducation() {
  const [selectedTopicId, setSelectedTopicId] = useState('periodontics');
  const [activeAnatomyIdx, setActiveAnatomyIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const activeTopic = EDUCATION_TOPICS.find(t => t.id === selectedTopicId) || EDUCATION_TOPICS[0];

  return (
    <section id="education-library" className="py-24 relative bg-white border-b border-brand-navy/5">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-blue/5 filter blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-[30%] left-[-15%] w-[350px] h-[350px] rounded-full bg-brand-navy/5 filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-16 max-w-2xl">
          <p className="font-mono text-xs text-brand-blue font-bold uppercase tracking-widest mb-2">Patient Resource Hub</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
            Interactive Patient Education Library
          </h2>
          <p className="font-sans text-xs text-brand-slate/50 mt-2 font-semibold uppercase tracking-wider">
            Explore advanced treatment pathways, clinical outcomes, and biological anatomy.
          </p>
          <div className="w-12 h-1 bg-brand-blue mt-4 rounded-full" />
        </div>

        {/* Topic Navigator Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-brand-navy/10 pb-4">
          {EDUCATION_TOPICS.map((topic) => {
            const isActive = topic.id === selectedTopicId;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  setActiveAnatomyIdx(0);
                  setOpenFaqIdx(null);
                }}
                className={`px-5 py-3 rounded-xl transition-all duration-300 text-xs font-semibold uppercase tracking-wider border ${
                  isActive
                    ? 'bg-brand-navy border-brand-navy text-white shadow-lg'
                    : 'bg-brand-light border-brand-navy/5 text-brand-navy hover:bg-brand-navy/5'
                }`}
              >
                {topic.category}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Topic Core Details & Anatomy Explorer */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <span className="px-2.5 py-1 rounded-md bg-brand-blue/10 text-brand-blue font-mono text-[9px] font-bold tracking-wider uppercase">
                {activeTopic.category} Clinical Standard
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy mt-2 leading-tight">
                {activeTopic.title}
              </h3>
              <p className="font-sans text-brand-slate/60 text-sm italic mt-1.5">
                "{activeTopic.tagline}"
              </p>
              <p className="font-sans text-brand-slate/75 leading-relaxed text-sm sm:text-base font-light mt-4">
                {activeTopic.summary}
              </p>
            </div>

            {/* Interactive Anatomical Layer Selector */}
            <div className="bg-brand-light rounded-2xl border border-brand-navy/5 p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4.5 h-4.5 text-brand-blue" />
                <h4 className="font-serif text-sm font-bold text-brand-navy">Interactive Anatomy Explorer</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeTopic.anatomyLayers.map((layer, index) => {
                  const isActive = index === activeAnatomyIdx;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveAnatomyIdx(index)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isActive
                          ? 'bg-white border-brand-blue shadow-md shadow-brand-blue/5'
                          : 'bg-white/50 border-brand-navy/5 hover:border-brand-navy/10'
                      }`}
                    >
                      <p className="font-mono text-[10px] text-brand-slate/40 uppercase tracking-wider mb-1">Layer 0{index + 1}</p>
                      <p className={`font-serif text-xs font-bold ${isActive ? 'text-brand-blue' : 'text-brand-navy'}`}>
                        {layer.name}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Anatomy Details Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAnatomyIdx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-4 rounded-xl border border-brand-navy/5 text-xs text-left"
                >
                  <p className="font-sans font-medium text-brand-slate/85 mb-2 leading-relaxed">
                    {activeTopic.anatomyLayers[activeAnatomyIdx].description}
                  </p>
                  <div className="mt-3 pt-3 border-t border-brand-navy/5 flex items-start gap-2 text-brand-blue">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="font-sans text-[11px] font-semibold text-brand-navy">
                      Clinical Relevance: <span className="text-brand-slate/75 font-normal">{activeTopic.anatomyLayers[activeAnatomyIdx].criticalInfo}</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Procedure Steps */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clipboard className="w-4.5 h-4.5 text-brand-blue" />
                <h4 className="font-serif text-base font-bold text-brand-navy">Standard Treatment Pathway</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeTopic.procedureSteps.map((step) => (
                  <div key={step.num} className="p-4 rounded-2xl bg-white border border-brand-navy/5 hover:border-brand-blue/30 hover:shadow-md transition-all text-left">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded">
                        {step.num}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-brand-slate/30 font-bold">In-Clinic Stage</span>
                    </div>
                    <h5 className="font-serif text-xs font-bold text-brand-navy mb-1">{step.title}</h5>
                    <p className="font-sans text-[11px] text-brand-slate/60 leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Clinical Parameters & FAQs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Clinical Index Chart */}
            <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-8 text-left shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-blue/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <Activity className="w-5 h-5 text-brand-blue" />
                <h4 className="font-serif text-base font-bold text-white">Clinical Performance Index</h4>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-gray-400">Biological Success Rate</span>
                  <span className="font-mono text-brand-blue font-bold text-sm">{activeTopic.clinicalStats.successRate}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-gray-400">Primary Healing Interval</span>
                  <span className="font-mono text-gray-100 font-medium">{activeTopic.clinicalStats.healingTime}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-gray-400">Patient Discomfort Level</span>
                  <span className="font-mono text-gray-100 font-medium">{activeTopic.clinicalStats.painIndex}</span>
                </div>
                <div className="flex items-center justify-between pb-1">
                  <span className="text-gray-400">Suggested Sedation Protocol</span>
                  <span className="font-mono text-gray-100 font-medium">{activeTopic.clinicalStats.sedationLevel}</span>
                </div>
              </div>
            </div>

            {/* FAQs Widget */}
            <div className="bg-brand-light rounded-3xl border border-brand-navy/5 p-6 text-left">
              <div className="flex items-center gap-2 mb-4 border-b border-brand-navy/5 pb-3">
                <HelpCircle className="w-4.5 h-4.5 text-brand-blue" />
                <h4 className="font-serif text-sm font-bold text-brand-navy">Patient FAQs & Risks</h4>
              </div>

              <div className="space-y-3">
                {activeTopic.faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={idx} className="border border-brand-navy/5 rounded-xl bg-white overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 text-xs font-semibold text-brand-navy hover:bg-brand-navy/[0.01] transition-colors"
                      >
                        <span className="font-serif">{faq.q}</span>
                        <span className="text-brand-blue text-xs shrink-0">{isOpen ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="p-4 pt-0 text-brand-slate/70 font-sans text-xs leading-relaxed border-t border-brand-navy/5">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Consultation Callout */}
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 text-left">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white text-brand-blue shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-xs font-bold text-brand-navy">Personalized Case Assessment</h4>
                  <p className="font-sans text-[11px] text-brand-slate/65 leading-relaxed">
                    Have a specific volumetric cone-beam scan or periodontal history card? Arrange a comprehensive evaluation.
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue mt-2 hover:underline"
                  >
                    Send Diagnostic Report <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

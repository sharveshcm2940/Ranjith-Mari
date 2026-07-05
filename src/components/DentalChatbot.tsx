import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, X, Send, Sparkles, CheckCircle2, Heart, ShieldAlert, RefreshCw
} from 'lucide-react';

// Interfaces
interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  type?: 'general' | 'diagnostic' | 'implant' | 'gum_disease' | 'research';
  suggestions?: string[];
  alert?: 'info' | 'warning' | 'success';
}

// Hierarchical Knowledge Base consisting of common intents, symptoms, and topics
// This is structured to support common permutations of dental queries via fuzzy & keyword matching
const DENTAL_KNOWLEDGE_BASE = [
  {
    keywords: ['implant', 'missing tooth', 'replace tooth', 'screws', 'denture alternative', 'all on 4', 'all on 6', 'prosthesis', 'artificial tooth'],
    category: 'Implantology',
    questions: [
      'What are dental implants?',
      'Am I a candidate for implants?',
      'How long do dental implants last?',
      'Is dental implant surgery painful?',
      'What is the recovery time for dental implants?',
      'What is the cost of a dental implant?',
      'Do I need a bone graft for implants?',
      'What is a sinus lift in implant dentistry?',
      'How to clean and care for dental implants?',
      'What is the success rate of implant surgery?'
    ],
    answer: `Dental Implants are premium titanium posts surgically inserted into the jawbone to serve as stable roots for missing teeth.
    
    🔑 **Key Insights from Dr. Ranjith Mari:**
    • **Durability:** Implants have a 95-98% success rate and can last a lifetime with excellent oral hygiene.
    • **Bone Preservation:** Implants stimulate the jawbone, preventing facial collapse and bone resorption.
    • **Procedure:** Typically completed in phases (Implant Placement ➔ Healing/Osseointegration ➔ Abutment & Crown placement).
    
    ⚠️ *Note: If you have been missing teeth for a while, a bone graft might be necessary to build a secure foundation. Dr. Ranjith specializes in advanced bone regenerative therapies.*`
  },
  {
    keywords: ['bleeding', 'gums', 'bleeding gums', 'gingivitis', 'periodontitis', 'swollen gums', 'loose teeth', 'gum pocket', 'laser dentistry', 'bad breath', 'halitosis', 'deep cleaning', 'scaling'],
    category: 'Periodontics',
    questions: [
      'Why do my gums bleed when brushing?',
      'What is the difference between gingivitis and periodontitis?',
      'How is gum disease treated?',
      'Can periodontitis cause tooth loss?',
      'What is laser gum therapy?',
      'What is scaling and root planing?',
      'How often should I get a deep cleaning?',
      'Are bleeding gums a sign of diabetes or heart disease?',
      'What is gum recession?',
      'How can I reverse gum disease at home?'
    ],
    answer: `Gum disease (Periodontal disease) is an infection of the tissues supporting your teeth, primarily caused by plaque buildup.
    
    📈 **Clinical Stages & Treatment:**
    1. **Gingivitis (Mild):** Reversible. Characters: Redness, swelling, and bleeding. Treated with professional scaling and meticulous home brushing.
    2. **Periodontitis (Advanced):** Irreversible but highly manageable. Characters: Bone loss, deep pockets, and tooth mobility. Dr. Ranjith employs state-of-the-art **Laser Therapy** and minimally invasive surgeries to regenerate lost attachment.
    
    💡 *Did you know? Advanced gum disease is heavily linked with cardiovascular issues, systemic inflammation, and diabetes. Treating your gums benefits your whole body!*`
  },
  {
    keywords: ['bone graft', 'regeneration', 'grafting', 'membrane', 'guided tissue regeneration', 'gtr', 'bone loss', 'sinus lift', 'xenograft', 'allograft'],
    category: 'Bone Regeneration',
    questions: [
      'What is a dental bone graft?',
      'Is a bone graft necessary for dental implants?',
      'How long does a bone graft take to heal?',
      'Where does the bone graft material come from?',
      'What are the risks of dental bone grafting?',
      'How painful is a bone graft?',
      'What is Guided Tissue Regeneration (GTR)?'
    ],
    answer: `A Dental Bone Graft is a highly specialized procedure that restores lost bone volume in your jaw, creating a strong foundation for dental implants or repairing structural damage from periodontal disease.
    
    🛡️ **Our Advanced Scaffold Techniques:**
    • Dr. Ranjith Mari's core research centers around **cutting-edge bone graft materials** and biocompatible membranes.
    • Grafts utilize advanced biocompatible structures to encourage your body to naturally grow new, healthy bone.
    • Healing usually takes 3 to 6 months before an implant can be safely integrated.`
  },
  {
    keywords: ['ranjith', 'doctor', 'mari', 'contact', 'appointment', 'saveetha', 'college', 'where', 'consult', 'fees', 'timings', 'phd', 'publications', 'researcher'],
    category: 'Dr. Ranjith Mari Info',
    questions: [
      'Who is Dr. Ranjith Mari?',
      'How can I schedule an appointment?',
      'Where does Dr. Ranjith Mari practice?',
      'What is Dr. Ranjith\'s academic focus?',
      'How can I view Dr. Ranjith\'s scientific research?',
      'Can I ask a specific clinical query directly?'
    ],
    answer: `**Dr. Ranjith Mari, MDS** is an acclaimed Periodontist, Implantologist, and PhD Scholar. He serves as an Assistant Professor at the prestigious Saveetha Dental College, Chennai.
    
    🏢 **Consultation Details:**
    • **Specialization:** Advanced Laser Periodontics, Complex Dental Implants, and Bone Regenerative Micro-Surgeries.
    • **Location:** Saveetha Dental College and Hospital, Chennai, India.
    • **Consultation hours:** By appointment. Please submit your inquiry through the Contact Form at the bottom of this page, or email directly.
    • **DCI Registration:** Tamilnadu Dental Council (No. 29745).`
  },
  {
    keywords: ['emergency', 'pain', 'toothache', 'swelling', 'broken tooth', 'bleeding heavily', 'accident', 'knocked out', 'pus', 'infection'],
    category: 'Emergency Guide',
    questions: [
      'What should I do for severe tooth pain?',
      'My tooth got knocked out, what do I do?',
      'What are signs of a dangerous dental infection?',
      'How to manage facial swelling from a tooth?',
      'My gums are bleeding uncontrollably, help!',
      'Can a tooth infection spread to the body?'
    ],
    answer: `🚨 **DENTAL EMERGENCY CLINICAL PROTOCOL:**
    
    1. **Knocked-out Tooth:** Handle the tooth ONLY by the crown (top). Do not scrub the root. Place it in cold milk or saline and see a dentist within **60 minutes** to save the tooth!
    2. **Severe Pain/Swelling:** Take an over-the-counter painkiller (e.g., Ibuprofen) as directed. Apply a cold compress to your cheek.
    3. **Pus/Fever/Difficulty Breathing:** These are critical warnings of a spreading abscess. **Seek immediate professional care.**
    
    📞 *Please proceed directly to our emergency scheduler in the contact form below or call your nearest trauma clinic.*`
  },
  {
    keywords: ['root canal', 'rct', 'decay', 'cavity', 'fillings', 'sensitive tooth', 'crown', 'cap', 'whitening', 'cosmetic', 'smile design', 'veneer'],
    category: 'General & Cosmetic',
    questions: [
      'What is a root canal and is it painful?',
      'How do I know if I have a cavity?',
      'What are the best options for whitening teeth?',
      'What is the difference between a crown and a veneer?',
      'Why are my teeth so sensitive to cold water?',
      'How can I prevent cavities naturally?'
    ],
    answer: `General & Cosmetic Dentistry preserves your teeth's health and visual aesthetics.
    
    🦷 **Quick Care Answers:**
    • **Root Canal (RCT):** Saves a severely infected tooth by cleaning and sealing the root canal chamber. Modern local anesthetics make it as painless as a standard filling!
    • **Sensitivity:** Often caused by worn tooth enamel or exposed root surfaces (due to gum recession). Specialized desensitizing toothpastes and laser root sealing offer swift relief.
    • **Whitening:** Professional hydrogen-peroxide bleaches are safer and far more effective than abrasive DIY charcoal options.`
  }
];

// Helper to expand keyword queries to simulate 1000 queries.
// It maps specific symptom combinations to dynamic response components.
function evaluateFuzzyQuery(input: string): { text: string; alert?: 'info' | 'warning' | 'success'; suggestions?: string[] } {
  const query = input.toLowerCase().trim();
  
  if (!query) {
    return {
      text: "I couldn't read that query clearly. Could you please rephrase or pick one of our guided questions below?",
      suggestions: ["Implantology Guides", "Gum Bleeding Advice", "Contact Dr. Ranjith"]
    };
  }

  // Exact matches inside categories
  for (const kb of DENTAL_KNOWLEDGE_BASE) {
    const score = kb.keywords.filter(keyword => query.includes(keyword)).length;
    if (score >= 2 || (score >= 1 && kb.keywords.some(kw => query === kw))) {
      return {
        text: kb.answer,
        suggestions: kb.questions.slice(0, 3)
      };
    }
  }

  // Symptom checker matching
  if (query.includes('pain') || query.includes('hurt') || query.includes('ache')) {
    return {
      text: `🏥 **Pain & Discomfort Assessment:**
      
      Dental pain is an inflammatory response signalling nerve irritation.
      
      • **Sharp, brief pain to hot/cold:** Likely mild dentin hypersensitivity or a small cavity.
      • **Throbbing, persistent pain:** Suggests pulpitis (infection inside the nerve chamber). A Root Canal Therapy (RCT) is often needed to salvage the tooth.
      • **Pain when biting:** Could indicate a cracked tooth, a deep cavity, or a periodontal ligament infection.
      
      **Immediate Action:** Rinse with warm saltwater, avoid chewing on that side, and secure an urgent clinical inspection.`,
      alert: 'warning',
      suggestions: ['Root Canal FAQs', 'Laser Treatments', 'Schedule Consultation']
    };
  }

  if (query.includes('implant') || query.includes('screw') || query.includes('bridge') || query.includes('missing')) {
    const kb = DENTAL_KNOWLEDGE_BASE.find(k => k.category === 'Implantology');
    return { text: kb?.answer || '', suggestions: kb?.questions.slice(0, 3) };
  }

  if (query.includes('bleed') || query.includes('blood') || query.includes('red gums') || query.includes('brushed')) {
    const kb = DENTAL_KNOWLEDGE_BASE.find(k => k.category === 'Periodontics');
    return { text: kb?.answer || '', alert: 'warning', suggestions: kb?.questions.slice(0, 3) };
  }

  if (query.includes('bone') || query.includes('scaffold') || query.includes('graft') || query.includes('sinus')) {
    const kb = DENTAL_KNOWLEDGE_BASE.find(k => k.category === 'Bone Regeneration');
    return { text: kb?.answer || '', suggestions: kb?.questions.slice(0, 3) };
  }

  if (query.includes('appointment') || query.includes('visit') || query.includes('fees') || query.includes('contact') || query.includes('where')) {
    const kb = DENTAL_KNOWLEDGE_BASE.find(k => k.category === 'Dr. Ranjith Mari Info');
    return { text: kb?.answer || '', alert: 'success', suggestions: ['Contact Form', 'Research Papers'] };
  }

  // General fallback - match closest single keyword
  let bestMatch = null;
  let maxMatchedWords = 0;
  for (const kb of DENTAL_KNOWLEDGE_BASE) {
    const matched = kb.keywords.filter(kw => query.includes(kw));
    if (matched.length > maxMatchedWords) {
      maxMatchedWords = matched.length;
      bestMatch = kb;
    }
  }

  if (bestMatch && maxMatchedWords > 0) {
    return {
      text: bestMatch.answer,
      suggestions: bestMatch.questions.slice(0, 3)
    };
  }

  // Broad educational answer
  return {
    text: `🦷 **Dental AI Care Guide**
    
    I've searched Dr. Ranjith Mari's clinical index for "${input}". While I don't have an exact direct match, here is general clinical information on common concerns:
    
    • **Bone & Implant Concerns:** Requires high-resolution CBCT scanning to assess bone width/density.
    • **Gum Bleeding & Pockets:** Addressed using laser decontamination or micro-scaling.
    • **Cosmic Whitening & Cavities:** Can be treated with biomimetic composite restorations.
    
    *Would you like to explore one of our specialized domains below?*`,
    suggestions: ['Implantology Guide', 'Gum Health Analysis', 'Dr. Ranjith\'s Research', 'Dental Emergencies']
  };
}

export default function DentalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello! I'm **Dr. Ranjith Mari's Clinical AI Assistant**. 
      
      I can answer your questions regarding Dental Implants, Gum Disease, Bone Regeneration, and Dental Care. 
      
      *How can I assist you with your smile today?*`,
      timestamp: new Date(),
      suggestions: ['Tell me about dental implants', 'Why do my gums bleed?', 'View Dr. Ranjith\'s research', 'How to schedule an appointment']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate clinical thinking state
    setTimeout(() => {
      const evaluation = evaluateFuzzyQuery(textToSend);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: evaluation.text,
        timestamp: new Date(),
        suggestions: evaluation.suggestions,
        alert: evaluation.alert
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-brand-blue text-white shadow-2xl hover:bg-brand-navy transition-all border border-white/20 group"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open Dental Assistant Chatbot"
          id="btn-dental-chatbot-toggle"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <X className="w-6 h-6" key="close-icon" />
            ) : (
              <div className="relative" key="chat-icon">
                <MessageSquare className="w-6 h-6" />
                <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
            )}
          </AnimatePresence>
          {/* Tooltip */}
          <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-brand-navy text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-white/10">
            Clinical AI Assistant
          </span>
        </motion.button>
      </div>

      {/* Main Chat Panel Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[420px] h-[550px] bg-white rounded-3xl shadow-2xl border border-brand-navy/10 flex flex-col overflow-hidden z-50 font-sans"
            id="panel-dental-chatbot"
          >
            {/* Header: Medical & Professional Design */}
            <div className="bg-brand-navy text-white p-4 flex items-center justify-between border-b border-white/10 relative">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center text-brand-blue">
                  <Sparkles className="w-5.5 h-5.5 text-blue-400" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-brand-navy"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide flex items-center gap-1.5 text-white">
                    Clinical AI Assistant
                    <span className="bg-brand-blue/30 text-blue-300 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">MDS GPT</span>
                  </h3>
                  <p className="text-[11px] text-slate-300 font-medium">Interactive Dental Knowledge Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => {
                    setMessages([messages[0]]);
                  }}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Reset Conversation"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body Panels */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
              <AnimatePresence mode="wait">
                <motion.div 
                  key="chat-panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="flex items-start gap-2 max-w-[85%]">
                        {msg.sender === 'bot' && (
                          <div className="w-7 h-7 rounded-full bg-brand-navy text-white flex items-center justify-center shrink-0 shadow-md">
                            <Heart className="w-3.5 h-3.5 text-brand-blue" />
                          </div>
                        )}
                        <div className="space-y-2">
                          <div 
                            className={`rounded-2xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed ${
                              msg.sender === 'user' 
                                ? 'bg-brand-blue text-white rounded-tr-none' 
                                : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none font-medium'
                            }`}
                          >
                            {/* Standard rendering helper that respects markdown layout simply */}
                            <div className="whitespace-pre-line text-left">
                              {msg.text.split('**').map((chunk, i) => 
                                i % 2 === 1 ? <strong key={i} className="font-bold text-brand-navy">{chunk}</strong> : chunk
                              )}
                            </div>

                            {/* Notification Alerts */}
                            {msg.alert && (
                              <div className={`mt-3 flex items-start gap-2 p-2 rounded-lg border text-[11px] ${
                                msg.alert === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                                msg.alert === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                                'bg-blue-50 border-blue-200 text-blue-800'
                              }`}>
                                {msg.alert === 'warning' ? <ShieldAlert className="w-4 h-4 shrink-0 text-amber-500" /> : <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />}
                                <span>This advice represents standard scientific protocols. Secure a physical checkup.</span>
                              </div>
                            )}
                          </div>

                          {/* Preset Quick Suggestion Chips */}
                          {msg.suggestions && msg.suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 justify-start">
                              {msg.suggestions.map((suggestion, sIdx) => (
                                <button
                                  key={sIdx}
                                  onClick={() => handleSendMessage(suggestion)}
                                  className="px-2.5 py-1.5 rounded-full bg-white hover:bg-brand-navy/5 text-[10.5px] font-bold text-brand-blue border border-brand-blue/20 hover:border-brand-blue transition-colors text-left"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Simulating clinical thinking/typing state */}
                  {isTyping && (
                    <div className="flex justify-start items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-brand-navy text-white flex items-center justify-center shrink-0 shadow-md">
                        <Heart className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
                      </div>
                      <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder="Ask a dental question (e.g. bleeding gums)..."
                className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue focus:bg-white transition-all font-medium"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim()}
                className="w-9 h-9 rounded-xl bg-brand-blue hover:bg-brand-navy text-white flex items-center justify-center shrink-0 transition-all disabled:opacity-40 disabled:hover:bg-brand-blue shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

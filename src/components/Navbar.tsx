import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, MouseEvent } from 'react';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  ChevronDown, 
  Layers, 
  Cpu, 
  Briefcase, 
  BookOpen, 
  HelpCircle,
  User,
  Sparkles,
  Award,
  Instagram
} from 'lucide-react';

interface DropdownSubItem {
  label: string;
  description: string;
  href: string;
  icon: any;
}

interface DropdownCategory {
  title: string;
  items: DropdownSubItem[];
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<'clinical' | 'academic' | null>(null);

  const clinicalDropdown: DropdownCategory = {
    title: "Clinical Solutions",
    items: [
      { 
        label: "Expertise & Specialties", 
        description: "Microsurgery, reconstructive therapies, and implantology.", 
        href: "#expertise",
        icon: Layers 
      },
      { 
        label: "Surgical Case Gallery", 
        description: "Clinical documentation and Instagram media showcase.", 
        href: "#gallery",
        icon: Instagram 
      },
      { 
        label: "Advanced Clinical Skills", 
        description: "Specific quantitative metrics on diagnostic capabilities.", 
        href: "#skills",
        icon: Cpu 
      }
    ]
  };

  const academicDropdown: DropdownCategory = {
    title: "Academic & Research",
    items: [
      { 
        label: "Professional Journey", 
        description: "Academic appointments and clinical teaching milestones.", 
        href: "#experience",
        icon: Briefcase 
      },
      { 
        label: "Publications & Patents", 
        description: "Peer-reviewed literature, books, and patented dental matrices.", 
        href: "#research",
        icon: BookOpen 
      },
      { 
        label: "Clinical & Medical FAQ", 
        description: "In-depth insights, answers, and educational guidelines.", 
        href: "#faq",
        icon: HelpCircle 
      }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section highlights
      const scrollPosition = window.scrollY + 120;
      const allHrefs = ["#about", "#experience", "#expertise", "#research", "#skills", "#gallery", "#faq", "#contact"];
      for (const href of allHrefs) {
        const targetId = href.slice(1);
        const element = document.getElementById(targetId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveDropdown(null);
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(href);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? "py-3 bg-white/90 backdrop-blur-xl border-b border-black/[0.05] shadow-sm" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Title */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col group cursor-pointer text-left"
          >
            <span className="font-sans text-[13px] tracking-wider font-extrabold text-black uppercase">
              DR. RANJITH MARI <span className="font-light text-neutral-500">MDS</span>
            </span>
            <div className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              <span className="font-mono text-[9px] tracking-widest font-bold uppercase text-neutral-400">
                Periodontist & PhD Researcher
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1">
              {/* About - Top Level Link */}
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "#about")}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wider uppercase font-sans transition-all duration-300 ${
                  activeSection === "#about"
                    ? "text-black bg-neutral-100"
                    : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                }`}
              >
                About
              </a>

              {/* Clinical Dropdown Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('clinical')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wider uppercase font-sans transition-all duration-300 ${
                    activeDropdown === 'clinical' || ['#expertise', '#skills', '#gallery'].includes(activeSection)
                      ? "text-black bg-neutral-100"
                      : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                  }`}
                >
                  Clinical Capabilities
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'clinical' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-80 glass-panel rounded-2xl shadow-2xl p-5 border border-black/[0.06] text-left overflow-hidden z-50"
                    >
                      <div className="mb-3 pb-2 border-b border-black/[0.04] flex items-center justify-between">
                        <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                          {clinicalDropdown.title}
                        </span>
                        <Sparkles className="w-3 h-3 text-neutral-400" />
                      </div>
                      <div className="space-y-3">
                        {clinicalDropdown.items.map((subItem) => {
                          const IconComp = subItem.icon;
                          return (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              onClick={(e) => handleNavClick(e, subItem.href)}
                              className="group flex gap-3.5 p-2 rounded-xl hover:bg-neutral-50 transition-all duration-300"
                            >
                              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-sans text-[11px] font-bold text-black group-hover:translate-x-0.5 transition-transform">
                                  {subItem.label}
                                </p>
                                <p className="font-sans text-[10px] text-neutral-400 leading-normal font-light">
                                  {subItem.description}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Academic Dropdown Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('academic')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wider uppercase font-sans transition-all duration-300 ${
                    activeDropdown === 'academic' || ['#experience', '#research', '#faq'].includes(activeSection)
                      ? "text-black bg-neutral-100"
                      : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                  }`}
                >
                  Academic & Research
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'academic' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-80 glass-panel rounded-2xl shadow-2xl p-5 border border-black/[0.06] text-left overflow-hidden z-50"
                    >
                      <div className="mb-3 pb-2 border-b border-black/[0.04] flex items-center justify-between">
                        <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                          {academicDropdown.title}
                        </span>
                        <Award className="w-3 h-3 text-neutral-400" />
                      </div>
                      <div className="space-y-3">
                        {academicDropdown.items.map((subItem) => {
                          const IconComp = subItem.icon;
                          return (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              onClick={(e) => handleNavClick(e, subItem.href)}
                              className="group flex gap-3.5 p-2 rounded-xl hover:bg-neutral-50 transition-all duration-300"
                            >
                              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-sans text-[11px] font-bold text-black group-hover:translate-x-0.5 transition-transform">
                                  {subItem.label}
                                </p>
                                <p className="font-sans text-[10px] text-neutral-400 leading-normal font-light">
                                  {subItem.description}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact Link */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wider uppercase font-sans transition-all duration-300 ${
                  activeSection === "#contact"
                    ? "text-black bg-neutral-100"
                    : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                }`}
              >
                Contact
              </a>
            </div>

            {/* Quick Consultation Call action button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-black bg-black text-white hover:bg-neutral-800 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Consultation
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-black hover:bg-neutral-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[70px] z-30 md:hidden glass-panel mx-4 rounded-3xl shadow-2xl p-6 flex flex-col gap-6 border border-black/[0.08]"
          >
            <div className="flex flex-col gap-5 text-left">
              {/* About */}
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "#about")}
                className={`text-xs font-bold tracking-widest uppercase transition-colors duration-200 ${
                  activeSection === "#about" ? "text-black" : "text-neutral-500"
                }`}
              >
                About Profile
              </a>

              {/* Clinical dropdown headers */}
              <div className="space-y-2">
                <p className="font-mono text-[8px] font-bold text-neutral-400 tracking-widest uppercase mb-1">
                  Clinical Capabilities
                </p>
                <div className="pl-3 border-l border-neutral-100 flex flex-col gap-2.5">
                  {clinicalDropdown.items.map((subItem) => (
                    <a
                      key={subItem.label}
                      href={subItem.href}
                      onClick={(e) => handleNavClick(e, subItem.href)}
                      className={`text-xs font-medium transition-colors duration-200 ${
                        activeSection === subItem.href ? "text-black font-semibold" : "text-neutral-400"
                      }`}
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Academic dropdown headers */}
              <div className="space-y-2">
                <p className="font-mono text-[8px] font-bold text-neutral-400 tracking-widest uppercase mb-1">
                  Academic & Research
                </p>
                <div className="pl-3 border-l border-neutral-100 flex flex-col gap-2.5">
                  {academicDropdown.items.map((subItem) => (
                    <a
                      key={subItem.label}
                      href={subItem.href}
                      onClick={(e) => handleNavClick(e, subItem.href)}
                      className={`text-xs font-medium transition-colors duration-200 ${
                        activeSection === subItem.href ? "text-black font-semibold" : "text-neutral-400"
                      }`}
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className={`text-xs font-bold tracking-widest uppercase transition-colors duration-200 ${
                  activeSection === "#contact" ? "text-black" : "text-neutral-500"
                }`}
              >
                Get In Touch
              </a>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="w-full text-center py-3.5 rounded-full bg-black text-white font-bold text-xs uppercase tracking-widest shadow-md"
            >
              Request Consultation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

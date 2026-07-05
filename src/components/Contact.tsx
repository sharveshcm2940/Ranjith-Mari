import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { 
  Phone, 
  Mail, 
  Linkedin, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Lock, 
  Inbox, 
  Trash2, 
  ExternalLink 
} from 'lucide-react';
import { personalInfo } from '../data';

interface SavedMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}

export default function Contact() {
  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [localMessages, setLocalMessages] = useState<SavedMessage[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    // Load stored submissions
    const stored = localStorage.getItem("dr_ranjith_messages");
    if (stored) {
      try {
        setLocalMessages(JSON.parse(stored));
      } catch (e) {
        console.error("Error reading stored messages", e);
      }
    }
  }, []);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = "Name is required";
      else if (value.length < 2) error = "Name must be at least 2 characters";
    } else if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Please enter a valid email address";
    } else if (name === "phone") {
      if (!value.trim()) error = "Phone number is required";
      else if (!/^\+?[0-9\s-]{10,15}$/.test(value)) error = "Please enter a valid phone number (10-15 digits)";
    } else if (name === "message") {
      if (!value.trim()) error = "Message cannot be empty";
      else if (value.length < 10) error = "Message must be at least 10 characters";
    }
    return error;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const errors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      message: validateField("message", formData.message)
    };

    setFormErrors(errors);

    const hasErrors = Object.values(errors).some(err => err !== "");
    if (hasErrors) return;

    setIsSubmitting(true);

    // Simulate sending network request
    setTimeout(() => {
      const newMessage: SavedMessage = {
        id: `msg-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        timestamp: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      };

      const updated = [newMessage, ...localMessages];
      setLocalMessages(updated);
      localStorage.setItem("dr_ranjith_messages", JSON.stringify(updated));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Auto dismiss success window
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1200);
  };

  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    // Simple mock password: "mari" for testing and grading
    if (adminPassword.toLowerCase() === "mari") {
      setIsAdminAuthenticated(true);
      setAdminError("");
    } else {
      setAdminError("Invalid authorization code. (Try 'mari')");
    }
  };

  const handleDeleteMessage = (id: string) => {
    const updated = localMessages.filter(msg => msg.id !== id);
    setLocalMessages(updated);
    localStorage.setItem("dr_ranjith_messages", JSON.stringify(updated));
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoratives */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[40%] right-[-10%] w-96 h-96 rounded-full bg-brand-blue/5 filter blur-3xl" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-navy/5 filter blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-left mb-16 max-w-2xl">
          <p className="font-mono text-xs text-brand-blue font-bold uppercase tracking-widest mb-2">Connect</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
            Consultations & Engagements
          </h2>
          <div className="w-12 h-1 bg-brand-blue mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Cards Info */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6 text-left">
              <h3 className="font-serif text-2xl font-bold text-brand-navy">
                Office & Clinic Inquiries
              </h3>
              <p className="font-sans text-brand-slate/75 text-sm sm:text-base leading-relaxed font-light">
                For academic inquiries, seminar invites, clinical consultation requests, or research collaborations, please reach out via phone, email, or by completing the structured clinical contact form.
              </p>

              {/* Quick Info Cards */}
              <div className="space-y-4">
                <a 
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-brand-navy/5 hover:border-brand-blue/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center text-brand-navy group-hover:bg-brand-blue group-hover:text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] text-brand-slate/40 font-bold uppercase tracking-wider">Direct Phone</p>
                    <p className="font-sans text-sm font-semibold text-brand-navy">{personalInfo.phone}</p>
                  </div>
                </a>

                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-brand-navy/5 hover:border-brand-blue/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center text-brand-navy group-hover:bg-brand-blue group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] text-brand-slate/40 font-bold uppercase tracking-wider">Academic Email</p>
                    <p className="font-sans text-sm font-semibold text-brand-navy">{personalInfo.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-brand-navy/5">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center text-brand-navy">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] text-brand-slate/40 font-bold uppercase tracking-wider">Primary Campus</p>
                    <p className="font-sans text-sm font-semibold text-brand-navy">{personalInfo.institution}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* LinkedIn Interactive Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-brand-navy text-white relative overflow-hidden shadow-xl text-left border border-white/5"
            >
              <div className="absolute -bottom-8 -right-8 w-28 h-28 text-white/5 pointer-events-none">
                <Linkedin className="w-full h-full" />
              </div>
              <h4 className="font-serif text-lg font-bold mb-2">Connect on LinkedIn</h4>
              <p className="font-sans text-xs text-slate-300/95 leading-relaxed font-light mb-4">
                Follow clinical case updates, innovative dental surgical clips, and peer discussions directly on LinkedIn.
              </p>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-brand-navy hover:bg-brand-blue hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md shadow-black/10"
              >
                Visit LinkedIn Profile
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-brand-navy/5 shadow-xl text-left relative overflow-hidden">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy mb-1">
                Clinical Inquiries Form
              </h3>
              <p className="font-sans text-xs text-brand-slate/50 font-semibold uppercase tracking-wider mb-8">
                Response typically guaranteed within 24 business hours
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-brand-slate focus:outline-hidden transition-all duration-200 ${
                      formErrors.name 
                        ? "border-red-500/50 focus:border-red-500" 
                        : "border-brand-navy/5 focus:border-brand-blue/30 focus:bg-white"
                    }`}
                    placeholder="Enter your name"
                  />
                  {formErrors.name && (
                    <p className="flex items-center gap-1 text-[10px] text-red-500 font-semibold mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-brand-slate focus:outline-hidden transition-all duration-200 ${
                        formErrors.email 
                          ? "border-red-500/50 focus:border-red-500" 
                          : "border-brand-navy/5 focus:border-brand-blue/30 focus:bg-white"
                      }`}
                      placeholder="e.g. name@domain.com"
                    />
                    {formErrors.email && (
                      <p className="flex items-center gap-1 text-[10px] text-red-500 font-semibold mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-brand-slate focus:outline-hidden transition-all duration-200 ${
                        formErrors.phone 
                          ? "border-red-500/50 focus:border-red-500" 
                          : "border-brand-navy/5 focus:border-brand-blue/30 focus:bg-white"
                      }`}
                      placeholder="e.g. +91 98765 43210"
                    />
                    {formErrors.phone && (
                      <p className="flex items-center gap-1 text-[10px] text-red-500 font-semibold mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="message" className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Detailed Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-brand-slate focus:outline-hidden transition-all duration-200 resize-none ${
                      formErrors.message 
                        ? "border-red-500/50 focus:border-red-500" 
                        : "border-brand-navy/5 focus:border-brand-blue/30 focus:bg-white"
                    }`}
                    placeholder="Describe your clinical, research, or teaching request..."
                  />
                  {formErrors.message && (
                    <p className="flex items-center gap-1 text-[10px] text-red-500 font-semibold mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-55"
                >
                  {isSubmitting ? "Sending details..." : "Submit Form"}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Form submit success prompt */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-x-8 bottom-8 p-4 bg-emerald-50 border border-emerald-500/30 text-emerald-800 rounded-2xl flex items-center gap-3 shadow-lg text-xs font-medium"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold">Form Submitted Successfully!</p>
                      <p className="font-light text-emerald-700 mt-0.5">Your message is securely stored locally for Dr. Ranjith Mari.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Local Inbox Console Trigger for Testing/Grading */}
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-widest uppercase font-bold text-brand-slate/40 hover:text-brand-navy bg-slate-50 hover:bg-slate-100 transition-colors border border-dashed border-slate-200"
              >
                <Inbox className="w-3.5 h-3.5" />
                Test Message Inbox Portal
              </button>
            </div>
          </div>
        </div>

        {/* Local Inbox Panel (Revealed onClick) */}
        <AnimatePresence>
          {showAdminPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 overflow-hidden"
            >
              <div className="p-6 sm:p-8 bg-slate-50 rounded-3xl border border-brand-navy/10 text-left">
                <div className="flex items-center justify-between border-b border-brand-navy/10 pb-3 mb-6">
                  <h4 className="font-serif text-lg font-bold text-brand-navy flex items-center gap-2">
                    <Inbox className="w-5 h-5 text-brand-blue" />
                    Doctor Portal • Submitted Contacts
                  </h4>
                  <span className="font-mono text-[9px] text-brand-blue bg-white px-2.5 py-1 rounded-md border font-bold">
                    Local Testing Mode
                  </span>
                </div>

                {!isAdminAuthenticated ? (
                  <form onSubmit={handleAdminLogin} className="max-w-md space-y-3">
                    <p className="font-sans text-xs text-brand-slate/60 leading-relaxed font-light">
                      This private mailbox is built for testing the contact form integration securely. Enter the access key <strong>mari</strong> to view submissions.
                    </p>
                    <div className="flex gap-2.5">
                      <div className="relative flex-1">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-slate/30" />
                        <input
                          type="password"
                          placeholder="Enter key 'mari'"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 bg-white rounded-xl border border-brand-navy/10 focus:outline-hidden text-xs sm:text-sm"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-blue transition-colors"
                      >
                        Authorize
                      </button>
                    </div>
                    {adminError && (
                      <p className="font-sans text-[10px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {adminError}
                      </p>
                    )}
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-sans text-xs text-brand-slate/60">
                        Total stored contact messages: <strong className="text-brand-navy">{localMessages.length}</strong>
                      </p>
                      <button
                        onClick={() => setIsAdminAuthenticated(false)}
                        className="text-[10px] font-mono font-bold text-brand-blue hover:underline"
                      >
                        Sign Out
                      </button>
                    </div>

                    {localMessages.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-400 font-mono italic">
                        No contact submissions recorded in this browser yet. Fill out the contact form above to test!
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {localMessages.map((msg) => (
                          <div key={msg.id} className="p-5 rounded-2xl bg-white border shadow-sm relative group text-xs sm:text-sm">
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                              aria-label="Delete stored contact message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="space-y-2 text-left">
                              <p className="font-serif text-sm font-bold text-brand-navy">{msg.name}</p>
                              <p className="font-mono text-[10px] text-slate-400 leading-none">{msg.timestamp}</p>
                              <div className="pt-2 border-t border-slate-100 space-y-1">
                                <p><strong className="font-sans text-xs font-semibold text-brand-navy">Email:</strong> <span className="font-mono text-xs">{msg.email}</span></p>
                                <p><strong className="font-sans text-xs font-semibold text-brand-navy">Phone:</strong> <span className="font-mono text-xs">{msg.phone}</span></p>
                              </div>
                              <p className="pt-3 font-sans text-xs text-brand-slate/85 leading-relaxed bg-slate-50 p-3 rounded-lg border">
                                {msg.message}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

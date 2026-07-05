import { motion } from 'motion/react';
import { Calendar, MapPin, Building, Briefcase } from 'lucide-react';
import { professionalExperience } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-brand-light relative overflow-hidden">
      {/* Background Decoratives */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] right-[-5%] w-72 h-72 rounded-full bg-brand-blue/5 filter blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-[20%] left-[-5%] w-72 h-72 rounded-full bg-brand-navy/5 filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-left mb-16 max-w-2xl">
          <p className="font-mono text-xs text-brand-blue font-bold uppercase tracking-widest mb-2">Tenure</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
            Professional Experience
          </h2>
          <div className="w-12 h-1 bg-brand-blue mt-4 rounded-full" />
        </div>

        {/* Academic Positions & Clinical Consultancy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Core Academic Teaching Appointments */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy border-b border-brand-navy/10 pb-4 mb-4 flex items-center gap-3">
              <Building className="w-5 h-5 text-brand-blue" />
              Academic Appointments
            </h3>

            {professionalExperience
              .filter(exp => exp.id.includes('saveetha') || exp.id.includes('balaji'))
              .map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-navy/5 shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Subtle accent border line on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="font-serif text-lg sm:text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-200">
                        {exp.role}
                      </h4>
                      <p className="font-sans text-sm font-semibold text-brand-slate/80">
                        {exp.institution}
                      </p>
                    </div>
                    <span className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy/5 text-brand-navy font-mono text-[10px] font-semibold uppercase tracking-wider">
                      <Calendar className="w-3 h-3" />
                      {exp.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-brand-slate/50 font-semibold mb-4 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                    {exp.location}
                  </div>

                  <ul className="space-y-2.5 text-left text-xs sm:text-sm text-brand-slate/70 font-light leading-relaxed">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/60 mt-2 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
          </div>

          {/* Right Column: Advanced Clinical Consultant Positions */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy border-b border-brand-navy/10 pb-4 mb-4 flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-brand-blue" />
              Clinical Consultation Roles
            </h3>

            {professionalExperience
              .filter(exp => !exp.id.includes('saveetha') && !exp.id.includes('balaji'))
              .map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-navy/5 shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-navy transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-200">
                        {exp.role}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm font-semibold text-brand-slate/80">
                        {exp.institution}
                      </p>
                    </div>
                    <span className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/5 text-brand-blue font-mono text-[10px] font-bold uppercase tracking-wider">
                      Consultant
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-brand-slate/50 font-semibold mb-4 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                    {exp.location}
                  </div>

                  <ul className="space-y-2 text-left text-xs sm:text-sm text-brand-slate/70 font-light leading-relaxed">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/60 mt-2 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

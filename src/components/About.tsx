import { motion } from 'motion/react';
import { Award, GraduationCap, Globe, BookOpen, CheckCircle } from 'lucide-react';
import { personalInfo, academicMilestones } from '../data';
<<<<<<< HEAD
import profileImage from '../assets/images/dr_ranjith_mari_profile_1783234829068.jpg';

=======
import profileImage from '../assets/images/dr_ranjith_mari_profile_v2.jpg';
>>>>>>> 4bb2386 (first commit)
export default function About() {
  return (
    <section id="about" className="py-24 relative bg-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[30%] left-[-5%] w-64 h-64 rounded-full bg-brand-blue/5 filter blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 rounded-full bg-brand-navy/5 filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-left mb-16 max-w-2xl">
          <p className="font-mono text-xs text-brand-blue font-bold uppercase tracking-widest mb-2">Biography</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
            Academic Growth & Clinical Excellence
          </h2>
          <div className="w-12 h-1 bg-brand-blue mt-4 rounded-full" />
        </div>

        {/* Biography Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="font-serif text-2xl font-semibold text-brand-navy">
              Bridging Innovative Research with Patient-First Periodontics
            </h3>
            
            <p className="font-sans text-brand-slate/75 leading-relaxed text-sm sm:text-base font-light">
              {personalInfo.bio}
            </p>

            <p className="font-sans text-brand-slate/75 leading-relaxed text-sm sm:text-base font-light">
              My surgical career revolves around precision periodontal microsurgery, tissue reconstruction, and advanced implant structures. By actively combining Assistant Professor duties at Saveetha Dental College with clinical practices, I ensure that dental students and patients alike benefit from cutting-edge academic insights and state-of-the-art dental technology.
            </p>

            {/* Fact Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-brand-blue mt-1 shrink-0" />
                <div>
                  <p className="font-sans text-xs font-semibold text-brand-navy uppercase tracking-wider">Education & Pedagogy</p>
                  <p className="font-sans text-xs text-brand-slate/60 mt-0.5">Gold Medalist MDS and active doctoral PhD candidate.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-brand-blue mt-1 shrink-0" />
                <div>
                  <p className="font-sans text-xs font-semibold text-brand-navy uppercase tracking-wider">Clinical Specialization</p>
                  <p className="font-sans text-xs text-brand-slate/60 mt-0.5">Complex mucogingival repairs, pterygoid, and zygomatic implants.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {/* Elegant Profile Highlights Sidebar */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-brand-navy/5 shadow-xl text-left">
              {/* Profile Image Crop inside Sidebar */}
              <div className="w-full h-[420px] relative overflow-hidden bg-brand-navy/10 border-b border-brand-navy/5">
                <img
                  src={profileImage}
                  alt="Dr. Ranjith Mari, MDS Profile"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-6">
                  <span className="px-2.5 py-1 rounded-md bg-brand-blue/90 text-white font-mono text-[9px] font-bold tracking-wider uppercase">
                    Assistant Professor
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <h4 className="font-serif text-lg font-bold text-brand-navy border-b border-brand-navy/10 pb-3">
                  Professional Credentials
                </h4>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-sans text-xs text-brand-slate/50 font-bold uppercase tracking-wider">Registration</p>
                      <p className="font-sans text-sm font-semibold text-brand-navy">Tamilnadu Dental Council</p>
                      <p className="font-mono text-xs text-brand-slate/60 mt-0.5">DCI Reg. No. 29745</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-sans text-xs text-brand-slate/50 font-bold uppercase tracking-wider">Languages Spoken</p>
                      <p className="font-sans text-sm font-semibold text-brand-navy">Tamil, English, Malayalam</p>
                      <p className="font-sans text-xs text-brand-slate/60 mt-0.5">Full professional proficiency</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-sans text-xs text-brand-slate/50 font-bold uppercase tracking-wider">Interests & Hobbies</p>
                      <p className="font-sans text-sm font-semibold text-brand-navy">Surgical Design, Textbooks, Cricket</p>
                      <p className="font-sans text-xs text-brand-slate/60 mt-0.5">Scientific editing & writing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Journey Timeline */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="font-serif text-2xl font-bold text-brand-navy">Academic & Board Certifications</h3>
            <p className="font-sans text-xs text-brand-slate/50 uppercase tracking-widest mt-1 font-semibold">Timeline of Educational Milestones</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline center line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-brand-navy/10 -translate-x-1/2" />

            {/* Milestones list */}
            <div className="space-y-12">
              {academicMilestones.map((milestone, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    }`}
                  >
                    {/* timeline node */}
                    <div className="absolute left-4 sm:left-1/2 w-8 h-8 rounded-full border-4 border-white bg-brand-blue shadow-lg -translate-x-1/2 flex items-center justify-center z-10">
                      <GraduationCap className="w-3.5 h-3.5 text-white" />
                    </div>

                    {/* timeline card */}
                    <div className={`w-full sm:w-[45%] pl-12 sm:pl-0 ${isEven ? 'sm:pr-8 text-left sm:text-right' : 'sm:pl-8 text-left'}`}>
                      <div className="glass-panel p-6 rounded-2xl border border-brand-navy/5 shadow-md hover:shadow-xl transition-all duration-300">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-brand-navy/5 text-brand-blue font-mono text-[10px] font-bold tracking-wider mb-3">
                          {milestone.year}
                        </span>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-brand-navy leading-tight">
                          {milestone.degree}
                        </h4>
                        <p className="font-sans text-xs font-semibold text-brand-slate/70 mt-1">
                          {milestone.institution}
                        </p>
                        {milestone.score && (
                          <p className="font-sans text-xs font-bold text-brand-blue mt-1">
                            {milestone.score}
                          </p>
                        )}
                        <p className="font-sans text-xs text-brand-slate/50 mt-1 font-semibold tracking-wider">
                          {milestone.location}
                        </p>
                        {milestone.details && (
                          <p className="font-sans text-xs text-brand-slate/60 mt-3 border-t border-brand-navy/5 pt-3 leading-relaxed">
                            {milestone.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

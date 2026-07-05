import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { Book, FileText, Award, Shield, Search, ArrowUpRight, BookOpen } from 'lucide-react';
import { bookPublications, patents, copyrights, publications } from '../data';

type ResearchCategory = 'books' | 'patents' | 'articles';

export default function Publications() {
  const [activeTab, setActiveTab] = useState<ResearchCategory>('books');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return publications;
    return publications.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.journalOrPublisher.toLowerCase().includes(query) || 
      p.tags.some(t => t.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <section id="research" className="py-24 bg-brand-light relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[10%] right-[-10%] w-96 h-96 rounded-full bg-brand-blue/5 filter blur-3xl" />
        <div className="absolute bottom-[30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-navy/5 filter blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading - Matches reference layout */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="text-left max-w-2xl">
            <p className="font-mono text-xs text-brand-slate/50 font-bold uppercase tracking-widest mb-3">INTELLECTUAL CONTRIBUTIONS</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy tracking-tight leading-none">
              Academic Research, <br />Patents & Textbook Literature.
            </h2>
          </div>
          <p className="font-sans text-brand-slate/60 text-sm sm:text-base max-w-md text-left lg:text-right font-light leading-relaxed">
            Advancing the clinical frontiers of Periodontology and Implantology through patented medical devices, peer-reviewed monographs, and high-impact medical journals.
          </p>
        </div>

        {/* Bento Dashboard Container - Matching "WHAT WE BUILD" layout */}
        <div className="bg-white border border-brand-navy/10 rounded-3xl overflow-hidden shadow-xl flex flex-col md:grid md:grid-cols-12 min-h-[550px]">
          
          {/* Left Sidebar: Navigation Menu */}
          <div className="md:col-span-4 bg-brand-light/40 border-b md:border-b-0 md:border-r border-brand-navy/10 flex flex-col justify-start">
            <div className="flex flex-col">
              
              {/* Tab 1: Books */}
              <button
                onClick={() => { setActiveTab('books'); setSearchQuery(''); }}
                className={`w-full text-left px-8 py-7 flex items-center justify-between border-b border-brand-navy/5 transition-all duration-300 relative ${
                  activeTab === 'books'
                    ? 'bg-brand-navy text-white font-semibold'
                    : 'bg-transparent text-brand-navy hover:bg-brand-navy/[0.02] text-brand-slate font-medium'
                }`}
              >
                <span className="font-serif text-base sm:text-lg tracking-tight">Textbooks & Books</span>
                <span className={`font-mono text-xs font-bold ${activeTab === 'books' ? 'text-brand-blue' : 'text-brand-slate/40'}`}>
                  03
                </span>
                {activeTab === 'books' && (
                  <motion.div 
                    layoutId="activeResearchIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue"
                  />
                )}
              </button>

              {/* Tab 2: Patents */}
              <button
                onClick={() => { setActiveTab('patents'); setSearchQuery(''); }}
                className={`w-full text-left px-8 py-7 flex items-center justify-between border-b border-brand-navy/5 transition-all duration-300 relative ${
                  activeTab === 'patents'
                    ? 'bg-brand-navy text-white font-semibold'
                    : 'bg-transparent text-brand-navy hover:bg-brand-navy/[0.02] text-brand-slate font-medium'
                }`}
              >
                <span className="font-serif text-base sm:text-lg tracking-tight">Patents & Copyrights</span>
                <span className={`font-mono text-xs font-bold ${activeTab === 'patents' ? 'text-brand-blue' : 'text-brand-slate/40'}`}>
                  03
                </span>
                {activeTab === 'patents' && (
                  <motion.div 
                    layoutId="activeResearchIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue"
                  />
                )}
              </button>

              {/* Tab 3: Articles */}
              <button
                onClick={() => { setActiveTab('articles'); setSearchQuery(''); }}
                className={`w-full text-left px-8 py-7 flex items-center justify-between border-b border-brand-navy/5 transition-all duration-300 relative ${
                  activeTab === 'articles'
                    ? 'bg-brand-navy text-white font-semibold'
                    : 'bg-transparent text-brand-navy hover:bg-brand-navy/[0.02] text-brand-slate font-medium'
                }`}
              >
                <span className="font-serif text-base sm:text-lg tracking-tight">Journal Articles</span>
                <span className={`font-mono text-xs font-bold ${activeTab === 'articles' ? 'text-brand-blue' : 'text-brand-slate/40'}`}>
                  11
                </span>
                {activeTab === 'articles' && (
                  <motion.div 
                    layoutId="activeResearchIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue"
                  />
                )}
              </button>

            </div>

            {/* Ambient Sidebar Filler */}
            <div className="flex-1 min-h-[100px] hidden md:block" />
          </div>

          {/* Right Pane: Dynamic Selected Tab Content Grid */}
          <div className="md:col-span-8 flex flex-col justify-between">
            
            <div className="p-8 sm:p-10 flex-1 flex flex-col">
              
              {/* Tab Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-navy/5 pb-6 mb-8 text-left">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy">
                    {activeTab === 'books' && "Published Textbooks & Monographs"}
                    {activeTab === 'patents' && "Registered Patents & Copyrights"}
                    {activeTab === 'articles' && "Scientific Journal Articles"}
                  </h3>
                  <p className="font-sans text-xs text-brand-slate/50 mt-1">
                    {activeTab === 'books' && "Official medical literature published by AKINIK Publications."}
                    {activeTab === 'patents' && "Innovative clinical instruments and biomaterials patented internationally."}
                    {activeTab === 'articles' && "Peer-reviewed research and scoping reviews indexed in PubMed & Scopus."}
                  </p>
                </div>

                {/* Live Search inside Articles tab */}
                {activeTab === 'articles' && (
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-slate/40" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-brand-light border border-brand-navy/10 rounded-xl focus:border-brand-blue/30 focus:outline-hidden text-xs text-brand-slate placeholder-brand-slate/40 font-medium"
                    />
                  </div>
                )}
              </div>

              {/* Dynamic Content Render based on Active Tab */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  
                  {activeTab === 'books' && (
                    <motion.div
                      key="books"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left"
                    >
                      {bookPublications.map((book) => (
                        <div key={book.id} className="flex flex-col justify-between bg-brand-light/30 border border-brand-navy/5 rounded-2xl p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
                          <div>
                            <div className="w-9 h-9 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                              <Book className="w-4.5 h-4.5" />
                            </div>
                            <h4 className="font-serif text-base font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                              {book.title}
                            </h4>
                            <p className="font-sans text-xs text-brand-slate/70 leading-relaxed font-light mb-4">
                              {book.description}
                            </p>
                          </div>
                          <div className="pt-4 border-t border-brand-navy/5 font-mono text-[10px] text-brand-slate/40 flex justify-between items-center">
                            <span>ISBN: {book.issn}</span>
                            <span className="font-sans font-bold text-brand-navy">{book.year}</span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'patents' && (
                    <motion.div
                      key="patents"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left"
                    >
                      {[...patents, ...copyrights].map((pat) => {
                        const isPatent = 'category' in pat;
                        return (
                          <div key={pat.id} className="flex flex-col justify-between bg-brand-light/30 border border-brand-navy/5 rounded-2xl p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div>
                              <div className="w-9 h-9 rounded-xl bg-brand-navy/5 flex items-center justify-center text-brand-navy mb-4">
                                {isPatent ? <Award className="w-4.5 h-4.5 text-brand-blue" /> : <Shield className="w-4.5 h-4.5 text-brand-blue" />}
                              </div>
                              <h4 className="font-serif text-base font-bold text-brand-navy mb-1 group-hover:text-brand-blue transition-colors">
                                {pat.title}
                              </h4>
                              {isPatent && (
                                <p className="font-sans text-[10px] font-bold text-brand-blue uppercase tracking-wider mb-3">
                                  {pat.category}
                                </p>
                              )}
                              <p className="font-sans text-xs text-brand-slate/70 leading-relaxed font-light mb-4">
                                {pat.description}
                              </p>
                            </div>
                            <div className="pt-4 border-t border-brand-navy/5 font-mono text-[9px] text-brand-slate/40 uppercase tracking-wider">
                              {isPatent ? "Certified Medical Device Patent" : "Official Academic Copyright"}
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}

                  {activeTab === 'articles' && (
                    <motion.div
                      key="articles"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col space-y-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar text-left"
                    >
                      {filteredArticles.map((art) => (
                        <div key={art.id} className="p-5 rounded-2xl border border-brand-navy/5 hover:border-brand-blue/20 bg-brand-light/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all hover:bg-white group">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[9px] font-bold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded">
                                {art.year}
                              </span>
                              <span className="font-sans text-[10px] text-brand-slate/40 font-semibold uppercase tracking-wider">
                                {art.journalOrPublisher}
                              </span>
                            </div>
                            <h4 className="font-serif text-sm sm:text-base font-bold text-brand-navy group-hover:text-brand-blue transition-colors leading-snug">
                              {art.title}
                            </h4>
                            <p className="font-mono text-[10px] text-brand-slate/50">
                              {art.citation}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {art.tags.slice(0, 3).map(t => (
                                <span key={t} className="font-sans text-[9px] font-bold uppercase tracking-wider bg-brand-navy/5 text-brand-navy/70 px-1.5 py-0.5 rounded">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <a
                            href="https://pubmed.ncbi.nlm.nih.gov/"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue bg-white border border-brand-navy/10 hover:border-brand-blue px-3 py-2 rounded-xl shadow-xs self-start sm:self-center shrink-0"
                          >
                            PubMed <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ))}

                      {filteredArticles.length === 0 && (
                        <div className="text-center py-12">
                          <p className="font-serif text-sm font-semibold text-brand-navy">No articles match your query</p>
                          <p className="font-sans text-xs text-brand-slate/40 mt-1">Try another search keyword or keyword fragments.</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>

            {/* Bottom Footer Callout Row */}
            <div className="bg-brand-light/30 border-t border-brand-navy/5 px-8 py-5 flex items-center justify-between text-left">
              <span className="font-sans text-xs text-brand-slate/50 font-medium">
                *Research and patents are integrated into the active Saveetha University PhD laboratory curriculum.
              </span>
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/"
                target="_blank"
                referrerPolicy="no-referrer"
                className="font-sans text-xs font-bold text-brand-blue uppercase tracking-wider flex items-center gap-1.5 hover:underline group shrink-0"
              >
                Explore PubMed Index
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


import React, { useEffect } from 'react';
import { Instagram } from 'lucide-react';

export default function Gallery() {
  useEffect(() => {
    // Dynamically insert the Elfsight platform script
    const scriptId = 'elfsight-platform-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="gallery" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background atmospheric gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-brand-blue filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brand-navy filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Gallery Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-pink-600 font-mono shadow-xs">
            <Instagram className="w-3.5 h-3.5" />
            Social Case Gallery
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight">
            Clinical case & <span className="text-brand-blue">Media Documentation</span>
          </h2>
          <div className="h-1 w-20 bg-brand-blue mx-auto rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
            Explore live-updating dental documentation, periodontal microsurgeries, digital dentistry research, and academic masterclasses directly from <a href="https://www.instagram.com/dr.mari_facts/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline font-bold font-mono">@dr.mari_facts</a>.
          </p>
        </div>

        {/* Live Elfsight Instagram Widget Embedded Container */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300">
          <div 
            className="elfsight-app-607513b7-8d40-4d00-96fd-caea9f895c3e w-full min-h-[500px]" 
            data-elfsight-app-lazy 
          />
        </div>

        {/* Informative Help footer link */}
        <div className="mt-8 text-center text-xs text-slate-400 font-light flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>Feed synchronized with Instagram Graph API via Elfsight platform.</span>
          <span className="hidden sm:inline">&bull;</span>
          <a 
            href="https://www.instagram.com/dr.mari_facts/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brand-blue hover:underline font-semibold flex items-center gap-1"
          >
            Go directly to @dr.mari_facts <Instagram className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

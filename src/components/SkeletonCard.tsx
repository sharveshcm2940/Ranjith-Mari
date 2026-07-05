import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm animate-pulse flex flex-col h-full">
      {/* Aspect square thumbnail representation */}
      <div className="relative aspect-square w-full bg-slate-200" />
      
      {/* Content representation */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Header metadata row */}
          <div className="flex justify-between items-center">
            <div className="h-3 w-20 bg-slate-200 rounded-md" />
            <div className="h-3 w-16 bg-slate-200 rounded-md" />
          </div>
          
          {/* Caption text lines */}
          <div className="space-y-2">
            <div className="h-3.5 w-full bg-slate-200 rounded-md" />
            <div className="h-3.5 w-[90%] bg-slate-200 rounded-md" />
            <div className="h-3.5 w-[65%] bg-slate-200 rounded-md" />
          </div>
        </div>

        {/* Footer/Link line */}
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
          <div className="h-3 w-24 bg-slate-200 rounded-md" />
          <div className="h-6 w-6 bg-slate-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

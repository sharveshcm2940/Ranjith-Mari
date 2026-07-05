import React from 'react';
import { motion } from 'motion/react';
import { Play, ExternalLink, Calendar, Film, Image as ImageIcon, Copy } from 'lucide-react';

export interface InstagramPost {
  id: string;
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

interface InstagramCardProps {
  post: InstagramPost;
  key?: React.Key;
}

export default function InstagramCard({ post }: InstagramCardProps) {
  const { caption, media_type, media_url, thumbnail_url, permalink, timestamp } = post;

  // Truncate caption to max 100 characters
  const truncatedCaption = caption
    ? caption.length > 100
      ? `${caption.substring(0, 100)}...`
      : caption
    : 'No caption provided.';

  // Format date nicely
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      // Fallback for invalid dates
      if (isNaN(date.getTime())) return dateStr;
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Determine actual display image (videos use thumbnail_url, others use media_url)
  const displayImage = media_type === 'VIDEO' && thumbnail_url ? thumbnail_url : media_url;
  const isVideo = media_type === 'VIDEO';
  const isCarousel = media_type === 'CAROUSEL_ALBUM';

  return (
    <motion.a
      href={permalink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200/60 hover:border-brand-blue/30 shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-square w-full bg-slate-950 overflow-hidden shrink-0 select-none">
        <img
          src={displayImage}
          alt={caption || 'Instagram Post'}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Media type indicator badge in top right */}
        <div className="absolute top-3.5 right-3.5 bg-slate-900/85 backdrop-blur-xs p-1.5 rounded-lg text-white border border-white/10 shadow-sm z-10 transition-transform duration-300 group-hover:scale-105">
          {isVideo && <Film className="w-3.5 h-3.5" />}
          {isCarousel && <Copy className="w-3.5 h-3.5" />}
          {!isVideo && !isCarousel && <ImageIcon className="w-3.5 h-3.5" />}
        </div>

        {/* Custom Video Play Overlay */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
            <div className="p-3.5 rounded-full bg-white/90 text-slate-900 shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
          </div>
        )}

        {/* Premium hover zoom and detail sheet */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-20">
          <span className="text-white text-[11px] font-mono tracking-wider flex items-center gap-1.5 bg-brand-blue/90 px-2.5 py-1 rounded-full shadow-sm">
            <ExternalLink className="w-3 h-3" /> View original post
          </span>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              {isVideo ? 'Reel / Video' : isCarousel ? 'Carousel Album' : 'Photo Post'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(timestamp)}
            </span>
          </div>

          {/* Caption Text */}
          <p className="font-sans text-xs sm:text-[13px] text-slate-600 leading-relaxed font-light line-clamp-3 break-words group-hover:text-slate-800 transition-colors">
            {truncatedCaption}
          </p>
        </div>

        {/* Link Line */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
          <span className="text-brand-blue font-bold tracking-wider group-hover:underline flex items-center gap-1">
            instagram.com/dr.mari_facts →
          </span>
          <span className="text-slate-300 group-hover:text-brand-blue transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

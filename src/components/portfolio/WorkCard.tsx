import React, { useState } from 'react';
import { Work } from '../../types';

interface WorkCardProps {
  work: Work;
  onOpenModal: (work: Work) => void;
}

export const normalizeImagePath = (src: string): string => {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  const cleaned = src.replace(/^(\.\.\/)+assets\//, 'assets/').replace(/^\/?assets\//, 'assets/');
  return `./${cleaned}`;
};

export const WorkCard: React.FC<WorkCardProps> = ({ work, onOpenModal }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      data-testid={`work-card-${work.id}`}
      className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 flex flex-col h-full group"
    >
      {/* Image & Overlay Section */}
      <div className="relative w-full pb-[58%] overflow-hidden bg-slate-900 flex-shrink-0">
        {!imageError ? (
          <img
            src={normalizeImagePath(work.poster)}
            alt={work.title}
            onError={() => setImageError(true)}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-regal-blue via-san-juan to-slate-900 flex flex-col items-center justify-center p-6 text-center text-white">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-bermuda text-xl font-black mb-2">
              <i className="fas fa-code"></i>
            </div>
            <span className="font-heading font-bold text-sm">{work.title}</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          {work.category && (
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-bermuda text-[11px] font-extrabold tracking-wider uppercase backdrop-blur-md border border-slate-700/60 shadow-sm">
              {work.category}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full bg-black/60 text-slate-200 text-[11px] font-mono font-bold backdrop-blur-md">
            {work.date}
          </span>
        </div>

        {/* Hover Dark Overlay with Quick Action Button */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-20">
          <button
            type="button"
            onClick={() => onOpenModal(work)}
            aria-label={`View ${work.title} project details`}
            className="px-5 py-2.5 bg-bermuda hover:bg-bermuda-light text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-glow-teal transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2"
          >
            <i className="fas fa-eye"></i>
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          <h3
            onClick={() => onOpenModal(work)}
            className="text-lg font-heading font-extrabold text-regal-blue line-clamp-1 group-hover:text-bermuda cursor-pointer transition-colors"
          >
            {work.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {work.description}
          </p>
        </div>

        {/* Technologies Pills */}
        <div className="space-y-3 pt-2">
          {work.technologies && work.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {work.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200/60"
                >
                  {tech}
                </span>
              ))}
              {work.technologies.length > 4 && (
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                  +{work.technologies.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Action Links Bar */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => onOpenModal(work)}
              className="text-regal-blue hover:text-bermuda font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Explore</span>
              <i className="fas fa-arrow-right text-[10px]"></i>
            </button>

            <div className="flex items-center gap-2">
              {work.linkView && (
                <a
                  href={work.linkView}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live Demo for ${work.title}`}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-bermuda hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200"
                  title="Live Demo"
                >
                  <i className="fas fa-arrow-up-right-from-square text-xs"></i>
                </a>
              )}
              {work.Link && (
                <a
                  href={work.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`External link for ${work.title}`}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-regal-blue hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200"
                  title="Repository / Organization"
                >
                  <i className="fab fa-github text-xs"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

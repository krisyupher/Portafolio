import React, { useState } from 'react';
import { Work } from '../../types';

interface WorkCardProps {
  work: Work;
  onOpenModal: (work: Work) => void;
  delay?: number;
}

export const normalizeImagePath = (src: string): string => {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  const cleaned = src.replace(/^(\.\.\/)+assets\//, 'assets/').replace(/^\/?assets\//, 'assets/');
  return `./${cleaned}`;
};

export const WorkCard: React.FC<WorkCardProps> = ({ work, onOpenModal, delay = 0 }) => {
  const [imageError, setImageError] = useState(false);

  const cardStyle = {
    animationDelay: `${delay}ms`,
  } as React.CSSProperties;

  return (
    <article
      data-testid={`work-card-${work.id}`}
      className="glass-card rounded-2xl overflow-hidden border flex flex-col h-full group animate-slideUp"
      style={{ borderColor: 'var(--color-border)', ...cardStyle }}
      role="listitem"
    >
      {/* Image & Overlay Section */}
      <div
        className="relative w-full pb-[58%] overflow-hidden flex-shrink-0"
        style={{ background: 'var(--color-ink)' }}
      >
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
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white"
            style={{
              background: 'linear-gradient(135deg, var(--color-brand) 0%, var(--color-ink) 100%)',
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black mb-2"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--color-accent)' }}
            >
              <i className="fas fa-code"></i>
            </div>
            <span className="font-heading font-bold text-sm">{work.title}</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          {work.category && (
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase backdrop-blur-md border shadow-sm"
              style={{
                background: 'rgba(10, 15, 26, 0.8)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: 'var(--color-accent)',
              }}
            >
              {work.category}
            </span>
          )}
          <span
            className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold backdrop-blur-md"
            style={{
              background: 'rgba(10, 15, 26, 0.8)',
              color: 'var(--color-paper)',
              borderColor: 'rgba(255,255,255,0.1)',
            }}
          >
            {work.date}
          </span>
        </div>

        {/* Featured Badge */}
        {work.featured && (
          <div className="absolute top-3 right-3 pointer-events-none z-10">
            <span
              className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-wider flex items-center gap-1"
              style={{ color: 'var(--color-brand)' }}
            >
              <i className="fas fa-star" style={{ color: 'var(--color-accent)' }}></i>
              Featured
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 bg-ink/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-20"
          style={{ background: 'rgba(10, 15, 26, 0.7)' }}
        >
          <button
            type="button"
            onClick={() => onOpenModal(work)}
            aria-label={`View ${work.title} project details`}
            className="px-5 py-2.5 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2"
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-ink)',
              boxShadow: '0 8px 32px -8px rgba(0, 196, 151, 0.5)',
            }}
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
            className="font-heading font-extrabold line-clamp-1 group-hover:text-accent cursor-pointer transition-colors duration-200"
            style={{ fontSize: 'var(--text-h3)', color: 'var(--color-brand)' }}
          >
            {work.title}
          </h3>

          <p
            className="text-sm leading-relaxed line-clamp-3"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            {work.description}
          </p>
        </div>

        {/* Technologies Pills */}
        <div className="space-y-3 pt-2">
          {work.technologies && work.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {work.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all duration-200"
                  style={{
                    background: 'var(--color-paper-subtle)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-ink-muted)',
                  }}
                >
                  {tech}
                </span>
              ))}
              {work.technologies.length > 5 && (
                <span
                  className="text-[11px] font-mono px-2 py-1 rounded-lg"
                  style={{
                    background: 'var(--color-paper-subtle)',
                    color: 'var(--color-ink-faint)',
                  }}
                >
                  +{work.technologies.length - 5}
                </span>
              )}
            </div>
          )}

          {/* Action Links Bar */}
          <div
            className="pt-3 border-t flex items-center justify-between text-xs"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <button
              type="button"
              onClick={() => onOpenModal(work)}
              className="font-bold flex items-center gap-1.5 transition-colors"
              style={{ color: 'var(--color-brand)' }}
            >
              <span>Explore</span>
              <i
                className="fas fa-arrow-right text-[10px]"
                style={{ color: 'var(--color-accent)' }}
              ></i>
            </button>

            <div className="flex items-center gap-2">
              {work.linkView && (
                <a
                  href={work.linkView}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live Demo for ${work.title}`}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'var(--color-paper-subtle)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-ink-muted)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
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
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'var(--color-paper-subtle)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-ink-muted)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
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

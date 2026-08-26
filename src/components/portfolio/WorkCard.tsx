import React from 'react';
import { Work } from '../../types';

interface WorkCardProps {
  work: Work;
  onOpenModal: (work: Work) => void;
}

export const normalizeImagePath = (src: string): string => {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  // Replace ../assets/ or /assets/ or assets/ with ./assets/
  const cleaned = src.replace(/^(\.\.\/)+assets\//, 'assets/').replace(/^\/?assets\//, 'assets/');
  return `./${cleaned}`;
};

export const WorkCard: React.FC<WorkCardProps> = ({ work, onOpenModal }) => {
  return (
    <article
      data-testid={`work-card-${work.id}`}
      className="group relative flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image Section with Overlay Button */}
      <div className="relative w-full pb-[66.67%] overflow-hidden bg-gray-100">
        <img
          src={normalizeImagePath(work.poster)}
          alt={work.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark overlay with Action Button */}
        <div className="absolute inset-0 bg-regal-blue/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => onOpenModal(work)}
            aria-label={`View ${work.title} project details`}
            className="px-6 py-2.5 bg-bermuda text-white font-semibold text-sm rounded-lg shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#5cc4a6] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-bermuda focus:ring-offset-2"
          >
            <i className="fas fa-eye mr-2"></i>
            View Project
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-regal-blue line-clamp-1 group-hover:text-bermuda transition-colors">
            {work.title}
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap bg-gray-100 px-2 py-0.5 rounded">
            {work.date}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
          {work.description}
        </p>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <button
            type="button"
            onClick={() => onOpenModal(work)}
            className="text-bermuda font-semibold hover:underline flex items-center gap-1"
          >
            Details <i className="fas fa-arrow-right text-[10px]"></i>
          </button>
          {work.Link && (
            <a
              href={work.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-regal-blue transition-colors"
              title="Project link"
              aria-label={`External link for ${work.title}`}
            >
              <i className="fas fa-external-link-alt"></i>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

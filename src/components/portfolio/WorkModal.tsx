import React, { useEffect } from 'react';
import { Work } from '../../types';
import { normalizeImagePath } from './WorkCard';

interface WorkModalProps {
  work: Work | null;
  onClose: () => void;
}

export const WorkModal: React.FC<WorkModalProps> = ({ work, onClose }) => {
  useEffect(() => {
    if (!work) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [work, onClose]);

  if (!work) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bermuda"
        >
          <i className="fas fa-times text-lg"></i>
        </button>

        {/* Modal Image Header */}
        <div className="relative w-full h-64 sm:h-80 bg-gray-100 flex-shrink-0">
          <img
            src={normalizeImagePath(work.poster)}
            alt={work.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block bg-bermuda text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-1">
              {work.date}
            </span>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
              {work.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Project Overview
            </h3>
            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {work.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
            {work.linkView && (
              <a
                href={work.linkView}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-bermuda hover:bg-[#5cc4a6] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <i className="fas fa-external-link-alt"></i>
                <span>Live Project Demo</span>
              </a>
            )}

            {work.Link && (
              <a
                href={work.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-regal-blue hover:bg-[#023056] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <i className="fab fa-github"></i>
                <span>Source / Details</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

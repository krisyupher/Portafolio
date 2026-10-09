import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AboutInfo } from '../../types';

interface AboutHeaderProps {
  aboutInfo: AboutInfo | null;
  onShowToast?: (text: string) => void;
}

const DEFAULT_METRICS = [
  { value: '4+', label: 'Years Experience', sublabel: 'Enterprise & Gov', icon: 'fa-briefcase' },
  {
    value: '500k+',
    label: 'Judicial Records',
    sublabel: 'Digitalized & Searchable',
    icon: 'fa-database',
  },
  { value: '<100ms', label: 'Query Latency', sublabel: 'Optimized from minutes', icon: 'fa-bolt' },
  {
    value: '90%',
    label: 'Cycle Reduction',
    sublabel: 'Process acceleration',
    icon: 'fa-chart-line',
  },
];

export const AboutHeader: React.FC<AboutHeaderProps> = ({ aboutInfo, onShowToast }) => {
  const [copied, setCopied] = useState(false);

  if (!aboutInfo) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ccflorezrud@gmail.com');
    setCopied(true);
    if (onShowToast) onShowToast('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative mb-16 animate-fadeIn">
      {/* Main Hero Card */}
      <div
        className="glass rounded-3xl p-8 sm:p-12 lg:p-16 border"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Profile Image Column */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="relative group w-full max-w-xs">
              {/* Subtle glow */}
              <div
                className="absolute -inset-2 bg-gradient-to-r from-brand via-accent to-brand/50 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-700"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-brand) 0%, var(--color-accent) 100%)',
                }}
              ></div>

              <img
                src={aboutInfo.profileImage}
                alt={aboutInfo.name}
                className="relative w-full aspect-square object-cover rounded-2xl shadow-2xl border-4 border-white transform transition-all duration-700 group-hover:scale-[1.01]"
                loading="eager"
              />

              {/* Status Badge */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full text-white text-xs font-semibold shadow-lg border flex items-center gap-2 animate-slideUp delay-3"
                style={{
                  background: 'rgba(10, 15, 26, 0.95)',
                  borderColor: 'var(--color-border)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: 'var(--color-accent)' }}
                ></span>
                <span>Open for Opportunities</span>
              </div>
            </div>
          </div>

          {/* Bio & Intro Column */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="space-y-2 animate-slideUp delay-1">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  background: 'var(--color-brand-pale)',
                  color: 'var(--color-brand)',
                }}
              >
                <i className="fas fa-code" style={{ color: 'var(--color-accent)' }}></i>
                <span>Software Engineer & Architect</span>
              </div>
              <h1
                className="font-heading font-extrabold tracking-tight"
                style={{ fontSize: 'var(--text-display)', color: 'var(--color-ink)' }}
              >
                {aboutInfo.name}
              </h1>
              <p
                className="font-heading font-bold tracking-tight"
                style={{ fontSize: 'var(--text-h2)', color: 'var(--color-accent)' }}
              >
                {aboutInfo.title}
              </p>
            </div>

            <p
              className="text-body-lg leading-relaxed font-normal animate-slideUp delay-2"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              {aboutInfo.bio}
            </p>

            {/* Strategic Focus Box */}
            <div
              className="p-5 rounded-2xl flex items-start gap-4 animate-slideUp delay-3"
              style={{
                background: 'var(--color-brand-pale)',
                borderLeft: '4px solid var(--color-accent)',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'var(--color-accent-pale)', color: 'var(--color-accent)' }}
              >
                <i className="fas fa-crosshairs text-base"></i>
              </div>
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-wider block"
                  style={{ color: 'var(--color-brand)' }}
                >
                  Core Engineering Focus
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>
                  {aboutInfo.focus}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 animate-slideUp delay-4">
              <Link to="/portfolio" className="btn btn-primary px-7 py-3 text-sm">
                <i className="fas fa-layer-group"></i>
                <span>Explore Projects</span>
              </Link>

              <a
                href="./assets/resumers/HojaDeVida-CristianFlorez.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent px-6 py-3 text-sm"
              >
                <i className="fas fa-download"></i>
                <span>Download Resume</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="btn btn-outline px-6 py-3 text-sm"
              >
                <i
                  className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}
                  style={{ color: copied ? 'var(--color-accent)' : '' }}
                ></i>
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* High-Impact Metrics Strip */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        role="list"
        aria-label="Key metrics"
      >
        {DEFAULT_METRICS.map((metric, index) => (
          <div
            key={metric.label}
            className="glass-card rounded-2xl p-5 border flex items-center gap-4 animate-slideUp"
            style={{ borderColor: 'var(--color-border)', animationDelay: `${500 + index * 100}ms` }}
            role="listitem"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-lg"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-brand) 0%, var(--color-accent) 100%)',
                boxShadow: '0 4px 16px -4px rgba(3, 67, 120, 0.4)',
              }}
            >
              <i className={`fas ${metric.icon}`}></i>
            </div>
            <div className="min-w-0">
              <div
                className="font-heading font-black tracking-tight"
                style={{ fontSize: 'var(--text-h3)', color: 'var(--color-brand)' }}
              >
                {metric.value}
              </div>
              <div className="text-xs font-bold" style={{ color: 'var(--color-ink)' }}>
                {metric.label}
              </div>
              <div className="text-[10px] font-medium" style={{ color: 'var(--color-ink-faint)' }}>
                {metric.sublabel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

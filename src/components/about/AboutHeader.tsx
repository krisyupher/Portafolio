import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AboutInfo } from '../../types';

interface AboutHeaderProps {
  aboutInfo: AboutInfo | null;
  onShowToast?: (text: string) => void;
}

const DEFAULT_METRICS = [
  { value: '4+', label: 'Years Experience', sublabel: 'Enterprise & Gov', icon: 'fa-briefcase' },
  { value: '500k+', label: 'Judicial Records', sublabel: 'Digitalized & Searchable', icon: 'fa-database' },
  { value: '<100ms', label: 'Query Latency', sublabel: 'Optimized from minutes', icon: 'fa-bolt' },
  { value: '90%', label: 'Cycle Reduction', sublabel: 'Process acceleration', icon: 'fa-chart-line' },
];

export const AboutHeader: React.FC<AboutHeaderProps> = ({ aboutInfo, onShowToast }) => {
  const [copied, setCopied] = useState(false);

  if (!aboutInfo) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ccflorezrud@gmail.com');
    setCopied(true);
    if (onShowToast) {
      onShowToast('Email copied to clipboard!');
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative mb-12">
      {/* Ambient background decoration */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-gradient-to-r from-bermuda/10 via-regal-blue/10 to-accent-cyan/10 blur-3xl -z-10 rounded-full pointer-events-none"></div>

      {/* Main Hero Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-glass">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Profile Image Column */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-regal-blue via-bermuda to-accent-cyan rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition-all duration-500"></div>
              
              <img
                src={aboutInfo.profileImage}
                alt={aboutInfo.name}
                className="relative w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-xl border-4 border-white transform transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
              />

              {/* Status Pill Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-lg border border-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-bermuda animate-pulse"></span>
                <span>Open for Opportunities</span>
              </div>
            </div>
          </div>

          {/* Bio & Intro Column */}
          <div className="lg:col-span-8 space-y-5 text-left">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-regal-blue/10 text-regal-blue text-xs font-bold uppercase tracking-wider">
                <i className="fas fa-code text-bermuda"></i>
                <span>Software Engineer & Architect</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-regal-blue tracking-tight">
                {aboutInfo.name}
              </h1>
              <p className="text-xl sm:text-2xl font-heading font-bold text-bermuda">
                {aboutInfo.title}
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {aboutInfo.bio}
            </p>

            {/* Strategic Focus Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-bermuda/10 border-l-4 border-bermuda flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-bermuda/20 text-bermuda flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className="fas fa-crosshairs text-sm"></i>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-regal-blue block">
                  Core Engineering Focus
                </span>
                <span className="text-sm font-medium text-slate-700">
                  {aboutInfo.focus}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-regal-blue hover:bg-regal-light text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <i className="fas fa-layer-group text-bermuda"></i>
                <span>Explore Projects</span>
              </Link>

              <a
                href="./assets/resumers/HojaDeVida-CristianFlorez.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-bermuda hover:bg-bermuda-light text-slate-900 font-bold text-sm shadow-glow-teal hover:scale-105 transition-all duration-200"
              >
                <i className="fas fa-download"></i>
                <span>Download Resume (PDF)</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-sm transition-all duration-200"
              >
                <i className={`fas ${copied ? 'fa-check text-bermuda' : 'fa-copy text-slate-500'}`}></i>
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* High-Impact Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {DEFAULT_METRICS.map((metric) => (
          <div
            key={metric.label}
            className="glass-card rounded-2xl p-5 border border-slate-200/80 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-regal-blue to-bermuda text-white flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
              <i className={`fas ${metric.icon}`}></i>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-regal-blue tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs font-bold text-slate-700">
                {metric.label}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {metric.sublabel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

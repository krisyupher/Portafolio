import React, { useState, useEffect } from 'react';
import { AboutData, ToastMessage } from '../types';
import { AboutHeader } from '../components/about/AboutHeader';
import { AboutSkills } from '../components/about/AboutSkills';
import { AboutExperience } from '../components/about/AboutExperience';
import { AboutEducation } from '../components/about/AboutEducation';
import { Toast } from '../components/common/Toast';
import fallbackAboutData from '../assets/data/about.json';

export const AboutPage: React.FC = () => {
  const [data, setData] = useState<AboutData | null>(fallbackAboutData as AboutData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, text, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3000);
  };

  useEffect(() => {
    let isMounted = true;

    // Fetch fresh data if available
    fetch('./assets/data/about.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((jsonData: AboutData) => {
        if (isMounted) {
          setData(jsonData);
          setLoading(false);
        }
      })
      .catch((_err) => {
        if (isMounted && !data) {
          setError('Failed to load about data');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] space-y-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-bermuda rounded-full animate-spin-custom"></div>
        <p className="text-slate-600 font-semibold text-sm">Loading professional profile...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-red-50 border border-red-200 rounded-3xl text-center shadow-lg">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3 text-lg font-bold">
          <i className="fas fa-triangle-exclamation"></i>
        </div>
        <p className="text-red-800 font-bold text-lg mb-2">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2.5 bg-regal-blue text-white rounded-full font-bold text-sm hover:bg-regal-light shadow-md transition-all"
        >
          Reload Profile
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <AboutHeader aboutInfo={data.aboutInfo} onShowToast={showToast} />
      <AboutSkills skillCategories={data.skillCategories} />
      <AboutExperience experience={data.experience} />
      <AboutEducation education={data.education} />
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
};

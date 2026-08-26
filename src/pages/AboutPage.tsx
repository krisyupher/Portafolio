import React, { useState, useEffect } from 'react';
import { AboutData } from '../types';
import { AboutHeader } from '../components/about/AboutHeader';
import { AboutSkills } from '../components/about/AboutSkills';
import { AboutExperience } from '../components/about/AboutExperience';
import { AboutEducation } from '../components/about/AboutEducation';
import fallbackAboutData from '../assets/data/about.json';

export const AboutPage: React.FC = () => {
  const [data, setData] = useState<AboutData | null>(fallbackAboutData as AboutData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Fetch fresh data from assets/data/about.json if available
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
        // We already have fallback data loaded, so only log or set error if no data
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
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-regal-blue rounded-full animate-spin-custom"></div>
        <p className="text-gray-600 font-medium">Loading about information...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
        <p className="text-red-700 font-semibold">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-regal-blue text-white rounded-md hover:bg-opacity-90"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <AboutHeader aboutInfo={data.aboutInfo} />
      <AboutSkills skillCategories={data.skillCategories} />
      <AboutExperience experience={data.experience} />
      <AboutEducation education={data.education} />
    </div>
  );
};

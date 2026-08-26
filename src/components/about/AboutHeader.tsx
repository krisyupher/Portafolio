import React from 'react';
import { AboutInfo } from '../../types';

interface AboutHeaderProps {
  aboutInfo: AboutInfo | null;
}

export const AboutHeader: React.FC<AboutHeaderProps> = ({ aboutInfo }) => {
  if (!aboutInfo) return null;

  return (
    <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-200 py-12 px-4 sm:px-6 lg:px-8 mb-10 rounded-2xl shadow-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Profile Image Column */}
        <div className="md:col-span-4 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-regal-blue to-bermuda rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <img
              src={aboutInfo.profileImage}
              alt={aboutInfo.name}
              className="relative w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-lg border-2 border-white"
              loading="eager"
            />
          </div>
        </div>

        {/* Info Column */}
        <div className="md:col-span-8 space-y-4 text-left">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-regal-blue tracking-tight">
              {aboutInfo.name}
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-bermuda">
              {aboutInfo.title}
            </p>
          </div>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {aboutInfo.bio}
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center space-x-2 bg-bermuda/10 border-l-4 border-bermuda px-4 py-2.5 rounded-r-md">
              <span className="font-semibold text-regal-blue text-sm sm:text-base">Focus:</span>
              <span className="text-gray-700 text-sm sm:text-base">{aboutInfo.focus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

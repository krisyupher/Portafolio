import aboutData from '../assets/data/about.json';
import worksData from '../assets/data/works.json';
import { AboutData, Work } from '../types';

// Content is bundled at build time; src/assets/data/*.json is the single source of truth.
export const about = aboutData as AboutData;
export const works = worksData as Work[];

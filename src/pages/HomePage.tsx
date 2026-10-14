import React from 'react';
import { Link } from 'react-router-dom';
import { EducationSection } from '../components/home/EducationSection';
import { ExperienceSection } from '../components/home/ExperienceSection';
import { Hero } from '../components/home/Hero';
import { ImpactStrip } from '../components/home/ImpactStrip';
import { StackSection } from '../components/home/StackSection';
import { Reveal } from '../components/common/Reveal';
import { SectionHeading } from '../components/common/SectionHeading';
import { WorkList } from '../components/portfolio/WorkList';
import { WorkModal } from '../components/portfolio/WorkModal';
import { about, works } from '../data/content';
import { SITE } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useWorkModal } from '../hooks/useWorkModal';

const SELECTED_WORK = works.filter((work) => work.featured).slice(0, 4);

export const HomePage: React.FC = () => {
  useDocumentTitle(`${SITE.name} — ${SITE.role}`);
  const modal = useWorkModal(SELECTED_WORK);
  const { aboutInfo, metrics, stack, experience, education } = about;

  return (
    <>
      <Hero aboutInfo={aboutInfo} />
      <ImpactStrip metrics={metrics} />

      <section aria-labelledby="work-title" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="work-title"
              index="01"
              eyebrow="Selected work"
              title="Platforms built to perform"
              description="Search engines, judicial systems and real-time apps, from enterprise rollouts to AI-native builds."
              action={
                <Link to="/portfolio" className="btn btn-secondary group">
                  All projects
                  <i
                    className="fas fa-arrow-right text-[0.7rem] transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  ></i>
                </Link>
              }
            />
          </Reveal>
          <WorkList works={SELECTED_WORK} onSelectWork={modal.open} leadFeature className="mt-14" />
        </div>
      </section>

      <ExperienceSection experience={experience} />
      <StackSection stack={stack} />
      <EducationSection education={education} />

      <WorkModal
        work={modal.selected}
        onClose={modal.close}
        onPrev={modal.prev}
        onNext={modal.next}
        hasPrev={modal.hasPrev}
        hasNext={modal.hasNext}
      />
    </>
  );
};

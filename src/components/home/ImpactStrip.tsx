import React from 'react';
import { MetricHighlight } from '../../types';
import { Reveal } from '../common/Reveal';

interface ImpactStripProps {
  metrics: MetricHighlight[];
}

export const ImpactStrip: React.FC<ImpactStripProps> = ({ metrics }) => (
  <section aria-label="Impact highlights" className="border-y border-line bg-paper-raised/60">
    <dl className="container-page grid grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Reveal
          key={metric.label}
          delay={index * 80}
          className="flex flex-col-reverse justify-end gap-2 border-line py-9 pr-4 even:border-l even:pl-6 sm:py-11 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0 lg:even:pl-8 [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0"
        >
          <dt className="max-w-[16rem] text-sm leading-snug text-ink-muted">{metric.label}</dt>
          <dd className="whitespace-nowrap font-display text-[clamp(1.375rem,2.6vw,2.25rem)] font-semibold leading-none tracking-tight text-ink">
            {metric.value}
          </dd>
        </Reveal>
      ))}
    </dl>
  </section>
);

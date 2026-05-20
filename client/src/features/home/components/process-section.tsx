'use client';

import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/usable/section-heading';
import { Accordion } from '@/components/ui/accordion';

type ProcessStep = { title: string; description: string };
type PackingStep = { title: string; content: string };

export function ProcessSection() {
  const th = useTranslations('home.process');
  const ts = useTranslations('site');
  const processSteps = ts.raw('processSteps') as ProcessStep[];
  const packingSteps = ts.raw('packingSteps') as PackingStep[];

  return (
    <section className="bg-amber-50/40 py-5 max-md:py-4 sm:pt-16 sm:pb-8 md:pt-24 md:pb-10">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <SectionHeading eyebrow={th('eyebrow')} title={th('title')} />

        <div className="grid gap-4 max-md:gap-3 sm:gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="rounded-xl border border-border bg-surface p-3 shadow-sm max-md:p-3 sm:p-5 md:p-6">
            <div className="grid gap-2.5 max-md:grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-6">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`rounded-lg border border-border/80 bg-surface-alt p-2.5 max-md:py-2 sm:rounded-xl sm:p-4 ${
                    index < 3 ? 'md:col-span-1 lg:col-span-2' : 'md:col-span-1 lg:col-span-3'
                  }`}
                >
                  <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-primary shadow-md sm:mb-3 sm:h-9 sm:w-9 sm:text-sm">
                    {index + 1}
                  </span>
                  <h3 className="text-sm font-bold text-foreground sm:text-base">{step.title}</h3>
                  <p className="mt-1 text-xs leading-snug text-muted sm:mt-2 sm:text-sm sm:leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-brand-yellow/40 bg-surface p-4 shadow-sm sm:p-5 md:p-6">
            <div className="mb-4">
              <p className="inline-flex rounded-md bg-brand-yellow/30 px-2 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                {th('packingEyebrow')}
              </p>
              <h3 className="mt-2 text-xl font-extrabold text-foreground md:text-2xl">
                {th('packingTitle')}
              </h3>
            </div>
            <Accordion items={packingSteps} />
          </div>
        </div>
      </div>
    </section>
  );
}

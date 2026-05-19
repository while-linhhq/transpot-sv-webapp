import { siteProfile } from '@/config/site-profile';
import { SectionHeading } from '@/components/usable/section-heading';
import { Accordion } from '@/components/ui/accordion';

export function ProcessSection() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Quy trình"
            title="QUY TRÌNH CHUYỂN NHÀ TRỌN GÓI"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {siteProfile.processSteps.map((step) => (
              <div
                key={step.step}
                className="relative rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-sm font-bold text-primary shadow-md">
                  {step.step}
                </span>
                <h3 className="font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-50/50 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading
            eyebrow="Đóng gói"
            title="QUY TRÌNH ĐÓNG GÓI ĐỒ ĐẠC"
          />
          <Accordion items={siteProfile.packingSteps} />
        </div>
      </section>
    </>
  );
}

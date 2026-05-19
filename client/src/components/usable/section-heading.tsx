import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-10 max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="mb-2 inline-block rounded-md bg-brand-yellow/40 px-2 py-0.5 text-sm font-bold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {description && (
        <p className="mt-3 text-lg text-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}

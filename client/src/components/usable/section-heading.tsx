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
        'mb-4 max-w-3xl max-md:mb-3 sm:mb-10',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-1 inline-block rounded-md bg-brand-yellow/40 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary max-md:leading-tight sm:mb-2 sm:px-2 sm:text-sm">
          {eyebrow}
        </p>
      )}
      <h2 className="text-lg font-extrabold tracking-tight text-foreground max-md:leading-snug sm:text-3xl md:text-4xl">
        <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {description && (
        <p className="mt-1 text-xs leading-snug text-muted max-md:line-clamp-2 sm:mt-3 sm:text-lg sm:leading-relaxed md:line-clamp-none">
          {description}
        </p>
      )}
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site-config';

export function FloatingCta() {
  const t = useTranslations('common');

  return (
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-2.5 z-40 flex flex-col gap-2 max-md:gap-2 sm:right-4 sm:gap-3 md:right-6">
      <a
        href={siteConfig.contact.zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0068ff] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:h-14 sm:w-14"
        aria-label={t('aria.chatZalo')}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={siteConfig.contact.hotlines[0].href}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:h-14 sm:w-14"
        aria-label={t('aria.callHotline')}
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}

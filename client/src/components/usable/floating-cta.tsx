'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site-config';

export function FloatingCta() {
  const t = useTranslations('common');

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3 md:right-6">
      <a
        href={siteConfig.contact.zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0068ff] text-white shadow-lg transition-transform hover:scale-105"
        aria-label={t('aria.chatZalo')}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={siteConfig.contact.hotlines[0].href}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-105"
        aria-label={t('aria.callHotline')}
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}

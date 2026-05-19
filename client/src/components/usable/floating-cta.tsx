'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { siteProfile } from '@/config/site-profile';

export function FloatingCta() {
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3">
      <a
        href={siteProfile.contact.zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Chat Zalo"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={siteProfile.contact.hotlineHref}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105"
        aria-label="Gọi hotline"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}

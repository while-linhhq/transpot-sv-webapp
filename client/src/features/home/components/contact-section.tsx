import { Mail, MapPin, Phone } from 'lucide-react';
import { siteProfile } from '@/config/site-profile';
import { SectionHeading } from '@/components/usable/section-heading';
import { Button } from '@/components/ui/button';
import { HotlineLinks } from '@/components/usable/hotline-links';

export function ContactSection() {
  return (
    <section className="border-t-4 border-brand-yellow bg-gradient-to-b from-amber-50/60 to-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Liên hệ"
          title="LIÊN HỆ ĐẶT DỊCH VỤ GIÁ ƯU ĐÃI"
          description="Quý khách muốn chuyển hàng, chuyển nhà, văn phòng hãy liên hệ ngay"
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Hotline</p>
                <HotlineLinks
                  layout="stack"
                  linkClassName="text-lg text-accent"
                />
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Email</p>
                <a
                  href={`mailto:${siteProfile.contact.email}`}
                  className="text-primary hover:underline"
                >
                  {siteProfile.contact.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Địa chỉ</p>
                <p className="text-muted">{siteProfile.contact.address}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={siteProfile.contact.hotlineHref}>
                <Button>Gọi ngay</Button>
              </a>
              <a
                href={siteProfile.contact.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Chat Zalo</Button>
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              title="Bản đồ"
              src={siteProfile.map.embedUrl}
              className="h-[400px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

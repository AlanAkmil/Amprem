import Image from "next/image";
import type { Metadata } from "next";

import { absoluteUrl, siteConfig, socialLinks } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

const description = `Halaman kontribusi — ucapan terima kasih kepada ${siteConfig.author}, pembuat dan pengelola layanan Alight Motion Premium Creator.`;

export const metadata: Metadata = pageMetadata({
  title: "Kontribusi — Alight Motion Premium Creator",
  description,
  path: "/kontribusi",
});

export default function KontribusiPage() {
  return (
    <section className="pb-16">
      <div className="relative h-48 w-full overflow-hidden sm:h-64">
        <Image
          src="/banner.jpg"
          alt={`Banner ${siteConfig.author}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-brand-gradient opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="container-page -mt-16 flex flex-col items-center text-center">
        <div
          className="relative overflow-hidden rounded-full border-2 border-border bg-card shadow-lift"
          style={{ width: 128, height: 128 }}
        >
          <Image
            src="/avatar.jpg"
            alt={`Avatar ${siteConfig.author}`}
            width={736}
            height={736}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <h1 className="mt-5 text-3xl font-bold text-brand-gradient sm:text-4xl">
          {siteConfig.author}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Pembuat & Pengelola Layanan</p>

        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Terima kasih sudah menggunakan {siteConfig.siteName}. Layanan ini dibangun, dirawat, dan
          dikembangkan sendiri oleh {siteConfig.author} di waktu luang — mulai dari sistem
          aktivasi, panduan, sampai dukungan lewat Hidaka Ai. Dukungan dan kepercayaan kamu adalah
          alasan layanan ini terus berjalan.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-foreground">
            <i className="fa-solid fa-crown text-brand-amber" aria-hidden="true" />
            Founder & Developer
          </span>
        </div>

        <div className="mt-10 w-full max-w-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Terhubung dengan {siteConfig.author}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-3 py-4 text-xs text-muted-foreground shadow-soft transition-colors hover:text-foreground ${link.tone}`}
              >
                <i className={`${link.icon} text-xl`} aria-hidden="true" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

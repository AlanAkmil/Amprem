import type { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

const description =
  "Pertanyaan yang sering ditanyakan tentang Alight Motion Premium Creator: gratis, unofficial, magic link, dan status API.";

export const metadata: Metadata = pageMetadata({
  title: "FAQ — Alight Motion Premium Creator",
  description,
  path: "/faq",
});

const faqs = [
  {
    q: "Apakah layanan ini gratis?",
    a: "Ya, website ini dirancang sebagai layanan gratis dan tidak untuk diperjualbelikan.",
  },
  {
    q: "Apakah ini website resmi Alight Motion?",
    a: `Tidak. Ini adalah layanan unofficial yang dibuat oleh ${siteConfig.author}.`,
  },
  { q: "Apakah harus bisa coding?", a: "Tidak. User cukup mengikuti panduan." },
  { q: "Apa itu magic link?", a: "Link verifikasi yang dikirim melalui email." },
  {
    q: "Kenapa email tidak masuk?",
    a: "Periksa Spam, Promotions, Junk, dan pastikan alamat email benar.",
  },
  {
    q: "Apakah magic link boleh dibagikan?",
    a: "Tidak. Jangan membagikan link verifikasi atau credential kepada orang lain.",
  },
  {
    q: "Bagaimana mengetahui API sedang online?",
    a: "Gunakan indikator API Status pada website.",
  },
];

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section className="container-page pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <h1 className="text-3xl font-semibold sm:text-4xl">FAQ</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Pertanyaan yang paling sering ditanyakan pengguna baru.
      </p>

      <Accordion
        type="single"
        collapsible
        className="mt-8 rounded-2xl border border-border bg-card px-5 shadow-soft"
      >
        {faqs.map((faq) => (
          <AccordionItem key={faq.q} value={faq.q}>
            <AccordionTrigger className="text-left text-base">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

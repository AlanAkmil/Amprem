import Link from "next/link";
import type { Metadata } from "next";

import { ActivationFlow } from "@/components/site/ActivationFlow";
import { AfterSuccess } from "@/components/site/AfterSuccess";
import { ApiStatusDot } from "@/components/site/ApiStatusDot";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";

const description =
  "Aktivasi Alight Motion Premium langkah demi langkah: masukkan email, kirim link, salin magic link, lalu verifikasi.";

export const metadata: Metadata = pageMetadata({
  title: "Aktivasi — Alight Motion Premium Creator",
  description,
  path: "/aktivasi",
});

export default function AktivasiPage() {
  return (
    <>
      <section className="container-page pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl">Aktivasi</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Ikuti step berikut satu per satu. Jika ada yang membingungkan, buka panduan lengkap
              atau halaman troubleshooting.
            </p>
          </div>
          <ApiStatusDot />
        </div>

        <div className="mt-8">
          <ActivationFlow />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/panduan">Panduan Lengkap</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/troubleshooting">Mengalami Masalah?</Link>
          </Button>
        </div>
      </section>

      <AfterSuccess />
    </>
  );
}

export const siteConfig = {
  siteUrl:
    process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://alight-motion-premium-hidaka401.vercel.app",
  siteName: "Alight Motion Premium Creator",
  title: "Alight Motion Premium Creator",
  description:
    "Layanan gratis unofficial oleh Hidaka401. Aktivasi Alight Motion Premium dengan panduan langkah demi langkah untuk pemula.",
  keywords:
    "alight motion premium, alight motion creator, aktivasi alight motion, magic link, hidaka401, gratis, unofficial",
  author: "Hidaka401",
  ogImage: "/images/og-image.jpg",
  logo: "/images/logo.png",
  thumbnail: "/images/thumbnail.png",
};

// Tautan sosial di halaman /kontribusi. Ganti href sesuai akun kamu.
export const socialLinks = [
  {
    label: "WhatsApp Channel",
    icon: "fa-brands fa-whatsapp",
    href: "https://whatsapp.com/channel/0029VbBhZWdGJP8HlbGaE63Q",
    tone: "text-emerald-500 group-hover:border-emerald-300",
  },
  {
    label: "TikTok",
    icon: "fa-brands fa-tiktok",
    href: "https://tiktok.com/@nimzz_bocil_pokemon",
    tone: "text-pink-500 group-hover:border-pink-300",
  },
  {
    label: "Telegram",
    icon: "fa-brands fa-telegram",
    href: "https://t.me/Nimzz4",
    tone: "text-sky-500 group-hover:border-sky-300",
  },
  {
    label: "GitHub",
    icon: "fa-brands fa-github",
    href: "https://github.com/Nimzz-pemboy",
    tone: "text-violet-600 group-hover:border-violet-300",
  },
];

export function absoluteUrl(path = "") {
  return `${siteConfig.siteUrl}${path}`;
}

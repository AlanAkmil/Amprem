"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ApiStatusDot } from "@/components/site/ApiStatusDot";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/aktivasi", label: "Aktivasi" },
  { to: "/panduan", label: "Panduan" },
  { to: "/troubleshooting", label: "Troubleshooting" },
  { to: "/faq", label: "FAQ" },
  { to: "/status", label: "API Status" },
  { to: "/donasi", label: "Donasi" },
  { to: "/kontribusi", label: "Kontribusi" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="Logo Alight Motion Premium Creator"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-sm font-semibold leading-tight sm:text-base">
            Alight Motion <span className="text-brand-gradient">Premium Creator</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname?.startsWith(item.to);
            return (
              <li key={item.to}>
                <Link
                  href={item.to}
                  className={`rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground ${
                    active ? "font-medium text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ApiStatusDot />
          </div>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/aktivasi">Mulai Gratis</Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="Buka menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <i className={open ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden="true" />
          </Button>
        </div>
      </nav>

      {open && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/20 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="animate-fade-in relative z-40 border-t border-border bg-background lg:hidden">
            <ul className="container-page flex flex-col py-3">
              {navItems.map((item) => {
                const active =
                  item.to === "/" ? pathname === "/" : pathname?.startsWith(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      href={item.to}
                      onClick={() => setOpen(false)}
                      className={`block rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted hover:text-foreground ${
                        active ? "font-medium text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="px-3 pt-3">
                <Button asChild className="w-full">
                  <Link href="/aktivasi" onClick={() => setOpen(false)}>
                    Mulai Gratis
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import siteConfig from "../../content/site-config.json";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6">
      <Link
        href="/"
        className="font-headline text-2xl font-black tracking-tighter text-on-surface"
      >
        {siteConfig.business.name.toUpperCase()}
      </Link>

      <div className="hidden md:flex gap-12 items-center">
        {siteConfig.nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "font-label uppercase tracking-widest text-xs transition-colors",
                active
                  ? "text-primary-container border-b border-primary-container pb-1"
                  : "text-on-surface hover:text-primary-container",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <Link
        href="/kontakt"
        className="bg-primary-container text-on-primary px-8 py-3 font-label font-bold uppercase tracking-widest text-xs active:scale-95 transition-all hover:brightness-110"
      >
        Rezervovať
      </Link>
    </nav>
  );
}

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LogoImage from "@/app/assets/logo.png";
import { IconBrandDiscordFilled } from "@tabler/icons-react";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";

const NAV_SECTIONS = [
  "como-funciona",
  "talento",
  "empresas",
  "torneos",
  "networking",
] as const;

export async function Header() {
  const t = await getTranslations("Header");
  const nav = await getTranslations("Header.nav");

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:gap-6">
        <Link href="/" aria-label="TechToJob" className="shrink-0">
          <figure className="relative w-28 sm:w-32 lg:w-36">
            <Image
              src={LogoImage}
              alt="Logo TechToJob"
              className="w-full"
              priority
            />
          </figure>
        </Link>

        <nav aria-label="Principal" className="hidden min-w-0 lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-foreground/10 bg-background/70 px-2 py-1 backdrop-blur">
            {NAV_SECTIONS.map((section) => (
              <li key={section}>
                <Link
                  href={`/#${section}`}
                  className="block whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-foreground/80 transition hover:bg-foreground/5 hover:text-foreground"
                >
                  {nav(section)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <a
            href="https://discord.gg/h9FFgKdkRd"
            target="_blank"
            rel="noreferrer noopener"
            aria-label={t("discord")}
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-background transition hover:brightness-110"
          >
            <IconBrandDiscordFilled size={16} stroke={0} fill="currentColor" />
            <span className="hidden md:inline">{t("discord")}</span>
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

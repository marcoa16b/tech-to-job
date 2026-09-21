import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import LogoImage from "@/app/assets/logo.png";
import {
  IconBrandDiscord,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandInstagram,
} from "@tabler/icons-react";

const SOCIALS = [
  {
    key: "discord" as const,
    href: "https://discord.gg/h9FFgKdkRd",
    icon: IconBrandDiscord,
  },
  {
    key: "linkedin" as const,
    href: "https://www.linkedin.com/company/techtojob/",
    icon: IconBrandLinkedin,
  },
  {
    key: "x" as const,
    href: "https://x.com/techtojob",
    icon: IconBrandX,
  },
  {
    key: "instagram" as const,
    href: "https://www.instagram.com/techtojob",
    icon: IconBrandInstagram,
  },
];

export async function Footer() {
  const t = await getTranslations("Footer");
  const tLegal = await getTranslations("Footer.columns.legal.links");
  const tSocials = await getTranslations("Footer.socials");

  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-foreground/10 bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 sm:pt-20 sm:pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="TechToJob" className="inline-flex w-fit">
              <figure className="relative w-32">
                <Image
                  src={LogoImage}
                  alt="Logo TechToJob"
                  className="w-full"
                />
              </figure>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {t("tagline")}
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                {tSocials("label")}
              </span>
              <div className="flex items-center gap-2">
                {SOCIALS.map(({ key, href, icon: Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={tSocials(key)}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-background text-muted transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                  >
                    <Icon size={18} stroke={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <FooterColumn
              title={t("columns.talent.title")}
              links={[
                { href: "/#talento", label: t("columns.talent.links.talento") },
                { href: "/#torneos", label: t("columns.talent.links.torneos") },
                {
                  href: "/#networking",
                  label: t("columns.talent.links.networking"),
                },
              ]}
            />
            <FooterColumn
              title={t("columns.companies.title")}
              links={[
                {
                  href: "/#empresas",
                  label: t("columns.companies.links.empresas"),
                },
                {
                  href: "/#torneos",
                  label: t("columns.companies.links.torneos"),
                },
                {
                  href: "/#noticias",
                  label: t("columns.companies.links.noticias"),
                },
              ]}
            />
            <FooterColumn
              title={t("columns.community.title")}
              links={[
                {
                  href: "https://discord.gg/h9FFgKdkRd",
                  label: t("columns.community.links.discord"),
                  external: true,
                },
                {
                  href: "/#testimonials",
                  label: t("columns.community.links.testimonials"),
                },
                {
                  href: "/#newsletter",
                  label: t("columns.community.links.newsletter"),
                },
                {
                  href: "/#noticias",
                  label: t("columns.community.links.noticias"),
                },
              ]}
            />
            <FooterColumn
              title={t("columns.legal.title")}
              links={[
                { href: "#", label: tLegal("privacy") },
                { href: "#", label: tLegal("terms") },
                {
                  href: "mailto:hola@techtojob.com",
                  label: tLegal("contact"),
                  external: true,
                },
              ]}
            />
          </div>
        </div>

        <div className="mt-14 border-t border-foreground/10 pt-6 text-xs text-muted">
          <p>{t("copyright", { year })}</p>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-muted transition hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-muted transition hover:text-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

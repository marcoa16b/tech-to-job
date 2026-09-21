import { absoluteUrl, localePath, SITE_NAME, SITE_URL, SOCIALS } from "@/lib/seo";

type JsonLdProps = {
  name?: string;
  description: string;
  locale: string;
};

export function StructuredData({ name, description, locale }: JsonLdProps) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icon"),
    description,
    sameAs: [
      SOCIALS.discord,
      SOCIALS.linkedin,
      SOCIALS.x,
      SOCIALS.instagram,
    ],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const webpageLd = name
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: absoluteUrl(localePath(locale)),
        name,
        description,
        inLanguage: locale,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      {webpageLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }}
        />
      ) : null}
    </>
  );
}
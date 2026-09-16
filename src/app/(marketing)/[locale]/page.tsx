import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { setRequestLocale } from "next-intl/server";
import React from "react";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <React.Fragment>
      <Hero />
      <HowItWorks />
    </React.Fragment>
  );
}

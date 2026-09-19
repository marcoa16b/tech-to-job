import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TalentSection } from "@/components/landing/talent-section";
import { CompaniesSection } from "@/components/landing/companies-section";
import { TournamentsSection } from "@/components/landing/tournaments-section";
import { NetworkingSection } from "@/components/landing/networking-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { NewsSection } from "@/components/landing/news-section";
import { NewsletterSection } from "@/components/landing/newsletter-section";
import { ClosingSection } from "@/components/landing/closing-section";
import React from "react";

export default async function Home() {

  return (
    <React.Fragment>
      <Hero />
      <HowItWorks />
      <TalentSection />
      <CompaniesSection />
      <TournamentsSection />
      <NetworkingSection />
      <TestimonialsSection />
      <NewsSection />
      <NewsletterSection />
      <ClosingSection />
    </React.Fragment>
  );
}

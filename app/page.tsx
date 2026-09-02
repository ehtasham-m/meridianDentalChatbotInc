import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Technology } from "@/components/sections/Technology";
import { Doctors } from "@/components/sections/Doctors";
import { SmileGallery } from "@/components/sections/SmileGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { PatientJourney } from "@/components/sections/PatientJourney";
import { Pricing } from "@/components/sections/Pricing";
import { Blog } from "@/components/sections/Blog";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Technology />
      <Doctors />
      <SmileGallery />
      <Testimonials />
      <PatientJourney />
      <Pricing />
      <Blog />
      <FAQ />
      <Contact />
    </>
  );
}

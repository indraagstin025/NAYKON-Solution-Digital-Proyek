import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AboutHero } from "../components/AboutHero";
import { AboutProfile } from "../components/AboutProfile";
import { AboutValues } from "../components/AboutValues";

export function AboutPage() {
  return (
    <div id="nk-site" className="site-wrap min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[68px] lg:pt-[76px]">
        <AboutHero />

        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FBFF] to-[#F4F9FF] py-16 sm:py-20">
          <AboutProfile />
          <AboutValues />
        </section>
      </main>

      <Footer />
    </div>
  );
}

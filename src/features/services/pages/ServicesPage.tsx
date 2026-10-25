import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ServicesHero } from "../components/ServicesHero";
import { ServiceCards } from "../components/ServiceCards";
import { ServiceWorkflow } from "../components/ServiceWorkflow";

export function ServicesPage() {
  return (
    <div id="nk-site" className="site-wrap min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[68px] lg:pt-[76px]">
        <ServicesHero />

        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F7FAFF] to-[#F3F8FF] py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
            <ServiceCards />
            <ServiceWorkflow />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

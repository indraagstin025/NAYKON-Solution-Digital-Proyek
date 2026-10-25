"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ServicesSection } from "../components/ServicesSection";
import { WorkflowSection } from "../components/WorkflowSection";
import { PortfolioSection } from "../components/PortfolioSection";
import { ContactSection } from "../components/ContactSection";

export function HomePage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nk-theme-preference");
    if (saved === "dark") {
      setIsDark(true);
    }
  }, []);

  return (
    <div
      id="nk-site"
      className={`site-wrap ${isDark ? "theme-dark" : ""}`}
      suppressHydrationWarning
    >
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorkflowSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

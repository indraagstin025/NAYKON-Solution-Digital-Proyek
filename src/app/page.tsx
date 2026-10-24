"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRightIcon,
  PersonIcon,
  TargetIcon,
  CheckCircledIcon,
  CodeIcon,
  LayersIcon,
  MobileIcon,
  GlobeIcon,
  DesktopIcon,
  LightningBoltIcon,
  ClockIcon,
  EnvelopeClosedIcon,
  PaperPlaneIcon,
  UpdateIcon,
  MagnifyingGlassIcon,
  LayoutIcon,
  RocketIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "website",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<{
    type: "idle" | "sending" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("nk-theme-preference");
    if (saved === "dark") {
      setIsDark(true);
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({
        type: "error",
        message: "Mohon lengkapi nama, email, dan pesan Anda sebelum mengirim.",
      });
      return;
    }

    setFormStatus({ type: "sending", message: "Sedang mengirim pesan..." });

    // Simulate sending form submission
    setTimeout(() => {
      setFormStatus({
        type: "success",
        message: "Terima kasih! Pesan Anda telah kami terima. Tim NAIKON akan menghubungi Anda dalam waktu 1x24 jam kerja.",
      });
      setFormData({ name: "", email: "", service: "website", message: "" });
    }, 900);
  };

  return (
    <div
      id="nk-site"
      className={`site-wrap ${isDark ? "theme-dark" : ""}`}
      suppressHydrationWarning
    >
      <Navbar />

      {/* ─── Main Content ─── */}
      <main>
        {/* ─── Hero Section (Skala proporsi 90% di zoom browser 100%) ─── */}
        <section
          id="beranda"
          className="relative isolate overflow-hidden pt-[68px] lg:pt-[76px] bg-gradient-to-b from-[#F8FBFF] via-[#FFFFFF] to-[#F3F9FF] dark:from-[#030711] dark:via-[#061231] dark:to-[#091a45] min-h-screen flex items-center"
        >
          {/* Decorative Corner Soft Circles matching reference */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 -left-14 h-[195px] w-[195px] rounded-full bg-[#E4F0FF]/80 dark:bg-blue-900/15"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-20 -right-20 h-[220px] w-[220px] rounded-full bg-[#E4F0FF]/75 dark:bg-blue-900/15"
          />

          {/* Bottom Sweeping Layered Waves matching reference */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[115px] sm:h-[155px] lg:h-[190px] w-full overflow-hidden -z-10"
          >
            <svg
              viewBox="0 0 1440 240"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full opacity-95 dark:opacity-25"
            >
              {/* Soft background wave */}
              <path
                d="M0 75 C210 95, 370 185, 620 220 C880 250, 1180 140, 1440 70 L1440 240 L0 240 Z"
                fill="url(#heroWaveBack)"
              />
              {/* Main left blue wave */}
              <path
                d="M0 110 C180 125, 310 190, 490 240 L0 240 Z"
                fill="url(#heroWaveLeft)"
              />
              {/* Right rising wave */}
              <path
                d="M860 240 C1060 215, 1250 135, 1440 95 L1440 240 Z"
                fill="url(#heroWaveRight)"
              />
              <defs>
                <linearGradient id="heroWaveBack" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C4E1FF" stopOpacity="0.65" />
                  <stop offset="48%" stopColor="#E5F2FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#D2E8FF" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="heroWaveLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8EC5FF" stopOpacity="0.78" />
                  <stop offset="65%" stopColor="#BADBFF" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#E1F0FF" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="heroWaveRight" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C8E3FF" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#EDF6FF" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 py-8 sm:py-11 lg:py-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
              {/* Left Column: Headline, Description, CTAs, Feature Highlights */}
              <div className="max-w-[530px]">
                {/* Main Headline */}
                <h1 className="text-[33px] sm:text-[42px] lg:text-[48px] xl:text-[52px] font-extrabold leading-[1.12] tracking-[-0.025em] text-[#041E42] dark:text-[#f4f8ff]">
                  Inovasi teknologi.
                  <br />
                  <span className="sm:whitespace-nowrap">
                    Dampak yang{" "}
                    <span className="text-[#0066FF] dark:text-[#38BDF8]">
                      nyata.
                    </span>
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-4 max-w-[465px] text-[13.5px] sm:text-[15px] leading-[1.65] text-[#4A5D78] dark:text-[#b5c5dd] font-normal">
                  NAIKON Solutions Digital adalah perusahaan teknologi yang merancang solusi
                  digital cerdas untuk membantu bisnis tumbuh, beradaptasi, dan melangkah
                  lebih jauh.
                </p>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/kontak"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0066FF] hover:bg-[#0052CC] px-6 py-3 text-[13.5px] font-semibold text-white shadow-[0_10px_25px_-5px_rgba(0,102,255,0.45)] transition-all hover:scale-[1.02] hover:shadow-[0_14px_30px_-5px_rgba(0,102,255,0.55)]"
                  >
                    <span>Mulai Berkolaborasi</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/portofolio"
                    className="inline-flex items-center justify-center rounded-full border border-[#3B82F6] bg-white/85 hover:bg-blue-50/80 px-6 py-3 text-[13.5px] font-semibold text-[#0066FF] transition-all hover:scale-[1.02] dark:bg-slate-900/80 dark:border-blue-500/60 dark:text-blue-400 dark:hover:bg-slate-800"
                  >
                    Lihat Portofolio
                  </Link>
                </div>

                {/* Bottom Feature Highlights Row */}
                <div className="mt-9 sm:mt-11 flex flex-wrap items-center gap-y-3 gap-x-4 sm:gap-x-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6F1FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400">
                      <DesktopIcon className="h-4 w-4" />
                    </div>
                    <span className="text-xs sm:text-[12.5px] font-medium text-[#0A192F] dark:text-slate-200">
                      Solusi Digital
                    </span>
                  </div>

                  <div className="hidden sm:block h-6 w-[1px] bg-[#CBD5E1] dark:bg-slate-700/80" />

                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6F1FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400">
                      <CodeIcon className="h-4 w-4" />
                    </div>
                    <span className="text-xs sm:text-[12.5px] font-medium text-[#0A192F] dark:text-slate-200">
                      Pengembangan Web
                    </span>
                  </div>

                  <div className="hidden sm:block h-6 w-[1px] bg-[#CBD5E1] dark:bg-slate-700/80" />

                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6F1FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400">
                      <LightningBoltIcon className="h-4 w-4" />
                    </div>
                    <span className="text-xs sm:text-[12.5px] font-medium text-[#0A192F] dark:text-slate-200">
                      Inovasi Teknologi
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Orbital Graphic & Horizontal NAIKON Lockup matching reference (90% scale) */}
              <div className="relative flex items-center justify-center w-full max-w-[550px] mx-auto min-h-[300px] sm:min-h-[380px] lg:min-h-[430px]">
                {/* Vector Orbital Backdrop, Rings, Nodes & Shaded Sphere */}
                <svg
                  viewBox="0 0 700 540"
                  fill="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 w-full h-full"
                >
                  <defs>
                    {/* Soft translucent blue aura oval */}
                    <linearGradient id="heroAuraOval" x1="15%" y1="5%" x2="85%" y2="95%">
                      <stop offset="0%" stopColor="#D6EBFF" stopOpacity="0.72" />
                      <stop offset="55%" stopColor="#EBF5FF" stopOpacity="0.42" />
                      <stop offset="100%" stopColor="#B8DCFF" stopOpacity="0.58" />
                    </linearGradient>

                    {/* Bottom soft glow inside oval */}
                    <radialGradient id="heroBottomGlow" cx="52%" cy="76%" r="38%">
                      <stop offset="0%" stopColor="#9ED0FF" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </radialGradient>

                    {/* Primary orbit stroke gradient */}
                    <linearGradient id="primaryOrbitStroke" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6DB1FF" stopOpacity="0.45" />
                      <stop offset="45%" stopColor="#2B86FF" stopOpacity="0.75" />
                      <stop offset="80%" stopColor="#0066FF" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#6DB1FF" stopOpacity="0.5" />
                    </linearGradient>

                    {/* Secondary inner arc stroke gradient */}
                    <linearGradient id="innerOrbitStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A6D1FF" stopOpacity="0.45" />
                      <stop offset="50%" stopColor="#DCEEFF" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#8BC2FF" stopOpacity="0.5" />
                    </linearGradient>

                    {/* 3D shaded ice sphere at bottom-right */}
                    <radialGradient id="iceSphere3D" cx="72%" cy="72%" r="68%" fx="72%" fy="72%">
                      <stop offset="0%" stopColor="#F5FAFF" />
                      <stop offset="52%" stopColor="#D4E8FF" />
                      <stop offset="100%" stopColor="#B5D6FC" />
                    </radialGradient>
                  </defs>

                  {/* Soft Tilted Aura Oval Backdrop (Wide enough to fully enclose logo) */}
                  <g transform="rotate(-22 350 270)">
                    <ellipse
                      cx="350"
                      cy="270"
                      rx="295"
                      ry="220"
                      fill="url(#heroAuraOval)"
                      className="dark:opacity-25"
                    />
                  </g>

                  {/* Soft Bottom Radial Glow */}
                  <ellipse
                    cx="355"
                    cy="380"
                    rx="215"
                    ry="115"
                    fill="url(#heroBottomGlow)"
                    className="dark:opacity-30"
                  />

                  {/* Subtle Secondary Inner Orbit Ring */}
                  <g transform="rotate(-19 350 270)">
                    <ellipse
                      cx="350"
                      cy="270"
                      rx="288"
                      ry="202"
                      stroke="url(#innerOrbitStroke)"
                      strokeWidth="1.2"
                    />
                  </g>

                  {/* Primary Tilted Orbit Ring + Perfectly Aligned Blue Nodes */}
                  <g transform="rotate(-14 350 270)">
                    <ellipse
                      cx="350"
                      cy="270"
                      rx="318"
                      ry="198"
                      stroke="url(#primaryOrbitStroke)"
                      strokeWidth="1.6"
                    />
                    {/* Top-Right Solid Blue Sphere on the exact ellipse path (θ = -38°) */}
                    {/* x = 350 + 318*cos(-38°) = 600.6, y = 270 + 198*sin(-38°) = 148.1 */}
                    <circle cx="600.6" cy="148.1" r="10.5" fill="#0066FF" />

                    {/* Bottom-Left Solid Blue Dot on the exact ellipse path (θ = 142°) */}
                    {/* x = 350 + 318*cos(142°) = 99.4, y = 270 + 198*sin(142°) = 391.9 */}
                    <circle cx="99.4" cy="391.9" r="5.5" fill="#0066FF" />
                  </g>

                  {/* Floating 3D Shaded Ice Sphere at Bottom-Right */}
                  <circle
                    cx="630"
                    cy="392"
                    r="27"
                    fill="url(#iceSphere3D)"
                    className="dark:opacity-35"
                  />
                </svg>

                {/* Horizontal Logo Lockup: Positioned completely inside the orbital ring with generous margin (90% scale) */}
                <div className="relative z-10 w-[63%] sm:w-[65%] max-w-[345px] transition-transform duration-500 hover:scale-[1.01]">
                  <Image
                    src="/logo-hero.png"
                    alt="NAIKON Digital Solution - Megakselerasi Inovasi, Mewujudkan Karya Digital"
                    width={960}
                    height={196}
                    priority
                    className="w-full h-auto object-contain drop-shadow-[0_10px_24px_rgba(0,60,150,0.06)] dark:brightness-150"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Tentang Section (Profil Perusahaan sesuai referensi desain) ─── */}
        <section
          id="tentang"
          className="relative isolate overflow-hidden bg-gradient-to-b from-[#F7FAFF] via-[#FFFFFF] to-[#F5F9FF] dark:from-[#030711] dark:via-[#061231] dark:to-[#091a45] py-16 sm:py-20 lg:py-24 border-t border-slate-200/50 dark:border-blue-900/30"
        >
          {/* Decorative Soft Blue Circles on Top-Right & Bottom-Right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 h-[210px] w-[210px] rounded-full bg-[#DCEEFF]/75 dark:bg-blue-900/15"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-16 h-[220px] w-[220px] rounded-full bg-[#DCEEFF]/75 dark:bg-blue-900/15"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 grid items-center gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:gap-14">
            {/* Left Column: Orbital Backdrop + Team Photo + Floating Komitmen Rekayasa Card */}
            <div className="relative flex items-center justify-center py-6 sm:py-8">
              {/* SVG Orbital Ring & Soft Blue Aura Circle Behind Photo */}
              <svg
                viewBox="0 0 620 560"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-8 -inset-y-6 w-[114%] h-[112%] -z-10"
              >
                <defs>
                  <linearGradient id="aboutAuraCircle" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D6EBFF" stopOpacity="0.65" />
                    <stop offset="60%" stopColor="#EAF4FF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#C4E1FF" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="aboutOrbitStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1D7AFC" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#7FB8FF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0066FF" stopOpacity="0.7" />
                  </linearGradient>
                </defs>

                {/* Soft Blue Circular Backdrop on Left */}
                <circle
                  cx="260"
                  cy="280"
                  r="225"
                  fill="url(#aboutAuraCircle)"
                  className="dark:opacity-20"
                />

                {/* Tilted Orbit Ring with 2 Blue Nodes */}
                <g transform="rotate(-22 285 280)">
                  <ellipse
                    cx="285"
                    cy="280"
                    rx="268"
                    ry="225"
                    stroke="url(#aboutOrbitStroke)"
                    strokeWidth="1.4"
                  />
                  {/* Top-Left Solid Blue Node on Orbit Path (θ = -132°) */}
                  {/* x = 285 + 268*cos(-132°) = 105.7, y = 280 + 225*sin(-132°) = 112.8 */}
                  <circle cx="105.7" cy="112.8" r="7" fill="#0066FF" />

                  {/* Bottom-Right Solid Blue Node on Orbit Path (θ = 48°) */}
                  {/* x = 285 + 268*cos(48°) = 464.3, y = 280 + 225*sin(48°) = 447.2 */}
                  <circle cx="464.3" cy="447.2" r="4.5" fill="#0066FF" />
                </g>
              </svg>

              {/* Main Team Photo Frame */}
              <div className="relative w-full max-w-[520px]">
                <div className="relative overflow-hidden rounded-[26px] border-[5px] border-white dark:border-slate-800 bg-white shadow-[0_22px_50px_-12px_rgba(10,35,80,0.15)]">
                  <Image
                    src="/team-naikon.jpg"
                    alt="Tim programmer NAIKON Digital Solution berkolaborasi merancang arsitektur sistem"
                    width={960}
                    height={680}
                    className="h-[310px] sm:h-[380px] md:h-[410px] w-full object-cover"
                  />
                </div>

                {/* Floating Bottom-Left Card: KOMITMEN REKAYASA */}
                <div className="relative sm:absolute -bottom-5 left-0 sm:-left-3 mt-4 sm:mt-0 w-full sm:w-[82%] max-w-[390px] rounded-2xl border border-slate-100 dark:border-slate-700/70 bg-white dark:bg-slate-900 px-5 py-4 shadow-[0_16px_38px_-8px_rgba(10,35,80,0.14)] flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066FF] dark:bg-blue-950 dark:text-blue-400">
                    <PersonIcon className="h-5 w-5" />
                  </div>
                  <div className="h-9 w-[1px] bg-[#CBD5E1] dark:bg-slate-700 shrink-0" />
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#0066FF] dark:text-blue-400">
                      KOMITMEN REKAYASA
                    </p>
                    <p className="mt-0.5 text-xs sm:text-[12.5px] leading-snug text-[#4A5D78] dark:text-slate-300 font-normal">
                      Kami hadir sebagai mitra jangka panjang untuk kesuksesan digital bisnis Anda.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Logo, Badge, Headline, Description, 3 Divided Feature Rows */}
            <div>
              {/* Top Horizontal Logo (2-line NK | NAIKON DIGITAL SOLUTION) */}
              <div className="mb-4">
                <Image
                  src="/logo-navbar.png"
                  alt="NAIKON Digital Solution"
                  width={220}
                  height={46}
                  className="h-[30px] sm:h-[34px] w-auto object-contain dark:brightness-150"
                />
              </div>

              {/* Pill Badge: PROFIL PERUSAHAAN */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[#E6F1FF] dark:bg-blue-950/80 px-3.5 py-1 border border-[#CDE2FF]/80 dark:border-blue-800/50">
                <span className="h-2 w-2 rounded-full bg-[#0066FF] dark:bg-[#38BDF8] shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-[#0066FF] dark:text-blue-400">
                  PROFIL PERUSAHAAN
                </span>
              </div>

              {/* Section Headline */}
              <h2 className="mt-4 text-[26px] sm:text-[32px] lg:text-[36px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
                Solusi digital yang dibangun
                <br className="hidden sm:inline" /> berdasarkan kebutuhan{" "}
                <br className="hidden sm:inline" />
                <span className="text-[#0066FF] dark:text-[#38BDF8]">
                  riil bisnis Anda.
                </span>
              </h2>

              {/* Description Paragraph */}
              <p className="mt-4 text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#4A5D78] dark:text-slate-300">
                NAIKON Digital Solution adalah mitra rekayasa perangkat lunak dan website yang berfokus pada hasil terukur. Kami merancang arsitektur sistem yang cepat, aman, dan mudah dioperasikan agar bisnis Anda dapat berkembang secara efisien.
              </p>

              {/* 3 Feature Items Separated by Thin Horizontal Lines */}
              <div className="mt-6 divide-y divide-[#D8E6F8] dark:divide-slate-800">
                {/* Item 1 */}
                <div className="py-4 first:pt-2 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E6F1FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400">
                    <TargetIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] sm:text-base font-bold text-[#041E42] dark:text-white">
                      Pendekatan Berbasis Solusi Nyata
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13.5px] leading-relaxed text-[#526580] dark:text-slate-300">
                      Kami memahami kebutuhan bisnis Anda dan menghadirkan solusi yang tepat, terukur, dan berdampak.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="py-4 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E6F1FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400">
                    <CodeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] sm:text-base font-bold text-[#041E42] dark:text-white">
                      Standar Kode Teruji &amp; Skalabilitas Tinggi
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13.5px] leading-relaxed text-[#526580] dark:text-slate-300">
                      Menggunakan teknologi modern dengan kode berkualitas yang aman dan mudah dikembangkan.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="py-4 last:pb-0 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E6F1FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400">
                    <CheckCircledIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] sm:text-base font-bold text-[#041E42] dark:text-white">
                      Transparansi Biaya &amp; Garansi Purnajual
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13.5px] leading-relaxed text-[#526580] dark:text-slate-300">
                      Biaya jelas sejak awal dan dukungan penuh setelah implementasi untuk memastikan solusi berjalan optimal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Layanan Section (Sesuai referensi gambar + Radix Icons) ─── */}
        <section
          id="layanan"
          className="relative isolate overflow-hidden bg-gradient-to-b from-[#F5F9FF] via-[#F9FCFF] to-[#F3F8FF] dark:from-[#030711] dark:via-[#061231] dark:to-[#091a45] py-16 sm:py-20 lg:py-24 border-t border-slate-200/50 dark:border-blue-900/30"
        >
          {/* Top-Left Decorative Soft Circle & Orbital Arc with Blue Dot */}
          <svg
            viewBox="0 0 260 260"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 h-[190px] w-[190px] sm:h-[240px] sm:w-[240px] -z-10"
          >
            <circle
              cx="15"
              cy="15"
              r="145"
              fill="#DCEEFF"
              fillOpacity="0.7"
              className="dark:opacity-15"
            />
            <circle
              cx="15"
              cy="15"
              r="172"
              stroke="#1D7AFC"
              strokeOpacity="0.65"
              strokeWidth="1.3"
            />
            {/* Dot on arc at θ = 36°: x = 15 + 172*cos(36°) = 154.2, y = 15 + 172*sin(36°) = 116.1 */}
            <circle cx="154.2" cy="116.1" r="5.5" fill="#0066FF" />
          </svg>

          {/* Bottom-Left Decorative Soft Circle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 h-[210px] w-[210px] rounded-full bg-[#DCEEFF]/75 dark:bg-blue-900/15 -z-10"
          />

          {/* Bottom-Right Decorative Soft Circle & Orbital Arc with Blue Dot */}
          <svg
            viewBox="0 0 260 260"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 h-[180px] w-[180px] sm:h-[230px] sm:w-[230px] -z-10"
          >
            <circle
              cx="250"
              cy="250"
              r="130"
              fill="#DCEEFF"
              fillOpacity="0.7"
              className="dark:opacity-15"
            />
            <circle
              cx="250"
              cy="250"
              r="158"
              stroke="#1D7AFC"
              strokeOpacity="0.65"
              strokeWidth="1.3"
            />
            {/* Dot on arc at θ = 205°: x = 250 + 158*cos(205°) = 106.8, y = 250 + 158*sin(205°) = 183.2 */}
            <circle cx="106.8" cy="183.2" r="5.5" fill="#0066FF" />
          </svg>

          <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
            {/* Centered Section Header */}
            <div className="text-center max-w-[740px] mx-auto">
              <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF] dark:text-blue-400">
                LAYANAN UTAMA
              </p>
              <h2 className="mt-3 text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
                Spesialisasi rekayasa web dan{" "}
                <span className="text-[#0066FF] dark:text-[#38BDF8]">mobile</span> untuk
                <br className="hidden sm:inline" />{" "}
                <span className="text-[#0066FF] dark:text-[#38BDF8]">
                  pertumbuhan bisnis
                </span>
              </h2>
              <p className="mx-auto mt-3.5 max-w-[660px] text-[13.5px] sm:text-[14.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                Dari website profil korporasi hingga sistem alur kerja terintegrasi, kami
                merancang dan mengembangkan produk digital yang siap digunakan jangka
                panjang.
              </p>
            </div>

            {/* 2x2 Service Cards Grid */}
            <div className="mt-10 sm:mt-12 grid gap-6 lg:gap-7 md:grid-cols-2">
              {/* Service 1: Pembuatan Website Bisnis */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-8 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                      <GlobeIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] dark:bg-blue-950/70 px-4 py-1 text-[11.5px] font-semibold text-[#0066FF] dark:text-blue-300">
                      Website
                    </span>
                  </div>

                  <h3 className="text-[18px] sm:text-[20px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white">
                    Pembuatan Website Bisnis
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                    Website korporasi dan landing page yang berfokus pada kredibilitas,
                    konversi, dan pengalaman pengguna.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Company Profile", "Landing Page", "Optimasi SEO", "Panel Admin / CMS"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#EEF5FF] dark:bg-slate-800 px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0A2558] dark:text-slate-200"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8F0FC] dark:border-slate-800/80">
                  <Link
                    href="/kontak"
                    className="inline-flex items-center gap-2 text-[13px] sm:text-[13.5px] font-bold text-[#0066FF] dark:text-blue-400 hover:text-[#0052CC] transition-colors group/link"
                  >
                    <span>Konsultasi Pembuatan Web</span>
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>

              {/* Service 2: Redesign & Optimalisasi Website */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-8 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                      <UpdateIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] dark:bg-blue-950/70 px-4 py-1 text-[11.5px] font-semibold text-[#0066FF] dark:text-blue-300">
                      Penyegaran
                    </span>
                  </div>

                  <h3 className="text-[18px] sm:text-[20px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white">
                    Redesign &amp; Optimalisasi Website
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                    Memodernisasi tampilan dan kode website lama yang lambat, tidak
                    responsif, atau usang menjadi antarmuka modern dengan skor kecepatan
                    Google PageSpeed tinggi.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "Penyegaran UI/UX",
                      "Kecepatan Loading",
                      "Mobile-First",
                      "Migrasi Konten Aman",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#EEF5FF] dark:bg-slate-800 px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0A2558] dark:text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8F0FC] dark:border-slate-800/80">
                  <Link
                    href="/kontak"
                    className="inline-flex items-center gap-2 text-[13px] sm:text-[13.5px] font-bold text-[#0066FF] dark:text-blue-400 hover:text-[#0052CC] transition-colors group/link"
                  >
                    <span>Konsultasi Redesign</span>
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>

              {/* Service 3: Aplikasi Web & Dashboard Kustom */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-8 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                      <CodeIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] dark:bg-blue-950/70 px-4 py-1 text-[11.5px] font-semibold text-[#0066FF] dark:text-blue-300">
                      Sistem Web
                    </span>
                  </div>

                  <h3 className="text-[18px] sm:text-[20px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white">
                    Aplikasi Web &amp; Dashboard Kustom
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                    Pengembangan sistem internal berbasis web seperti dashboard operasional,
                    inventaris pergudangan, portal karyawan, dan otomatisasi administrasi
                    multi-cabang.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "Dashboard Analitik",
                      "Database Relasional",
                      "Integrasi REST API",
                      "Hak Akses",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#EEF5FF] dark:bg-slate-800 px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0A2558] dark:text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8F0FC] dark:border-slate-800/80">
                  <Link
                    href="/kontak"
                    className="inline-flex items-center gap-2 text-[13px] sm:text-[13.5px] font-bold text-[#0066FF] dark:text-blue-400 hover:text-[#0052CC] transition-colors group/link"
                  >
                    <span>Konsultasi Web App</span>
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>

              {/* Service 4: Pengembangan Aplikasi Mobile */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-8 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                      <MobileIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] dark:bg-blue-950/70 px-4 py-1 text-[11.5px] font-semibold text-[#0066FF] dark:text-blue-300">
                      Mobile App
                    </span>
                  </div>

                  <h3 className="text-[18px] sm:text-[20px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white">
                    Pengembangan Aplikasi Mobile
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                    Pembuatan aplikasi Android dan iOS yang responsif, intuitif, dan
                    terintegrasi dengan sistem bisnis dan API server perusahaan Anda.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "Android & iOS",
                      "Push Notification",
                      "Integrasi Payment Gateway",
                      "Sinkronisasi Real-Time",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#EEF5FF] dark:bg-slate-800 px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0A2558] dark:text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8F0FC] dark:border-slate-800/80">
                  <Link
                    href="/kontak"
                    className="inline-flex items-center gap-2 text-[13px] sm:text-[13.5px] font-bold text-[#0066FF] dark:text-blue-400 hover:text-[#0052CC] transition-colors group/link"
                  >
                    <span>Konsultasi Mobile App</span>
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ─── Proses Kerja Section (Konsisten dengan gaya visual Layanan Utama & Radix Icons) ─── */}
        <section
          id="alur"
          className="relative isolate overflow-hidden bg-gradient-to-b from-[#F8FBFF] via-[#FFFFFF] to-[#F5F9FF] dark:from-[#030711] dark:via-[#061231] dark:to-[#091a45] py-16 sm:py-20 lg:py-24 border-t border-slate-200/50 dark:border-blue-900/30"
        >
          {/* Decorative Top-Right Circle & Orbital Arc */}
          <svg
            viewBox="0 0 260 260"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 h-[180px] w-[180px] sm:h-[230px] sm:w-[230px] -z-10"
          >
            <circle
              cx="245"
              cy="15"
              r="135"
              fill="#DCEEFF"
              fillOpacity="0.7"
              className="dark:opacity-15"
            />
            <circle
              cx="245"
              cy="15"
              r="164"
              stroke="#1D7AFC"
              strokeOpacity="0.6"
              strokeWidth="1.3"
            />
            {/* Dot on arc at θ = 142°: x = 245 + 164*cos(142°) = 115.8, y = 15 + 164*sin(142°) = 116.0 */}
            <circle cx="115.8" cy="116" r="5.5" fill="#0066FF" />
          </svg>

          {/* Decorative Bottom-Left Soft Circle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 h-[210px] w-[210px] rounded-full bg-[#DCEEFF]/70 dark:bg-blue-900/15 -z-10"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
            {/* Section Header */}
            <div className="text-center max-w-[740px] mx-auto">
              <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF] dark:text-blue-400">
                PROSES KERJA
              </p>
              <h2 className="mt-3 text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
                Tahapan kerja terstruktur dari{" "}
                <span className="text-[#0066FF] dark:text-[#38BDF8]">perencanaan</span>{" "}
                hingga{" "}
                <span className="text-[#0066FF] dark:text-[#38BDF8]">peluncuran</span>
              </h2>
              <p className="mx-auto mt-3.5 max-w-[650px] text-[13.5px] sm:text-[14.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                Kami menerapkan alur kerja yang transparan agar setiap proyek selesai tepat
                waktu dengan kualitas kode yang teruji.
              </p>
            </div>

            {/* 4-Column Process Cards */}
            <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Step 01 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                      <MagnifyingGlassIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] dark:bg-blue-950/70 px-3.5 py-1 text-[11.5px] font-bold text-[#0066FF] dark:text-blue-300">
                      Tahap 01
                    </span>
                  </div>

                  <h3 className="text-[17px] sm:text-[18px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white">
                    Discovery &amp; Spesifikasi
                  </h3>
                  <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                    Sesi konsultasi untuk memetakan tujuan bisnis, kendala alur kerja,
                    spesifikasi teknis, serta estimasi jadwal pengerjaan yang transparan.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8F0FC] dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#0066FF] dark:text-blue-400">
                  <span>Pemetaan Kebutuhan</span>
                  <span className="text-[#8AA8D8] dark:text-slate-500 font-bold">01 / 04</span>
                </div>
              </article>

              {/* Step 02 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                      <LayoutIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] dark:bg-blue-950/70 px-3.5 py-1 text-[11.5px] font-bold text-[#0066FF] dark:text-blue-300">
                      Tahap 02
                    </span>
                  </div>

                  <h3 className="text-[17px] sm:text-[18px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white">
                    Desain UI/UX &amp; Alur
                  </h3>
                  <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                    Penyusunan arsitektur informasi, wireframe, dan prototipe antarmuka
                    interaktif sehingga Anda dapat meninjau alur aplikasi sebelum koding
                    dimulai.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8F0FC] dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#0066FF] dark:text-blue-400">
                  <span>Prototipe Interaktif</span>
                  <span className="text-[#8AA8D8] dark:text-slate-500 font-bold">02 / 04</span>
                </div>
              </article>

              {/* Step 03 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                      <CodeIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] dark:bg-blue-950/70 px-3.5 py-1 text-[11.5px] font-bold text-[#0066FF] dark:text-blue-300">
                      Tahap 03
                    </span>
                  </div>

                  <h3 className="text-[17px] sm:text-[18px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white">
                    Rekayasa Kode &amp; QA
                  </h3>
                  <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                    Pengembangan dengan standar arsitektur bersih, integrasi API, pengujian
                    responsivitas antar device, serta evaluasi keamanan sistem.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8F0FC] dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#0066FF] dark:text-blue-400">
                  <span>Pengujian &amp; Keamanan</span>
                  <span className="text-[#8AA8D8] dark:text-slate-500 font-bold">03 / 04</span>
                </div>
              </article>

              {/* Step 04 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                      <RocketIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] dark:bg-blue-950/70 px-3.5 py-1 text-[11.5px] font-bold text-[#0066FF] dark:text-blue-300">
                      Tahap 04
                    </span>
                  </div>

                  <h3 className="text-[17px] sm:text-[18px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white">
                    Deployment &amp; Garansi
                  </h3>
                  <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                    Peluncuran aplikasi ke server produksi atau app store, pelatihan
                    penggunaan bagi tim Anda, serta garansi pemeliharaan pasca rilis.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8F0FC] dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#0066FF] dark:text-blue-400">
                  <span>Rilis &amp; Pendampingan</span>
                  <span className="text-[#8AA8D8] dark:text-slate-500 font-bold">04 / 04</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ─── Portofolio / Studi Kasus Section (Konsisten dengan Layanan Utama) ─── */}
        <section
          id="portofolio"
          className="relative isolate overflow-hidden bg-gradient-to-b from-[#F4F9FF] via-[#F9FCFF] to-[#F3F8FF] dark:from-[#030711] dark:via-[#061231] dark:to-[#091a45] py-16 sm:py-20 lg:py-24 border-t border-slate-200/50 dark:border-blue-900/30"
        >
          {/* Decorative Top-Left Circle & Orbital Arc */}
          <svg
            viewBox="0 0 260 260"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 h-[180px] w-[180px] sm:h-[230px] sm:w-[230px] -z-10"
          >
            <circle
              cx="15"
              cy="15"
              r="135"
              fill="#DCEEFF"
              fillOpacity="0.7"
              className="dark:opacity-15"
            />
            <circle
              cx="15"
              cy="15"
              r="164"
              stroke="#1D7AFC"
              strokeOpacity="0.6"
              strokeWidth="1.3"
            />
            {/* Dot on arc at θ = 38°: x = 15 + 164*cos(38°) = 144.2, y = 15 + 164*sin(38°) = 116.0 */}
            <circle cx="144.2" cy="116" r="5.5" fill="#0066FF" />
          </svg>

          {/* Decorative Bottom-Right Soft Circle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-20 h-[215px] w-[215px] rounded-full bg-[#DCEEFF]/75 dark:bg-blue-900/15 -z-10"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
            {/* Section Header */}
            <div className="text-center max-w-[740px] mx-auto">
              <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF] dark:text-blue-400">
                STUDI KASUS &amp; KONSEP SOLUSI
              </p>
              <h2 className="mt-3 text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
                Gambaran implementasi{" "}
                <span className="text-[#0066FF] dark:text-[#38BDF8]">teknologi</span> pada{" "}
                <span className="text-[#0066FF] dark:text-[#38BDF8]">sektor bisnis</span>
              </h2>
              <p className="mx-auto mt-3.5 max-w-[660px] text-[13.5px] sm:text-[14.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                Contoh arsitektur proyek dan solusi digital yang kami rancang untuk
                memecahkan kendala operasional klien secara terukur.
              </p>
            </div>

            {/* 3-Column Case Study Cards */}
            <div className="mt-10 sm:mt-12 grid gap-6 lg:gap-7 md:grid-cols-3">
              {/* Case 1 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                      <LayersIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] dark:bg-blue-950/70 px-3.5 py-1 text-[11.5px] font-semibold text-[#0066FF] dark:text-blue-300">
                      Aplikasi Web Internal
                    </span>
                  </div>

                  <h3 className="text-[18px] sm:text-[19px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white">
                    Portal Operasional &amp; Inventaris
                  </h3>
                  <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                    Sistem dasbor terpusat untuk memantau stok multi-gudang, rekapitulasi
                    transaksi otomatis, dan pembagian hak akses bertingkat bagi staf hingga
                    manajemen.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Next.js", "PostgreSQL", "Tailwind CSS"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[#EEF5FF] dark:bg-slate-800 px-3.5 py-1 text-[11.5px] font-semibold text-[#0A2558] dark:text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E8F0FC] dark:border-slate-800/80">
                  <div className="rounded-2xl bg-[#F4F8FF] dark:bg-slate-800/70 p-4 text-xs sm:text-[12.5px] text-[#4A5D78] dark:text-slate-300 border border-[#DCEBFE] dark:border-slate-700/60 leading-relaxed">
                    <div className="flex items-center gap-1.5 font-extrabold text-[#0066FF] dark:text-blue-400 mb-1">
                      <CheckCircledIcon className="h-3.5 w-3.5 shrink-0" />
                      <span>Dampak Bisnis</span>
                    </div>
                    Menghilangkan pencatatan ganda antar-cabang dan mempercepat konsolidasi
                    laporan operasional secara terpusat.
                  </div>
                </div>
              </article>

              {/* Case 2 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                      <GlobeIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] dark:bg-blue-950/70 px-3.5 py-1 text-[11.5px] font-semibold text-[#0066FF] dark:text-blue-300">
                      Website Korporasi
                    </span>
                  </div>

                  <h3 className="text-[18px] sm:text-[19px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white">
                    Portal Korporasi &amp; Katalog B2B
                  </h3>
                  <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                    Website profil perusahaan manufaktur dengan katalog produk digital
                    terstruktur, formulir permintaan penawaran harga, serta optimasi SEO
                    halaman spesifikasi.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["React", "SEO Engine", "Headless CMS"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[#EEF5FF] dark:bg-slate-800 px-3.5 py-1 text-[11.5px] font-semibold text-[#0A2558] dark:text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E8F0FC] dark:border-slate-800/80">
                  <div className="rounded-2xl bg-[#F4F8FF] dark:bg-slate-800/70 p-4 text-xs sm:text-[12.5px] text-[#4A5D78] dark:text-slate-300 border border-[#DCEBFE] dark:border-slate-700/60 leading-relaxed">
                    <div className="flex items-center gap-1.5 font-extrabold text-[#0066FF] dark:text-blue-400 mb-1">
                      <CheckCircledIcon className="h-3.5 w-3.5 shrink-0" />
                      <span>Dampak Bisnis</span>
                    </div>
                    Mempermudah eksplorasi katalog produk bagi mitra bisnis dan menertibkan
                    jalur penerimaan penawaran harga.
                  </div>
                </div>
              </article>

              {/* Case 3 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                      <MobileIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] dark:bg-blue-950/70 px-3.5 py-1 text-[11.5px] font-semibold text-[#0066FF] dark:text-blue-300">
                      Aplikasi Mobile
                    </span>
                  </div>

                  <h3 className="text-[18px] sm:text-[19px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white">
                    Aplikasi Pelacakan Distribusi
                  </h3>
                  <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                    Aplikasi mobile bagi armada pengiriman barang yang dilengkapi konfirmasi
                    tanda tangan digital penerima dan pembaruan rute pengantaran secara
                    langsung.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["iOS & Android", "REST API", "E-Signature"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[#EEF5FF] dark:bg-slate-800 px-3.5 py-1 text-[11.5px] font-semibold text-[#0A2558] dark:text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E8F0FC] dark:border-slate-800/80">
                  <div className="rounded-2xl bg-[#F4F8FF] dark:bg-slate-800/70 p-4 text-xs sm:text-[12.5px] text-[#4A5D78] dark:text-slate-300 border border-[#DCEBFE] dark:border-slate-700/60 leading-relaxed">
                    <div className="flex items-center gap-1.5 font-extrabold text-[#0066FF] dark:text-blue-400 mb-1">
                      <CheckCircledIcon className="h-3.5 w-3.5 shrink-0" />
                      <span>Dampak Bisnis</span>
                    </div>
                    Memastikan bukti serah terima terdokumentasi rapi dan memangkas waktu
                    verifikasi armada di lapangan.
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ─── Kontak Section (Konsisten dengan gaya visual NAIKON) ─── */}
        <section
          id="kontak"
          className="relative isolate overflow-hidden bg-gradient-to-b from-[#F8FBFF] via-[#FFFFFF] to-[#F3F8FF] dark:from-[#030711] dark:via-[#061231] dark:to-[#091a45] py-16 sm:py-20 lg:py-24 border-t border-slate-200/50 dark:border-blue-900/30"
        >
          {/* Decorative Soft Circles & Orbit Arc */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 h-[215px] w-[215px] rounded-full bg-[#DCEEFF]/75 dark:bg-blue-900/15 -z-10"
          />
          <svg
            viewBox="0 0 260 260"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-[180px] sm:h-[230px] sm:w-[230px] -z-10"
          >
            <circle
              cx="15"
              cy="245"
              r="135"
              fill="#DCEEFF"
              fillOpacity="0.7"
              className="dark:opacity-15"
            />
            <circle
              cx="15"
              cy="245"
              r="164"
              stroke="#1D7AFC"
              strokeOpacity="0.6"
              strokeWidth="1.3"
            />
            {/* Dot on arc at θ = -36°: x = 15 + 164*cos(-36°) = 147.7, y = 245 + 164*sin(-36°) = 148.6 */}
            <circle cx="147.7" cy="148.6" r="5.5" fill="#0066FF" />
          </svg>

          <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            {/* Left Column: Header & Contact Info Cards */}
            <div>
              <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF] dark:text-blue-400">
                HUBUNGI KAMI
              </p>
              <h2 className="mt-3 text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
                Siap mendiskusikan{" "}
                <span className="text-[#0066FF] dark:text-[#38BDF8]">
                  rencana digital
                </span>{" "}
                Anda?
              </h2>
              <p className="mt-3.5 text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#4A5D78] dark:text-slate-300">
                Ceritakan kebutuhan website atau sistem yang ingin Anda kembangkan. Kami
                akan meninjau spesifikasi Anda dan memberikan estimasi solusi serta langkah
                awal dalam 1x24 jam kerja.
              </p>

              {/* Contact Cards Stack */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-4 sm:p-5 shadow-[0_12px_32px_-10px_rgba(10,35,80,0.06)]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400">
                    <EnvelopeClosedIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#5A6E8C] dark:text-slate-400">
                      Email Resmi Konsultasi
                    </p>
                    <a
                      href="mailto:contact@naykon.id"
                      className="mt-0.5 inline-block text-[15px] sm:text-base font-extrabold text-[#0066FF] dark:text-blue-400 hover:underline"
                    >
                      contact@naykon.id
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-4 sm:p-5 shadow-[0_12px_32px_-10px_rgba(10,35,80,0.06)]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400">
                    <ClockIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#5A6E8C] dark:text-slate-400">
                      Jam Kerja Operasional
                    </p>
                    <p className="mt-0.5 text-[14px] sm:text-[15px] font-bold text-[#041E42] dark:text-white">
                      Senin – Jumat, 09.00 – 18.00 WIB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-4 sm:p-5 shadow-[0_12px_32px_-10px_rgba(10,35,80,0.06)]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400">
                    <ChatBubbleIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#5A6E8C] dark:text-slate-400">
                      Komitmen Respons
                    </p>
                    <p className="mt-0.5 text-[13.5px] sm:text-[14px] font-bold text-[#041E42] dark:text-white">
                      Tinjauan spesifikasi &amp; estimasi dalam 1x24 jam kerja
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean White Consultation Form Card */}
            <form
              id="contact-form"
              onSubmit={handleFormSubmit}
              className="rounded-[24px] bg-white dark:bg-slate-900/95 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-8 lg:p-9 shadow-[0_18px_46px_-12px_rgba(10,35,80,0.08)]"
              noValidate
            >
              <div className="mb-6 pb-4 border-b border-[#E8F0FC] dark:border-slate-800">
                <h3 className="text-[18px] sm:text-[20px] font-extrabold text-[#041E42] dark:text-white">
                  Formulir Konsultasi Proyek
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] text-[#5A6E8C] dark:text-slate-400">
                  Isi detail singkat di bawah ini untuk menjadwalkan diskusi bersama tim
                  rekayasa NAIKON.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block text-[13px] font-bold text-[#041E42] dark:text-slate-200"
                    htmlFor="contact-name"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    autoComplete="name"
                    placeholder="Nama Anda"
                    required
                    maxLength={120}
                    className="w-full rounded-xl border border-[#D8E6F8] dark:border-slate-700 bg-[#F8FBFF] dark:bg-slate-800/80 px-4 py-3 text-[13.5px] text-[#041E42] dark:text-white placeholder:text-[#869AB8] outline-none transition focus:border-[#0066FF] focus:bg-white dark:focus:bg-slate-900 focus:ring-3 focus:ring-[#0066FF]/15"
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-[13px] font-bold text-[#041E42] dark:text-slate-200"
                    htmlFor="contact-email-input"
                  >
                    Alamat Email
                  </label>
                  <input
                    id="contact-email-input"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    autoComplete="email"
                    placeholder="nama@perusahaan.com"
                    required
                    maxLength={254}
                    className="w-full rounded-xl border border-[#D8E6F8] dark:border-slate-700 bg-[#F8FBFF] dark:bg-slate-800/80 px-4 py-3 text-[13.5px] text-[#041E42] dark:text-white placeholder:text-[#869AB8] outline-none transition focus:border-[#0066FF] focus:bg-white dark:focus:bg-slate-900 focus:ring-3 focus:ring-[#0066FF]/15"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  className="mb-2 block text-[13px] font-bold text-[#041E42] dark:text-slate-200"
                  htmlFor="contact-service"
                >
                  Kebutuhan Layanan
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full rounded-xl border border-[#D8E6F8] dark:border-slate-700 bg-[#F8FBFF] dark:bg-slate-800/80 px-4 py-3 text-[13.5px] text-[#041E42] dark:text-white outline-none transition focus:border-[#0066FF] focus:bg-white dark:focus:bg-slate-900 focus:ring-3 focus:ring-[#0066FF]/15"
                >
                  <option value="website" className="text-slate-900 bg-white">
                    Pembuatan Website Bisnis
                  </option>
                  <option value="redesign" className="text-slate-900 bg-white">
                    Redesign &amp; Optimalisasi Website
                  </option>
                  <option value="webapp" className="text-slate-900 bg-white">
                    Aplikasi Web &amp; Dashboard Kustom
                  </option>
                  <option value="mobile" className="text-slate-900 bg-white">
                    Pengembangan Aplikasi Mobile
                  </option>
                  <option value="other" className="text-slate-900 bg-white">
                    Konsultasi Lainnya
                  </option>
                </select>
              </div>

              <div className="mt-5">
                <label
                  className="mb-2 block text-[13px] font-bold text-[#041E42] dark:text-slate-200"
                  htmlFor="contact-message"
                >
                  Pesan &amp; Ringkasan Kebutuhan
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Jelaskan kebutuhan proyek Anda atau fitur yang ingin dibangun..."
                  required
                  maxLength={5000}
                  className="w-full resize-y rounded-xl border border-[#D8E6F8] dark:border-slate-700 bg-[#F8FBFF] dark:bg-slate-800/80 px-4 py-3 text-[13.5px] text-[#041E42] dark:text-white placeholder:text-[#869AB8] outline-none transition focus:border-[#0066FF] focus:bg-white dark:focus:bg-slate-900 focus:ring-3 focus:ring-[#0066FF]/15"
                />
              </div>

              <button
                id="submit-button"
                type="submit"
                disabled={formStatus.type === "sending"}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] px-6 py-3.5 text-[14px] font-bold text-white shadow-[0_10px_25px_-5px_rgba(0,102,255,0.45)] transition-all hover:scale-[1.01] hover:shadow-[0_14px_30px_-5px_rgba(0,102,255,0.55)] disabled:cursor-wait disabled:opacity-60"
              >
                <span>
                  {formStatus.type === "sending"
                    ? "Sedang Mengirim..."
                    : "Kirim Pesan Konsultasi"}
                </span>
                <PaperPlaneIcon className="w-4 h-4" />
              </button>

              {formStatus.message && (
                <div
                  id="form-status"
                  className={`mt-4 p-3.5 rounded-xl text-[13px] font-medium ${
                    formStatus.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/40"
                      : "bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/40"
                  }`}
                  role="status"
                >
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

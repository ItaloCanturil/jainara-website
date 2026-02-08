"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Hero from "@/components/hero/Hero";
import Manifesto from "@/components/manifesto/Manifesto";
import Process from "@/components/process/Process";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useGSAP(
    () => {
      smootherRef.current = ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });
    },
    { scope: mainRef }
  );

  return (
    <div id="smooth-wrapper" ref={mainRef}>
      <div id="smooth-content">
        <main className="min-h-screen bg-black font-sans">
          <Hero />
          <Manifesto />
          <Process />
        </main>
      </div>
    </div>
  );
}
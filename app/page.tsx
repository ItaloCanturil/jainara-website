"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "+=4000px",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(".hero__cover-img", {
        scale: 4,
        z: 350,
        transformOrigin: "center center",
        ease: "power1.inOut",
        duration: 2,
      })
        .to(".hero__cover", { opacity: 0, duration: 1 }, "<+=1")
        .to(".hero__bg", {
          filter: "blur(0px) brightness(1)",
          scale: 1.1,
          duration: 2
        }, "<");

      tl.fromTo(".grid-center-image",
        { scale: 2, opacity: 0, filter: "blur(10px)" },
        { scale: 2, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" },
        "-=0.5"
      );

      tl.addLabel("gridReveal");

      tl.to(".hero__bg", { opacity: 0, duration: 2 }, "gridReveal");

      tl.to(".grid-center-image", {
        scale: 1,
        duration: 2,
        ease: "power3.inOut"
      }, "gridReveal");

      tl.fromTo(".grid-item-project",
        {
          scale: 0.5,
          autoAlpha: 0,
          y: 50
        },
        {
          scale: 1,
          autoAlpha: 1,
          y: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          stagger: {
            amount: 1,
            grid: [3, 3],
            from: "center"
          }
        },
        "gridReveal+=0.5"
      );

    },
    { scope: mainRef }
  );

  const gridItems = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div id="smooth-wrapper" ref={mainRef}>
      <div id="smooth-content">
        <main className="min-h-screen bg-black font-sans">

          <div className="hero-container h-screen w-full relative overflow-hidden">
            <section className="hero w-full h-full relative flex items-center justify-center">

              <div className="hero__bg absolute inset-0 bg-center bg-no-repeat bg-cover blur-[3px] brightness-150 z-0"
                style={{ backgroundImage: "url('/hero-bg.png')" }}></div>

              <div className="grid-layer absolute z-20 w-full max-w-4xl p-4 aspect-square max-h-[80vh]">

                <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full h-full">
                  {gridItems.map((index) => {
                    const isCenter = index === 4;

                    if (isCenter) {
                      return (
                        <div key={index} className="relative w-full h-full flex items-center justify-center z-20">
                          <div className="grid-center-image w-full h-full rounded-2xl overflow-hidden shadow-2xl opacity-0">
                            <img
                              src="/profile.jpg"
                              alt="Jainara"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className="grid-item-project w-full h-full bg-zinc-800 rounded-xl overflow-hidden border border-white/10 opacity-0 relative group cursor-pointer">
                          <img
                            src={`https://picsum.photos/400?random=${index}`}
                            alt="Projeto"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-bold">Ver Projeto</span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>

              </div>

              <div className="hero__cover absolute inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none">
                <img src="/door-open.png" alt="Door" className="hero__cover-img w-full h-full object-cover" />
              </div>

            </section>
          </div>

          <section className="h-screen bg-zinc-900 flex items-center justify-center">
            <h2 className="text-white text-4xl">Próxima Seção...</h2>
          </section>

        </main>
      </div>
    </div>
  );
}
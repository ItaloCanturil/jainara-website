"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Manifesto() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // Background Animation
            gsap.to(".manifesto-bg", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom", // Starts when top of section hits bottom of viewport
                    end: "top center",   // Ends when top of section hits center of viewport
                    scrub: true,
                },
                opacity: 1,
                ease: "none",
            });

            // Text Lines Animation
            const lines = gsap.utils.toArray<HTMLElement>(".manifesto-line");
            lines.forEach((line) => {
                gsap.to(line, {
                    scrollTrigger: {
                        trigger: line,
                        start: "top 80%",
                        end: "top 60%",
                        scrub: true,
                    },
                    opacity: 1,
                    x: 0,
                    ease: "power2.out",
                });
            });

            // Subtitle and CTA Animation
            gsap.to([".manifesto-subtitle", ".manifesto-cta"], {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "center center",
                    toggleActions: "play none none reverse",
                },
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="manifesto-section relative z-30 min-h-screen bg-black force-light-text"
        >
            <div className="manifesto-bg absolute inset-0 bg-[#ECEAE5] opacity-0 pointer-events-none z-0"></div>

            <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-24">
                    <div className="max-w-xl">
                        <span className="manifesto-subtitle block font-sans text-xs tracking-widest uppercase mb-6 md:mb-12 text-[#1a1a1a]/60 opacity-0 translate-y-4">
                            Filosofia
                        </span>
                        <h2 className="font-(family-name:--font-playfair) text-3xl md:text-6xl leading-[1.2] text-[#1a1a1a]">
                            <span className="manifesto-line block opacity-10 translate-x-[-20px] will-change-[opacity,transform]">
                                Arquitetura não é apenas
                            </span>
                            <span className="manifesto-line block opacity-10 translate-x-[-20px] will-change-[opacity,transform]">
                                sobre construir espaços,
                            </span>
                            <span className="manifesto-line block opacity-10 translate-x-[-20px] will-change-[opacity,transform]">
                                é sobre criar
                            </span>
                            <span className="manifesto-line block opacity-10 translate-x-[-20px] will-change-[opacity,transform]">
                                memórias tangíveis.
                            </span>
                            <span className="manifesto-line block opacity-10 translate-x-[-20px] will-change-[opacity,transform] pt-4 md:pt-8">
                                Cada textura conta
                            </span>
                            <span className="manifesto-line block opacity-10 translate-x-[-20px] will-change-[opacity,transform]">
                                uma história única.
                            </span>
                        </h2>

                        <button className="manifesto-cta mt-8 md:mt-16 px-8 py-3 border border-[#1a1a1a] rounded-full text-sm font-medium hover:bg-[#1a1a1a] hover:text-[#ECEAE5] transition-colors opacity-0 translate-y-4 text-[#1a1a1a] cursor-pointer">
                            Conheça o Processo
                        </button>
                    </div>
                </div>

                <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen md:sticky md:top-0 overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
                        alt="Architectural Detail"
                        fill
                        className="object-cover grayscale-20 contrast-[1.1]"
                    />
                </div>
            </div>
        </section>
    );
}

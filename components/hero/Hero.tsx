"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import SocialProof from "./SocialProof";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridItems = Array.from({ length: 9 }, (_, i) => i);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=1500px",
                    pin: true,
                    scrub: 1,
                },
            });

            gsap.set(".draw", { strokeDasharray: 1200, strokeDashoffset: 1200 });
            gsap.to(".draw", {
                strokeDashoffset: 0,
                duration: 2.2,
                ease: "power2.out",
                stagger: 0.3,
                repeat: -1,
                repeatDelay: 1,
            });

            gsap.to(".scroll-indicator", {
                y: 10,
                opacity: 1,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            tl.to([".scroll-indicator", ".profile-svg-overlay"], {
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
            }, 0);

            tl.fromTo(
                ".grid-center-image",
                {
                    scale: 3,
                    opacity: 1,
                    filter: "blur(0px)",
                },
                {
                    scale: 1,
                    duration: 3,
                    ease: "power2.inOut",
                }
            );

            tl.fromTo(
                ".grid-item-project",
                {
                    scale: 0.5,
                    autoAlpha: 0,
                    y: 50,
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
                        from: "center",
                    },
                },
                "-=1"
            );
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="hero-container h-screen w-full relative overflow-hidden"
        >
            <section className="hero w-full h-full relative flex items-center justify-center">
                <div className="grid-layer absolute z-20 w-full max-w-4xl p-4 aspect-square max-h-[80vh]">
                    <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full h-full">
                        {gridItems.map((index) => {
                            const isCenter = index === 4;

                            if (isCenter) {
                                return (
                                    <div
                                        key={index}
                                        className="relative w-full h-full flex items-center justify-center z-20"
                                    >
                                        <div className="profile-svg-overlay absolute -top-48 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none">
                                            <svg
                                                width="320"
                                                height="320"
                                                viewBox="0 0 320 320"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-24 h-24 opacity-100"
                                            >
                                                <path
                                                    className="draw"
                                                    d="M190 40 L190 200 C190 255 150 280 115 280 C65 280 40 235 40 200 C40 150 95 130 150 130 L260 120"
                                                    stroke="#E7CFCF"
                                                    strokeWidth="10"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />

                                                <path
                                                    className="draw"
                                                    d="M235 120 L235 205 C235 245 260 260 290 250"
                                                    stroke="#E7CFCF"
                                                    strokeWidth="10"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />

                                                <path
                                                    className="draw"
                                                    d="M190 40 L135 95"
                                                    stroke="#E7CFCF"
                                                    strokeWidth="10"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </div>

                                        <div className="grid-center-image w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                                            <Image
                                                src="/profile.jpg"
                                                alt="Jainara"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <SocialProof />
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        key={index}
                                        className="grid-item-project w-full h-full bg-zinc-800 rounded-xl overflow-hidden border border-white/10 opacity-0 relative z-20 group cursor-pointer"
                                    >
                                        <Image
                                            src={`https://picsum.photos/400?random=${index}`}
                                            alt="Projeto"
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">
                                                Ver Projeto
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 right-4 z-30 text-white/40 group-hover:text-white transition-all duration-300">
                                            <ArrowUpRight size={18} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>

                <div
                    className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer mix-blend-difference"
                    onClick={() => {
                        window.scrollTo({
                            top: window.innerHeight * 0.5,
                            behavior: "smooth",
                        });
                    }}
                >
                    <div className="css-15qlg6s">
                        <div className="css-1luy0l">
                            <svg width="30" height="30" viewBox="0 0 44 44" fill="none">
                                <circle
                                    cx="22"
                                    cy="22"
                                    r="20.5"
                                    stroke="white"
                                    strokeWidth="3"
                                ></circle>
                                <path
                                    d="M23.4516 10L23.4516 28.5189L30 21.9351L32 23.9135L21.9677 34L12 23.9135L14 21.9351L20.5484 28.5514L20.5484 10L23.4516 10Z"
                                    fill="white"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PROCESS_STEPS = [
    { title: "Briefing", desc: "Compreensão profunda das necessidades e desejos do cliente." },
    { title: "Estudo Preliminar", desc: "Definição de volumetria, layout e conceito inicial do projeto." },
    { title: "Anteprojeto", desc: "Especificação de materiais, texturas e detalhamento visual." },
    { title: "Projeto Executivo", desc: "Todos os detalhes técnicos para garantir a execução perfeita." },
    { title: "Acompanhamento", desc: "Gestão da obra para assegurar fidelidade ao design proposto." }
];

export default function Process() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // Line Fill Animation
            gsap.to(".process-line-fill", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                },
                height: "100%",
                ease: "none",
            });

            // Steps Animation
            const steps = gsap.utils.toArray<HTMLElement>(".process-step");
            steps.forEach((step) => {
                const connector = step.querySelector(".process-connector");
                const content = step.querySelector(".process-step-content");

                const tlStep = gsap.timeline({
                    scrollTrigger: {
                        trigger: step,
                        start: "top 60%", // When step hits 60% of viewport
                        toggleActions: "play none none reverse",
                    },
                });

                tlStep
                    .to(connector, { scaleX: 1, duration: 0.5, ease: "power2.out" })
                    .to(
                        content,
                        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                        "-=0.2"
                    );
            });

            // CTA Animation
            const tlCTA = gsap.timeline({
                scrollTrigger: {
                    trigger: ".process-cta-container",
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            });

            tlCTA
                .to(".process-arrow", {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                })
                .to(
                    ".process-btn",
                    { scale: 1, duration: 0.6, ease: "back.out(1.7)" },
                    "-=0.2"
                );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="process-section relative min-h-[150vh] bg-zinc-50 pt-32 pb-64 overflow-hidden"
        >
            <div className="absolute top-0 left-8 md:left-1/2 w-[2px] h-full bg-zinc-200">
                <div className="process-line-fill w-full h-0 bg-black origin-top"></div>
            </div>

            <div className="container mx-auto px-12 md:px-24 relative z-10">
                <h2 className="text-4xl md:text-5xl font-(family-name:--font-playfair) text-[#1a1a1a] mb-24 md:text-center ml-8 md:ml-0">
                    Processo de Trabalho
                </h2>

                <div className="process-steps flex flex-col space-y-48">
                    {PROCESS_STEPS.map((step, index) => (
                        <div
                            key={index}
                            className={`process-step relative flex ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                                } w-full items-center`}
                        >
                            <div
                                className={`
                         absolute 
                         left-8 md:left-1/2 
                         w-12 md:w-24 
                         h-[1px] 
                         bg-black 
                         process-connector
                         ${index % 2 === 0
                                        ? "origin-left"
                                        : "md:origin-right origin-left"
                                    }
                         ${index % 2 === 0 ? "" : "md:-translate-x-full"}
                         scale-x-0
                       `}
                            ></div>

                            <div
                                className={`
                         process-step-content opacity-0 translate-y-8
                         w-full md:w-[40%] 
                         pl-24 md:pl-0
                         ${index % 2 === 0
                                        ? "md:pl-32 text-left"
                                        : "md:pr-32 md:text-right"
                                    }
                       `}
                            >
                                <span className="text-xs font-bold tracking-widest text-zinc-400 block mb-2">
                                    0{index + 1}
                                </span>
                                <h3 className="text-2xl font-(family-name:--font-playfair) text-[#1a1a1a] mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-600 font-sans leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="process-cta-container relative flex flex-col items-center justify-center mt-32 md:mt-48 ml-8 md:ml-0">
                    <div className="process-arrow opacity-0 transform -translate-y-4 mb-4">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-black"
                        >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <polyline points="19 12 12 19 5 12"></polyline>
                        </svg>
                    </div>

                    <button className="process-btn scale-0 bg-green-700 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-green-800 transition-colors shadow-xl flex items-center gap-3 cursor-pointer">
                        <span>Iniciar Projeto pelo WhatsApp</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}

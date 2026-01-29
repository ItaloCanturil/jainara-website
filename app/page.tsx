"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ArrowUpRight } from "lucide-react";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

const gridItems = Array.from({ length: 9 }, (_, i) => i);

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

      gsap.set(".draw", { strokeDasharray: 1200, strokeDashoffset: 1200 });

      gsap.to(".draw", {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: "power2.out",
        stagger: 0.3,
        repeat: -1,
        repeatDelay: 1
      });

      gsap.to(".scroll-indicator", {
        y: 10,
        opacity: 1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });


      tl.to([".scroll-indicator", ".profile-svg-overlay"], {
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
      }, 0);

      /* tl.to(".hero__cover-img", {
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
        }, "<"); */

      tl.fromTo(".grid-center-image",
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
        "-=1"
      );

      gsap.to(".manifesto-bg", {
        scrollTrigger: {
          trigger: ".manifesto-section",
          start: "top bottom", // Starts when top of section hits bottom of viewport
          end: "top center",   // Ends when top of section hits center of viewport
          scrub: true,
        },
        opacity: 1,
        ease: "none"
      });

      const lines = gsap.utils.toArray<HTMLElement>(".manifesto-line");
      lines.forEach((line) => {
        gsap.to(line, {
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            end: "top 60%",
            scrub: true,
            // markers: true, // debug
          },
          opacity: 1,
          x: 0,
          ease: "power2.out"
        });
      });

      gsap.to([".manifesto-subtitle", ".manifesto-cta"], {
        scrollTrigger: {
          trigger: ".manifesto-section",
          start: "center center",
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      });

      gsap.to(".process-line-fill", {
        scrollTrigger: {
          trigger: ".process-section",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
        height: "100%",
        ease: "none"
      });

      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      steps.forEach((step) => {
        const connector = step.querySelector(".process-connector");
        const content = step.querySelector(".process-step-content");
        const tlStep = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 60%", // When step hits 60% of viewport
            toggleActions: "play none none reverse"
          }
        });

        tlStep.to(connector, { scaleX: 1, duration: 0.5, ease: "power2.out" })
          .to(content, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2");
      });

      const tlCTA = gsap.timeline({
        scrollTrigger: {
          trigger: ".process-cta-container",
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      tlCTA.to(".process-arrow", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
        .to(".process-btn", { scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.2");


    },
    { scope: mainRef }
  );



  return (
    <div id="smooth-wrapper" ref={mainRef}>
      <div id="smooth-content">
        <main className="min-h-screen bg-black font-sans">

          <div className="hero-container h-screen w-full relative overflow-hidden">
            <section className="hero w-full h-full relative flex items-center justify-center">

              {/* <div className="hero__bg absolute inset-0 z-0">
                <Image
                  src="/hero-bg.png"
                  alt="Hero Background"
                  fill
                  className="object-cover blur-[3px] brightness-150"
                  priority
                  quality={90}
                />
              </div> */}

              <div className="grid-layer absolute z-20 w-full max-w-4xl p-4 aspect-square max-h-[80vh]">

                <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full h-full">
                  {gridItems.map((index) => {
                    const isCenter = index === 4;

                    if (isCenter) {
                      return (
                        <div key={index} className="relative w-full h-full flex items-center justify-center z-20">

                          <div className="profile-svg-overlay absolute -top-48 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none">
                            <svg
                              width="320"
                              height="320"
                              viewBox="0 0 320 320"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-24 h-24 opacity-100" // Sized as logo
                            >
                              {/* Main stroke */}
                              <path
                                className="draw"
                                d="M190 40 L190 200 C190 255 150 280 115 280 C65 280 40 235 40 200 C40 150 95 130 150 130 L260 120"
                                stroke="#E7CFCF"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />

                              {/* Right vertical stroke */}
                              <path
                                className="draw"
                                d="M235 120 L235 205 C235 245 260 260 290 250"
                                stroke="#E7CFCF"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />

                              {/* Top diagonal */}
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
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className="grid-item-project w-full h-full bg-zinc-800 rounded-xl overflow-hidden border border-white/10 opacity-0 relative z-20 group cursor-pointer">
                          <Image
                            src={`https://picsum.photos/400?random=${index}`}
                            alt="Projeto"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-bold">Ver Projeto</span>
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
                  window.scrollTo({ top: window.innerHeight * 0.5, behavior: "smooth" });
                }}
              >
                <div className="css-15qlg6s">
                  <div className="css-1luy0l">
                    <svg width="30" height="30" viewBox="0 0 44 44" fill="none">
                      <circle cx="22" cy="22" r="20.5" stroke="white" strokeWidth="3"></circle>
                      <path d="M23.4516 10L23.4516 28.5189L30 21.9351L32 23.9135L21.9677 34L12 23.9135L14 21.9351L20.5484 28.5514L20.5484 10L23.4516 10Z" fill="white"></path>
                    </svg>
                  </div>
                </div>
              </div>

            </section>
          </div>


          <section className="manifesto-section relative z-30 min-h-screen bg-black force-light-text">
            <div className="manifesto-bg absolute inset-0 bg-[#ECEAE5] opacity-0 pointer-events-none z-0"></div>

            <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
              <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-24">
                <div className="max-w-xl">
                  <span className="manifesto-subtitle block font-sans text-xs tracking-widest uppercase mb-6 md:mb-12 text-[#1a1a1a]/60 opacity-0 translate-y-4">Filosofia</span>
                  <h2 className="font-(family-name:--font-playfair) text-3xl md:text-6xl leading-[1.2] text-[#1a1a1a]">
                    <span className="manifesto-line block opacity-10 translate-x-[-20px] will-change-[opacity,transform]">Arquitetura não é apenas</span>
                    <span className="manifesto-line block opacity-10 translate-x-[-20px] will-change-[opacity,transform]">sobre construir espaços,</span>
                    <span className="manifesto-line block opacity-10 translate-x-[-20px] will-change-[opacity,transform]">é sobre criar</span>
                    <span className="manifesto-line block opacity-10 translate-x-[-20px] will-change-[opacity,transform]">memórias tangíveis.</span>
                    <span className="manifesto-line block opacity-10 translate-x-[-20px] will-change-[opacity,transform] pt-4 md:pt-8">Cada textura conta</span>
                    <span className="manifesto-line block opacity-10 translate-x-[-20px] will-change-[opacity,transform]">uma história única.</span>
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

          <section className="process-section relative min-h-[150vh] bg-zinc-50 pt-32 pb-64 overflow-hidden">

            <div className="absolute top-0 left-8 md:left-1/2 w-[2px] h-full bg-zinc-200">
              <div className="process-line-fill w-full h-0 bg-black origin-top"></div>
            </div>

            <div className="container mx-auto px-12 md:px-24 relative z-10">
              <h2 className="text-4xl md:text-5xl font-(family-name:--font-playfair) text-[#1a1a1a] mb-24 md:text-center ml-8 md:ml-0">
                Processo de Trabalho
              </h2>

              <div className="process-steps flex flex-col space-y-48">
                {[
                  { title: "Briefing", desc: "Compreensão profunda das necessidades e desejos do cliente." },
                  { title: "Estudo Preliminar", desc: "Definição de volumetria, layout e conceito inicial do projeto." },
                  { title: "Anteprojeto", desc: "Especificação de materiais, texturas e detalhamento visual." },
                  { title: "Projeto Executivo", desc: "Todos os detalhes técnicos para garantir a execução perfeita." },
                  { title: "Acompanhamento", desc: "Gestão da obra para assegurar fidelidade ao design proposto." }
                ].map((step, index) => (
                  <div key={index} className={`process-step relative flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} w-full items-center`}>

                    <div className={`
                         absolute 
                         left-8 md:left-1/2 
                         w-12 md:w-24 
                         h-[1px] 
                         bg-black 
                         process-connector
                         ${index % 2 === 0 ? 'origin-left' : 'md:origin-right origin-left'}
                         ${index % 2 === 0 ? '' : 'md:-translate-x-full'}
                         scale-x-0
                       `}></div>

                    <div className={`
                         process-step-content opacity-0 translate-y-8
                         w-full md:w-[40%] 
                         pl-24 md:pl-0
                         ${index % 2 === 0 ? 'md:pl-32 text-left' : 'md:pr-32 md:text-right'}
                       `}>
                      <span className="text-xs font-bold tracking-widest text-zinc-400 block mb-2">0{index + 1}</span>
                      <h3 className="text-2xl font-(family-name:--font-playfair) text-[#1a1a1a] mb-2">{step.title}</h3>
                      <p className="text-zinc-600 font-sans leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="process-cta-container relative flex flex-col items-center justify-center mt-32 md:mt-48 ml-8 md:ml-0">
                <div className="process-arrow opacity-0 transform -translate-y-4 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>

                <button className="process-btn scale-0 bg-green-700 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-green-800 transition-colors shadow-xl flex items-center gap-3 cursor-pointer">
                  <span>Iniciar Projeto pelo WhatsApp</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </button>
              </div>
            </div>

          </section>

        </main>
      </div>
    </div>
  );
}
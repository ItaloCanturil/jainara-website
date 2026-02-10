"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const phrases = [
    "Jainara Tavares",
    "Mais de 100 familias felizes",
    "Projetos em toda regiao do vale do Sao Francisco",
];

export default function SocialProof() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                repeat: -1,
                onRepeat: () => {
                    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
                },
            });

            tl.to(textRef.current, {
                opacity: 1,
                duration: 1,
                ease: "power2.inOut",
            })
                .to(textRef.current, {
                    opacity: 0,
                    duration: 1,
                    delay: 3,
                    ease: "power2.inOut",
                });
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="absolute top-full mt-28 flex flex-col items-center justify-center text-center"
        >
            <p
                ref={textRef}
                className="text-white/80 text-xs sm:text-sm font-light tracking-wider uppercase opacity-0 w-2xs"
            >
                {phrases[currentPhraseIndex]}
            </p>
        </div>
    );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

/** Hero 슬라이드 이미지 목록 */
const HERO_SLIDES = [
  { src: "/images/hero/slide-1.png", alt: "한국 전통 한옥 마당" },
  { src: "/images/hero/slide-2.jpg", alt: "한국 대나무숲 설경" },
  { src: "/images/hero/slide-3.jpg", alt: "한국 해안 등대 일몰" },
  { src: "/images/hero/slide-4.png", alt: "한국 자연 풍경" },
  { src: "/images/hero/slide-5.jpg", alt: "한국 전통 음식 문화" },
];

const SLIDE_DURATION = 6000;

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Slideshow - CSS transitions for reliability */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: index === currentSlide ? 1 : 0 }}
          >
            {/* Fill layer (blurred) - keeps hero feeling full even when main image is contain */}
            <img
              src={slide.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover blur-xl scale-110"
              decoding="async"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-black/10"
            />

            {/* Main layer (not cropped) */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full object-contain"
              decoding="async"
            />
          </div>
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 flex flex-col items-center gap-8 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs md:text-sm tracking-[0.4em] uppercase text-stone-300 font-light"
        >
          Curated Heritage Travel
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
        >
          Heritage Atelier
          <br />
          <span className="italic">Korea</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-base md:text-lg font-light text-stone-200 tracking-wide max-w-md leading-relaxed"
        >
          Not loud. Not everywhere. Not for everyone.
          <br />
          For travelers with taste.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/80 text-white hover:bg-white hover:text-stone-900 px-10 py-6 text-sm tracking-[0.3em] uppercase transition-all duration-500"
          >
            <Link href="/collections">Explore the Ateliers</Link>
          </Button>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-4">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-[1px] transition-all duration-500 cursor-pointer ${index === currentSlide
              ? "w-12 bg-white/90"
              : "w-6 bg-white/30 hover:bg-white/50"
              }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
            type="button"
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/30 text-xs tracking-[0.2em] uppercase"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-light">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}

// src/components/sections/SocialProof.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ParticleBackground from "./social-proof/ParticleBackground";
import ClientLogos from "./social-proof/ClientLogos";
import TestimonialCarousel from "./social-proof/TestimonialCarousel";
import TrustIndicators from "./social-proof/TrustIndicators";
import WavePattern from "@/components/illustrations/WavePattern";
import { cn } from "@/utils/cn";
import AnimatedText from "@/components/ui/AnimatedText";

export default function SocialProof() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Hiệu ứng parallax khi scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  const smoothY = useSpring(y, { damping: 20, stiffness: 100 });
  const smoothOpacity = useSpring(opacity, { damping: 20, stiffness: 100 });
  const smoothScale = useSpring(scale, { damping: 20, stiffness: 100 });

  // Kiểm tra chế độ giảm chuyển động
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // ParticleBackground được tách thành client component riêng

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-background to-background-dark relative overflow-hidden"
    >
      {/* Particle Effect - bây giờ được tách thành client component */}
      <ParticleBackground reducedMotion={reducedMotion} />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <WavePattern
          className="absolute bottom-0 w-full h-64 opacity-[0.15]"
          animate={!reducedMotion}
          preserveAspectRatio="none"
        />

        {/* Decorative circles */}
        <motion.div
          className="absolute -left-20 top-1/3 w-80 h-80 rounded-full bg-gradient-radial from-primary-100/20 to-transparent"
          style={{
            y: smoothY,
            opacity: smoothOpacity,
            scale: smoothScale,
          }}
        />

        <motion.div
          className="absolute -right-20 bottom-1/4 w-96 h-96 rounded-full bg-gradient-radial from-accent/10 to-transparent"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [-30, 30]),
            opacity: smoothOpacity,
            scale: smoothScale,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-block mb-3 px-4 py-1 bg-accent/10 rounded-full text-accent text-sm font-medium">
            <span className="inline-block mr-2">✦</span>
            Khách hàng của chúng tôi
            <span className="inline-block ml-2">✦</span>
          </div>

          <AnimatedText
            text="Được Tin Dùng Bởi Các Nhà Sản Xuất Hàng Đầu"
            tag="h2"
            className="mb-4 text-primary font-bold"
            animation={reducedMotion ? "fade" : "slide-up"}
            delay={0.1}
            highlightWords={["Tin Dùng"]}
            highlightStyle="color"
            highlightColor="var(--color-accent)"
          />

          <AnimatedText
            text="Hàng trăm doanh nghiệp dệt may đã và đang sử dụng giải pháp của chúng tôi để nâng cao hiệu suất vận hành và chất lượng sản phẩm."
            tag="p"
            className="text-text-light max-w-2xl mx-auto"
            animation={reducedMotion ? "fade" : "fade-in"}
            delay={0.3}
          />

          {/* Divider decorative */}
          <div className="flex items-center justify-center mt-8 mb-8">
            <div className="w-12 h-[1px] bg-primary/20"></div>
            <div className="mx-3 text-accent">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="w-12 h-[1px] bg-primary/20"></div>
          </div>
        </motion.div>

        <ClientLogos reducedMotion={reducedMotion} />

        <TestimonialCarousel reducedMotion={reducedMotion} />

        <TrustIndicators reducedMotion={reducedMotion} />
      </div>

      {/* Reduced Motion Toggle for Accessibility */}
      <div className="absolute bottom-4 right-4 z-10">
        <motion.button
          onClick={() => setReducedMotion(!reducedMotion)}
          className={cn(
            "p-2 rounded-full text-xs backdrop-blur-md border border-primary/10",
            reducedMotion
              ? "bg-primary/10 text-primary"
              : "bg-background-light/70 text-text-light hover:bg-background-light hover:text-primary",
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={reducedMotion ? "Bật hiệu ứng" : "Giảm hiệu ứng"}
          title={reducedMotion ? "Bật hiệu ứng" : "Giảm hiệu ứng"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1 }}
        >
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: reducedMotion ? 0 : 360 }}
            transition={{ duration: 1, repeat: reducedMotion ? 0 : Infinity, ease: "linear" }}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </motion.svg>
        </motion.button>
      </div>
    </section>
  );
}

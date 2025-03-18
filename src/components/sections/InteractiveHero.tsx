// src/components/sections/InteractiveHero.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimation } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons/BasicIcons";
import { debounce } from "@/utils/cn";
import { SewingMachineIcon, WashingMachineIcon } from "@/components/icons/CssAnimatedIcons";
import WavePattern from "@/components/illustrations/WavePattern";
import AnimatedText from "@/components/ui/AnimatedText";

// Simple Particle Component for decorative particles
const Particle = ({ className }: { className?: string }) => {
  const randomX = Math.random() * 100 - 50; // -50 to 50
  const randomY = Math.random() * 100 - 50; // -50 to 50
  const randomDelay = Math.random() * 5;
  const randomDuration = 15 + Math.random() * 15; // 15-30 seconds
  const randomSize = 2 + Math.random() * 4; // 2-6px

  return (
    <motion.div
      className={cn("absolute rounded-full bg-primary-200/30 backdrop-blur-sm", className)}
      style={{
        width: randomSize,
        height: randomSize,
      }}
      animate={{
        x: [0, randomX],
        y: [0, randomY],
      }}
      transition={{
        x: {
          duration: randomDuration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: randomDelay,
        },
        y: {
          duration: randomDuration * 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: randomDelay + 1,
        },
      }}
    />
  );
};

// Animated Stat Counter
const StatCounter = ({
  value,
  suffix = "",
  prefix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
}) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const startCounting = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay },
      });

      // Animación de conteo
      let startTime: number;
      const duration = 2000; // 2 segundos para la animación

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * value));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };

      window.requestAnimationFrame(step);
    };

    startCounting();
  }, [value, controls, delay]);

  return (
    <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={controls}>
      <h3 className="text-3xl md:text-4xl font-bold text-background-light">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </h3>
      <motion.span className="text-background-light/70 text-sm mt-1 block">{label}</motion.span>
    </motion.div>
  );
};

// Animated scroll indicator component
function AnimatedScrollIndicator({ show }: { show: boolean }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : 10,
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="text-background-light/70 text-xs mb-2 font-medium block"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Cuộn xuống
      </motion.span>
      <motion.div
        className="w-6 h-10 border-2 border-background-light/30 rounded-full flex justify-center"
        animate={{ y: [0, 4, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <motion.div
          className="w-1.5 h-3 bg-accent rounded-full mt-2"
          animate={{
            y: [0, 4, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// Renderiza partículas solo en el cliente para evitar problemas de hidratación
const ClientOnlyParticles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const particles = [];
  const particleCount = 12;

  for (let i = 0; i < particleCount; i++) {
    particles.push(<Particle key={i} className="z-10" />);
  }

  return <>{particles}</>;
};

// Interactive Hero Section Component
export default function InteractiveHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroHeight, setHeroHeight] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Animation values for parallax effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, heroHeight || 1000], [0, (heroHeight || 1000) * 0.3]);
  const y2 = useTransform(scrollY, [0, heroHeight || 1000], [0, (heroHeight || 1000) * 0.2]);
  const y3 = useTransform(scrollY, [0, heroHeight || 1000], [0, (heroHeight || 1000) * 0.1]);

  // Values for the gradient overlay
  const overlayOpacity = useTransform(scrollY, [0, (heroHeight || 1000) * 0.5], [0.1, 0.5]);

  // Spring physics for smoother animations
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 });
  const springOverlayOpacity = useSpring(overlayOpacity, { stiffness: 100, damping: 30 });

  // Handle window resize to update hero height for parallax calculations
  useEffect(() => {
    setIsMounted(true);

    const updateHeroHeight = () => {
      if (heroRef.current) {
        setHeroHeight(heroRef.current.offsetHeight);
      }
    };

    updateHeroHeight();

    const debouncedUpdateHeroHeight = debounce(updateHeroHeight, 200);
    window.addEventListener("resize", debouncedUpdateHeroHeight);

    // Handle scroll to hide the scroll indicator
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("resize", debouncedUpdateHeroHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.section
      ref={heroRef}
      className="relative overflow-hidden w-full min-h-[92vh] flex flex-col items-center justify-center pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background layer with gradient & patterns */}
      <motion.div className="absolute inset-0 w-full h-full z-0" style={{ y: springY1 }}>
        {/* Base background color/image */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700"></div>

        {/* Animated mesh gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-primary-600/30 to-transparent"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        ></motion.div>

        {/* Wave pattern background - Solo se renderiza en el cliente */}
        {isMounted && (
          <WavePattern
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            animate={true}
            preserveAspectRatio="xMidYMid slice"
          />
        )}

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('/api/placeholder/20/20')] bg-repeat opacity-5"></div>

        {/* Particles positioned absolutely - Solo se renderizan en el cliente */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ClientOnlyParticles />
        </div>
      </motion.div>

      {/* Midground decorative elements */}
      <motion.div
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        style={{ y: springY2 }}
      >
        {/* Abstract shapes */}
        <motion.div
          className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-primary-200/10 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        ></motion.div>

        {/* Decorative icons - Solo se renderizan cuando el componente está montado */}
        {isMounted && (
          <>
            <motion.div
              className="absolute top-1/3 right-[10%] opacity-20 hidden md:block"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <SewingMachineIcon
                size={180}
                color="rgba(255,255,255,0.4)"
                secondaryColor="var(--color-accent)"
              />
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 left-[15%] opacity-20 hidden md:block"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <WashingMachineIcon
                size={150}
                color="rgba(255,255,255,0.4)"
                secondaryColor="var(--color-accent)"
              />
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Foreground content */}
      <motion.div
        className="relative z-20 container mx-auto px-4 sm:px-6 flex flex-col items-center"
        style={{ y: springY3 }}
      >
        {/* Main content container */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Pre-headline */}
          <AnimatedText
            text="GIẢI PHÁP MAY MẶC & GIẶT LÀ CÔNG NGHIỆP"
            tag="div" // Cambiado de p a div para evitar problemas de anidación
            className="text-accent font-medium tracking-wider mb-4 text-lg sm:text-xl"
            animation="slide-up"
            delay={0.2}
            duration={0.5}
            staggerChildren={false}
          />

          {/* Main headline with animated highlight */}
          <div className="mb-6">
            <AnimatedText
              text="Nâng tầm doanh nghiệp với công nghệ hiện đại"
              tag="h1"
              className="text-background-light font-heading font-bold text-4xl sm:text-5xl md:text-6xl leading-tight"
              animation="reveal"
              highlightWords={["doanh nghiệp", "công nghệ"]}
              highlightStyle="color-underline"
              delay={0.5}
              duration={0.6}
              staggerChildren={true}
              staggerDelay={0.05}
            />
          </div>

          {/* Subheadline with staggered fade-in */}
          <AnimatedText
            text="Tối ưu hóa quá trình sản xuất, nâng cao chất lượng sản phẩm và giảm thiểu chi phí với hệ thống tự động hoàn toàn."
            tag="div" // Cambiado de p a div para evitar problemas de anidación
            className="text-background-light/80 text-lg sm:text-xl md:text-2xl mb-8"
            animation="fade"
            delay={1.2}
            duration={0.6}
            staggerChildren={false}
          />

          {/* Stats counter section - Solo se renderiza cuando el componente está montado */}
          {isMounted && (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-6 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <StatCounter value={200} suffix="+" label="Khách hàng" delay={2.0} />
              <StatCounter value={95} suffix="%" label="Tỷ lệ hài lòng" delay={2.2} />
              <StatCounter value={30} suffix="%" label="Tiết kiệm chi phí" delay={2.4} />
              <StatCounter value={24} suffix="/7" label="Hỗ trợ kỹ thuật" delay={2.6} />
            </motion.div>
          )}

          {/* CTA section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {/* Primary CTA with pulse animation */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.5 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-accent hover:bg-accent-dark text-background-light font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
              >
                <span className="mr-2">Yêu cầu tư vấn</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    duration: 0.5,
                  }}
                >
                  <ArrowRightIcon size={20} />
                </motion.span>
              </Link>

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-lg opacity-0 bg-accent blur-md"
                whileHover={{ opacity: 0.4, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              ></motion.div>
            </motion.div>

            {/* Secondary CTA with hover reveal */}
            <motion.div
              className="relative overflow-hidden group"
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0, duration: 0.5 }}
            >
              <Link
                href="/services"
                className="inline-flex items-center justify-center bg-transparent border-2 border-background-light/30 hover:border-background-light text-background-light font-medium px-6 py-[10px] rounded-lg transition-all duration-300"
              >
                <span>Khám phá giải pháp</span>
                <motion.span
                  initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                  whileHover={{
                    width: "auto",
                    opacity: 1,
                    marginLeft: 8,
                    transition: { duration: 0.2, delay: 0.1 },
                  }}
                  className="overflow-hidden"
                >
                  <ArrowRightIcon size={20} />
                </motion.span>
              </Link>

              {/* Reveal effect on hover */}
              <motion.div
                className="absolute inset-0 -z-10 bg-background-light/10 translate-y-full"
                whileHover={{ translateY: 0 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.div>
          </div>

          {/* Micro-text below CTAs */}
          <motion.div
            className="text-background-light/60 text-sm mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.5 }}
          >
            Giải pháp dành cho doanh nghiệp vừa và lớn | Hỗ trợ 24/7
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator - Solo se renderiza cuando el componente está montado */}
      {isMounted && <AnimatedScrollIndicator show={showScrollIndicator} />}

      {/* Gradient overlay that changes with scroll */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary-900/0 via-primary/0 to-primary-900/90 pointer-events-none z-30"
        style={{ opacity: springOverlayOpacity }}
      ></motion.div>
    </motion.section>
  );
}

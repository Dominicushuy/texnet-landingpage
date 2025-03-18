// src/components/sections/BenefitsSection.tsx
"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/utils/cn";
import { ArrowRightIcon } from "@/components/icons/BasicIcons";

interface Benefit {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  accentColor?: string;
}

interface BenefitsSectionProps {
  title: string;
  subtitle?: string;
  benefits: Benefit[];
  className?: string;
  showConnectors?: boolean;
  motionIntensity?: "none" | "subtle" | "medium" | "high";
}

// SVG Connector Component
const Connector = ({ active, index }: { active: boolean; index: number }) => {
  const springConfig = { stiffness: 100, damping: 20, restDelta: 0.001 };
  const spring = useSpring(0, springConfig);

  React.useEffect(() => {
    if (active) {
      spring.set(1);
    }
  }, [active, spring]);

  const pathLength = useTransform(spring, [0, 1], [0, 1]);
  const opacity = useTransform(spring, [0, 1], [0.2, 0.6]);

  // Different connector patterns based on index
  const getPath = () => {
    const isEven = index % 2 === 0;
    if (isEven) {
      return "M 0,10 C 50,10 50,90 100,90";
    } else {
      return "M 0,90 C 50,90 50,10 100,10";
    }
  };

  return (
    <motion.svg
      width="100%"
      height="40"
      viewBox="0 0 100 100"
      className="absolute left-0 right-0 -z-10 opacity-70"
      style={{ top: index % 2 === 0 ? "100%" : "-40px" }}
    >
      <motion.path
        d={getPath()}
        fill="none"
        strokeWidth="2"
        stroke="var(--color-accent)"
        style={{
          pathLength,
          opacity,
          strokeDasharray: "0 1",
        }}
      />
      {/* Animated pulse circle */}
      <motion.circle
        cx={index % 2 === 0 ? "100" : "0"}
        cy={index % 2 === 0 ? "90" : "10"}
        r="4"
        fill="var(--color-accent)"
        style={{ opacity }}
        animate={{
          r: [4, 8, 4],
          opacity: [0.7, 0.2, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.2,
        }}
      />
    </motion.svg>
  );
};

// Custom Card Icon with Animation
const AnimatedIcon = ({
  children,
  accentColor = "var(--color-accent)",
}: {
  children: React.ReactNode;
  accentColor?: string;
}) => {
  return (
    <motion.div
      className="p-3 rounded-lg bg-background-light/70 backdrop-blur-sm border border-primary/10 relative mb-6 w-fit"
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {/* Background glow effect */}
      <div
        className="absolute inset-0 rounded-lg opacity-20 filter blur-xl"
        style={{ background: accentColor, zIndex: -1 }}
      />

      {/* Icon with potential animations */}
      <motion.div
        className="text-primary-600"
        style={{ color: accentColor }}
        whileHover={{
          rotate: [0, -5, 5, -5, 0],
          scale: 1.1,
        }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default function BenefitsSection({
  title,
  subtitle,
  benefits,
  className = "",
  showConnectors = true,
  motionIntensity = "medium",
}: BenefitsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Setup scroll-driven animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect on heading
  const headingY = useTransform(scrollYProgress, [0, 1], ["-5%", "20%"]);

  // Grid layout adjustments based on item count
  const gridColsClass =
    benefits.length <= 3
      ? "lg:grid-cols-3"
      : benefits.length === 4
      ? "lg:grid-cols-2 xl:grid-cols-4"
      : "lg:grid-cols-3";

  return (
    <section
      ref={sectionRef}
      className={cn("py-16 md:py-24 lg:py-32 relative overflow-hidden bg-background", className)}
    >
      {/* Background subtle patterns */}
      <div className="absolute inset-0 bg-primary-50/30 -z-10">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-primary-300) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section heading with parallax effect */}
        <motion.div
          ref={headingRef}
          className="text-center max-w-3xl mx-auto mb-16"
          style={{ y: headingY }}
        >
          <ScrollReveal animation="fade-up" motionIntensity={motionIntensity} className="mb-6">
            <h2 className="font-heading text-fluid-h2 text-primary-700 font-bold tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-fluid-p text-text-light mt-4 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </ScrollReveal>
        </motion.div>

        {/* Benefits grid with staggered animation */}
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10", gridColsClass)}>
          {benefits.map((benefit, index) => (
            <div key={benefit.id} className="relative">
              {/* Card element with interactions */}
              <ScrollReveal
                animation="fade-up"
                delay={index * 0.1}
                staggerChildren={true}
                motionIntensity={motionIntensity}
              >
                <Card
                  variant="glass"
                  hoverEffect={true}
                  motionIntensity={motionIntensity}
                  borderGradient="accent"
                  highlightOnHover={true}
                  className="h-full relative group"
                >
                  {/* Card inner content with isolated animations */}
                  <div className="h-full flex flex-col">
                    {/* Animated icon */}
                    <AnimatedIcon accentColor={benefit.accentColor}>{benefit.icon}</AnimatedIcon>

                    {/* Heading with reveal animation */}
                    <h3 className="text-xl font-semibold text-primary-700 mb-3 relative inline-block group-hover:text-primary-800 transition-colors">
                      {benefit.title}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                    </h3>

                    {/* Description with subtle transitions */}
                    <p className="text-text-light mb-6 group-hover:text-text transition-colors duration-300">
                      {benefit.description}
                    </p>

                    {/* Conditional CTA with arrow animation */}
                    {benefit.linkText && benefit.linkHref && (
                      <div className="mt-auto">
                        <motion.a
                          href={benefit.linkHref}
                          className="inline-flex items-center text-accent font-medium hover:text-accent-dark transition-colors"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {benefit.linkText}
                          <motion.span
                            className="ml-2 inline-block"
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                          >
                            <ArrowRightIcon size={18} />
                          </motion.span>
                        </motion.a>
                      </div>
                    )}
                  </div>

                  {/* Hover background pattern effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none -z-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 30px 30px, ${
                        benefit.accentColor || "var(--color-accent)"
                      } 1px, transparent 0)`,
                      backgroundSize: "20px 20px",
                    }}
                  />
                </Card>
              </ScrollReveal>

              {/* Visual connectors between cards */}
              {showConnectors && index < benefits.length - 1 && (
                <Connector active={isInView} index={index} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-in" | "slide-in-left" | "slide-in-right" | "zoom-in" | "scale-up";
  duration?: number;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  threshold?: number;
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  className?: string;
  onReveal?: () => void;
  once?: boolean;
}

export const ScrollReveal = ({
  children,
  animation = "fade-up",
  duration = 0.5,
  delay = 0,
  staggerChildren = false,
  staggerDelay = 0.1,
  threshold = 0.1,
  motionIntensity = "medium",
  className = "",
  onReveal,
  once = true,
}: ScrollRevealProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isAnimationDisabled = motionIntensity === "none";

  // Define animation intensities
  const intensityMultipliers = {
    none: 0,
    subtle: 0.5,
    medium: 1,
    high: 1.5,
  };

  const multiplier = intensityMultipliers[motionIntensity];

  // Define animations
  const animations = {
    "fade-up": {
      hidden: { opacity: 0, y: 30 * multiplier },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration,
          ease: [0.16, 1, 0.3, 1], // Custom ease-out-expo
          delay,
        },
      },
    },
    "fade-in": {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration,
          ease: "easeOut",
          delay,
        },
      },
    },
    "slide-in-left": {
      hidden: { opacity: 0, x: -50 * multiplier },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration,
          ease: [0.16, 1, 0.3, 1],
          delay,
        },
      },
    },
    "slide-in-right": {
      hidden: { opacity: 0, x: 50 * multiplier },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration,
          ease: [0.16, 1, 0.3, 1],
          delay,
        },
      },
    },
    "zoom-in": {
      hidden: { opacity: 0, scale: 0.9 - 0.1 * multiplier },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          ease: [0.16, 1, 0.3, 1],
          delay,
        },
      },
    },
    "scale-up": {
      hidden: { opacity: 0, scale: 0.7 - 0.1 * multiplier },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          ease: [0.34, 1.56, 0.64, 1], // Custom spring-like ease
          delay,
        },
      },
    },
  };

  useEffect(() => {
    if (isAnimationDisabled) {
      controls.set("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            setIsVisible(true);
            controls.start("visible");
            if (onReveal) onReveal();

            if (once) {
              observer.disconnect();
            }
          }
        } else if (!once) {
          setIsVisible(false);
          controls.start("hidden");
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, isVisible, once, onReveal, threshold, isAnimationDisabled]);

  // Apply staggered animation to children
  const renderStaggeredChildren = () => {
    const childArray = React.Children.toArray(children);
    return childArray.map((child, index) => {
      if (!React.isValidElement(child)) return child;

      return (
        <motion.div
          key={index}
          custom={index}
          variants={{
            hidden: { opacity: 0, y: 20 * multiplier },
            visible: (i) => ({
              opacity: 1,
              y: 0,
              transition: {
                delay: delay + i * staggerDelay,
                duration,
                ease: [0.16, 1, 0.3, 1],
              },
            }),
          }}
        >
          {child}
        </motion.div>
      );
    });
  };

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <AnimatePresence>
        <motion.div
          initial={isAnimationDisabled ? "visible" : "hidden"}
          animate={controls}
          variants={staggerChildren ? undefined : animations[animation]}
        >
          {staggerChildren ? renderStaggeredChildren() : children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ScrollReveal;

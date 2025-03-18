// src/components/ui/EnhancedScrollReveal.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useAnimation,
  AnimatePresence,
  MotionConfig,
  Variant,
  Variants,
} from "framer-motion";
import { cn } from "@/utils/cn";

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?:
    | "fade-up"
    | "fade-down"
    | "fade-in"
    | "slide-in-left"
    | "slide-in-right"
    | "zoom-in"
    | "zoom-out"
    | "scale-up"
    | "rotate-in"
    | "flip-x"
    | "flip-y"
    | "bounce"
    | "blur-in"
    | "sweep-in"
    | "glide-in"
    | "spring-up"
    | "swing"
    | "none";
  duration?: number;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  staggerDirection?: "forward" | "reverse";
  threshold?: number;
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  className?: string;
  onReveal?: () => void;
  once?: boolean;
  distance?: number;
  afterAnimation?: "float" | "pulse" | "wiggle" | "glow" | "none";
  cascade?: boolean;
  customClass?: string;
  reverseOnExit?: boolean;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out" | "spring" | "bounce";
  transformOrigin?:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  viewport?: {
    margin?: string;
    amount?: "some" | "all" | number;
  };
  childrenClassName?: string;
  childrenStyle?: React.CSSProperties;
  root?: React.RefObject<Element>;
  resetOnMouseLeave?: boolean;
  containerType?: "inline" | "block" | "flex" | "grid";
  whileHover?: string;
  whileTap?: string;
}

export const EnhancedScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = "fade-up",
  duration = 0.6,
  delay = 0,
  staggerChildren = false,
  staggerDelay = 0.1,
  staggerDirection = "forward",
  threshold = 0.1,
  motionIntensity = "medium",
  className = "",
  onReveal,
  once = true,
  distance = 30,
  afterAnimation = "none",
  cascade = false,
  customClass = "",
  reverseOnExit = false,
  easing = "ease-out",
  transformOrigin = "center",
  viewport,
  childrenClassName = "",
  childrenStyle,
  root,
  resetOnMouseLeave = false,
  containerType = "block",
  whileHover,
  whileTap,
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);
  const isAnimationDisabled = motionIntensity === "none" || animation === "none";

  // Define animation intensities
  const intensityMultipliers = {
    none: 0,
    subtle: 0.6,
    medium: 1,
    high: 1.5,
  };

  const intensityMultiplier = intensityMultipliers[motionIntensity];

  // Define easing functions
  const easingFunctions = {
    linear: [0, 0, 1, 1],
    "ease-in": [0.42, 0, 1, 1],
    "ease-out": [0, 0, 0.58, 1],
    "ease-in-out": [0.42, 0, 0.58, 1],
    spring: [0.16, 1, 0.3, 1], // Custom spring-like easing
    bounce: [0.68, -0.55, 0.27, 1.55], // Bouncy easing
  };

  // Get easing function
  const getEasing = () => {
    if (easing === "spring") {
      return {
        type: "spring",
        damping: 10,
        stiffness: 100,
      };
    } else if (easing === "bounce") {
      return {
        type: "spring",
        damping: 7,
        stiffness: 300,
      };
    } else {
      return {
        type: "tween",
        ease: easingFunctions[easing] || easingFunctions["ease-out"],
        duration,
      };
    }
  };

  // Define animations
  const defineAnimations = (): Variants => {
    // Scale the distance by the intensity
    const scaledDistance = distance * intensityMultiplier;

    // Base animations
    const baseAnimations: Record<string, Variants> = {
      "fade-up": {
        hidden: { opacity: 0, y: scaledDistance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: reverseOnExit ? { opacity: 0, y: scaledDistance } : { opacity: 0 },
      },
      "fade-down": {
        hidden: { opacity: 0, y: -scaledDistance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: reverseOnExit ? { opacity: 0, y: -scaledDistance } : { opacity: 0 },
      },
      "fade-in": {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: { opacity: 0 },
      },
      "slide-in-left": {
        hidden: { opacity: 0, x: -scaledDistance },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: reverseOnExit ? { opacity: 0, x: -scaledDistance } : { opacity: 0 },
      },
      "slide-in-right": {
        hidden: { opacity: 0, x: scaledDistance },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: reverseOnExit ? { opacity: 0, x: scaledDistance } : { opacity: 0 },
      },
      "zoom-in": {
        hidden: { opacity: 0, scale: 0.9 - 0.1 * intensityMultiplier },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: reverseOnExit
          ? { opacity: 0, scale: 0.9 - 0.1 * intensityMultiplier }
          : { opacity: 0 },
      },
      "zoom-out": {
        hidden: { opacity: 0, scale: 1.1 + 0.1 * intensityMultiplier },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: reverseOnExit
          ? { opacity: 0, scale: 1.1 + 0.1 * intensityMultiplier }
          : { opacity: 0 },
      },
      "scale-up": {
        hidden: { opacity: 0, scale: 0.7 - 0.1 * intensityMultiplier },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: reverseOnExit
          ? { opacity: 0, scale: 0.7 - 0.1 * intensityMultiplier }
          : { opacity: 0 },
      },
      "rotate-in": {
        hidden: { opacity: 0, rotate: -45 * intensityMultiplier, scale: 0.9 },
        visible: {
          opacity: 1,
          rotate: 0,
          scale: 1,
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: reverseOnExit
          ? { opacity: 0, rotate: -45 * intensityMultiplier, scale: 0.9 }
          : { opacity: 0 },
      },
      "flip-x": {
        hidden: { opacity: 0, rotateX: 90 * intensityMultiplier },
        visible: {
          opacity: 1,
          rotateX: 0,
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: reverseOnExit ? { opacity: 0, rotateX: 90 * intensityMultiplier } : { opacity: 0 },
      },
      "flip-y": {
        hidden: { opacity: 0, rotateY: 90 * intensityMultiplier },
        visible: {
          opacity: 1,
          rotateY: 0,
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: reverseOnExit ? { opacity: 0, rotateY: 90 * intensityMultiplier } : { opacity: 0 },
      },
      bounce: {
        hidden: { opacity: 0, y: scaledDistance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            damping: 7,
            stiffness: 300,
            delay,
          },
        },
        exit: reverseOnExit ? { opacity: 0, y: scaledDistance } : { opacity: 0 },
      },
      "blur-in": {
        hidden: { opacity: 0, filter: "blur(10px)" },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: reverseOnExit ? { opacity: 0, filter: "blur(10px)" } : { opacity: 0 },
      },
      "sweep-in": {
        hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
        visible: {
          opacity: 1,
          clipPath: "inset(0 0 0 0)",
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: reverseOnExit ? { opacity: 0, clipPath: "inset(100% 0 0 0)" } : { opacity: 0 },
      },
      "glide-in": {
        hidden: { opacity: 0, x: scaledDistance, rotate: 10 * intensityMultiplier },
        visible: {
          opacity: 1,
          x: 0,
          rotate: 0,
          transition: {
            duration,
            ...getEasing(),
            delay,
          },
        },
        exit: reverseOnExit
          ? { opacity: 0, x: scaledDistance, rotate: 10 * intensityMultiplier }
          : { opacity: 0 },
      },
      "spring-up": {
        hidden: { opacity: 0, y: scaledDistance, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            damping: 8,
            stiffness: 200,
            delay,
          },
        },
        exit: reverseOnExit ? { opacity: 0, y: scaledDistance, scale: 0.9 } : { opacity: 0 },
      },
      swing: {
        hidden: { opacity: 0, rotate: -10 * intensityMultiplier, transformOrigin },
        visible: {
          opacity: 1,
          rotate: 0,
          transition: {
            type: "spring",
            damping: 10,
            stiffness: 100,
            delay,
          },
        },
        exit: reverseOnExit
          ? { opacity: 0, rotate: -10 * intensityMultiplier, transformOrigin }
          : { opacity: 0 },
      },
      none: {
        hidden: {},
        visible: {},
        exit: {},
      },
    };

    // Add after-animation effects
    const afterAnimationVariants: Record<string, Variant> = {
      float: {
        y: [0, -10 * intensityMultiplier, 0],
        transition: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        },
      },
      pulse: {
        scale: [1, 1.03 * intensityMultiplier, 1],
        transition: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        },
      },
      wiggle: {
        rotate: [0, -1 * intensityMultiplier, 1 * intensityMultiplier, -1 * intensityMultiplier, 0],
        transition: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        },
      },
      glow: {
        filter: ["brightness(1)", `brightness(${1.1 * intensityMultiplier})`, "brightness(1)"],
        transition: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        },
      },
      none: {},
    };

    // If afterAnimation is specified, add it to the visible state
    if (afterAnimation !== "none") {
      baseAnimations[animation].visible = {
        ...baseAnimations[animation].visible,
        ...afterAnimationVariants[afterAnimation],
      };
    }

    return baseAnimations[animation] || baseAnimations["fade-up"];
  };

  // Define hover and tap animations if provided
  const getInteractionVariants = () => {
    const hoverEffects: Record<string, Variant> = {
      grow: { scale: 1.05 },
      shrink: { scale: 0.95 },
      lift: { y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" },
      glow: { boxShadow: "0 0 15px rgba(255, 107, 53, 0.5)" },
      rotate: { rotate: 5 },
      pulse: {
        scale: [1, 1.05, 1],
        transition: { duration: 0.5, repeat: 1 },
      },
    };

    const tapEffects: Record<string, Variant> = {
      push: { scale: 0.95 },
      bounce: { scale: 0.9, transition: { type: "spring", damping: 5, stiffness: 300 } },
      flash: {
        backgroundColor: [
          "rgba(255, 107, 53, 0)",
          "rgba(255, 107, 53, 0.2)",
          "rgba(255, 107, 53, 0)",
        ],
      },
      pulse: { scale: 0.95 },
      spin: { rotate: 10 },
    };

    return {
      hover: whileHover ? hoverEffects[whileHover] || {} : {},
      tap: whileTap ? tapEffects[whileTap] || {} : {},
    };
  };

  // Get animations based on animation type
  const animations = defineAnimations();
  const interactionAnimations = getInteractionVariants();

  // Apply staggered animation to children
  const getStaggeredVariants = (): Variants => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
        staggerDirection: staggerDirection === "reverse" ? -1 : 1,
      },
    },
    exit: { opacity: 0 },
  });

  // Child animation variants
  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 * intensityMultiplier },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: cascade ? i * staggerDelay + delay : delay,
        duration,
        ...getEasing(),
      },
    }),
    exit: { opacity: 0, y: 10 * intensityMultiplier, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    if (isAnimationDisabled) {
      controls.set("visible");
      setHasBeenRevealed(true);
      if (onReveal && !hasBeenRevealed) onReveal();
      return;
    }

    const observerOptions: IntersectionObserverInit = {
      root: root?.current || null,
      rootMargin: viewport?.margin || "0px",
      threshold: threshold,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!isVisible) {
          setIsVisible(true);
          controls.start("visible");
          setHasBeenRevealed(true);
          if (onReveal && !hasBeenRevealed) onReveal();

          if (once) {
            observer.disconnect();
          }
        }
      } else if (!once) {
        setIsVisible(false);
        if (reverseOnExit) {
          controls.start("exit").then(() => controls.start("hidden"));
        } else {
          controls.start("hidden");
        }
      }
    }, observerOptions);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [
    controls,
    isVisible,
    once,
    onReveal,
    threshold,
    isAnimationDisabled,
    root,
    viewport?.margin,
    reverseOnExit,
    hasBeenRevealed,
  ]);

  // Handle mouse leave for reset animations
  const handleMouseLeave = () => {
    if (resetOnMouseLeave && isVisible && !once) {
      controls.start("hidden").then(() => {
        if (ref.current && ref.current.getBoundingClientRect().top < window.innerHeight) {
          controls.start("visible");
        }
      });
    }
  };

  // Render children with staggered animation
  const renderStaggeredChildren = () => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;

      return (
        <motion.div
          key={index}
          custom={index}
          variants={childVariants}
          className={childrenClassName}
          style={{
            ...childrenStyle,
            willChange: "opacity, transform",
            transformOrigin,
          }}
          whileHover={interactionAnimations.hover}
          whileTap={interactionAnimations.tap}
        >
          {child}
        </motion.div>
      );
    });
  };

  return (
    <MotionConfig reducedMotion={isAnimationDisabled ? "always" : "user"}>
      <div
        ref={ref}
        className={cn(
          containerType === "inline"
            ? "inline"
            : containerType === "flex"
            ? "flex"
            : containerType === "grid"
            ? "grid"
            : "block",
          "overflow-visible",
          className,
          customClass,
        )}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          <motion.div
            className="w-full h-full"
            initial={isAnimationDisabled ? "visible" : "hidden"}
            animate={controls}
            exit={reverseOnExit ? "exit" : undefined}
            variants={staggerChildren ? getStaggeredVariants() : animations}
            whileHover={!staggerChildren ? interactionAnimations.hover : undefined}
            whileTap={!staggerChildren ? interactionAnimations.tap : undefined}
            style={{
              willChange: "opacity, transform",
              transformOrigin,
            }}
          >
            {staggerChildren || cascade ? renderStaggeredChildren() : children}
          </motion.div>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};

export default EnhancedScrollReveal;

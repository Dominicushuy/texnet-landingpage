// src/components/ui/AnimatedText.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimate, stagger, Variants } from "framer-motion";
import { cn } from "@/utils/cn";

// Types for different text animation effects
type AnimationType =
  | "reveal"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "fade"
  | "letter-fade"
  | "word-fade"
  | "typewriter"
  | "blur"
  | "wave";

// Types for highlighting styles
type HighlightStyle =
  | "none"
  | "underline"
  | "color"
  | "color-underline"
  | "background"
  | "glow"
  | "gradient"
  | "strike";

interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  animation?: AnimationType;
  highlightWords?: string[];
  highlightStyle?: HighlightStyle;
  highlightColor?: string;
  secondaryColor?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  animateOnScroll?: boolean;
  threshold?: number;
  repeat?: boolean;
  repeatDelay?: number;
  fillMode?: "forwards" | "backwards" | "both" | "none";
  motionSettings?: Record<string, any>;
  onComplete?: () => void;
}

// Helper function to split text into words and characters with tags
const splitTextIntoSpans = (
  text: string,
  highlightWords: string[] = [],
  highlightStyle: HighlightStyle = "none",
): React.ReactNode[] => {
  // If no highlight words, just wrap each word in a span
  if (highlightWords.length === 0 || highlightStyle === "none") {
    return text.split(" ").map((word, index) => (
      <motion.span
        key={`word-${index}`}
        className="inline-block"
        style={{ display: "inline-block" }}
      >
        {word}
        {index < text.split(" ").length - 1 ? "\u00A0" : ""}
      </motion.span>
    ));
  }

  // Otherwise, highlight matching words
  const words = text.split(" ");
  return words.map((word, index) => {
    const isHighlighted = highlightWords.some((highlight) =>
      word.toLowerCase().includes(highlight.toLowerCase()),
    );

    // Different classes based on highlight style
    let highlightClass = "";
    if (isHighlighted) {
      switch (highlightStyle) {
        case "underline":
          highlightClass = "underline decoration-accent decoration-2 underline-offset-2";
          break;
        case "color":
          highlightClass = "text-accent";
          break;
        case "color-underline":
          highlightClass =
            "text-accent underline decoration-accent decoration-2 underline-offset-2";
          break;
        case "background":
          highlightClass = "bg-accent/10 text-accent px-1 py-0.5 rounded";
          break;
        case "glow":
          highlightClass = "text-accent drop-shadow-[0_0_6px_rgba(255,107,53,0.4)]";
          break;
        case "gradient":
          highlightClass = "bg-clip-text text-transparent bg-gradient-accent";
          break;
        case "strike":
          highlightClass = "line-through decoration-accent decoration-2";
          break;
        default:
          highlightClass = "";
      }
    }

    return (
      <motion.span
        key={`word-${index}`}
        className={cn("inline-block", isHighlighted ? highlightClass : "")}
        data-highlighted={isHighlighted ? "true" : "false"}
        style={{ display: "inline-block" }}
      >
        {word}
        {index < words.length - 1 ? "\u00A0" : ""}
      </motion.span>
    );
  });
};

// Letter by letter animation for effects like wave or typewriter
const splitTextIntoLetters = (text: string): React.ReactNode[] => {
  return text.split("").map((char, index) => (
    <motion.span key={`char-${index}`} className="inline-block" style={{ display: "inline-block" }}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));
};

export default function AnimatedText({
  text,
  className = "",
  tag = "div",
  animation = "reveal",
  highlightWords = [],
  highlightStyle = "color",
  highlightColor = "var(--color-accent)",
  secondaryColor = "var(--color-secondary)",
  delay = 0,
  duration = 0.5,
  staggerChildren = true,
  staggerDelay = 0.03,
  animateOnScroll = false,
  threshold = 0.1,
  repeat = false,
  repeatDelay = 5,
  fillMode = "forwards",
  motionSettings = {},
  onComplete,
}: AnimatedTextProps) {
  const [scope, animate] = useAnimate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine if we're animating words or letters
  const animateLetterByLetter =
    animation === "letter-fade" || animation === "typewriter" || animation === "wave";

  // Prepare animation variants based on selected animation type
  const variants: Variants = {
    hidden: {},
    visible: {},
  };

  switch (animation) {
    case "reveal":
      variants.hidden = { opacity: 0, y: 20 };
      variants.visible = (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: staggerChildren ? i * staggerDelay + delay : delay,
          duration: duration,
          ease: [0.16, 1, 0.3, 1],
        },
      });
      break;

    case "slide-up":
      variants.hidden = { opacity: 0, y: 50 };
      variants.visible = (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: staggerChildren ? i * staggerDelay + delay : delay,
          duration: duration,
          ease: [0.16, 1, 0.3, 1],
        },
      });
      break;

    case "slide-down":
      variants.hidden = { opacity: 0, y: -50 };
      variants.visible = (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: staggerChildren ? i * staggerDelay + delay : delay,
          duration: duration,
          ease: [0.16, 1, 0.3, 1],
        },
      });
      break;

    case "slide-left":
      variants.hidden = { opacity: 0, x: 50 };
      variants.visible = (i) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: staggerChildren ? i * staggerDelay + delay : delay,
          duration: duration,
          ease: [0.16, 1, 0.3, 1],
        },
      });
      break;

    case "slide-right":
      variants.hidden = { opacity: 0, x: -50 };
      variants.visible = (i) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: staggerChildren ? i * staggerDelay + delay : delay,
          duration: duration,
          ease: [0.16, 1, 0.3, 1],
        },
      });
      break;

    case "fade":
      variants.hidden = { opacity: 0 };
      variants.visible = (i) => ({
        opacity: 1,
        transition: {
          delay: staggerChildren ? i * staggerDelay + delay : delay,
          duration: duration,
          ease: "easeOut",
        },
      });
      break;

    case "letter-fade":
      variants.hidden = { opacity: 0 };
      variants.visible = (i) => ({
        opacity: 1,
        transition: {
          delay: i * staggerDelay + delay,
          duration: duration,
          ease: "easeOut",
        },
      });
      break;

    case "word-fade":
      variants.hidden = { opacity: 0, y: 10 };
      variants.visible = (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * staggerDelay + delay,
          duration: duration,
          ease: "easeOut",
        },
      });
      break;

    case "typewriter":
      variants.hidden = { opacity: 0, y: 10, scale: 0.8 };
      variants.visible = (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          delay: i * staggerDelay + delay,
          duration: duration * 0.6,
          ease: [0.16, 1, 0.3, 1],
        },
      });
      break;

    case "blur":
      variants.hidden = { opacity: 0, filter: "blur(10px)" };
      variants.visible = (i) => ({
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          delay: staggerChildren ? i * staggerDelay + delay : delay,
          duration: duration,
          ease: [0.16, 1, 0.3, 1],
        },
      });
      break;

    case "wave":
      variants.hidden = { y: 0 };
      variants.visible = (i) => ({
        y: [0, -15, 0],
        transition: {
          delay: i * staggerDelay + delay,
          duration: duration,
          ease: "easeInOut",
          repeat: repeat ? Infinity : 0,
          repeatDelay: repeatDelay,
        },
      });
      break;
  }

  // Handle scroll-based animation
  useEffect(() => {
    if (!animateOnScroll || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (staggerChildren) {
              animate("span", variants.visible, {
                delay: stagger(staggerDelay, { startDelay: delay }),
              }).then(() => {
                if (onComplete) onComplete();
              });
            } else {
              animate("span", variants.visible, {
                delay: delay,
              }).then(() => {
                if (onComplete) onComplete();
              });
            }
          }
        });
      },
      { threshold },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [
    animate,
    animateOnScroll,
    delay,
    onComplete,
    staggerChildren,
    staggerDelay,
    threshold,
    variants.visible,
  ]);

  // Run animation immediately if not scrolling
  useEffect(() => {
    if (!animateOnScroll && containerRef.current) {
      if (staggerChildren) {
        animate("span", variants.visible, {
          delay: stagger(staggerDelay, { startDelay: delay }),
        }).then(() => {
          if (onComplete) onComplete();
        });
      } else {
        animate("span", variants.visible, {
          delay: delay,
        }).then(() => {
          if (onComplete) onComplete();
        });
      }
    }
  }, [
    animate,
    animateOnScroll,
    delay,
    onComplete,
    staggerChildren,
    staggerDelay,
    variants.visible,
  ]);

  // Split text based on animation type
  const renderedContent = animateLetterByLetter
    ? splitTextIntoLetters(text)
    : splitTextIntoSpans(text, highlightWords, highlightStyle);

  // El elemento wrapper debe ser el mismo tipo que el especificado en tag
  const Component = motion[tag as keyof typeof motion] || motion.div;

  return (
    <Component
      ref={containerRef}
      className={cn("inline-block", className)}
      style={
        {
          "--highlight-color": highlightColor,
          "--secondary-color": secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* 
        En lugar de usar un div dentro del componente, usamos un span 
        para asegurar compatibilidad con elementos como <p>
      */}
      <motion.span ref={scope} className="inline">
        {renderedContent.map((element, i) => {
          if (React.isValidElement(element)) {
            return React.cloneElement(element as React.ReactElement, {
              custom: i,
              variants,
              initial: "hidden",
              animate: !animateOnScroll ? "visible" : "hidden",
              ...motionSettings,
            });
          }
          return element;
        })}
      </motion.span>
    </Component>
  );
}

// src/components/ui/EnhancedCard.tsx
"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  MotionValue,
  useMotionValue,
  useMotionTemplate,
  useTransform,
  useSpring,
  AnimatePresence,
  MotionConfig,
} from "framer-motion";
import { cn } from "@/utils/cn";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "glass" | "bordered" | "gradient" | "minimal";
  hoverEffect?: boolean;
  borderGradient?: "primary" | "secondary" | "accent" | "none";
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  revealOnScroll?: boolean;
  highlightOnHover?: boolean;
  elevation?: "none" | "sm" | "md" | "lg" | "xl";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  interactive?: boolean;
  animateChildren?: boolean;
  noOverflow?: boolean;
  backdrop?: boolean;
  hoverScale?: boolean;
  parallaxDepth?: number;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "landscape";
  contentAlign?: "left" | "center" | "right";
  stackChildren?: boolean;
}

const EnhancedCard = ({
  children,
  className = "",
  variant = "default",
  hoverEffect = true,
  borderGradient = "none",
  motionIntensity = "medium",
  revealOnScroll = false,
  highlightOnHover = true,
  elevation = "md",
  padding = "md",
  rounded = "lg",
  interactive = true,
  animateChildren = false,
  noOverflow = false,
  backdrop = false,
  hoverScale = true,
  parallaxDepth = 0,
  aspectRatio = "auto",
  contentAlign = "left",
  stackChildren = false,
}: CardProps) => {
  // Reference for checking if card is in view
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isHovering, setIsHovering] = useState(false);

  // Disable animations based on motionIntensity
  const isAnimationDisabled = motionIntensity === "none";

  // For mouse tracking effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // For the highlight edge effect
  const highlightOpacity = useMotionValue(0);

  // For the rotation effect with spring physics
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Spring rotation for smoother effect
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  // Motion values for parallax effect on content
  const contentX = useMotionValue(0);
  const contentY = useMotionValue(0);

  // Generate CSS variables for the gradient highlight
  const highlightStyle = useMotionTemplate`linear-gradient(
    to bottom right,
    rgba(255, 255, 255, ${highlightOpacity}) 0%,
    rgba(255, 255, 255, 0) 40%
  )`;

  // Define intensities for motion effects
  const intensityValues = {
    none: { rotate: 0, scale: 1, y: 0, parallax: 0 },
    subtle: { rotate: 0.5, scale: 1.01, y: -2, parallax: 2 },
    medium: { rotate: 1.2, scale: 1.03, y: -4, parallax: 5 },
    high: { rotate: 2, scale: 1.05, y: -6, parallax: 10 },
  };

  // Select intensity values
  const intensity = intensityValues[motionIntensity];
  const parallaxIntensity = parallaxDepth || intensity.parallax;

  // Transform parallax effect based on rotation
  const contentTransformX = useTransform(
    springRotateY,
    [-intensity.rotate, 0, intensity.rotate],
    [parallaxIntensity, 0, -parallaxIntensity],
  );

  const contentTransformY = useTransform(
    springRotateX,
    [-intensity.rotate, 0, intensity.rotate],
    [parallaxIntensity, 0, -parallaxIntensity],
  );

  // Handle mouse movement for card effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimationDisabled || !hoverEffect || !interactive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate position relative to card center (normalized from -1 to 1)
    const xPos = (e.clientX - rect.left) / width - 0.5;
    const yPos = (e.clientY - rect.top) / height - 0.5;

    // Set rotation based on mouse position and intensity
    rotateX.set(-yPos * intensity.rotate * 2);
    rotateY.set(xPos * intensity.rotate * 2);

    // Set highlight opacity
    highlightOpacity.set(highlightOnHover ? (isHovering ? 0.15 : 0) : 0);

    // Set mouse position for advanced effects
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    // Set content parallax position
    contentX.set(xPos * parallaxIntensity);
    contentY.set(yPos * parallaxIntensity);
  };

  // Handle mouse enter
  const handleMouseEnter = () => {
    if (isAnimationDisabled || !interactive) return;
    setIsHovering(true);
    highlightOpacity.set(highlightOnHover ? 0.15 : 0);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (isAnimationDisabled) return;
    setIsHovering(false);

    // Reset all values with a smooth animation
    rotateX.set(0);
    rotateY.set(0);
    highlightOpacity.set(0);
    contentX.set(0);
    contentY.set(0);
  };

  // Variant styles mapping
  const variantStyles = {
    default: "bg-background-light",
    elevated: "bg-background-light",
    glass: "backdrop-blur-lg bg-background-light/60",
    bordered: "bg-background-light border border-primary/20",
    gradient: "bg-gradient-primary-to-accent",
    minimal: "bg-transparent",
  };

  // Border gradient styles
  const borderGradientStyles = {
    none: "",
    primary:
      "border-0 before:absolute before:inset-0 before:p-[1px] before:rounded-[inherit] before:bg-gradient-to-br before:from-primary/30 before:via-transparent before:to-primary/20 before:-z-10",
    secondary:
      "border-0 before:absolute before:inset-0 before:p-[1px] before:rounded-[inherit] before:bg-gradient-to-br before:from-secondary/30 before:via-transparent before:to-secondary/20 before:-z-10",
    accent:
      "border-0 before:absolute before:inset-0 before:p-[1px] before:rounded-[inherit] before:bg-gradient-to-br before:from-accent/30 before:via-transparent before:to-accent/20 before:-z-10",
  };

  // Elevation styles
  const elevationStyles = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  // Padding styles
  const paddingStyles = {
    none: "p-0",
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
    xl: "p-12",
  };

  // Border radius styles
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  // Content alignment styles
  const alignStyles = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  // Aspect ratio styles
  const aspectRatioStyles = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  // Card animations for reveal
  const cardAnimations = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // Custom ease-out-expo
        when: "beforeChildren",
        staggerChildren: animateChildren ? 0.1 : 0,
      },
    },
  };

  // For animated children
  const childAnimations = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Scale effect on hover
  const scaleAnimation =
    hoverScale && !isAnimationDisabled
      ? {
          scale: isHovering ? intensity.scale : 1,
          y: isHovering ? intensity.y : 0,
          transition: { type: "spring", stiffness: 400, damping: 10 },
        }
      : {};

  return (
    <MotionConfig reducedMotion={isAnimationDisabled ? "always" : "user"}>
      <motion.div
        ref={ref}
        className={cn(
          "relative",
          noOverflow ? "" : "overflow-hidden",
          aspectRatioStyles[aspectRatio],
          roundedStyles[rounded],
          borderGradientStyles[borderGradient],
          "transform-gpu",
          className,
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          ...scaleAnimation,
        }}
        initial={revealOnScroll && !isAnimationDisabled ? "hidden" : "visible"}
        animate={revealOnScroll && isInView ? "visible" : undefined}
        variants={cardAnimations}
      >
        {/* Top highlight edge that changes brightness on hover */}
        {highlightOnHover && !isAnimationDisabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
            style={{ background: highlightStyle }}
          />
        )}

        {/* Card content with 3D rotation effect */}
        <motion.div
          className={cn(
            "relative h-full w-full rounded-[inherit]",
            variantStyles[variant],
            paddingStyles[padding],
            elevationStyles[elevation],
            stackChildren ? "flex flex-col" : "",
            alignStyles[contentAlign],
            "transform-gpu",
          )}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* If animateChildren is true, wrap each child in motion.div */}
          {animateChildren && !isAnimationDisabled ? (
            React.Children.map(children, (child, index) => (
              <motion.div
                key={index}
                variants={childAnimations}
                className="relative"
                style={{
                  x: contentTransformX,
                  y: contentTransformY,
                  transformStyle: "preserve-3d",
                  zIndex: React.Children.count(children) - index,
                }}
              >
                {child}
              </motion.div>
            ))
          ) : (
            <motion.div
              className="h-full w-full"
              style={
                parallaxDepth > 0
                  ? {
                      x: contentTransformX,
                      y: contentTransformY,
                    }
                  : {}
              }
            >
              {children}
            </motion.div>
          )}
        </motion.div>

        {/* Fallback for browsers that don't support backdrop-filter */}
        {variant === "glass" && backdrop && (
          <div className="absolute inset-0 bg-background-light/70 -z-10" />
        )}

        {/* Background gradient glow effect */}
        {(variant === "elevated" || variant === "gradient") && (
          <motion.div
            className="absolute -z-10 inset-0 rounded-[inherit] opacity-0 bg-gradient-primary-to-accent blur-xl"
            animate={{ opacity: isHovering ? 0.2 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </MotionConfig>
  );
};

export default EnhancedCard;

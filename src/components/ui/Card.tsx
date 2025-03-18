import React, { useRef } from "react";
import { motion, useInView, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/utils/cn";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "glass" | "bordered";
  hoverEffect?: boolean;
  borderGradient?: "primary" | "secondary" | "accent" | "none";
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  revealOnScroll?: boolean;
  highlightOnHover?: boolean;
}

const Card = ({
  children,
  className = "",
  variant = "default",
  hoverEffect = true,
  borderGradient = "none",
  motionIntensity = "medium",
  revealOnScroll = false,
  highlightOnHover = true,
}: CardProps) => {
  // Reference for checking if card is in view
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // For mouse tracking effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // For the highlight edge effect
  const highlightOpacity = useMotionValue(0);

  // For the rotation effect based on mouse position
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Generate CSS variables for the gradient highlight
  const highlightStyle = useMotionTemplate`linear-gradient(
    to bottom right,
    rgba(255, 255, 255, ${highlightOpacity}) 0%,
    rgba(255, 255, 255, 0) 40%
  )`;

  // Disable animations based on motionIntensity
  const isAnimationDisabled = motionIntensity === "none";

  // Define intensities
  const intensityValues = {
    none: { rotate: 0, scale: 1, y: 0 },
    subtle: { rotate: 0.5, scale: 1.01, y: -2 },
    medium: { rotate: 1, scale: 1.02, y: -4 },
    high: { rotate: 2, scale: 1.03, y: -6 },
  };

  // Select intensity values
  const intensity = intensityValues[motionIntensity];

  // Handle mouse movement for card effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimationDisabled || !hoverEffect) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distances from center (normalize to -1 to 1)
    const distanceX = (e.clientX - centerX) / (rect.width / 2);
    const distanceY = (e.clientY - centerY) / (rect.height / 2);

    // Set rotation values based on mouse position and intensity
    rotateX.set(-distanceY * intensity.rotate);
    rotateY.set(distanceX * intensity.rotate);

    // Set highlight opacity
    highlightOpacity.set(highlightOnHover ? 0.2 : 0);

    // Set mouse position for advanced effects
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (isAnimationDisabled) return;

    // Reset all values
    rotateX.set(0);
    rotateY.set(0);
    highlightOpacity.set(0);
  };

  // Variant styles
  const variantStyles = {
    default: "bg-background-light shadow-md",
    elevated: "bg-background-light shadow-lg",
    glass: "backdrop-blur-md bg-background-light/70",
    bordered: "bg-background-light border border-primary/20",
  };

  // Border gradient styles
  const borderGradientStyles = {
    none: "",
    primary: "border-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 p-[1px]",
    secondary:
      "border-0 bg-gradient-to-br from-secondary/20 via-transparent to-secondary/10 p-[1px]",
    accent: "border-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10 p-[1px]",
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
      },
    },
  };

  // Card content wrapper to handle border gradient if any
  const CardContentWrapper = ({ children }: { children: React.ReactNode }) => {
    if (borderGradient === "none") {
      return <>{children}</>;
    }

    return <div className="h-full w-full bg-background-light rounded-[inherit]">{children}</div>;
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-lg overflow-hidden relative",
        borderGradientStyles[borderGradient],
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      initial={revealOnScroll && !isAnimationDisabled ? "hidden" : "visible"}
      animate={revealOnScroll && isInView ? "visible" : undefined}
      variants={isAnimationDisabled ? {} : cardAnimations}
      whileHover={
        hoverEffect && !isAnimationDisabled
          ? {
              scale: intensity.scale,
              y: intensity.y,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }
          : {}
      }
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
        className={cn("h-full w-full rounded-[inherit] p-6", variantStyles[variant])}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <CardContentWrapper>{children}</CardContentWrapper>
      </motion.div>

      {/* Fallback for browsers that don't support backdrop-filter */}
      {variant === "glass" && <div className="absolute inset-0 bg-background-light/70 -z-10" />}
    </motion.div>
  );
};

export default Card;

// src/components/ui/EnhancedButton.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { cn } from "@/utils/cn";

// Spinner component for loading state
const Spinner = ({ className = "" }: { className?: string }) => (
  <svg
    className={`animate-spin h-4 w-4 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// Ripple effect component
const Ripple = ({ className = "" }: { className?: string }) => {
  return (
    <span
      className={cn(
        "absolute inline-flex h-full w-full rounded-full bg-white opacity-25",
        className,
      )}
    />
  );
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "text" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  microText?: string;
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  fullWidth?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  elevation?: "none" | "sm" | "md" | "lg";
  animateOnAppear?: boolean;
  pulseEffect?: boolean;
  gradientHover?: boolean;
  iconAnimation?: boolean;
  rippleEffect?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      loading = false,
      microText,
      motionIntensity = "medium",
      fullWidth = false,
      rounded = "md",
      elevation = "md",
      animateOnAppear = false,
      pulseEffect = false,
      gradientHover = true,
      iconAnimation = true,
      rippleEffect = true,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    // For ripple effect
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>(
      [],
    );
    const buttonRef = useRef<HTMLButtonElement>(null);
    const nextId = useRef(0);

    // Forward the ref
    const combinedRef = useCombinedRefs(ref, buttonRef);

    // Disable animations when motionIntensity is 'none'
    const isAnimationDisabled = motionIntensity === "none";

    // Define animation intensities
    const intensityScales = {
      none: {
        hover: {},
        tap: {},
        focus: {},
      },
      subtle: {
        hover: { scale: 1.01, y: -1 },
        tap: { scale: 0.98 },
        focus: { boxShadow: "0 0 0 3px rgba(255, 107, 53, 0.3)" },
      },
      medium: {
        hover: { scale: 1.02, y: -2 },
        tap: { scale: 0.97 },
        focus: { boxShadow: "0 0 0 4px rgba(255, 107, 53, 0.4)" },
      },
      high: {
        hover: { scale: 1.03, y: -3 },
        tap: { scale: 0.96 },
        focus: { boxShadow: "0 0 0 5px rgba(255, 107, 53, 0.5)" },
      },
    };

    // Select animation settings based on intensity level
    const animationSettings = intensityScales[motionIntensity];

    // Appearance animation
    const appearAnimation = {
      hidden: { opacity: 0, scale: 0.9, y: 10 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: [0.23, 1, 0.32, 1],
        },
      },
    };

    // Define variant styles
    const variantStyles = {
      primary: `bg-primary text-background-light hover:bg-primary-dark`,
      secondary: `bg-background-light text-primary border border-primary hover:bg-background-dark hover:border-primary-dark`,
      accent: `bg-accent text-background-light hover:bg-accent-dark`,
      text: `bg-transparent text-primary hover:text-primary-dark underline hover:bg-background/5`,
      outline: `bg-transparent text-primary border border-primary hover:bg-primary/5`,
    };

    // Define size styles
    const sizeStyles = {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
      xl: "px-8 py-4 text-xl",
    };

    // Define rounded styles
    const roundedStyles = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    // Define elevation styles
    const elevationStyles = {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    };

    // Define disabled styles
    const disabledStyles = "opacity-60 cursor-not-allowed";

    // Define pulse animation
    const pulseAnimation = {
      pulse: {
        boxShadow: [
          "0 0 0 0 rgba(255, 107, 53, 0)",
          "0 0 0 4px rgba(255, 107, 53, 0.3)",
          "0 0 0 0 rgba(255, 107, 53, 0)",
        ],
        transition: {
          repeat: Infinity,
          duration: 2,
        },
      },
    };

    // Icon animation
    const getIconAnimation = () => {
      if (!iconAnimation || isAnimationDisabled) return {};

      return {
        initial: {},
        hover:
          iconPosition === "right"
            ? { x: 4, transition: { type: "spring", stiffness: 400 } }
            : { x: -4, transition: { type: "spring", stiffness: 400 } },
      };
    };

    // Handle ripple effect
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!rippleEffect || isAnimationDisabled) {
        onClick?.(e);
        return;
      }

      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Determine the maximum distance to a corner
        const dx = Math.max(rect.width - x, x);
        const dy = Math.max(rect.height - y, y);
        const size = Math.sqrt(dx * dx + dy * dy) * 2;

        const newRipple = {
          id: nextId.current,
          x,
          y,
          size,
        };

        nextId.current += 1;
        setRipples((prev) => [...prev, newRipple]);

        // Remove the ripple after animation completes
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 850);
      }

      onClick?.(e);
    };

    return (
      <MotionConfig reducedMotion={isAnimationDisabled ? "always" : "user"}>
        <div className={`relative inline-flex flex-col ${fullWidth ? "w-full" : ""}`}>
          <motion.button
            ref={combinedRef}
            className={cn(
              "relative inline-flex items-center justify-center font-medium transition-all overflow-hidden",
              variantStyles[variant],
              sizeStyles[size],
              roundedStyles[rounded],
              elevationStyles[elevation],
              (disabled || loading) && disabledStyles,
              fullWidth && "w-full",
              "transform-gpu",
              className,
            )}
            initial={animateOnAppear && !isAnimationDisabled ? "hidden" : "visible"}
            animate={animateOnAppear && !isAnimationDisabled ? "visible" : undefined}
            variants={appearAnimation}
            whileHover={
              !disabled && !loading && !isAnimationDisabled ? animationSettings.hover : {}
            }
            whileTap={!disabled && !loading && !isAnimationDisabled ? animationSettings.tap : {}}
            whileFocus={
              !disabled && !loading && !isAnimationDisabled ? animationSettings.focus : {}
            }
            animate={pulseEffect && !isAnimationDisabled ? "pulse" : undefined}
            variants={pulseAnimation}
            disabled={disabled || loading}
            onClick={handleClick}
            {...props}
          >
            {/* Gradient overlay that shifts on hover */}
            {variant !== "text" && gradientHover && !isAnimationDisabled && (
              <motion.div
                className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-300",
                  variant === "primary"
                    ? "bg-gradient-primary-to-accent"
                    : variant === "secondary"
                    ? "bg-gradient-primary-to-secondary"
                    : "bg-gradient-accent",
                )}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.15 }}
              />
            )}

            {/* Ripple effects container */}
            {rippleEffect && !isAnimationDisabled && (
              <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                <AnimatePresence>
                  {ripples.map((ripple) => (
                    <motion.span
                      key={ripple.id}
                      className="absolute bg-white/30 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                      }}
                      initial={{ transform: "scale(0) translate(-50%, -50%)", opacity: 0.6 }}
                      animate={{ transform: "scale(1) translate(-50%, -50%)", opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.85, ease: "easeOut" }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Icon on the left */}
            {icon && iconPosition === "left" && !loading && (
              <motion.span
                className="mr-2 flex items-center"
                variants={getIconAnimation()}
                initial="initial"
                whileHover="hover"
              >
                {icon}
              </motion.span>
            )}

            {/* Loading spinner */}
            {loading && (
              <motion.span
                className="mr-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Spinner />
              </motion.span>
            )}

            {/* Button text */}
            <span className="relative">{children}</span>

            {/* Icon on the right */}
            {icon && iconPosition === "right" && !loading && (
              <motion.span
                className="ml-2 flex items-center"
                variants={getIconAnimation()}
                initial="initial"
                whileHover="hover"
              >
                {icon}
              </motion.span>
            )}
          </motion.button>

          {/* Micro text */}
          {microText && (
            <motion.span
              className="text-xs mt-1 text-center text-text-lighter"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {microText}
            </motion.span>
          )}
        </div>
      </MotionConfig>
    );
  },
);

Button.displayName = "Button";

// Helper for combining refs
function useCombinedRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        (ref as React.MutableRefObject<T | null>).current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

export default Button;

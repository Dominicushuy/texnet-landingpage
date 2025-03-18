import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

// Spinner component for loading state
const Spinner = ({ className = "" }) => (
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

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "text";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  microText?: string;
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  fullWidth?: boolean;
}

const Button = ({
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
  disabled,
  ...props
}: ButtonProps) => {
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
      focus: { borderColor: "rgba(255, 107, 53, 0.5)" },
    },
    medium: {
      hover: { scale: 1.03, y: -2 },
      tap: { scale: 0.97 },
      focus: { borderColor: "rgba(255, 107, 53, 0.7)" },
    },
    high: {
      hover: { scale: 1.05, y: -3 },
      tap: { scale: 0.95 },
      focus: { borderColor: "rgba(255, 107, 53, 0.9)" },
    },
  };

  // Select animation settings based on intensity level
  const animationSettings = intensityScales[motionIntensity];

  // Define variant styles
  const variantStyles = {
    primary: `bg-primary text-background-light hover:bg-primary-dark shadow-sm hover:shadow-md`,
    secondary: `bg-background-light text-primary border border-primary hover:bg-background-dark hover:border-primary-dark`,
    accent: `bg-accent text-background-light hover:bg-accent-dark shadow-accent shadow-sm hover:shadow-md`,
    text: `bg-transparent text-primary hover:text-primary-dark underline hover:bg-background/5`,
  };

  // Define size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  // Define disabled styles
  const disabledStyles = "opacity-50 cursor-not-allowed";

  // Define focus animation
  const focusAnimation = {
    initial: { boxShadow: "0 0 0 0 rgba(255, 107, 53, 0)" },
    focus: {
      boxShadow: [
        "0 0 0 2px rgba(255, 107, 53, 0.3)",
        "0 0 0 4px rgba(255, 107, 53, 0.2)",
        "0 0 0 2px rgba(255, 107, 53, 0.3)",
      ],
      transition: {
        repeat: Infinity,
        duration: 1.5,
      },
    },
  };

  // Icon animation
  const iconAnimation = {
    initial: {},
    hover:
      iconPosition === "right"
        ? { x: 3, transition: { type: "spring", stiffness: 400 } }
        : { x: -3, transition: { type: "spring", stiffness: 400 } },
  };

  return (
    <div className={`relative inline-flex flex-col ${fullWidth ? "w-full" : ""}`}>
      <motion.button
        className={cn(
          "relative inline-flex items-center justify-center rounded-md font-medium transition-all overflow-hidden",
          variantStyles[variant],
          sizeStyles[size],
          (disabled || loading) && disabledStyles,
          fullWidth && "w-full",
          className,
        )}
        whileHover={!disabled && !loading && !isAnimationDisabled ? animationSettings.hover : {}}
        whileTap={!disabled && !loading && !isAnimationDisabled ? animationSettings.tap : {}}
        whileFocus={!disabled && !loading && !isAnimationDisabled ? focusAnimation.focus : {}}
        initial={isAnimationDisabled ? {} : { scale: 1 }}
        disabled={disabled || loading}
        {...props}
      >
        {/* Gradient overlay that shifts on hover */}
        {variant !== "text" && !isAnimationDisabled && (
          <motion.div
            className={`absolute inset-0 ${
              variant === "primary"
                ? "bg-gradient-primary-to-accent"
                : variant === "secondary"
                ? "bg-gradient-primary-to-secondary"
                : "bg-gradient-accent"
            } opacity-0`}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.15 }}
          />
        )}

        {/* Icon on the left */}
        {icon && iconPosition === "left" && !loading && (
          <motion.span
            className="mr-2"
            initial={isAnimationDisabled ? {} : iconAnimation.initial}
            whileHover={isAnimationDisabled ? {} : iconAnimation.hover}
          >
            {icon}
          </motion.span>
        )}

        {/* Loading spinner */}
        {loading && (
          <span className="mr-2">
            <Spinner />
          </span>
        )}

        {/* Button text */}
        <span>{children}</span>

        {/* Icon on the right */}
        {icon && iconPosition === "right" && !loading && (
          <motion.span
            className="ml-2"
            initial={isAnimationDisabled ? {} : iconAnimation.initial}
            whileHover={isAnimationDisabled ? {} : iconAnimation.hover}
          >
            {icon}
          </motion.span>
        )}

        {/* Ripple effect on click */}
        {!isAnimationDisabled && (
          <span className="ripple-container absolute inset-0 overflow-hidden rounded-md pointer-events-none">
            {/* Ripple elements will be added dynamically with JS */}
          </span>
        )}
      </motion.button>

      {/* Micro text */}
      {microText && <span className="text-xs mt-1 text-center text-text-lighter">{microText}</span>}

      {/* Add ripple effect script */}
      {!isAnimationDisabled && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.addEventListener('DOMContentLoaded', () => {
              const buttons = document.querySelectorAll('button');
              buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                  const container = this.querySelector('.ripple-container');
                  if (!container) return;

                  const rect = container.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  
                  const ripple = document.createElement('span');
                  ripple.style.width = ripple.style.height = '100px';
                  ripple.style.left = x + 'px';
                  ripple.style.top = y + 'px';
                  ripple.className = 'absolute -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-30 rounded-full pointer-events-none animate-ripple';
                  
                  container.appendChild(ripple);
                  
                  setTimeout(() => {
                    ripple.remove();
                  }, 600);
                });
              });
            });
          `,
          }}
        />
      )}
    </div>
  );
};

export default Button;

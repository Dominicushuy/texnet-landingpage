import React, { useState, useRef } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

// ===== Input Component =====
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  size?: "sm" | "md" | "lg";
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Input = ({
  label,
  helperText,
  error,
  success,
  className = "",
  size = "md",
  motionIntensity = "medium",
  icon,
  iconPosition = "left",
  fullWidth = false,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const isAnimationDisabled = motionIntensity === "none";

  // Define animation intensities
  const intensityScales = {
    none: { width: "0%" },
    subtle: { width: "25%" },
    medium: { width: "50%" },
    high: { width: "100%" },
  };

  // Size styles
  const sizeStyles = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-3",
    lg: "py-3 px-4 text-lg",
  };

  // Status styles
  const getStatusStyles = () => {
    if (error) return "border-red-500 focus:ring-red-200";
    if (success) return "border-secondary focus:ring-secondary/20";
    return "border-primary/20 focus:ring-accent/20";
  };

  return (
    <div className={cn("mb-4", fullWidth ? "w-full" : "", className)}>
      {label && <label className="block font-body text-text font-medium mb-1">{label}</label>}

      <div className={cn("relative", fullWidth ? "w-full" : "")}>
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light">
            {icon}
          </div>
        )}

        <input
          className={cn(
            "rounded-md w-full transition-all duration-200",
            "border bg-background-light/70",
            "focus:outline-none focus:ring-2 focus:border-transparent",
            sizeStyles[size],
            getStatusStyles(),
            icon && iconPosition === "left" ? "pl-10" : "",
            icon && iconPosition === "right" ? "pr-10" : "",
            fullWidth ? "w-full" : "",
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light">
            {icon}
          </div>
        )}

        {!isAnimationDisabled && (
          <motion.div
            className={cn(
              "absolute bottom-0 left-0 h-[2px] rounded-full",
              error ? "bg-red-500" : success ? "bg-secondary" : "bg-accent",
            )}
            initial={{ width: "0%" }}
            animate={isFocused ? intensityScales[motionIntensity] : { width: "0%" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        {(error || helperText) && (
          <motion.div
            className={cn("text-xs mt-1", error ? "text-red-500" : "text-text-light")}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {error || helperText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ===== Checkbox Component =====
export interface CheckboxProps extends Omit<HTMLMotionProps<"input">, "type"> {
  label?: string;
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  error?: string;
}

export const Checkbox = ({
  label,
  motionIntensity = "medium",
  className = "",
  error,
  ...props
}: CheckboxProps) => {
  const isAnimationDisabled = motionIntensity === "none";

  // Intensity affects the speed and bounciness of the animation
  const intensityValues = {
    none: { duration: 0, bounce: 0 },
    subtle: { duration: 0.2, bounce: 0.1 },
    medium: { duration: 0.3, bounce: 0.25 },
    high: { duration: 0.4, bounce: 0.5 },
  };

  const intensity = intensityValues[motionIntensity];

  return (
    <div className={cn("flex items-start mb-2", className)}>
      <div className="relative flex items-center h-5">
        <motion.input
          type="checkbox"
          className={cn(
            "appearance-none h-5 w-5 rounded border-2",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent",
            error ? "border-red-500" : "border-primary/40 checked:border-accent",
            "cursor-pointer",
          )}
          whileTap={isAnimationDisabled ? {} : { scale: 0.9 }}
          {...props}
        />

        <motion.svg
          className={cn(
            "absolute left-[3px] top-[5px] h-3 w-3 text-background-light pointer-events-none",
            props.disabled ? "text-text-lighter" : "text-accent",
          )}
          viewBox="0 0 24 24"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            props.checked
              ? {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: intensity.duration,
                    type: "spring",
                    bounce: intensity.bounce,
                  },
                }
              : { opacity: 0, scale: 0.5 }
          }
        >
          <path
            fill="currentColor"
            d="M9.707 14.293l-2-2a1 1 0 10-1.414 1.414l3 3a.997.997 0 001.474-.058l5-6a1 1 0 10-1.534-1.286l-4.526 5.43z"
          />
        </motion.svg>
      </div>

      {label && <label className="ml-2 block text-text">{label}</label>}

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            className="text-xs text-red-500 mt-1 ml-7"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ===== RadioButton Component =====
export interface RadioProps extends Omit<HTMLMotionProps<"input">, "type"> {
  label?: string;
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  error?: string;
}

export const Radio = ({
  label,
  motionIntensity = "medium",
  className = "",
  error,
  ...props
}: RadioProps) => {
  const isAnimationDisabled = motionIntensity === "none";

  // Intensity affects the speed and bounciness of the animation
  const intensityValues = {
    none: { duration: 0, bounce: 0 },
    subtle: { duration: 0.2, bounce: 0.1 },
    medium: { duration: 0.3, bounce: 0.25 },
    high: { duration: 0.4, bounce: 0.5 },
  };

  const intensity = intensityValues[motionIntensity];

  return (
    <div className={cn("flex items-start mb-2", className)}>
      <div className="relative flex items-center h-5">
        <motion.input
          type="radio"
          className={cn(
            "appearance-none h-5 w-5 rounded-full border-2",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent",
            error ? "border-red-500" : "border-primary/40 checked:border-accent",
            "cursor-pointer",
          )}
          whileTap={isAnimationDisabled ? {} : { scale: 0.9 }}
          {...props}
        />

        <motion.div
          className={cn(
            "absolute left-[5px] top-[5px] h-[10px] w-[10px] rounded-full pointer-events-none",
            props.disabled ? "bg-text-lighter" : "bg-accent",
          )}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            props.checked
              ? {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: intensity.duration,
                    type: "spring",
                    bounce: intensity.bounce,
                  },
                }
              : { opacity: 0, scale: 0.5 }
          }
        />
      </div>

      {label && <label className="ml-2 block text-text">{label}</label>}

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            className="text-xs text-red-500 mt-1 ml-7"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ===== Select Component =====
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  size?: "sm" | "md" | "lg";
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  options: Array<{ value: string; label: string }>;
  fullWidth?: boolean;
}

export const Select = ({
  label,
  helperText,
  error,
  success,
  size = "md",
  motionIntensity = "medium",
  options,
  className = "",
  fullWidth = false,
  ...props
}: SelectProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const isAnimationDisabled = motionIntensity === "none";

  // Size styles
  const sizeStyles = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-3",
    lg: "py-3 px-4 text-lg",
  };

  // Status styles
  const getStatusStyles = () => {
    if (error) return "border-red-500 focus:ring-red-200";
    if (success) return "border-secondary focus:ring-secondary/20";
    return "border-primary/20 focus:ring-accent/20";
  };

  // Animation intensities for dropdown icon
  const intensityValues = {
    none: { rotate: 0, duration: 0 },
    subtle: { rotate: 90, duration: 0.2 },
    medium: { rotate: 180, duration: 0.3 },
    high: { rotate: 180, duration: 0.4 },
  };

  const intensity = intensityValues[motionIntensity];

  // Handle select focus and blur events
  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsOpen(false);
  };

  return (
    <div className={cn("mb-4", fullWidth ? "w-full" : "", className)}>
      {label && <label className="block font-body text-text font-medium mb-1">{label}</label>}

      <div className={cn("relative", fullWidth ? "w-full" : "")}>
        <select
          ref={selectRef}
          className={cn(
            "appearance-none rounded-md w-full transition-all duration-200",
            "border bg-background-light/70",
            "focus:outline-none focus:ring-2 focus:border-transparent",
            "pr-10", // Space for the dropdown icon
            sizeStyles[size],
            getStatusStyles(),
            fullWidth ? "w-full" : "",
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <motion.svg
            className="h-5 w-5 text-text-light"
            viewBox="0 0 20 20"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            initial={{ rotate: 0 }}
            animate={{
              rotate: isOpen ? intensity.rotate : 0,
              transition: { duration: intensity.duration },
            }}
          >
            <path d="M7 7l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>

        {!isAnimationDisabled && (
          <motion.div
            className={cn(
              "absolute bottom-0 left-0 h-[2px] rounded-full",
              error ? "bg-red-500" : success ? "bg-secondary" : "bg-accent",
            )}
            initial={{ width: "0%" }}
            animate={isFocused ? { width: "100%" } : { width: "0%" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        {(error || helperText) && (
          <motion.div
            className={cn("text-xs mt-1", error ? "text-red-500" : "text-text-light")}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {error || helperText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Export all form components
export const FormElements = {
  Input,
  Checkbox,
  Radio,
  Select,
};

export default FormElements;

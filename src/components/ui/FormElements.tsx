// src/components/ui/EnhancedFormElements.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { cn } from "@/utils/cn";

// =========================
// Input Component
// =========================
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  variant?: "standard" | "filled" | "outlined" | "underlined" | "minimal";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  animateLabel?: boolean;
  revealPasswordButton?: boolean;
  clearButton?: boolean;
  focusHighlight?: "none" | "glow" | "pulse" | "border";
  customAnimate?: boolean;
  progressBar?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
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
      variant = "standard",
      rounded = "md",
      animateLabel = true,
      revealPasswordButton = false,
      clearButton = false,
      focusHighlight = "border",
      customAnimate = false,
      progressBar = false,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isEmpty, setIsEmpty] = useState(!props.value && !props.defaultValue);
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState<string>(
      (props.value || props.defaultValue || "") as string,
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(ref, inputRef);
    const progressWidth = Math.min(
      ((inputValue?.length || 0) / (props.maxLength || 100)) * 100,
      100,
    );

    const isAnimationDisabled = motionIntensity === "none";

    // Update empty state based on input value
    useEffect(() => {
      if (props.value !== undefined) {
        setIsEmpty(!props.value);
        setInputValue(props.value as string);
      }
    }, [props.value]);

    // Define animation intensities
    const intensityScales = {
      none: { width: "0%", glow: 0 },
      subtle: { width: "25%", glow: 2 },
      medium: { width: "50%", glow: 4 },
      high: { width: "100%", glow: 6 },
    };

    // Size styles
    const sizeStyles = {
      xs: "py-1 px-2 text-xs",
      sm: "py-1.5 px-2.5 text-sm",
      md: "py-2 px-3",
      lg: "py-2.5 px-4 text-lg",
      xl: "py-3 px-5 text-xl",
    };

    // Rounded styles
    const roundedStyles = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    // Label size styles
    const labelSizeStyles = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };

    // Input padding when icon is present
    const iconPaddingStyles = {
      xs: { left: "pl-6", right: "pr-6" },
      sm: { left: "pl-7", right: "pr-7" },
      md: { left: "pl-9", right: "pr-9" },
      lg: { left: "pl-10", right: "pr-10" },
      xl: { left: "pl-11", right: "pr-11" },
    };

    // Define variant styles
    const variantStyles = {
      standard: "border border-primary/20 bg-background-light/70",
      filled: "border-none bg-primary/5 hover:bg-primary/10",
      outlined: "bg-transparent border border-primary/30 hover:border-primary/60",
      underlined: "border-b-2 border-primary/20 rounded-none bg-transparent px-0",
      minimal: "border-none bg-transparent hover:bg-primary/5 px-0",
    };

    // Status styles
    const getStatusStyles = () => {
      if (error) return "!border-red-500 focus:!ring-red-200";
      if (success) return "!border-secondary focus:!ring-secondary/20";
      return "focus:!ring-accent/20";
    };

    // Focus highlight styles
    const getFocusStyles = () => {
      if (focusHighlight === "none") return "focus:outline-none";
      if (focusHighlight === "glow") return "focus:outline-none focus:ring-2 focus:ring-offset-0";
      if (focusHighlight === "pulse") return "focus:outline-none focus:ring-2 focus:ring-offset-0";
      return "focus:outline-none focus:ring-2 focus:ring-offset-0";
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsEmpty(!e.target.value);
      setInputValue(e.target.value);
      props.onChange?.(e);
    };

    // Handle clear button click
    const handleClear = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
        setIsEmpty(true);
        setInputValue("");

        // Trigger change event
        const event = new Event("input", { bubbles: true });
        inputRef.current.dispatchEvent(event);

        inputRef.current.focus();
      }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Calculate effective input type (for password fields)
    const effectiveType = props.type === "password" && showPassword ? "text" : props.type;

    // Label animations
    const labelVariants = {
      default: {
        top: animateLabel ? "50%" : label ? "-20px" : "50%",
        fontSize: animateLabel ? labelSizeStyles[size] : "0.75rem",
        transform: animateLabel ? "translateY(-50%)" : "translateY(0)",
        color: "var(--color-text-light)",
      },
      focused: {
        top: "-5px",
        fontSize: "0.75rem",
        transform: "translateY(0)",
        color: error
          ? "var(--color-red-500)"
          : success
          ? "var(--color-secondary)"
          : "var(--color-accent)",
      },
    };

    return (
      <MotionConfig reducedMotion={isAnimationDisabled ? "always" : "user"}>
        <div className={cn("mb-4", fullWidth ? "w-full" : "", className)}>
          <div className={cn("relative", fullWidth ? "w-full" : "")}>
            {/* Input Container */}
            <div className="relative">
              {/* Animated Label */}
              {label && (
                <motion.label
                  className={cn(
                    "absolute left-3 z-10 pointer-events-none",
                    variant === "underlined" || variant === "minimal" ? "left-0" : "left-3",
                    isEmpty && !isFocused && animateLabel ? "" : "bg-background-light px-1",
                    error
                      ? "text-red-500"
                      : success
                      ? "text-secondary"
                      : isFocused
                      ? "text-accent"
                      : "text-text-light",
                    "origin-top-left transition-all",
                  )}
                  initial={isEmpty && animateLabel ? "default" : "focused"}
                  animate={isFocused || !isEmpty || !animateLabel ? "focused" : "default"}
                  variants={isAnimationDisabled ? {} : labelVariants}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {label}
                </motion.label>
              )}

              {/* Left Icon */}
              {icon && iconPosition === "left" && (
                <div
                  className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light z-10",
                    isFocused ? "text-accent" : "",
                  )}
                >
                  <motion.div
                    animate={isFocused && !isAnimationDisabled ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {icon}
                  </motion.div>
                </div>
              )}

              {/* Input Element */}
              <input
                ref={combinedRef}
                className={cn(
                  "w-full transition-all duration-200",
                  variantStyles[variant],
                  sizeStyles[size],
                  roundedStyles[rounded],
                  getStatusStyles(),
                  getFocusStyles(),
                  icon && iconPosition === "left" ? iconPaddingStyles[size].left : "",
                  (icon && iconPosition === "right") ||
                    (revealPasswordButton && props.type === "password") ||
                    (clearButton && !isEmpty)
                    ? iconPaddingStyles[size].right
                    : "",
                  fullWidth ? "w-full" : "",
                  "peer",
                  customAnimate ? "transition-transform origin-bottom" : "",
                )}
                style={
                  customAnimate && isFocused && !isAnimationDisabled
                    ? { animation: "shake 0.2s ease-in-out" }
                    : {}
                }
                onFocus={(e) => {
                  setIsFocused(true);
                  props.onFocus?.(e);
                }}
                onBlur={(e) => {
                  setIsFocused(false);
                  props.onBlur?.(e);
                }}
                onChange={handleChange}
                type={effectiveType}
                {...props}
              />

              {/* Custom animation keyframes */}
              {customAnimate && (
                <style jsx global>{`
                  @keyframes shake {
                    0% {
                      transform: translateX(0);
                    }
                    25% {
                      transform: translateX(-2px);
                    }
                    50% {
                      transform: translateX(2px);
                    }
                    75% {
                      transform: translateX(-1px);
                    }
                    100% {
                      transform: translateX(0);
                    }
                  }
                `}</style>
              )}

              {/* Right Icon */}
              {icon && iconPosition === "right" && !revealPasswordButton && !clearButton && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light">
                  <motion.div
                    animate={isFocused && !isAnimationDisabled ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {icon}
                  </motion.div>
                </div>
              )}

              {/* Clear Button */}
              {clearButton && !isEmpty && !revealPasswordButton && (
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light cursor-pointer"
                  onClick={handleClear}
                >
                  <motion.svg
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </motion.svg>
                </div>
              )}

              {/* Password Reveal Button */}
              {revealPasswordButton && props.type === "password" && (
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <motion.svg
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </motion.svg>
                </div>
              )}

              {/* Bottom focus animation */}
              {!isAnimationDisabled && (
                <motion.div
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] rounded-full",
                    error ? "bg-red-500" : success ? "bg-secondary" : "bg-accent",
                    variant === "underlined" ? "w-full scale-x-0 origin-center" : "",
                  )}
                  initial={{ width: "0%" }}
                  animate={
                    variant === "underlined"
                      ? { scaleX: isFocused ? 1 : 0 }
                      : { width: isFocused ? intensityScales[motionIntensity].width : "0%" }
                  }
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Progress bar for maxlength inputs */}
              {progressBar && props.maxLength && (
                <motion.div className="absolute bottom-0 left-0 h-[2px] bg-primary-200 w-full">
                  <motion.div
                    className="h-full bg-accent"
                    animate={{ width: `${progressWidth}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </motion.div>
              )}

              {/* Focus glow effect */}
              {focusHighlight === "glow" && !isAnimationDisabled && (
                <motion.div
                  className="absolute inset-0 -z-10 rounded-[inherit]"
                  animate={{
                    boxShadow: isFocused
                      ? `0 0 ${intensityScales[motionIntensity].glow}px ${
                          error
                            ? "rgba(239, 68, 68, 0.35)"
                            : success
                            ? "rgba(91, 140, 90, 0.35)"
                            : "rgba(255, 107, 53, 0.25)"
                        }`
                      : "0 0 0px transparent",
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Focus pulse effect */}
              {focusHighlight === "pulse" && isFocused && !isAnimationDisabled && (
                <motion.div
                  className={cn(
                    "absolute inset-0 -z-10 rounded-[inherit]",
                    error ? "bg-red-500/10" : success ? "bg-secondary/10" : "bg-accent/5",
                  )}
                  animate={{
                    opacity: [0.2, 0.15, 0.2],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                />
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {(error || helperText) && (
              <motion.div
                className={cn("text-xs mt-1", error ? "text-red-500" : "text-text-light")}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {error || helperText}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    );
  },
);

Input.displayName = "Input";

// =========================
// Checkbox Component
// =========================
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  error?: string;
  variant?: "default" | "filled" | "outlined" | "minimal";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  checkmarkType?: "check" | "circle" | "cross";
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      motionIntensity = "medium",
      className = "",
      error,
      variant = "default",
      size = "md",
      checkmarkType = "check",
      indeterminate = false,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(ref, inputRef);
    const isAnimationDisabled = motionIntensity === "none";

    // Set indeterminate property
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // Intensity affects the speed and bounciness of the animation
    const intensityValues = {
      none: { duration: 0, bounce: 0 },
      subtle: { duration: 0.2, bounce: 0.1 },
      medium: { duration: 0.3, bounce: 0.25 },
      high: { duration: 0.4, bounce: 0.5 },
    };

    const intensity = intensityValues[motionIntensity];

    // Size styles
    const sizeStyles = {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-7 w-7",
    };

    // Label size styles
    const labelSizeStyles = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };

    // Variant styles
    const variantStyles = {
      default: "border-2 border-primary/40",
      filled: "border-2 border-primary/40 bg-primary-50",
      outlined: "border-2 border-primary/60 bg-transparent",
      minimal: "border border-primary/30 bg-transparent",
    };

    // Checkmark paths based on type
    const getCheckmarkPath = () => {
      switch (checkmarkType) {
        case "circle":
          return <circle cx="12" cy="12" r="6" fill="currentColor" />;
        case "cross":
          return (
            <>
              <line x1="7" y1="7" x2="17" y2="17" />
              <line x1="17" y1="7" x2="7" y2="17" />
            </>
          );
        case "check":
        default:
          return (
            <path d="M9.707 14.293l-2-2a1 1 0 10-1.414 1.414l3 3a.997.997 0 001.474-.058l5-6a1 1 0 10-1.534-1.286l-4.526 5.43z" />
          );
      }
    };

    return (
      <MotionConfig reducedMotion={isAnimationDisabled ? "always" : "user"}>
        <div className={cn("flex items-start mb-2", className)}>
          <div className="relative flex items-center h-5">
            <motion.div
              className="relative"
              initial={false}
              animate={props.checked ? "checked" : "unchecked"}
            >
              {/* Hidden real input */}
              <input ref={combinedRef} type="checkbox" className="sr-only" {...props} />

              {/* Custom checkbox visualization */}
              <motion.div
                className={cn(
                  "appearance-none rounded-[4px] cursor-pointer",
                  sizeStyles[size],
                  variantStyles[variant],
                  error ? "!border-red-500" : "",
                  "transition-colors",
                )}
                variants={
                  isAnimationDisabled
                    ? {}
                    : {
                        unchecked: {
                          backgroundColor: "var(--color-background-light)",
                        },
                        checked: {
                          backgroundColor: props.disabled
                            ? "var(--color-text-lighter)"
                            : "var(--color-accent)",
                        },
                      }
                }
                transition={{ duration: intensity.duration }}
              />

              {/* Checkmark icon */}
              <motion.svg
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-background-light pointer-events-none",
                  sizeStyles[size],
                )}
                viewBox="0 0 24 24"
                initial={false}
                variants={
                  isAnimationDisabled
                    ? {}
                    : {
                        unchecked: {
                          scale: 0.5,
                          opacity: 0,
                        },
                        checked: {
                          scale: 1,
                          opacity: 1,
                          transition: {
                            duration: intensity.duration,
                            type: "spring",
                            bounce: intensity.bounce,
                          },
                        },
                      }
                }
                fill="none"
                stroke={props.disabled ? "var(--color-background-light)" : "currentColor"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* If indeterminate, show a horizontal line */}
                {indeterminate ? <line x1="6" y1="12" x2="18" y2="12" /> : getCheckmarkPath()}
              </motion.svg>
            </motion.div>
          </div>

          {/* Label */}
          {label && (
            <label
              className={cn(
                "ml-2 block text-text",
                labelSizeStyles[size],
                props.disabled ? "text-text-lighter" : "",
              )}
              onClick={() => {
                if (!props.disabled && inputRef.current) {
                  inputRef.current.click();
                }
              }}
            >
              {label}
            </label>
          )}

          {/* Error message */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                className="text-xs text-red-500 mt-1 ml-7"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    );
  },
);

Checkbox.displayName = "Checkbox";

// =========================
// Radio Component
// =========================
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  error?: string;
  variant?: "default" | "filled" | "outlined" | "minimal";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      motionIntensity = "medium",
      className = "",
      error,
      variant = "default",
      size = "md",
      ...props
    },
    ref,
  ) => {
    const isAnimationDisabled = motionIntensity === "none";

    // Intensity affects the speed and bounciness of the animation
    const intensityValues = {
      none: { duration: 0, bounce: 0 },
      subtle: { duration: 0.2, bounce: 0.1 },
      medium: { duration: 0.3, bounce: 0.25 },
      high: { duration: 0.4, bounce: 0.5 },
    };

    // Size styles
    const sizeStyles = {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-7 w-7",
    };

    // Radio dot sizes
    const dotSizeStyles = {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-3.5 w-3.5",
    };

    // Label size styles
    const labelSizeStyles = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };

    // Variant styles
    const variantStyles = {
      default: "border-2 border-primary/40",
      filled: "border-2 border-primary/40 bg-primary-50",
      outlined: "border-2 border-primary/60 bg-transparent",
      minimal: "border border-primary/30 bg-transparent",
    };

    const intensity = intensityValues[motionIntensity];

    return (
      <MotionConfig reducedMotion={isAnimationDisabled ? "always" : "user"}>
        <div className={cn("flex items-start mb-2", className)}>
          <div className="relative flex items-center h-5">
            <motion.div
              className="relative"
              initial={false}
              animate={props.checked ? "checked" : "unchecked"}
            >
              {/* Hidden real input */}
              <input ref={ref} type="radio" className="sr-only" {...props} />

              {/* Custom radio visualization */}
              <motion.div
                className={cn(
                  "appearance-none rounded-full cursor-pointer",
                  sizeStyles[size],
                  variantStyles[variant],
                  error ? "!border-red-500" : "",
                  "transition-colors",
                )}
                variants={
                  isAnimationDisabled
                    ? {}
                    : {
                        unchecked: {
                          borderColor: "var(--color-primary-300)",
                        },
                        checked: {
                          borderColor: props.disabled
                            ? "var(--color-text-lighter)"
                            : "var(--color-accent)",
                          scale: 1.05,
                          transition: {
                            scale: {
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            },
                          },
                        },
                      }
                }
                transition={{ duration: intensity.duration }}
                whileTap={isAnimationDisabled || props.disabled ? {} : { scale: 0.9 }}
              />

              {/* Radio dot indicator */}
              <motion.div
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none",
                  dotSizeStyles[size],
                  props.disabled ? "bg-text-lighter" : "bg-accent",
                )}
                initial={false}
                variants={
                  isAnimationDisabled
                    ? {}
                    : {
                        unchecked: {
                          scale: 0,
                          opacity: 0,
                        },
                        checked: {
                          scale: 1,
                          opacity: 1,
                          transition: {
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            duration: intensity.duration,
                            bounce: intensity.bounce,
                          },
                        },
                      }
                }
              />
            </motion.div>
          </div>

          {/* Label */}
          {label && (
            <label
              className={cn(
                "ml-2 block text-text",
                labelSizeStyles[size],
                props.disabled ? "text-text-lighter" : "",
              )}
            >
              {label}
            </label>
          )}

          {/* Error message */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                className="text-xs text-red-500 mt-1 ml-7"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    );
  },
);

Radio.displayName = "Radio";

// =========================
// Select Component
// =========================
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  motionIntensity?: "none" | "subtle" | "medium" | "high";
  options: Array<{ value: string; label: string; disabled?: boolean; group?: string }>;
  fullWidth?: boolean;
  variant?: "standard" | "filled" | "outlined" | "underlined" | "minimal";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  iconPosition?: "left" | "right";
  icon?: React.ReactNode;
  animateLabel?: boolean;
  optionGroups?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      size = "md",
      motionIntensity = "medium",
      options,
      className = "",
      fullWidth = false,
      variant = "standard",
      rounded = "md",
      iconPosition = "right",
      icon,
      animateLabel = true,
      optionGroups = false,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isEmpty, setIsEmpty] = useState(!props.value && !props.defaultValue);
    const selectRef = useRef<HTMLSelectElement>(null);
    const combinedRef = useCombinedRefs(ref, selectRef);
    const isAnimationDisabled = motionIntensity === "none";

    // Update empty state based on select value
    useEffect(() => {
      if (props.value !== undefined) {
        setIsEmpty(!props.value);
      }
    }, [props.value]);

    // Size styles
    const sizeStyles = {
      xs: "py-1 px-2 text-xs",
      sm: "py-1.5 px-2.5 text-sm",
      md: "py-2 px-3",
      lg: "py-2.5 px-4 text-lg",
      xl: "py-3 px-5 text-xl",
    };

    // Rounded styles
    const roundedStyles = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    // Label size styles
    const labelSizeStyles = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };

    // Icon size styles
    const iconSizeStyles = {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-7 w-7",
    };

    // Input padding when icon is present
    const iconPaddingStyles = {
      xs: { left: "pl-6", right: "pr-6" },
      sm: { left: "pl-7", right: "pr-7" },
      md: { left: "pl-9", right: "pr-9" },
      lg: { left: "pl-10", right: "pr-10" },
      xl: { left: "pl-11", right: "pr-11" },
    };

    // Define variant styles
    const variantStyles = {
      standard: "border border-primary/20 bg-background-light/70",
      filled: "border-none bg-primary/5 hover:bg-primary/10",
      outlined: "bg-transparent border border-primary/30 hover:border-primary/60",
      underlined: "border-b-2 border-primary/20 rounded-none bg-transparent px-0",
      minimal: "border-none bg-transparent hover:bg-primary/5 px-0",
    };

    // Status styles
    const getStatusStyles = () => {
      if (error) return "!border-red-500 focus:!ring-red-200";
      if (success) return "!border-secondary focus:!ring-secondary/20";
      return "focus:ring-accent/20";
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
    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      setIsOpen(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false);
      setIsOpen(false);
      props.onBlur?.(e);
    };

    // Handle select change
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setIsEmpty(!e.target.value);
      props.onChange?.(e);
    };

    // Group options by their group property if optionGroups is true
    const groupedOptions = !optionGroups
      ? null
      : options.reduce<Record<string, Array<{ value: string; label: string; disabled?: boolean }>>>(
          (acc, option) => {
            const group = option.group || "Default";
            if (!acc[group]) {
              acc[group] = [];
            }
            acc[group].push(option);
            return acc;
          },
          {},
        );

    // Label animations
    const labelVariants = {
      default: {
        top: animateLabel ? "50%" : label ? "-20px" : "50%",
        fontSize: animateLabel ? labelSizeStyles[size] : "0.75rem",
        transform: animateLabel ? "translateY(-50%)" : "translateY(0)",
        color: "var(--color-text-light)",
      },
      focused: {
        top: "-5px",
        fontSize: "0.75rem",
        transform: "translateY(0)",
        color: error
          ? "var(--color-red-500)"
          : success
          ? "var(--color-secondary)"
          : "var(--color-accent)",
      },
    };

    return (
      <MotionConfig reducedMotion={isAnimationDisabled ? "always" : "user"}>
        <div className={cn("mb-4", fullWidth ? "w-full" : "", className)}>
          <div className={cn("relative", fullWidth ? "w-full" : "")}>
            {/* Select Container */}
            <div className="relative">
              {/* Animated Label */}
              {label && (
                <motion.label
                  className={cn(
                    "absolute left-3 z-10 pointer-events-none",
                    variant === "underlined" || variant === "minimal" ? "left-0" : "left-3",
                    isEmpty && !isFocused && animateLabel ? "" : "bg-background-light px-1",
                    error
                      ? "text-red-500"
                      : success
                      ? "text-secondary"
                      : isFocused
                      ? "text-accent"
                      : "text-text-light",
                    "origin-top-left transition-all",
                  )}
                  initial={isEmpty && animateLabel ? "default" : "focused"}
                  animate={isFocused || !isEmpty || !animateLabel ? "focused" : "default"}
                  variants={isAnimationDisabled ? {} : labelVariants}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {label}
                </motion.label>
              )}

              {/* Left Icon */}
              {icon && iconPosition === "left" && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light">
                  <motion.div
                    animate={isFocused && !isAnimationDisabled ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {icon}
                  </motion.div>
                </div>
              )}

              {/* Select Element */}
              <select
                ref={combinedRef}
                className={cn(
                  "appearance-none w-full transition-all duration-200",
                  variantStyles[variant],
                  sizeStyles[size],
                  roundedStyles[rounded],
                  getStatusStyles(),
                  "focus:outline-none focus:ring-2 focus:ring-offset-0",
                  "pr-10", // Space for the dropdown icon
                  icon && iconPosition === "left" ? iconPaddingStyles[size].left : "",
                  icon && iconPosition === "right" ? iconPaddingStyles[size].right : "",
                  fullWidth ? "w-full" : "",
                  "peer",
                )}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                {...props}
              >
                {/* If optionGroups is true, render grouped options */}
                {optionGroups && groupedOptions
                  ? Object.entries(groupedOptions).map(([group, options]) => (
                      <optgroup key={group} label={group}>
                        {options.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    ))
                  : options.map((option) => (
                      <option key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                      </option>
                    ))}
              </select>

              {/* Custom dropdown arrow */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <motion.svg
                  className={cn(
                    iconSizeStyles.sm,
                    "text-text-light",
                    error
                      ? "text-red-500"
                      : success
                      ? "text-secondary"
                      : isFocused
                      ? "text-accent"
                      : "",
                  )}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: isOpen ? intensity.rotate : 0,
                    transition: { duration: intensity.duration },
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </div>

              {/* Bottom focus animation */}
              {!isAnimationDisabled && (
                <motion.div
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] rounded-full",
                    error ? "bg-red-500" : success ? "bg-secondary" : "bg-accent",
                    variant === "underlined" ? "w-full scale-x-0 origin-center" : "",
                  )}
                  initial={{ width: "0%" }}
                  animate={
                    variant === "underlined"
                      ? { scaleX: isFocused ? 1 : 0 }
                      : { width: isFocused ? "100%" : "0%" }
                  }
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {(error || helperText) && (
              <motion.div
                className={cn("text-xs mt-1", error ? "text-red-500" : "text-text-light")}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {error || helperText}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    );
  },
);

Select.displayName = "Select";

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

// Export all form components
export const EnhancedFormElements = {
  Input,
  Checkbox,
  Radio,
  Select,
};

export default EnhancedFormElements;

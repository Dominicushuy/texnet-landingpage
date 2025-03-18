// src/components/illustrations/ProcessFlow.tsx
"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface ProcessFlowIllustrationProps {
  step: number;
  className?: string;
  animated?: boolean;
  size?: number;
  variant?: "outline" | "filled" | "colorful";
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

// Process flow illustration that changes based on active step
export default function ProcessFlowIllustration({
  step = 1,
  className = "",
  animated = true,
  size = 400,
  variant = "colorful",
  primaryColor = "var(--color-primary)",
  secondaryColor = "var(--color-primary-light)",
  accentColor = "var(--color-accent)",
}: ProcessFlowIllustrationProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Get colors based on variant
  const getColors = () => {
    switch (variant) {
      case "outline":
        return {
          primary: "none",
          primaryStroke: primaryColor,
          secondary: "none",
          secondaryStroke: secondaryColor,
          accent: "none",
          accentStroke: accentColor,
        };
      case "filled":
        return {
          primary: primaryColor,
          primaryStroke: "none",
          secondary: secondaryColor,
          secondaryStroke: "none",
          accent: accentColor,
          accentStroke: "none",
        };
      case "colorful":
      default:
        return {
          primary: `${primaryColor}20`,
          primaryStroke: primaryColor,
          secondary: `${secondaryColor}20`,
          secondaryStroke: secondaryColor,
          accent: `${accentColor}20`,
          accentStroke: accentColor,
        };
    }
  };

  const colors = getColors();

  // Animation variants for different elements
  const nodeVariants = {
    inactive: { scale: 0.9, opacity: 0.5 },
    active: {
      scale: 1,
      opacity: 1,
      filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))",
      transition: { type: "spring", stiffness: 400, damping: 20 },
    },
  };

  const connectorVariants = {
    inactive: { pathLength: 0, opacity: 0.3 },
    active: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const iconVariants = {
    inactive: { scale: 0, opacity: 0 },
    active: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 500, damping: 30, delay: 0.2 },
    },
  };

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("process-flow-illustration", className)}
    >
      {/* Background decorative elements */}
      <motion.circle
        cx="200"
        cy="200"
        r="180"
        fill={`${primaryColor}05`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.circle
        cx="200"
        cy="200"
        r="150"
        fill={`${primaryColor}08`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {/* Process flow nodes and connectors */}

      {/* Step 1: Discovery */}
      <motion.circle
        cx="200"
        cy="80"
        r="30"
        fill={step >= 1 ? colors.accent : colors.primary}
        stroke={step >= 1 ? colors.accentStroke : colors.primaryStroke}
        strokeWidth="2"
        variants={nodeVariants}
        initial="inactive"
        animate={step >= 1 ? "active" : "inactive"}
      />

      <motion.text
        x="200"
        y="85"
        textAnchor="middle"
        fill={step >= 1 ? accentColor : primaryColor}
        fontWeight="bold"
        fontSize="14"
        opacity={step >= 1 ? 1 : 0.6}
      >
        1
      </motion.text>

      {/* Connector 1-2 */}
      <motion.path
        d="M200 110 L200 150"
        stroke={step >= 2 ? colors.accentStroke : colors.primaryStroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 4"
        variants={connectorVariants}
        initial="inactive"
        animate={step >= 2 ? "active" : "inactive"}
      />

      {/* Step 2: Planning */}
      <motion.circle
        cx="200"
        cy="180"
        r="30"
        fill={step >= 2 ? colors.accent : colors.primary}
        stroke={step >= 2 ? colors.accentStroke : colors.primaryStroke}
        strokeWidth="2"
        variants={nodeVariants}
        initial="inactive"
        animate={step >= 2 ? "active" : "inactive"}
      />

      <motion.text
        x="200"
        y="185"
        textAnchor="middle"
        fill={step >= 2 ? accentColor : primaryColor}
        fontWeight="bold"
        fontSize="14"
        opacity={step >= 2 ? 1 : 0.6}
      >
        2
      </motion.text>

      {/* Connector 2-3 */}
      <motion.path
        d="M200 210 L200 250"
        stroke={step >= 3 ? colors.accentStroke : colors.primaryStroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 4"
        variants={connectorVariants}
        initial="inactive"
        animate={step >= 3 ? "active" : "inactive"}
      />

      {/* Step 3: Implementation */}
      <motion.circle
        cx="200"
        cy="280"
        r="30"
        fill={step >= 3 ? colors.accent : colors.primary}
        stroke={step >= 3 ? colors.accentStroke : colors.primaryStroke}
        strokeWidth="2"
        variants={nodeVariants}
        initial="inactive"
        animate={step >= 3 ? "active" : "inactive"}
      />

      <motion.text
        x="200"
        y="285"
        textAnchor="middle"
        fill={step >= 3 ? accentColor : primaryColor}
        fontWeight="bold"
        fontSize="14"
        opacity={step >= 3 ? 1 : 0.6}
      >
        3
      </motion.text>

      {/* Connector 3-4 */}
      <motion.path
        d="M230 280 L280 230"
        stroke={step >= 4 ? colors.accentStroke : colors.primaryStroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 4"
        variants={connectorVariants}
        initial="inactive"
        animate={step >= 4 ? "active" : "inactive"}
      />

      {/* Step 4: Training */}
      <motion.circle
        cx="310"
        cy="200"
        r="30"
        fill={step >= 4 ? colors.accent : colors.primary}
        stroke={step >= 4 ? colors.accentStroke : colors.primaryStroke}
        strokeWidth="2"
        variants={nodeVariants}
        initial="inactive"
        animate={step >= 4 ? "active" : "inactive"}
      />

      <motion.text
        x="310"
        y="205"
        textAnchor="middle"
        fill={step >= 4 ? accentColor : primaryColor}
        fontWeight="bold"
        fontSize="14"
        opacity={step >= 4 ? 1 : 0.6}
      >
        4
      </motion.text>

      {/* Connector 4-5 */}
      <motion.path
        d="M310 170 L280 120"
        stroke={step >= 5 ? colors.accentStroke : colors.primaryStroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 4"
        variants={connectorVariants}
        initial="inactive"
        animate={step >= 5 ? "active" : "inactive"}
      />

      {/* Step 5: Support */}
      <motion.circle
        cx="250"
        cy="90"
        r="30"
        fill={step >= 5 ? colors.accent : colors.primary}
        stroke={step >= 5 ? colors.accentStroke : colors.primaryStroke}
        strokeWidth="2"
        variants={nodeVariants}
        initial="inactive"
        animate={step >= 5 ? "active" : "inactive"}
      />

      <motion.text
        x="250"
        y="95"
        textAnchor="middle"
        fill={step >= 5 ? accentColor : primaryColor}
        fontWeight="bold"
        fontSize="14"
        opacity={step >= 5 ? 1 : 0.6}
      >
        5
      </motion.text>

      {/* Center icon indicating current step */}
      <motion.circle
        cx="200"
        cy="200"
        r="50"
        fill={`${accentColor}15`}
        variants={iconVariants}
        initial="inactive"
        animate="active"
      />

      {/* Dynamic center icon based on step */}
      {step === 1 && (
        <motion.g variants={iconVariants} initial="inactive" animate="active">
          <path d="M185 190 L200 200 L215 190" stroke={accentColor} strokeWidth="2" />
          <path d="M185 200 L200 210 L215 200" stroke={accentColor} strokeWidth="2" />
          <circle
            cx="200"
            cy="180"
            r="10"
            fill={`${accentColor}30`}
            stroke={accentColor}
            strokeWidth="1"
          />
        </motion.g>
      )}

      {step === 2 && (
        <motion.g variants={iconVariants} initial="inactive" animate="active">
          <rect
            x="180"
            y="185"
            width="40"
            height="30"
            rx="2"
            fill={`${accentColor}30`}
            stroke={accentColor}
            strokeWidth="1"
          />
          <path d="M185 195 L215 195" stroke={accentColor} strokeWidth="1" />
          <path d="M185 205 L205 205" stroke={accentColor} strokeWidth="1" />
        </motion.g>
      )}

      {step === 3 && (
        <motion.g variants={iconVariants} initial="inactive" animate="active">
          <rect
            x="185"
            y="180"
            width="30"
            height="40"
            rx="2"
            fill={`${accentColor}30`}
            stroke={accentColor}
            strokeWidth="1"
          />
          <path d="M190 190 L210 190" stroke={accentColor} strokeWidth="1" />
          <path d="M190 200 L210 200" stroke={accentColor} strokeWidth="1" />
          <path d="M190 210 L210 210" stroke={accentColor} strokeWidth="1" />
        </motion.g>
      )}

      {step === 4 && (
        <motion.g variants={iconVariants} initial="inactive" animate="active">
          <circle
            cx="190"
            cy="195"
            r="10"
            fill={`${accentColor}30`}
            stroke={accentColor}
            strokeWidth="1"
          />
          <circle
            cx="210"
            cy="195"
            r="10"
            fill={`${accentColor}30`}
            stroke={accentColor}
            strokeWidth="1"
          />
          <path d="M180 210 L220 210" stroke={accentColor} strokeWidth="1" strokeLinecap="round" />
        </motion.g>
      )}

      {step === 5 && (
        <motion.g variants={iconVariants} initial="inactive" animate="active">
          <path d="M200 180 L200 220" stroke={accentColor} strokeWidth="2" />
          <path d="M180 200 L220 200" stroke={accentColor} strokeWidth="2" />
          <circle cx="200" cy="200" r="15" fill="none" stroke={accentColor} strokeWidth="1" />
          <circle cx="200" cy="200" r="8" fill={`${accentColor}50`} />
        </motion.g>
      )}

      {/* Status indicators */}
      <motion.circle
        cx="125"
        cy="330"
        r="8"
        fill={step >= 1 ? accentColor : `${primaryColor}40`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      />

      <motion.circle
        cx="155"
        cy="330"
        r="8"
        fill={step >= 2 ? accentColor : `${primaryColor}40`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      />

      <motion.circle
        cx="185"
        cy="330"
        r="8"
        fill={step >= 3 ? accentColor : `${primaryColor}40`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      />

      <motion.circle
        cx="215"
        cy="330"
        r="8"
        fill={step >= 4 ? accentColor : `${primaryColor}40`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      />

      <motion.circle
        cx="245"
        cy="330"
        r="8"
        fill={step >= 5 ? accentColor : `${primaryColor}40`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
      />

      {/* Active step indicator */}
      <motion.rect
        x={125 + (step - 1) * 30 - 10}
        y="350"
        width="20"
        height="4"
        rx="2"
        fill={accentColor}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
      />
    </svg>
  );
}

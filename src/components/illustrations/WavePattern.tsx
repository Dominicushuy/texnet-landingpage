// src/components/illustrations/WavePattern.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface WavePatternProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  animate?: boolean;
  width?: number;
  height?: number;
  preserveAspectRatio?: string;
}

export default function WavePattern({
  className = "",
  primaryColor = "var(--color-primary-300)",
  secondaryColor = "var(--color-primary-400)",
  accentColor = "var(--color-accent)",
  animate = true,
  width = 800,
  height = 600,
  preserveAspectRatio = "none",
}: WavePatternProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 800 600"
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="waveGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.15" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.05" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Primary wave pattern */}
      <motion.path
        d="M0,128 C100,149.3 200,170.7 300,160 C400,149.3 500,106.7 600,96 C700,85.3 800,106.7 900,128 L900,600 L0,600 Z"
        fill="url(#waveGradient1)"
        animate={
          animate
            ? {
                d: [
                  "M0,128 C100,149.3 200,170.7 300,160 C400,149.3 500,106.7 600,96 C700,85.3 800,106.7 900,128 L900,600 L0,600 Z",
                  "M0,160 C100,128 200,96 300,106.7 C400,117.3 500,170.7 600,170.7 C700,170.7 800,117.3 900,96 L900,600 L0,600 Z",
                  "M0,128 C100,149.3 200,170.7 300,160 C400,149.3 500,106.7 600,96 C700,85.3 800,106.7 900,128 L900,600 L0,600 Z",
                ],
              }
            : {}
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Secondary wave pattern */}
      <motion.path
        d="M0,192 C100,170.7 200,149.3 300,160 C400,170.7 500,213.3 600,224 C700,234.7 800,213.3 900,192 L900,600 L0,600 Z"
        fill="url(#waveGradient2)"
        animate={
          animate
            ? {
                d: [
                  "M0,192 C100,170.7 200,149.3 300,160 C400,170.7 500,213.3 600,224 C700,234.7 800,213.3 900,192 L900,600 L0,600 Z",
                  "M0,224 C100,202.7 200,181.3 300,192 C400,202.7 500,245.3 600,234.7 C700,224 800,181.3 900,160 L900,600 L0,600 Z",
                  "M0,192 C100,170.7 200,149.3 300,160 C400,170.7 500,213.3 600,224 C700,234.7 800,213.3 900,192 L900,600 L0,600 Z",
                ],
              }
            : {}
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Accent details */}
      <motion.circle
        cx="200"
        cy="180"
        r="15"
        fill={accentColor}
        fillOpacity="0.2"
        filter="url(#glow)"
        animate={
          animate
            ? {
                cy: [180, 200, 180],
                opacity: [0.2, 0.3, 0.2],
              }
            : {}
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.circle
        cx="650"
        cy="140"
        r="20"
        fill={accentColor}
        fillOpacity="0.15"
        filter="url(#glow)"
        animate={
          animate
            ? {
                cy: [140, 120, 140],
                opacity: [0.15, 0.25, 0.15],
              }
            : {}
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Smaller decorative elements */}
      {[...Array(10)].map((_, i) => (
        <motion.circle
          key={i}
          cx={100 + i * 70}
          cy={150 + (i % 3) * 30}
          r={3 + (i % 4)}
          fill={i % 2 === 0 ? primaryColor : secondaryColor}
          fillOpacity="0.2"
          animate={
            animate
              ? {
                  y: [0, -10, 0],
                  opacity: [0.2, 0.4, 0.2],
                }
              : {}
          }
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </svg>
  );
}

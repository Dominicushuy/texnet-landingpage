// src/components/icons/CssAnimatedIcons.tsx
import React from "react";
import { cn } from "@/utils/cn";

interface AnimatedIconProps {
  size?: number;
  color?: string;
  secondaryColor?: string;
  className?: string;
}

// Animated sewing machine icon with CSS animations
export const SewingMachineIcon: React.FC<AnimatedIconProps> = ({
  size = 32,
  color = "currentColor",
  secondaryColor = "var(--color-accent)",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      className={cn("sewing-machine-icon", className)}
      style={
        {
          "--secondary-color": secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* Base of sewing machine */}
      <rect x="2" y="20" width="28" height="6" rx="1" strokeWidth="1.5" />

      {/* Body of machine */}
      <path
        d="M6 20V12C6 11.4477 6.44772 11 7 11H24C24.5523 11 25 11.4477 25 12V20"
        strokeWidth="1.5"
      />

      {/* Needle arm */}
      <path d="M18 11V6" strokeWidth="1.5" className="needle-arm" />

      {/* Needle */}
      <path
        d="M18 6L18 16"
        stroke={secondaryColor}
        strokeWidth="1.5"
        strokeDasharray="4 2"
        className="needle-thread"
      />

      {/* Wheel */}
      <circle cx="22" cy="14" r="2" strokeWidth="1.5" className="wheel" />

      {/* Thread spool */}
      <rect x="10" y="8" width="4" height="3" rx="1" strokeWidth="1.5" />

      {/* Controls */}
      <circle cx="13" cy="16" r="1.5" strokeWidth="1.5" />
      <circle cx="9" cy="16" r="1.5" strokeWidth="1.5" />
    </svg>
  );
};

// Animated washing machine icon with CSS animations
export const WashingMachineIcon: React.FC<AnimatedIconProps> = ({
  size = 32,
  color = "currentColor",
  secondaryColor = "var(--color-accent)",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      className={cn("washing-machine-icon", className)}
      style={
        {
          "--secondary-color": secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* Washing machine body */}
      <rect x="4" y="4" width="24" height="24" rx="2" strokeWidth="1.5" />

      {/* Door/window */}
      <circle cx="16" cy="16" r="8" strokeWidth="1.5" />

      {/* Door handle */}
      <path d="M26 16H28" strokeWidth="1.5" />

      {/* Control panel */}
      <rect x="8" y="6" width="16" height="2" rx="1" strokeWidth="1.5" />

      {/* Drum inside with rotation */}
      <g className="drum">
        <path
          d="M16 8L16 24M8 16L24 16M11 11L21 21M21 11L11 21"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      </g>

      {/* Water animation */}
      <path
        d="M12 18C12 18 13 20 16 20C19 20 20 18 20 18"
        stroke={secondaryColor}
        strokeWidth="1.5"
        fill="none"
        className="water-wave"
      />
    </svg>
  );
};

// Animated data analytics icon with CSS animations
export const DataAnalyticsIcon: React.FC<AnimatedIconProps> = ({
  size = 32,
  color = "currentColor",
  secondaryColor = "var(--color-accent)",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      className={cn("data-analytics-icon", className)}
      style={
        {
          "--secondary-color": secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* Graph container */}
      <rect x="2" y="6" width="28" height="20" rx="2" strokeWidth="1.5" fill="none" />

      {/* X and Y axis */}
      <path d="M6 22H26M6 22V10" strokeWidth="1.5" />

      {/* Animated bars */}
      <g transform="translate(8, 22) scale(1, -1)">
        <rect x="0" y="0" width="3" height="8" fill={color} className="bar bar-1" />
        <rect x="5" y="0" width="3" height="12" fill={color} className="bar bar-2" />
        <rect x="10" y="0" width="3" height="16" fill={color} className="bar bar-3" />
        <rect x="15" y="0" width="3" height="20" fill={secondaryColor} className="bar bar-4" />
      </g>

      {/* Animated line chart */}
      <path
        d="M6 18C8 18 7 13 10 13C13 13 14 9 18 9C22 9 25 16 26 16"
        stroke={secondaryColor}
        strokeWidth="1.5"
        fill="none"
        className="line-chart"
      />
    </svg>
  );
};

// Animated sustainability icon with CSS animations
export const SustainabilityIcon: React.FC<AnimatedIconProps> = ({
  size = 32,
  color = "currentColor",
  secondaryColor = "var(--color-secondary)",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      className={cn("sustainability-icon", className)}
      style={
        {
          "--secondary-color": secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* Plant stem */}
      <path d="M16 28V16" strokeWidth="1.5" strokeLinecap="round" />

      {/* Growing leaf */}
      <path
        d="M16 16C16 12 19 8 24 6C24 11 21 15 16 16Z"
        strokeWidth="1.5"
        fill="none"
        stroke={secondaryColor}
        strokeDasharray="1"
        className="leaf leaf-right"
      />

      {/* Another leaf on the other side */}
      <path
        d="M16 16C16 12 13 8 8 6C8 11 11 15 16 16Z"
        strokeWidth="1.5"
        fill="none"
        stroke={secondaryColor}
        strokeDasharray="1"
        className="leaf leaf-left"
      />

      {/* Water drop */}
      <path
        d="M16 4C16 4 14 7 14 8C14 9.10457 14.8954 10 16 10C17.1046 10 18 9.10457 18 8C18 7 16 4 16 4Z"
        fill={secondaryColor}
        className="water-drop"
      />

      {/* Root/soil */}
      <path d="M10 28H22" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

// Export a collection of all animated icons
export const CssAnimatedIcons = {
  SewingMachine: SewingMachineIcon,
  WashingMachine: WashingMachineIcon,
  DataAnalytics: DataAnalyticsIcon,
  Sustainability: SustainabilityIcon,
};

export default CssAnimatedIcons;

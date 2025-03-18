// src/components/sections/social-proof/TrustIndicators.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import EnhancedScrollReveal from "@/components/ui/ScrollReveal";
import EnhancedCard from "@/components/ui/Card";
import { cn } from "@/utils/cn";

// Dữ liệu thống kê
const stats = [
  {
    id: 1,
    label: "Khách Hàng Gắn Bó",
    value: 98,
    suffix: "%",
    icon: "retention",
    color: "primary",
  },
  { id: 2, label: "Tăng Hiệu Suất", value: 35, suffix: "%", icon: "efficiency", color: "accent" },
  { id: 3, label: "Năm Kinh Nghiệm", value: 15, suffix: "+", icon: "experience", color: "primary" },
  {
    id: 4,
    label: "Khách Hàng Toàn Quốc",
    value: 250,
    suffix: "+",
    icon: "clients",
    color: "secondary",
  },
];

// Dữ liệu chứng nhận
const badges = [
  {
    id: 1,
    name: "ISO 9001",
    icon: "certificate",
    description: "Hệ thống Quản lý Chất lượng đạt chuẩn",
    detail:
      "Đáp ứng các tiêu chuẩn quốc tế về quy trình sản xuất và kiểm soát chất lượng sản phẩm.",
  },
  {
    id: 2,
    name: "Sản Xuất Xanh",
    icon: "leaf",
    description: "Quy trình sản xuất bền vững thân thiện môi trường",
    detail:
      "Cam kết giảm thiểu tác động môi trường thông qua tối ưu hóa sử dụng nguyên liệu và năng lượng.",
  },
  {
    id: 3,
    name: "Industry 4.0",
    icon: "robot",
    description: "Công nghệ sản xuất số hóa tiên tiến",
    detail:
      "Áp dụng các công nghệ tự động hóa, IoT và AI vào quy trình sản xuất, nâng cao hiệu quả và chất lượng.",
  },
];

// Component hiệu ứng đếm số
function CountUp({
  target,
  duration = 2000,
  isInView = false,
  reducedMotion = false,
  prefix = "",
  suffix = "",
}: {
  target: number;
  duration?: number;
  isInView: boolean;
  reducedMotion?: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || reducedMotion) {
      setCount(target);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, isInView, reducedMotion]);

  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  );
}

// Biểu tượng cho thống kê
const StatIcon = ({ type, color = "primary" }: { type: string; color?: string }) => {
  const iconColor =
    color === "primary"
      ? "var(--color-primary)"
      : color === "secondary"
      ? "var(--color-secondary)"
      : "var(--color-accent)";

  switch (type) {
    case "retention":
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      );
    case "efficiency":
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      );
    case "experience":
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      );
    case "clients":
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      );
    default:
      return null;
  }
};

// Biểu tượng cho chứng nhận
const BadgeIcon = ({ type, className = "" }: { type: string; className?: string }) => {
  switch (type) {
    case "certificate":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      );
    case "leaf":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M6 3v12c0 3.31 2.69 6 6 6s6-2.69 6-6C18 9 12 3 12 3 12 3 6 9 6 15"></path>
        </svg>
      );
    case "robot":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect x="3" y="11" width="18" height="10" rx="2"></rect>
          <circle cx="12" cy="5" r="2"></circle>
          <path d="M12 7v4"></path>
          <line x1="8" y1="16" x2="8" y2="16"></line>
          <line x1="16" y1="16" x2="16" y2="16"></line>
        </svg>
      );
    default:
      return null;
  }
};

interface TrustIndicatorsProps {
  reducedMotion?: boolean;
}

export default function TrustIndicators({ reducedMotion = false }: TrustIndicatorsProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const badgesInView = useInView(badgesRef, { once: true, amount: 0.3 });
  const [activeBadge, setActiveBadge] = useState<number | null>(null);

  // Chart data cho mini-graph
  const [chartHovered, setChartHovered] = useState(false);
  const graphData = [35, 38, 42, 48, 55, 60, 65, 75];

  return (
    <div>
      {/* Stats with animated counter */}
      <div ref={statsRef} className="mb-20">
        <EnhancedScrollReveal
          animation={reducedMotion ? "fade-in" : "fade-up"}
          staggerChildren={!reducedMotion}
          staggerDelay={0.1}
          motionIntensity={reducedMotion ? "none" : "medium"}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <EnhancedCard
                key={stat.id}
                variant="glass"
                elevation="md"
                padding="lg"
                highlightOnHover={!reducedMotion}
                hoverScale={!reducedMotion}
                borderGradient={stat.color as any}
                className="text-center"
                motionIntensity={reducedMotion ? "none" : "medium"}
              >
                <div className="mb-4 flex justify-center">
                  <motion.div
                    className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center",
                      stat.color === "primary"
                        ? "bg-primary/10 text-primary"
                        : stat.color === "secondary"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-accent/10 text-accent",
                    )}
                    animate={
                      statsInView && !reducedMotion
                        ? {
                            scale: [1, 1.1, 1],
                            transition: {
                              delay: index * 0.1,
                              duration: 0.8,
                              repeat: 0,
                              repeatType: "reverse",
                            },
                          }
                        : {}
                    }
                  >
                    <StatIcon type={stat.icon} color={stat.color} />
                  </motion.div>
                </div>

                <div className="flex justify-center items-baseline">
                  <motion.div
                    className={cn(
                      "text-5xl font-bold bg-clip-text text-transparent",
                      stat.color === "primary"
                        ? "bg-gradient-to-r from-primary to-primary-dark"
                        : stat.color === "secondary"
                        ? "bg-gradient-to-r from-secondary to-secondary-dark"
                        : "bg-gradient-to-r from-accent to-accent-dark",
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <CountUp
                      target={stat.value}
                      isInView={statsInView}
                      reducedMotion={reducedMotion}
                      suffix={stat.suffix}
                    />
                  </motion.div>
                </div>

                <div className="text-text-light mt-3 font-medium">{stat.label}</div>

                {/* Mini graph for efficiency increase */}
                {stat.icon === "efficiency" && !reducedMotion && (
                  <div
                    className="mt-4 h-14 relative"
                    onMouseEnter={() => setChartHovered(true)}
                    onMouseLeave={() => setChartHovered(false)}
                  >
                    <svg width="100%" height="100%" viewBox="0 0 100 40">
                      <motion.path
                        d={`M 0,40 ${graphData
                          .map((d, i) => `L ${i * (100 / (graphData.length - 1))},${40 - d * 0.4}`)
                          .join(" ")}`}
                        fill="none"
                        stroke={
                          stat.color === "primary"
                            ? "var(--color-primary)"
                            : stat.color === "secondary"
                            ? "var(--color-secondary)"
                            : "var(--color-accent)"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="300"
                        strokeDashoffset={statsInView ? 0 : 300}
                        initial={{ strokeDashoffset: 300 }}
                        animate={{ strokeDashoffset: statsInView ? 0 : 300 }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />

                      {/* Animate points on hover */}
                      {graphData.map((d, i) => (
                        <motion.circle
                          key={i}
                          cx={i * (100 / (graphData.length - 1))}
                          cy={40 - d * 0.4}
                          r={chartHovered ? 4 : 0}
                          fill={
                            stat.color === "primary"
                              ? "var(--color-primary)"
                              : stat.color === "secondary"
                              ? "var(--color-secondary)"
                              : "var(--color-accent)"
                          }
                          initial={{ r: 0 }}
                          animate={{ r: chartHovered ? 4 : 0 }}
                          transition={{ duration: 0.2, delay: i * 0.05 }}
                        />
                      ))}

                      {/* Area under the curve */}
                      <motion.path
                        d={`M 0,40 ${graphData
                          .map((d, i) => `L ${i * (100 / (graphData.length - 1))},${40 - d * 0.4}`)
                          .join(" ")} L 100,40 Z`}
                        fill={`url(#chart-gradient-${stat.color})`}
                        opacity="0.2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: statsInView ? 0.2 : 0 }}
                        transition={{ duration: 1, delay: 1 }}
                      />

                      {/* Gradient definition */}
                      <defs>
                        <linearGradient
                          id={`chart-gradient-${stat.color}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={
                              stat.color === "primary"
                                ? "var(--color-primary)"
                                : stat.color === "secondary"
                                ? "var(--color-secondary)"
                                : "var(--color-accent)"
                            }
                            stopOpacity="0.5"
                          />
                          <stop
                            offset="100%"
                            stopColor={
                              stat.color === "primary"
                                ? "var(--color-primary)"
                                : stat.color === "secondary"
                                ? "var(--color-secondary)"
                                : "var(--color-accent)"
                            }
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}
              </EnhancedCard>
            ))}
          </div>
        </EnhancedScrollReveal>
      </div>

      {/* Trust badges with hover detail */}
      <div ref={badgesRef} className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={badgesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="text-xl font-medium text-primary">Chứng Nhận & Tiêu Chuẩn</div>
          <div className="text-text-light max-w-md mx-auto mt-1">
            Cam kết đảm bảo chất lượng cao nhất trong toàn bộ quy trình sản xuất
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          {badges.map((badge, index) => (
            <EnhancedScrollReveal
              key={badge.id}
              animation={reducedMotion ? "fade-in" : "scale-up"}
              delay={0.1 * index}
              cascade={false}
              motionIntensity={reducedMotion ? "none" : "medium"}
            >
              <motion.div
                className={cn(
                  "group relative flex items-center bg-background-light/80 backdrop-blur-md px-5 py-4 rounded-xl border transition-all",
                  "hover:shadow-lg cursor-pointer",
                  activeBadge === index ? "border-accent shadow-lg" : "border-primary/10 shadow-sm",
                )}
                whileHover={
                  !reducedMotion
                    ? {
                        scale: 1.02,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      }
                    : {}
                }
                initial={{ opacity: 0, y: 20 }}
                animate={badgesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                onHoverStart={() => !reducedMotion && setActiveBadge(index)}
                onHoverEnd={() => !reducedMotion && setActiveBadge(null)}
              >
                <motion.div
                  className={cn(
                    "w-12 h-12 rounded-full mr-4 flex items-center justify-center transition-colors",
                    index === 0
                      ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                      : index === 1
                      ? "bg-secondary/10 text-secondary group-hover:bg-secondary/20"
                      : "bg-accent/10 text-accent group-hover:bg-accent/20",
                  )}
                  animate={
                    badgesInView && !reducedMotion
                      ? {
                          boxShadow: [
                            "0 0 0 rgba(255, 107, 53, 0)",
                            "0 0 8px rgba(255, 107, 53, 0.5)",
                            "0 0 0 rgba(255, 107, 53, 0)",
                          ],
                          transition: {
                            delay: 0.5 + index * 0.2,
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop",
                            repeatDelay: 4,
                          },
                        }
                      : {}
                  }
                >
                  <BadgeIcon type={badge.icon} className="w-6 h-6" />
                </motion.div>

                <div>
                  <div className="font-medium group-hover:text-primary-dark transition-colors">
                    {badge.name}
                  </div>
                  <div className="text-xs text-text-light">{badge.description}</div>
                </div>

                {/* Tooltip chi tiết hiện khi hover */}
                <AnimatePresence>
                  {activeBadge === index && !reducedMotion && (
                    <motion.div
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-background-light/90 backdrop-blur-md border border-primary/10 p-4 rounded-lg shadow-lg z-20 w-72 md:w-80"
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-sm font-semibold text-primary mb-2 flex items-center">
                        <BadgeIcon type={badge.icon} className="w-5 h-5 mr-2" />
                        {badge.name}
                      </div>
                      <div className="text-sm text-text">{badge.detail}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </EnhancedScrollReveal>
          ))}
        </div>

        {/* Footer text */}
        <motion.div
          className="text-center mt-12 text-sm text-text-light max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={badgesInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <span className="italic">
            "Chúng tôi tin rằng hiệu quả sản xuất phải đi đôi với chất lượng và trách nhiệm với môi
            trường. Đó là lý do mà các giải pháp của TextileTech đều hướng đến sự phát triển bền
            vững."
          </span>
        </motion.div>
      </div>
    </div>
  );
}

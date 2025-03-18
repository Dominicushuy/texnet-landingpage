// src/components/sections/Benefits.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import EnhancedCard from "@/components/ui/Card";
import EnhancedScrollReveal from "@/components/ui/ScrollReveal";
import { CssAnimatedIcons } from "@/components/icons/CssAnimatedIcons";
import { ArrowRightIcon } from "@/components/icons/BasicIcons";

// Define the benefits data
const benefitsData = [
  {
    id: 1,
    title: "Công nghệ tiên tiến",
    description:
      "Áp dụng công nghệ mới nhất trong ngành may mặc giúp tối ưu quy trình sản xuất và nâng cao chất lượng",
    icon: <CssAnimatedIcons.SewingMachine size={48} />,
    accentColor: "var(--color-accent)",
  },
  {
    id: 2,
    title: "Tiêu chuẩn quốc tế",
    description:
      "Đáp ứng các tiêu chuẩn quốc tế về chất lượng và quy trình sản xuất may mặc công nghiệp",
    icon: <CssAnimatedIcons.DataAnalytics size={48} />,
    accentColor: "var(--color-primary-light)",
  },
  {
    id: 3,
    title: "Giải pháp bền vững",
    description:
      "Các phương pháp sản xuất thân thiện với môi trường và tiết kiệm năng lượng tối đa",
    icon: <CssAnimatedIcons.Sustainability size={48} />,
    accentColor: "var(--color-secondary)",
  },
  {
    id: 4,
    title: "Dịch vụ toàn diện",
    description: "Từ thiết kế đến sản xuất và giặt là công nghiệp với quy mô lớn cho doanh nghiệp",
    icon: <CssAnimatedIcons.WashingMachine size={48} />,
    accentColor: "var(--color-accent-light)",
  },
  {
    id: 5,
    title: "Tối ưu chi phí",
    description: "Phương pháp sản xuất hiệu quả giúp giảm chi phí và tăng lợi nhuận đáng kể",
    icon: <CssAnimatedIcons.DataAnalytics size={48} secondaryColor="var(--color-primary)" />,
    accentColor: "var(--color-primary)",
  },
  {
    id: 6,
    title: "Đội ngũ chuyên nghiệp",
    description: "Nhân sự giàu kinh nghiệm sẵn sàng tư vấn và hỗ trợ mọi nhu cầu của doanh nghiệp",
    icon: (
      <CssAnimatedIcons.Sustainability size={48} secondaryColor="var(--color-secondary-light)" />
    ),
    accentColor: "var(--color-secondary-light)",
  },
];

export default function Benefits() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const connectorControls = useAnimation();

  // Animation for connectors
  useEffect(() => {
    if (isInView) {
      connectorControls.start({
        pathLength: 1,
        opacity: 1,
        transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 },
      });
    } else {
      connectorControls.start({
        pathLength: 0,
        opacity: 0,
      });
    }
  }, [isInView, connectorControls]);

  // Mobile carousel navigation
  const handleSnapToCard = (index: number) => {
    if (!carouselRef.current) return;

    const cardWidth = carouselRef.current.offsetWidth;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveCardIndex(index);
  };

  // Handle carousel scroll to update active indicator
  const handleScroll = () => {
    if (!carouselRef.current) return;

    const scrollPosition = carouselRef.current.scrollLeft;
    const cardWidth = carouselRef.current.offsetWidth;
    const activeIndex = Math.round(scrollPosition / cardWidth);
    setActiveCardIndex(activeIndex);
  };

  // Handle touch events for better mobile experience
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;

    const touch = e.touches[0];
    const startX = touch.clientX;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const currentX = moveEvent.touches[0].clientX;
      const diff = startX - currentX;

      const cardWidth = carouselRef.current!.offsetWidth;
      const currentCardIndex = Math.round((carouselRef.current!.scrollLeft + diff) / cardWidth);
      setActiveCardIndex(Math.max(0, Math.min(5, currentCardIndex)));
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-24 overflow-hidden bg-background"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 90%, rgba(91, 140, 90, 0.03) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(43, 76, 126, 0.03) 0%, transparent 40%)",
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-100/30"
          style={{ filter: "blur(80px)" }}
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-secondary-100/20"
          style={{ filter: "blur(90px)" }}
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <EnhancedScrollReveal animation="fade-up" motionIntensity="medium" className="mb-3">
            <span className="text-accent font-medium uppercase tracking-wider text-sm">
              Lợi ích nổi bật
            </span>
          </EnhancedScrollReveal>
          <EnhancedScrollReveal
            animation="fade-up"
            delay={0.1}
            motionIntensity="medium"
            className="mb-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight">
              Tại sao chọn giải pháp của chúng tôi?
            </h2>
          </EnhancedScrollReveal>
          <EnhancedScrollReveal
            animation="fade-up"
            delay={0.2}
            motionIntensity="medium"
            className="max-w-2xl mx-auto"
          >
            <p className="text-text-light text-lg">
              Chúng tôi cung cấp các giải pháp toàn diện cho ngành may mặc và giặt là công nghiệp,
              giúp doanh nghiệp của bạn tối ưu hiệu suất và chất lượng sản phẩm.
            </p>
          </EnhancedScrollReveal>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-6"
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {benefitsData.map((benefit, index) => (
              <div
                key={benefit.id}
                className="flex-shrink-0 w-full px-2 snap-center"
                style={{ scrollSnapAlign: "center" }}
              >
                <BenefitCard
                  benefit={benefit}
                  index={index}
                  isActive={activeCardIndex === index}
                  onHover={() => setActiveCardIndex(index)}
                />
              </div>
            ))}
          </div>

          {/* Mobile indicators */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            {benefitsData.map((_, index) => (
              <motion.button
                key={`indicator-${index}`}
                className="w-2.5 h-2.5 rounded-full bg-primary-300"
                animate={{
                  opacity: index === activeCardIndex ? 1 : 0.3,
                  scale: index === activeCardIndex ? 1.2 : 1,
                  backgroundColor:
                    index === activeCardIndex
                      ? benefitsData[index].accentColor
                      : "var(--color-primary-300)",
                }}
                onClick={() => handleSnapToCard(index)}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative"
          onMouseLeave={() => setActiveCardIndex(null)}
        >
          {/* Visual connectors for desktop */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <svg className="w-full h-full" style={{ overflow: "visible" }}>
              {/* Horizontal connectors */}
              {[0, 1, 3, 4].map((index) => (
                <motion.path
                  key={`h-connector-${index}`}
                  d={`M${(index % 3) * 33.33 + 30}%,${Math.floor(index / 3) * 50 + 25}% 
                     L${((index % 3) + 1) * 33.33 + 3}%,${Math.floor(index / 3) * 50 + 25}%`}
                  stroke="url(#connector-gradient)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={connectorControls}
                />
              ))}

              {/* Vertical connectors */}
              {[0, 1, 2].map((index) => (
                <motion.path
                  key={`v-connector-${index}`}
                  d={`M${index * 33.33 + 16.67}%,25% L${index * 33.33 + 16.67}%,50%`}
                  stroke="url(#connector-gradient)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={connectorControls}
                />
              ))}

              {/* Connector dots with pulsing animation */}
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <motion.circle
                  key={`dot-${index}`}
                  cx={`${(index % 3) * 33.33 + 16.67}%`}
                  cy={`${Math.floor(index / 3) * 50 + 25}%`}
                  r="4"
                  fill="url(#dot-gradient)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 1.2, 1],
                    opacity: [0, 0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5 + index * 0.1,
                    repeat: Infinity,
                    repeatDelay: 3 + index * 0.5,
                  }}
                />
              ))}

              {/* Gradient definitions */}
              <defs>
                <linearGradient id="connector-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-primary-300)" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.3" />
                </linearGradient>
                <radialGradient id="dot-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.3" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Benefit cards */}
          {benefitsData.map((benefit, index) => (
            <EnhancedScrollReveal
              key={benefit.id}
              animation="fade-up"
              delay={0.1 + index * 0.1}
              motionIntensity="medium"
              className="h-full"
            >
              <BenefitCard
                benefit={benefit}
                index={index}
                isActive={activeCardIndex === index}
                onHover={() => setActiveCardIndex(index)}
              />
            </EnhancedScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <EnhancedScrollReveal
          animation="fade-up"
          delay={0.5}
          motionIntensity="medium"
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <a
              href="/services"
              className="inline-flex items-center px-6 py-3 text-lg font-medium rounded-lg text-background-light bg-accent hover:bg-accent-dark transition-colors shadow-md hover:shadow-lg"
            >
              Khám phá tất cả dịch vụ
              <ArrowRightIcon className="ml-2" />
            </a>
          </motion.div>
        </EnhancedScrollReveal>
      </div>
    </section>
  );
}

interface BenefitCardProps {
  benefit: {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    accentColor: string;
  };
  index: number;
  isActive: boolean;
  onHover: () => void;
}

function BenefitCard({ benefit, index, isActive, onHover }: BenefitCardProps) {
  // Mouse position tracking for advanced hover effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring values for smooth animations
  const springMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Transform values for dynamic shadow and glow effects
  const glowOpacity = useTransform(springMouseX, [-100, 0, 100], [0, 0.3, 0]);

  // Handle mouse movement inside card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  // Reset mouse position when leaving
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="relative h-full"
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute -inset-px rounded-lg"
        style={{
          background: `radial-gradient(circle at center, ${benefit.accentColor}50 0%, ${benefit.accentColor}00 70%)`,
          opacity: glowOpacity,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <EnhancedCard
        variant={isActive ? "glass" : "default"}
        hoverEffect={true}
        highlightOnHover={true}
        motionIntensity="medium"
        hoverScale={true}
        elevation={isActive ? "lg" : "md"}
        padding="lg"
        rounded="lg"
        interactive={true}
        borderGradient={isActive ? "accent" : "none"}
        className="h-full transition-all duration-300"
        style={{
          zIndex: isActive ? 10 : 1,
        }}
      >
        <div className="relative h-full flex flex-col">
          {/* Subtle pattern background on hover */}
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0"
            animate={{ opacity: isActive ? 0.05 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${benefit.accentColor}10 0%, transparent 60%)`,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Icon with animation */}
          <div className="mb-6">
            <motion.div
              animate={
                isActive
                  ? {
                      y: [0, -5, 0],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }
                  : {}
              }
              style={{ color: benefit.accentColor }}
            >
              {benefit.icon}
            </motion.div>
          </div>

          {/* Title with underline animation */}
          <div className="mb-3">
            <h3 className="text-xl font-semibold">
              <span className="relative inline-block" style={{ color: benefit.accentColor }}>
                {benefit.title}
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] rounded"
                  style={{ backgroundColor: benefit.accentColor }}
                  initial={{ width: "0%" }}
                  animate={{ width: isActive ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </h3>
          </div>

          {/* Description with subtle opacity transition */}
          <motion.p
            className="text-text-light mb-6 flex-grow"
            animate={{
              opacity: isActive ? 1 : 0.9,
              y: isActive ? 0 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {benefit.description}
          </motion.p>

          {/* CTA Link with arrow animation */}
          <div className="mt-auto">
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <a
                href="#"
                className="inline-flex items-center font-medium hover:underline transition-all"
                style={{ color: benefit.accentColor }}
              >
                Tìm hiểu thêm
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                  initial={{ x: 0 }}
                  animate={isActive ? { x: [0, 5, 0] } : { x: 0 }}
                  transition={{
                    duration: 1,
                    repeat: isActive ? Infinity : 0,
                    repeatType: "reverse",
                  }}
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </motion.svg>
              </a>
            </motion.div>
          </div>
        </div>
      </EnhancedCard>
    </div>
  );
}

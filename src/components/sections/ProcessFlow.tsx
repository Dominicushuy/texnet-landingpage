// src/components/sections/ProcessFlow.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useScroll,
  useTransform,
  MotionConfig,
} from "framer-motion";
import { cn } from "@/utils/cn";
import EnhancedScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedText from "@/components/ui/AnimatedText";
import CssAnimatedIcons from "@/components/icons/CssAnimatedIcons";
import Button from "@/components/ui/Button";
import WavePattern from "@/components/illustrations/WavePattern";
import { debounce } from "@/utils/cn";
import ProcessFlowIllustration from "@/components/illustrations/ProcessFlow";
import { ArrowRightIcon } from "@/components/icons/BasicIcons";

interface ProcessStep {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: React.ReactNode;
  keyPoints: string[];
  ctaText?: string;
  ctaLink?: string;
}

// Define the process steps
const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    title: "Khảo sát & Tư vấn",
    shortDescription: "Tìm hiểu nhu cầu & đề xuất giải pháp",
    description:
      "Chúng tôi bắt đầu bằng việc tìm hiểu sâu về nhu cầu kinh doanh của bạn. Đội ngũ chuyên gia sẽ phân tích quy mô, yêu cầu kỹ thuật và mục tiêu kinh doanh để đề xuất giải pháp tối ưu.",
    icon: <CssAnimatedIcons.DataAnalytics size={48} />,
    keyPoints: [
      "Phân tích nhu cầu và mục tiêu",
      "Khảo sát hiện trạng thiết bị",
      "Tư vấn giải pháp tối ưu hóa",
      "Đánh giá chi phí - lợi ích",
    ],
    ctaText: "Đặt lịch tư vấn",
    ctaLink: "/contact",
  },
  {
    id: "planning",
    title: "Lập kế hoạch & Thiết kế",
    shortDescription: "Xây dựng lộ trình triển khai chi tiết",
    description:
      "Sau khi thống nhất giải pháp, chúng tôi lập kế hoạch triển khai chi tiết. Giai đoạn này bao gồm thiết kế quy trình, lựa chọn công nghệ và lên lịch triển khai phù hợp với hoạt động kinh doanh của bạn.",
    icon: <CssAnimatedIcons.SewingMachine size={48} />,
    keyPoints: [
      "Thiết kế quy trình sản xuất",
      "Lựa chọn công nghệ phù hợp",
      "Lập lịch triển khai chi tiết",
      "Phân bổ nguồn lực hợp lý",
    ],
    ctaText: "Tìm hiểu thêm",
    ctaLink: "/process#planning",
  },
  {
    id: "implementation",
    title: "Triển khai & Lắp đặt",
    shortDescription: "Thực hiện theo kế hoạch đã thống nhất",
    description:
      "Đội ngũ kỹ thuật chuyên nghiệp của chúng tôi thực hiện lắp đặt và cài đặt hệ thống. Chúng tôi tuân thủ nghiêm ngặt các tiêu chuẩn kỹ thuật và đảm bảo giảm thiểu tác động đến hoạt động kinh doanh hiện tại.",
    icon: <CssAnimatedIcons.WashingMachine size={48} />,
    keyPoints: [
      "Lắp đặt theo tiêu chuẩn quốc tế",
      "Kiểm tra từng công đoạn",
      "Tối ưu hóa không gian sử dụng",
      "Đảm bảo an toàn trong vận hành",
    ],
    ctaText: "Xem các dự án",
    ctaLink: "/projects",
  },
  {
    id: "training",
    title: "Đào tạo & Bàn giao",
    shortDescription: "Hướng dẫn vận hành & chuyển giao",
    description:
      "Sau khi hoàn thành lắp đặt, chúng tôi tổ chức các khóa đào tạo chuyên sâu cho đội ngũ vận hành. Chúng tôi đảm bảo nhân viên của bạn có đủ kỹ năng và kiến thức để vận hành hệ thống hiệu quả.",
    icon: <CssAnimatedIcons.Sustainability size={48} />,
    keyPoints: [
      "Đào tạo vận hành thiết bị",
      "Hướng dẫn bảo trì định kỳ",
      "Cung cấp tài liệu kỹ thuật",
      "Chuyển giao quy trình quản lý",
    ],
    ctaText: "Chương trình đào tạo",
    ctaLink: "/services/training",
  },
  {
    id: "support",
    title: "Hỗ trợ & Bảo trì",
    shortDescription: "Dịch vụ hậu mãi toàn diện",
    description:
      "Chúng tôi cam kết đồng hành lâu dài cùng doanh nghiệp của bạn với dịch vụ hỗ trợ kỹ thuật 24/7. Đội ngũ chuyên gia sẵn sàng hỗ trợ, bảo trì định kỳ và cập nhật công nghệ để đảm bảo hệ thống luôn hoạt động tối ưu.",
    icon: <CssAnimatedIcons.DataAnalytics size={48} />,
    keyPoints: [
      "Hỗ trợ kỹ thuật 24/7",
      "Bảo trì định kỳ theo lịch",
      "Cung cấp phụ tùng chính hãng",
      "Tư vấn nâng cấp, mở rộng",
    ],
    ctaText: "Gói hỗ trợ",
    ctaLink: "/services/support",
  },
];

export default function ProcessFlow() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [activePointIndex, setActivePointIndex] = useState(-1);
  const [initialized, setInitialized] = useState(false);

  const tabsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentControls = useAnimation();

  // For scroll-based progress indicator
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    const handleResize = debounce(checkIfMobile, 100);
    window.addEventListener("resize", handleResize);

    // Set initialized after first render
    setInitialized(true);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle tab change
  const handleTabChange = (index: number) => {
    if (index === activeTab) return;

    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
    setActivePointIndex(-1); // Reset point highlight

    // Animate content transition
    contentControls.start("exit").then(() => {
      contentControls.start("enter");
    });
  };

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (!isMobile || !tabsRef.current || !initialized) return;

    const tabElements = tabsRef.current.querySelectorAll(".process-tab");
    const activeTabElement = tabElements[activeTab] as HTMLElement;

    if (activeTabElement) {
      const tabsContainer = tabsRef.current;
      const tabRect = activeTabElement.getBoundingClientRect();
      const containerRect = tabsContainer.getBoundingClientRect();

      // Calculate the scroll position to center the tab
      const scrollLeft = activeTabElement.offsetLeft - containerRect.width / 2 + tabRect.width / 2;

      tabsContainer.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeTab, isMobile, initialized]);

  // Animated key points with staggered reveal
  const HighlightedPoint = ({
    text,
    index,
    isActive,
  }: {
    text: string;
    index: number;
    isActive: boolean;
  }) => (
    <motion.li
      className={cn(
        "mb-3 pl-3 border-l-2 transition-colors flex items-start",
        isActive ? "border-accent text-accent" : "border-primary-300 text-text",
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      onMouseEnter={() => setActivePointIndex(index)}
      onMouseLeave={() => setActivePointIndex(-1)}
    >
      <motion.span
        layout
        className="relative block py-1"
        initial={{ fontWeight: 400 }}
        animate={{ fontWeight: isActive ? 600 : 400 }}
      >
        {text}
        {isActive && (
          <motion.span
            layoutId="highlight"
            className="absolute inset-0 bg-accent/10 rounded-sm -mx-1"
            style={{ zIndex: -1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.span>
    </motion.li>
  );

  // Content animation variants
  const contentVariants = {
    enter: (direction: number) => ({
      x: direction * 30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: (direction: number) => ({
      x: direction * -30,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  // Individual content item variants
  const contentItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
  };

  // Step number variants
  const stepNumberVariants = {
    inactive: { scale: 1, backgroundColor: "var(--color-primary-300)" },
    active: {
      scale: 1.2,
      backgroundColor: "var(--color-accent)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    hover: {
      scale: 1.1,
      backgroundColor: "var(--color-accent-light)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative py-16 md:py-24 bg-background overflow-hidden"
        id="process"
        ref={containerRef}
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <WavePattern
            className="absolute inset-0 w-full h-full opacity-40"
            primaryColor="var(--color-primary-100)"
            secondaryColor="var(--color-primary-200)"
            accentColor="var(--color-accent-100)"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <EnhancedScrollReveal animation="fade-up">
              <h2 className="text-fluid-h2 font-heading font-bold text-primary mb-4">
                <AnimatedText text="Quy Trình Làm Việc" highlightWords={["Quy Trình"]} />
              </h2>
            </EnhancedScrollReveal>
            <EnhancedScrollReveal animation="fade-up" delay={0.1}>
              <div className="mx-auto text-text-light">
                <AnimatedText
                  text="Chúng tôi áp dụng quy trình chuyên nghiệp, minh bạch từ khảo sát đến triển khai, đảm bảo hiệu quả và chất lượng cho mọi dự án."
                  highlightWords={["minh bạch", "hiệu quả", "chất lượng"]}
                  highlightStyle="color"
                  animation="word-fade"
                  staggerDelay={0.02}
                />
              </div>
            </EnhancedScrollReveal>
          </div>

          {/* Progress indicator */}
          <div className="hidden md:block w-full h-1 bg-primary-100 rounded-full mb-10 overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              style={{ width: progressWidth }}
            />
          </div>

          {/* Steps visualization for desktop */}
          <div className="hidden md:flex justify-between items-center mb-12 relative px-4">
            {/* Background connector line */}
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary-100 rounded-full z-0" />

            {/* Step dots */}
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center cursor-pointer"
                onClick={() => handleTabChange(index)}
              >
                {/* Step number */}
                <motion.div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-medium z-10 shadow-md",
                    activeTab === index ? "bg-accent ring-4 ring-accent/20" : "bg-primary-300",
                  )}
                  variants={stepNumberVariants}
                  initial="inactive"
                  animate={activeTab === index ? "active" : "inactive"}
                  whileHover={activeTab !== index ? "hover" : ""}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {index + 1}
                </motion.div>

                {/* Progress line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute top-1/2 transform -translate-y-1/2 left-12 right-0 h-1 z-0">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        index < activeTab ? "bg-accent" : "bg-primary-100",
                      )}
                      initial={{ width: "0%" }}
                      animate={{ width: index < activeTab ? "100%" : "0%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </div>
                )}

                {/* Step label */}
                <div className="mt-3 text-center">
                  <motion.p
                    className={cn(
                      "font-medium mb-1",
                      activeTab === index ? "text-primary-dark" : "text-primary",
                    )}
                    animate={{
                      scale: activeTab === index ? 1.05 : 1,
                      fontWeight: activeTab === index ? 600 : 500,
                    }}
                  >
                    {step.title}
                  </motion.p>
                  <motion.p
                    className={cn(
                      "text-sm hidden md:block",
                      activeTab === index ? "text-text" : "text-text-light",
                    )}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeTab === index ? 1 : 0.7,
                      height: "auto",
                    }}
                  >
                    {step.shortDescription}
                  </motion.p>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal scrollable tabs for mobile */}
          <div ref={tabsRef} className="md:hidden mb-8 overflow-x-auto hide-scrollbar -mx-4 px-4">
            <div className="flex space-x-3 min-w-max pb-2">
              {processSteps.map((step, index) => (
                <motion.button
                  key={step.id}
                  className={cn(
                    "process-tab flex items-center space-x-2 py-3 px-4 rounded-lg transition-all",
                    activeTab === index
                      ? "bg-accent/10 text-accent font-medium shadow-sm"
                      : "bg-primary-100/50 text-text hover:bg-primary-100",
                  )}
                  onClick={() => handleTabChange(index)}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.span
                    className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-medium",
                      activeTab === index ? "bg-accent" : "bg-primary-300",
                    )}
                    animate={{
                      scale: activeTab === index ? 1.1 : 1,
                    }}
                  >
                    {index + 1}
                  </motion.span>
                  <span>{step.title}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="w-full overflow-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={activeTab}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                {/* Left side: Text content */}
                <motion.div
                  className="flex flex-col h-full bg-background-light/80 backdrop-blur-sm rounded-2xl p-8 shadow-md border border-primary-100"
                  variants={contentItemVariants}
                >
                  <motion.div className="mb-6">
                    <AnimatedText
                      tag="h3"
                      text={processSteps[activeTab].title}
                      className="text-fluid-h3 font-heading text-primary mb-3"
                      animation="slide-up"
                      highlightStyle="color"
                    />
                    <p className="text-text mb-6">{processSteps[activeTab].description}</p>
                  </motion.div>

                  <motion.div className="flex-grow mb-6">
                    <h4 className="text-lg font-heading text-primary-dark mb-4 font-semibold flex items-center">
                      <span className="w-1.5 h-6 bg-accent rounded-full mr-2"></span>
                      Điểm chính
                    </h4>
                    <ul className="space-y-1">
                      <AnimatePresence>
                        {processSteps[activeTab].keyPoints.map((point, index) => (
                          <HighlightedPoint
                            key={`${activeTab}-point-${index}`}
                            text={point}
                            index={index}
                            isActive={activePointIndex === index}
                          />
                        ))}
                      </AnimatePresence>
                    </ul>
                  </motion.div>

                  {processSteps[activeTab].ctaText && (
                    <motion.div variants={contentItemVariants} className="mt-auto">
                      <Button
                        variant="primary"
                        icon={<ArrowRightIcon size={18} />}
                        iconPosition="right"
                        motionIntensity="medium"
                        animateOnAppear
                        rippleEffect
                      >
                        {processSteps[activeTab].ctaText}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>

                {/* Right side: Visual illustration */}
                <motion.div
                  className="bg-primary-50 rounded-2xl p-8 shadow-lg relative overflow-hidden border border-primary-100"
                  variants={contentItemVariants}
                >
                  {/* Background decoration */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <WavePattern
                      className="w-full h-full"
                      animate={true}
                      primaryColor="var(--color-primary-100)"
                      secondaryColor="var(--color-primary-300)"
                    />
                  </div>

                  <div className="relative flex flex-col items-center justify-center h-full min-h-64">
                    {/* Step illustration */}
                    <ProcessFlowIllustration
                      step={activeTab + 1}
                      size={260}
                      variant="colorful"
                      className="mb-6 transform-gpu"
                    />

                    {/* Icon with animation */}
                    <motion.div
                      className="mb-6 text-accent"
                      initial={{ scale: 0, rotate: -10, opacity: 0 }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          delay: 0.3,
                        },
                      }}
                    >
                      {processSteps[activeTab].icon}
                    </motion.div>

                    <motion.h3
                      className="text-xl md:text-2xl font-heading text-primary-dark text-center mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: 0.4,
                        },
                      }}
                    >
                      {processSteps[activeTab].title}
                    </motion.h3>

                    <motion.p
                      className="text-text-light text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: 0.5,
                        },
                      }}
                    >
                      {processSteps[activeTab].shortDescription}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile navigation */}
          <div className="flex md:hidden justify-between mt-8">
            <Button
              variant="outline"
              size="sm"
              disabled={activeTab === 0}
              onClick={() => activeTab > 0 && handleTabChange(activeTab - 1)}
              motionIntensity="medium"
            >
              Trước
            </Button>
            <div className="flex items-center space-x-1">
              {processSteps.map((_, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "h-2 rounded-full",
                    activeTab === index ? "w-6 bg-accent" : "w-2 bg-primary-200",
                  )}
                  animate={{
                    width: activeTab === index ? 24 : 8,
                    backgroundColor:
                      activeTab === index ? "var(--color-accent)" : "var(--color-primary-200)",
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleTabChange(index)}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={activeTab === processSteps.length - 1}
              onClick={() => activeTab < processSteps.length - 1 && handleTabChange(activeTab + 1)}
              motionIntensity="medium"
            >
              Tiếp
            </Button>
          </div>
        </div>

        {/* Call to action */}
        <EnhancedScrollReveal animation="fade-up" className="mt-20">
          <div className="max-w-3xl mx-auto text-center px-4 bg-gradient-to-r from-primary-50 to-accent-50 py-10 rounded-2xl shadow-lg border border-primary-100/50">
            <h3 className="text-fluid-h3 font-heading text-primary mb-4">Bắt đầu dự án của bạn</h3>
            <p className="text-text mb-8 max-w-xl mx-auto">
              Hãy liên hệ ngay để được tư vấn giải pháp phù hợp nhất cho doanh nghiệp của bạn. Đội
              ngũ chuyên gia của chúng tôi sẽ hỗ trợ bạn trong từng bước của quy trình.
            </p>
            <Button
              variant="accent"
              size="lg"
              icon={<ArrowRightIcon size={20} />}
              iconPosition="right"
              motionIntensity="high"
              animateOnAppear
              pulseEffect
              gradientHover
            >
              Liên hệ ngay hôm nay
            </Button>
          </div>
        </EnhancedScrollReveal>
      </section>
    </MotionConfig>
  );
}

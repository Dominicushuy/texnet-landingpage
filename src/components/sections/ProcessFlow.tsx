// src/components/sections/ProcessFlow.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";
import EnhancedScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedText from "@/components/ui/AnimatedText";
import CssAnimatedIcons from "@/components/icons/CssAnimatedIcons";
import Button from "@/components/ui/Button";
import WavePattern from "@/components/illustrations/WavePattern";
import { debounce } from "@/utils/cn";
import ProcessFlowIllustration from "@/components/illustrations/ProcessFlow";

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
  const [prevTab, setPrevTab] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const tabsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const indicatorControls = useAnimation();
  const contentControls = useAnimation();
  const [activePointIndex, setActivePointIndex] = useState(-1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [indicatorStyles, setIndicatorStyles] = useState({
    width: 0,
    x: 0,
    opacity: 0,
  });

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

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle tab change
  const handleTabChange = (index: number) => {
    if (index === activeTab) return;

    setPrevTab(activeTab);
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
    setActivePointIndex(-1); // Reset point highlight

    // Animate content transition
    contentControls.start("exit").then(() => {
      contentControls.start("enter");
    });
  };

  // Update tab indicator position
  const updateIndicatorPosition = () => {
    if (!tabsRef.current) return;

    const tabElements = tabsRef.current.querySelectorAll(".process-tab");
    const activeTabElement = tabElements[activeTab] as HTMLElement;

    if (!activeTabElement) return;

    const tabRect = activeTabElement.getBoundingClientRect();
    const containerRect = tabsRef.current.getBoundingClientRect();

    const width = tabRect.width;
    const x = tabRect.left - containerRect.left;

    // Update indicator styles
    setIndicatorStyles({
      width,
      x,
      opacity: 1,
    });

    // Also use animation controls for smoother transitions
    indicatorControls.start({
      width,
      x,
      opacity: 1,
      transition: { type: "spring", stiffness: 500, damping: 30 },
    });

    // Scroll tab into view on mobile
    if (isMobile) {
      activeTabElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  // Animate tab indicator
  useEffect(() => {
    // Use requestAnimationFrame for more accurate positioning
    const frame = requestAnimationFrame(() => {
      updateIndicatorPosition();
    });

    return () => cancelAnimationFrame(frame);
  }, [activeTab, isMobile]);

  // Re-position indicator on window resize
  useEffect(() => {
    const handleResize = debounce(() => {
      updateIndicatorPosition();
    }, 100);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]);

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
        "mb-2 pl-3 border-l-2 transition-colors",
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
        className="relative block"
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

  // Tab animation variants
  const tabVariants = {
    inactive: { opacity: 0.7, y: 0 },
    active: { opacity: 1, y: 0, scale: 1.05 },
    hover: { opacity: 0.9, y: -2 },
  };

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
    <section
      className="relative py-16 md:py-24 bg-background overflow-hidden"
      id="process"
      ref={containerRef}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <WavePattern
          className="absolute inset-0 w-full h-full opacity-50"
          primaryColor="var(--color-primary-100)"
          secondaryColor="var(--color-primary-200)"
          accentColor="var(--color-accent-100)"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <EnhancedScrollReveal animation="fade-up">
            <h2 className="text-fluid-h2 font-heading font-bold text-primary mb-4">
              <AnimatedText text="Quy Trình Làm Việc" highlightWords={["Quy Trình"]} />
            </h2>
          </EnhancedScrollReveal>
          <EnhancedScrollReveal animation="fade-up" delay={0.1}>
            <div className="max-w-2xl mx-auto text-text-light mb-6">
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
        <div className="hidden md:block w-full h-1 bg-primary-100 rounded-full mb-8 overflow-hidden">
          <motion.div className="h-full bg-accent rounded-full" style={{ width: progressWidth }} />
        </div>

        {/* Tabs navigation */}
        <div className="relative mb-8 md:mb-12 overflow-x-auto hide-scrollbar" ref={tabsRef}>
          <div
            className={cn(
              "flex gap-2 md:gap-4 min-w-max md:min-w-0 md:justify-center",
              isMobile ? "pb-4" : "mb-2",
            )}
          >
            {processSteps.map((step, index) => (
              <motion.button
                key={step.id}
                className={cn(
                  "process-tab relative py-3 px-4 md:px-6 rounded-md text-sm md:text-base font-medium transition-all",
                  activeTab === index ? "text-primary-dark" : "text-text-light hover:text-primary",
                )}
                initial="inactive"
                animate={activeTab === index ? "active" : "inactive"}
                whileHover={activeTab !== index ? "hover" : ""}
                variants={tabVariants}
                onClick={() => handleTabChange(index)}
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    className="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-medium"
                    variants={stepNumberVariants}
                    initial="inactive"
                    animate={activeTab === index ? "active" : "inactive"}
                    whileHover={activeTab !== index ? "hover" : ""}
                  >
                    {index + 1}
                  </motion.span>
                  <span>{step.title}</span>
                </div>
              </motion.button>
            ))}

            {/* Active tab indicator */}
            <motion.div
              className="absolute bottom-0 h-1 bg-accent rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, ...indicatorControls }}
            />
          </div>
        </div>

        {/* Step visualization for desktop */}
        <div className="hidden md:block mb-12">
          <div className="relative flex items-center justify-between py-4 px-4">
            {/* Step connector line */}
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary-100 rounded-full z-0" />

            {/* Step dots */}
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative z-10 flex flex-col items-center cursor-pointer"
                onClick={() => handleTabChange(index)}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium z-10 transition-shadow",
                    activeTab === index ? "shadow-lg shadow-accent/30" : "shadow-sm",
                  )}
                  variants={stepNumberVariants}
                  initial="inactive"
                  animate={
                    activeTab === index ? "active" : hoveredStep === index ? "hover" : "inactive"
                  }
                >
                  {index + 1}
                </motion.div>

                {/* Dash animation for active connector */}
                {index < processSteps.length - 1 && (
                  <div className="absolute top-1/2 transform -translate-y-1/2 left-8 right-0 h-1 z-0">
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
                <motion.div
                  className={cn(
                    "absolute -bottom-6 whitespace-nowrap text-xs font-medium",
                    activeTab === index ? "text-primary-dark" : "text-text-light",
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: activeTab === index || hoveredStep === index ? 1 : 0.6,
                    y: activeTab === index || hoveredStep === index ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {step.shortDescription}
                </motion.div>
              </motion.div>
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
              transition={{ duration: 0.5 }}
            >
              {/* Left side: Text content */}
              <div>
                <motion.div className="mb-6" variants={contentItemVariants}>
                  <AnimatedText
                    tag="h3"
                    text={processSteps[activeTab].title}
                    className="text-fluid-h3 font-heading text-primary mb-3"
                    animation="slide-up"
                    highlightStyle="color"
                  />
                  <p className="text-text mb-6">{processSteps[activeTab].description}</p>
                </motion.div>

                <motion.div variants={contentItemVariants}>
                  <h4 className="text-fluid-h4 font-heading text-primary-dark mb-4">Điểm chính:</h4>
                  <ul className="space-y-2 mb-6">
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
                  <motion.div variants={contentItemVariants} className="mt-6">
                    <Button
                      variant="primary"
                      icon={<span className="ml-1">→</span>}
                      iconPosition="right"
                      motionIntensity="medium"
                      animateOnAppear
                      rippleEffect
                    >
                      {processSteps[activeTab].ctaText}
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Right side: Visual illustration */}
              <motion.div
                className="bg-background-light rounded-2xl p-8 shadow-lg relative overflow-hidden border border-primary-100"
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
                  {/* Step number indicator */}
                  <ProcessFlowIllustration
                    step={activeTab + 1}
                    size={220}
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

        {/* Mobile step navigation */}
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
          <div className="text-sm text-text-light">
            {activeTab + 1} / {processSteps.length}
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
        <div className="max-w-3xl mx-auto text-center px-4">
          <h3 className="text-fluid-h3 font-heading text-primary mb-4">Bắt đầu dự án của bạn</h3>
          <p className="text-text-light mb-8">
            Hãy liên hệ ngay để được tư vấn giải pháp phù hợp nhất cho doanh nghiệp của bạn. Đội ngũ
            chuyên gia của chúng tôi sẽ hỗ trợ bạn trong từng bước của quy trình.
          </p>
          <Button
            variant="accent"
            size="lg"
            icon={<span className="ml-1">→</span>}
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
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/utils/cn";

// Custom animated icon components for each process step
import CssAnimatedIcons from "@/components/icons/CssAnimatedIcons";

// Định nghĩa types
type MotionIntensityType = "none" | "subtle" | "medium" | "high";

interface ProcessStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface ProcessData {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  steps: ProcessStep[];
}

interface IntensityConfig {
  duration: number;
  staggerChildren: number;
  distance: number;
}

interface IntensityVariants {
  [key: string]: IntensityConfig;
}

interface ProcessFlowProps {
  className?: string;
  motionIntensity?: MotionIntensityType;
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ className, motionIntensity = "medium" }) => {
  // State for active tab/step
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Define process data with steps
  const processData: ProcessData[] = [
    {
      id: "manufacturing",
      title: "Quy trình Sản xuất",
      icon: (
        <CssAnimatedIcons.SewingMachine
          size={32}
          color="currentColor"
          secondaryColor="var(--color-accent)"
        />
      ),
      description: "Từ thiết kế đến sản phẩm hoàn thiện",
      steps: [
        {
          title: "Tư vấn & Thiết kế",
          description:
            "Chúng tôi làm việc chặt chẽ với bạn để hiểu yêu cầu và đưa ra thiết kế phù hợp với thương hiệu và mục tiêu của bạn.",
          icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="M2 2l7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
          ),
          color: "primary",
        },
        {
          title: "Lập kế hoạch Sản xuất",
          description:
            "Xây dựng lộ trình và kế hoạch sản xuất chi tiết để đảm bảo đáp ứng đúng tiến độ và yêu cầu chất lượng.",
          icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <path d="M8 14h2v2H8z" />
              <path d="M14 14h2v2h-2z" />
              <path d="M8 18h2v2H8z" />
            </svg>
          ),
          color: "primary",
        },
        {
          title: "Sản xuất & Kiểm soát Chất lượng",
          description:
            "Quy trình sản xuất với công nghệ hiện đại và hệ thống kiểm soát chất lượng nghiêm ngặt theo tiêu chuẩn quốc tế.",
          icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <path d="M3.29 7L12 12l8.71-5" />
              <line x1="12" y1="22" x2="12" y2="12" />
            </svg>
          ),
          color: "accent",
        },
        {
          title: "Đóng gói & Vận chuyển",
          description:
            "Đóng gói sản phẩm theo tiêu chuẩn và vận chuyển đến đúng địa điểm, đúng thời gian với hệ thống logistics hiệu quả.",
          icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          ),
          color: "secondary",
        },
      ],
    },
    {
      id: "washing",
      title: "Quy trình Giặt là",
      icon: (
        <CssAnimatedIcons.WashingMachine
          size={32}
          color="currentColor"
          secondaryColor="var(--color-secondary)"
        />
      ),
      description: "Dịch vụ giặt là công nghiệp chuyên nghiệp",
      steps: [
        {
          title: "Tiếp nhận & Phân loại",
          description:
            "Tiếp nhận hàng hóa và phân loại theo chất liệu, màu sắc, mức độ bẩn để áp dụng quy trình xử lý phù hợp.",
          icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          ),
          color: "primary",
        },
        {
          title: "Xử lý Vết bẩn",
          description:
            "Áp dụng các phương pháp xử lý vết bẩn chuyên nghiệp phù hợp với từng loại vải và loại vết bẩn.",
          icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <circle cx="10" cy="13" r="2" />
              <path d="m14 17-2-2-2 2" />
            </svg>
          ),
          color: "accent",
        },
        {
          title: "Giặt & Sấy Công nghiệp",
          description:
            "Quy trình giặt sấy tự động với công nghệ hiện đại, sử dụng hóa chất thân thiện môi trường và tiết kiệm năng lượng.",
          icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M16 8a4 4 9 0 0-8 0" />
              <path d="M12 12h.01" />
            </svg>
          ),
          color: "secondary",
        },
        {
          title: "Là ủi & Hoàn thiện",
          description:
            "Là ủi chuyên nghiệp với thiết bị công nghiệp, đảm bảo sản phẩm hoàn thiện đạt tiêu chuẩn cao nhất.",
          icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
              <polyline points="7.5 19.79 7.5 14.6 3 12" />
              <polyline points="21 12 16.5 14.6 16.5 19.79" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          ),
          color: "primary",
        },
        {
          title: "Kiểm tra & Đóng gói",
          description:
            "Kiểm tra chất lượng kỹ lưỡng và đóng gói theo tiêu chuẩn để bảo vệ sản phẩm trong quá trình vận chuyển.",
          icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ),
          color: "accent",
        },
      ],
    },
    {
      id: "consulting",
      title: "Tư vấn & Đào tạo",
      icon: (
        <CssAnimatedIcons.DataAnalytics
          size={32}
          color="currentColor"
          secondaryColor="var(--color-accent)"
        />
      ),
      description: "Dịch vụ tư vấn chuyên nghiệp theo quy trình",
      steps: [
        {
          title: "Đánh giá Hiện trạng",
          description:
            "Phân tích toàn diện về hiện trạng sản xuất, quy trình vận hành và năng lực của doanh nghiệp.",
          icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          ),
          color: "primary",
        },
        {
          title: "Xây dựng Giải pháp",
          description:
            "Thiết kế giải pháp tối ưu dựa trên kết quả đánh giá, phù hợp với mục tiêu và ngân sách của doanh nghiệp.",
          icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ),
          color: "accent",
        },
        {
          title: "Đào tạo & Chuyển giao",
          description:
            "Đào tạo nhân sự và chuyển giao công nghệ, đảm bảo doanh nghiệp có thể vận hành hiệu quả sau khi triển khai.",
          icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          ),
          color: "secondary",
        },
        {
          title: "Hỗ trợ & Đánh giá",
          description:
            "Hỗ trợ liên tục và đánh giá định kỳ để đảm bảo giải pháp mang lại hiệu quả tối ưu và bền vững.",
          icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          ),
          color: "primary",
        },
      ],
    },
  ];

  // Motion intensity settings
  const intensityVariants: IntensityVariants = {
    none: {
      duration: 0,
      staggerChildren: 0,
      distance: 0,
    },
    subtle: {
      duration: 0.3,
      staggerChildren: 0.05,
      distance: 10,
    },
    medium: {
      duration: 0.5,
      staggerChildren: 0.08,
      distance: 20,
    },
    high: {
      duration: 0.7,
      staggerChildren: 0.1,
      distance: 30,
    },
  };

  const intensity = intensityVariants[motionIntensity];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: intensity.staggerChildren,
        delayChildren: 0.1,
        duration: intensity.duration,
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: intensity.duration },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: intensity.distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: intensity.duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -intensity.distance,
      transition: {
        duration: intensity.duration * 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -intensity.distance },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1,
        duration: intensity.duration,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const iconVariants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      rotate: -5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: intensity.duration * 1.2,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  // Effect to reset active step when tab changes
  useEffect(() => {
    setActiveStep(0);
  }, [activeTab]);

  // Handle step timing based on view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const currentProcess = processData[activeTab];
        const nextStep = (activeStep + 1) % currentProcess.steps.length;
        setActiveStep(nextStep);
      }, 5000); // Change step every 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isInView, activeStep, activeTab, processData]);

  return (
    <section
      ref={sectionRef}
      className={cn("py-16 md:py-24 overflow-hidden bg-background-light relative", className)}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-primary-300) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="font-heading text-fluid-h2 text-primary-700 font-bold tracking-tight mb-4"
            variants={tabVariants}
          >
            Quy trình chuyên nghiệp
          </motion.h2>
          <motion.p
            className="text-fluid-p text-text-light max-w-3xl mx-auto"
            variants={tabVariants}
          >
            Chúng tôi áp dụng quy trình làm việc tiêu chuẩn quốc tế để đảm bảo chất lượng cao nhất
            cho mọi dự án
          </motion.p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          className="mb-12 flex flex-col md:flex-row justify-center gap-2 md:gap-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {processData.map((process, index) => (
            <motion.button
              key={process.id}
              className={cn(
                "relative py-4 px-6 rounded-lg transition-all duration-300 overflow-hidden group",
                activeTab === index
                  ? "bg-primary/10 text-primary"
                  : "bg-background hover:bg-background-dark text-text-light hover:text-primary",
              )}
              onClick={() => setActiveTab(index)}
              variants={tabVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "relative z-10 transition-colors duration-300",
                    activeTab === index
                      ? "text-primary"
                      : "text-text-light group-hover:text-primary",
                  )}
                >
                  {process.icon}
                </div>
                <div className="relative z-10 text-left">
                  <div
                    className={cn(
                      "font-heading font-medium text-lg md:text-xl transition-colors duration-300",
                      activeTab === index ? "text-primary" : "text-text group-hover:text-primary",
                    )}
                  >
                    {process.title}
                  </div>
                  <div className="text-sm text-text-light hidden md:block">
                    {process.description}
                  </div>
                </div>
              </div>

              {/* Active tab indicator */}
              {activeTab === index && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-primary w-full"
                  layoutId="activeTab"
                  transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Background hover effect */}
              <motion.div
                className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.05 }}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Main content area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {processData.map(
              (process, processIndex) =>
                activeTab === processIndex && (
                  <motion.div
                    key={`process-${process.id}`}
                    className="relative"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                  >
                    {/* Process visualization - Timeline for larger screens */}
                    <div className="hidden md:block relative mb-12">
                      <div className="h-1 bg-background-dark w-full absolute top-1/2 -translate-y-1/2 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-accent"
                          initial={{ width: "0%" }}
                          animate={{
                            width: `${((activeStep + 1) / process.steps.length) * 100}%`,
                          }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                          }}
                        />
                      </div>

                      <div className="flex justify-between relative">
                        {process.steps.map((step, stepIndex) => (
                          <motion.div
                            key={`step-${stepIndex}`}
                            className={cn(
                              "relative flex flex-col items-center",
                              stepIndex <= activeStep ? "opacity-100" : "opacity-50",
                            )}
                            custom={stepIndex}
                            variants={stepVariants}
                          >
                            <motion.div
                              className={cn(
                                "flex items-center justify-center w-14 h-14 rounded-full border-4 mb-3 z-10 transition-all duration-300",
                                stepIndex === activeStep
                                  ? `bg-${step.color} border-${step.color} text-background-light`
                                  : stepIndex < activeStep
                                  ? `bg-${step.color}/20 border-${step.color} text-${step.color}`
                                  : "bg-background border-background-dark text-text-light",
                              )}
                              variants={iconVariants}
                              whileHover={{ scale: 1.1 }}
                            >
                              {stepIndex < activeStep ? (
                                <svg viewBox="0 0 24 24" className="w-6 h-6">
                                  <path
                                    d="M20 6L9 17l-5-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              ) : (
                                <div className="flex items-center justify-center">{step.icon}</div>
                              )}
                            </motion.div>

                            <div className="text-center w-28 md:w-32 lg:w-40">
                              <h4
                                className={cn(
                                  "font-heading font-medium text-sm md:text-base mb-1 transition-colors duration-300",
                                  stepIndex === activeStep ? `text-${step.color}` : "text-text",
                                )}
                              >
                                {step.title}
                              </h4>
                              <p className="text-xs text-text-light hidden lg:block">
                                {step.title.split(" ")[0]}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Active step content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`step-content-${activeStep}`}
                        className="bg-background rounded-xl p-6 md:p-8 shadow-md border border-primary/10"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={contentVariants}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                          {/* Step icon - Larger on mobile, left column on desktop */}
                          <motion.div
                            className="md:col-span-1 flex justify-center"
                            variants={iconVariants}
                          >
                            <div
                              className={cn(
                                `flex items-center justify-center w-20 h-20 rounded-full bg-${process.steps[activeStep].color}/10 border-2 border-${process.steps[activeStep].color}`,
                              )}
                            >
                              <span className={`text-${process.steps[activeStep].color} text-4xl`}>
                                {process.steps[activeStep].icon}
                              </span>
                            </div>
                          </motion.div>

                          {/* Step content - right columns on desktop */}
                          <div className="md:col-span-4">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                            >
                              <h3
                                className={`font-heading font-semibold text-2xl text-${process.steps[activeStep].color} mb-3`}
                              >
                                {process.steps[activeStep].title}
                              </h3>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              <p className="text-text-light mb-4">
                                {process.steps[activeStep].description}
                              </p>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                              className="flex flex-wrap gap-3"
                            >
                              <div className="flex items-center text-sm text-text-light border border-background-dark rounded-full px-3 py-1 bg-background">
                                <span className="inline-block w-2 h-2 rounded-full bg-accent mr-2"></span>
                                <span>ISO 9001:2015</span>
                              </div>
                              <div className="flex items-center text-sm text-text-light border border-background-dark rounded-full px-3 py-1 bg-background">
                                <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-2"></span>
                                <span>100% Đảm bảo chất lượng</span>
                              </div>
                              <div className="flex items-center text-sm text-text-light border border-background-dark rounded-full px-3 py-1 bg-background">
                                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                                <span>Công nghệ tiên tiến</span>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Mobile step navigation */}
                    <div className="flex justify-between mt-6 md:hidden">
                      <button
                        className="p-2 rounded-lg bg-background hover:bg-background-dark text-text-light disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() =>
                          setActiveStep(
                            (prev) => (prev - 1 + process.steps.length) % process.steps.length,
                          )
                        }
                        disabled={activeStep === 0}
                      >
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M19 12H5M12 5l-7 7 7 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <div className="flex gap-1">
                        {process.steps.map((_, index) => (
                          <button
                            key={index}
                            className={cn(
                              "w-2.5 h-2.5 rounded-full transition-all duration-300",
                              index === activeStep
                                ? "bg-primary w-5"
                                : index < activeStep
                                ? "bg-primary/50"
                                : "bg-background-dark",
                            )}
                            onClick={() => setActiveStep(index)}
                          />
                        ))}
                      </div>

                      <button
                        className="p-2 rounded-lg bg-background hover:bg-background-dark text-text-light disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setActiveStep((prev) => (prev + 1) % process.steps.length)}
                        disabled={activeStep === process.steps.length - 1}
                      >
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M5 12h14M12 5l7 7-7 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;

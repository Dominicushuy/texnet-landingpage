"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  MotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/utils/cn";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowRightIcon } from "@/components/icons/BasicIcons";
import CssAnimatedIcons from "@/components/icons/CssAnimatedIcons";
import Image from "next/image";

// Types
type MotionIntensityType = "none" | "subtle" | "medium" | "high";

interface ProcessIcon {
  icon: React.ReactNode;
  animatedIcon?: React.ReactNode;
  color: string;
}

interface ProcessStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  keyPoints?: string[];
  image?: string;
}

interface ProcessData {
  id: string;
  title: string;
  icon: React.ReactNode;
  animatedIcon: React.ReactNode;
  description: string;
  steps: ProcessStep[];
  color: string;
}

interface IntensityConfig {
  duration: number;
  staggerChildren: number;
  distance: number;
  spring: { stiffness: number; damping: number };
}

interface IntensityMap {
  [key: string]: IntensityConfig;
}

interface ProcessFlowProps {
  className?: string;
  motionIntensity?: MotionIntensityType;
  activeTabIndex?: number;
  onTabChange?: (index: number) => void;
  autoPlaySteps?: boolean;
  stepDuration?: number;
}

// SVG Connector Component with enhanced animations
const StepConnector: React.FC<{
  active: boolean;
  index: number;
  progress: number;
  color: string;
  intensity: IntensityConfig;
}> = ({ active, index, progress, color, intensity }) => {
  const isEven = index % 2 === 0;
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  const pathSpring = useSpring(0, {
    stiffness: intensity.spring.stiffness,
    damping: intensity.spring.damping,
  });

  const circleOpacity = useSpring(0, {
    stiffness: intensity.spring.stiffness,
    damping: intensity.spring.damping,
  });

  const circleScale = useSpring(0, {
    stiffness: intensity.spring.stiffness,
    damping: intensity.spring.damping,
  });

  useEffect(() => {
    if (active) {
      pathSpring.set(progress);
      circleOpacity.set(0.8);
      circleScale.set(1);
    } else {
      pathSpring.set(0);
      circleOpacity.set(0);
      circleScale.set(0);
    }
  }, [active, progress, pathSpring, circleOpacity, circleScale]);

  // Determine path shape based on index
  const path = isEven ? "M10,20 C30,20 30,80 100,80" : "M10,80 C30,80 30,20 100,20";

  // Calculate end coordinates for the pulse circle
  const circlePos = isEven ? { cx: 100, cy: 80 } : { cx: 10, cy: 20 };

  return (
    <svg
      width="100%"
      height="100"
      viewBox="0 0 120 100"
      className="absolute pointer-events-none"
      style={{
        left: 0,
        right: 0,
        top: isEven ? "100%" : "-70px",
        transform: `translateY(${isEven ? "-50%" : "0%"})`,
        zIndex: -1,
      }}
    >
      <defs>
        <linearGradient id={`connector-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Background path (dashed) */}
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="4 4"
        opacity="0.2"
        className="text-background-dark"
      />

      {/* Animated foreground path */}
      <motion.path
        ref={pathRef}
        d={path}
        fill="none"
        strokeWidth="3"
        stroke={`url(#connector-gradient-${index})`}
        style={{
          pathLength: pathSpring,
          pathOffset: 0,
        }}
      />

      {/* Leading pulse circle */}
      <motion.circle
        ref={circleRef}
        {...circlePos}
        r="6"
        fill={color}
        style={{
          opacity: circleOpacity,
          scale: circleScale,
        }}
      />

      {/* Pulse animation */}
      <motion.circle
        {...circlePos}
        r="6"
        fill="transparent"
        stroke={color}
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          active
            ? {
                scale: [1, 2.5, 3],
                opacity: [0.7, 0.3, 0],
              }
            : { scale: 0, opacity: 0 }
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    </svg>
  );
};

// Tab Icon Component with animations
const ProcessTabIcon: React.FC<{
  icon: React.ReactNode;
  animatedIcon?: React.ReactNode;
  isActive: boolean;
  color: string;
}> = ({ icon, animatedIcon, isActive, color }) => {
  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full",
        isActive
          ? `bg-${color} text-background-light shadow-lg shadow-${color}/20`
          : "bg-background-light text-text-light",
      )}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {/* Regular icon */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {icon}
      </motion.div>

      {/* Animated icon (visible when active) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {animatedIcon || icon}
      </motion.div>

      {/* Ping effect when active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ border: `2px solid ${color}` }}
        />
      )}
    </motion.div>
  );
};

// Step card component with enhanced animations
const StepCard: React.FC<{
  step: ProcessStep;
  isActive: boolean;
  isComplete: boolean;
  index: number;
  stepProgress: number;
  intensity: IntensityConfig;
}> = ({ step, isActive, isComplete, index, stepProgress, intensity }) => {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center transition-all",
        isActive ? "opacity-100" : isComplete ? "opacity-80" : "opacity-50",
      )}
      custom={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive || isComplete ? 1 : 0.6, y: 0 }}
      transition={{
        duration: intensity.duration,
        delay: index * intensity.staggerChildren,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className={cn(
          "relative flex items-center justify-center w-16 h-16 rounded-full border-4 mb-3 z-10 transition-all duration-300 overflow-hidden",
          isActive
            ? `bg-${step.color} border-${step.color} text-background-light shadow-lg shadow-${step.color}/30`
            : isComplete
            ? `bg-${step.color}/20 border-${step.color} text-${step.color}`
            : "bg-background border-background-dark text-text-light",
        )}
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{
          scale: isActive ? 1.1 : 1,
          rotate: 0,
          boxShadow: isActive ? `0 10px 25px -5px ${step.color}30` : "none",
        }}
        whileHover={{ scale: 1.1 }}
        transition={{
          type: "spring",
          stiffness: intensity.spring.stiffness,
          damping: intensity.spring.damping,
        }}
      >
        {isComplete ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.2 }}
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8">
              <motion.path
                d="M20 6L9 17l-5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </svg>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center z-10">{step.icon}</div>
        )}

        {/* Background pulse for active step */}
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      <div className="text-center w-28 md:w-36 lg:w-40">
        <motion.h4
          className={cn(
            "font-heading font-medium text-sm md:text-base mb-1 transition-all duration-300",
            isActive ? `text-${step.color} font-semibold` : "text-text",
          )}
          animate={{
            scale: isActive ? 1.05 : 1,
            y: isActive ? -2 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {step.title}
        </motion.h4>
        <p className="text-xs text-text-light hidden lg:block">{step.title.split(" ")[0]}</p>
      </div>
    </motion.div>
  );
};

// Main ProcessFlow component
const ProcessFlow: React.FC<ProcessFlowProps> = ({
  className,
  motionIntensity = "medium",
  activeTabIndex = 0,
  onTabChange,
  autoPlaySteps = true,
  stepDuration = 5000,
}) => {
  // Refs and state management
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeTab, setActiveTab] = useState<number>(activeTabIndex);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [stepProgress, setStepProgress] = useState<number>(0);
  const [isManualStepping, setIsManualStepping] = useState<boolean>(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Process data with rich metadata
  const processData: ProcessData[] = [
    {
      id: "manufacturing",
      title: "Quy trình Sản xuất",
      description: "Từ thiết kế đến sản phẩm hoàn thiện",
      color: "primary",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 12h12" />
          <path d="M12 6v12" />
        </svg>
      ),
      animatedIcon: (
        <CssAnimatedIcons.SewingMachine
          size={24}
          color="currentColor"
          secondaryColor="var(--color-background-light)"
        />
      ),
      steps: [
        {
          title: "Tư vấn & Phân tích",
          description:
            "Chúng tôi làm việc chặt chẽ với khách hàng để hiểu yêu cầu, mục tiêu kinh doanh và đối tượng khách hàng mục tiêu để đưa ra thiết kế phù hợp.",
          keyPoints: ["Phân tích yêu cầu", "Nghiên cứu thị trường", "Tối ưu chi phí"],
          image:
            "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="M2 2l7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
          ),
          color: "primary",
        },
        {
          title: "Thiết kế & Lập mẫu",
          description:
            "Phát triển bản mẫu chất lượng cao theo đúng yêu cầu kỹ thuật, kèm theo tối ưu hóa quy trình sản xuất và chất liệu.",
          keyPoints: ["Tạo mẫu thử", "Đánh giá chất lượng", "Tối ưu sản xuất"],
          image:
            "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
              <polyline points="7.5 19.79 7.5 14.6 3 12" />
              <polyline points="21 12 16.5 14.6 16.5 19.79" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          ),
          color: "accent",
        },
        {
          title: "Sản xuất Đại trà",
          description:
            "Sản xuất hàng loạt với quy trình kiểm soát chất lượng nghiêm ngặt, đảm bảo tính đồng nhất và tuân thủ tiêu chuẩn quốc tế.",
          keyPoints: ["Quy trình tự động", "Kiểm soát chất lượng", "Tối ưu hóa"],
          image:
            "https://images.unsplash.com/photo-1595079676231-d16d9a9e8c86?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          ),
          color: "secondary",
        },
        {
          title: "Kiểm tra Chất lượng",
          description:
            "Quy trình kiểm tra chất lượng nhiều cấp độ, đảm bảo mọi sản phẩm đều đạt tiêu chuẩn kỹ thuật và thẩm mỹ cao nhất.",
          keyPoints: ["Kiểm tra đa cấp", "Tiêu chuẩn quốc tế", "Đánh giá an toàn"],
          image:
            "https://images.unsplash.com/photo-1581091877018-dac6a371d50f?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ),
          color: "primary",
        },
        {
          title: "Đóng gói & Giao hàng",
          description:
            "Hệ thống đóng gói và vận chuyển hiệu quả, đảm bảo sản phẩm đến tay khách hàng đúng thời gian và trong tình trạng hoàn hảo.",
          keyPoints: ["Đóng gói bền vững", "Theo dõi lô hàng", "Giao nhận đúng hẹn"],
          image:
            "https://images.unsplash.com/photo-1634626396437-716c85a4d6a1?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          ),
          color: "accent",
        },
      ],
    },
    {
      id: "washing",
      title: "Quy trình Giặt là",
      description: "Dịch vụ giặt là công nghiệp chuyên nghiệp",
      color: "secondary",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="12" cy="12" r="5" />
          <path d="M12 7v10" />
          <path d="M7 12h10" />
        </svg>
      ),
      animatedIcon: (
        <CssAnimatedIcons.WashingMachine
          size={24}
          color="currentColor"
          secondaryColor="var(--color-background-light)"
        />
      ),
      steps: [
        {
          title: "Tiếp nhận & Phân loại",
          description:
            "Tiếp nhận hàng hóa và phân loại theo chất liệu, màu sắc, mức độ bẩn để áp dụng quy trình xử lý phù hợp.",
          keyPoints: ["Phân loại theo màu", "Phân loại theo vải", "Đánh giá cấp độ"],
          image:
            "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          ),
          color: "secondary",
        },
        {
          title: "Xử lý Vết bẩn",
          description:
            "Áp dụng các phương pháp xử lý vết bẩn chuyên nghiệp phù hợp với từng loại vải và loại vết bẩn.",
          keyPoints: ["Công nghệ enzym", "Hóa chất thân thiện", "Xử lý đúng cách"],
          image:
            "https://images.unsplash.com/photo-1469504512102-900f29606341?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
          keyPoints: ["Tiết kiệm năng lượng", "Công nghệ tiên tiến", "Thân thiện môi trường"],
          image:
            "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
          keyPoints: ["Công nghệ hơi nước", "Ủi định hình", "Kiểm tra kỹ lưỡng"],
          image:
            "https://images.unsplash.com/photo-1627913363993-95768ab015d0?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
          keyPoints: ["Đóng gói tiêu chuẩn", "Nhận diện thương hiệu", "Bảo vệ sản phẩm"],
          image:
            "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ),
          color: "secondary",
        },
      ],
    },
    {
      id: "consulting",
      title: "Tư vấn & Đào tạo",
      description: "Dịch vụ tư vấn chuyên nghiệp theo quy trình",
      color: "accent",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
      animatedIcon: (
        <CssAnimatedIcons.DataAnalytics
          size={24}
          color="currentColor"
          secondaryColor="var(--color-background-light)"
        />
      ),
      steps: [
        {
          title: "Đánh giá Hiện trạng",
          description:
            "Phân tích toàn diện về hiện trạng sản xuất, quy trình vận hành và năng lực của doanh nghiệp.",
          keyPoints: ["Phân tích quy trình", "Đánh giá năng lực", "Xác định cơ hội"],
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          ),
          color: "accent",
        },
        {
          title: "Xây dựng Giải pháp",
          description:
            "Thiết kế giải pháp tối ưu dựa trên kết quả đánh giá, phù hợp với mục tiêu và ngân sách của doanh nghiệp.",
          keyPoints: ["Tư vấn chuyên sâu", "Giải pháp toàn diện", "Phù hợp ngân sách"],
          image:
            "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ),
          color: "primary",
        },
        {
          title: "Đào tạo & Chuyển giao",
          description:
            "Đào tạo nhân sự và chuyển giao công nghệ, đảm bảo doanh nghiệp có thể vận hành hiệu quả sau khi triển khai.",
          keyPoints: ["Đào tạo thực tế", "Chuyển giao công nghệ", "Tài liệu hướng dẫn"],
          image:
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
          keyPoints: ["Đánh giá định kỳ", "Hỗ trợ kỹ thuật", "Tối ưu liên tục"],
          image:
            "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1080&auto=format&fit=crop",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          ),
          color: "accent",
        },
      ],
    },
  ];

  // Motion intensity settings
  const intensityMap: IntensityMap = {
    none: {
      duration: 0,
      staggerChildren: 0,
      distance: 0,
      spring: { stiffness: 100, damping: 20 },
    },
    subtle: {
      duration: 0.3,
      staggerChildren: 0.05,
      distance: 10,
      spring: { stiffness: 200, damping: 25 },
    },
    medium: {
      duration: 0.5,
      staggerChildren: 0.08,
      distance: 20,
      spring: { stiffness: 300, damping: 30 },
    },
    high: {
      duration: 0.7,
      staggerChildren: 0.1,
      distance: 30,
      spring: { stiffness: 400, damping: 15 },
    },
  };

  const intensity = intensityMap[motionIntensity];

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
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: intensity.spring.stiffness,
        damping: intensity.spring.damping,
      },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
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

  // Handle tab change
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setActiveStep(0);
    setStepProgress(0);
    if (onTabChange) onTabChange(index);

    // Reset progress step to simulate new sequence starting
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  // Handle step change
  const handleStepChange = (index: number) => {
    setIsManualStepping(true);
    setActiveStep(index);
    setStepProgress(0);

    // Reset auto progress for a short while
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }

    // Resume auto progress after a delay
    setTimeout(() => {
      setIsManualStepping(false);
    }, 5000);
  };

  // Auto progress steps when in view
  useEffect(() => {
    if (isInView && autoPlaySteps && !isManualStepping) {
      // Progress bar animation (updates every 100ms)
      if (!progressInterval.current) {
        const stepProgressIncrement = 0.1 / (stepDuration / 1000); // Calculate increment for smooth animation

        progressInterval.current = setInterval(() => {
          setStepProgress((prev) => {
            const newProgress = prev + stepProgressIncrement;

            // When progress reaches 1, move to next step
            if (newProgress >= 1) {
              const currentProcess = processData[activeTab];
              const nextStep = (activeStep + 1) % currentProcess.steps.length;
              setActiveStep(nextStep);
              return 0; // Reset progress
            }

            return newProgress;
          });
        }, 100); // Update every 100ms for smooth animation
      }
    } else {
      // Clear interval when not in view or autoplay is off
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    }

    // Cleanup interval on unmount
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    };
  }, [isInView, activeStep, activeTab, autoPlaySteps, isManualStepping, processData, stepDuration]);

  // Reset step when active tab changes
  useEffect(() => {
    setActiveStep(0);
    setStepProgress(0);
  }, [activeTab]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Get color variable based on color name
  const getColorVariable = (colorName: string): string => {
    switch (colorName) {
      case "primary":
        return "var(--color-primary)";
      case "secondary":
        return "var(--color-secondary)";
      case "accent":
        return "var(--color-accent)";
      default:
        return "var(--color-primary)";
    }
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-16 md:py-24 lg:py-32 overflow-hidden bg-background-light relative",
        className,
      )}
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
        {/* Section heading with scroll reveal */}
        <ScrollReveal
          animation="fade-up"
          motionIntensity={motionIntensity}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-fluid-h2 text-primary-700 font-bold tracking-tight mb-4">
            Quy trình chuyên nghiệp
          </h2>
          <p className="text-fluid-p text-text-light max-w-3xl mx-auto">
            Chúng tôi áp dụng quy trình làm việc tiêu chuẩn quốc tế để đảm bảo chất lượng cao nhất
            cho mọi dự án
          </p>
        </ScrollReveal>

        {/* Tab navigation - Enhanced with animations */}
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
                  ? `bg-${process.color}/10 text-${process.color}`
                  : "bg-background hover:bg-background-dark text-text-light hover:text-primary",
              )}
              onClick={() => handleTabChange(index)}
              variants={tabVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="flex items-center gap-3">
                {/* Tab icon with enter/exit animation */}
                <ProcessTabIcon
                  icon={process.icon}
                  animatedIcon={process.animatedIcon}
                  isActive={activeTab === index}
                  color={getColorVariable(process.color)}
                />

                <div className="relative z-10 text-left">
                  <div
                    className={cn(
                      "font-heading font-medium text-lg md:text-xl transition-colors duration-300",
                      activeTab === index
                        ? `text-${process.color}`
                        : "text-text group-hover:text-primary",
                    )}
                  >
                    {process.title}
                  </div>
                  <div className="text-sm text-text-light hidden md:block">
                    {process.description}
                  </div>
                </div>
              </div>

              {/* Active tab indicator with layout animation */}
              {activeTab === index && (
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-${process.color} w-full`}
                  layoutId="activeTab"
                  transition={{
                    type: "spring",
                    stiffness: intensity.spring.stiffness,
                    damping: intensity.spring.damping,
                  }}
                />
              )}

              {/* Background hover effect */}
              <motion.div
                className={`absolute inset-0 bg-${process.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.05 }}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Main content area with crossfade transitions */}
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
                    <div ref={timelineRef} className="hidden md:block relative mb-12">
                      {/* Timeline background */}
                      <div className="h-2 bg-background-dark/30 w-full absolute top-1/2 -translate-y-1/2 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-${process.color}`}
                          initial={{ width: "0%" }}
                          animate={{
                            width: `${((activeStep + stepProgress) / process.steps.length) * 100}%`,
                          }}
                          transition={{
                            duration: 0.2,
                            ease: "linear",
                          }}
                        />
                      </div>

                      {/* Step markers */}
                      <div className="flex justify-between relative">
                        {process.steps.map((step, stepIndex) => (
                          <React.Fragment key={`step-${stepIndex}`}>
                            {/* Step indicator */}
                            <StepCard
                              step={step}
                              isActive={stepIndex === activeStep}
                              isComplete={stepIndex < activeStep}
                              index={stepIndex}
                              stepProgress={stepProgress}
                              intensity={intensity}
                            />

                            {/* Connector between steps (except the last one) */}
                            {stepIndex < process.steps.length - 1 && (
                              <StepConnector
                                active={
                                  isInView && (stepIndex === activeStep || stepIndex < activeStep)
                                }
                                index={stepIndex}
                                progress={stepIndex < activeStep ? 1 : stepProgress}
                                color={getColorVariable(step.color)}
                                intensity={intensity}
                              />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Active step content panel */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`step-content-${activeStep}`}
                        className="bg-background rounded-xl p-6 md:p-8 shadow-lg border border-primary/10 relative overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={contentVariants}
                      >
                        {/* Background pattern element */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-5"
                          style={{
                            backgroundImage: `radial-gradient(circle at 10px 10px, var(--color-${process.color}) 1px, transparent 0)`,
                            backgroundSize: "20px 20px",
                          }}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
                          {/* Left column with icon & image */}
                          <motion.div
                            className="md:col-span-2 flex flex-col items-center md:items-start space-y-6 relative"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                          >
                            {/* Step icon */}
                            <motion.div
                              className={cn(
                                `flex items-center justify-center w-24 h-24 rounded-xl bg-${process.color}/10 border-2 border-${process.color} shadow-lg shadow-${process.color}/20`,
                                "mx-auto md:mx-0",
                              )}
                              initial={{ scale: 0.8, rotate: -5 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: intensity.spring.stiffness,
                                damping: intensity.spring.damping,
                                delay: 0.1,
                              }}
                            >
                              <span className={`text-${process.color} text-5xl`}>
                                {process.steps[activeStep].icon}
                              </span>
                            </motion.div>

                            {/* Step image */}
                            {process.steps[activeStep].image && (
                              <motion.div
                                className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                              >
                                <Image
                                  src={process.steps[activeStep].image || ""}
                                  alt={process.steps[activeStep].title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 300px"
                                />
                                <div
                                  className={`absolute inset-0 bg-gradient-to-t from-${process.color}-900/50 to-transparent`}
                                />
                              </motion.div>
                            )}

                            {/* Step progress control (mobile only) */}
                            <div className="flex justify-between mt-2 w-full md:hidden">
                              <button
                                className={`p-2 rounded-lg bg-${process.color}/10 text-${process.color} disabled:opacity-50 disabled:cursor-not-allowed`}
                                onClick={() =>
                                  handleStepChange(
                                    (activeStep - 1 + process.steps.length) % process.steps.length,
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
                                        ? `bg-${process.color} w-5`
                                        : index < activeStep
                                        ? `bg-${process.color}/50`
                                        : "bg-background-dark",
                                    )}
                                    onClick={() => handleStepChange(index)}
                                  />
                                ))}
                              </div>

                              <button
                                className={`p-2 rounded-lg bg-${process.color}/10 text-${process.color} disabled:opacity-50 disabled:cursor-not-allowed`}
                                onClick={() =>
                                  handleStepChange((activeStep + 1) % process.steps.length)
                                }
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

                          {/* Right column with step content */}
                          <div className="md:col-span-3">
                            {/* Step title with animated reveal */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                            >
                              <h3
                                className={`font-heading font-semibold text-2xl md:text-3xl text-${process.color} mb-4`}
                              >
                                {process.steps[activeStep].title}
                              </h3>
                            </motion.div>

                            {/* Step description with staggered animation */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              <p className="text-text-light mb-6 text-lg leading-relaxed">
                                {process.steps[activeStep].description}
                              </p>
                            </motion.div>

                            {/* Key points with icon indicators */}
                            {process.steps[activeStep].keyPoints && (
                              <motion.div
                                className="space-y-4 mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                              >
                                <h4 className="font-medium text-text mb-2">Điểm nổi bật:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {process.steps[activeStep].keyPoints?.map((point, i) => (
                                    <motion.div
                                      key={i}
                                      className={`flex items-center p-3 bg-${process.color}/5 rounded-lg`}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.4 + i * 0.1 }}
                                    >
                                      <div
                                        className={`flex-shrink-0 w-8 h-8 rounded-full bg-${process.color}/20 flex items-center justify-center mr-3`}
                                      >
                                        <motion.div
                                          initial={{ rotate: -10, scale: 0.8 }}
                                          animate={{ rotate: 0, scale: 1 }}
                                          transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                                          className={`text-${process.color}`}
                                        >
                                          <svg
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                          >
                                            <path
                                              d="M5 13l4 4L19 7"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </motion.div>
                                      </div>
                                      <span className="text-text">{point}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}

                            {/* Step indicators & certifications */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.5 }}
                              className="flex flex-wrap gap-3 mt-6"
                            >
                              <div className="flex items-center text-sm text-text-light border border-background-dark rounded-full px-3 py-1 bg-background shadow">
                                <span
                                  className={`inline-block w-2 h-2 rounded-full bg-${process.color} mr-2`}
                                ></span>
                                <span>ISO 9001:2015</span>
                              </div>
                              <div className="flex items-center text-sm text-text-light border border-background-dark rounded-full px-3 py-1 bg-background shadow">
                                <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-2"></span>
                                <span>100% Đảm bảo chất lượng</span>
                              </div>
                              <div className="flex items-center text-sm text-text-light border border-background-dark rounded-full px-3 py-1 bg-background shadow">
                                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                                <span>Công nghệ tiên tiến</span>
                              </div>
                            </motion.div>

                            {/* Explore more button with arrow animation */}
                            <motion.div
                              className="mt-8"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.6 }}
                            >
                              <motion.a
                                href={`/services/${process.id}`}
                                className={`inline-flex items-center text-${process.color} font-medium hover:text-${process.color}-dark transition-colors`}
                                whileHover={{ x: 5 }}
                                transition={{
                                  type: "spring",
                                  stiffness: intensity.spring.stiffness,
                                  damping: intensity.spring.damping,
                                }}
                              >
                                Tìm hiểu thêm về quy trình {process.title.toLowerCase()}
                                <motion.span
                                  className="ml-2 inline-block"
                                  initial={{ x: 0 }}
                                  whileHover={{ x: 4 }}
                                >
                                  <ArrowRightIcon size={18} />
                                </motion.span>
                              </motion.a>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
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

// src/components/sections/social-proof/TestimonialCarousel.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import EnhancedCard from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

// Dữ liệu đánh giá từ khách hàng
const testimonials = [
  {
    id: 1,
    quote:
      "TextileTech đã giúp chúng tôi cải thiện quy trình sản xuất, nâng cao hiệu suất lên tới 35% chỉ trong quý đầu tiên. Đội ngũ triển khai của họ đặc biệt chuyên nghiệp trong việc hiểu và đáp ứng nhu cầu cụ thể của chúng tôi.",
    author: "Nguyễn Thị Minh Phương",
    title: "Giám đốc Vận hành",
    company: "Tổng Công ty May Nhà Bè",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D",
    color: "primary",
  },
  {
    id: 2,
    quote:
      "Quá trình triển khai diễn ra vô cùng trơn tru. Đội ngũ của TextileTech hiểu rõ nhu cầu đặc thù của chúng tôi và cung cấp giải pháp vượt xa mong đợi. Chúng tôi đã giảm 45% thời gian xử lý quy trình trong tất cả các bộ phận.",
    author: "Trần Minh Quân",
    title: "Giám đốc Sản xuất",
    company: "Công ty May Việt Tiến",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D",
    color: "secondary",
  },
  {
    id: 3,
    quote:
      "Chúng tôi đã cắt giảm chi phí sản xuất 20% đồng thời nâng cao tiêu chuẩn kiểm soát chất lượng trên tất cả các nhà máy. ROI từ giải pháp của TextileTech đạt được nhanh hơn nhiều so với dự kiến ban đầu của chúng tôi.",
    author: "Lê Thị Hoài Thu",
    title: "Trưởng phòng Đảm bảo Chất lượng",
    company: "Tập đoàn Dệt may Hòa Thọ",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D",
    color: "accent",
  },
];

interface TestimonialCarouselProps {
  reducedMotion?: boolean;
}

export default function TestimonialCarousel({ reducedMotion = false }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const backgroundControls = useAnimation();

  // Hiệu ứng background dựa trên testimonial hiện tại
  useEffect(() => {
    if (reducedMotion) return;

    const color = testimonials[currentIndex].color || "primary";
    let gradient = "";

    switch (color) {
      case "primary":
        gradient = "radial-gradient(circle at 30% 30%, rgba(43, 76, 126, 0.08), transparent 60%)";
        break;
      case "secondary":
        gradient = "radial-gradient(circle at 70% 30%, rgba(91, 140, 90, 0.08), transparent 60%)";
        break;
      case "accent":
        gradient = "radial-gradient(circle at 50% 70%, rgba(255, 107, 53, 0.08), transparent 60%)";
        break;
    }

    backgroundControls.start({
      background: gradient,
      transition: { duration: 1 },
    });
  }, [currentIndex, reducedMotion, backgroundControls]);

  // Tự động chuyển tiếp carousel
  useEffect(() => {
    if (isPaused || reducedMotion) return;

    autoplayRef.current = setTimeout(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
    };
  }, [currentIndex, isPaused, reducedMotion, testimonials.length]);

  const handlePrev = () => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Xử lý cử chỉ vuốt cho thiết bị di động
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      // Khoảng cách vuốt tối thiểu
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Hiệu ứng animation cho testimonial card
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? -10 : 10,
      scale: 0.9,
      filter: "blur(8px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction < 0 ? -10 : 10,
      scale: 0.9,
      filter: "blur(8px)",
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    static: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
  };

  // Hiệu ứng hình học nền
  const shapeVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      pathLength: 0,
    },
    animate: {
      opacity: 0.08,
      scale: 1,
      pathLength: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,

      scale: 1.2,
      transition: {
        duration: 0.3,
      },
    },
    static: {
      opacity: 0.06,
      scale: 1,
    },
  };

  // Hiệu ứng dấu ngoặc kép
  const quoteVariants = {
    initial: { opacity: 0, scale: 0, rotate: -45 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.2 },
    },
    static: {
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary text-white";
      case "secondary":
        return "bg-secondary text-white";
      case "accent":
        return "bg-accent text-white";
      default:
        return "bg-primary text-white";
    }
  };

  return (
    <div
      className="mb-32 relative perspective-[1200px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background animated */}
      <motion.div
        className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
        animate={backgroundControls}
      />

      {/* Background decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.svg
            key={`shape-${currentIndex}`}
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            initial={reducedMotion ? "static" : "initial"}
            animate={reducedMotion ? "static" : "animate"}
            exit={reducedMotion ? "static" : "exit"}
          >
            {currentIndex === 0 && (
              <motion.path
                d="M20,20 Q50,10 80,30 Q95,40 80,70 Q60,90 30,80 Q10,70 20,20 Z"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="0.5"
                variants={shapeVariants}
              />
            )}
            {currentIndex === 1 && (
              <motion.path
                d="M30,10 Q70,20 90,50 Q80,80 50,90 Q20,80 10,50 Q20,20 30,10 Z"
                fill="none"
                stroke="var(--color-secondary)"
                strokeWidth="0.5"
                variants={shapeVariants}
              />
            )}
            {currentIndex === 2 && (
              <motion.path
                d="M10,40 Q30,10 70,10 Q90,40 70,80 Q30,90 10,40 Z"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="0.5"
                variants={shapeVariants}
              />
            )}
          </motion.svg>
        </AnimatePresence>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="relative min-h-[400px] md:min-h-[300px] overflow-visible">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={testimonials[currentIndex].id}
              custom={direction}
              variants={cardVariants}
              initial={reducedMotion ? "static" : "enter"}
              animate={reducedMotion ? "static" : "center"}
              exit={reducedMotion ? "static" : "exit"}
              className="absolute w-full"
              style={{ perspective: "1000px" }}
            >
              <EnhancedCard
                variant="glass"
                elevation="lg"
                padding="lg"
                rounded="xl"
                highlightOnHover={!reducedMotion}
                motionIntensity={reducedMotion ? "none" : "medium"}
                borderGradient={testimonials[currentIndex].color as any}
                className="w-full"
              >
                {/* Dấu ngoặc kép đầu */}
                <motion.div
                  className={cn(
                    "absolute -top-10 -left-4 text-9xl font-serif",
                    testimonials[currentIndex].color === "primary"
                      ? "text-primary/10"
                      : testimonials[currentIndex].color === "secondary"
                      ? "text-secondary/10"
                      : "text-accent/10",
                  )}
                  variants={quoteVariants}
                  initial={reducedMotion ? "static" : "initial"}
                  animate={reducedMotion ? "static" : "animate"}
                  exit={reducedMotion ? "static" : "exit"}
                >
                  "
                </motion.div>

                {/* Dấu ngoặc kép cuối */}
                <motion.div
                  className={cn(
                    "absolute -bottom-24 -right-4 text-9xl font-serif",
                    testimonials[currentIndex].color === "primary"
                      ? "text-primary/10"
                      : testimonials[currentIndex].color === "secondary"
                      ? "text-secondary/10"
                      : "text-accent/10",
                  )}
                  variants={quoteVariants}
                  initial={reducedMotion ? "static" : "initial"}
                  animate={reducedMotion ? "static" : "animate"}
                  exit={reducedMotion ? "static" : "exit"}
                >
                  "
                </motion.div>

                <div className="relative z-10 md:px-8">
                  <blockquote className="text-lg md:text-xl font-heading leading-relaxed font-medium mb-6 text-primary-700">
                    {testimonials[currentIndex].quote}
                  </blockquote>

                  <div className="flex flex-col md:flex-row md:items-center mt-8">
                    <div className="flex items-center mb-4 md:mb-0 md:mr-8">
                      <motion.div
                        className={cn(
                          "mr-4 overflow-hidden rounded-full p-1",
                          testimonials[currentIndex].color === "primary"
                            ? "bg-gradient-to-br from-primary/20 to-primary/5"
                            : testimonials[currentIndex].color === "secondary"
                            ? "bg-gradient-to-br from-secondary/20 to-secondary/5"
                            : "bg-gradient-to-br from-accent/20 to-accent/5",
                        )}
                        animate={
                          !reducedMotion
                            ? {
                                y: [0, -5, 0],
                                transition: {
                                  repeat: Infinity,
                                  duration: 3,
                                  repeatType: "reverse",
                                },
                              }
                            : {}
                        }
                      >
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].author}
                          className="w-16 h-16 object-cover rounded-full border-2 border-white/50"
                        />
                      </motion.div>

                      <div>
                        <div className="font-semibold text-primary">
                          {testimonials[currentIndex].author}
                        </div>
                        <div className="text-sm text-text-light">
                          {testimonials[currentIndex].title}
                        </div>
                        <motion.div
                          initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4, duration: 0.3 }}
                          className="mt-1"
                        >
                          <img
                            src={testimonials[currentIndex].logo}
                            alt={testimonials[currentIndex].company}
                            className="h-6 object-contain"
                          />
                        </motion.div>
                      </div>
                    </div>

                    <motion.div
                      className="ml-auto flex-shrink-0 hidden md:block"
                      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      <div
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm",
                          getColorClass(testimonials[currentIndex].color),
                        )}
                      >
                        <span className="mr-2">★★★★★</span>
                        <span className="font-medium">Đối tác tin cậy</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </EnhancedCard>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation controls */}
        <div className="flex justify-center items-center mt-16 space-x-8">
          <Button
            onClick={handlePrev}
            variant="outline"
            size="lg"
            rounded="full"
            className="w-12 h-12 p-0"
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18L9 12L15 6" />
              </svg>
            }
            aria-label="Đánh giá trước đó"
            motionIntensity={reducedMotion ? "none" : "medium"}
          />

          <div className="flex space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  currentIndex === index
                    ? `bg-${testimonials[index].color}`
                    : "bg-primary/20 hover:bg-primary/40",
                )}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={!reducedMotion ? { scale: 1.2 } : {}}
                animate={
                  currentIndex === index && !reducedMotion
                    ? {
                        scale: [1, 1.2, 1],
                        transition: {
                          repeat: 1,
                          duration: 0.5,
                          repeatType: "reverse",
                        },
                      }
                    : {}
                }
                aria-label={`Chuyển đến đánh giá ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            variant="outline"
            size="lg"
            rounded="full"
            className="w-12 h-12 p-0"
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6L15 12L9 18" />
              </svg>
            }
            aria-label="Đánh giá tiếp theo"
            motionIntensity={reducedMotion ? "none" : "medium"}
          />
        </div>
      </div>
    </div>
  );
}

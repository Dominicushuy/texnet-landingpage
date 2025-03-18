// src/components/sections/social-proof/ClientLogos.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence, useInView } from "framer-motion";
import EnhancedScrollReveal from "@/components/ui/ScrollReveal";
import EnhancedCard from "@/components/ui/Card";
import { cn } from "@/utils/cn";

// Logo khách hàng mẫu - thay thế bằng logo khách hàng thực tế
const logos = [
  {
    id: 1,
    name: "May Mặc Việt Tiến",
    industry: "Thời trang công sở",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    name: "Dệt Kim Đông Xuân",
    industry: "Sản xuất vải",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "Tổng Công ty May Nhà Bè",
    industry: "May mặc xuất khẩu",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    name: "Công ty Đệt Phong Phú",
    industry: "Sản xuất vải chất lượng cao",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 5,
    name: "May Thêu Đức Giang",
    industry: "Thời trang cao cấp",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 6,
    name: "Tập đoàn Dệt May Hòa Thọ",
    industry: "May mặc chất lượng cao",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 7,
    name: "Thời Trang Elise",
    industry: "Thời trang nữ cao cấp",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 8,
    name: "Tổng Công ty May 10",
    industry: "May mặc công nghiệp",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

interface ClientLogosProps {
  reducedMotion?: boolean;
}

export default function ClientLogos({ reducedMotion = false }: ClientLogosProps) {
  const [focusedLogo, setFocusedLogo] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  // Hiệu ứng mouse parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    const moveX = (e.clientX - centerX) / 50;
    const moveY = (e.clientY - centerY) / 50;

    controls.start({
      rotateX: -moveY * 1.5,
      rotateY: moveX * 1.5,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    // Reset rotation khi chuột rời khỏi
    controls.start({
      rotateX: 0,
      rotateY: 0,
      transition: { type: "spring", stiffness: 150, damping: 15 },
    });
  };

  // Tự động chuyển focus nếu không có tương tác người dùng
  useEffect(() => {
    if (isHovering || reducedMotion || !isInView) return;

    const startAutoplay = () => {
      autoplayTimeoutRef.current = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * logos.length);
        setFocusedLogo(randomIndex);

        // Reset sau khi hiển thị một lúc
        const resetTimeout = setTimeout(() => {
          setFocusedLogo(null);
          startAutoplay();
        }, 2000);

        return () => clearTimeout(resetTimeout);
      }, 3000);
    };

    startAutoplay();

    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [isHovering, reducedMotion, isInView, logos.length]);

  return (
    <div className="mb-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex gap-2 md:gap-4 flex-wrap justify-center"
        >
          <div className="px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full">
            Thời trang
          </div>
          <div className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
            Dệt may
          </div>
          <div className="px-4 py-2 bg-secondary/10 text-secondary text-sm font-medium rounded-full">
            Sản xuất vải
          </div>
          <div className="px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full">
            Xuất khẩu
          </div>
          <div className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
            May công nghiệp
          </div>
        </motion.div>

        <EnhancedScrollReveal
          animation={reducedMotion ? "fade-in" : "fade-up"}
          staggerChildren={!reducedMotion}
          motionIntensity={reducedMotion ? "none" : "medium"}
          className="mb-4"
        >
          <EnhancedCard
            variant="glass"
            elevation="md"
            padding="lg"
            rounded="xl"
            borderGradient="primary"
            highlightOnHover={!reducedMotion}
            motionIntensity={reducedMotion ? "none" : "medium"}
          >
            <div
              ref={containerRef}
              className="perspective-[1200px] w-full"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                className="transform-gpu"
                initial={{ rotateX: 0, rotateY: 0 }}
                animate={controls}
              >
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                  onMouseEnter={() => setIsHovering(true)}
                >
                  {logos.map((logo, index) => (
                    <motion.div
                      key={logo.id}
                      className="relative group cursor-pointer"
                      initial={{ opacity: 0, y: 20, rotateX: -10 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.23, 1, 0.32, 1],
                        delay: index * 0.1,
                      }}
                      whileHover={
                        !reducedMotion
                          ? {
                              z: 20,
                              scale: 1.05,
                              transition: { duration: 0.2 },
                            }
                          : {}
                      }
                      onHoverStart={() => setFocusedLogo(index)}
                      onHoverEnd={() => setFocusedLogo(null)}
                    >
                      <div
                        className={cn(
                          "relative h-28 flex items-center justify-center p-4 rounded-xl overflow-hidden",
                          "bg-gradient-to-tr from-background-light to-background border border-primary/10",
                          "transform transition-all duration-300",
                          focusedLogo === index
                            ? "shadow-primary-md scale-105 border-accent/20 bg-gradient-to-tr from-background-light/80 to-accent/5"
                            : "filter grayscale hover:grayscale-0",
                        )}
                        style={{
                          transform: !reducedMotion
                            ? `perspective(1000px) rotateX(${(index % 2) * 3}deg) rotateY(${
                                ((index % 3) - 1) * 3
                              }deg)`
                            : "none",
                        }}
                      >
                        {/* Background blur effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute -inset-full bg-gradient-to-tr from-accent/10 to-primary/10 blur-xl group-hover:animate-slow-spin"></div>
                        </div>

                        {/* Spotlight effect */}
                        {focusedLogo === index && !reducedMotion && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-radial from-accent/10 to-transparent rounded-xl overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}

                        <AnimatePresence>
                          {focusedLogo === index && !reducedMotion && (
                            <motion.div
                              className="absolute -bottom-12 left-0 right-0 text-center bg-background-light/90 py-2 px-3 rounded-lg shadow-sm border border-primary/10 backdrop-blur-sm"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="font-medium text-primary text-sm">{logo.name}</div>
                              <div className="text-text-light text-xs mt-0.5">{logo.industry}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <img
                          src={logo.image}
                          alt={`Logo ${logo.name}`}
                          className="max-h-16 w-auto max-w-full object-contain transition-all duration-300 relative z-10"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </EnhancedCard>

          {/* Text at the bottom with gradient */}
          <motion.div
            className="text-center mt-6 text-sm text-text-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary font-medium">
              Hợp tác với hơn 150+ doanh nghiệp dệt may trên toàn quốc
            </span>
          </motion.div>
        </EnhancedScrollReveal>
      </div>

      {/* CSS cho hiệu ứng animated spin */}
      <style jsx global>{`
        @keyframes slow-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-slow-spin {
          animation: slow-spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

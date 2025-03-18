// src/components/sections/InteractiveHero.tsx
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowCircleRight } from "phosphor-react";
import { cn } from "@/utils/cn";

interface InteractiveHeroProps {
  className?: string;
}

export default function InteractiveHero({ className }: InteractiveHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  // const isInView = useInView(textRef, { once: false, amount: 0.3 });

  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Staggered animation for text elements
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo
      },
    },
  };

  // Floating animation for the scroll indicator
  const floatAnimation = {
    y: [0, -10, 0] as number[],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative min-h-screen flex items-center overflow-hidden", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-primary-700/20 z-0">
        <motion.div
          className="absolute inset-0 bg-primary-700 opacity-30"
          style={{
            backgroundImage: "url(/patterns/grid.svg)",
            backgroundSize: "30px",
            y: backgroundY,
          }}
        />
      </div>

      {/* Background Image with Parallax Effect */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <Image
          src="/images/industrial/factory-hero.jpg"
          alt="Industrial Washing Facility"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
      </motion.div>

      {/* Content Container */}
      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div ref={textRef} className="relative z-10" style={{ opacity, y: textY }}>
            <motion.div variants={itemVariants}>
              <div className="inline-block px-3 py-1 mb-4 bg-accent/90 rounded-full text-background-light text-sm font-medium">
                Giải pháp B2B hàng đầu Việt Nam
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-fluid-h1 text-background-light font-bold tracking-tight mb-6 text-shadow"
            >
              Giải pháp May mặc & Giặt là <br className="hidden md:block" />
              <span className="text-accent">Công nghiệp Thông minh</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-fluid-p text-background-light/90 max-w-xl mb-8"
            >
              Chúng tôi cung cấp các giải pháp toàn diện cho ngành may mặc và giặt là công nghiệp,
              giúp doanh nghiệp của bạn tối ưu hóa quy trình sản xuất và nâng cao chất lượng sản
              phẩm.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent hover:bg-accent-dark text-background-light font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Đăng ký tư vấn</span>
                <ArrowCircleRight weight="bold" className="ml-2" size={20} />
              </motion.a>

              <motion.a
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-background-light/10 hover:bg-background-light/20 text-background-light font-medium backdrop-blur-sm border border-background-light/30 transition-colors focus:outline-none focus:ring-2 focus:ring-background-light focus:ring-offset-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Khám phá dịch vụ
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex items-center">
              <div className="flex space-x-4 items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-background-light overflow-hidden bg-primary-300"
                    >
                      <Image
                        src={`/images/team/avatar-${i}.jpg`}
                        alt={`Client ${i}`}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-background-light">
                  <div className="font-medium">500+ Khách hàng</div>
                  <div className="text-sm text-background-light/80">Đang tin dùng dịch vụ</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Featured Element / Illustration */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block relative h-[500px] rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-accent/10 backdrop-blur-sm rounded-2xl border border-background-light/20 p-1">
              <div className="w-full h-full relative bg-primary-dark/40 rounded-xl overflow-hidden flex items-center justify-center">
                {/* Here you could add a video, 3D model, or complex illustration */}
                <div className="relative z-10 aspect-[4/3] w-[80%] rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="/images/industrial/washing-closeup.jpg"
                    alt="Advanced Washing Technology"
                    fill
                    className="object-cover"
                  />

                  {/* Visual elements */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-xs text-background-light">
                    Công nghệ mới 2025
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary-dark/90 to-transparent">
                    <h3 className="text-background-light font-medium mb-1">
                      Hệ thống giặt tự động
                    </h3>
                    <p className="text-background-light/80 text-sm">
                      Tiết kiệm 30% chi phí vận hành
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-[20%] right-[10%] w-20 h-20 bg-accent/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-[20%] left-[10%] w-32 h-32 bg-primary-light/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-background-light flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.span className="text-sm mb-2 opacity-80" animate={floatAnimation}>
          Cuộn xuống
        </motion.span>
        <motion.div animate={floatAnimation}>
          <ArrowDown size={24} weight="bold" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

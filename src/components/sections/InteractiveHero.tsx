"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ArrowCircleRight } from "phosphor-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

const InteractiveHero = () => {
  // Refs và tracking
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, amount: 0.3 });
  const isCTAInView = useInView(ctaRef, { once: true, amount: 0.5 });

  // Mouse tracking tối ưu với throttling
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Giảm số lượng particle
  const [particles, setParticles] = useState([]);

  // Scroll effects với tối ưu
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Giảm số lượng transform và sử dụng giá trị đơn giản hơn
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Chỉ dùng 1 spring animation cho hiệu ứng mượt nhất
  const smoothScrollEffect = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 90,
    mass: 0.5,
  });

  const smoothTextY = useTransform(smoothScrollEffect, [0, 1], ["0%", "30%"]);

  // Giảm số lượng particles và tối ưu hóa
  useEffect(() => {
    // Chỉ tạo particles khi component đã load xong
    if (isLoaded) {
      const particleCount = 8; // Giảm số lượng particles
      const generatedParticles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        size: Math.random() * 4 + 2, // Giảm kích thước
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 3,
      }));

      setParticles(generatedParticles);
    }
  }, [isLoaded]);

  // Đánh dấu component đã load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Scroll indicator với debouncing
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.scrollY > 30) {
          setHasScrolled(true);
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Handle mouse move với throttling để tránh quá nhiều tính toán
  const handleMouseMove = (e) => {
    if (!lastMoveTime.current || Date.now() - lastMoveTime.current > 50) {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - (rect.left + rect.width / 2)) / 25);
      mouseY.set((e.clientY - (rect.top + rect.height / 2)) / 25);
      lastMoveTime.current = Date.now();
    }
  };
  const lastMoveTime = useRef(0);

  // Đơn giản hóa animations
  const headlineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.06, // Nhanh hơn
      },
    },
  };

  const wordVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5, // Nhanh hơn
        ease: [0.2, 0.9, 0.3, 1],
      },
    },
  };

  // Content
  const headlineText = "Giải pháp May mặc & Giặt là";
  const subHeadlineText = "Công nghiệp Thông minh";
  const headlineWords = headlineText.split(" ");
  const subHeadlineWords = subHeadlineText.split(" ");

  // Hình ảnh đại diện người dùng
  const userAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  ];

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={containerRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        onMouseMove={handleMouseMove}
      >
        {/* Nền tĩnh để tránh repaint */}
        <div className="absolute inset-0 bg-primary-700/30 z-0" />

        {/* Background Pattern đơn giản hóa */}
        {isLoaded && (
          <m.div className="absolute inset-0 z-0" style={{ opacity: 0.08 }}>
            <m.div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
                backgroundSize: "30px",
                y: backgroundY,
              }}
            />
          </m.div>
        )}

        {/* Background Gradient */}
        <m.div
          className="absolute inset-0 z-0 bg-gradient-to-r from-primary/70 via-primary/40 to-transparent"
          style={{ opacity }}
        />

        {/* Background Image - Sử dụng CSS Transform */}
        <m.div className="absolute inset-0 z-0 will-change-transform" style={{ y: backgroundY }}>
          <div className="absolute inset-0 h-full w-full">
            <Image
              src="https://images.unsplash.com/photo-1581263518256-ba4a28ed5517?q=80&w=1920&auto=format&fit=crop"
              alt="Industrial Washing Facility"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAZEAADAQEBAAAAAAAAAAAAAAAAAQIDMUH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJcyIo//2Q=="
            />
          </div>
        </m.div>

        {/* Particles với hiệu ứng nhẹ hơn */}
        {isLoaded && (
          <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
            {particles.map((particle) => (
              <m.div
                key={particle.id}
                className="absolute rounded-full bg-primary-light opacity-20"
                style={{
                  width: particle.size,
                  height: particle.size,
                  top: `${particle.y}%`,
                  left: `${particle.x}%`,
                  willChange: "transform, opacity",
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}

        {/* Content Container */}
        <div className="container mx-auto px-4 pt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <m.div ref={textRef} className="relative z-10" style={{ opacity, y: smoothTextY }}>
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="inline-block px-3 py-1 mb-4 bg-accent/90 backdrop-blur-sm rounded-full text-background-light text-sm font-medium border border-accent/30 shadow-lg shadow-accent/20">
                  Giải pháp B2B hàng đầu Việt Nam
                </div>
              </m.div>

              <m.h1
                className="font-heading text-fluid-h1 text-background-light font-bold tracking-tight mb-6 text-shadow"
                variants={headlineVariants}
                initial="hidden"
                animate={isTextInView ? "visible" : "hidden"}
              >
                {headlineWords.map((word, i) => (
                  <m.span key={i} variants={wordVariants} className="inline-block mr-3">
                    {word}
                  </m.span>
                ))}
                <br className="hidden md:block" />
                {subHeadlineWords.map((word, i) => (
                  <m.span
                    key={i}
                    variants={wordVariants}
                    className={`inline-block mr-3 ${i === 2 ? "text-accent relative" : ""}`}
                  >
                    {word}
                    {i === 2 && (
                      <m.span
                        className="absolute -bottom-1 left-0 w-full h-1 bg-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1.2, duration: 0.4 }}
                      />
                    )}
                  </m.span>
                ))}
              </m.h1>

              <m.p
                className="text-fluid-p text-background-light/90 max-w-xl mb-8"
                initial={{ opacity: 0, y: 15 }}
                animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Chúng tôi cung cấp các giải pháp toàn diện cho ngành may mặc và giặt là công nghiệp,
                giúp doanh nghiệp của bạn tối ưu hóa quy trình sản xuất và nâng cao chất lượng sản
                phẩm.
              </m.p>

              <m.div
                ref={ctaRef}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.8,
                      ease: [0.2, 0.9, 0.3, 1],
                    },
                  },
                }}
                initial="hidden"
                animate={isCTAInView ? "visible" : "hidden"}
                className="flex flex-col sm:flex-row gap-4"
              >
                <m.a
                  href="/contact"
                  className="relative inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent hover:bg-accent-dark text-background-light font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-lg shadow-accent/20 overflow-hidden group"
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 10px 25px -5px rgba(255, 107, 53, 0.4), 0 8px 10px -6px rgba(255, 107, 53, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                  <m.span
                    className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.2)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    style={{
                      x: mouseX,
                      y: mouseY,
                      willChange: "transform",
                    }}
                  />
                  <span className="relative z-20 flex items-center">
                    <span>Đăng ký tư vấn</span>
                    <ArrowCircleRight weight="bold" className="ml-2" size={20} />
                  </span>
                </m.a>

                <m.a
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md backdrop-blur-sm bg-background-light/10 hover:bg-background-light/20 text-background-light font-medium border border-background-light/30 transition-colors focus:outline-none focus:ring-2 focus:ring-background-light focus:ring-offset-1"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Khám phá dịch vụ
                </m.a>
              </m.div>

              {/* UI Con số khách hàng */}
              <m.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      delay: 1.0,
                    },
                  },
                }}
                initial="hidden"
                animate={isCTAInView ? "visible" : "hidden"}
                className="mt-12 flex items-center"
              >
                <div className="flex space-x-4 items-center">
                  <div className="flex -space-x-2">
                    {userAvatars.map((avatar, i) => (
                      <m.div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-background-light overflow-hidden bg-primary-300 relative"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + i * 0.08 }}
                      >
                        <Image
                          src={avatar}
                          alt={`Client ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </m.div>
                    ))}
                  </div>
                  <m.div
                    className="text-background-light"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <div className="font-medium">500+ Khách hàng</div>
                    <div className="text-sm text-background-light/80">Đang tin dùng dịch vụ</div>
                  </m.div>
                </div>
              </m.div>
            </m.div>

            {/* Featured Element / Illustration - Tối ưu hóa */}
            <m.div
              className="hidden lg:block relative h-[500px] rounded-2xl overflow-hidden z-20"
              style={{ y: backgroundY }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-accent/10 backdrop-blur-sm rounded-2xl border border-background-light/20 p-1 shadow-2xl">
                <div className="w-full h-full relative bg-primary-dark/40 rounded-xl overflow-hidden flex items-center justify-center">
                  <div className="relative z-10 aspect-[4/3] w-[80%] rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?q=80&w=1080&auto=format&fit=crop"
                      alt="Advanced Washing Technology"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAZEAADAQEBAAAAAAAAAAAAAAAAAQIDMUH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJcyIo//2Q=="
                    />

                    {/* Visual elements tối ưu */}
                    {isLoaded && (
                      <>
                        <m.div
                          className="absolute top-4 left-4 px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-xs text-background-light border border-primary-light/30"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          Công nghệ mới 2025
                        </m.div>

                        <m.div
                          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary-dark/90 to-transparent"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.0 }}
                        >
                          <m.h3
                            className="text-background-light font-medium mb-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1 }}
                          >
                            Hệ thống giặt tự động
                          </m.h3>
                          <m.p
                            className="text-background-light/80 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                          >
                            Tiết kiệm 30% chi phí vận hành
                          </m.p>
                        </m.div>
                      </>
                    )}
                  </div>

                  {/* Giảm số lượng hiệu ứng trang trí */}
                  <m.div
                    className="absolute top-[20%] right-[10%] w-20 h-20 bg-accent/20 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </m.div>
          </div>
        </div>

        {/* Scroll Down Indicator - đơn giản và hiệu quả hơn */}
        {!hasScrolled && (
          <m.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-background-light flex flex-col items-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <m.span
              className="text-sm mb-2 opacity-80"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            >
              Cuộn xuống
            </m.span>
            <m.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            >
              <ArrowDown size={24} weight="bold" />
            </m.div>
          </m.div>
        )}
      </m.div>
    </LazyMotion>
  );
};

export default InteractiveHero;

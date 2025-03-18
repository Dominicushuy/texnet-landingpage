"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ArrowCircleRight } from "phosphor-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

// Tách component Particles riêng để tối ưu render
const Particles = React.memo(({ count = 8 }) => {
  // useMemo để tránh tính toán lại khi re-render
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 1, // Giảm kích thước
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 2,
      })),
    [count],
  );

  return (
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
            translateZ: 0, // Hardware acceleration
          }}
          animate={{
            y: [0, -15, 0],
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
  );
});

// Tách HeadlineText thành component riêng
const HeadlineText = React.memo(({ text, variants, wordVariants, isHighlighted = false }) => {
  const words = text.split(" ");

  return words.map((word, i) => (
    <m.span
      key={i}
      variants={wordVariants}
      className={`inline-block mr-3 ${
        isHighlighted && i === words.length - 1 ? "text-accent relative" : ""
      }`}
    >
      {word}
      {isHighlighted && i === words.length - 1 && (
        <m.span
          className="absolute -bottom-1 left-0 w-full h-1 bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.2, duration: 0.4 }}
        />
      )}
    </m.span>
  ));
});

const InteractiveHero = () => {
  // Refs và tracking
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, amount: 0.3 });
  const isCTAInView = useInView(ctaRef, { once: true, amount: 0.5 });

  // Mouse tracking tối ưu với debounce mạnh hơn
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastMoveTime = useRef(0);

  // Scroll effects với tối ưu
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Tối ưu transform với ít giá trị hơn
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Chỉ sử dụng một spring hiệu quả
  const smoothScrollEffect = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 80,
    mass: 0.5,
  });

  const smoothTextY = useTransform(smoothScrollEffect, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Đánh dấu component đã load với useEffect sẽ chỉ chạy một lần
  useEffect(() => {
    setIsLoaded(true);

    // Cleanup function khi unmount
    return () => {
      // Cleanup any resources
    };
  }, []);

  // Scroll indicator với debouncing tối ưu
  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 30) {
        setHasScrolled(true);
      }
    };

    // Sử dụng passive listener để tối ưu performance
    window.addEventListener("scroll", handler, { passive: true });

    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Handle mouse move với debounce mạnh hơn
  const handleMouseMove = useCallback(
    (e) => {
      // Tăng thời gian debounce lên 100ms
      if (!lastMoveTime.current || Date.now() - lastMoveTime.current > 100) {
        const rect = e.currentTarget.getBoundingClientRect();
        // Giảm độ nhạy để giảm tính toán
        mouseX.set((e.clientX - (rect.left + rect.width / 2)) / 40);
        mouseY.set((e.clientY - (rect.top + rect.height / 2)) / 40);
        lastMoveTime.current = Date.now();
      }
    },
    [mouseX, mouseY],
  );

  // Đơn giản hóa animations
  const headlineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.05, // Nhanh hơn
      },
    },
  };

  const wordVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4, // Nhanh hơn
        ease: [0.2, 0.9, 0.3, 1],
      },
    },
  };

  // Content
  const headlineText = "Giải pháp May mặc & Giặt là";
  const subHeadlineText = "Công nghiệp Thông minh";

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
        {/* Nền tĩnh */}
        <div className="absolute inset-0 bg-primary-700/30 z-0" />

        {/* Background Pattern đơn giản hóa */}
        {isLoaded && (
          <m.div
            className="absolute inset-0 z-0 opacity-8"
            style={{
              backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
              backgroundSize: "30px",
              willChange: "transform",
              y: backgroundY,
              translateZ: 0, // Kích hoạt GPU acceleration
            }}
          />
        )}

        {/* Background Gradient */}
        <m.div
          className="absolute inset-0 z-0 bg-gradient-to-r from-primary/70 via-primary/40 to-transparent"
          style={{ opacity, willChange: "opacity" }}
        />

        {/* Background Image - Sử dụng CSS Transform */}
        <m.div
          className="absolute inset-0 z-0"
          style={{
            y: backgroundY,
            willChange: "transform",
            translateZ: 0, // Hardware acceleration
          }}
        >
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

        {/* Particles tách riêng */}
        {isLoaded && <Particles count={6} />}

        {/* Content Container */}
        <div className="container mx-auto px-4 pt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <m.div
              ref={textRef}
              className="relative z-10"
              style={{
                opacity,
                y: smoothTextY,
                willChange: "transform, opacity",
                translateZ: 0, // Hardware acceleration
              }}
            >
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ willChange: "transform, opacity" }}
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
                <HeadlineText
                  text={headlineText}
                  variants={headlineVariants}
                  wordVariants={wordVariants}
                />
                <br className="hidden md:block" />
                <HeadlineText
                  text={subHeadlineText}
                  variants={headlineVariants}
                  wordVariants={wordVariants}
                  isHighlighted={true}
                />
              </m.h1>

              <m.p
                className="text-fluid-p text-background-light/90 max-w-xl mb-8"
                initial={{ opacity: 0, y: 15 }}
                animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{ willChange: "transform, opacity" }}
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
                style={{ willChange: "transform, opacity" }}
              >
                <m.a
                  href="/contact"
                  className="relative inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent hover:bg-accent-dark text-background-light font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-lg shadow-accent/20 overflow-hidden group"
                  whileHover={{
                    scale: 1.02, // Giảm độ nhảy
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ willChange: "transform" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                  <span className="relative z-20 flex items-center">
                    <span>Đăng ký tư vấn</span>
                    <ArrowCircleRight weight="bold" className="ml-2" size={20} />
                  </span>
                </m.a>

                <m.a
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md backdrop-blur-sm bg-background-light/10 hover:bg-background-light/20 text-background-light font-medium border border-background-light/30 transition-colors focus:outline-none focus:ring-2 focus:ring-background-light focus:ring-offset-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ willChange: "transform" }}
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
                style={{ willChange: "opacity" }}
              >
                <div className="flex space-x-4 items-center">
                  <div className="flex -space-x-2">
                    {userAvatars.map((avatar, i) => (
                      <m.div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-background-light overflow-hidden bg-primary-300 relative"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + i * 0.1 }}
                        style={{ willChange: "transform, opacity" }}
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
                    style={{ willChange: "transform, opacity" }}
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
              style={{
                y: backgroundY,
                willChange: "transform",
                translateZ: 0, // Hardware acceleration
              }}
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
                          style={{ willChange: "transform, opacity" }}
                        >
                          Công nghệ mới 2025
                        </m.div>

                        <m.div
                          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary-dark/90 to-transparent"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.0 }}
                          style={{ willChange: "transform, opacity" }}
                        >
                          <h3 className="text-background-light font-medium mb-1">
                            Hệ thống giặt tự động
                          </h3>
                          <p className="text-background-light/80 text-sm">
                            Tiết kiệm 30% chi phí vận hành
                          </p>
                        </m.div>
                      </>
                    )}
                  </div>

                  {/* Giảm số lượng hiệu ứng trang trí */}
                  <div className="absolute top-[20%] right-[10%] w-20 h-20 bg-accent/20 rounded-full blur-2xl opacity-40" />
                </div>
              </div>
            </m.div>
          </div>
        </div>

        {/* Scroll Down Indicator - đơn giản hơn */}
        {!hasScrolled && (
          <m.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-background-light flex flex-col items-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="text-sm mb-2 opacity-80">Cuộn xuống</span>
            <ArrowDown size={24} weight="bold" />
          </m.div>
        )}
      </m.div>
    </LazyMotion>
  );
};

export default React.memo(InteractiveHero);

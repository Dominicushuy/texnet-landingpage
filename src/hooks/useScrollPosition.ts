// src/hooks/useScrollPosition.ts
import { useState, useEffect } from "react";

interface ScrollPosition {
  scrollY: number;
  scrollDirection: "up" | "down";
  isScrolled: boolean;
  scrollPercentage: number;
}

export function useScrollPosition(threshold = 20): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollDirection: "up",
    isScrolled: false,
    scrollPercentage: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let requestId: number | null = null;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
      const isScrolled = currentScrollY > threshold;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollHeight ? (currentScrollY / scrollHeight) * 100 : 0;

      setScrollPosition({
        scrollY: currentScrollY,
        scrollDirection,
        isScrolled,
        scrollPercentage,
      });

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        // Use requestAnimationFrame to optimize performance
        requestId = window.requestAnimationFrame(() => {
          updateScrollPosition();
        });
        ticking = true;
      }
    };

    // Initialize values
    updateScrollPosition();

    // Add scroll event listener
    window.addEventListener("scroll", onScroll, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (requestId) {
        window.cancelAnimationFrame(requestId);
      }
    };
  }, [threshold]);

  return scrollPosition;
}

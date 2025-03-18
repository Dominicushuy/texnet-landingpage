// src/components/layout/EnhancedHeader.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimate,
} from "framer-motion";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";

// Import icons
import {
  CaretDown,
  Globe,
  X,
  List,
  ChatsCircle,
  ShoppingBag,
  Clock,
  MagnifyingGlass,
  TextT,
} from "phosphor-react";

type NavItem = {
  name: string;
  href: string;
  isNew?: boolean;
  dropdown?: { name: string; href: string; description?: string; icon?: React.ReactNode }[];
};

// Define navigation items
const navItems: NavItem[] = [
  { name: "Trang chủ", href: "/" },
  {
    name: "Dịch vụ",
    href: "/services",
    dropdown: [
      {
        name: "Giặt là công nghiệp",
        href: "/services/washing",
        description: "Giải pháp giặt là tiêu chuẩn quốc tế",
        icon: <Clock weight="duotone" />,
      },
      {
        name: "Sản xuất may mặc",
        href: "/services/manufacturing",
        description: "Hệ thống sản xuất hiện đại",
        icon: <ShoppingBag weight="duotone" />,
      },
      {
        name: "Tư vấn & Đào tạo",
        href: "/services/consulting",
        description: "Chuyên gia giàu kinh nghiệm",
        icon: <ChatsCircle weight="duotone" />,
      },
    ],
  },
  {
    name: "Quy trình",
    href: "/process",
    isNew: true,
  },
  { name: "Dự án", href: "/projects" },
  { name: "Về chúng tôi", href: "/about" },
  { name: "Liên hệ", href: "/contact" },
];

// Animation variants for various elements
const logoVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.05,
    filter: "drop-shadow(0 0 8px rgba(43, 76, 126, 0.7))",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const headerVariants = {
  top: {
    height: 96,
    backgroundColor: "rgba(43, 76, 126, 0)",
    backdropFilter: "none",
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
  },
  scrolled: {
    height: 72,
    backgroundColor: "rgba(43, 76, 126, 0.85)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const dropdownItemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: { opacity: 0, y: -5, transition: { duration: 0.1 } },
};

const mobileMenuVariants = {
  closed: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.07,
      delayChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const mobileNavItemVariants = {
  closed: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2, ease: [0.33, 1, 0.68, 1] },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function EnhancedHeader() {
  // State and refs
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState<string | null>(null);
  const [searchActive, setSearchActive] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const pathName = usePathname();

  // Scroll-based animations
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [0, 0.85]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 8]);
  const headerShadowOpacity = useTransform(scrollY, [0, 50], [0, 0.1]);
  const springHeaderOpacity = useSpring(headerOpacity, { stiffness: 300, damping: 30 });
  const springHeaderBlur = useSpring(headerBlur, { stiffness: 300, damping: 30 });
  const springHeaderShadowOpacity = useSpring(headerShadowOpacity, { stiffness: 300, damping: 30 });

  // Logo animation values
  const logoGlow = useMotionValue(0);
  const logoScale = useMotionValue(1);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Use requestAnimationFrame for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle click outside to close dropdowns and mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close dropdown if clicking outside
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setCurrentDropdown(null);
      }

      // Close mobile menu if clicking outside
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-menu-toggle="true"]')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Animate hamburger icon when mobile menu opens/closes
  useEffect(() => {
    if (isOpen) {
      animate(scope.current, {
        rotate: 180,
        pathLength: [
          [1, 0, 1], // First line disappears
          [0, 1, 0], // Second line animates to X (diagonal)
          [1, 0, 1], // Third line disappears
        ],
      });
    } else {
      animate(scope.current, {
        rotate: 0,
        pathLength: [
          [1, 1, 1], // All lines visible
          [1, 1, 1],
          [1, 1, 1],
        ],
      });
    }
  }, [isOpen, animate, scope]);

  // Handle dropdown hover
  const handleDropdownHover = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setCurrentDropdown(name);
  };

  // Handle dropdown hover leave
  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }

    dropdownTimeoutRef.current = setTimeout(() => {
      setCurrentDropdown(null);
    }, 300);
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle mobile dropdown toggle
  const toggleMobileDropdown = (name: string) => {
    setCurrentDropdown(currentDropdown === name ? null : name);
  };

  // Handle swipe gesture to close mobile menu
  const handleSwipeClose = (event: React.TouchEvent) => {
    const touchStartX = event.changedTouches[0].clientX;

    const handleTouchEnd = (endEvent: TouchEvent) => {
      const touchEndX = endEvent.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      if (deltaX > 50) {
        // Swipe right
        setIsOpen(false);
      }

      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchend", handleTouchEnd);
  };

  // Check if a path is active
  const isActivePath = (path: string) => {
    return pathName === path || pathName.startsWith(`${path}/`);
  };

  // Toggle search bar
  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  return (
    <motion.header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 text-background-light will-change-transform"
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      variants={headerVariants}
      style={{
        background: isScrolled
          ? `linear-gradient(to right, rgba(43, 76, 126, ${springHeaderOpacity.get()}), rgba(58, 101, 164, ${springHeaderOpacity.get()}))`
          : "transparent",
        backdropFilter: `blur(${springHeaderBlur.get()}px)`,
        boxShadow: `0 4px 20px rgba(0, 0, 0, ${springHeaderShadowOpacity.get()})`,
      }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="relative z-10"
          initial="normal"
          whileHover="hover"
          animate="normal"
          variants={logoVariants}
        >
          <Link href="/" className="flex items-center space-x-1">
            <TextT size={28} weight="bold" />
            <span className="text-2xl font-heading font-bold tracking-tight">
              <span>Textile</span>
              <span className="text-accent">Tech</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" ref={menuRef}>
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => item.dropdown && handleDropdownHover(item.name)}
              onMouseLeave={handleDropdownLeave}
            >
              {/* Nav Item */}
              <div className="relative px-3 py-2 rounded-md cursor-pointer">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center transition-colors",
                    isActivePath(item.href)
                      ? "text-background-light font-medium"
                      : "text-background-light/80 hover:text-background-light",
                  )}
                  onClick={(e) => item.dropdown && e.preventDefault()}
                >
                  <span className="relative">
                    {item.name}
                    {/* Underline animation */}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-accent transition-all duration-300",
                        isActivePath(item.href) ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    ></span>

                    {/* New badge for nav items */}
                    {item.isNew && (
                      <motion.span
                        className="absolute -top-2 -right-6 h-2 w-2 rounded-full bg-accent"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    )}
                  </span>

                  {/* Dropdown indicator */}
                  {item.dropdown && (
                    <motion.div
                      animate={{
                        rotate: currentDropdown === item.name ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <CaretDown weight="bold" size={16} className="ml-1" />
                    </motion.div>
                  )}
                </Link>
              </div>

              {/* Dropdown Menu */}
              {item.dropdown && (
                <AnimatePresence>
                  {currentDropdown === item.name && (
                    <motion.div
                      className="absolute left-0 mt-1 py-3 w-64 bg-gradient-to-br from-background-light to-background-dark rounded-md shadow-xl border border-primary/5 z-20 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10, rotateX: -10 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: 5, rotateX: -5 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: "top center" }}
                    >
                      <div className="px-2">
                        {item.dropdown.map((dropdownItem, index) => (
                          <motion.div
                            key={dropdownItem.name}
                            custom={index}
                            variants={dropdownItemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            whileHover={{
                              backgroundColor: "rgba(43, 76, 126, 0.05)",
                              x: 3,
                            }}
                            className="rounded-md overflow-hidden"
                          >
                            <Link
                              href={dropdownItem.href}
                              className="flex items-start gap-3 px-3 py-2 text-text hover:text-primary transition-colors"
                            >
                              {dropdownItem.icon && (
                                <div className="text-primary mt-0.5">{dropdownItem.icon}</div>
                              )}
                              <div>
                                <div className="font-medium">{dropdownItem.name}</div>
                                {dropdownItem.description && (
                                  <div className="text-xs mt-0.5 text-text-light">
                                    {dropdownItem.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

          {/* Search Icon */}
          <motion.div
            className="ml-2 px-3 py-2 rounded-md cursor-pointer text-background-light/80 hover:text-background-light"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSearch}
          >
            <MagnifyingGlass size={20} weight="bold" />
          </motion.div>

          {/* Language Switcher */}
          <motion.div
            className="ml-2 px-3 py-2 rounded-md cursor-pointer text-background-light/80 hover:text-background-light"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="flex items-center space-x-1"
              whileHover={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Globe size={18} weight="bold" />
              <span className="text-sm">VI</span>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="ml-4"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: [
                "0 0 0 rgba(255, 107, 53, 0)",
                "0 0 8px rgba(255, 107, 53, 0.5)",
                "0 0 0 rgba(255, 107, 53, 0)",
              ],
            }}
            transition={{
              boxShadow: {
                repeat: Infinity,
                duration: 2,
              },
            }}
          >
            <Link
              href="/contact"
              className="px-4 py-2 bg-accent text-background-light rounded-md font-medium transition-colors hover:bg-accent-dark"
            >
              Yêu cầu báo giá
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Trigger */}
        <motion.div className="md:hidden z-50" initial={false} data-menu-toggle="true">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-background-light focus:outline-none"
            aria-label="Toggle mobile menu"
            data-menu-toggle="true"
          >
            <svg
              ref={scope}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="4"
                y1="6"
                x2="20"
                y2="6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="4"
                y1="18"
                x2="20"
                y2="18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </motion.div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />

              {/* Mobile Menu */}
              <motion.div
                ref={mobileMenuRef}
                className="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-background-dark overflow-y-auto"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onTouchStart={handleSwipeClose}
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(31, 56, 89, 0.98), rgba(43, 76, 126, 0.9))",
                  boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Mobile menu decoration - abstract shapes for visual interest */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                  <motion.div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-600/20"
                    style={{ filter: "blur(80px)" }}
                    animate={{
                      x: [10, -10],
                      y: [10, -10],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 5,
                    }}
                  />
                  <motion.div
                    className="absolute bottom-20 left-0 w-40 h-40 rounded-full bg-accent/10"
                    style={{ filter: "blur(60px)" }}
                    animate={{
                      x: [-10, 10],
                      y: [-10, 10],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 4,
                    }}
                  />
                </div>

                {/* Mobile Menu Content */}
                <div className="relative pt-24 pb-8 px-6 z-10">
                  {/* Mobile Nav Items */}
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <motion.div key={item.name} variants={mobileNavItemVariants} className="py-2">
                        {item.dropdown ? (
                          <div>
                            <button
                              onClick={() => toggleMobileDropdown(item.name)}
                              className={cn(
                                "flex items-center justify-between w-full text-left rounded-md p-2",
                                isActivePath(item.href)
                                  ? "text-accent font-medium bg-primary-dark/40"
                                  : "text-background-light hover:bg-primary-dark/40",
                              )}
                            >
                              <span className="text-lg font-medium">{item.name}</span>
                              <div className="flex items-center">
                                {item.isNew && (
                                  <motion.span
                                    className="h-2 w-2 rounded-full bg-accent mr-2"
                                    animate={{
                                      scale: [1, 1.5, 1],
                                      opacity: [0.7, 1, 0.7],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    }}
                                  />
                                )}
                                <motion.div
                                  animate={{ rotate: currentDropdown === item.name ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <CaretDown weight="bold" size={16} />
                                </motion.div>
                              </div>
                            </button>

                            <AnimatePresence>
                              {currentDropdown === item.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden pl-4 mt-1 border-l border-accent/30"
                                >
                                  {item.dropdown.map((dropdownItem, index) => (
                                    <motion.div
                                      key={dropdownItem.name}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      className="py-2"
                                    >
                                      <Link
                                        href={dropdownItem.href}
                                        className="block text-background-light/90 hover:text-background-light p-2 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        <div className="flex items-start gap-2">
                                          {dropdownItem.icon && (
                                            <div className="text-accent/80 mt-1">
                                              {dropdownItem.icon}
                                            </div>
                                          )}
                                          <div>
                                            <div>{dropdownItem.name}</div>
                                            {dropdownItem.description && (
                                              <div className="text-xs mt-0.5 text-background-light/70">
                                                {dropdownItem.description}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center justify-between p-2 rounded-md",
                              isActivePath(item.href)
                                ? "text-accent font-medium bg-primary-dark/40"
                                : "text-background-light hover:bg-primary-dark/40",
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="text-lg font-medium">{item.name}</span>
                            {item.isNew && (
                              <motion.span
                                className="h-2 w-2 rounded-full bg-accent"
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                }}
                              />
                            )}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile Language Switcher */}
                  <motion.div
                    variants={mobileNavItemVariants}
                    className="mt-6 pt-6 border-t border-background-light/20"
                  >
                    <button className="flex items-center text-background-light/80 p-2 rounded-md hover:bg-primary-dark/40 w-full">
                      <Globe size={18} weight="bold" />
                      <span className="ml-2">Tiếng Việt</span>
                    </button>
                  </motion.div>

                  {/* Mobile CTA */}
                  <motion.div variants={mobileNavItemVariants} className="mt-8">
                    <Link
                      href="/contact"
                      className="block w-full px-4 py-3 bg-accent text-center text-background-light rounded-md font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Yêu cầu báo giá
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Overlay */}
        <AnimatePresence>
          {searchActive && (
            <motion.div
              className="fixed inset-0 z-50 flex items-start pt-24 px-4 bg-primary/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container mx-auto max-w-3xl">
                <div className="relative">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Tìm kiếm giải pháp may mặc..."
                    className="w-full p-4 rounded-lg bg-background-light/95 text-text border border-primary/10 text-lg focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                  <button
                    className="absolute right-3 top-3 text-text-light hover:text-accent p-1"
                    onClick={toggleSearch}
                  >
                    <X size={24} weight="bold" />
                  </button>
                </div>
                <div className="mt-2 text-sm text-background-light/80">
                  Nhập từ khóa để tìm kiếm sản phẩm, dịch vụ hoặc bài viết
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

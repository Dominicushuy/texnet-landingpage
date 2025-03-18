// src/components/layout/DynamicHeader.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { cn } from "@/utils/cn";
import { debounce } from "@/utils/cn";

// Phosphor icons
import { List, X, CaretDown, Globe } from "phosphor-react";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  href: string;
  isNew?: boolean;
  dropdown?: { name: string; href: string }[];
};

const navItems: NavItem[] = [
  { name: "Trang chủ", href: "/" },
  {
    name: "Dịch vụ",
    href: "/services",
    dropdown: [
      { name: "Giặt là công nghiệp", href: "/services/washing" },
      { name: "Sản xuất may mặc", href: "/services/manufacturing" },
      { name: "Tư vấn & Đào tạo", href: "/services/consulting" },
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

// Animation variants
const logoVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.05,
    filter: "drop-shadow(0 0 8px rgba(43, 76, 126, 0.5))",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const headerVariants = {
  initial: {
    height: 96,
    backgroundColor: "rgba(43, 76, 126, 0)",
    backdropFilter: "none",
  },
  scrolled: {
    height: 72,
    backgroundColor: "rgba(43, 76, 126, 0.85)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const mobileNavVariants = {
  closed: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const navItemVariants = {
  closed: {
    x: 20,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const hamburgerVariants = {
  closed: { rotate: 0 },
  open: { rotate: 90, transition: { duration: 0.4 } },
};

const notificationBadgeVariants = {
  initial: { scale: 0.8, opacity: 0.5 },
  animate: {
    scale: [0.8, 1.2, 1] as number[],
    opacity: [0.5, 1, 0.8] as number[],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

const ctaButtonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.98 },
  pulse: {
    boxShadow: [
      "0 0 0 0 rgba(255, 107, 53, 0)",
      "0 0 0 4px rgba(255, 107, 53, 0.3)",
      "0 0 0 0 rgba(255, 107, 53, 0)",
    ] as string[],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
};

export default function DynamicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [currentDropdown, setCurrentDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close dropdowns and mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setCurrentDropdown(null);
      }

      if (isOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        toggleOpen();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleOpen]);

  // Handle swipe gesture to close mobile menu
  const handleSwipe = (offsetX: number) => {
    if (offsetX > 50 && isOpen) {
      toggleOpen();
    }
  };

  // Check if a path is active
  const isActivePath = (path: string) => {
    return pathName === path || pathName.startsWith(`${path}/`);
  };

  // Toggle dropdown menu
  const toggleDropdown = (name: string) => {
    if (currentDropdown === name) {
      setCurrentDropdown(null);
    } else {
      setCurrentDropdown(name);
    }
  };

  return (
    <motion.header
      ref={headerRef}
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      variants={headerVariants}
      className="fixed top-0 left-0 w-full z-50 text-background-light"
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
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-heading font-bold tracking-tight">TextileTech</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" ref={menuRef}>
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {/* Nav Item */}
              <div
                className="relative px-3 py-2 rounded-md cursor-pointer"
                onClick={() => item.dropdown && toggleDropdown(item.name)}
              >
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
                        variants={notificationBadgeVariants}
                        initial="initial"
                        animate="animate"
                      />
                    )}
                  </span>

                  {/* Dropdown indicator */}
                  {item.dropdown && (
                    <CaretDown
                      weight="bold"
                      size={16}
                      className={cn(
                        "ml-1 transition-transform duration-300",
                        currentDropdown === item.name && "transform rotate-180",
                      )}
                    />
                  )}
                </Link>
              </div>

              {/* Dropdown Menu */}
              {item.dropdown && (
                <AnimatePresence>
                  {currentDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-1 py-2 w-56 bg-background-light rounded-md shadow-lg border border-primary/10 z-20"
                    >
                      {item.dropdown.map((dropdownItem, index) => (
                        <motion.div
                          key={dropdownItem.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-text hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            {dropdownItem.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

          {/* Language Switcher */}
          <motion.div
            className="ml-2 px-3 py-2 rounded-md cursor-pointer text-background-light/80 hover:text-background-light"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="flex items-center"
              whileHover={{ rotate: [0, 15, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Globe size={20} weight="regular" />
              <span className="ml-1 text-sm">VI</span>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="ml-4"
            variants={ctaButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate="pulse"
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
        <motion.div
          className="md:hidden"
          variants={hamburgerVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >
          <button
            onClick={() => toggleOpen()}
            className="p-2 text-background-light focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} weight="bold" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <List size={24} weight="bold" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-primary/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => toggleOpen()}
              />

              {/* Mobile Menu */}
              <motion.div
                className="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-primary-dark overflow-y-auto"
                variants={mobileNavVariants}
                initial="closed"
                animate="open"
                exit="closed"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => handleSwipe(info.offset.x)}
              >
                {/* Mobile Menu Content */}
                <div className="pt-20 pb-8 px-6">
                  {/* Mobile Nav Items */}
                  <div className="space-y-4">
                    {navItems.map((item) => (
                      <motion.div key={item.name} variants={navItemVariants} className="py-2">
                        {item.dropdown ? (
                          <div>
                            <button
                              onClick={() => toggleDropdown(item.name)}
                              className={cn(
                                "flex items-center justify-between w-full text-left",
                                isActivePath(item.href)
                                  ? "text-accent font-medium"
                                  : "text-background-light",
                              )}
                            >
                              <span className="text-xl font-medium">{item.name}</span>
                              <CaretDown
                                weight="bold"
                                size={18}
                                className={cn(
                                  "transition-transform duration-300",
                                  currentDropdown === item.name && "transform rotate-180",
                                )}
                              />
                              {item.isNew && (
                                <motion.span
                                  className="ml-2 h-2 w-2 rounded-full bg-accent"
                                  variants={notificationBadgeVariants}
                                  initial="initial"
                                  animate="animate"
                                />
                              )}
                            </button>

                            <AnimatePresence>
                              {currentDropdown === item.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden pl-4 mt-2 border-l-2 border-accent/30"
                                >
                                  {item.dropdown.map((dropdownItem, index) => (
                                    <motion.div
                                      key={dropdownItem.name}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="py-2"
                                    >
                                      <Link
                                        href={dropdownItem.href}
                                        className="block text-background-light/80 hover:text-background-light transition-colors"
                                        onClick={() => toggleOpen()}
                                      >
                                        {dropdownItem.name}
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
                              "flex items-center",
                              isActivePath(item.href)
                                ? "text-accent font-medium"
                                : "text-background-light",
                            )}
                            onClick={() => toggleOpen()}
                          >
                            <span className="text-xl font-medium">{item.name}</span>
                            {item.isNew && (
                              <motion.span
                                className="ml-2 h-2 w-2 rounded-full bg-accent"
                                variants={notificationBadgeVariants}
                                initial="initial"
                                animate="animate"
                              />
                            )}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile Language Switcher */}
                  <motion.div
                    variants={navItemVariants}
                    className="mt-6 pt-6 border-t border-background-light/20"
                  >
                    <button className="flex items-center text-background-light/80">
                      <Globe size={20} weight="regular" />
                      <span className="ml-2">Tiếng Việt</span>
                    </button>
                  </motion.div>

                  {/* Mobile CTA */}
                  <motion.div variants={navItemVariants} className="mt-8">
                    <Link
                      href="/contact"
                      className="block w-full px-4 py-3 bg-accent text-center text-background-light rounded-md font-medium"
                      onClick={() => toggleOpen()}
                    >
                      Yêu cầu báo giá
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

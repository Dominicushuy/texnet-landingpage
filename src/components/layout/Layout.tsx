// src/components/layout/Layout.tsx
"use client";

import React from "react";
import DynamicHeader from "./DynamicHeader";
import { useScrollPosition } from "@/hooks/useScrollPosition";

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function Layout({ children, showFooter = true }: LayoutProps) {
  const { scrollDirection, isScrolled } = useScrollPosition();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header sẽ hiển thị trên Hero Section */}
      <DynamicHeader />

      {/* Main content - không thêm padding-top ở đây để Hero section full-bleed */}
      <main className="flex-grow">{children}</main>

      {/* Thêm Footer nếu cần */}
      {/* {showFooter && <Footer />} */}
    </div>
  );
}

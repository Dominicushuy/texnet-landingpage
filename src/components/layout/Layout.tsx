// src/components/layout/Layout.tsx
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
      {/* Header with dynamic properties based on scroll */}
      <DynamicHeader />

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
    </div>
  );
}

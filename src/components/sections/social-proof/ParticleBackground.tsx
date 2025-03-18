"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ParticleBackgroundProps {
  reducedMotion?: boolean;
}

export default function ParticleBackground({ reducedMotion = false }: ParticleBackgroundProps) {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      duration: number;
    }>
  >([]);

  // Tạo particles chỉ sau khi component đã mounted (client-side only)
  useEffect(() => {
    const particleCount = 30;
    const generateParticles = () => {
      return Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
      }));
    };

    setParticles(generateParticles());
  }, []);

  if (reducedMotion || particles.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/5"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

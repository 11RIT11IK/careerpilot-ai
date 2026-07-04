"use client";

import { motion } from "framer-motion";

const orbs = [
  {
    size: 220,
    top: "12%",
    left: "8%",
    color: "bg-violet-500/10",
    duration: 8,
  },
  {
    size: 160,
    top: "60%",
    right: "12%",
    color: "bg-cyan-500/10",
    duration: 10,
  },
  {
    size: 120,
    bottom: "10%",
    left: "35%",
    color: "bg-blue-500/10",
    duration: 7,
  },
];

export default function FloatingOrbs() {
  return (
    <>
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`pointer-events-none absolute rounded-full blur-3xl ${orb.color}`}
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 12, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
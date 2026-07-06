"use client";

import { motion } from "framer-motion";

export default function LightBeam() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-y-0 -left-52 w-52 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[100px]"
      initial={{ x: 0 }}
      animate={{ x: "180vw" }}
      transition={{
        duration: 14,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
    />
  );
}
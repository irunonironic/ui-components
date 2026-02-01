"use client";

import { motion } from "framer-motion";

export default function Loader1() {
  return (
    <div className="relative w-[50px] h-[50px]">

      <motion.div
        className="w-full h-full rounded-full border-t-4 border-r-4 border-green-300 border-r-transparent"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute left-0 top-0 w-full h-full rounded-full border-l-4 border-b-4 border-l-[rgb(var(--brand))] border-b-transparent"
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "linear",
        }}
      />
    </div>
  );
}

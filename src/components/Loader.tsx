"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center p-40 rounded-lg">
      <motion.div
        className="w-[50px] h-[50px] border-r-[3px] border-t-[3px] border-t-[rgb(var(--text))] border-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
    </div>
  );
}

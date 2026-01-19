import { motion, AnimatePresence, type Variants } from "motion/react";
import { useState } from "react";

type MotionCheckboxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

// 1. Updated variants to handle stroke width, colors are now handled via props/CSS
const borderHover: Variants = {
  rest: { strokeWidth: 1 },
  hover: { strokeWidth: 2 },
};

const drawBorder: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", stiffness: 200, damping: 20 },
      opacity: { duration: 0.1 },
    },
  },
};

export default function MotionCheckbox({
  checked: controlled,
  onChange,
}: MotionCheckboxProps) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const checked = controlled ?? uncontrolled;

  const toggle = () => {
    const next = !checked;
    setUncontrolled(next);
    onChange?.(next);
  };

  return (
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={toggle}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      className="relative w-6 h-6 rounded-md flex items-center justify-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--text))] focus-visible:ring-offset-2"
    >
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
      >
        {/* Background Border (Inactive) - Uses --border variable */}
        <motion.rect
          variants={borderHover}
          x="2"
          y="2"
          width="20"
          height="20"
          rx="4"
          stroke="rgb(var(--border))" 
          strokeWidth={1}
        />

        {/* Foreground Border (Active) - Uses --text variable */}
        <motion.rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="4"
          stroke="rgb(var(--text))"
          strokeWidth={2}
          strokeLinecap="round"
          variants={drawBorder}
          initial="hidden"
          animate={checked ? "visible" : "hidden"}
        />
      </motion.svg>

      <AnimatePresence>
        {checked && (
          <motion.svg
            key="check"
            viewBox="0 0 24 24"
            // Uses Tailwind arbitrary value to inject the CSS variable for text color
            className="w-4 h-4 text-[rgb(var(--text))] z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
          >
            <motion.path
              d="M4 12l5 5 11-11"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
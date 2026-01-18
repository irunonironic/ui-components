import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown } from "lucide-react";
import { fireConfettiFromButton } from "../utils/confetti";
import { useRef } from "react";

function LoadingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        />
      ))}
    </div>
  );
}


/*Animated Check */

function AnimatedCheck({ className }: { className?: string }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* left stroke */}
      <motion.path
        d="M4 13l5 5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
      {/* right stroke */}
      <motion.path
        d="M9 18l11-11"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.28, delay: 0.22, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

/*Main Button  */

type State = "ready" | "loading" | "success";

export default function SubmitButton() {
  const [state, setState] = useState<State>("ready");
  const [shrink, setShrink] = useState(false);
  const [cycle, setCycle] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (state !== "ready") return;

    setState("loading");
    setTimeout(() => {
      setShrink(true);
    }, 200);


    setTimeout(() => {
      setState("success");
      if (buttonRef.current) {
        fireConfettiFromButton(buttonRef.current);
      }

      setShrink(false);
    }, 1400);

    setTimeout(() => {
      setState("ready");
      setCycle((c) => c + 1); 
    }, 2600);
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <motion.button
        ref={buttonRef}
        onClick={handleClick}
        disabled={state !== "ready"}
        layout
        transition={{ layout: { duration: 0.25, ease: "easeInOut" } }}
        style={{ WebkitTapHighlightColor: "transparent" }}
        className={`
          relative
          flex items-center justify-center
          h-[40px]
          rounded-full
          bg-[#323238]
          text-white
          border border-white/10
          shadow-xl
          overflow-hidden
          focus:outline-none
          active:outline-none
          cursor-pointer
          select-none
          ${shrink ? "w-[110px]" : "w-[140px]"}
        `}
      >
        <AnimatePresence mode="wait" initial={false}>
          {state === "ready" && (
            <motion.span
              key={`ready-${cycle}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <ArrowDown className="w-4 h-4" />
              Submit
            </motion.span>
          )}

          {state === "loading" && (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingDots />
            </motion.span>
          )}

          {state === "success" && (
            <motion.span
              key={`success-${cycle}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 "
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
              >
                <AnimatedCheck className="w-4 h-4 text-[#5cffa1]" />
              </motion.div>
              Success
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

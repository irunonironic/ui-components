import { useState } from "react";
import { motion } from "motion/react";

type StarProps = {
  fill: number; // 0 | 0.5 | 1
  onMouseMove?: (e: React.MouseEvent<SVGSVGElement>) => void;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
};

const Star = ({ fill, onMouseMove, onClick }: StarProps) => {
  return (
    <motion.svg
      className="w-10 h-10"
      viewBox="0 0 24 24"
      whileHover={{
        scale: 1.2,
        y: -2,
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      onMouseMove={onMouseMove}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <defs>
        {/* Gold gradient */}
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE9A3" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFB800" />
        </linearGradient>

        <filter
          id="star-glow"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="1" result="soft" />
          <feGaussianBlur stdDeviation="2" result="wide" />
          <feMerge>
            <feMergeNode in="wide" />
            <feMergeNode in="soft" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* empty */}
      <polygon
        points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
        fill="none"
        stroke="rgb(var(--border))"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/*filled star */}
      <motion.polygon
        points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
        fill="url(#gold-gradient)"
        filter={fill > 0 ? "url(#star-glow)" : "none"}
        animate={{
          clipPath:
            fill === 1
              ? "inset(0 0% 0 0)"
              : fill === 0.5
              ? "inset(0 50% 0 0)"
              : "inset(0 100% 0 0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </motion.svg>
  );
};

export default function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const displayValue = hover > 0 ? hover : rating;

  const handleMove = (
    e: React.MouseEvent<SVGSVGElement>,
    index: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    setHover(x < width / 2 ? index - 0.5 : index);
  };

  const handleClick = (
    e: React.MouseEvent<SVGSVGElement>,
    index: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    setRating(x < width / 2 ? index - 0.5 : index);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 font-satoshi">
      <div
        className="flex gap-4"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((index) => {
          let fill = 0;
          if (displayValue >= index) fill = 1;
          else if (displayValue >= index - 0.5) fill = 0.5;

          return (
            <Star
              key={index}
              fill={fill}
              onMouseMove={(e) => handleMove(e, index)}
              onClick={(e) => handleClick(e, index)}
            />
          );
        })}
      </div>

      <p className="text-lg text-[rgb(var(--text))]">
        Rating{" "}
        <span className="font-medium">
          {rating}
        </span>{" "}
        / 5
      </p>

      <button
        onClick={() => setRating(0)}
        className="
          px-4 py-1
          rounded-lg
          bg-[rgb(var(--bg))]
          text-[rgb(var(--text))]
          border border-[rgb(var(--border))]
          hover:bg-[rgb(var(--bg)/0.9)]
          transition-colors
          duration-200
        "
      >
        Clear Rating
      </button>
    </div>
  );
}

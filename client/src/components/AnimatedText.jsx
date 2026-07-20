import * as React from "react";
import { motion } from "framer-motion";

/**
 * AnimatedText — letter-by-letter spring animation with a gradient underline.
 *
 * Props:
 *  text              {string}   — the text to animate
 *  duration          {number}   — stagger duration between letters (default 0.04)
 *  delay             {number}   — delay between letters (default 0.05)
 *  replay            {boolean}  — animate on mount (default true)
 *  className         {string}   — wrapper class
 *  textClassName     {string}   — class applied to the motion flex row
 *  underlineClassName{string}   — extra class on the underline bar
 *  as                {string}   — semantic tag for the letter container (default "h2")
 *  underlineGradient {string}   — CSS gradient string (default gold → transparent)
 *  underlineHeight   {string}   — CSS height for the underline (default "3px")
 *  underlineOffset   {string}   — CSS bottom offset (default "-6px")
 */
const AnimatedText = React.forwardRef(
  (
    {
      text,
      duration = 0.04,
      delay = 0.05,
      replay = true,
      className = "",
      textClassName = "",
      underlineClassName = "",
      as: Component = "h2",
      underlineGradient = "linear-gradient(90deg, #FCD517 0%, #ff9900 60%, transparent 100%)",
      underlineHeight = "3px",
      underlineOffset = "-6px",
      ...props
    },
    ref
  ) => {
    const letters = Array.from(text);

    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: duration,
          delayChildren: delay,
        },
      },
    };

    const child = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
        },
      },
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
        },
      },
    };

    const lineVariants = {
      hidden: {
        width: "0%",
        left: "0%",
        opacity: 0,
      },
      visible: {
        width: "100%",
        left: "0%",
        opacity: 1,
        transition: {
          delay: letters.length * duration + delay,
          duration: 0.7,
          ease: "easeOut",
        },
      },
    };

    return (
      <div
        ref={ref}
        className={`animated-text-wrapper ${className}`}
        {...props}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <motion.div
            tag={Component}
            variants={container}
            initial="hidden"
            animate={replay ? "visible" : "hidden"}
            className={`animated-text-row ${textClassName}`}
            style={{ display: "flex", flexWrap: "wrap", overflow: "visible" }}
          >
            {letters.map((letter, index) => (
              <motion.span key={index} variants={child} style={{ display: "inline-block" }}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Animated gradient underline */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            style={{
              position: "absolute",
              bottom: underlineOffset,
              height: underlineHeight,
              background: underlineGradient,
              borderRadius: "2px",
            }}
            className={`animated-text-underline ${underlineClassName}`}
          />
        </div>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };

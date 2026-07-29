"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const spring = { type: "spring" as const, stiffness: 150, damping: 12, mass: 0.4 };

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setX((e.clientX - rect.left - rect.width / 2) * 0.25);
    setY((e.clientY - rect.top - rect.height / 2) * 0.25);
  }

  function handleMouseLeave() {
    setX(0);
    setY(0);
  }

  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x, y }}
        transition={spring}
        className={clsx("btn", className)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={spring}
      className={clsx("btn", className)}
    >
      {children}
    </motion.button>
  );
}

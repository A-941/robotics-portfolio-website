"use client";

import { useRef, useCallback, type ReactNode, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Separate props for button vs anchor
type ButtonProps = {
  as?: "button";
  href?: never;
  target?: never;
  rel?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorProps = {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
  onClick?: never;
  type?: never;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type MagneticButtonProps = (ButtonProps | AnchorProps) & {
  children: ReactNode;
  strength?: number;
};

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 28,
  as: Tag = "button",
  ...rest
}) => {
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 280, damping: 18 });
  const springY = useSpring(y, { stiffness: 280, damping: 18 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      x.set(relX * (strength / 100));
      y.set(relY * (strength / 100));
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Element = Tag as React.ElementType;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-flex"
    >
      <Element ref={ref} {...rest}>
        {children}
      </Element>
    </motion.div>
  );
};

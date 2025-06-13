"use client";

import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { motion } from "framer-motion"; // Import motion

import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const dockVariants = cva(
  // Base styles from Magic UI, these define the "default" look if not overridden
  // Removed mx-auto, mt-8, w-max, justify-center, gap-2 as these are better controlled by the instance
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 flex h-[58px] items-center rounded-2xl border p-2 backdrop-blur-md"
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      direction = "middle",
      ...props
    },
    ref,
  ) => {
    return (
      <motion.div // Changed to motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }} // Added opening animation
        animate={{ opacity: 1, y: 0 }}   // Added opening animation
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }} // Added opening animation
        {...props}
        className={cn(
          dockVariants(),
          className,
          {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          }
        )}
      >
        {children}
      </motion.div>
    );
  },
);
Dock.displayName = "Dock";

export { Dock, dockVariants };

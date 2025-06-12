"use client";

import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

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
      <div // Changed from motion.div
        ref={ref}
        // Removed motion-specific props
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
        {children} {/* Directly render children */}
      </div>
    );
  },
);
Dock.displayName = "Dock";

// DockIcon component, its props, and renderChildrenRecursive function are removed.

export { Dock, dockVariants };
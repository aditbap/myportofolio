
"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  type MotionProps,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";

import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  // Base styles from Magic UI, these define the "default" look if not overridden
  // Removed mx-auto, mt-8, w-max, justify-center, gap-2 as these are better controlled by the instance
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 flex h-[58px] items-center rounded-2xl border p-2 backdrop-blur-md"
);

// Function to recursively find and clone DockIcon components
const renderChildrenRecursive = (
  children: React.ReactNode,
  mouseXFromParent: MotionValue<number>,
  iconSizeFromParent: number,
  iconMagnificationFromParent: number,
  iconDistanceFromParent: number,
  baseKey: string = "child"
): React.ReactNode => {
  return React.Children.map(children, (child, index) => {
    const childKey = `${baseKey}-${index}`;
    if (!React.isValidElement(child)) {
      return child;
    }

    // If child is DockIcon, clone with animation props
    if (child.type === DockIcon) {
      return React.cloneElement(child as React.ReactElement<DockIconProps>, {
        key: child.key || childKey, // Ensure key for cloned element
        ...child.props,
        mouseX: mouseXFromParent,
        size: iconSizeFromParent,
        magnification: iconMagnificationFromParent,
        distance: iconDistanceFromParent,
      });
    }

    // If child has children, recurse
    if (child.props.children) {
      const newChildProps = {
        ...child.props,
        children: renderChildrenRecursive(
          child.props.children,
          mouseXFromParent,
          iconSizeFromParent,
          iconMagnificationFromParent,
          iconDistanceFromParent,
          childKey // Pass down a more specific baseKey
        ),
      };
      return React.cloneElement(child, newChildProps);
    }

    return child;
  });
};


const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className, // This is the className passed from page.tsx
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const processedChildren = renderChildrenRecursive(
      children,
      mouseX,
      iconSize,
      iconMagnification,
      iconDistance
    );

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)} // e.pageX is document-relative
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        {...props}
        // Corrected className merging for CVA:
        // 1. Apply base variants
        // 2. Apply className from props (e.g., from page.tsx)
        // 3. Apply conditional alignment classes
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
        {processedChildren}
      </motion.div>
    );
  },
);
Dock.displayName = "Dock";

export interface DockIconProps
  extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = ({
  size = DEFAULT_SIZE, // Base size of the icon's interactive area
  magnification = DEFAULT_MAGNIFICATION, // Max size on hover
  distance = DEFAULT_DISTANCE, // Range of mouse influence
  mouseX, // MotionValue for mouse X position (document-relative)
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Padding inside the DockIcon, scales with its base size
  const padding = Math.max(6, size * 0.2); 

  // Fallback mouseX if not provided (should always be provided by Dock)
  const defaultMouseX = useMotionValue(Infinity); 

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => { // val is e.pageX
    const bounds = ref.current?.getBoundingClientRect() ?? { left: 0, width: 0 };
    // To compare e.pageX (document-relative) with bounds.left (viewport-relative),
    // convert icon's left boundary to be document-relative by adding scrollX.
    const iconCenterXinDocument = bounds.left + (typeof window !== 'undefined' ? window.scrollX : 0) + bounds.width / 2;
    return val - iconCenterXinDocument;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance], // input range: from -distance to +distance around icon center
    [size, magnification, size], // output range: from base size to magnified size and back
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ 
        width: scaleSize, 
        height: scaleSize, 
        padding // Apply calculated padding
      }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full", 
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };

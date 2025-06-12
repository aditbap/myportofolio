
"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  type MotionProps,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"; // Changed to framer-motion
import React, { PropsWithChildren, useRef } from "react";

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
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 flex h-[58px] items-center rounded-2xl border p-2 backdrop-blur-md dark:border-neutral-700",
);

// Recursive function to process children
const renderChildrenRecursive = (
  children: React.ReactNode,
  mouseXFromParent: MotionValue<number>,
  iconSizeFromParent: number,
  iconMagnificationFromParent: number,
  iconDistanceFromParent: number
): React.ReactNode => {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // If the child is a DockIcon, clone it with animation props
    if (child.type === DockIcon) {
      return React.cloneElement(child as React.ReactElement<DockIconProps>, {
        ...child.props, // Spread existing props first
        mouseX: mouseXFromParent,
        size: iconSizeFromParent,
        magnification: iconMagnificationFromParent,
        distance: iconDistanceFromParent,
      });
    }

    // If the child has its own children, recurse
    if (React.isValidElement(child) && child.props.children) {
      const newChildProps = {
        ...child.props,
        children: renderChildrenRecursive(
          child.props.children,
          mouseXFromParent,
          iconSizeFromParent,
          iconMagnificationFromParent,
          iconDistanceFromParent
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
      className,
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
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants(), className, { 
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
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
  props?: PropsWithChildren;
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const padding = Math.max(6, size * 0.2); 

  const defaultMouseX = useMotionValue(Infinity); 

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size], 
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
        padding 
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

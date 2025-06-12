
"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  type MotionProps,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"; // Diubah dari motion/react
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
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md",
);

// Fungsi rekursif untuk memproses anak dan meneruskan props animasi
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

    // Jika anak adalah DockIcon, kloning dengan props animasi
    if (child.type === DockIcon) {
      return React.cloneElement(child as React.ReactElement<DockIconProps>, {
        // Sebarkan props yang ada terlebih dahulu
        ...child.props,
        mouseX: mouseXFromParent,
        size: iconSizeFromParent,
        magnification: iconMagnificationFromParent,
        distance: iconDistanceFromParent,
      });
    }

    // Jika anak memiliki anak sendiri, lakukan rekursi
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
      className, // Ini adalah className yang diteruskan dari parent (page.tsx)
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
        onMouseMove={(e) => mouseX.set(e.pageX)} // Menggunakan pageX sesuai contoh
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(
          dockVariants(), // Menerapkan gaya dasar dari CVA
          className,      // Menerapkan kelas kustom dari parent, bisa menimpa CVA
          {               // Menerapkan kelas kondisional untuk alignment
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
  // props?: PropsWithChildren; // Dihapus karena redundan
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

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => { // val adalah e.pageX
    const bounds = ref.current?.getBoundingClientRect() ?? { left: 0, width: 0 }; // bounds.left adalah X relatif thd viewport
    // Untuk membandingkan pageX (dokumen-relatif) dengan bounds.left (viewport-relatif),
    // kita perlu membuat posisi ikon menjadi dokumen-relatif.
    const iconCenterXinDocument = bounds.left + (typeof window !== 'undefined' ? window.scrollX : 0) + bounds.width / 2;
    return val - iconCenterXinDocument;
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

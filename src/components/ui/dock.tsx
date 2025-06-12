
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

// dockVariants dari kode yang diberikan pengguna
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
        ...child.props, // Sebarkan props yang ada terlebih dahulu
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
      className, // className prop dari DockProps
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

    // Menggunakan fungsi rekursif
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
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        // Memastikan className prop diterapkan dengan benar
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
  
  // Logika padding dari kode pengguna sebelumnya yang tampaknya lebih cocok
  const padding = Math.max(0, size * 0.1); // Disesuaikan agar ikon tidak terlalu kecil

  const defaultMouseX = useMotionValue(Infinity); 

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    // Menggunakan e.pageX (document-relative) untuk mouseX, jadi bounds.x juga harus sesuai
    // Jika mouseX adalah clientX (viewport-relative), bounds.x (viewport-relative) sudah benar.
    // Karena mouseX.set(e.pageX), kita perlu konsisten.
    // Untuk fixed elements, clientX dan pageX mungkin sama di atas, tapi getBoundingClientRect().x selalu viewport relative.
    // Mari kita coba pageX - window.scrollX untuk mendapatkan posisi viewport dari pageX
    // atau, lebih sederhana, jika mouseX adalah pageX, maka kita perlu posisi elemen relatif ke dokumen juga.
    // Solusi paling mudah: gunakan clientX untuk mouseX, yang sudah viewport-relative.
    // Namun, karena kode pengguna menentukan e.pageX, kita ikuti itu.
    // bounds.x adalah relatif viewport. pageX adalah relatif dokumen.
    // Untuk menyamakannya, kita bisa gunakan: val - (bounds.left + window.scrollX) - bounds.width / 2;
    // bounds.left sama dengan bounds.x
    return val - (bounds.x + (typeof window !== 'undefined' ? window.scrollX : 0)) - bounds.width / 2;
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
        padding // padding yang diterapkan di sini
      }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full", // Pastikan tidak ada padding dari className yang bertentangan
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

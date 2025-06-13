
// src/components/portfolio/footer-section.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ScrollFloatElement from '@/components/effects/ScrollFloatElement';
import { cn } from '@/lib/utils';

import myAvatar from '@/components/image/my-avatar.png';
import myAvatarHover from '@/components/image/my-avatar-hover.png';

const defaultImageSrc = myAvatar;
const hoverImageSrc = myAvatarHover; 

const FooterSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const currentImageSrc = isHovered ? hoverImageSrc : defaultImageSrc;
  const currentImageHint = isHovered ? "avatar hover" : "avatar memoji";

  const scrollFloatProps = {
    animationDuration: 0.8,
    ease: 'power1.out',
    scrollStart: 'top bottom-=5vh', 
    scrollEnd: 'center 75%',   
    stagger: 0.03, 
  };


  return (
    <footer className="py-64 md:py-80 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="https://linkedin.com/in/aditbap" 
          className="inline-block group" 
          aria-label="Get in touch via LinkedIn" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ScrollFloatElement {...scrollFloatProps}>
            <div className="flex items-center justify-center mt-[-5px]"> 
              <div className="relative mr-3 sm:mr-1">
                <Image
                  src={currentImageSrc}
                  alt="Avatar Benediktus Adit"
                  width={100}
                  height={100}
                  className="rounded-full transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                  data-ai-hint={currentImageHint}
                  priority
                />
                {isHovered && (
                  <ScrollFloatElement 
                    {...scrollFloatProps} 
                    containerClassName="absolute bottom-4 left-0"
                  >
                    <span
                      className="text-3xl sm:text-4xl transform transition-all duration-300 ease-out -rotate-12"
                      role="img"
                      aria-label="victory hand"
                      style={{ textShadow: '0 0 5px rgba(0,0,0,0.2)' }}
                    >
                      ✌🏻
                    </span>
                  </ScrollFloatElement>
                )}
              </div>
              <span 
                className={cn(
                  "font-jakarta font-bold text-3xl sm:text-5xl md:text-5xl text-foreground",
                  "dark:text-[#d8d8d8]" // Retain specific color for dark mode if desired, or remove for full foreground adaptation
                )}
                style={{ marginTop: '-20px' }} 
              >
                get in touch
              </span>
            </div>
          </ScrollFloatElement>
        </Link>
      </div>
    </footer>
  );
};

export default FooterSection;

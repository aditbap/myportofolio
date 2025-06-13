
// src/components/portfolio/footer-section.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ScrollFloatElement from '@/components/effects/ScrollFloatElement'; // Import the new component

// Baris berikut untuk mengimpor gambar lokal Anda.
// 1. Buat direktori src/components/image/
// 2. Taruh gambar Anda di sana, misalnya my-avatar.png dan my-avatar-hover.png
// 3. Hapus komentar pada baris di bawah ini dan pastikan pathnya benar.
import myAvatar from '@/components/image/my-avatar.png';
import myAvatarHover from '@/components/image/my-avatar-hover.png';
// Jika file belum ada, Next.js akan error saat build.

// Untuk contoh ini, kita tetap menggunakan placeholder:
const defaultImageSrc = myAvatar;
const hoverImageSrc = myAvatarHover; // Placeholder berbeda untuk hover, ganti dengan gambar hover Anda

const FooterSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Jika menggunakan gambar lokal yang diimpor:
  // const currentImageSrc = isHovered ? (myAvatarHover || hoverImageSrc) : (myAvatar || defaultImageSrc);
  // Untuk sekarang, kita langsung gunakan placeholder:
  const currentImageSrc = isHovered ? hoverImageSrc : defaultImageSrc;
  const currentImageHint = isHovered ? "avatar hover" : "avatar memoji";

  const scrollFloatProps = {
    animationDuration: 1,
    ease: 'back.inOut(2)',
    scrollStart: 'center bottom+=50%', // Adjusted for typical footer visibility
    scrollEnd: 'bottom bottom-=40%',   // Adjusted
    stagger: 0.03,
  };


  return (
    <footer className="py-64 md:py-80 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="mailto:aditbaps@gmail.com"
          className="inline-block group" // Mengubah menjadi inline-block dan group untuk hover effect
          aria-label="Get in touch via email"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center justify-center mt-[-5px]"> {/* Added negative top margin */}
            <div className="relative mr-3 sm:mr-1"> {/* Kontainer relatif untuk emoticon */}
              <ScrollFloatElement {...scrollFloatProps} containerClassName="flex">
                <Image
                  src={currentImageSrc}
                  alt="Avatar Benediktus Adit"
                  width={100}
                  height={100}
                  className="rounded-full transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                  data-ai-hint={currentImageHint}
                  priority
                />
              </ScrollFloatElement>
              {isHovered && (
                <ScrollFloatElement 
                  {...scrollFloatProps} 
                  containerClassName="absolute bottom-4 left-0" // Style applied to wrapper
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
            <div style={{ marginTop: '-20px' }}> {/* Wrap text in a div */}
              <ScrollFloatElement {...scrollFloatProps}>
                <span className="font-jakarta font-bold text-3xl sm:text-5xl md:text-5xl text-[#d8d8d8] group-hover:opacity-90 transition-opacity">
                  get in touch
                </span>
              </ScrollFloatElement>
            </div>
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default FooterSection;

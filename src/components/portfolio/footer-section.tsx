// src/components/portfolio/footer-section.tsx
'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Baris berikut untuk mengimpor gambar lokal Anda.
// 1. Buat direktori src/components/image/
// 2. Taruh gambar Anda di sana, misalnya my-avatar.png dan my-avatar-hover.png
// 3. Hapus komentar pada baris di bawah ini dan pastikan pathnya benar.
// import myAvatar from '@/components/image/my-avatar.png';
// import myAvatarHover from '@/components/image/my-avatar-hover.png'; 
// Jika file belum ada, Next.js akan error saat build.

// Untuk contoh ini, kita tetap menggunakan placeholder:
const defaultImageSrc = "https://placehold.co/100x100.png"; 
const hoverImageSrc = "https://placehold.co/100x100.png"; // Placeholder berbeda untuk hover, ganti dengan gambar hover Anda

const FooterSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Jika menggunakan gambar lokal yang diimpor:
  // const currentImageSrc = isHovered ? (myAvatarHover || hoverImageSrc) : (myAvatar || defaultImageSrc);
  // Untuk sekarang, kita langsung gunakan placeholder:
  const currentImageSrc = isHovered ? hoverImageSrc : defaultImageSrc;
  const currentImageHint = isHovered ? "avatar hover" : "avatar memoji";

  return (
    <footer className="py-32 md:py-48 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="mailto:aditbaps@gmail.com"
          className="inline-block group" 
          aria-label="Get in touch via email"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center"> {/* Container untuk gambar dan teks agar bisa disejajarkan */}
            <div className="relative mr-3 sm:mr-4"> {/* Kontainer relatif untuk emoticon */}
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
                <span
                  className="absolute bottom-1 left-1 text-4xl sm:text-5xl transform transition-all duration-300 ease-out scale-100"
                  role="img"
                  aria-label="victory hand"
                  style={{ textShadow: '0 0 5px rgba(0,0,0,0.2)' }} 
                >
                  ✌️
                </span>
              )}
            </div>
            <span className="font-jakarta font-bold text-3xl sm:text-4xl md:text-5xl text-primary-foreground group-hover:opacity-80 transition-opacity">
              get in touch
            </span>
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default FooterSection;

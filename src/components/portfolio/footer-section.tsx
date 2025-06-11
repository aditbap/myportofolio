// src/components/portfolio/footer-section.tsx
import Image from 'next/image';
import Link from 'next/link';
// Baris berikut untuk mengimpor gambar lokal Anda.
// Pastikan Anda membuat direktori src/components/image/ dan menaruh gambar my-avatar.png di sana.
// Setelah itu, hapus komentar pada baris di bawah ini:
// import myAvatar from '@/components/image/my-avatar.png';

const FooterSection: React.FC = () => {
  // Untuk menggunakan gambar lokal Anda:
  // 1. Pastikan baris 'import myAvatar...' di atas sudah tidak dikomentari dan path-nya benar.
  // 2. Ganti baris di bawah ini dari placeholder ke variabel myAvatar.
  //    const imageSource = myAvatar;
  // Untuk sementara, kita gunakan placeholder agar aplikasi tidak error:
  const imageSource = "https://placehold.co/56x56.png"; 

  return (
    <footer className="py-16 md:py-20 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="mailto:aditbaps@gmail.com"
          className="inline-flex items-center group"
          aria-label="Get in touch via email"
        >
          <Image
            src={imageSource} 
            alt="Avatar Benediktus Adit" 
            width={56}
            height={56}
            className="rounded-full mr-3 sm:mr-4 transform transition-transform duration-300 ease-in-out group-hover:scale-110"
            data-ai-hint="avatar memoji" 
            priority 
          />
          <span className="font-jakarta font-bold text-2xl sm:text-3xl md:text-4xl text-primary-foreground group-hover:opacity-80 transition-opacity">
            get in touch
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default FooterSection;

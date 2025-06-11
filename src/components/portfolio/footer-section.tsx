// src/components/portfolio/footer-section.tsx
import Image from 'next/image';
import Link from 'next/link';

// Baris berikut untuk mengimpor gambar lokal Anda.
// 1. Buat direktori src/components/image/
// 2. Taruh gambar Anda di sana, misalnya my-avatar.png
// 3. Hapus komentar pada baris di bawah ini dan pastikan pathnya benar.
// import myAvatar from '@/components/image/my-avatar.png';
// Jika file belum ada, Next.js akan error saat build.
// Untuk contoh ini, kita tetap menggunakan placeholder, tapi Anda akan menggantinya dengan import nyata:
// import myAvatar from '@/components/image/my-avatar.png'; // Pastikan gambar ini ada di path tersebut

const FooterSection: React.FC = () => {
  // Ganti baris berikut dengan: src={myAvatar} setelah Anda menambahkan gambar dan mengimpornya.
  // const imageSource = myAvatar;
  // Untuk sementara, kita gunakan placeholder agar aplikasi tidak error:
  const imageSource = "https://placehold.co/56x56.png"; 

  return (
    <footer className="py-16 md:py-20 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <Link
          href="mailto:aditbaps@gmail.com"
          className="inline-flex items-center group"
          aria-label="Get in touch via email"
        >
          <Image
            src={imageSource} // Jika menggunakan gambar lokal: src={myAvatar}
            alt="Avatar Benediktus Adit" // Sesuaikan alt text jika mengganti gambar
            width={56}
            height={56}
            className="rounded-full mr-3 sm:mr-4 transform transition-transform duration-300 ease-in-out group-hover:scale-110"
            data-ai-hint="avatar memoji" // Sesuaikan jika mengganti gambar
            priority 
          />
          <span className="font-jakarta font-bold text-3xl sm:text-4xl md:text-5xl text-primary-foreground group-hover:opacity-80 transition-opacity">
            get in touch
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default FooterSection;

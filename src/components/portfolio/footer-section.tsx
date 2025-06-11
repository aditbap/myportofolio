// src/components/portfolio/footer-section.tsx
import Image from 'next/image';
import Link from 'next/link';
// Asumsikan Anda memiliki gambar bernama my-avatar.png di src/components/image/
// Ganti dengan path dan nama file gambar Anda yang sebenarnya.
// Jika file belum ada, Next.js akan error saat build.
// Untuk contoh ini, kita tetap menggunakan placeholder, tapi Anda akan menggantinya dengan import nyata:
// import myAvatar from '@/components/image/my-avatar.png';

const FooterSection: React.FC = () => {
  // Ganti baris berikut dengan: src={myAvatar} setelah Anda menambahkan gambar dan mengimpornya.
  const imageSource = "https://placehold.co/56x56.png"; 
  // const imageSource = myAvatar; // Gunakan ini setelah mengimpor gambar Anda

  return (
    <footer className="py-16 md:py-20 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="mailto:aditbaps@gmail.com"
          className="inline-flex items-center group"
          aria-label="Get in touch via email"
        >
          <Image
            src={imageSource} // Gunakan variabel imageSource
            alt="Avatar Benediktus Adit" // Perbarui alt text jika perlu
            width={56}
            height={56}
            className="rounded-full mr-3 sm:mr-4 transform transition-transform duration-300 ease-in-out group-hover:scale-110"
            data-ai-hint="avatar memoji" // Perbarui hint jika perlu
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

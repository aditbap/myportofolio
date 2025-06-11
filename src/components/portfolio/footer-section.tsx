// src/components/portfolio/footer-section.tsx
import Image from 'next/image';
import Link from 'next/link';

const FooterSection: React.FC = () => {
  return (
    <footer className="py-16 md:py-20 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="mailto:aditbaps@gmail.com"
          className="inline-flex items-center group"
          aria-label="Get in touch via email"
        >
          <Image
            src="https://placehold.co/56x56.png"
            alt="Memoji style avatar"
            width={56}
            height={56}
            className="rounded-full mr-3 sm:mr-4 transform transition-transform duration-300 ease-in-out group-hover:scale-110"
            data-ai-hint="memoji avatar"
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

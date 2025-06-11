import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['Source Code Pro', 'monospace'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        wobble: {
          '0%, 100%': { transform: 'translateX(0%) rotate(0deg)' },
          '15%': { transform: 'translateX(-6px) rotate(-4deg)' },
          '30%': { transform: 'translateX(5px) rotate(3deg)' },
          '45%': { transform: 'translateX(-4px) rotate(-2deg)' },
          '60%': { transform: 'translateX(3px) rotate(1deg)' },
          '75%': { transform: 'translateX(-2px) rotate(0deg)' },
        },
        emojiSpinOut: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg) scale(1)', opacity: '1' },
          '25%': { transform: 'rotateX(360deg) rotateY(0deg) scale(1)', opacity: '1' },
          '50%': { transform: 'rotateX(360deg) rotateY(360deg) scale(1)', opacity: '1' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg) scale(0)', opacity: '0' },
        },
        textAppearWobble: {
          '0%': { opacity: '0', transform: 'scale(0.8) translateX(0%) rotate(0deg)' },
          '20%': { opacity: '1', transform: 'scale(1) translateX(0%) rotate(0deg)' },
          '29%': { transform: 'scale(1) translateX(-6px) rotate(-4deg)' },
          '38%': { transform: 'scale(1) translateX(5px) rotate(3deg)' },
          '47%': { transform: 'scale(1) translateX(-4px) rotate(-2deg)' },
          '56%': { transform: 'scale(1) translateX(3px) rotate(1deg)' },
          '65%': { transform: 'scale(1) translateX(-2px) rotate(0deg)' },
          '80%': { opacity: '1', transform: 'scale(1) translateX(-2px) rotate(0deg)' },
          '100%': { opacity: '1', transform: 'scale(1) translateX(-2px) rotate(0deg)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fadeInUp': 'fadeInUp 0.5s ease-out forwards',
        'fadeInUpBack': 'fadeInUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'wobble': 'wobble 0.8s ease-in-out',
        'emojiSpinOut': 'emojiSpinOut 1s ease-in-out forwards',
        'textAppearWobble': 'textAppearWobble 0.8s ease-in-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

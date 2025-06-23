/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'light-peach': '#FEF3EF',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // 위즈포레 브랜드 컬러 팔레트 (코랄/핑크 계열)
        wizfore: {
          // Primary Colors
          white: '#FFFFFF',
          'warm-beige': '#FFF8F0',
          
          // Brand Colors (코랄/핑크 계열)
          'coral-primary': '#FF6B6B',
          'coral-secondary': '#FF8A80',
          'coral-light': '#FFAA9D',
          'coral-accent': '#FF9999',
          
          // Background Colors (핑크톤 베이지/크림)
          'soft-pink': '#FFE0E0',
          'cream-pink': '#FFFAF0',
          'light-coral': '#FFCCCB',
          
          // Text Colors (안전한 그레이 계열)
          'text-primary': '#333333',
          'text-secondary': '#666666',
          'text-light': '#888888',
          'text-brand': '#FF6B6B',
        },
        
        // 기존 마인드스토리 컬러 (하위 호환성 - 새 브랜드 컬러로 매핑)
        mindstory: {
          // 메인 버튼 색상 - 코랄 계열로 변경
          lime: '#FF6B6B', // coral-primary로 변경
          'lime-dark': '#FF8A80', // coral-secondary로 변경
          'lime-light': '#FFAA9D', // coral-light로 변경
          // 로고 컬러들
          blue: '#2196F3',
          green: '#4CAF50',
          orange: '#FF9800',
          pink: '#E91E63',
          purple: '#9C27B0',
          teal: '#009688',
          // 중성 컬러 - 새 배경 색상으로 매핑
          'gray-warm': '#FFE0E0', // soft-pink로 변경
          'gray-text': '#333333', // text-primary 유지
          'gray-light': '#FFFAF0', // cream-pink로 변경
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

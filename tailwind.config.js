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
        // 위즈포레 브랜드 컬러 팔레트
        wizfore: {
          // Primary Colors
          white: '#FFFFFF',
          'warm-beige': 'rgb(254, 243, 239)',
          
          // Brand Colors
          'warm-brown': 'rgb(139, 69, 19)',
          'medium-brown': 'rgb(160, 82, 45)',
          'sandy-brown': 'rgb(205, 133, 63)',
          
          // Background Colors
          'light-beige': 'rgb(245, 235, 220)',
          'ivory-beige': 'rgb(250, 240, 230)',
          
          // Text Colors (안전한 그레이 계열)
          'text-primary': '#333333',
          'text-secondary': '#666666',
          'text-light': '#888888',
          'text-brand': 'rgb(139, 69, 19)',
        },
        
        // 기존 마인드스토리 컬러 (하위 호환성)
        mindstory: {
          // 메인 라임 그린 (버튼 색상) - 위즈포레 브랜드 색상으로 교체 예정
          lime: 'rgb(139, 69, 19)', // warm-brown으로 변경
          'lime-dark': 'rgb(160, 82, 45)', // medium-brown으로 변경
          'lime-light': 'rgb(205, 133, 63)', // sandy-brown으로 변경
          // 로고 컬러들
          blue: '#2196F3',
          green: '#4CAF50',
          orange: '#FF9800',
          pink: '#E91E63',
          purple: '#9C27B0',
          teal: '#009688',
          // 중성 컬러
          'gray-warm': 'rgb(245, 235, 220)', // light-beige로 변경
          'gray-text': '#333333', // text-primary로 변경
          'gray-light': 'rgb(250, 240, 230)', // ivory-beige로 변경
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

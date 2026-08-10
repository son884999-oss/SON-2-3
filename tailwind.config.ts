import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f3b76',
        surface: '#ffffff',
        muted: '#6b7280',
        success: '#14915e',
        warning: '#d97706',
        danger: '#dc2626',
      },
      boxShadow: {
        card: '0 18px 50px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        xl: '1.4rem',
      },
    },
  },
  plugins: [],
};

export default config;

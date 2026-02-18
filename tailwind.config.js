/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 平安橙色主题
        brand: {
          50:  '#FFF4EE',
          100: '#FFE4D0',
          200: '#FFCAA3',
          300: '#FFA36B',
          400: '#FF7530',
          500: '#FF6010',  // 平安主橙色
          600: '#E8460A',
          700: '#C73208',
          800: '#A02A0C',
          900: '#82260F',
        },
        // AI 对话蓝色（区分 AI 与品牌 UI）
        ai: {
          400: '#4F7FFF',
          500: '#2B5EE8',
          600: '#1A45C8',
        },
        // 中性色
        surface: '#FFF8F4',
        card: '#FFFFFF',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'PingFang SC', 'Helvetica Neue', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

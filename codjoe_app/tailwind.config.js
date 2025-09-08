/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-head': "url('/src/assets/images/IMG-1.jpg')",
        'home-head-lg-img1': "url('/src/assets/images/products/Photos/tops/top1.jpg')",
        'home-head-lg-img2': "url('/src/assets/images/products/Photos/tops/top2.jpg')",
        'home-head-lg-img3': "url('/src/assets/images/products/Photos/tops/top3.jpg')",
        'best-sellers': "url('/src/assets/images/IMG-2.jpg')",
        'perfect-mix': "url('/src/assets/images/IMG-3.jpg')",
        'summer-jacket': "url('/src/assets/images/IMG-4.jpg')",
        'classic-jeans-jacket': "url('/src/assets/images/IMG-5.jpg')",
      },
      colors: {
        'codjoe-biscuit': '#A77E5B',
      },
      dropShadow: {
        'authShadow': '0 35px 35px rgba(102,51,82,0.20)',
      },
    }
  },
  plugins: [],
}
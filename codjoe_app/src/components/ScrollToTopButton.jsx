import React from 'react'

export default function ScrollToTopButton({ showScrollTop, scrollToTop }) {
  return (
    showScrollTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-codjoe-biscuit hover:bg-codjoe-biscuit/90 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 border border-white"
        aria-label="Retour en haut"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    )
  )
}

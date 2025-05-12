const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full text-center text-sm text-gray-400 py-4 border-t border-white/10 bg-[#0e0e0e]/90 backdrop-blur-sm z-50">
      <p>
        Built by <span className="text-white font-medium">Leonel Gonzalez</span> ·{' '}
        <a
          href="https://leogonzalezdev.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00B5CC] hover:underline"
        >
          Portfolio
        </a>{' '}
        · Technical challenge for <span className="text-white font-semibold">Conexa</span>
      </p>
    </footer>
  )
}

export default Footer
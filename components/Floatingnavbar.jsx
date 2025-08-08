import React from 'react'

const Navbar = () => {
  return (
    <nav className="sticky top-6 z-50 mx-auto my-6 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center rounded-2xl px-6 py-4 backdrop-blur-md bg-white/70 shadow-[0_0_20px_rgba(0,0,0,0.05)] border border-gray-200">
        {/* Left Side - Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
            <span className="text-green-600 font-bold text-sm">🍀</span>
          </div>
          <span className="text-lg font-semibold text-gray-800">Clover</span>
        </div>

        {/* Center - Nav Links */}
        <ul className="hidden md:flex space-x-8 text-sm text-gray-700 font-medium">
          <li><a href="#">Product</a></li>
          <li><a href="#">Reviews</a></li>
          <li><a href="#">Benefits</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Changelog</a></li>
        </ul>

        {/* Right Side - Button */}
        <a
          href="#"
          className="flex items-center gap-2 border border-black text-black bg-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-black hover:text-white transition"
        >
          <span className="text-lg">↗</span> Get Clover
        </a>
      </div>
    </nav>
  )
}

export default Navbar

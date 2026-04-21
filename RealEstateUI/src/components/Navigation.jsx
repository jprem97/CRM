import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            🏠 Real Estate
          </Link>
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

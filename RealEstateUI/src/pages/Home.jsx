import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <Navigation />
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            🏠 Welcome to Real Estate Dashboard
          </h1>
          <p className="text-xl text-blue-100 mb-12">
            Choose your role to get started
          </p>
          <div className="flex gap-6 justify-center">
            <button
              onClick={() => navigate('/client')}
              className="btn-primary bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold"
            >
              👤 Client
            </button>
            <button
              onClick={() => navigate('/user')}
              className="btn-primary bg-green-500 hover:bg-green-600 px-8 py-4 text-lg font-bold"
            >
              👔 User
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

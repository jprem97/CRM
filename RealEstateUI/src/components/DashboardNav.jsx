import React from 'react'
import { Link } from 'react-router-dom'

function DashboardNav({ title, onLogout, activeTab, setActiveTab, tabs, labels }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 mb-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            🏠 Real Estate
          </Link>
          <button
            onClick={onLogout}
            className="btn-danger text-sm"
          >
            🚪 Logout
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
        <div className="flex gap-2 overflow-x-auto pb-4 border-b">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t-lg whitespace-nowrap font-medium transition ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {labels[idx]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default DashboardNav

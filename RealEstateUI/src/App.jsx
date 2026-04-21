import React, { createContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ClientPortal from './pages/ClientPortal'
import UserPortal from './pages/UserPortal'
import AgentDashboard from './pages/AgentDashboard'
import AdminDashboard from './pages/AdminDashboard'

export const AuthContext = createContext()

function App() {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  })

  const login = (token, role, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    localStorage.setItem('user', JSON.stringify(user))
    setAuth({ token, role, user })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    setAuth({ token: null, role: null, user: null })
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/client" element={<ClientPortal />} />
          <Route path="/user" element={<UserPortal />} />
          <Route 
            path="/agent-dashboard" 
            element={auth.role === 'AGENT' ? <AgentDashboard /> : <Navigate to="/user" />} 
          />
          <Route 
            path="/admin-dashboard" 
            element={auth.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/user" />} 
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App

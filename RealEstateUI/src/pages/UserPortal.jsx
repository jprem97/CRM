import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { userAPI } from '../services/api'
import { AuthContext } from '../App'

function UserPortal() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [step, setStep] = useState('role-selection') // role-selection, login, register
  const [selectedRole, setSelectedRole] = useState(null)
  const [mode, setMode] = useState('login') // login or register
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
  })

  const handleSelectRole = (role) => {
    setSelectedRole(role)
    setStep('login')
    setMode('login')
    setError(null)
  }

  const handleChangeRole = () => {
    setStep('role-selection')
    setSelectedRole(null)
    setError(null)
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await userAPI.login(loginData.email, loginData.password)
      login(response.data.accessToken, selectedRole, response.data.user)
      if (selectedRole === 'AGENT') {
        navigate('/agent-dashboard')
      } else {
        navigate('/admin-dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const payload = {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        role: selectedRole,
      }
      if (selectedRole === 'AGENT' && registerData.location) {
        payload.location = registerData.location
      }
      await userAPI.register(payload)
      setRegisterData({ name: '', email: '', password: '', location: '' })
      setMode('login')
      alert('Registration successful! Please login.')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {step === 'role-selection' && (
            <div className="card">
              <h1 className="section-title text-center">User Portal</h1>
              <h2 className="subsection-title text-center mb-8">Select Your Role</h2>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleSelectRole('AGENT')}
                  className="btn-primary bg-purple-600 hover:bg-purple-700 py-3"
                >
                  🏢 Agent
                </button>
                <button
                  onClick={() => handleSelectRole('ADMIN')}
                  className="btn-primary bg-red-600 hover:bg-red-700 py-3"
                >
                  👑 Admin
                </button>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/')}
                  className="w-full btn-secondary"
                >
                  ← Back Home
                </button>
              </div>
            </div>
          )}

          {step === 'login' && (
            <div className="card">
              <h1 className="section-title text-center">Login</h1>
              <button
                type="button"
                onClick={handleChangeRole}
                className="btn-secondary w-full mb-4 text-sm"
              >
                ← Change Role
              </button>

              {error && <div className="error-message mb-4">{error}</div>}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="Enter your email"
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    required
                    className="form-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <p className="text-center mt-4 text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setMode('register')
                    setError(null)
                  }}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Register
                </button>
              </p>
            </div>
          )}

          {step === 'login' && mode === 'register' && (
            <div className="card">
              <h1 className="section-title text-center">Register</h1>
              <button
                type="button"
                onClick={handleChangeRole}
                className="btn-secondary w-full mb-4 text-sm"
              >
                ← Change Role
              </button>

              {error && <div className="error-message mb-4">{error}</div>}

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    placeholder="Enter your name"
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="Enter your email"
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    placeholder="Enter your password"
                    required
                    className="form-input"
                  />
                </div>

                {selectedRole === 'AGENT' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={registerData.location}
                      onChange={handleRegisterChange}
                      placeholder="Where you operate"
                      className="form-input"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>

              <p className="text-center mt-4 text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setMode('login')
                    setError(null)
                  }}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Login
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserPortal

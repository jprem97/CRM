import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { clientAPI } from '../services/api'

function ClientPortal() {
  const navigate = useNavigate()
  const [step, setStep] = useState('role-selection') // role-selection, form, result
  const [selectedRole, setSelectedRole] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredLocation: '',
    price: '',
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSelectRole = (role) => {
    setSelectedRole(role)
    setStep('form')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        preferredLocation: formData.preferredLocation,
        type: selectedRole.toUpperCase(),
        price: formData.price ? parseFloat(formData.price) : null,
      }
      const response = await clientAPI.createClient(payload)
      setResult({
        success: true,
        clientId: response.data.client._id,
        data: response.data.client
      })
      setStep('result')
    } catch (error) {
      setResult({
        success: false,
        error: error.response?.data?.message || error.message
      })
      setStep('result')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setStep('role-selection')
    setSelectedRole(null)
    setFormData({ name: '', phone: '', preferredLocation: '', price: '' })
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {step === 'role-selection' && (
            <div className="card">
              <h1 className="section-title text-center">Client Portal</h1>
              <h2 className="subsection-title text-center mb-8">Are you a Seller or Buyer?</h2>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleSelectRole('seller')}
                  className="btn-primary bg-amber-600 hover:bg-amber-700 px-8 py-4 text-lg"
                >
                  🏠 Seller
                </button>
                <button
                  onClick={() => handleSelectRole('buyer')}
                  className="btn-primary bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
                >
                  🔍 Buyer
                </button>
              </div>
              <div className="mt-8 text-center">
                <button
                  onClick={() => navigate('/')}
                  className="btn-secondary text-gray-600 bg-gray-300 hover:bg-gray-400"
                >
                  ← Back Home
                </button>
              </div>
            </div>
          )}

          {step === 'form' && (
            <div className="card">
              <h1 className="section-title text-center">
                {selectedRole === 'seller' ? 'Seller Details' : 'Buyer Details'}
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Location *</label>
                  <input
                    type="text"
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    placeholder="Enter preferred location"
                    required
                    className="form-input"
                  />
                </div>

                {selectedRole === 'seller' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Price *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter expected price"
                      required
                      className="form-input"
                    />
                  </div>
                )}

                {selectedRole === 'buyer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget (Optional)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter your budget"
                      className="form-input"
                    />
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1"
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-secondary flex-1"
                  >
                    ← Back
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'result' && (
            <div className="card">
              {result.success ? (
                <div className="success-message p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">✅ Submission Successful!</h2>
                  <p className="mb-2">Thank you! An agent has been assigned to you.</p>
                  <p className="font-semibold">Client ID: {result.clientId}</p>
                </div>
              ) : (
                <div className="error-message p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">❌ Submission Failed</h2>
                  <p>{result.error}</p>
                </div>
              )}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleReset}
                  className="btn-primary flex-1"
                >
                  Submit Another
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="btn-secondary flex-1"
                >
                  Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClientPortal

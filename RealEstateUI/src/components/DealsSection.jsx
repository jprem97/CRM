import React, { useState } from 'react'
import { dealAPI } from '../services/api'

function DealsSection({ deals, clients, properties, onDealCreated }) {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    client: '',
    property: '',
  })

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
      await dealAPI.createDeal({
        client: formData.client,
        property: formData.property,
      })
      setFormData({ client: '', property: '' })
      setShowForm(false)
      onDealCreated()
    } catch (error) {
      alert('Failed to create deal: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">🤝 Deals</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-success text-sm"
          >
            ➕ Create Deal
          </button>
        </div>

        {showForm && (
          <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
            <h3 className="subsection-title">Create New Deal</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client *</label>
                <select
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name} ({client.type})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property *</label>
                <select
                  name="property"
                  value={formData.property}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select a property</option>
                  {properties.map((property) => (
                    <option key={property._id} value={property._id}>
                      {property.title} - ${property.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {deals.length === 0 ? (
          <p className="text-gray-600">No deals yet</p>
        ) : (
          <div className="space-y-3">
            {deals.map((deal) => (
              <div key={deal._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{deal.client?.name || 'Unknown Client'}</h3>
                    <p className="text-gray-600 text-sm">Property: {deal.property?.title}</p>
                    <p className="text-gray-600 text-sm">Status: {deal.status || 'Active'}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Deal
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DealsSection

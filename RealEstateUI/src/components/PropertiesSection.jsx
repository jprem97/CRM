import React, { useState } from 'react'
import { propertyAPI } from '../services/api'

function PropertiesSection({ properties, onPropertyCreated, userRole }) {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
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
      await propertyAPI.createProperty({
        title: formData.title,
        location: formData.location,
        price: parseFloat(formData.price),
      })
      setFormData({ title: '', location: '', price: '' })
      setShowForm(false)
      onPropertyCreated()
    } catch (error) {
      alert('Failed to create property: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">🏠 Properties</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-success text-sm"
          >
            ➕ Create Property
          </button>
        </div>

        {showForm && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
            <h3 className="subsection-title">Add New Property</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Property title"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Property location"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Property price"
                  required
                  className="form-input"
                />
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

        {properties.length === 0 ? (
          <p className="text-gray-600">No properties yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <div key={property._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-1">📍 {property.location}</p>
                <p className="text-green-600 font-bold text-lg">
                  ${property.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertiesSection

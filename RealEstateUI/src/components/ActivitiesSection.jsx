import React, { useState } from 'react'
import { activityAPI } from '../services/api'

function ActivitiesSection({ activities, onActivityCreated }) {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    date: '',
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
      await activityAPI.createActivity({
        type: formData.type,
        description: formData.description,
        date: formData.date,
      })
      setFormData({ type: '', description: '', date: '' })
      setShowForm(false)
      onActivityCreated()
    } catch (error) {
      alert('Failed to create activity: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">📋 Activities</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-success text-sm"
          >
            ➕ Create Activity
          </button>
        </div>

        {showForm && (
          <div className="bg-purple-50 p-4 rounded-lg mb-6 border border-purple-200">
            <h3 className="subsection-title">Add New Activity</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type *</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="e.g., Call, Meeting, Email"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Activity description"
                  required
                  className="form-input h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
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

        {activities.length === 0 ? (
          <p className="text-gray-600">No activities yet</p>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{activity.type}</h3>
                    <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      📅 {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {activity.type}
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

export default ActivitiesSection

import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardNav from '../components/DashboardNav'
import { AuthContext } from '../App'
import { adminAPI, userAPI } from '../services/api'

function AdminDashboard() {
  const navigate = useNavigate()
  const { auth, logout } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('performance')
  const [profile, setProfile] = useState(null)
  const [performance, setPerformance] = useState([])
  const [filteredAgents, setFilteredAgents] = useState([])
  const [locationFilter, setLocationFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!auth.token) {
      navigate('/user')
    } else {
      fetchDashboardData()
    }
  }, [auth, navigate])

  const fetchDashboardData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [profileRes, performanceRes] = await Promise.all([
        userAPI.getProfile(),
        adminAPI.getAgentPerformance(),
      ])

      setProfile(profileRes.data)
      setPerformance(performanceRes.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data')
      console.error('Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterAgents = async () => {
    if (!locationFilter.trim()) {
      setError('Please enter a location')
      return
    }

    try {
      setError(null)
      const res = await adminAPI.getAgentsByLocation(locationFilter)
      setFilteredAgents(res.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to filter agents')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNav
        title="Admin Dashboard"
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={['profile', 'performance', 'filter']}
        labels={['👤 Profile', '📊 Performance', '🔍 Filter Agents']}
      />

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="error-message mb-4 p-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="card text-center">
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {activeTab === 'profile' && profile && (
              <div className="card">
                <h2 className="section-title">👤 Admin Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p className="font-semibold text-lg">{profile.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-semibold text-lg">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Role</p>
                    <p className="font-semibold text-lg">{profile.role}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="card">
                <h2 className="section-title">📊 Agent Performance</h2>
                <button
                  onClick={fetchDashboardData}
                  className="btn-primary mb-4"
                >
                  🔄 Refresh
                </button>

                {performance.length === 0 ? (
                  <p className="text-gray-600">No agents found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-2 text-left">Agent Name</th>
                          <th className="px-4 py-2 text-left">Performance Score</th>
                          <th className="px-4 py-2 text-left">Current Load</th>
                          <th className="px-4 py-2 text-left">Total Deals</th>
                        </tr>
                      </thead>
                      <tbody>
                        {performance.map((agent, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{agent.name}</td>
                            <td className="px-4 py-2">{agent.performanceScore}</td>
                            <td className="px-4 py-2">{agent.currentLoad}</td>
                            <td className="px-4 py-2">{agent.report?.totalDeals || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'filter' && (
              <div className="card">
                <h2 className="section-title">🔍 Filter Agents by Location</h2>
                <div className="flex gap-4 mb-6">
                  <input
                    type="text"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    placeholder="Enter location (e.g., New York)"
                    className="form-input flex-1"
                  />
                  <button
                    onClick={handleFilterAgents}
                    className="btn-primary"
                  >
                    Search
                  </button>
                </div>

                {filteredAgents.length === 0 && locationFilter && (
                  <p className="text-gray-600">No agents found for this location</p>
                )}

                {filteredAgents.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-2 text-left">Agent Name</th>
                          <th className="px-4 py-2 text-left">Email</th>
                          <th className="px-4 py-2 text-left">Location</th>
                          <th className="px-4 py-2 text-left">Performance Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAgents.map((agent, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{agent.user?.name}</td>
                            <td className="px-4 py-2">{agent.user?.email}</td>
                            <td className="px-4 py-2">{agent.location}</td>
                            <td className="px-4 py-2">{agent.performanceScore}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard

import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardNav from '../components/DashboardNav'
import ProfileSection from '../components/ProfileSection'
import ClientsSection from '../components/ClientsSection'
import PropertiesSection from '../components/PropertiesSection'
import DealsSection from '../components/DealsSection'
import ActivitiesSection from '../components/ActivitiesSection'
import { AuthContext } from '../App'
import { agentAPI, propertyAPI, dealAPI, activityAPI, clientAPI } from '../services/api'

function AgentDashboard() {
  const navigate = useNavigate()
  const { auth, logout } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState(null)
  const [clients, setClients] = useState([])
  const [properties, setProperties] = useState([])
  const [deals, setDeals] = useState([])
  const [activities, setActivities] = useState([])
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
      const [profileRes, clientsRes, propertiesRes, dealsRes, activitiesRes] = await Promise.all([
        agentAPI.getProfile(),
        clientAPI.getClients(),
        propertyAPI.getProperties(),
        dealAPI.getDeals(),
        activityAPI.getActivities(),
      ])

      setProfile(profileRes.data)
      setClients(clientsRes.data?.clients || [])
      setProperties(propertiesRes.data?.properties || [])
      setDeals(dealsRes.data?.deals || [])
      setActivities(activitiesRes.data?.activities || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data')
      console.error('Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNav
        title="Agent Dashboard"
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={['profile', 'clients', 'properties', 'deals', 'activities']}
        labels={['👤 Profile', '👥 Clients', '🏠 Properties', '🤝 Deals', '📋 Activities']}
      />

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="error-message mb-4 p-4">
            {error}
            <button onClick={fetchDashboardData} className="ml-4 underline">
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="card text-center">
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {activeTab === 'profile' && <ProfileSection profile={profile} role="AGENT" />}
            {activeTab === 'clients' && <ClientsSection clients={clients} />}
            {activeTab === 'properties' && (
              <PropertiesSection 
                properties={properties} 
                onPropertyCreated={fetchDashboardData}
                userRole="AGENT"
              />
            )}
            {activeTab === 'deals' && (
              <DealsSection 
                deals={deals}
                clients={clients}
                properties={properties}
                onDealCreated={fetchDashboardData}
              />
            )}
            {activeTab === 'activities' && (
              <ActivitiesSection 
                activities={activities}
                onActivityCreated={fetchDashboardData}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AgentDashboard

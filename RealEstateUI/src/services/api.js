import axios from 'axios'

const API_BASE = '/api'

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => Promise.reject(error))

// Handle responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('user')
      window.location.href = '/user'
    }
    return Promise.reject(error)
  }
)

export const userAPI = {
  register: (data) => apiClient.post('/users/register', data),
  login: (email, password) => apiClient.post('/users/login', { email, password }),
  getProfile: () => apiClient.get('/users/profile'),
}

export const clientAPI = {
  createClient: (data) => apiClient.post('/clients/create-client', data),
  getClients: () => apiClient.get('/clients/get-clients'),
}

export const agentAPI = {
  getProfile: () => apiClient.get('/agents/get-my-profile'),
  getAgentsByLocation: (location) => apiClient.get(`/agents/agents-by-location?location=${location}`),
}

export const propertyAPI = {
  getProperties: () => apiClient.get('/properties/get-properties'),
  createProperty: (data) => apiClient.post('/properties/create-property', data),
}

export const dealAPI = {
  getDeals: () => apiClient.get('/deals/get-deals'),
  createDeal: (data) => apiClient.post('/deals/create-deal', data),
}

export const activityAPI = {
  getActivities: () => apiClient.get('/activities/get-activities'),
  createActivity: (data) => apiClient.post('/activities/create-activity', data),
}

export const adminAPI = {
  getAgentPerformance: () => apiClient.get('/admin/agent-performance'),
  getAgentsByLocation: (location) => apiClient.get(`/admin/agents-by-location?location=${location}`),
}

export default apiClient

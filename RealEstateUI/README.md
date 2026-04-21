# Real Estate React Frontend

A modern, professional React-based frontend for a real estate application with Tailwind CSS styling.

## Project Structure

```
src/
├── main.jsx                 # Entry point
├── App.jsx                 # Main app component with routing
├── index.css               # Tailwind CSS configuration
├── pages/
│   ├── Home.jsx           # Landing page with role selection
│   ├── ClientPortal.jsx   # Client (buyer/seller) registration
│   ├── UserPortal.jsx     # Agent/Admin authentication
│   ├── AgentDashboard.jsx # Agent dashboard
│   └── AdminDashboard.jsx # Admin dashboard
├── components/
│   ├── Navigation.jsx      # Top navigation bar
│   ├── DashboardNav.jsx   # Dashboard navigation with tabs
│   ├── ProfileSection.jsx # Profile information display
│   ├── ClientsSection.jsx # Clients list and details
│   ├── PropertiesSection.jsx # Properties management
│   ├── DealsSection.jsx   # Deals management
│   └── ActivitiesSection.jsx # Activities management
└── services/
    └── api.js             # API client and endpoints

```

## Features

### 1. **Home Page**
- Welcome landing page
- Role selection (Client or User)
- Navigation to other portals

### 2. **Client Portal**
- Buyer/Seller role selection
- Form submission with:
  - Name, Phone, Location
  - Price/Budget field (seller: expected price, buyer: budget)
- Agent auto-assignment
- Success/Error messages

### 3. **User Portal (Auth)**
- Agent/Admin role selection
- Login/Register forms
- Role-specific fields:
  - Agent: Location field for operation area
  - Admin: Standard fields only
- Token-based authentication

### 4. **Agent Dashboard**
- **Profile**: View agent information and performance
- **Clients**: List of assigned buyers/sellers
- **Properties**: Create and manage properties
- **Deals**: Create deals linking clients to properties
- **Activities**: Log activity (calls, meetings, emails)
- **Notifications**: (Expandable feature)

### 5. **Admin Dashboard**
- **Profile**: Admin information
- **Agent Performance**: View all agents with performance metrics
- **Filter Agents**: Search agents by location

## API Endpoints Used

```javascript
// User Authentication
POST   /api/users/register
POST   /api/users/login
GET    /api/users/profile

// Client Management
POST   /api/clients/create-client
GET    /api/clients/get-clients

// Agent Management
GET    /api/agents/get-my-profile
GET    /api/admin/agents-by-location

// Property Management
GET    /api/properties/get-properties
POST   /api/properties/create-property

// Deal Management
GET    /api/deals/get-deals
POST   /api/deals/create-deal

// Activity Management
GET    /api/activities/get-activities
POST   /api/activities/create-activity

// Admin Features
GET    /api/admin/agent-performance
GET    /api/admin/agents-by-location
```

## Authentication

- **Bearer Token**: Stored in `localStorage` with key `token`
- **Role Storage**: Stored in `localStorage` with key `role`
- **Auto Redirect**: Redirects to login if token expires (401)
- **Context API**: Manages auth state globally

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Component Classes**: Reusable button and form styles
- **Color Scheme**:
  - Primary: Blue (#3b82f6)
  - Success: Green (#10b981)
  - Danger: Red (#ef4444)
  - Neutral: Gray shades

## State Management

- **React Hooks**: `useState`, `useEffect`, `useContext`
- **Context API**: `AuthContext` for global auth state
- **Local State**: Component-level form and data states
- **Axios Interceptors**: Automatic token injection and error handling

## Installation & Setup

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## Environment Setup

Create a `.env.local` file:
```
VITE_API_BASE=/api
```

## Backend Integration

The frontend expects the backend running on:
- **Local**: `http://localhost:5000`
- **API Prefix**: `/api`

Proxy configuration in `vite.config.js` handles API routing during development.

## Features Roadmap

- [ ] Notifications system
- [ ] Real-time updates with WebSocket
- [ ] File uploads (property images)
- [ ] Advanced filtering and search
- [ ] Analytics dashboard
- [ ] Payment integration
- [ ] Mobile app version

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC - See package.json

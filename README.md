CRM - Real Estate Management System

├── package.json
└── README-FRONTEND.md          # Frontend documentation

## 🚀 Quick Start

### Backend Setup
```bash
npm install
npm run dev
```
Server runs on `http://localhost:5000`

### Frontend
Open `http://localhost:5000` in your browser.

## 🌐 Frontend Features

### Pages
- **Landing** - Public marketing page
- **Lead Form** - Client lead submission
- **Login/Register** - User authentication
- **Agent Dashboard** - Main user interface
- **Admin Dashboard** - System administration

### Agent Dashboard Sections
1. **Dashboard Home** - Stats, recent activity, quick actions
2. **Clients** - Client list, status tracking, management
3. **Properties** - Property listings, search, creation
4. **Deals** - Deal tracking, status updates
5. **Activities** - Timeline of all actions
6. **Notifications** - System alerts and messages
7. **Settings** - User profile management

### Admin Dashboard Sections
1. **Dashboard** - System overview, performance metrics
2. **Agents** - Agent management and performance
3. **Clients** - All system clients
4. **Deals** - All system deals
5. **Analytics** - Charts and reporting

## 🔐 Authentication

- Role-based access (Agent/Admin)
- HTTP-only cookies for security
- Automatic token refresh on 401
- Session management

## 💾 API Integration

All frontend calls use centralized API module:
- **clientAPI** - Client operations
- **propertyAPI** - Property operations
- **dealAPI** - Deal management
- **agentAPI** - Agent data
- **adminAPI** - Admin functions
- **authAPI** - Authentication

## 📚 Documentation

- **README-FRONTEND.md** - Complete frontend guide
- **FRONTEND-QUICKSTART.md** - Developer quick reference

## 🎨 Design

- Modern SaaS dashboard design
- Responsive layout (mobile-first)
- Professional color scheme
- Smooth animations and transitions
- Accessibility-focused HTML

## 🛠️ Tech Stack

**Backend**: Node.js, Express, MongoDB
**Frontend**: Vanilla JavaScript, CSS3, HTML5
**HTTP**: Axios with interceptors
**Styling**: Custom CSS (no frameworks)
**Icons**: Font Awesome 6.4
**Notifications**: Toastify.js

## 📝 Development

### Frontend Modifications
1. Edit HTML in `public/index.html`
2. Update CSS in `public/css/main.css`
3. Modify logic in `public/js/*.js`
4. Refresh browser to see changes

### Adding New API Endpoint
1. Create function in `public/js/api.js`
2. Call from `public/js/app.js`
3. Handle responses with toast notifications

### Creating New Page
1. Add `<div data-page="page-name">` in HTML
2. Create handler in `app.js`
3. Add navigation in sidebar

## 🔄 API Endpoints

See backend documentation for full API reference.

Key endpoints:
- `/api/users/login` - Login
- `/api/users/register` - Register
- `/api/clients/*` - Client operations
- `/api/properties/*` - Property operations
- `/api/deals/*` - Deal operations
- `/api/agents/*` - Agent data
- `/api/admin/*` - Admin functions
- `/api/activities/*` - Activity tracking

## 📱 Responsive Design

- Desktop: 1024px+ (full features)
- Tablet: 768px-1023px (optimized layout)
- Mobile: 480px-767px (touch-friendly)
- Small: <480px (minimal UI)

## 🐛 Troubleshooting

**Page not loading?**
- Check if backend is running on port 5000
- Clear browser cache (Ctrl+Shift+R)

**API errors?**
- Verify API_URL in `public/js/api.js`
- Check backend console for errors
- Ensure credentials/cookies are valid

**Styling issues?**
- Verify CSS file is loading
- Check browser DevTools console
- Try hard refresh

## 📄 License

Built for Real Estate CRM Project

## 👥 Team

Backend & Frontend Development

---

**Version**: 1.0.0
**Status**: Production Ready ✓
**Last Updated**: 2026-04-21
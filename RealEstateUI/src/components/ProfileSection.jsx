import React from 'react'

function ProfileSection({ profile, role }) {
  if (!profile) {
    return <div className="card">No profile data available</div>
  }

  return (
    <div className="card">
      <h2 className="section-title">👤 My Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-600 text-sm">Name</p>
          <p className="font-semibold text-lg">{profile.name || profile.user?.name}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Email</p>
          <p className="font-semibold text-lg">{profile.email || profile.user?.email}</p>
        </div>
        {role === 'AGENT' && profile.location && (
          <div>
            <p className="text-gray-600 text-sm">Location</p>
            <p className="font-semibold text-lg">{profile.location}</p>
          </div>
        )}
        {role === 'AGENT' && profile.performanceScore !== undefined && (
          <div>
            <p className="text-gray-600 text-sm">Performance Score</p>
            <p className="font-semibold text-lg text-green-600">{profile.performanceScore}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileSection

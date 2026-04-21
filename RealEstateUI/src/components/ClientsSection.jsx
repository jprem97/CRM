import React from 'react'

function ClientsSection({ clients }) {
  return (
    <div className="card">
      <h2 className="section-title">👥 My Clients</h2>
      {clients.length === 0 ? (
        <p className="text-gray-600">No clients assigned yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{client.name}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      client.type === 'BUYER' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {client.type}
                    </span>
                  </td>
                  <td className="px-4 py-2">{client.phone}</td>
                  <td className="px-4 py-2">{client.preferredLocation}</td>
                  <td className="px-4 py-2">
                    {client.price ? `$${client.price.toLocaleString()}` : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ClientsSection

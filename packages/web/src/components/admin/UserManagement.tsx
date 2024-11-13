import React, { useState } from 'react'
import { trpc } from '../../utils/trpc'
import { User } from '@advanced-ambition/core'
import { format } from 'date-fns'

export function UserManagement() {
  const { data: users, isLoading } = trpc.users.getAll.useQuery()
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('ALL')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'ALL' || 
                         user.subscriptionType === filter
    return matchesSearch && matchesFilter
  })

  const exportReport = () => {
    if (!filteredUsers) return

    const headers = ['Name', 'Email', 'Subscription', 'Status', 'End Date']
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.subscriptionType,
        user.subscriptionStatus,
        format(user.subscriptionEndDate, 'yyyy-MM-dd')
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `users-report-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
  }

  if (isLoading) {
    return <div className="loading">Loading users...</div>
  }

  return (
    <div className="user-management">
      <div className="controls">
        <div className="search-filter">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
            className="search-input"
          />
          
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="ALL">All Users</option>
            <option value="FREE">Free Tier</option>
            <option value="BASIC">Basic</option>
            <option value="PRO">Pro</option>
            <option value="ENTERPRISE">Enterprise</option>
          </select>

          <button onClick={exportReport} className="export-btn">
            Export Report
          </button>
        </div>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Status</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.subscriptionType}</td>
                <td>
                  <span className={`status ${user.subscriptionStatus.toLowerCase()}`}>
                    {user.subscriptionStatus}
                  </span>
                </td>
                <td>{format(user.subscriptionEndDate, 'yyyy-MM-dd')}</td>
                <td>
                  <button 
                    onClick={() => setSelectedUser(user)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="user-modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={selectedUser.name} readOnly />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={selectedUser.email} readOnly />
              </div>
              <div className="form-group">
                <label>Subscription Type</label>
                <select 
                  value={selectedUser.subscriptionType}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser,
                    subscriptionType: e.target.value as User['subscriptionType']
                  })}
                >
                  <option value="FREE">Free Tier</option>
                  <option value="BASIC">Basic</option>
                  <option value="PRO">Pro</option>
                  <option value="ENTERPRISE">Enterprise</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={selectedUser.subscriptionStatus}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser,
                    subscriptionStatus: e.target.value as User['subscriptionStatus']
                  })}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="EXPIRED">Expired</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="save-btn">Save Changes</button>
                <button 
                  type="button" 
                  onClick={() => setSelectedUser(null)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .user-management {
          padding: 2rem;
        }

        .controls {
          margin-bottom: 2rem;
        }

        .search-filter {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .search-input,
        .filter-select {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .search-input {
          min-width: 300px;
        }

        .export-btn {
          padding: 0.5rem 1rem;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .users-table {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #f8f9fa;
          font-weight: 600;
        }

        .status {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
        }

        .status.active {
          background: #e6f4ea;
          color: #1e7e34;
        }

        .status.expired {
          background: #fff3cd;
          color: #856404;
        }

        .status.cancelled {
          background: #f8d7da;
          color: #721c24;
        }

        .edit-btn {
          padding: 0.25rem 0.75rem;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .user-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .save-btn,
        .cancel-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .save-btn {
          background: #28a745;
          color: white;
        }

        .cancel-btn {
          background: #dc3545;
          color: white;
        }
      `}</style>
    </div>
  )
}
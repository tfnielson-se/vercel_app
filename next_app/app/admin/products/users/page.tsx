'use client'

import { useState, useEffect } from 'react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface User {
  id: string
  name: string
  email: string
  is_admin: boolean
  createdAt: string
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', is_admin: false })
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await fetch('/api/admin/users')
    const data = await response.json()
    setUsers(data)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const inputValue = type === 'checkbox' ? checked : value
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: inputValue })
    } else {
      setNewUser({ ...newUser, [name]: inputValue })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingUser) {
      await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      })
      setEditingUser(null)
    } else {
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      setNewUser({ name: '', email: '', password: '', is_admin: false })
    }
    fetchUsers()
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    fetchUsers()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          name="name"
          value={editingUser ? editingUser.name : newUser.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={editingUser ? editingUser.email : newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        {!editingUser && (
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
          />
        )}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_admin"
            checked={editingUser ? editingUser.is_admin : newUser.is_admin}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="is_admin">Is Admin</label>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editingUser ? 'Update User' : 'Add User'}
        </button>
        {editingUser && (
          <button
            type="button"
            onClick={() => setEditingUser(null)}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Is Admin
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.is_admin ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function ClientPage() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '' });
  const [editingId, setEditingId] = useState(null); // null = add, not null = edit

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await api.get('clients/');
      setClients(res.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    try {
      await api.delete(`clients/${id}/`);
      fetchClients();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`clients/${editingId}/`, formData);
      } else {
        await api.post('clients/', formData);
      }
      setShowModal(false);
      setFormData({ name: '', company: '', email: '' });
      setEditingId(null);
      fetchClients();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const openAddModal = () => {
    setFormData({ name: '', company: '', email: '' });
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (client) => {
    setFormData({
      name: client.name,
      company: client.company,
      email: client.email,
    });
    setEditingId(client.client_id);
    setShowModal(true);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">📋 Client List</h1>

      <div className="flex justify-end max-w-5xl mx-auto mb-4">
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Client
        </button>
      </div>

      {/* ✅ Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
              {editingId ? 'Edit Client' : 'Add New Client'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-2 rounded text-black"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Company"
                className="w-full border p-2 rounded text-black"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded text-black"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Client Table */}
      <div className="overflow-x-auto max-w-5xl mx-auto">
        <table className="min-w-full bg-white shadow-xl rounded-xl border border-gray-300">
          <thead className="bg-blue-100 text-blue-800 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 border-b">ID</th>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Company</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, idx) => (
              <tr
                key={client.client_id}
                className={`${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } text-gray-800 hover:bg-blue-50`}
              >
                <td className="px-6 py-4 border-b text-center">{client.client_id}</td>
                <td className="px-6 py-4 border-b">{client.name}</td>
                <td className="px-6 py-4 border-b">{client.company}</td>
                <td className="px-6 py-4 border-b">{client.email}</td>
                <td className="px-6 py-4 border-b text-center">
                  <button
                    onClick={() => openEditModal(client)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                     Edit
                  </button>
                  <button
                    onClick={() => handleDelete(client.client_id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
  );
}

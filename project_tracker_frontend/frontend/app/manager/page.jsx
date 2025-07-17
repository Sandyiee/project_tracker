'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function ManagerPage() {
  const [managers, setManagers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: ''
  });

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const res = await api.get('managers/');
      setManagers(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const openAddModal = () => {
    setFormData({ name: '', email: '', department: '' });
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (mgr) => {
    setFormData({
      name: mgr.name,
      email: mgr.email,
      department: mgr.department
    });
    setEditingId(mgr.manager_id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`managers/${editingId}/`, formData);
      } else {
        await api.post('managers/', formData);
      }
      setShowModal(false);
      fetchManagers();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this manager?')) return;
    try {
      await api.delete(`managers/${id}/`);
      fetchManagers();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">👨‍💼 Manager List</h1>

      {/* Add Button */}
      <div className="flex justify-end max-w-5xl mx-auto mb-4">
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Manager
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
              {editingId ? 'Edit Manager' : 'Add New Manager'}
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
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded text-black"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Department"
                className="w-full border p-2 rounded text-black"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
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

      {/* Table */}
      <div className="overflow-x-auto max-w-5xl mx-auto">
        <table className="min-w-full bg-white shadow-xl rounded-xl border border-gray-300">
          <thead className="bg-blue-100 text-blue-800 text-sm uppercase rounded-t-xl">
            <tr>
              <th className="px-6 py-3 border-b">Manager ID</th>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Department</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((mgr, idx) => (
              <tr
                key={mgr.manager_id}
                className={`${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } text-gray-800 hover:bg-blue-50 transition duration-150 ease-in-out`}
              >
                <td className="px-6 py-4 border-b text-center">{mgr.manager_id}</td>
                <td className="px-6 py-4 border-b">{mgr.name}</td>
                <td className="px-6 py-4 border-b">{mgr.email}</td>
                <td className="px-6 py-4 border-b">{mgr.department}</td>
                <td className="px-6 py-4 border-b text-center">
                  <button
                    onClick={() => openEditModal(mgr)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mgr.manager_id)}
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

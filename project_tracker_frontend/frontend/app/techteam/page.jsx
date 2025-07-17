'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function TechTeamPage() {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    email: '',
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await api.get('techteam/');
      setMembers(res.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const openAddModal = () => {
    setFormData({ name: '', roll: '', email: '' });
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (member) => {
    setFormData({
      name: member.name,
      roll: member.roll,
      email: member.email,
    });
    setEditingId(member.member_id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`techteam/${editingId}/`, formData);
      } else {
        await api.post('techteam/', formData);
      }
      setShowModal(false);
      fetchMembers();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    try {
      await api.delete(`techteam/${id}/`);
      fetchMembers();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">👨‍💻 Tech Team Members</h1>

      {/* Add Button */}
      <div className="flex justify-end max-w-4xl mx-auto mb-4">
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Member
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
              {editingId ? 'Edit Member' : 'Add New Member'}
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
                placeholder="Role"
                className="w-full border p-2 rounded text-black"
                value={formData.roll}
                onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
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

      {/* Table */}
      <div className="overflow-x-auto max-w-4xl mx-auto">
        <table className="min-w-full bg-white shadow-xl rounded-xl border border-gray-300">
          <thead className="bg-blue-100 text-blue-800 text-sm uppercase rounded-t-xl">
            <tr>
              <th className="px-6 py-3 border-b rounded-tl-xl">ID</th>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Role</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b rounded-tr-xl text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, idx) => (
              <tr
                key={member.member_id}
                className={`${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } text-gray-800 hover:bg-blue-50 transition duration-150 ease-in-out`}
              >
                <td className="px-6 py-4 border-b text-center">{member.member_id}</td>
                <td className="px-6 py-4 border-b">{member.name}</td>
                <td className="px-6 py-4 border-b">{member.roll}</td>
                <td className="px-6 py-4 border-b">{member.email}</td>
                <td className="px-6 py-4 border-b text-center">
                  <button
                    onClick={() => openEditModal(member)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.member_id)}
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

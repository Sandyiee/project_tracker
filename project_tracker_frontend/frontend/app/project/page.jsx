'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    start_date: '',
    end_date: '',
    client: '',
    manager: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('projects/');
      setProjects(res.data);
    } catch (error) {
      console.error('Unauthorized or error:', error.response?.data || error.message);
    }
  };

  const openAddModal = () => {
    setFormData({
      title: '',
      description: '',
      status: '',
      start_date: '',
      end_date: '',
      client: '',
      manager: '',
    });
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      status: project.status,
      start_date: project.start_date,
      end_date: project.end_date,
      client: project.client,
      manager: project.manager,
    });
    setEditingId(project.project_id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`projects/${editingId}/`, formData);
      } else {
        await api.post('projects/', formData);
      }
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`projects/${id}/`);
      fetchProjects();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">📁 Project List</h1>

      <div className="flex justify-end max-w-7xl mx-auto mb-4">
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Project
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {[
                { name: 'title', type: 'text' },
                { name: 'description', type: 'text' },
                { name: 'status', type: 'text' },
                { name: 'start_date', type: 'date' },
                { name: 'end_date', type: 'date' },
                { name: 'client', type: 'text' },
                { name: 'manager', type: 'text' },
              ].map(({ name, type }) => (
                <input
                  key={name}
                  type={type}
                  placeholder={name.replace('_', ' ').toUpperCase()}
                  className="w-full border p-2 rounded text-black col-span-1"
                  value={formData[name]}
                  onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                  required
                />
              ))}
              <div className="col-span-2 flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
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
      <div className="overflow-x-auto max-w-7xl mx-auto">
        <table className="min-w-full bg-white shadow-xl rounded-xl border border-gray-300">
          <thead className="bg-blue-100 text-blue-800 text-sm uppercase rounded-t-xl">
            <tr>
              <th className="px-6 py-3 border-b">Project ID</th>
              <th className="px-6 py-3 border-b">Title</th>
              <th className="px-6 py-3 border-b">Description</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">Start Date</th>
              <th className="px-6 py-3 border-b">End Date</th>
              <th className="px-6 py-3 border-b">Client</th>
              <th className="px-6 py-3 border-b">Manager</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, idx) => (
              <tr
                key={project.project_id}
                className={`${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } text-gray-800 hover:bg-blue-50`}
              >
                <td className="px-6 py-4 border-b text-center">{project.project_id}</td>
                <td className="px-6 py-4 border-b">{project.title}</td>
                <td className="px-6 py-4 border-b">{project.description}</td>
                <td className="px-6 py-4 border-b">{project.status}</td>
                <td className="px-6 py-4 border-b">{project.start_date}</td>
                <td className="px-6 py-4 border-b">{project.end_date}</td>
                <td className="px-6 py-4 border-b">{project.client}</td>
                <td className="px-6 py-4 border-b">{project.manager}</td>
                <td className="px-6 py-4 border-b text-center">
                  <button
                    onClick={() => openEditModal(project)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.project_id)}
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

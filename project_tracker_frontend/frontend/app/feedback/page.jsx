'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    project: '',
    client: '',
    comments: '',
    ratings: ''
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get('feedback/');
      setFeedbacks(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    try {
      await api.delete(`feedback/${id}/`);
      fetchFeedbacks();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const openAddModal = () => {
    setFormData({ project: '', client: '', comments: '', ratings: '' });
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (fb) => {
    setFormData({
      project: fb.project,
      client: fb.client,
      comments: fb.comments,
      ratings: fb.ratings
    });
    setEditingId(fb.feedback_id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`feedback/${editingId}/`, formData);
      } else {
        await api.post('feedback/', formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchFeedbacks();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">💬 Feedback List</h1>

      {/* Add Button */}
      <div className="flex justify-end max-w-5xl mx-auto mb-4">
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Feedback
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
              {editingId ? 'Edit Feedback' : 'Add New Feedback'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Project"
                className="w-full border p-2 rounded text-black"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Client"
                className="w-full border p-2 rounded text-black"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                required
              />
              <textarea
                placeholder="Comments"
                className="w-full border p-2 rounded text-black"
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Ratings"
                className="w-full border p-2 rounded text-black"
                value={formData.ratings}
                onChange={(e) => setFormData({ ...formData, ratings: e.target.value })}
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
              <th className="px-6 py-3 border-b">ID</th>
              <th className="px-6 py-3 border-b">Project</th>
              <th className="px-6 py-3 border-b">Client</th>
              <th className="px-6 py-3 border-b">Comments</th>
              <th className="px-6 py-3 border-b">Ratings</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb, idx) => (
              <tr
                key={fb.feedback_id}
                className={`${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } text-gray-800 hover:bg-blue-50 transition duration-150 ease-in-out`}
              >
                <td className="px-6 py-4 border-b text-center">{fb.feedback_id}</td>
                <td className="px-6 py-4 border-b">{fb.project}</td>
                <td className="px-6 py-4 border-b">{fb.client}</td>
                <td className="px-6 py-4 border-b">{fb.comments}</td>
                <td className="px-6 py-4 border-b text-center">{fb.ratings}</td>
                <td className="px-6 py-4 border-b text-center">
                  <button
                    onClick={() => openEditModal(fb)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(fb.feedback_id)}
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

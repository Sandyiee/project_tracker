'use client';
import { useState } from 'react';
import { auth, provider } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import api from '@/lib/axios';

export default function LoginModal({ setUser, setShowModal }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleUsernameLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post('username-login/', formData, { withCredentials: true });
      setUser(true);
      setShowModal(false);
    } catch (err) {
      setError('Invalid username or password');
      console.error('Username login error:', err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(true);
      await api.post('verify-token/', { token }, { withCredentials: true });
      setUser(result.user);
      setShowModal(false);
    } catch (err) {
      setError('Google login failed');
      console.error('Google login network error:', err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
        <h2 className="text-xl font-semibold text-center text-gray-800">Login</h2>

        {error && <div className="text-red-600 text-sm text-center">{error}</div>}

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Sign in with Google
        </button>

        <div className="text-center text-sm text-gray-500">OR</div>

        <form onSubmit={handleUsernameLogin} className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login with Username
          </button>
        </form>

        <button
          onClick={() => setShowModal(false)}
          className="text-red-500 hover:underline w-full text-sm mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

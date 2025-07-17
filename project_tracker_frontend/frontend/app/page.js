'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import LoginModal from '@/components/LoginModal';
import { auth, onAuthStateChanged, signOut } from '@/lib/firebase';

export default function HomePage() {
  const [user, setUser] = useState(null);           // user object or true
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Check if user is authenticated (Firebase or JWT cookie)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('clients/'); // protected route test
        onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            setUser(firebaseUser); // Firebase login
          } else {
            setUser(true);         // Cookie-based login
          }
        });
      } catch {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  // Logout both Firebase and cookie
  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = 'access_token=; Max-Age=0; path=/;';
    setUser(null);
  };

  const NavButton = ({ label, path }) => (
    <button
      onClick={() =>
        user ? router.push(path) : alert('Please login to access this page.')
      }
      className={`${
        user ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
      } text-white px-4 py-2 rounded-lg shadow transition`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center p-4 shadow bg-white">
        <h1 className="text-2xl font-bold text-blue-800">Project Tracker 🔐</h1>
        <button
          onClick={user ? handleLogout : () => setShowModal(true)}
          className={`${
            user ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          } text-white px-4 py-2 rounded`}
        >
          {user ? 'Logout' : 'Login'}
        </button>
      </div>

 
      <div className="flex justify-center mt-6 space-x-4 flex-wrap">
        <NavButton label="Client" path="/client" />
        <NavButton label="Project" path="/project" />
        <NavButton label="Manager" path="/manager" />
        <NavButton label="Tech Team" path="/techteam" />
        <NavButton label="Feedback" path="/feedback" />
        <NavButton label="About" path="/about" />
      </div>

      {showModal && (
        <LoginModal
          setUser={setUser}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

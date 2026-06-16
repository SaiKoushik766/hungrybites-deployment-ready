import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { loginUser, registerUser } from '../services/auth';

const AuthModal = ({ onClose }) => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || (!isLogin && !formData.name)) {
      alert("Please fill all fields");
      return;
    }
    try {
      if (isLogin) {
        // LOGIN API
        const data = await loginUser({
          username: formData.username,
          password: formData.password,
        });

        // backend should return { token, user }
        login(data.user, data.token);
        console.log("Logged in user:", data.user);


      } else {
        // REGISTER API
        await registerUser({
          name: formData.name,
          username: formData.username,
          password: formData.password,
          mobilenumber: formData.mobilenumber
        });

        alert("Registration successful! Please login.");
        setIsLogin(true);
        return;
      }

      onClose();

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // Determine role statically based on username for demonstration


  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-darkCard w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-darkBorder relative z-10"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition bg-darkBg p-2 rounded-full">
            <FaTimes />
          </button>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-darkBg border border-darkBorder rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primaryOrange focus:ring-1 focus:ring-primaryOrange transition"
                    placeholder="John Doe"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-darkBg border border-darkBorder rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primaryOrange focus:ring-1 focus:ring-primaryOrange transition"
                  placeholder="johndoe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-darkBg border border-darkBorder rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primaryOrange focus:ring-1 focus:ring-primaryOrange transition"
                  placeholder="••••••••"
                />
              </div>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">mobile number</label>
                  <input
                    type="number"
                    value={formData.mobilenumber}
                    onChange={(e) => setFormData({ ...formData, mobilenumber: e.target.value })}
                    className="w-full bg-darkBg border border-darkBorder rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primaryOrange focus:ring-1 focus:ring-primaryOrange transition"
                    placeholder="xxxxxxxxxxx"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primaryOrange hover:bg-primaryOrangeHover text-white font-bold py-3.5 rounded-xl transition transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primaryOrange/20 mt-2"
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primaryOrange hover:text-primaryOrangeHover transition font-semibold"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;

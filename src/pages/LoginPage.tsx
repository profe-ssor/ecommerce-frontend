import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { loginUser, registerUser } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleShopNow = () => setShowRegistration(true);
  const closeRegistration = () => setShowRegistration(false);
  const closeLogin = () => setShowLogin(false);

  const switchToLogin = () => {
    setShowRegistration(false);
    setShowLogin(true);
  };

  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegistration(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      toast.success(`Welcome ${res.user?.username || formData.username}! Registration successful!`);
      setShowRegistration(false);
      setFormData({ email: '', username: '', password: '' });
      
      // Switch to login modal after successful registration
      setShowLogin(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed!');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(loginData);
      
      // Set user in auth context
      setUser({
        id: res.user_id,
        email: res.email,
        username: res.username,
      });
      
      toast.success('Login successful!');
      setShowLogin(false);
      setLoginData({ email: '', password: '' });
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <>
      {/* 🌈 Main Background Section */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 flex items-center justify-center p-5">
        <div className="relative w-full max-w-6xl h-[500px] bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 rounded-3xl overflow-hidden shadow-2xl flex items-center">
          {/* Decorative Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute w-20 h-20 bg-white/10 rounded-full animate-float1" style={{ top: '20%', left: '10%' }} />
            <div className="absolute w-16 h-16 bg-white/10 rounded-full animate-float2" style={{ top: '60%', left: '25%' }} />
            <div className="absolute w-24 h-24 bg-white/10 rounded-full animate-float3" style={{ top: '75%', right: '15%' }} />
          </div>

          {/* Text Section */}
          <div className="flex-1 px-20 py-15 z-10 relative max-md:px-8 max-md:py-10 max-md:text-center">
            <h1 className="text-7xl font-light text-white leading-none mb-5 tracking-tight max-md:text-5xl">
              shop at<br />
              <span className="font-bold bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                ease!
              </span>
            </h1>
            <p className="text-xl text-white text-opacity-80 mb-8 font-light max-md:text-lg">
              Discover seamless shopping with style and convenience.
            </p>
            <button
              onClick={handleShopNow}
              className="bg-gradient-to-r from-red-400 to-yellow-400 text-white px-10 py-4 rounded-full text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg"
            >
              Shop Now
            </button>
          </div>

          {/* Visual Section */}
          <div className="flex-1 h-full relative bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
            <div className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-lg border-2 border-white/20 animate-slow-bounce">
              <ShoppingCart className="w-20 h-20 text-white animate-pulse" />
            </div>
          </div>

          {/* Brand Label */}
          <div className="absolute bottom-8 left-15 bg-white bg-opacity-90 px-5 py-2 rounded-full font-bold text-blue-900 text-lg backdrop-blur-sm">
            Osko Buys
          </div>
        </div>
      </div>

      {/* 🔐 Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 ">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4">
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-10 rounded-t-2xl relative">
              <button onClick={closeRegistration} className="absolute top-4 right-4 text-white hover:text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-3xl font-bold text-white mb-2">Join Osko Buys</h2>
              <p className="text-blue-100">Start your shopping journey!</p>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-red-400 to-yellow-400 text-white py-3 rounded-lg font-semibold">Register</button>
              <p className="text-center text-sm text-gray-600">Already have an account? <span onClick={switchToLogin} className="text-blue-600 cursor-pointer font-medium hover:underline">Sign in</span></p>
            </form>
          </div>
        </div>
      )}

      {/* 🔑 Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4">
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-10 rounded-t-2xl relative">
              <button onClick={closeLogin} className="absolute top-4 right-4 text-white hover:text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-blue-100">Sign in to continue shopping!</p>
            </div>
            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-red-400 to-yellow-400 text-white py-3 rounded-lg font-semibold">Sign In</button>
              <p className="text-center text-sm text-gray-600">Don't have an account? <span onClick={switchToRegister} className="text-blue-600 cursor-pointer font-medium hover:underline">Create one</span></p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
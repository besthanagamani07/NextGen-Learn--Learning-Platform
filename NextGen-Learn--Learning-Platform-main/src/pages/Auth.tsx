/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useState, FormEvent } from 'react';
import { Mail, Lock, User, Github, Globe, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login(isLogin ? (formData.email.split('@')[0]) : formData.name, formData.email);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 -z-10" />
      
      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        {/* Left Side: Content */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-main text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Globe className="w-48 h-48 rotate-12" />
          </div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-12">
              <ArrowRight className="w-6 h-6 -rotate-45" />
            </div>
            <h2 className="text-4xl font-bold mb-6 leading-tight text-white">
              Start your technical <br /> journey with us.
            </h2>
            <p className="text-blue-100 text-lg max-w-sm">
              Discover industry-focused career paths and build your future in tech.
            </p>
          </div>
          
          <div className="flex -space-x-3 items-center">
            {[1,2,3,4].map(i => (
              <img 
                key={i}
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10"
                alt="User"
              />
            ))}
            <span className="ml-6 text-sm font-medium text-blue-100">
              Joined by 12,000+ students
            </span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 lg:p-16">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-slate-400">
              {isLogin 
                ? "Enter your credentials to access your dashboard." 
                : "Join NextGen Learn and start learning today."}
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-medium text-white">
              <Github className="w-5 h-5 text-blue-400" />
              Continue with GitHub
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent backdrop-blur-md px-4 text-slate-400 font-bold tracking-widest underline decoration-2 decoration-blue-500/50">Or email</span>
              </div>
            </div>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:bg-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            )}
            
              <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:bg-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-300">Password</label>
                {isLogin && <button type="button" className="text-xs font-bold text-blue-400 hover:underline">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:bg-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <p className="mt-8 text-center text-sm text-slate-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

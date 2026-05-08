/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, User, LogIn, Menu, X, LogOut, ChevronDown, Search, Bell } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { NAV_ITEMS } from '../data/constants';
import { ThemeSelector } from './ThemeSelector';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-nav border-b border-glass py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6C5CE7] to-[#00D2FF] rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-main">
                NextGen <span className="text-[#6C5CE7]">Learn</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-bold transition-all rounded-xl hover:bg-white/5 ${
                    location.pathname === item.path ? 'text-[#6C5CE7]' : 'text-muted hover:text-main'
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#6C5CE7]"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="relative group hidden xl:block">
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="w-48 px-4 py-2 bg-white/5 border border-glass rounded-xl text-sm text-main placeholder:text-muted focus:outline-none focus:border-[#6C5CE7] focus:w-64 transition-all"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted group-focus-within:text-[#6C5CE7]" />
            </div>

            <div className="flex items-center gap-3 border-l border-glass pl-6">
              <ThemeSelector />
              <button className="p-2 text-muted hover:text-main transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#6C5CE7] rounded-full border-2 border-nav" />
              </button>
              
              {isAuthenticated ? (
                <div className="relative" ref={menuRef}>
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#00D2FF] flex items-center justify-center text-white text-xs font-bold shadow-md">
                      {user?.name?.[0].toUpperCase()}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showProfileMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute right-0 mt-3 w-56 bg-nav backdrop-blur-2xl border border-glass p-2 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-glass mb-1">
                        <p className="text-sm font-bold text-main truncate">{user?.name}</p>
                        <p className="text-[10px] text-muted truncate uppercase tracking-widest">{user?.email}</p>
                      </div>
                      <Link 
                        to="/dashboard" 
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted hover:text-[#6C5CE7] hover:bg-white/5 rounded-xl transition-all"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="px-6 py-2.5 bg-[#6C5CE7] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#6C5CE7]/20 hover:scale-105 transition-all"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <ThemeSelector />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 bg-white/5 rounded-xl border border-glass text-muted"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-nav backdrop-blur-3xl border-b border-glass overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3.5 text-base font-bold rounded-2xl transition-all ${
                    location.pathname === item.path ? 'bg-[#6C5CE7]/10 text-[#6C5CE7]' : 'text-muted hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-glass space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 px-4 py-3.5 bg-white/5 rounded-2xl border border-glass"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C5CE7] to-[#00D2FF] flex items-center justify-center text-white font-bold">
                        {user?.name?.[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-main">{user?.name}</p>
                        <p className="text-xs text-muted">View Dashboard</p>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-4 px-4 py-3.5 text-red-500 font-bold bg-red-500/10 rounded-2xl"
                    >
                      <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-4 bg-[#6C5CE7] text-white font-bold rounded-2xl shadow-xl shadow-[#6C5CE7]/20"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

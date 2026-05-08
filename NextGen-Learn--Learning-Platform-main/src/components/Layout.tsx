/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="mt-auto border-t border-glass bg-nav backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center border border-white/20">
                  <BookOpen className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  NextGen Learn
                </span>
              </Link>
              <p className="text-muted text-sm leading-relaxed max-w-xs">
                Empowering the next generation of tech leaders through industry-focused technical education and hands-on learning.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                  <button key={idx} className="w-10 h-10 rounded-lg bg-white/5 border border-glass flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-all">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-main font-bold text-lg">Quick Links</h4>
              <ul className="space-y-4">
                <li><Link to="/courses" className="text-muted hover:text-primary transition-colors text-sm">All Courses</Link></li>
                <li><Link to="/devlab" className="text-muted hover:text-primary transition-colors text-sm">DevLab Projects</Link></li>
                <li><Link to="/about" className="text-muted hover:text-primary transition-colors text-sm">About Us</Link></li>
                <li><Link to="/certificates" className="text-muted hover:text-primary transition-colors text-sm">Verify Certificates</Link></li>
                <li><Link to="/auth" className="text-muted hover:text-primary transition-colors text-sm">Create Account</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-main font-bold text-lg">Support</h4>
              <ul className="space-y-4">
                <li><button className="text-muted hover:text-primary transition-colors text-sm">Help Center</button></li>
                <li><button className="text-muted hover:text-primary transition-colors text-sm">Privacy Policy</button></li>
                <li><button className="text-muted hover:text-primary transition-colors text-sm">Terms of Service</button></li>
                <li><button className="text-muted hover:text-primary transition-colors text-sm">Contact Support</button></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-main font-bold text-lg">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-muted text-sm">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span>123 Innovation Drive, <br />Tech City, CA 94025</span>
                </li>
                <li className="flex items-center gap-3 text-muted text-sm">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span>hello@nextgenlearn.com</span>
                </li>
                <li className="flex items-center gap-3 text-muted text-sm">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-glass flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted text-xs">
              © {new Date().getFullYear()} NextGen Learn. All rights reserved.
            </p>
            <div className="flex gap-8">
              <span className="text-muted text-xs">Built for technical excellence</span>
              <span className="text-muted text-xs">v2.4.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

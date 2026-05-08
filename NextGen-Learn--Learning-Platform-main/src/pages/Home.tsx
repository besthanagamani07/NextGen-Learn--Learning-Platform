/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Code2, Globe, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="space-y-24 pb-24 relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 lg:pt-40 lg:pb-48">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-10 backdrop-blur-xl shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span className="uppercase tracking-widest text-[10px]">Empowering Tech Leaders</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl lg:text-8xl font-black tracking-tighter text-main mb-10 leading-[1.1]"
            >
              Master the Future of <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient-x">
                NextGen Tech
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-3xl mx-auto text-xl lg:text-2xl text-muted leading-relaxed mb-14 font-medium"
            >
              A professional career-focused platform for mastering Frontend, Backend, Data Science, and AI/ML through hands-on industrial projects.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link
                to="/courses"
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-900/40 hover:scale-105 transition-all flex items-center gap-3 group"
              >
                Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/devlab"
                className="px-10 py-5 bg-white/5 text-main font-bold rounded-2xl border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all flex items-center gap-2 group"
              >
                Try DevLab <Code2 className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Main Content Info */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-extrabold text-main tracking-tight">Why choose NextGen Learn?</h2>
                <p className="text-xl text-muted leading-relaxed">
                  We bridge the gap between traditional education and industry demands with a focus on practical execution.
                </p>
              </div>
              
              <div className="space-y-6 text-lg text-muted/80 leading-relaxed">
                <p>
                  Our platform offers specialized career paths in <strong className="text-main">Full Stack Development, AI/ML, and Cloud Architecture</strong>.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Code2, label: 'Industrial Projects', desc: 'Real-world simulations', color: 'text-blue-500' },
                  { icon: Globe, label: 'Modern Stack', desc: 'React, Python, Java', color: 'text-purple-500' },
                  { icon: Cpu, label: 'AI Integrated', desc: 'Smart learning paths', color: 'text-indigo-500' },
                  { icon: Sparkles, label: 'Mentorship', desc: 'Industry experts', color: 'text-orange-500' },
                ].map((item, idx) => (
                  <div key={idx} className="group p-6 glass-card rounded-3xl border border-white/5 hover:border-white/10 transition-all hover:bg-white/10">
                    <item.icon className={`w-8 h-8 ${item.color} mb-4 group-hover:scale-110 transition-transform`} />
                    <h4 className="font-bold text-main mb-1">{item.label}</h4>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-1 border border-white/10">
                <div className="w-full h-full rounded-[2.8rem] overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000"
                    alt="Learning Platform"
                    className="w-full h-full object-cover opacity-90 transition-transform hover:scale-110 duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent" />
                </div>
              </div>
              
              {/* Floating Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -left-8 bg-nav backdrop-blur-3xl border border-white/10 p-8 rounded-3xl shadow-2xl max-w-[280px]"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/40">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Student Satisfaction</p>
                    <p className="text-3xl font-black text-main tracking-tighter">92%</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Gradients */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Target, Eye, Rocket, Users, Shield, Zap, Sparkles, Brain, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="relative isolate py-24 sm:py-32">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6C5CE7]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00D2FF]/5 blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 text-[#6C5CE7] text-xs font-black uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4" /> NextGen Learn Vision
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-main tracking-tighter leading-none">
            About <br />
            <span className="text-gradient">NextGen Learn</span>
          </h1>
          <div className="space-y-6 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-muted font-medium leading-relaxed">
              NextGen Learn is a modern, AI-powered learning platform designed to help students learn coding and real-world skills through practice, projects, and interactive learning tools.
            </p>
            <p className="text-lg text-muted font-medium border-t border-glass pt-6 inline-block">
              It is not just a course website — it is a <span className="text-main font-bold">complete learning ecosystem</span> where students can learn, practice, and build projects like real developers.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-32">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="group relative rounded-[3rem] p-1 bg-gradient-to-br from-amber-500/20 to-transparent overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full glass-card rounded-[2.8rem] p-12 space-y-8">
               <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20">
                 <Eye className="w-8 h-8 text-amber-500" />
               </div>
               <h2 className="text-4xl font-black text-main tracking-tight">Our Vision</h2>
               <p className="text-lg text-muted leading-relaxed">
                 To become the global benchmark for technical education where AI and human curiosity collaborate to solve world-scale problems. We envision a future where high-quality technical skills are accessible to everyone, everywhere.
               </p>
               <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-glass">
                    <p className="text-2xl font-black text-main tracking-tighter">AI-First</p>
                    <p className="text-xs font-bold text-muted uppercase">Curriculum</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-glass">
                    <p className="text-2xl font-black text-main tracking-tighter">Global</p>
                    <p className="text-xs font-bold text-muted uppercase">Community</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="group relative rounded-[3rem] p-1 bg-gradient-to-br from-[#6C5CE7]/20 to-transparent overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6C5CE7]/20 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full glass-card rounded-[2.8rem] p-12 space-y-8">
               <div className="w-16 h-16 bg-[#6C5CE7]/10 rounded-2xl flex items-center justify-center border border-[#6C5CE7]/20">
                 <Target className="w-8 h-8 text-[#6C5CE7]" />
               </div>
               <h2 className="text-4xl font-black text-main tracking-tight">Our Mission</h2>
               <ul className="space-y-6">
                 {[
                   { icon: Zap, label: 'Accelerate Learning', desc: 'Cutting learning time by 50% using adaptive AI paths.' },
                   { icon: Rocket, label: 'Industry Readiness', desc: 'Directly mapping curriculum to Fortune 500 requirements.' },
                   { icon: Shield, label: 'Verified Integrity', desc: 'Secure blockchain-backed certificates for true proof.' }
                 ].map((item, idx) => (
                   <li key={idx} className="flex gap-4 group/item">
                     <div className="w-10 h-10 rounded-xl bg-white/5 border border-glass flex items-center justify-center shrink-0 group-hover/item:bg-[#6C5CE7]/10 transition-colors">
                       <item.icon className="w-5 h-5 text-muted group-hover/item:text-[#6C5CE7]" />
                     </div>
                     <div>
                       <h4 className="font-bold text-main">{item.label}</h4>
                       <p className="text-sm text-muted">{item.desc}</p>
                     </div>
                   </li>
                 ))}
               </ul>
            </div>
          </motion.div>
        </div>

        {/* Global Impact Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Users, label: '10,000+', desc: 'Active Students' },
            { icon: Globe, label: '45+', desc: 'Countries' },
            { icon: Brain, label: '100+', desc: 'AI Labs' },
            { icon: Sparkles, label: '92%', desc: 'Hiring Rate' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 glass-card rounded-[2.5rem] border border-glass"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 border border-glass">
                <stat.icon className="w-6 h-6 text-[#6C5CE7]" />
              </div>
              <p className="text-3xl font-black text-main tracking-tight">{stat.label}</p>
              <p className="text-xs font-black text-muted uppercase tracking-widest mt-1">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemeType } from '../context/ThemeContext';
import { 
  Palette, Check, Sun, Moon, Zap, Waves, Leaf, Sunset, IceCream, Heart, Cloud, Sparkles, Monitor, GraduationCap,
  Cpu, Layers, Droplets, Rocket, Brain, Square, Wind, Settings, Palmtree, Box, Terminal, Snowflake, Fish, Infinity, Network, Layout 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const THEMES: { id: ThemeType; label: string; icon: any; color: string }[] = [
  { id: 'saas-blue', label: 'SaaS Blue', icon: Layout, color: 'bg-blue-600' },
  { id: 'gradient-flow', label: 'Gradient Flow', icon: Rocket, color: 'bg-indigo-950' },
  { id: 'glassmorphism', label: 'Premium Glass', icon: Layers, color: 'bg-indigo-400' },
  { id: 'dark', label: 'Dark IDE', icon: Moon, color: 'bg-slate-900' },
  { id: 'light', label: 'Light', icon: Sun, color: 'bg-white' },
];

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center group"
        title="Change Theme"
      >
        <Palette className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 mt-2 w-96 glass-card p-2 rounded-2xl z-50 shadow-2xl grid grid-cols-3 gap-1"
          >
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 p-2 rounded-xl transition-all text-left ${
                  theme === t.id 
                    ? 'bg-blue-600/20 text-blue-400 border-blue-500/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white border-transparent'
                } border`}
              >
                <div className={`w-6 h-6 rounded-lg ${t.color} flex items-center justify-center shrink-0 border border-white/10 shadow-sm`}>
                  <t.icon className={`w-3.5 h-3.5 ${['light', 'ice-cool', 'yellow-bright', 'frost-white', 'smart-ai', 'brick-minimal', 'glassmorphism'].includes(t.id) ? 'text-slate-900' : 'text-white'}`} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tight truncate">{t.label}</span>
                {theme === t.id && <Check className="w-3 h-3 ml-auto shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

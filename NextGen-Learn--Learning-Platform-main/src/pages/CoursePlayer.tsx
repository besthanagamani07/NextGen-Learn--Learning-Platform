/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, ArrowLeft, ArrowRight, 
  BookOpen, Code, Palette, Zap, 
  CheckCircle, HelpCircle, Info, Terminal, Settings,
  Cpu, Layout, Command, Layers
} from 'lucide-react';
import { LEARNING_DATA, Course, Topic } from '../data/learningData';

export default function CoursePlayer() {
  const [selectedCourse, setSelectedCourse] = useState<Course>(LEARNING_DATA[0]);
  const [selectedTopic, setSelectedTopic] = useState<Topic>(LEARNING_DATA[0].topics[0]);

  const selectCourse = (course: Course) => {
    setSelectedCourse(course);
    setSelectedTopic(course.topics[0]);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Code': return <Code className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const handlePrevious = () => {
    const currentIndex = selectedCourse.topics.findIndex(t => t.id === selectedTopic.id);
    if (currentIndex > 0) {
      setSelectedTopic(selectedCourse.topics[currentIndex - 1]);
    } else {
      const currentCourseIndex = LEARNING_DATA.findIndex(c => c.id === selectedCourse.id);
      if (currentCourseIndex > 0) {
        const prevCourse = LEARNING_DATA[currentCourseIndex - 1];
        setSelectedCourse(prevCourse);
        setSelectedTopic(prevCourse.topics[prevCourse.topics.length - 1]);
      }
    }
  };

  const handleNext = () => {
    const currentIndex = selectedCourse.topics.findIndex(t => t.id === selectedTopic.id);
    if (currentIndex < selectedCourse.topics.length - 1) {
      setSelectedTopic(selectedCourse.topics[currentIndex + 1]);
    } else {
      const currentCourseIndex = LEARNING_DATA.findIndex(c => c.id === selectedCourse.id);
      if (currentCourseIndex < LEARNING_DATA.length - 1) {
        const nextCourse = LEARNING_DATA[currentCourseIndex + 1];
        setSelectedCourse(nextCourse);
        setSelectedTopic(nextCourse.topics[0]);
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-bg">
      {/* 🟦 COLUMN 1: Course Selection (Left Sidebar) */}
      <aside className="w-20 lg:w-72 bg-bg/50 backdrop-blur-3xl border-r border-glass flex flex-col shrink-0">
        <div className="p-8 hidden lg:block">
          <h2 className="text-2xl font-black text-main tracking-tighter flex items-center gap-2">
            <Layers className="w-8 h-8 text-[#6C5CE7]" />
            Modules
          </h2>
          <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mt-2">Frontend Engineering</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {LEARNING_DATA.map((course) => (
            <button
              key={course.id}
              onClick={() => selectCourse(course)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative ${
                selectedCourse.id === course.id
                  ? 'bg-[#6C5CE7] text-white shadow-xl shadow-[#6C5CE7]/20'
                  : 'text-muted hover:bg-white/5 hover:text-main'
              }`}
            >
              <div className="shrink-0">{getIcon(course.icon)}</div>
              <span className="font-bold text-sm hidden lg:block">{course.title}</span>
              {selectedCourse.id === course.id && (
                <motion.div layoutId="active-module" className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-glass space-y-6">
          <div className="hidden lg:block glass-card rounded-[2rem] p-6 border border-glass">
            <p className="text-[10px] uppercase font-black text-muted mb-2 tracking-widest">Your Mastery</p>
            <div className="flex items-center justify-between text-main font-black mb-3">
              <span className="text-sm">Progress</span>
              <span className="text-[#6C5CE7]">45%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-glass">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '45%' }}
                className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#00D2FF]" 
              />
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-3 p-4 text-muted hover:text-[#6C5CE7] font-bold text-xs uppercase tracking-widest transition-colors">
            <Settings className="w-5 h-5" />
            <span className="hidden lg:block">System Config</span>
          </button>
        </div>
      </aside>

      {/* 🟨 COLUMN 2: Topics List (Middle Sidebar) */}
      <aside className="w-64 lg:w-80 bg-bg/30 border-r border-glass flex flex-col shrink-0 overflow-hidden">
        <div className="p-8 border-b border-glass">
          <div className="flex items-center gap-2 text-[#6C5CE7] mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest">Curriculum</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted">{selectedCourse.title}</span>
          </div>
          <h3 className="text-xl font-black text-main tracking-tight">Lesson Topics</h3>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
          {selectedCourse.topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between group ${
                selectedTopic.id === topic.id
                  ? 'bg-white/5 text-[#6C5CE7] border border-glass shadow-2xl'
                  : 'text-muted hover:bg-white/5 hover:text-main border border-transparent'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${selectedTopic.id === topic.id ? 'bg-[#6C5CE7] shadow-[0_0_10px_#6C5CE7]' : 'bg-white/10'} transition-all`} />
                <span className="text-sm font-bold truncate pr-2">{topic.title}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${selectedTopic.id === topic.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
            </button>
          ))}
        </div>
      </aside>

      {/* 🟩 COLUMN 3: Detail Panel (Right Side Content) */}
      <main className="flex-1 overflow-y-auto bg-bg selection:bg-[#6C5CE7]/30 custom-scrollbar">
        <div className="max-w-4xl mx-auto px-8 py-16 lg:px-12 space-y-12">
          {/* Header */}
          <header className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6C5CE7]/10 rounded-full border border-[#6C5CE7]/20"
            >
              <div className="w-2 h-2 rounded-full bg-[#6C5CE7] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#6C5CE7]">Active Session</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black text-main tracking-tighter leading-none">
              {selectedTopic.title}
            </h1>
          </header>

          <hr className="border-glass" />

          {/* Definition Section */}
          <section className="space-y-6 group">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#6C5CE7]/10 rounded-2xl border border-[#6C5CE7]/20 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-[#6C5CE7]" />
              </div>
              <h2 className="text-2xl font-black text-main tracking-tight">Definition</h2>
            </div>
            <div className="glass-card rounded-[2.5rem] p-10 border border-glass shadow-2xl group-hover:border-[#6C5CE7]/40 transition-all duration-500">
              <p className="text-xl text-muted leading-relaxed font-medium">
                {selectedTopic.definition}
              </p>
            </div>
          </section>

          {/* Explanation Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#00D2FF]/10 rounded-2xl border border-[#00D2FF]/20">
                <Info className="w-6 h-6 text-[#00D2FF]" />
              </div>
              <h2 className="text-2xl font-black text-main tracking-tight">Core Concept</h2>
            </div>
            <p className="text-muted text-lg leading-relaxed px-4 border-l-4 border-glass font-medium">
              {selectedTopic.explanation}
            </p>
          </section>

          {/* Code Example Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#00C896]/10 rounded-2xl border border-[#00C896]/20">
                  <Terminal className="w-6 h-6 text-[#00C896]" />
                </div>
                <h2 className="text-2xl font-black text-main tracking-tight">Practical Implementation</h2>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-[#6C5CE7] transition-colors">
                Copy Code
              </button>
            </div>
            <div className="rounded-[2.5rem] overflow-hidden border border-glass shadow-2xl bg-[#0d0d0f] group">
              <div className="px-6 py-4 bg-white/5 border-b border-glass flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF4757]/50" />
                  <div className="w-3 h-3 rounded-full bg-[#FFB400]/50" />
                  <div className="w-3 h-3 rounded-full bg-[#2ED573]/50" />
                </div>
                <span className="text-[10px] font-mono font-black text-muted uppercase tracking-widest px-3 py-1 bg-white/5 rounded-lg">example.jsx</span>
              </div>
              <pre className="p-10 font-mono text-sm leading-relaxed overflow-x-auto text-blue-300 custom-scrollbar">
                <code>{selectedTopic.codeExample}</code>
              </pre>
            </div>
          </section>

          {/* Key Points Section */}
          <section className="space-y-8 pt-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                <HelpCircle className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-2xl font-black text-main tracking-tight">Quick Check</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {selectedTopic.keyPoints.map((point, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-6 glass-card border border-glass rounded-[2rem] hover:bg-white/5 transition-colors cursor-default"
                >
                  <CheckCircle className="w-6 h-6 text-[#00C896] shrink-0" />
                  <span className="text-main font-bold text-sm tracking-tight">{point}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Footer Navigation */}
          <footer className="pt-16 pb-24 border-t border-glass flex items-center justify-between gap-8">
            <button 
              onClick={handlePrevious}
              className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-white/5 hover:bg-white/10 text-main font-black rounded-2xl transition-all border border-glass disabled:opacity-20 shadow-xl"
              disabled={selectedCourse.id === LEARNING_DATA[0].id && selectedCourse.topics[0].id === selectedTopic.id}
            >
              <ArrowLeft className="w-5 h-5" /> Previous Lesson
            </button>
            <button 
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-4 px-10 py-5 bg-[#6C5CE7] text-white font-black rounded-2xl transition-all shadow-2xl shadow-[#6C5CE7]/20 disabled:opacity-20 hover:scale-[1.02] active:scale-95"
              disabled={selectedCourse.id === LEARNING_DATA[LEARNING_DATA.length - 1].id && selectedCourse.topics[selectedCourse.topics.length - 1].id === selectedTopic.id}
            >
              Complete & Next <ArrowRight className="w-5 h-5" />
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}


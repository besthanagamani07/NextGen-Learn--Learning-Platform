/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { COURSES } from '../data/constants';
import { Icon } from '../components/Icon';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, Filter, SlidersHorizontal, ArrowRight, Zap, Trophy, Clock, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All Courses', 'Frontend', 'Backend', 'AI & ML', 'Security', 'Database'];

export default function Courses() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Courses');

  const filteredCourses = COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                         course.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All Courses' || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-20">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 text-[#6C5CE7] text-xs font-black uppercase tracking-widest"
        >
          <Zap className="w-4 h-4" /> NextGen Learning Paths
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black text-main tracking-tighter">
          Master Your <span className="text-gradient">Tech Stack</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto font-medium">
          Choose from over 50+ industry-verified courses and build your career.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-64 space-y-10 shrink-0">
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-main font-black uppercase tracking-widest text-xs">
               <Filter className="w-4 h-4" /> Categories
             </div>
             <div className="flex flex-wrap lg:flex-col gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all text-left flex items-center justify-between group ${
                      activeCategory === cat 
                        ? 'bg-[#6C5CE7] text-white shadow-xl shadow-[#6C5CE7]/20' 
                        : 'bg-white/5 text-muted border border-glass hover:bg-white/10'
                    }`}
                  >
                    {cat}
                    {activeCategory === cat && <motion.div layoutId="active-cat-bg" className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </button>
                ))}
             </div>
          </div>

          <div className="p-8 glass-card rounded-[2.5rem] border border-glass space-y-6">
            <Trophy className="w-10 h-10 text-amber-500" />
            <h4 className="font-black text-main">Become a Pro</h4>
            <p className="text-xs text-muted leading-relaxed">Enroll in our professional track to earn industry-recognized credentials.</p>
            <button className="w-full py-3 bg-white/5 border border-glass text-main font-bold rounded-xl text-xs hover:bg-[#6C5CE7] hover:text-white hover:border-[#6C5CE7] transition-all">
              Learn More
            </button>
          </div>
        </aside>

        {/* Course Grid */}
        <div className="flex-1 space-y-10">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-[#6C5CE7] transition-colors" />
            <input
              type="text"
              placeholder="Search by course title, skills, or teachers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-bg-card border border-glass text-main rounded-[2rem] focus:ring-4 focus:ring-[#6C5CE7]/10 focus:border-[#6C5CE7]/40 transition-all outline-none font-medium text-lg shadow-2xl"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2">
               <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-glass rounded-xl text-[10px] font-black text-muted uppercase tracking-widest">
                 <SlidersHorizontal className="w-3 h-3" /> Filters
               </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.03 }}
                >
                  <Link to={`/courses/${course.id}`} className="group block">
                    <div className="relative glass-card rounded-[2.5rem] p-8 h-full border border-glass shadow-2xl hover:shadow-[#6C5CE7]/10 hover:-translate-y-2 hover:border-[#6C5CE7]/40 transition-all duration-500 overflow-hidden flex flex-col">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Icon name={course.iconName} className="w-32 h-32" />
                      </div>

                      <div className="flex justify-between items-start mb-8">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-glass group-hover:bg-[#6C5CE7]/10 transition-colors">
                          <Icon name={course.iconName} className="w-8 h-8 text-[#6C5CE7]" />
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20 text-[10px] font-black">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          {course.rating}
                        </div>
                      </div>

                      <div className="space-y-4 flex-1">
                        <h3 className="text-2xl font-black text-main tracking-tight leading-tight group-hover:text-gradient">
                          {course.title}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed line-clamp-3">
                          {course.description}
                        </p>
                      </div>

                      <div className="mt-8 grid grid-cols-2 gap-4 pb-8 border-b border-glass">
                        <div className="flex items-center gap-2">
                           <Clock className="w-4 h-4 text-muted" />
                           <span className="text-[10px] font-black text-muted uppercase tracking-widest">{course.duration || '12h 30m'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Users className="w-4 h-4 text-muted" />
                           <span className="text-[10px] font-black text-muted uppercase tracking-widest">{(course.reviewsCount / 100).toFixed(1)}k Students</span>
                        </div>
                      </div>

                      <div className="pt-6 flex items-center justify-between">
                         <span className="text-sm font-black text-[#6C5CE7] flex items-center gap-2">
                           Enroll Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                         </span>
                         <span className="text-xs font-bold text-muted">{course.category || 'Course'}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredCourses.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 space-y-6 glass-card rounded-[3rem] border border-glass"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-10 h-10 text-muted" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-main tracking-tight">No results found</h3>
                <p className="text-muted max-w-[300px] mx-auto">We couldn't find any courses matching "{search}". Try a different term or category.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area 
} from 'recharts';
import { 
  CheckCircle2, Clock, Zap, Target, BookOpen,
  ArrowUpRight, Award, Flame, LayoutDashboard,
  Settings, Bookmark, History, Star, TrendingUp, Users
} from 'lucide-react';
import { COURSES } from '../data/constants';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useState } from 'react';

const DATA = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 4 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 5 },
  { day: 'Fri', hours: 2 },
  { day: 'Sat', hours: 7 },
  { day: 'Sun', hours: 4 },
];

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: BookOpen, label: 'My Courses', active: false },
  { icon: Award, label: 'Certificates', active: false },
  { icon: History, label: 'Watch History', active: false },
  { icon: Bookmark, label: 'Saved', active: false },
  { icon: TrendingUp, label: 'Goal Tracker', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="flex min-h-screen bg-bg">
      {/* 🟦 Dashboard Sidebar */}
      <aside className="w-72 hidden lg:flex flex-col border-r border-glass p-8 space-y-12 bg-bg/50 backdrop-blur-3xl sticky top-16 h-[calc(100vh-64px)]">
        <div className="space-y-4">
           <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] px-4">Student Panel</p>
           <nav className="space-y-1">
             {SIDEBAR_ITEMS.map((item) => (
               <button
                 key={item.label}
                 onClick={() => setActiveTab(item.label)}
                 className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${
                   activeTab === item.label 
                    ? 'bg-[#6C5CE7] text-white shadow-xl shadow-[#6C5CE7]/20 select-glow' 
                    : 'text-muted hover:bg-white/5 hover:text-main'
                 }`}
               >
                 <item.icon className="w-5 h-5" />
                 {item.label}
               </button>
             ))}
           </nav>
        </div>

        <div className="mt-auto p-6 glass-card rounded-[2rem] border border-glass space-y-4">
           <div className="w-10 h-10 bg-[#FFB400]/10 rounded-xl flex items-center justify-center">
             <Star className="w-6 h-6 text-[#FFB400] fill-[#FFB400]" />
           </div>
           <h4 className="font-black text-main leading-tight">Pro Plan Expiring</h4>
           <p className="text-xs text-muted">Unlock 50+ new courses and premium mentorship.</p>
           <button className="w-full py-3 bg-[#6C5CE7] text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all outline-none">
             Renew Now
           </button>
        </div>
      </aside>

      {/* 🖥️ Main Dashboard Area */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-4">
               <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#00D2FF] rounded-full p-0.5 shadow-xl shadow-[#6C5CE7]/40">
                  <div className="w-full h-full rounded-full bg-[#0d0f14] flex items-center justify-center text-xl font-black text-white">
                    {user?.name?.[0] || 'S'}
                  </div>
               </div>
               <div>
                  <h1 className="text-3xl lg:text-5xl font-black text-main tracking-tighter">
                    Welcome, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Explorer'}</span>
                  </h1>
                  <p className="text-muted font-medium text-sm">Today is a great day to master a new skill.</p>
               </div>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-3xl px-6 py-3 rounded-2xl border border-glass group transition-all hover:bg-white/10">
              <Flame className="w-6 h-6 text-[#FF4757] fill-[#FF4757] animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-muted uppercase tracking-widest">Streak</span>
                <span className="font-bold text-main">12 Days</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-3xl px-6 py-3 rounded-2xl border border-glass group transition-all hover:bg-white/10">
              <Award className="w-6 h-6 text-amber-500" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-muted uppercase tracking-widest">Rank</span>
                <span className="font-bold text-main">Gold Elite</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: CheckCircle2, label: 'Lessons Done', value: '42', color: 'text-green-500', bg: 'bg-green-500/10' },
            { icon: Clock, label: 'Learning Hours', value: '128', color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { icon: Target, label: 'Goals Met', value: '88%', color: 'text-[#6C5CE7]', bg: 'bg-[#6C5CE7]/10' },
            { icon: Zap, label: 'Points Earned', value: '12.4k', color: 'text-amber-500', bg: 'bg-amber-500/10' },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-[2.5rem] p-8 flex items-center gap-6 border border-glass hover:bg-white/10 transition-all cursor-default shadow-2xl"
            >
              <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center shrink-0 border border-white/5`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-main tracking-tighter">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <div className="glass-card rounded-[3rem] p-10 relative overflow-hidden border border-glass shadow-2xl">
              <div className="flex items-center justify-between mb-12">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-main tracking-tight">Weekly Activity</h3>
                  <p className="text-xs text-muted font-bold uppercase tracking-widest">Time spent learning across modules</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-2xl border border-glass">
                  <button className="px-5 py-2 text-xs font-black bg-white/10 text-main rounded-xl shadow-xl">Weekly</button>
                  <button className="px-5 py-2 text-xs font-black text-muted hover:text-main">Monthly</button>
                </div>
              </div>
              
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DATA}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="rgba(255,255,255,0.03)" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 900 }} 
                      dy={15} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 900 }} 
                    />
                    <Tooltip 
                      cursor={{ stroke: 'rgba(108, 92, 231, 0.2)', strokeWidth: 2 }}
                      contentStyle={{ 
                        backgroundColor: 'rgba(13, 15, 20, 0.95)',
                        backdropFilter: 'blur(32px)',
                        borderRadius: '24px', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        padding: '16px 20px',
                        boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.5)'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#6C5CE7" 
                      strokeWidth={6} 
                      fillOpacity={1} 
                      fill="url(#colorHours)" 
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between px-4">
                <h3 className="text-2xl font-black text-main tracking-tight">Active Learning</h3>
                <Link to="/courses" className="text-xs font-black text-[#6C5CE7] hover:underline uppercase tracking-widest flex items-center gap-2 group">
                  View All Courses <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
              <div className="grid gap-6">
                {COURSES.slice(0, 2).map((course, idx) => (
                  <motion.div 
                    key={course.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card p-10 flex flex-col md:flex-row items-center gap-12 group hover:border-[#6C5CE7]/30 transition-all rounded-[3rem] border border-glass shadow-2xl"
                  >
                    <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center shrink-0 border border-glass group-hover:bg-[#6C5CE7]/10 transition-colors shadow-2xl relative">
                      <div className="absolute inset-0 bg-[#6C5CE7]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Icon name={course.iconName} className="w-12 h-12 text-[#6C5CE7] relative z-10" />
                    </div>
                    <div className="flex-1 space-y-6 w-full">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-black text-2xl text-main tracking-tight mb-1">{course.title}</h4>
                          <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Module 4 of 12 • Interactive</span>
                        </div>
                        <span className="px-4 py-2 bg-[#6C5CE7]/10 text-[#6C5CE7] rounded-full text-xs font-black border border-[#6C5CE7]/20">Level 4 Certifier</span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs font-black">
                          <span className="text-muted uppercase tracking-widest">Progress to Certificate</span>
                          <span className="text-main">{idx === 0 ? '75%' : '45%'}</span>
                        </div>
                        <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden border border-glass p-1">
                          <div className={`bg-gradient-to-r from-[#6C5CE7] to-[#00D2FF] h-full rounded-full transition-all duration-1000 ${idx === 0 ? 'w-[75%]' : 'w-[45%]'}`} />
                        </div>
                      </div>
                    </div>
                    <Link 
                      to={`/courses/${course.id}/learn`}
                      className="w-full md:w-auto px-10 py-5 bg-[#6C5CE7] text-white text-sm font-black rounded-2xl shadow-xl shadow-[#6C5CE7]/20 hover:scale-[1.02] active:scale-95 transition-all text-center"
                    >
                      Resume
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-10">
            {/* Global Mastery Circular Progress */}
            <div className="glass-card rounded-[3rem] p-10 flex flex-col border border-glass h-fit shadow-2xl">
              <h3 className="text-2xl font-black text-main tracking-tight mb-12">Global Mastery</h3>
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-64 flex items-center justify-center group mb-12">
                  <div className="absolute inset-0 bg-[#6C5CE7]/10 blur-[80px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                  <svg className="w-full h-full -rotate-90 drop-shadow-2xl">
                    <circle 
                      cx="128" cy="128" r="110" 
                      className="stroke-white/5 fill-none" 
                      strokeWidth="20" 
                    />
                    <circle 
                      cx="128" cy="128" r="110" 
                      className="stroke-[#6C5CE7] fill-none" 
                      strokeWidth="20" 
                      strokeDasharray="691" 
                      strokeDashoffset={691 * (1 - 0.65)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center shadow-main">
                    <span className="text-7xl font-black text-main tracking-tighter">65</span>
                    <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Overall Avg</span>
                  </div>
                </div>
                
                <div className="w-full space-y-8 px-2">
                  {[
                    { label: 'Frontend mastery', val: 75, color: 'bg-[#6C5CE7]' },
                    { label: 'Backend engineering', val: 45, color: 'bg-[#00D2FF]' },
                    { label: 'System architecture', val: 90, color: 'bg-[#FFB400]' },
                  ].map((it) => (
                    <div key={it.label} className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-muted">{it.label}</span>
                        <span className="text-main">{it.val}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-glass">
                        <div className={`${it.color} h-full rounded-full transition-all duration-700`} style={{ width: `${it.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements/Milestones */}
            <div className="glass-card rounded-[3rem] p-10 border border-glass h-fit shadow-2xl">
              <h3 className="text-2xl font-black text-main mb-10 tracking-tight">Milestones</h3>
              <div className="space-y-6">
                {[
                  { title: 'Responsive Pro', date: '2 days ago', icon: LayoutDashboard, color: 'text-[#6C5CE7]', bg: 'bg-[#6C5CE7]/10' },
                  { icon: BookOpen, title: 'Deep Learning', date: '1 week ago', color: 'text-[#00D2FF]', bg: 'bg-[#00D2FF]/10' },
                  { icon: Award, title: 'Clean Coder', date: '4 weeks ago', color: 'text-[#FF4757]', bg: 'bg-[#FF4757]/10' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5 items-center p-6 rounded-[2rem] bg-white/5 border border-glass hover:bg-white/10 transition-all cursor-pointer group">
                    <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-black text-main tracking-tight text-base mb-1">{item.title}</p>
                      <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

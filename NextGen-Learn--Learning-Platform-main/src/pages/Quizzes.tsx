/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { HelpCircle, Clock, Trophy, ArrowRight, BookOpen } from 'lucide-react';
import { QUIZZES, COURSES } from '../data/constants';
import { Link } from 'react-router-dom';

export default function Quizzes() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-black text-main">Knowledge <span className="text-gradient">Checkpoints</span></h1>
        <p className="text-muted text-lg max-w-2xl">
          Test your skills and reinforce your learning with interactive quizzes. Complete them to earn extra badges and move closer to your certification.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {QUIZZES.map((quiz, idx) => {
          const course = COURSES.find(c => c.id === quiz.courseId);
          return (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group glass-card p-8 rounded-[32px] border border-glass hover:border-primary/30 transition-all space-y-6 flex flex-col"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                  <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  quiz.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                  quiz.difficulty === 'Intermediate' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  'bg-purple-500/10 text-purple-400 border-purple-500/20'
                }`}>
                  {quiz.difficulty}
                </span>
              </div>

              <div className="space-y-2 flex-grow">
                <h3 className="text-xl font-bold text-main group-hover:text-primary transition-colors">{quiz.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{course?.title || 'General Course'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-glass">
                <div className="flex items-center gap-2 text-muted">
                  <Trophy className="w-4 h-4" />
                  <span className="text-xs font-bold">{quiz.questionsCount} Qs</span>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold">{quiz.timeLimit} Min</span>
                </div>
              </div>

              <Link
                to={`/quizzes/${quiz.id}`}
                className="w-full py-3 bg-white/5 border border-glass rounded-xl text-main text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all group"
              >
                Start Quiz <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

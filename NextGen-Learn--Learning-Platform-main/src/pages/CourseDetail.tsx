/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, Link, useNavigate } from 'react-router-dom';
import { COURSES } from '../data/constants';
import { Icon } from '../components/Icon';
import { motion } from 'motion/react';
import { Star, MessageSquare, Send, ArrowLeft, ThumbsUp } from 'lucide-react';
import React, { useState } from 'react';
import { Review } from '../types';

const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    userName: 'Sarah Jenkins',
    rating: 5,
    comment: 'Absolutely love this course! The hands-on projects were exactly what I needed to grasp the core concepts.',
    date: '2 days ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: '2',
    userName: 'Michael Chen',
    rating: 4,
    comment: 'Very informative. I would have liked a bit more depth in the final module, but overall a great experience.',
    date: '1 week ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
  }
];

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === id);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Course not found</h2>
        <Link to="/courses" className="text-blue-400 hover:underline">Back to courses</Link>
      </div>
    );
  }

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim() || userRating === 0) return;

    const review: Review = {
      id: Date.now().toString(),
      userName: 'Guest User',
      rating: userRating,
      comment: newReview,
      date: 'Just now',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`
    };

    setReviews([review, ...reviews]);
    setNewReview('');
    setUserRating(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/courses" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Courses
      </Link>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Course Info */}
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-6">
            <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center border border-blue-500/20">
              <Icon name={course.iconName} className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white mb-4">{course.title}</h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                {course.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-5 h-5 ${star <= Math.round(course.rating) ? 'fill-blue-400 text-blue-400' : 'text-slate-700'}`} 
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-white">{course.rating}</span>
                <span className="text-slate-500">({course.reviewsCount.toLocaleString()} reviews)</span>
              </div>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="text-slate-300">
                <span className="font-bold text-white">12k+</span> students enrolled
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-blue-400" /> Reviews & Ratings
            </h2>

            {/* Add Review Form */}
            <div className="glass-card p-8 space-y-6">
              <h3 className="font-bold text-white">Rate this course</h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform active:scale-95"
                    >
                      <Star 
                        className={`w-8 h-8 ${star <= (hoverRating || userRating) ? 'fill-blue-400 text-blue-400' : 'text-slate-700'}`} 
                      />
                    </button>
                  ))}
                </div>
                <form onSubmit={handleAddReview} className="relative">
                  <textarea
                    placeholder="Share your experience..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[120px] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!newReview.trim() || userRating === 0}
                    className="absolute bottom-4 right-4 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-6 flex gap-6"
                >
                  <img 
                    src={review.avatar} 
                    alt={review.userName} 
                    className="w-12 h-12 rounded-full border-2 border-white/10 bg-white/5"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white">{review.userName}</h4>
                        <div className="flex mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-3 h-3 ${star <= review.rating ? 'fill-blue-400 text-blue-400' : 'text-slate-800'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">{review.date}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                    <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-400 transition-colors pt-2">
                      <ThumbsUp className="w-3.5 h-3.5" /> Helpful
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="glass-card p-8 sticky top-28 space-y-6">
            <div className="space-y-2">
              <div className="text-3xl font-black text-white">Free</div>
              <div className="text-sm text-slate-400 line-through">$49.99</div>
            </div>
            
            <button 
              onClick={() => navigate(`/courses/${course.id}/learn`)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-900/20"
            >
              Start Learning Now
            </button>
            
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Duration</span>
                <span className="text-white font-bold">12 Hours</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Lessons</span>
                <span className="text-white font-bold">42 Modules</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Level</span>
                <span className="text-white font-bold">All Levels</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Certificates</span>
                <span className="text-white font-bold">Yes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  title: string;
  description: string;
  iconName: string;
  progress: number;
  rating: number;
  reviewsCount: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  image: string;
  iconName: string;
}

export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  questionsCount: number;
  difficulty: string;
  timeLimit: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface UserStats {
  completedLessons: number;
  learningHours: number;
  currentStreak: number;
  overallProgress: number;
}

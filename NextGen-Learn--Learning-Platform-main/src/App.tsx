/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import CourseDetail from './pages/CourseDetail';
import Courses from './pages/Courses';
import Quizzes from './pages/Quizzes';
import QuizTake from './pages/QuizTake';
import DevLab from './pages/DevLab';
import Dashboard from './pages/Dashboard';
import Certificates from './pages/Certificates';
import Auth from './pages/Auth';
import CoursePlayer from './pages/CoursePlayer';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/:id/learn" element={<CoursePlayer />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quizzes/:id" element={<QuizTake />} />
          <Route path="/devlab" element={<DevLab />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Layout>
    </Router>
  );
}

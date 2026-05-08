/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, ChevronRight, Timer, Trophy, AlertCircle } from 'lucide-react';
import { QUIZZES } from '../data/constants';
import { Question } from '../types';

const MOCK_QUESTIONS: Record<string, Question[]> = {
  'react-basics': [
    {
      id: 'q1',
      text: 'What is the main purpose of React hooks?',
      options: [
        'To create class components',
        'To use state and other React features in functional components',
        'To manage database connections',
        'To style elements directly'
      ],
      correctAnswer: 1
    },
    {
      id: 'q2',
      text: 'Which hook is used for handling side effects in functional components?',
      options: ['useState', 'useRef', 'useEffect', 'useMemo'],
      correctAnswer: 2
    },
    {
      id: 'q3',
      text: 'What is the Virtual DOM?',
      options: [
        'A direct copy of the HTML',
        'A lightweight representation of the real DOM in memory',
        'A tool for inspecting network requests',
        'A new way to write CSS'
      ],
      correctAnswer: 1
    },
    {
      id: 'q4',
      text: 'What is React.memo used for?',
      options: [
        'Routing between pages',
        'Managing global state',
        'Preventing unnecessary re-renders of functional components',
        'Translating code to machine language'
      ],
      correctAnswer: 2
    },
    {
      id: 'q5',
      text: 'How is data passed from a parent to a child component in React?',
      options: ['Via global variables', 'Via Props', 'Via local storage', 'Via HTTP requests'],
      correctAnswer: 1
    }
  ],
  'python-advanced': [
    {
      id: 'p1',
      text: 'What is a decorator in Python?',
      options: [
        'A design pattern for UI',
        'A function that takes another function and extends its behavior',
        'A way to delete objects',
        'A syntax for loops'
      ],
      correctAnswer: 1
    },
    {
      id: 'p2',
      text: 'What is the purpose of the "yield" keyword?',
      options: [
        'To stop the program',
        'To define a constant',
        'To return a value and temporarily pause a generator function',
        'To import a library'
      ],
      correctAnswer: 2
    },
    {
      id: 'p3',
      text: 'What are Python list comprehensions?',
      options: [
        'A way to compress files',
        'A concise way to create lists',
        'A method for list encryption',
        'A debugging tool'
      ],
      correctAnswer: 1
    },
    {
      id: 'p4',
      text: 'What is the difference between __init__ and __new__?',
      options: [
        'They are identical',
        '__init__ is for variables, __new__ is for methods',
        '__new__ creates the instance, while __init__ initializes it',
        '__init__ is for classes, __new__ is for modules'
      ],
      correctAnswer: 2
    },
    {
      id: 'p5',
      text: 'What happens in monkey patching in Python?',
      options: [
        'The program crashes intentionally',
        'Dynamic modification of a class or module at runtime',
        'Automatic data backup',
        'Testing code with random inputs'
      ],
      correctAnswer: 1
    }
  ],
  'ai-intro': [
    {
      id: 'a1',
      text: 'Which activation function is most commonly used in deep learning hidden layers?',
      options: ['Sigmoid', 'Step', 'ReLU', 'Linear'],
      correctAnswer: 2
    },
    {
      id: 'a2',
      text: 'What is backpropagation?',
      options: [
        'A hardware cooling method',
        'An algorithm for updating neural network weights based on error',
        'A way to backup data',
        'A type of network cables'
      ],
      correctAnswer: 1
    },
    {
      id: 'a3',
      text: 'What does "overfitting" mean in machine learning?',
      options: [
        'The model is too fast',
        'The model learns noise in training data and fails on new data',
        'The model is too small to handle data',
        'The model consumes too much memory'
      ],
      correctAnswer: 1
    },
    {
      id: 'a4',
      text: 'What is an "epoch"?',
      options: [
        'A single training example',
        'A type of neural network',
        'One complete pass through the entire training dataset',
        'A measurement of time'
      ],
      correctAnswer: 2
    },
    {
      id: 'a5',
      text: 'What is the primary goal of a loss function?',
      options: [
        'To delete unused data',
        'To measure how well the model predicts the actual target',
        'To limit the number of users',
        'To encrypt the model'
      ],
      correctAnswer: 1
    }
  ]
};

export default function QuizTake() {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = QUIZZES.find(q => q.id === id);
  const questions = MOCK_QUESTIONS[id || ''] || MOCK_QUESTIONS['react-basics'];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!quiz) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-main mb-4">Quiz not found</h2>
        <Link to="/quizzes" className="text-primary hover:underline font-bold">Back to Quizzes</Link>
      </div>
    );
  }

  const handleNext = () => {
    if (selectedOption === questions[currentStep].correctAnswer) {
      setScore(score + 1);
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border-4 border-primary/20">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-4xl font-black text-main">Quiz Completed!</h2>
          <p className="text-xl text-muted font-medium">Great effort on finishing <span className="text-main">{quiz.title}</span>.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="glass-card p-10 rounded-[32px] space-y-2">
            <p className="text-sm font-bold text-muted uppercase tracking-widest leading-none">Your Score</p>
            <p className="text-5xl font-black text-main">{percentage}%</p>
            <p className="text-xs text-muted font-black uppercase mt-4">{score} / {questions.length} Correct</p>
          </div>
          <div className="glass-card p-10 rounded-[32px] space-y-2">
            <p className="text-sm font-bold text-muted uppercase tracking-widest leading-none">Status</p>
            <p className={`text-3xl font-black ${percentage >= 70 ? 'text-green-500' : 'text-orange-500'}`}>
              {percentage >= 70 ? 'Certified' : 'Keep Practicing'}
            </p>
            <p className="text-xs text-muted font-black uppercase mt-4">Required: 70%</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/quizzes')}
            className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl hover:opacity-90 transition-all"
          >
            Explore More Quizzes
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-white/5 border border-glass text-main font-black rounded-2xl hover:bg-white/10 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/quizzes" className="inline-flex items-center gap-2 text-muted hover:text-main transition-colors font-bold text-sm uppercase">
          <ArrowLeft className="w-4 h-4" /> Cancel Quiz
        </Link>
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-glass">
          <Timer className="w-4 h-4 text-primary" />
          <span className="text-sm font-black text-main tabular-nums">14:52</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-xs font-black text-muted uppercase tracking-widest">Question {currentStep + 1} of {questions.length}</span>
          <span className="text-xs font-black text-primary uppercase tracking-widest">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-glass p-0.5">
          <motion.div 
            className="h-full bg-primary rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 60 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card p-8 md:p-12 rounded-[40px] space-y-12"
        >
          <h3 className="text-2xl md:text-3xl font-black text-main leading-tight">
            {currentQuestion.text}
          </h3>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`group flex items-center gap-4 p-6 rounded-2xl border transition-all text-left ${
                  selectedOption === idx 
                    ? 'bg-primary/10 border-primary shadow-[0_4px_20px_rgba(59,130,246,0.15)]' 
                    : 'bg-white/5 border-glass hover:border-primary/30 hover:bg-white/10'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-glass transition-all ${
                  selectedOption === idx ? 'bg-primary text-white border-primary' : 'text-muted group-hover:text-primary group-hover:border-primary/50'
                }`}>
                  <span className="text-xs font-black">{String.fromCharCode(65 + idx)}</span>
                </div>
                <span className={`font-bold transition-all ${selectedOption === idx ? 'text-main' : 'text-muted group-hover:text-main'}`}>
                  {option}
                </span>
                {selectedOption === idx && <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-blue-900/20 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 text-lg"
          >
            {currentStep === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

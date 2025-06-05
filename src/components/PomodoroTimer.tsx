import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PomodoroTimer: React.FC = () => {
  // Timer state
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [focusSessionCount, setFocusSessionCount] = useState(0);
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');

  // Timer durations
  const durations = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Switch modes after timer ends
      setIsRunning(false);
      if (mode === 'focus') {
        setFocusSessionCount(prev => prev + 1);
        setSessionCount((prev) => prev + 1);
        setMode(sessionCount % 4 === 3 ? 'longBreak' : 'shortBreak');
        setTimeLeft(sessionCount % 4 === 3 ? durations.longBreak : durations.shortBreak);
      } else {
        setMode('focus');
        setTimeLeft(durations.focus);
        setSessionCount((prev) => prev + 1);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, sessionCount]);

  // Skip the current session
  const skipSession = () => {
    setIsRunning(false);
    if (mode === 'focus') {
      const newFocusCount = focusSessionCount + 1;
      setFocusSessionCount(newFocusCount);
      setSessionCount(prev => prev + 1);
      
      // Check if we should go to long break (every 4 focus sessions)
      if (newFocusCount % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(durations.longBreak);
      } else {
        setMode('shortBreak');
        setTimeLeft(durations.shortBreak);
      }
    } else {
      setMode('focus');
      setTimeLeft(durations.focus);
      setSessionCount(prev => prev + 1);
    }
  };

  // Start/Pause the timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(durations[mode]);
  };

  // Switch modes manually
  const switchMode = (newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(durations[newMode]);
  };

  // Helper function to get mode icon and text
  const getModeDisplay = () => {
    switch (mode) {
      case 'focus':
        return { icon: '🍅', text: 'Focus Time' };
      case 'shortBreak':
        return { icon: '☕', text: 'Short Break' };
      case 'longBreak':
        return { icon: '☀️', text: 'Long Break' };
    }
  };

  const modeDisplay = getModeDisplay();



  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Main Timer Container with Background */}
      <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-4">
            <span className="text-red-500 text-2xl">{modeDisplay.icon}</span>
            <h1 className="text-2xl font-bold text-white">{modeDisplay.text}</h1>
          </div>
          <div className="flex items-center space-x-4 text-gray-400">
            <div className="flex items-center space-x-2">
              <span>🍅</span>
              <span>{focusSessionCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📊</span>
              <span>Session {sessionCount}</span>
            </div>
          </div>
        </div>

        {/* Timer Display with Progress Ring */}
        <motion.div className="relative flex items-center justify-center w-64 h-64">
          <svg className="absolute inset-0" viewBox="0 0 100 100">
            {/* Define gradient */}
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FF6B6B' }} />
                <stop offset="100%" style={{ stopColor: '#4ECDC4' }} />
              </linearGradient>
            </defs>
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#2D3748"
              strokeWidth="4"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="4"
              strokeDasharray="283"
              strokeDashoffset={283 * (timeLeft / durations[mode])}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 * (timeLeft / durations[mode]) }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </svg>
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/10 to-teal-500/10"
            animate={{ opacity: isRunning ? [0.2, 0.4, 0.2] : 0.2 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="text-5xl font-mono text-white">
            {formatTime(timeLeft)}
          </div>
          <div className="absolute bottom-10">
            <span className="text-sm bg-black/30 font medium px-4 py-1 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-transparent bg-clip-text">
            {isRunning ? 'Running' : 'Ready'}
            </span>
          </div>
        </motion.div>

        {/* Controls in Two Rows */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <motion.button
              onClick={toggleTimer}
              className="px-6 py-2 bg-blue-500 rounded-full text-white font-medium flex items-center space-x-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{isRunning ? '⏸️' : '▶️'}</span>
              <span>{isRunning ? 'Pause' : 'Start'}</span>
            </motion.button>
            <motion.button
              onClick={resetTimer}
              className="px-6 py-2 bg-gray-600 rounded-full text-white font-medium flex items-center space-x-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🔄</span>
              <span>Reset</span>
            </motion.button>
          </div>
          <motion.button
            onClick={skipSession}
            className="px-6 py-2 bg-gray-600 rounded-full text-white font-medium flex items-center space-x-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>⏭️</span>
            <span>Skip Session</span>
          </motion.button>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="flex space-x-4">
        <motion.div
          onClick={() => switchMode('focus')}
          className={`p-4 rounded-lg cursor-pointer w-40 flex flex-col items-center ${
            mode === 'focus' ? 'bg-gray-700' : 'bg-gray-800'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-red-500 text-2xl mb-1">🍅</span>
          <span className="text-white font-medium">Focus</span>
          <span className="text-gray-400 text-sm">25:00</span>
        </motion.div>
        <motion.div
          onClick={() => switchMode('shortBreak')}
          className={`p-4 rounded-lg cursor-pointer w-40 flex flex-col items-center ${
            mode === 'shortBreak' ? 'bg-gray-700' : 'bg-gray-800'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-gray-400 text-2xl mb-1">☕</span>
          <span className="text-white font-medium">Short Break</span>
          <span className="text-gray-400 text-sm">05:00</span>
        </motion.div>
        <motion.div
          onClick={() => switchMode('longBreak')}
          className={`p-4 rounded-lg cursor-pointer w-40 flex flex-col items-center ${
            mode === 'longBreak' ? 'bg-gray-700' : 'bg-gray-800'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-yellow-400 text-2xl mb-1">☀️</span>
          <span className="text-white font-medium">Long Break</span>
          <span className="text-gray-400 text-sm">15:00</span>
        </motion.div>
      </div>
    </div>
  );
};

export default PomodoroTimer; 
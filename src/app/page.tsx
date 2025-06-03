"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PomodoroTimer() {
  const [time, setTime] = useState("25:00");
  const [isRunning, setIsRunning] = useState(false);
  const [showPanelSettings, setShowPanelSettings] = useState(false);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setTime("25:00");
    setIsRunning(false);
  };

  return (
    <div
      style={{ 
        backgroundImage: `url('/mountain-pomdoro-1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        opacity: '75%',
      }}
      className="flex flex-col items-center justify-center p-6 relative"
    >
      <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-md">Pomodoro Timer</h1>
      <div className="text-6xl font-mono mb-6 text-white drop-shadow">{time}</div>

      {/* ▶️ Button Row */}
      <div className="flex space-x-4">
        {!isRunning ? (
          <Button onClick={handleStart} className="px-6 py-2 text-lg">Start</Button>
        ) : (
          <Button onClick={handlePause} className="px-6 py-2 text-lg">Pause</Button>
        )}
        <Button onClick={handleReset} className="px-6 py-2 text-lg">Reset</Button>
      </div>

      {/* This is the Settings Button */}
      <button 
        onClick={() => setShowPanelSettings(!showPanelSettings)}
        id="settings-button"
        className="w-10 h-10 absolute top-4 right-4 z-50 text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path strokeLinecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path strokeLinecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>

      </button>

      {/* This is the Settings Panel */}
      {showPanelSettings && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 relative">
            <h2 className="text-xl font-bold text-center">Settings</h2>
            
            <p className="text-sm text-center mt-2 text-gray-500">
              Choose what fits you best!</p>


            <button
              onClick={() => setShowPanelSettings(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

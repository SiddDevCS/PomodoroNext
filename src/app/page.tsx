"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PomodoroTimer() {
  const [time, setTime] = useState("25:00");
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime("25:00");
    setIsRunning(false);
  };

  return (
    <div
      style={{ backgroundImage: `url('/mountain-pomodoro-1.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-md">Pomodoro Timer</h1>
      <div className="text-6xl font-mono mb-6 text-white drop-shadow">{time}</div>
      <div className="flex space-x-4">
        {!isRunning ? (
          <Button onClick={handleStart} className="px-6 py-2 text-lg">
            Start
          </Button>
        ) : (
          <Button onClick={handlePause} className="px-6 py-2 text-lg">
            Pause
          </Button>
        )}
        <Button onClick={handleReset} className="px-6 py-2 text-lg">
          Reset
        </Button>
      </div>
    </div>
  );
}

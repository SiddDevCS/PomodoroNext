"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PomodoroTimer() {
  const [time, setTime] = useState("25:00");
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    // leave this space for backend timer logic
    setIsRunning(true);
  };

  const handlePause = () => {
    // leave this space for backend timer pause logic
    setIsRunning(false);
  };

  const handleReset = () => {
    // leave this space for backend reset logic
    setTime("25:00");
    setIsRunning(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 to-teal-100 p-6">
      <h1 className="text-4xl font-bold mb-8">Pomodoro Timer</h1>
      <div className="text-6xl font-mono mb-6">{time}</div>
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
    </main>
  );
}


import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Set up interval to update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    // Clean up interval
    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { value: timeRemaining.days, label: "Days" },
    { value: timeRemaining.hours, label: "Hours" },
    { value: timeRemaining.minutes, label: "Minutes" },
    { value: timeRemaining.seconds, label: "Seconds" },
  ];

  return (
    <div className={cn("flex flex-wrap justify-center gap-4", className)}>
      {timeUnits.map((unit, index) => (
        <div key={index} className="text-center">
          <div className="bg-white bg-opacity-50 backdrop-blur-sm rounded-lg shadow-lg p-3 min-w-16">
            <div className="text-2xl font-bold text-romantic-deep">{unit.value}</div>
            <div className="text-xs text-gray-600">{unit.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;

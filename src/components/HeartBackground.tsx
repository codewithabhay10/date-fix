
import React, { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: string;
  size: number;
  duration: number;
  opacity: number;
}

const HeartBackground = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Add initial hearts
    const initialHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 12 + 8,
      duration: Math.random() * 15 + 10,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setHearts(initialHearts);

    // Add new hearts occasionally
    const interval = setInterval(() => {
      setHearts((prevHearts) => {
        // Remove some hearts to avoid too many elements
        if (prevHearts.length > 30) {
          const newHearts = [...prevHearts];
          newHearts.splice(0, 5);
          return [
            ...newHearts,
            {
              id: Date.now(),
              left: `${Math.random() * 100}%`,
              size: Math.random() * 12 + 8,
              duration: Math.random() * 15 + 10,
              opacity: Math.random() * 0.5 + 0.3,
            },
          ];
        }

        return [
          ...prevHearts,
          {
            id: Date.now(),
            left: `${Math.random() * 100}%`,
            size: Math.random() * 12 + 8,
            duration: Math.random() * 15 + 10,
            opacity: Math.random() * 0.5 + 0.3,
          },
        ];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart absolute"
          style={{
            left: heart.left,
            top: "100%",
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `float ${heart.duration}s linear infinite`,
            transform: `scale(${heart.size / 10})`,
            zIndex: -1,
          }}
        />
      ))}
    </div>
  );
};

export default HeartBackground;

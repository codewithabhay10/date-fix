
import React, { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
}

interface ConfettiEffectProps {
  active: boolean;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ active }) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) return;

    const colors = ["#FF84A1", "#F97BEF", "#BB86FC", "#FFCAE5", "#D946EF"];
    const pieces: ConfettiPiece[] = [];

    // Create confetti pieces
    for (let i = 0; i < 150; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * -window.innerHeight,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
      });
    }

    setConfetti(pieces);

    // Clean up confetti after some time
    const timer = setTimeout(() => {
      setConfetti([]);
    }, 6000);

    return () => clearTimeout(timer);
  }, [active]);

  if (!active || confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animation: "fall 5s linear",
            opacity: Math.random() * 0.5 + 0.5,
          }}
        />
      ))}
      <style>
        {`
        @keyframes fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateY(${window.innerHeight}px) rotate(360deg);
            opacity: 0;
          }
        }
        `}
      </style>
    </div>
  );
};

export default ConfettiEffect;

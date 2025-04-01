import React, { useState } from "react";
import { Heart, X, CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ConfettiEffect from "./ConfettiEffect";
import CountdownTimer from "./CountdownTimer";

const DateInvitation: React.FC = () => {
  const [response, setResponse] = useState<"pending" | "accepted" | "declined">("pending");
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonCount, setNoButtonCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  const getNextSaturday = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 6 is Saturday
    
    const daysUntilSaturday = dayOfWeek === 6 ? 7 : 6 - dayOfWeek;
    
    const nextSaturday = new Date(now);
    nextSaturday.setDate(now.getDate() + daysUntilSaturday);
    
    nextSaturday.setHours(0, 0, 0, 0); // Reset to midnight
    
    nextSaturday.setHours(17, 0, 0, 0);
    
    return nextSaturday;
  };

  const dateTime = getNextSaturday();

  const moveNoButton = () => {
    setNoButtonCount(noButtonCount + 1);
    
    const range = noButtonCount > 2 ? 300 : 100;
    
    const newX = Math.floor(Math.random() * range * 2) - range;
    const newY = Math.floor(Math.random() * range * 2) - range;
    
    setNoButtonPosition({ x: newX, y: newY });
    
    const messages = [
      "That's not the right button! 😉",
      "Try again! Hint: It's not this one 😄",
      "You're getting closer... to the Yes button! 💝",
      "Are you sure you're clicking the right button? 💕",
      "This button seems to be avoiding you! 💘"
    ];
    
    toast({
      description: messages[Math.min(noButtonCount, messages.length - 1)],
      duration: 2000,
    });
  };

  const handleYesClick = () => {
    setResponse("accepted");
    setShowConfetti(true);
    toast({
      title: "Yay! I knew you'd say yes! 💖",
      description: "I'm so excited for our date! It's going to be amazing!",
      duration: 5000,
    });
  };

  const handleNoClick = () => {
    if (noButtonCount > 4) {
      setResponse("declined");
      toast({
        title: "I'm impressed by your persistence! 😄",
        description: "Maybe next time? I'll keep trying! 💗",
        duration: 3000,
      });
    } else {
      moveNoButton();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <ConfettiEffect active={showConfetti} />
      <Card className="backdrop-blur-sm bg-white/80 border border-pink-200 shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <Heart className="text-pink-500 h-12 w-12 animate-pulse-scale" fill="#FFCAE5" />
          </div>
          
          <h1 className="font-dancing text-4xl mb-6 text-romantic-deep">
            Will you go on a date with me?
          </h1>

          <p className="mb-6 text-gray-700">
            I've been thinking about you a lot lately, and I'd love to spend some special time together.
            Would you do me the honor of going on a date with me?
          </p>

          {response === "pending" && (
            <div className="flex flex-col gap-4 items-center mt-8 relative h-28">
              <Button
                variant="default"
                size="lg"
                className="bg-romantic hover:bg-romantic-deep transition-all duration-300 min-w-36 text-lg"
                onClick={handleYesClick}
              >
                <Heart className="mr-2 h-4 w-4" /> Yes!
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 transition-all duration-300"
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                }}
                onMouseOver={moveNoButton}
                onClick={handleNoClick}
              >
                <X className="mr-2 h-4 w-4" /> No
              </Button>
            </div>
          )}

          {response === "accepted" && (
            <div className="mt-8 space-y-6">
              <div className="p-4 bg-romantic/20 rounded-lg">
                <h3 className="text-xl font-dancing font-semibold text-romantic-deep mb-2 flex items-center justify-center">
                  <CalendarHeart className="mr-2 h-5 w-5" />
                  It's a date!
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  I can't wait to see you! Our special time together is approaching:
                </p>
                <p className="text-sm font-semibold text-romantic-deep mb-2">
                  Saturday at 5:00 PM
                </p>
                <CountdownTimer targetDate={dateTime} />
              </div>
            </div>
          )}

          {response === "declined" && (
            <div className="mt-6">
              <p className="text-gray-700">I understand. Maybe another time? 💕</p>
              <Button 
                className="mt-4 bg-romantic hover:bg-romantic-deep"
                onClick={() => setResponse("pending")}
              >
                Ask me again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DateInvitation;

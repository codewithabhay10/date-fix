
import React from "react";
import DateInvitation from "@/components/DateInvitation";
import HeartBackground from "@/components/HeartBackground";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative">
      <HeartBackground />
      <main className="w-full">
        <DateInvitation />
      </main>
    </div>
  );
};

export default Index;

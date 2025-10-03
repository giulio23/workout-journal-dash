import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Dumbbell, Activity } from "lucide-react";
import DailyMetrics from "@/components/dashboard/DailyMetrics";
import GymStats from "@/components/dashboard/GymStats";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-primary">
                <Dumbbell className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                FitTrack
              </h1>
            </div>
            <Button 
              onClick={() => navigate("/workouts/new")}
              className="bg-gradient-accent hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Workout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Daily Activity Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Daily Activity</h2>
          </div>
          <DailyMetrics />
        </section>

        {/* Gym Workout Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Dumbbell className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Gym Workouts</h2>
          </div>
          <GymStats />
        </section>
      </main>
    </div>
  );
};

export default Index;

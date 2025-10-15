import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MonthlyCalendar from "@/components/workouts/MonthlyCalendar";
import WorkoutCard from "@/components/workouts/WorkoutCard";

const Workouts = () => {
  // Mock data
  const workouts = [
    {
      id: 1,
      name: "Upper Body Strength",
      date: "2025-10-14",
      startTime: "09:30",
      duration: 52,
      volume: 2450,
    },
    {
      id: 2,
      name: "Leg Day",
      date: "2025-10-12",
      startTime: "18:15",
      duration: 65,
      volume: 3200,
    },
    {
      id: 3,
      name: "Pull Workout",
      date: "2025-10-10",
      startTime: "07:00",
      duration: 48,
      volume: 2100,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            All Workouts
          </h1>
        </div>

        {/* Monthly Calendar */}
        <MonthlyCalendar workouts={workouts} />

        {/* Workout List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Recent Workouts</h2>
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workouts;

import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Clock, Weight, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WeeklyChart from "@/components/stats/WeeklyChart";
import CurrentWeek from "@/components/stats/CurrentWeek";
import MuscleGroupFrequency from "@/components/stats/MuscleGroupFrequency";
import WorkoutHistory from "@/components/stats/WorkoutHistory";

const WorkoutStats = () => {
  // Mock data
  const stats = {
    totalWorkouts: 24,
    totalTime: 1248, // minutes
    totalVolume: 45670, // kg
    todayMinutes: 52,
    weeklyAverage: 51,
  };

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
            Workout Statistics
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Workouts</p>
                <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-2xl font-bold">{Math.floor(stats.totalTime / 60)}h {stats.totalTime % 60}m</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Weight className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold">{(stats.totalVolume / 1000).toFixed(1)}t</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Dumbbell className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">{stats.todayMinutes}min</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weekly Avg</p>
                <p className="text-2xl font-bold">{stats.weeklyAverage}min</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <WeeklyChart />
          <CurrentWeek />
        </div>

        {/* Muscle Group Frequency */}
        <MuscleGroupFrequency />

        {/* Workout History */}
        <WorkoutHistory />
      </div>
    </div>
  );
};

export default WorkoutStats;

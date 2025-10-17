import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Weight, Target, Percent, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WorkoutFrequencyChart from "@/components/stats/WorkoutFrequencyChart";
import ProgressTrendChart from "@/components/stats/ProgressTrendChart";
import VolumeComparisonChart from "@/components/stats/VolumeComparisonChart";
import RepRangeDistributionChart from "@/components/stats/RepRangeDistributionChart";
import { useWorkoutStats } from "@/hooks/useWorkoutStats";

const WorkoutStats = () => {
  const stats = useWorkoutStats();

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

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sessions</p>
                <p className="text-xs text-muted-foreground/60">Last 30d</p>
                <p className="text-2xl font-bold">{stats.sessionsLast30d}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Weight className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-xs text-muted-foreground/60">Last 30d</p>
                <p className="text-2xl font-bold">{stats.totalVolumeLast30d.toLocaleString()} kg</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Trophy className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best 1RM</p>
                <p className="text-xs text-muted-foreground/60">Last 30d</p>
                <p className="text-2xl font-bold">{stats.best1RMLast30d.toFixed(1)} kg</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Target className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Load/Rep</p>
                <p className="text-xs text-muted-foreground/60">Last 30d</p>
                <p className="text-2xl font-bold">{stats.avgLoadPerRep.toFixed(1)} kg</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Percent className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Set Completion</p>
                <p className="text-xs text-muted-foreground/60">Actual vs Planned</p>
                <p className="text-2xl font-bold">{stats.setCompletionPercent.toFixed(0)}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Visuals - 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WorkoutFrequencyChart />
          <ProgressTrendChart />
          <VolumeComparisonChart />
          <RepRangeDistributionChart />
        </div>
      </div>
    </div>
  );
};

export default WorkoutStats;

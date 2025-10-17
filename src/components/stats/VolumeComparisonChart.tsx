import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useWorkoutStats } from "@/hooks/useWorkoutStats";
import { useMemo } from "react";

const VolumeComparisonChart = () => {
  const { last30dWorkouts } = useWorkoutStats();
  
  const data = useMemo(() => {
    // Group by exercise
    const exerciseMap = new Map<string, { actual: number; target: number }>();
    
    last30dWorkouts.forEach(workout => {
      if (!exerciseMap.has(workout.exercise)) {
        exerciseMap.set(workout.exercise, { actual: 0, target: 0 });
      }
      
      const stats = exerciseMap.get(workout.exercise)!;
      
      if (workout.weightActual > 0 && workout.repsActual > 0) {
        stats.actual += workout.weightActual * workout.repsActual;
      }
      
      if (workout.weightTarget > 0 && workout.repsTarget > 0) {
        stats.target += workout.weightTarget * workout.repsTarget;
      }
    });
    
    // Convert to array
    return Array.from(exerciseMap.entries())
      .map(([exercise, stats]) => ({
        exercise,
        actual: stats.actual,
        target: stats.target,
        adherence: stats.target > 0 ? (stats.actual / stats.target) * 100 : 0,
      }))
      .sort((a, b) => b.actual - a.actual);
  }, [last30dWorkouts]);
  
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Target vs Actual Volume</CardTitle>
        <p className="text-sm text-muted-foreground">Volume comparison by exercise (kg)</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="exercise" stroke="hsl(var(--muted-foreground))" angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: any, name: string) => {
                if (name === "adherence") return `${value.toFixed(0)}%`;
                return `${value.toLocaleString()} kg`;
              }}
            />
            <Legend />
            <Bar dataKey="target" fill="hsl(var(--muted))" radius={[8, 8, 0, 0]} name="Target" />
            <Bar dataKey="actual" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default VolumeComparisonChart;

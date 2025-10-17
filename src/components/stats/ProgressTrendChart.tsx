import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useWorkoutStats } from "@/hooks/useWorkoutStats";
import { useMemo } from "react";
import { format } from "date-fns";

const ProgressTrendChart = () => {
  const { last30dWorkouts } = useWorkoutStats();
  
  const data = useMemo(() => {
    // Group by date and exercise, calculate best Epley 1RM per day
    const dateExerciseMap = new Map<string, Map<string, number>>();
    
    last30dWorkouts.forEach(workout => {
      if (workout.weightActual > 0 && workout.repsActual > 0) {
        const epley = workout.weightActual * (1 + workout.repsActual / 30);
        
        if (!dateExerciseMap.has(workout.date)) {
          dateExerciseMap.set(workout.date, new Map());
        }
        
        const exerciseMap = dateExerciseMap.get(workout.date)!;
        const currentMax = exerciseMap.get(workout.exercise) || 0;
        exerciseMap.set(workout.exercise, Math.max(currentMax, epley));
      }
    });
    
    // Get all unique exercises
    const exercises = new Set<string>();
    last30dWorkouts.forEach(w => exercises.add(w.exercise));
    
    // Convert to array format for chart
    const result = Array.from(dateExerciseMap.entries())
      .map(([date, exerciseMap]) => {
        const entry: any = {
          date: format(new Date(date), 'MM/dd'),
        };
        
        exercises.forEach(exercise => {
          entry[exercise] = exerciseMap.get(exercise) || null;
        });
        
        return entry;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
    
    return { data: result, exercises: Array.from(exercises) };
  }, [last30dWorkouts]);
  
  const colors = [
    "hsl(var(--primary))",
    "hsl(var(--accent))",
    "hsl(var(--success))",
    "hsl(var(--warning))",
    "hsl(var(--destructive))",
  ];
  
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Progress Trend (Epley 1RM)</CardTitle>
        <p className="text-sm text-muted-foreground">Strength progression by exercise</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: any) => `${value?.toFixed(1)} kg`}
            />
            <Legend />
            {data.exercises.map((exercise, i) => (
              <Line
                key={exercise}
                type="monotone"
                dataKey={exercise}
                stroke={colors[i % colors.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProgressTrendChart;

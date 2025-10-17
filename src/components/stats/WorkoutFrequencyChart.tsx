import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from "recharts";
import { useWorkoutStats } from "@/hooks/useWorkoutStats";
import { useMemo } from "react";
import { format, startOfWeek, getWeek } from "date-fns";

const WorkoutFrequencyChart = () => {
  const { last30dWorkouts } = useWorkoutStats();
  
  const data = useMemo(() => {
    // Group by week
    const weekMap = new Map<string, Set<string>>();
    
    last30dWorkouts.forEach(workout => {
      const date = new Date(workout.date);
      const weekNum = getWeek(date);
      const weekKey = `W${weekNum}`;
      
      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, new Set());
      }
      weekMap.get(weekKey)!.add(workout.date);
    });
    
    // Convert to array and calculate moving average
    const weeks = Array.from(weekMap.entries())
      .map(([week, dates]) => ({
        week,
        sessions: dates.size,
      }))
      .sort((a, b) => {
        const aNum = parseInt(a.week.substring(1));
        const bNum = parseInt(b.week.substring(1));
        return aNum - bNum;
      });
    
    // Calculate 4-week moving average
    return weeks.map((w, i) => {
      const start = Math.max(0, i - 3);
      const slice = weeks.slice(start, i + 1);
      const avg = slice.reduce((sum, item) => sum + item.sessions, 0) / slice.length;
      
      return {
        ...w,
        movingAvg: avg,
      };
    });
  }, [last30dWorkouts]);
  
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Workout Frequency</CardTitle>
        <p className="text-sm text-muted-foreground">Sessions per week with 4-week moving average</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Bar dataKey="sessions" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            <Line 
              type="monotone" 
              dataKey="movingAvg" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              dot={false}
              name="4W MA"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WorkoutFrequencyChart;

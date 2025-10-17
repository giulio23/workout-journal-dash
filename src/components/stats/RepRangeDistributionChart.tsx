import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useWorkoutStats } from "@/hooks/useWorkoutStats";
import { useMemo } from "react";
import { format, getWeek } from "date-fns";

const getRepRange = (reps: number): string => {
  if (reps <= 0) return "";
  if (reps <= 5) return "≤5";
  if (reps <= 8) return "6–8";
  if (reps <= 12) return "9–12";
  if (reps <= 15) return "13–15";
  return "16+";
};

const RepRangeDistributionChart = () => {
  const { last30dWorkouts } = useWorkoutStats();
  
  const data = useMemo(() => {
    // Group by week
    const weekMap = new Map<string, Map<string, number>>();
    
    last30dWorkouts.forEach(workout => {
      if (workout.repsActual > 0) {
        const date = new Date(workout.date);
        const weekNum = getWeek(date);
        const weekKey = `W${weekNum}`;
        const repRange = getRepRange(workout.repsActual);
        
        if (!weekMap.has(weekKey)) {
          weekMap.set(weekKey, new Map());
        }
        
        const rangeMap = weekMap.get(weekKey)!;
        rangeMap.set(repRange, (rangeMap.get(repRange) || 0) + 1);
      }
    });
    
    // Convert to array format for stacked chart
    const repRanges = ["≤5", "6–8", "9–12", "13–15", "16+"];
    
    return Array.from(weekMap.entries())
      .map(([week, rangeMap]) => {
        const entry: any = { week };
        
        repRanges.forEach(range => {
          entry[range] = rangeMap.get(range) || 0;
        });
        
        return entry;
      })
      .sort((a, b) => {
        const aNum = parseInt(a.week.substring(1));
        const bNum = parseInt(b.week.substring(1));
        return aNum - bNum;
      });
  }, [last30dWorkouts]);
  
  const colors = {
    "≤5": "hsl(var(--destructive))",
    "6–8": "hsl(var(--warning))",
    "9–12": "hsl(var(--success))",
    "13–15": "hsl(var(--primary))",
    "16+": "hsl(var(--accent))",
  };
  
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Rep Range Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">Set count by rep range per week</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
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
            <Legend />
            <Bar dataKey="≤5" stackId="a" fill={colors["≤5"]} />
            <Bar dataKey="6–8" stackId="a" fill={colors["6–8"]} />
            <Bar dataKey="9–12" stackId="a" fill={colors["9–12"]} />
            <Bar dataKey="13–15" stackId="a" fill={colors["13–15"]} />
            <Bar dataKey="16+" stackId="a" fill={colors["16+"]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RepRangeDistributionChart;

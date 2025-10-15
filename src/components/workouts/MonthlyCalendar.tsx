import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Workout {
  id: number;
  date: string;
}

interface MonthlyCalendarProps {
  workouts: Workout[];
}

const MonthlyCalendar = ({ workouts }: MonthlyCalendarProps) => {
  const workoutDates = new Set(workouts.map((w) => w.date));
  
  // Generate calendar for current month (October 2025)
  const daysInMonth = 31;
  const firstDay = 3; // Oct 1, 2025 is a Wednesday (0=Sun, 3=Wed)
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const calendar = [];
  let week = Array(7).fill(null);
  
  // Fill first week
  for (let i = firstDay; i < 7; i++) {
    week[i] = 1 + (i - firstDay);
  }
  calendar.push([...week]);
  
  // Fill remaining weeks
  let currentDay = 8 - firstDay;
  while (currentDay <= daysInMonth) {
    week = Array(7).fill(null);
    for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
      week[i] = currentDay++;
    }
    calendar.push([...week]);
  }

  return (
    <Card className="bg-gradient-card border-border mb-8">
      <CardHeader>
        <CardTitle>October 2025</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div key={day} className="text-center font-semibold text-sm text-muted-foreground pb-2">
              {day}
            </div>
          ))}
          {calendar.map((week, weekIdx) =>
            week.map((day, dayIdx) => {
              const dateStr = day ? `2025-10-${String(day).padStart(2, '0')}` : null;
              const hasWorkout = dateStr && workoutDates.has(dateStr);
              
              return (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className={`aspect-square flex items-center justify-center rounded-lg border text-sm font-medium transition-all ${
                    day
                      ? hasWorkout
                        ? "bg-primary text-primary-foreground border-primary shadow-glow cursor-pointer hover:scale-105"
                        : "bg-muted border-border hover:border-primary/50"
                      : "border-transparent"
                  }`}
                >
                  {day}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyCalendar;

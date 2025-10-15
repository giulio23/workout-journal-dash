import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const CurrentWeek = () => {
  const days = [
    { day: "Mon", date: "11", completed: true },
    { day: "Tue", date: "12", completed: true },
    { day: "Wed", date: "13", completed: false },
    { day: "Thu", date: "14", completed: true },
    { day: "Fri", date: "15", completed: false },
    { day: "Sat", date: "16", completed: false },
    { day: "Sun", date: "17", completed: false },
  ];

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Current Week</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {days.map((dayInfo) => (
            <div
              key={dayInfo.day}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                dayInfo.completed
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-muted border-border text-muted-foreground"
              }`}
            >
              <span className="text-xs font-medium mb-1">{dayInfo.day}</span>
              <span className="text-lg font-bold mb-1">{dayInfo.date}</span>
              {dayInfo.completed && <CheckCircle className="h-4 w-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeek;

import { Card } from "@/components/ui/card";
import { CheckCircle, List, Clock, Weight } from "lucide-react";

const GymStats = () => {
  // Mock data - will be replaced with real data later
  const stats = [
    {
      label: "Completed Workouts",
      value: 24,
      icon: CheckCircle,
      color: "text-success",
    },
    {
      label: "Total Exercises",
      value: 156,
      icon: List,
      color: "text-primary",
    },
    {
      label: "Avg Time/Workout",
      value: "52",
      unit: "min",
      icon: Clock,
      color: "text-accent",
    },
    {
      label: "Total Weight Lifted",
      value: "4,567",
      unit: "kg",
      icon: Weight,
      color: "text-warning",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-secondary ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{stat.value}</span>
                {stat.unit && (
                  <span className="text-sm text-muted-foreground">{stat.unit}</span>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GymStats;

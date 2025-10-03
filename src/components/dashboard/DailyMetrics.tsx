import { TrendingUp, TrendingDown } from "lucide-react";
import MetricCard from "./MetricCard";

const DailyMetrics = () => {
  // Mock data - will be replaced with real data later
  const metrics = [
    {
      label: "Steps",
      value: 8547,
      previousValue: 7234,
      unit: "",
      icon: "👟",
    },
    {
      label: "Active Time",
      value: 67,
      previousValue: 54,
      unit: "min",
      icon: "⏱️",
    },
    {
      label: "Active Calories",
      value: 423,
      previousValue: 389,
      unit: "kcal",
      icon: "🔥",
    },
    {
      label: "Distance",
      value: 6.2,
      previousValue: 5.8,
      unit: "km",
      icon: "📍",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default DailyMetrics;

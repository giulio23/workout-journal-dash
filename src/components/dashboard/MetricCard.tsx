import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: number;
  previousValue: number;
  unit: string;
  icon: string;
}

const MetricCard = ({ label, value, previousValue, unit, icon }: MetricCardProps) => {
  const change = value - previousValue;
  const percentChange = ((change / previousValue) * 100).toFixed(1);
  const isPositive = change >= 0;

  return (
    <Card className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{Math.abs(Number(percentChange))}%</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {value.toLocaleString()}
          </span>
          {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
        </div>
        <p className="text-xs text-muted-foreground">
          Yesterday: {previousValue.toLocaleString()} {unit}
        </p>
      </div>
    </Card>
  );
};

export default MetricCard;

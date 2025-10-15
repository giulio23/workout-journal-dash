import { Card } from "@/components/ui/card";
import { Calendar, Clock, Weight, Timer } from "lucide-react";
import { Link } from "react-router-dom";

interface WorkoutCardProps {
  workout: {
    id: number;
    name: string;
    date: string;
    startTime: string;
    duration: number;
    volume: number;
  };
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link to={`/workouts/${workout.id}`}>
      <Card className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-glow">
        <h3 className="text-xl font-semibold mb-4">{workout.name}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-medium">{workout.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Start</p>
              <p className="font-medium">{workout.startTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-success" />
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-medium">{workout.duration}min</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Weight className="h-4 w-4 text-warning" />
            <div>
              <p className="text-xs text-muted-foreground">Volume</p>
              <p className="font-medium">{workout.volume}kg</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default WorkoutCard;

import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Weight, Timer } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const WorkoutDetail = () => {
  const { id } = useParams();

  // Mock data - would come from database
  const workout = {
    id,
    name: "Upper Body Strength",
    date: "2025-10-14",
    startTime: "09:30",
    duration: 52,
    volume: 2450,
    exercises: [
      {
        id: 1,
        name: "Bench Press",
        sets: [
          { setNumber: 1, targetWeight: 80, targetReps: 8, actualWeight: 80, actualReps: 8, rm: 100 },
          { setNumber: 2, targetWeight: 85, targetReps: 6, actualWeight: 85, actualReps: 6, rm: 101.5 },
          { setNumber: 3, targetWeight: 90, targetReps: 4, actualWeight: 90, actualReps: 5, rm: 103.5 },
        ],
      },
      {
        id: 2,
        name: "Overhead Press",
        sets: [
          { setNumber: 1, targetWeight: 50, targetReps: 10, actualWeight: 50, actualReps: 10, rm: 66.5 },
          { setNumber: 2, targetWeight: 55, targetReps: 8, actualWeight: 55, actualReps: 8, rm: 68.75 },
          { setNumber: 3, targetWeight: 60, targetReps: 6, actualWeight: 60, actualReps: 7, rm: 72 },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-5xl">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/workouts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {workout.name}
          </h1>
        </div>

        {/* Workout Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="font-semibold">{workout.date}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <Timer className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Start Time</p>
                <p className="font-semibold">{workout.startTime}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-success" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-semibold">{workout.duration}min</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-border">
            <div className="flex items-center gap-3">
              <Weight className="h-5 w-5 text-warning" />
              <div>
                <p className="text-xs text-muted-foreground">Volume</p>
                <p className="font-semibold">{workout.volume}kg</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Exercises */}
        <div className="space-y-6">
          {workout.exercises.map((exercise) => (
            <Card key={exercise.id} className="p-6 bg-gradient-card border-border">
              <h3 className="text-xl font-semibold mb-4">{exercise.name}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Set</TableHead>
                    <TableHead>Target Weight</TableHead>
                    <TableHead>Target Reps</TableHead>
                    <TableHead>Actual Weight</TableHead>
                    <TableHead>Actual Reps</TableHead>
                    <TableHead>1RM</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exercise.sets.map((set) => (
                    <TableRow key={set.setNumber}>
                      <TableCell className="font-medium">{set.setNumber}</TableCell>
                      <TableCell>{set.targetWeight}kg</TableCell>
                      <TableCell>{set.targetReps}</TableCell>
                      <TableCell className="font-semibold text-primary">{set.actualWeight}kg</TableCell>
                      <TableCell className="font-semibold text-primary">{set.actualReps}</TableCell>
                      <TableCell className="font-semibold text-success">{set.rm}kg</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;

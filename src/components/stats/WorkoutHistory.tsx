import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const WorkoutHistory = () => {
  const workouts = [
    {
      id: 1,
      name: "Upper Body Strength",
      date: "2025-10-14",
      startTime: "09:30",
      duration: 52,
      volume: 2450,
    },
    {
      id: 2,
      name: "Leg Day",
      date: "2025-10-12",
      startTime: "18:15",
      duration: 65,
      volume: 3200,
    },
    {
      id: 3,
      name: "Pull Workout",
      date: "2025-10-10",
      startTime: "07:00",
      duration: 48,
      volume: 2100,
    },
    {
      id: 4,
      name: "Push Workout",
      date: "2025-10-08",
      startTime: "17:30",
      duration: 55,
      volume: 2800,
    },
  ];

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Workout History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Workout</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workouts.map((workout) => (
              <TableRow key={workout.id}>
                <TableCell className="font-medium">{workout.date}</TableCell>
                <TableCell>{workout.startTime}</TableCell>
                <TableCell>{workout.name}</TableCell>
                <TableCell>{workout.duration}min</TableCell>
                <TableCell>{workout.volume}kg</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WorkoutHistory;

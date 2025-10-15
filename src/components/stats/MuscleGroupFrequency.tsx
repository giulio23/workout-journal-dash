import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const MuscleGroupFrequency = () => {
  const muscleGroups = [
    { name: "Chest", workouts: 8, percentage: 80 },
    { name: "Back", workouts: 9, percentage: 90 },
    { name: "Legs", workouts: 7, percentage: 70 },
    { name: "Shoulders", workouts: 6, percentage: 60 },
    { name: "Arms", workouts: 10, percentage: 100 },
    { name: "Core", workouts: 5, percentage: 50 },
  ];

  return (
    <Card className="bg-gradient-card border-border mb-6">
      <CardHeader>
        <CardTitle>Muscle Group Training Frequency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {muscleGroups.map((group) => (
            <div key={group.name}>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{group.name}</span>
                <span className="text-muted-foreground">{group.workouts} workouts</span>
              </div>
              <Progress value={group.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MuscleGroupFrequency;

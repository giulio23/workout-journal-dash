import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ExerciseForm from "@/components/workout/ExerciseForm";
import { toast } from "sonner";

interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

interface Set {
  id: string;
  targetWeight: number | null;
  targetReps: number | null;
  actualWeight: number | null;
  actualReps: number | null;
}

const NewWorkout = () => {
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const addExercise = () => {
    const newExercise: Exercise = {
      id: crypto.randomUUID(),
      name: "",
      sets: [],
    };
    setExercises([...exercises, newExercise]);
  };

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter(ex => ex.id !== exerciseId));
  };

  const updateExercise = (exerciseId: string, updatedExercise: Exercise) => {
    setExercises(exercises.map(ex => 
      ex.id === exerciseId ? updatedExercise : ex
    ));
  };

  const saveWorkout = () => {
    if (!workoutName.trim()) {
      toast.error("Please enter a workout name");
      return;
    }
    if (exercises.length === 0) {
      toast.error("Please add at least one exercise");
      return;
    }

    // TODO: Save to database
    toast.success("Workout created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Button>
            <Button 
              onClick={saveWorkout}
              className="bg-gradient-accent hover:opacity-90 transition-opacity"
            >
              Save Workout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-6 bg-gradient-card border-border mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Workout Name
          </label>
          <Input
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="e.g., Upper Body Day"
            className="text-lg bg-secondary border-border"
          />
        </Card>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Exercises</h2>
            <Button 
              onClick={addExercise}
              variant="outline"
              className="gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Exercise
            </Button>
          </div>

          {exercises.length === 0 ? (
            <Card className="p-12 bg-gradient-card border-border border-dashed">
              <div className="text-center text-muted-foreground">
                <p className="text-lg mb-2">No exercises yet</p>
                <p className="text-sm">Click "Add Exercise" to get started</p>
              </div>
            </Card>
          ) : (
            exercises.map((exercise, index) => (
              <ExerciseForm
                key={exercise.id}
                exercise={exercise}
                exerciseNumber={index + 1}
                onUpdate={(updated) => updateExercise(exercise.id, updated)}
                onRemove={() => removeExercise(exercise.id)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default NewWorkout;

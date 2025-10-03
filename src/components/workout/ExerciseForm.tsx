import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import SetRow from "./SetRow";

interface Set {
  id: string;
  targetWeight: number | null;
  targetReps: number | null;
  actualWeight: number | null;
  actualReps: number | null;
}

interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

interface ExerciseFormProps {
  exercise: Exercise;
  exerciseNumber: number;
  onUpdate: (exercise: Exercise) => void;
  onRemove: () => void;
}

const ExerciseForm = ({ exercise, exerciseNumber, onUpdate, onRemove }: ExerciseFormProps) => {
  const addSet = () => {
    const newSet: Set = {
      id: crypto.randomUUID(),
      targetWeight: null,
      targetReps: null,
      actualWeight: null,
      actualReps: null,
    };
    onUpdate({ ...exercise, sets: [...exercise.sets, newSet] });
  };

  const removeSet = (setId: string) => {
    onUpdate({
      ...exercise,
      sets: exercise.sets.filter(s => s.id !== setId),
    });
  };

  const updateSet = (setId: string, updatedSet: Set) => {
    onUpdate({
      ...exercise,
      sets: exercise.sets.map(s => s.id === setId ? updatedSet : s),
    });
  };

  return (
    <Card className="p-6 bg-gradient-card border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              {exerciseNumber}
            </span>
            <Input
              value={exercise.name}
              onChange={(e) => onUpdate({ ...exercise, name: e.target.value })}
              placeholder="Exercise name (e.g., Bench Press)"
              className="text-lg font-medium bg-secondary border-border"
            />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Sets */}
      <div className="space-y-3">
        {exercise.sets.length > 0 && (
          <div className="grid grid-cols-5 gap-3 px-3 text-xs text-muted-foreground font-medium">
            <div>SET</div>
            <div>TARGET KG</div>
            <div>TARGET REPS</div>
            <div>ACTUAL KG</div>
            <div>ACTUAL REPS</div>
          </div>
        )}

        {exercise.sets.map((set, index) => (
          <SetRow
            key={set.id}
            set={set}
            setNumber={index + 1}
            onUpdate={(updated) => updateSet(set.id, updated)}
            onRemove={() => removeSet(set.id)}
          />
        ))}

        <Button
          variant="outline"
          onClick={addSet}
          className="w-full gap-2 border-dashed"
        >
          <Plus className="w-4 h-4" />
          Add Set
        </Button>
      </div>
    </Card>
  );
};

export default ExerciseForm;

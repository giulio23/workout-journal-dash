import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Set {
  id: string;
  targetWeight: number | null;
  targetReps: number | null;
  actualWeight: number | null;
  actualReps: number | null;
}

interface SetRowProps {
  set: Set;
  setNumber: number;
  onUpdate: (set: Set) => void;
  onRemove: () => void;
}

const SetRow = ({ set, setNumber, onUpdate, onRemove }: SetRowProps) => {
  const handleNumberChange = (field: keyof Set, value: string) => {
    const numValue = value === "" ? null : parseFloat(value);
    onUpdate({ ...set, [field]: numValue });
  };

  return (
    <div className="grid grid-cols-5 gap-3 items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
      <div className="flex items-center justify-center">
        <span className="font-medium text-sm">{setNumber}</span>
      </div>
      
      <Input
        type="number"
        step="0.5"
        value={set.targetWeight ?? ""}
        onChange={(e) => handleNumberChange("targetWeight", e.target.value)}
        placeholder="0"
        className="bg-background border-border text-center"
      />
      
      <Input
        type="number"
        value={set.targetReps ?? ""}
        onChange={(e) => handleNumberChange("targetReps", e.target.value)}
        placeholder="0"
        className="bg-background border-border text-center"
      />
      
      <Input
        type="number"
        step="0.5"
        value={set.actualWeight ?? ""}
        onChange={(e) => handleNumberChange("actualWeight", e.target.value)}
        placeholder="0"
        className="bg-background border-border text-center"
      />
      
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={set.actualReps ?? ""}
          onChange={(e) => handleNumberChange("actualReps", e.target.value)}
          placeholder="0"
          className="bg-background border-border text-center"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-muted-foreground hover:text-destructive h-9 w-9"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SetRow;

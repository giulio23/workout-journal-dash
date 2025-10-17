import { useMemo } from "react";
import { subDays } from "date-fns";

// Mock workout data - replace with real data from your backend
const generateMockWorkouts = () => {
  const workouts = [];
  const exercises = ["Bench Press", "Squat", "Deadlift", "Overhead Press", "Barbell Row"];
  
  for (let i = 0; i < 30; i++) {
    const date = subDays(new Date(), i);
    if (Math.random() > 0.3) { // ~70% chance of workout on any day
      const numExercises = Math.floor(Math.random() * 3) + 2;
      
      for (let e = 0; e < numExercises; e++) {
        const exercise = exercises[Math.floor(Math.random() * exercises.length)];
        const numSets = Math.floor(Math.random() * 3) + 3;
        
        for (let s = 0; s < numSets; s++) {
          workouts.push({
            date: date.toISOString().split('T')[0],
            exercise,
            set: s + 1,
            weightActual: Math.floor(Math.random() * 50) + 40,
            repsActual: Math.floor(Math.random() * 8) + 5,
            weightTarget: Math.floor(Math.random() * 50) + 40,
            repsTarget: 10,
          });
        }
      }
    }
  }
  
  return workouts;
};

export const useWorkoutStats = () => {
  const workouts = useMemo(() => generateMockWorkouts(), []);
  
  const stats = useMemo(() => {
    const thirtyDaysAgo = subDays(new Date(), 30);
    const last30dWorkouts = workouts.filter(w => new Date(w.date) >= thirtyDaysAgo);
    
    // Sessions (Last 30d) - distinct dates
    const sessionsLast30d = new Set(last30dWorkouts.map(w => w.date)).size;
    
    // Total Volume (kg, Last 30d) - sum of weight × actual reps
    const totalVolumeLast30d = last30dWorkouts.reduce((sum, w) => {
      if (w.weightActual > 0 && w.repsActual > 0) {
        return sum + (w.weightActual * w.repsActual);
      }
      return sum;
    }, 0);
    
    // Best Epley 1RM (last 30d) - max of weight × (1 + reps/30)
    const best1RMLast30d = last30dWorkouts.reduce((max, w) => {
      if (w.weightActual > 0 && w.repsActual > 0) {
        const epley = w.weightActual * (1 + w.repsActual / 30);
        return Math.max(max, epley);
      }
      return max;
    }, 0);
    
    // Total Reps (Last 30d)
    const totalRepsLast30d = last30dWorkouts.reduce((sum, w) => {
      if (w.weightActual > 0 && w.repsActual > 0) {
        return sum + w.repsActual;
      }
      return sum;
    }, 0);
    
    // Avg Load per Rep (Last 30d)
    const avgLoadPerRep = totalRepsLast30d > 0 ? totalVolumeLast30d / totalRepsLast30d : 0;
    
    // Set Completion % - actual sets / planned sets
    const actualSets = workouts.filter(w => w.weightActual > 0 && w.repsActual > 0).length;
    const plannedSets = workouts.filter(w => w.weightTarget > 0 && w.repsTarget > 0).length;
    const setCompletionPercent = plannedSets > 0 ? (actualSets / plannedSets) * 100 : 0;
    
    return {
      sessionsLast30d,
      totalVolumeLast30d,
      best1RMLast30d,
      avgLoadPerRep,
      setCompletionPercent,
      workouts,
      last30dWorkouts,
    };
  }, [workouts]);
  
  return stats;
};

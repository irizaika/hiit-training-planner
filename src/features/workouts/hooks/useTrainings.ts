import type { TrainingWorkout } from "../../../models/workout";
import { useWorkouts } from "../../../context/useWorkout";
import { useWorkoutCollection } from "./useWorkoutCollection";

export function useTrainingWorkouts() {
  const { workouts, setTrainingWorkouts } = useWorkouts();

  const collection = useWorkoutCollection<TrainingWorkout>({
    workouts: workouts.trainings,
    setWorkouts: setTrainingWorkouts,
  });

  return {
    trainingWorkouts: collection.workouts,
    ...collection,
  };
}
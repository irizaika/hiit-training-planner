import type { HiitWorkout } from "../../../models/workout";
import { useWorkouts } from "../../../context/useWorkout";
import { useWorkoutCollection } from "./useWorkoutCollection";

export function useHiitWorkouts() {
  const { workouts, setHiitWorkouts } = useWorkouts();

  const collection = useWorkoutCollection<HiitWorkout>({
    workouts: workouts.hiit,
    setWorkouts: setHiitWorkouts,
  });

  return {
    hiitWorkouts: collection.workouts,
    ...collection,
  };
}

import { createContext } from "react";
import type {
  HiitWorkout,
  TrainingWorkout,
  Workouts,
} from "../models/workout";

export interface WorkoutContextValue {
  workouts: Workouts;

  setHiitWorkouts: (workouts: HiitWorkout[]) => void;
  setTrainingWorkouts: (workouts: TrainingWorkout[]) => void;
}

export const WorkoutContext =
  createContext<WorkoutContextValue | undefined>(undefined);

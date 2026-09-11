import { createContext } from "react";
import type {
  HiitWorkout,
  RoundWorkout,
  SetWorkout,
  Workouts,
} from "../models/workout";

export interface WorkoutContextValue {
  workouts: Workouts;

  setHiitWorkouts: (workouts: HiitWorkout[]) => void;
  setRoundWorkouts: (workouts: RoundWorkout[]) => void;
  setSetWorkouts: (workouts: SetWorkout[]) => void;
}

export const WorkoutContext =
  createContext<WorkoutContextValue | undefined>(undefined);

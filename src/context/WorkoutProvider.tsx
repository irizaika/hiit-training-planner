import { useState, type ReactNode } from "react";

import { WorkoutContext } from "./WorkoutContext";

import type {
  HiitWorkout,
  RoundWorkout,
  SetWorkout,
  Workouts,
} from "../models/workout";

const initialWorkouts: Workouts = {
  hiit: [],
  rounds: [],
  sets: [],
};

interface WorkoutProviderProps {
  children: ReactNode;
}

export function WorkoutProvider({ children }: WorkoutProviderProps) {
  const [workouts, setWorkouts] = useState<Workouts>(initialWorkouts);

  const setHiitWorkouts = (hiit: HiitWorkout[]) => {
    setWorkouts((current) => ({
      ...current,
      hiit,
    }));
  };

  const setRoundWorkouts = (rounds: RoundWorkout[]) => {
    setWorkouts((current) => ({
      ...current,
      rounds,
    }));
  };

  const setSetWorkouts = (sets: SetWorkout[]) => {
    setWorkouts((current) => ({
      ...current,
      sets,
    }));
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        setHiitWorkouts,
        setRoundWorkouts,
        setSetWorkouts,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

import { useEffect, useState, type ReactNode } from "react";

import { WorkoutContext } from "./WorkoutContext";

import type {
  HiitWorkout,
  TrainingWorkout,
  Workouts,
} from "../models/workout";

const STORAGE_KEY = "hiit-training-workouts";

const initialWorkouts: Workouts = {
  hiit: [],
  trainings: []
};

interface WorkoutProviderProps {
  children: ReactNode;
}

function loadWorkouts(): Workouts {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return initialWorkouts;
    }

    return JSON.parse(saved) as Workouts;
  } catch {
    console.error("Could not load workouts from localStorage");
    return initialWorkouts;
  }
}

export function WorkoutProvider({ children }: WorkoutProviderProps) {
  const [workouts, setWorkouts] = useState<Workouts>(loadWorkouts);

  useEffect(() => {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
  }, [workouts]);

  const setHiitWorkouts = (hiit: HiitWorkout[]) => {
    setWorkouts((current) => ({
      ...current,
      hiit,
    }));
  };

  const setTrainingWorkouts = (trainings: TrainingWorkout[]) => {
    setWorkouts((current) => ({
      ...current,
      trainings,
    }));
  };



  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        setHiitWorkouts,
        setTrainingWorkouts
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
import type { Exercise } from "./exercise";

export type WorkoutType = "hiit" | "rounds" | "sets";

export interface BaseWorkout {
  id: number;
  name: string;
  type: WorkoutType;
  createdAt: string;
  updatedAt: string;
}

export interface HiitWorkout extends BaseWorkout {
  type: "hiit";
  exercises: Exercise[];
  workSeconds: number;
  restSeconds: number;
  rounds: number;
}

export interface RoundWorkout extends BaseWorkout {
  type: "rounds";

  rounds: Round[];
  repeatCount: number;
}

export interface Round {
  id: string;
  exercises: Exercise[];
}

export interface SetWorkout extends BaseWorkout {
  type: "sets";

  exercises: Exercise[];
  sets: number;
  restBetweenSetsSeconds?: number;
}

export type Workouts = {
  hiit: HiitWorkout[];
  rounds: RoundWorkout[];
  sets: SetWorkout[];
};

export type Workout = HiitWorkout | RoundWorkout | SetWorkout;

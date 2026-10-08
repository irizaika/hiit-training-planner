import type { Exercise } from "./exercise";

export type WorkoutType = "hiit" | "training";

export interface BaseWorkout {
  id: number;
  name: string;
  type: WorkoutType;
  createdAt: string;
  updatedAt: string;
}

/* ---------------- HIIT ---------------- */

export interface HiitWorkout extends BaseWorkout {
  type: "hiit";
  exercises: Exercise[];

  workSeconds: number;

  restSeconds: number;
  restEnabled: boolean;

  roundRestSeconds: number;
  roundRestEnabled: boolean;

  rounds: number;
}

/* ---------------- TRAINING ---------------- */

export type TrainingMode =
  | "sets"
  | "circular"
  | "supersets";

export type TrainingWorkout =
  | SetsWorkout
  | CircularWorkout
  | SupersetWorkout;

/* ---------------- SETS ---------------- */

export interface SetsWorkout extends BaseWorkout {
  type: "training";
  mode: "sets";
  exercises: SetExercise[];
  restBetweenExercises?: RestConfig;
}

export type SetExercise = WorkoutExercise &{
  id: number;
  sets: number;
  restBetweenSets?: RestConfig;
};

/* ---------------- CIRCULAR ---------------- */

export interface CircularWorkout extends BaseWorkout {
  type: "training";
  mode: "circular";
  blocks: [WorkoutBlock];
}

/* ---------------- SUPERSETS ---------------- */

export interface SupersetWorkout extends BaseWorkout {
  type: "training";
  mode: "supersets";
  blocks: WorkoutBlock[];
}

/* ---------------- SHARED ---------------- */

export type WorkoutBlock = {
  id: number;
  name?: string;
  exercises: WorkoutExercise[];
  repeatCount: number;
  restBetweenExercises?: RestConfig;
  restBetweenRepeats?: RestConfig;
};

export type WorkoutExercise = {
  id: number;
  name: string;
  target?: ExerciseTarget;
  timer?: TimerConfig;
};

export type ExerciseTarget =
  | { type: "reps"; value: number }
  | { type: "duration"; seconds: number }
  | { type: "distance"; value: number; unit: "m" | "km" }
  | { type: "none" };

export type TimerConfig =
  | { enabled: false }
  | { enabled: true; seconds: number };

export type RestConfig = {
  enabled: boolean;
  seconds: number;
};

/* ---------------- ALL WORKOUTS ---------------- */

export type Workout =
  | HiitWorkout
  | TrainingWorkout;

export type Workouts = {
  hiit: HiitWorkout[];
  trainings: TrainingWorkout[];
};
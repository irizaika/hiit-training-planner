import type { Exercise } from "./exercise";

export type WorkoutType = "hiit" | "training";

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

  // Pause between exercises
  restSeconds: number;
  restEnabled: boolean;

  // Pause between rounds
  roundRestSeconds: number;
  roundRestEnabled: boolean;

  rounds: number;
}

export type TrainingMode =
  | "sets" // Straight sets  Set-and-Rep
  | "circular" // Giant set / circuit
  | "supersets"; // Paired exercises

export interface TrainingWorkout extends BaseWorkout {
  type: "training";
  mode:  TrainingMode;
  blocks: WorkoutBlock[];
}

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
  | {
      type: "reps";
      value: number;
    }
  | {
      type: "duration";
      seconds: number;
    }
  | {
      type: "distance";
      value: number;
      unit: "m" | "km";
    }
  | {
      type: "none";
    };

export type TimerConfig =
  | {
      enabled: false;
    }
  | {
      enabled: true;
      seconds: number;
    };

export type Workouts = {
  hiit: HiitWorkout[];
  trainings: TrainingWorkout[];
};

export type RestConfig = {
  enabled: boolean;
  seconds: number;
};

export type Workout = HiitWorkout | TrainingWorkout;

// export type TrainingWorkout =
//   | {
//       type: "training";
//       mode: "circular";
//       blocks: [WorkoutBlock];
//       id: number;
//       name: string;
//       createdAt: string;
//       updatedAt: string;
//     }
//   | {
//       type: "training";
//       mode: "supersets";
//       blocks: WorkoutBlock[];
//       id: number;
//       name: string;
//       createdAt: string;
//       updatedAt: string;
//     }
//   | {
//       type: "training";
//       mode: "sets";
//       blocks: WorkoutBlock[];
//       id: number;
//       name: string;
//       createdAt: string;
//       updatedAt: string;
//     };

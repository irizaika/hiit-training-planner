export type ExerciseDuration =
  | {
      type: "reps";
      value: number;
    }
  | {
      type: "time";
      seconds: number;
    };

export interface Exercise {
  id: number;
  name: string;

}
export interface TimedExercise extends Exercise {
  duration: ExerciseDuration;
  restAfterSeconds?: number;
}



import type { HiitWorkout, TrainingWorkout, Workouts} 
from "../models/workout";

export async function importWorkouts(file: File): Promise<Workouts> {
  const text = await file.text();
  const data: unknown = JSON.parse(text);

  if (!isWorkouts(data)) {
    throw new Error("Invalid workout file.");
  }

  return data;
}

function isWorkouts(data: unknown): data is Workouts {
  if (!data || typeof data !== "object") {
    return false;
  }

  const workouts = data as Record<string, unknown>;

  return (
    Array.isArray(workouts.hiit) &&
    Array.isArray(workouts.trainings) &&
    workouts.hiit.every(isHiitWorkout) &&
    workouts.trainings.every(isTrainingWorkout)
  );
}

function isBaseWorkout(data: unknown): data is {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
} {
  if (!data || typeof data !== "object") {
    return false;
  }

  const workout = data as Record<string, unknown>;

  return (
    typeof workout.id === "number" &&
    typeof workout.name === "string" &&
    typeof workout.type === "string" &&
    typeof workout.createdAt === "string" &&
    typeof workout.updatedAt === "string"
  );
}

function isHiitWorkout(data: unknown): data is HiitWorkout {
  if (!isBaseWorkout(data)) {
    return false;
  }

  const workout = data as Record<string, unknown>;

  return (

    workout.type === "hiit" &&
    typeof workout.workSeconds === "number" &&
    typeof workout.restEnabled === "boolean" &&
    typeof workout.restSeconds === "number" &&
    typeof workout.roundRestEnabled === "boolean" &&
    typeof workout.roundRestSeconds === "number" &&
    typeof workout.rounds === "number" &&
    Array.isArray(workout.exercises)
  );
}

function isTrainingWorkout(data: unknown): data is TrainingWorkout {
  if (!isBaseWorkout(data)) {
    return false;
  }

  const workout = data as Record<string, unknown>;

  return (
    workout.type === "training" &&
    Array.isArray(workout.blocks) &&
    workout.blocks.every(isWorkoutBlock)
  );
}

function isWorkoutBlock(data: unknown): boolean {
  if (!data || typeof data !== "object") {
    return false;
  }

  const block = data as Record<string, unknown>;

  return (
    typeof block.id === "number" &&
    Array.isArray(block.exercises) &&
    block.exercises.every(isWorkoutExercise) &&
    typeof block.repeatCount === "number" &&
    isRestConfig(block.restBetweenExercises) &&
    isRestConfig(block.restBetweenRepeats)
  );
}

function isWorkoutExercise(data: unknown): boolean {
  if (!data || typeof data !== "object") {
    return false;
  }

  const exercise = data as Record<string, unknown>;

  return (
    typeof exercise.id === "number" &&
    typeof exercise.name === "string" &&
    isExerciseTarget(exercise.target) &&
    isTimerConfig(exercise.timer)
  );
}

function isExerciseTarget(data: unknown): boolean {
  if (!data || typeof data !== "object") {
    return false;
  }

  const target = data as Record<string, unknown>;

  if (typeof target.type !== "string") {
    return false;
  }

  switch (target.type) {
    case "reps":
      return typeof target.value === "number";

    case "duration":
      return typeof target.seconds === "number";

    case "none":
      return true;

    default:
      return false;
  }
}

function isTimerConfig(data: unknown): boolean {
  if (!data || typeof data !== "object") {
    return false;
  }

  const timer = data as Record<string, unknown>;

  if (timer.enabled === false) {
    return true;
  }

  return (
    timer.enabled === true &&
    typeof timer.seconds === "number"
  );
}

function isRestConfig(data: unknown): boolean {
  if (!data || typeof data !== "object") {
    return false;
  }

  const rest = data as Record<string, unknown>;

  return (
    typeof rest.enabled === "boolean" &&
    typeof rest.seconds === "number"
  );
}

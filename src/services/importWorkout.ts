import type { HiitWorkout, RoundWorkout, SetWorkout, Workouts} 
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
    Array.isArray(workouts.rounds) &&
    Array.isArray(workouts.sets) &&
    workouts.hiit.every(isHiitWorkout) &&
    workouts.rounds.every(isRoundWorkout) &&
    workouts.sets.every(isSetWorkout)
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
    typeof workout.restSeconds === "number" &&
    typeof workout.rounds === "number"
  );
}

function isRoundWorkout(data: unknown): data is RoundWorkout {
  if (!isBaseWorkout(data)) {
    return false;
  }

  const workout = data as Record<string, unknown>;

  return (
    workout.type === "rounds" &&
    Array.isArray(workout.rounds) &&
    typeof workout.repeatCount === "number"
  );
}

function isSetWorkout(data: unknown): data is SetWorkout {
  if (!isBaseWorkout(data)) {
    return false;
  }

  const workout = data as Record<string, unknown>;

  return (
    workout.type === "sets" &&
    Array.isArray(workout.exercises) &&
    typeof workout.sets === "number" &&
    (workout.restBetweenSetsSeconds === undefined ||
      typeof workout.restBetweenSetsSeconds === "number")
  );
}

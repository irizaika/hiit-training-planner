import { useState } from "react";
import type {
  RestConfig,
  SetExercise,
  TrainingWorkout,
} from "../../../models/workout";

export interface SetsWorkoutForm {
  exercises: SetExercise[];

  addExercise: () => number;

  removeExercise: (
    exerciseId: number,
  ) => void;

  updateExercise: (
    exerciseId: number,
    update: Partial<SetExercise>,
  ) => void;

  restBetweenExercises: RestConfig;

  updateRestBetweenExercises: (
    rest: RestConfig,
  ) => void;

  getCleanedExercises: () => SetExercise[];
}

const DEFAULT_REST_BETWEEN_SETS: RestConfig = {
  enabled: false,
  seconds: 30,
};

const createSetExercise = (
  id: number,
): SetExercise => ({
  id,
  name: "",
  target: { type: "none" },
  timer: { enabled: false },
  sets: 1,
  restBetweenSets: {
    enabled: false,
    seconds: 60,
  },
});

export function useSetsWorkoutForm(
  workout?: TrainingWorkout,
): SetsWorkoutForm {
  const initialExercises =
    workout?.mode === "sets"
      ? workout.exercises
      : [createSetExercise(1)];

  const [exercises, setExercises] =
    useState<SetExercise[]>(initialExercises);

  const [
    restBetweenExercises,
    setRestBetweenExercises,
  ] = useState<RestConfig>(
    workout?.mode === "sets"
      ? workout.restBetweenExercises ??
          DEFAULT_REST_BETWEEN_SETS
      : DEFAULT_REST_BETWEEN_SETS,
  );

  const addExercise = (): number => {
    let newId = 1;

    setExercises((current) => {
      newId =
        Math.max(
          0,
          ...current.map(
            (exercise) => exercise.id,
          ),
        ) + 1;

      return [
        ...current,
        createSetExercise(newId),
      ];
    });

    return newId;
  };

  const removeExercise = (
    exerciseId: number,
  ) => {
    setExercises((current) => {
      if (current.length <= 1) {
        return current;
      }

      return current.filter(
        (exercise) =>
          exercise.id !== exerciseId,
      );
    });
  };

  const updateExercise = (
    exerciseId: number,
    update: Partial<SetExercise>,
  ) => {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === exerciseId
          ? { ...exercise, ...update }
          : exercise,
      ),
    );
  };

  const updateRestBetweenExercises = (
    rest: RestConfig,
  ) => {
    setRestBetweenExercises(rest);
  };

  const getCleanedExercises =
    (): SetExercise[] => {
      return exercises
        .map((exercise) => ({
          ...exercise,
          name: exercise.name.trim(),
        }))
        .filter(
          (exercise) => exercise.name,
        );
    };

  return {
    exercises,
    addExercise,
    removeExercise,
    updateExercise,
    restBetweenExercises,
    updateRestBetweenExercises,
    getCleanedExercises,
  };
}

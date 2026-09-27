import { useState } from "react";

import type { Workout } from "../../../models/workout";
import { getNextId } from "../../../utils/id";

interface UseWorkoutCollectionOptions<T extends Workout> {
  workouts: T[];
  setWorkouts: (workouts: T[]) => void;
}

export function useWorkoutCollection<T extends Workout>({
  workouts,
  setWorkouts,
}: UseWorkoutCollectionOptions<T>) {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(
    null,
  );

  const [isAddWorkoutOpen, setIsAddWorkoutOpen] = useState(false);
  const [isEditWorkoutOpen, setIsEditWorkoutOpen] = useState(false);

  const selectedWorkout = workouts.find(
    (workout) => workout.id === selectedWorkoutId,
  );

  const selectWorkout = (workoutId: number) => {
    setSelectedWorkoutId(workoutId);
  };

  const createWorkout = (workout: T) => {
    const workoutWithId: T = {
      ...workout,
      id: getNextId(workouts),
    };

    setWorkouts([...workouts, workoutWithId]);
    setSelectedWorkoutId(workoutWithId.id);
    setIsAddWorkoutOpen(false);
  };

  const editWorkout = (workout: T) => {
    const updatedWorkout: T = {
      ...workout,
      updatedAt: new Date().toISOString(),
    };

    setWorkouts(
      workouts.map((currentWorkout) =>
        currentWorkout.id === workout.id ? updatedWorkout : currentWorkout,
      ),
    );

    setSelectedWorkoutId(workout.id);
    setIsEditWorkoutOpen(false);
  };

  const deleteWorkout = (workoutId: number) => {
    const workout = workouts.find(
      (currentWorkout) => currentWorkout.id === workoutId,
    );

    if (!workout) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${workout.name}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    const remainingWorkouts = workouts.filter(
      (currentWorkout) => currentWorkout.id !== workoutId,
    );

    setWorkouts(remainingWorkouts);

    if (selectedWorkoutId === workoutId) {
      setSelectedWorkoutId(remainingWorkouts[0]?.id ?? null);
    }
  };

  const duplicateWorkout = (workoutId: number) => {
    const workout = workouts.find(
      (currentWorkout) => currentWorkout.id === workoutId,
    );

    if (!workout) {
      return;
    }

    const now = new Date().toISOString();

    const duplicatedWorkout: T = {
      ...structuredClone(workout),
      id: getNextId(workouts),
      name: `${workout.name} Copy`,
      createdAt: now,
      updatedAt: now,
    };

    setWorkouts([...workouts, duplicatedWorkout]);
    setSelectedWorkoutId(duplicatedWorkout.id);
  };

  const openCreateModal = () => {
    setIsAddWorkoutOpen(true);
  };

  const closeCreateModal = () => {
    setIsAddWorkoutOpen(false);
  };

  const openEditModal = (workoutId: number) => {
    setSelectedWorkoutId(workoutId);
    setIsEditWorkoutOpen(true);
  };

  const closeEditModal = () => {
    setIsEditWorkoutOpen(false);
  };

  return {
    workouts,
    selectedWorkout,
    selectedWorkoutId,

    isAddWorkoutOpen,
    isEditWorkoutOpen,

    selectWorkout,
    createWorkout,
    editWorkout,
    deleteWorkout,
    duplicateWorkout,

    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
  };
}
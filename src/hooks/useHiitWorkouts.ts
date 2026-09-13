import { useState } from "react";

import type { HiitWorkout } from "../models/workout";
import { exportWorkout } from "../services/exportWorkout";
import { importWorkout } from "../services/importWorkout";
import { getNextId } from "../utils/id";
import { useWorkouts } from "../context/useWorkout";

export function useHiitWorkouts() {
  const { workouts, setHiitWorkouts } = useWorkouts();

  const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(
    null,
  );

  const [isAddWorkoutOpen, setIsAddWorkoutOpen] = useState(false);
  const [isEditWorkoutOpen, setIsEditWorkoutOpen] = useState(false);

  const hiitWorkouts = workouts.hiit;

  const selectedWorkout = hiitWorkouts.find(
    (workout) => workout.id === selectedWorkoutId,
  );

  const selectWorkout = (workoutId: number) => {
    setSelectedWorkoutId(workoutId);
  };

  const createWorkout = (workout: HiitWorkout) => {
    const workoutWithId: HiitWorkout = {
      ...workout,
      id: getNextId(hiitWorkouts),
    };

    setHiitWorkouts([...hiitWorkouts, workoutWithId]);
    setSelectedWorkoutId(workoutWithId.id);
    setIsAddWorkoutOpen(false);
  };

  const editWorkout = (workout: HiitWorkout) => {
    const updatedWorkout: HiitWorkout = {
      ...workout,
      updatedAt: new Date().toISOString(),
    };

    setHiitWorkouts(
      hiitWorkouts.map((currentWorkout) =>
        currentWorkout.id === workout.id ? updatedWorkout : currentWorkout,
      ),
    );

    setSelectedWorkoutId(workout.id);
    setIsEditWorkoutOpen(false);
  };

  const deleteWorkout = (workoutId: number) => {
    const workout = hiitWorkouts.find(
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

    const remainingWorkouts = hiitWorkouts.filter(
      (currentWorkout) => currentWorkout.id !== workoutId,
    );

    setHiitWorkouts(remainingWorkouts);

    if (selectedWorkoutId === workoutId) {
      setSelectedWorkoutId(remainingWorkouts[0]?.id ?? null);
    }
  };

  const duplicateWorkout = (workoutId: number) => {
    const workout = hiitWorkouts.find(
      (currentWorkout) => currentWorkout.id === workoutId,
    );

    if (!workout) {
      return;
    }

    const now = new Date().toISOString();

    const duplicatedWorkout: HiitWorkout = {
      ...structuredClone(workout),
      id: getNextId(hiitWorkouts),
      name: `${workout.name} Copy`,
      createdAt: now,
      updatedAt: now,
    };

    setHiitWorkouts([...hiitWorkouts, duplicatedWorkout]);
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

  const importHiitWorkouts = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = ".json,application/json";

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) {
        return;
      }

      try {
        const importedWorkouts = await importWorkout(file, "hiit");

        if (importedWorkouts.some((workout) => workout.type !== "hiit")) {
          throw new Error("This is not a HIIT workout.");
        }

        setHiitWorkouts(importedWorkouts as HiitWorkout[]);
        setSelectedWorkoutId(importedWorkouts[0]?.id ?? null);
      } catch (error) {
        console.error(error);

        window.alert(
          "Could not import workout. Please select a valid workout JSON file.",
        );
      }
    };

    input.click();
  };

  const exportHiitWorkouts = () => {
    exportWorkout(hiitWorkouts, "hiit");
  };

  return {
    hiitWorkouts,
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

    importHiitWorkouts,
    exportHiitWorkouts,
  };
}
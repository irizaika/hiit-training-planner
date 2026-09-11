import { useState } from "react";
import "./HiitTimerPage.css";

import type { HiitWorkout } from "../../models/workout";

import { HiitTimer } from "./HiitTimer";
import { AddHiitWorkoutModal } from "../../components/Modal/AddHiitWorkoutModal";
import { WorkoutList } from "../../components/Layout/WorkoutList";
import { WorkoutLayout } from "../../components/Layout/WorkoutLayout";
import { WorkoutPanel } from "../../components/Layout/WorkoutPanel";
import { TimerPanel } from "../../components/Layout/TimerPanel";

import { exportWorkout } from "../../services/exportWorkout";
import { importWorkout } from "../../services/importWorkout";
import { useWorkouts } from "../../context/useWorkout";

export function HiitTimerPage() {
  const { workouts, setHiitWorkouts } = useWorkouts();

  const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(
    null,
  );

  const [isAddWorkoutOpen, setIsAddWorkoutOpen] = useState(false);

  const [isEditWorkoutOpen, setIsEditWorkoutOpen] = useState(false);

  const selectedWorkout = workouts.hiit.find(
    (workout) => workout.id === selectedWorkoutId,
  );

  const handleSelectWorkout = (workoutId: number) => {
    setSelectedWorkoutId(workoutId);
  };

  const handleCreateWorkout = (workout: HiitWorkout) => {
    setHiitWorkouts([...workouts.hiit, workout]);
    setSelectedWorkoutId(workout.id);
    setIsAddWorkoutOpen(false);
  };

  const handleEditWorkout = (workout: HiitWorkout) => {
    setHiitWorkouts(
      workouts.hiit.map((currentWorkout) =>
        currentWorkout.id === workout.id
          ? {
              ...workout,
              updatedAt: new Date().toISOString(),
            }
          : currentWorkout,
      ),
    );

    setSelectedWorkoutId(workout.id);
    setIsEditWorkoutOpen(false);
  };

  const handleDeleteWorkout = (workoutId: number) => {
    const workout = workouts.hiit.find(
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

    const remainingWorkouts = workouts.hiit.filter(
      (currentWorkout) => currentWorkout.id !== workoutId,
    );

    setHiitWorkouts(remainingWorkouts);

    if (selectedWorkoutId !== workoutId) {
      return;
    }

    setSelectedWorkoutId(remainingWorkouts[0]?.id ?? null);
  };

  const handleImportWorkout = () => {
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
      } catch (error) {
        console.error(error);

        window.alert(
          "Could not import workout. Please select a valid workout JSON file.",
        );
      }
    };

    input.click();
  };

  const handleExportWorkout = () => {
    exportWorkout(workouts.hiit, "hiit");
  };

  return (
    <>
      <WorkoutLayout>
        <WorkoutPanel
          name="HIIT"
          count={workouts.hiit.length}
          onCreate={() => setIsAddWorkoutOpen(true)}
          onImport={handleImportWorkout}
          onExport={handleExportWorkout}
        >
          <WorkoutList
            workouts={workouts.hiit}
            selectedWorkoutId={selectedWorkoutId}
            onSelectWorkout={handleSelectWorkout}
            onDelete={handleDeleteWorkout}
          />
        </WorkoutPanel>

        <TimerPanel selectedWorkout={selectedWorkout}>
          {selectedWorkout && (
            <HiitTimer
              key={selectedWorkout.id}
              selectedWorkout={selectedWorkout}
              onEdit={() => setIsEditWorkoutOpen(true)}
            />
          )}
        </TimerPanel>
      </WorkoutLayout>

      {isAddWorkoutOpen && (
        <AddHiitWorkoutModal
          onClose={() => setIsAddWorkoutOpen(false)}
          onCreate={handleCreateWorkout}
        />
      )}

      {isEditWorkoutOpen && selectedWorkout && (
        <AddHiitWorkoutModal
          workout={selectedWorkout}
          onClose={() => setIsEditWorkoutOpen(false)}
          onCreate={handleEditWorkout}
        />
      )}
    </>
  );
}

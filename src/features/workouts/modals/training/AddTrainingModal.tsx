import { useState } from "react";
import type {
  TrainingWorkout,
  TrainingMode,
  SetsWorkout,
} from "../../../../models/workout";

 import { useBlockWorkoutForm } from "../../../training/hooks/useBlockWorkoutForm";
 import { useSetsWorkoutForm } from "../../../training/hooks/useSetsWorkoutForm";

import { TrainingModeSelector } from "./TrainingModeSelector/TrainingModeSelector";
import { CircularWorkoutForm } from "./CircularWorkoutForm";
import { SetsWorkoutForm } from "./SetsWorkoutForm";
import { WorkoutModal } from "../../../../components/Modal/WorkoutModalForm";

import "./AddTrainingModal.css";

interface AddTrainingModalProps {
  workout?: TrainingWorkout;
  onClose: () => void;
  onCreate: (workout: TrainingWorkout) => void;
}

export function AddTrainingModal({
  workout,
  onClose,
  onCreate,
}: AddTrainingModalProps) {
  const [name, setName] = useState(workout?.name ?? "");

  const [mode, setMode] = useState<TrainingMode>(workout?.mode ?? "circular");

  // const form = useTrainingWorkoutForm(workout);
   const blockWorkoutForm = useBlockWorkoutForm(workout);
   const setsWorkoutForm = useSetsWorkoutForm(workout);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    const now = new Date().toISOString();

    const baseWorkout = {
      id: workout?.id ?? 0,
      name: trimmedName,
      type: "training" as const,
      createdAt: workout?.createdAt ?? now,
      updatedAt: now,
    };

    let trainingWorkout: TrainingWorkout;

    switch (mode) {
      case "sets": {
        const exercises = setsWorkoutForm.getCleanedExercises();

        if (exercises.length === 0) {
          return;
        }

        const setsWorkout: SetsWorkout = {
          ...baseWorkout,
          mode: "sets",
          exercises,
          restBetweenExercises: setsWorkoutForm.restBetweenExercises,
        };

        trainingWorkout = setsWorkout;
        break;
      }

      case "circular": {
        const blocks = blockWorkoutForm.getCleanedBlocks();

        if (blocks.length !== 1) {
          return;
        }

        trainingWorkout = {
          ...baseWorkout,
          mode: "circular",
          blocks: [blocks[0]],
        };

        break;
      }

      case "supersets": {
        const blocks = blockWorkoutForm.getCleanedBlocks();

        if (blocks.length === 0) {
          return;
        }

        trainingWorkout = {
          ...baseWorkout,
          mode: "supersets",
          blocks,
        };

        break;
      }
    }

    onCreate(trainingWorkout);
  };

  return (
    <WorkoutModal
      eyebrow="TRAINING"
      title={workout ? "Edit workout" : "Add workout"}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitLabel={workout ? "Save changes" : "Create workout"}
    >
      <div className="training-workout-header">
        <div className="training-workout-name">
          <label htmlFor="training-workout-name">Workout name</label>

          <input
            id="training-workout-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Full Body"
            required
            autoFocus
          />
        </div>

        <div className="training-workout-mode">
          <TrainingModeSelector mode={mode} setMode={setMode} />
        </div>
      </div>

      {mode === "sets" && <SetsWorkoutForm form={setsWorkoutForm} />}

      {(mode === "circular" || mode === "supersets") && (
        <CircularWorkoutForm form={blockWorkoutForm} mode={mode} />
      )}
    </WorkoutModal>
  );
}

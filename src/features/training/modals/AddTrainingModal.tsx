import { useState } from "react";
import type { TrainingWorkout, TrainingMode } from "../../../models/workout";
import { useTrainingWorkoutForm } from "../hooks/useTrainingWorkoutForm";
import { TrainingModeSelector } from "./TrainingModeSelector";
import { CircularWorkoutForm } from "./CircularWorkoutForm";
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

  const [mode, setMode] = useState<TrainingMode>(workout?.mode ?? "sets");

  const form = useTrainingWorkoutForm(workout);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    const now = new Date().toISOString();

    const trainingWorkout: TrainingWorkout = {
      id: workout?.id ?? 0,
      name: trimmedName,
      type: "training",
      mode,
      createdAt: workout?.createdAt ?? now,
      updatedAt: now,
      blocks: form.getCleanedBlocks(),
    };

    if (trainingWorkout.blocks.length === 0) {
      return;
    }

    onCreate(trainingWorkout);
  };
  return (
    <div
      className="training-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="training-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-training-workout-title"
      >
        <div className="training-modal-header">
          <div>
            <p className="eyebrow">TRAINING</p>
            <h2 id="add-training-workout-title">
              {workout ? "Edit workout" : "Add workout"}
            </h2>
          </div>

          <button
            type="button"
            className="remove-close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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

          {/* {mode === "sets" && (
            <SetsWorkoutForm
              blocks={form.blocks}
              onUpdateBlock={form.updateBlock}
              onUpdateExercise={form.updateExercise}
              onAddExercise={form.addExercise}
              onRemoveExercise={form.removeExercise}
            />
          )} */}

          {(mode === "circular" || mode === "supersets") && (
            <CircularWorkoutForm form={form} mode={mode}/>
          )}
          {/* 
          {mode === "supersets" && (
            <SupersetWorkoutForm
              blocks={form.blocks}
              onUpdateBlock={form.updateBlock}
              onUpdateExercise={form.updateExercise}
              onAddExercise={form.addExercise}
              onRemoveExercise={form.removeExercise}
            />
          )} */}

          <div className="training-modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {workout ? "Save changes" : "Create workout"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

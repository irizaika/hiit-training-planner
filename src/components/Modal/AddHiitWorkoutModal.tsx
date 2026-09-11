import { useState } from "react";
import type { HiitWorkout } from "../../models/workout";
import "./AddHiitWorkoutModal.css";

interface AddHiitWorkoutModalProps {
  workout?: HiitWorkout;
  onClose: () => void;
  onCreate: (workout: HiitWorkout) => void;
}

export function AddHiitWorkoutModal({
  workout,
  onClose,
  onCreate,
}: AddHiitWorkoutModalProps) {
  const [name, setName] = useState(workout?.name ?? "");
  const [workSeconds, setWorkSeconds] = useState(workout?.workSeconds ?? 30);
  const [restSeconds, setRestSeconds] = useState(workout?.restSeconds ?? 10);
  const [rounds, setRounds] = useState(workout?.rounds ?? 4);

  const [exerciseNames, setExerciseNames] = useState<string[]>(
    workout?.exercises.map((exercise) => exercise.name) ?? ["", "", ""],
  );

  const handleExerciseChange = (index: number, value: string) => {
    setExerciseNames((current) =>
      current.map((name, exerciseIndex) =>
        exerciseIndex === index ? value : name,
      ),
    );
  };

  const handleAddExercise = () => {
    setExerciseNames((current) => [...current, ""]);
  };

  const handleRemoveExercise = (index: number) => {
    if (exerciseNames.length <= 1) {
      return;
    }

    setExerciseNames((current) =>
      current.filter((_, exerciseIndex) => exerciseIndex !== index),
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    const exercises = exerciseNames
      .map((exerciseName) => exerciseName.trim())
      .filter(Boolean)
      .map((exerciseName, index) => ({
        id: index + 1,
        name: exerciseName,
      }));

    if (!trimmedName || exercises.length === 0) {
      return;
    }

    const now = new Date().toISOString();

    const newWorkout: HiitWorkout = {
      id: workout?.id ?? Date.now(),
      name: trimmedName,
      type: "hiit",

      createdAt: workout?.createdAt ?? now,
      updatedAt: now,

      workSeconds,
      restSeconds,
      rounds,

      exercises,
    };

    onCreate(newWorkout);
  };

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-hiit-workout-title"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">HIIT</p>
            <h2>{workout ? "Edit workout" : "Add workout"}</h2>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="workout-name">Workout name</label>

            <input
              id="workout-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Morning HIIT"
              required
              autoFocus
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="work-seconds">Work</label>

              <input
                id="work-seconds"
                type="number"
                min="1"
                value={workSeconds}
                onChange={(event) => setWorkSeconds(Number(event.target.value))}
                required
              />

              <span className="input-suffix">seconds</span>
            </div>

            <div className="form-group">
              <label htmlFor="rest-seconds">Rest</label>

              <input
                id="rest-seconds"
                type="number"
                min="0"
                value={restSeconds}
                onChange={(event) => setRestSeconds(Number(event.target.value))}
                required
              />

              <span className="input-suffix">seconds</span>
            </div>

            <div className="form-group">
              <label htmlFor="rounds">Rounds</label>

              <input
                id="rounds"
                type="number"
                min="1"
                value={rounds}
                onChange={(event) => setRounds(Number(event.target.value))}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-header">
              <div>
                <label>Exercises</label>
                <p>Add the exercises in the order you want to perform them.</p>
              </div>
            </div>

            <div className="exercise-form-list">
              {exerciseNames.map((exerciseName, index) => (
                <div className="exercise-form-row" key={index}>
                  <span className="exercise-number">{index + 1}</span>

                  <input
                    type="text"
                    value={exerciseName}
                    onChange={(event) =>
                      handleExerciseChange(index, event.target.value)
                    }
                    placeholder={`Exercise ${index + 1}`}
                    required
                  />

                  {exerciseNames.length > 1 && (
                    <button
                      type="button"
                      className="remove-exercise-button"
                      onClick={() => handleRemoveExercise(index)}
                      aria-label={`Remove exercise ${index + 1}`}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              className="add-exercise-button"
              onClick={handleAddExercise}
            >
              + Add exercise
            </button>
          </div>

          <div className="modal-actions">
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

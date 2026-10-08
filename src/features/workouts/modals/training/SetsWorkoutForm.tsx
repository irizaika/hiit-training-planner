import { useState } from "react";
import type { SetsWorkoutForm } from "../../../training/hooks/useSetsWorkoutForm";
import { ExerciseRow } from "./ExerciseBlock/ExerciseRow";
import { SetExerciseEditor } from "./ExerciseBlock/SetExerciseEditor";
import { DurationField } from "../DurationField";

interface SetsWorkoutFormProps {
  form: SetsWorkoutForm;
}

export function SetsWorkoutForm({ form }: SetsWorkoutFormProps) {
  const [editingExerciseId, setEditingExerciseId] = useState<number | null>(
    null,
  );

  const handleEdit = (exerciseId: number) => {
    setEditingExerciseId((currentId) =>
      currentId === exerciseId ? null : exerciseId,
    );
  };

  const handleRestEnabledChange = (enabled: boolean) => {
    form.updateRestBetweenExercises({
      ...form.restBetweenExercises,
      enabled,
    });
  };

  const handleRestSecondsChange = (seconds: number) => {
    form.updateRestBetweenExercises({
      ...form.restBetweenExercises,
      seconds,
    });
  };

  return (
    <div className="training-form-section">
      <div className="training-form-section-header sets-section-header">
        <div>
          <h3>Exercises</h3>
          <p>Configure each exercise and its sets.</p>
        </div>

        <div className="sets-rest-field">
          <DurationField
            id="sets-rest-seconds"
            label="Rest after exercise"
            value={form.restBetweenExercises.seconds}
            onChange={handleRestSecondsChange}
            disabled={!form.restBetweenExercises.enabled}
            required={form.restBetweenExercises.enabled}
            checkbox={{
              checked: form.restBetweenExercises.enabled,
              onChange: handleRestEnabledChange,
            }}
          />
        </div>
      </div>

      <div className="training-exercise-list">
        {form.exercises.map((exercise, exerciseIndex) => {
          const isEditing = editingExerciseId === exercise.id;

          return (
            <div
              className={`training-exercise-item ${
                isEditing ? "is-editing" : ""
              }`}
              key={exercise.id}
            >
              <ExerciseRow
                exercise={exercise}
                exerciseIndex={exerciseIndex}
                isEditing={isEditing}
                canRemove={form.exercises.length > 1}
                onRemoveSetExercise={form.removeExercise}
                onEditExercise={handleEdit}
                onRemoveExercise={form.removeExercise}
                sets={exercise.sets}
              />

              {isEditing && (
                <SetExerciseEditor
                  exercise={exercise}
                  form={form}
                />
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="add-exercise-button"
        onClick={() => {
          const newId = form.addExercise();
          setEditingExerciseId(newId);
        }}
      >
        + Add exercise
      </button>
    </div>
  );
}

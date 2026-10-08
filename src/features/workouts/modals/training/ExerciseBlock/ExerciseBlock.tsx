import { useState } from "react";
import type { WorkoutBlock }  from "../../../../../models/workout";
import { CircularExerciseEditor } from "./CircularExerciseEditor";
import { ExerciseRow } from "./ExerciseRow"
import { type BlockWorkoutForm } from  "../../../../training/hooks/useBlockWorkoutForm";

interface ExerciseBlockProps {
  block: WorkoutBlock;
  form: BlockWorkoutForm;
}

export function ExerciseBlock({ block,form }: ExerciseBlockProps) {
  const [editingExerciseId, setEditingExerciseId] = useState<number | null>(
    null,
  );

  const handleEdit = (exerciseId: number) => {
    setEditingExerciseId((currentId) =>
      currentId === exerciseId ? null : exerciseId,
    );
  };

  return (
    <div className="training-subsection">
      <div className="training-subsection-header">
        <div>
          <h4>Exercises</h4>
          <p>Define what you do during each repeat.</p>
        </div>
      </div>

      <div className="training-exercise-list">
        {block.exercises.map((exercise, exerciseIndex) => {
          const isEditing = editingExerciseId === exercise.id;

          return (
            <div
              className={`training-exercise-item ${
                isEditing ? "is-editing" : ""
              }`}
              key={exercise.id}
            >
              <ExerciseRow 
                block={block}
                isEditing={isEditing}
                exercise={exercise}
                onRemoveExercise={form.removeExercise}
                onEditExercise={handleEdit}
                exerciseIndex={exerciseIndex}/>

              <CircularExerciseEditor
                isEditing={isEditing}
                block={block}
                exercise={exercise}
                form={form}
              />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="add-exercise-button"
        onClick={() => {form.addExercise(block.id); setEditingExerciseId(block.exercises.length+1);}} //todo fix next id
      >
        + Add exercise
      </button>
    </div>
  );
}

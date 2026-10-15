// import { AddHiitWorkoutModal } from "../workouts/modals/AddHiitWorkoutModal";
import { WorkoutList } from "../workouts/components/WorkoutList";
import { WorkoutLayout } from "../../components/Layout/WorkoutLayout";
import { WorkoutPanel } from "../../components/Layout/WorkoutPanel";
import { TimerPanel } from "../../components/Layout/TimerPanel";
import "./TrainingPage.css"
import { useTrainingWorkouts } from "../workouts/hooks/useTrainings";
import {AddTrainingModal} from "../workouts/modals/training/AddTrainingModal"
import { TrainingExecution } from "./TrainingExecution";


export function TrainingPage() {
  const {
    trainingWorkouts,
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
  } = useTrainingWorkouts();

  return (
    <>
      <WorkoutLayout>
        <WorkoutPanel
          name="TRAINING"
          count={trainingWorkouts?.length??0}
          // count={trainingWorkouts != null ? trainingWorkouts.length : 0}
          onCreate={openCreateModal}
        >
          <WorkoutList
            workouts={trainingWorkouts}
            selectedWorkoutId={selectedWorkoutId}
            onSelectWorkout={selectWorkout}
            onDelete={deleteWorkout}
            onEdit={openEditModal}
            onDuplicate={duplicateWorkout}
          />
        </WorkoutPanel>

        <TimerPanel selectedWorkout={selectedWorkout ?? undefined}>
          {selectedWorkout && (
            <TrainingExecution
              key={`${selectedWorkout.id}-${selectedWorkout.updatedAt}`}
              workout={selectedWorkout}
            />
          )}
        </TimerPanel>
      </WorkoutLayout>

      {isAddWorkoutOpen && (
        <AddTrainingModal onClose={closeCreateModal} onCreate={createWorkout} />
      )}

      {isEditWorkoutOpen && selectedWorkout && (
        <AddTrainingModal
          workout={selectedWorkout}
          onClose={closeEditModal}
          onCreate={editWorkout}
        />
      )}
    </>
  );
}
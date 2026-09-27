// import { AddHiitWorkoutModal } from "../workouts/modals/AddHiitWorkoutModal";
import { WorkoutList } from "../workouts/components/WorkoutList";
import { WorkoutLayout } from "../../components/Layout/WorkoutLayout";
import { WorkoutPanel } from "../../components/Layout/WorkoutPanel";
import { TimerPanel } from "../../components/Layout/TimerPanel";
import "./TrainingPage.css"
import { useTrainingWorkouts } from "../workouts/hooks/useTrainings";
import {AddTrainingModal} from "./modals/AddTrainingModal"


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
          count={trainingWorkouts.length}
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

        <TimerPanel selectedWorkout={selectedWorkout}>
          <></>
        </TimerPanel>
      </WorkoutLayout>

     {isAddWorkoutOpen && (
        <AddTrainingModal
          onClose={closeCreateModal}
          onCreate={createWorkout}
        />
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
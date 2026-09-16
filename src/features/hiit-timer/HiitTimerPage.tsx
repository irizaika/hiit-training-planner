import "./HiitTimerPage.css";

import { HiitTimer } from "./HiitTimer";
import { AddHiitWorkoutModal } from "../workouts/modals/AddHiitWorkoutModal";
import { WorkoutList } from "../workouts/components/WorkoutList";
import { WorkoutLayout } from "../../components/Layout/WorkoutLayout";
import { WorkoutPanel } from "../../components/Layout/WorkoutPanel";
import { TimerPanel } from "../../components/Layout/TimerPanel";
import { useHiitWorkouts } from "../workouts/hooks/useHiitWorkouts";
import "./HiitTimerPage.css"


export function HiitTimerPage() {
  const {
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
  } = useHiitWorkouts();

  return (
    <>
      <WorkoutLayout>
        <WorkoutPanel
          name="HIIT"
          count={hiitWorkouts.length}
          onCreate={openCreateModal}
        >
          <WorkoutList
            workouts={hiitWorkouts}
            selectedWorkoutId={selectedWorkoutId}
            onSelectWorkout={selectWorkout}
            onDelete={deleteWorkout}
            onEdit={openEditModal}
            onDuplicate={duplicateWorkout}
          />
        </WorkoutPanel>

        <TimerPanel selectedWorkout={selectedWorkout}>
          {selectedWorkout && (
            <HiitTimer
              key={`${selectedWorkout.id}-${selectedWorkout.updatedAt}`}
              selectedWorkout={selectedWorkout}
            />
          )}
        </TimerPanel>
      </WorkoutLayout>

      {isAddWorkoutOpen && (
        <AddHiitWorkoutModal
          onClose={closeCreateModal}
          onCreate={createWorkout}
        />
      )}

      {isEditWorkoutOpen && selectedWorkout && (
        <AddHiitWorkoutModal
          workout={selectedWorkout}
          onClose={closeEditModal}
          onCreate={editWorkout}
        />
      )}
    </>
  );
}
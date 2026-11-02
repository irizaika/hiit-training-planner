import "./HiitTimerPage.css";

import { HiitTimer } from "./HiitTimer";
import { AddHiitWorkoutModal } from "../workouts/modals/hiit/AddHiitWorkoutModal";
import { WorkoutList } from "../workouts/components/WorkoutList";
import { WorkoutLayout } from "../../components/Layout/WorkoutLayout";
import { WorkoutPanel } from "../../components/Layout/WorkoutPanel";
import { TimerPanel } from "../../components/Layout/TimerPanel";
import "./HiitTimerPage.css";
import { useHiitWorkouts } from "../workouts/hooks/useHiitWorkouts";

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

        <TimerPanel selectedWorkout={selectedWorkout??undefined}>
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

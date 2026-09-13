import "./HiitTimerPage.css";

import { HiitTimer } from "./HiitTimer";
import { AddHiitWorkoutModal } from "../../components/Modal/AddHiitWorkoutModal";
import { WorkoutList } from "../../components/Layout/WorkoutList";
import { WorkoutLayout } from "../../components/Layout/WorkoutLayout";
import { WorkoutPanel } from "../../components/Layout/WorkoutPanel";
import { TimerPanel } from "../../components/Layout/TimerPanel";
import { useHiitWorkouts } from "../../hooks/useHiitWorkouts";

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

    importHiitWorkouts,
    exportHiitWorkouts,
  } = useHiitWorkouts();

  return (
    <>
      <WorkoutLayout>
        <WorkoutPanel
          name="HIIT"
          count={hiitWorkouts.length}
          onCreate={openCreateModal}
          onImport={importHiitWorkouts}
          onExport={exportHiitWorkouts}
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
              key={selectedWorkout.id}
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
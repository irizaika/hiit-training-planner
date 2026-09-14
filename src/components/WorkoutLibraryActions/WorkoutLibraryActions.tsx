import { exportWorkouts } from "../../services/exportWorkout";
import { importWorkouts } from "../../services/importWorkout";
import { useWorkouts } from "../../context/useWorkout";

import "./WorkoutLibraryActions.css";

export function WorkoutLibraryActions() {
  const { workouts, setHiitWorkouts, setRoundWorkouts, setSetWorkouts } =
    useWorkouts();

  const handleExport = () => {
    exportWorkouts(workouts);
  };

  const handleImport = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = ".json,application/json";

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) {
        return;
      }

      try {
        const importedWorkouts = await importWorkouts(file);

        setHiitWorkouts(importedWorkouts.hiit);
        setRoundWorkouts(importedWorkouts.rounds);
        setSetWorkouts(importedWorkouts.sets);
      } catch (error) {
        console.error(error);

        window.alert(
          "Could not import workouts. Please select a valid workout JSON file.",
        );
      }
    };

    input.click();
  };

  return (
    <div className="workout-library-actions">
      <div className="workout-library-info">
        <p className="eyebrow">YOUR WORKOUTS</p>

        <p className="workout-library-description">
          Your workouts are saved automatically in this browser. Clearing
          browser data may remove them, so export a backup to keep them safe or
          transfer them to another device.
        </p>
      </div>

      <div className="workout-library-buttons">
        <button
          type="button"
          className="secondary-button"
          onClick={handleImport}
        >
          ↑ Bring workouts
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={handleExport}
        >
          ↓ Save backup
        </button>
      </div>
    </div>
  );
}

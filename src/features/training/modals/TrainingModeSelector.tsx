import type { TrainingMode } from "../../../models/workout";
import "./TrainingModeSelector.css"

interface TrainingModeSelectorProps {
  mode: TrainingMode;
  setMode: (value: TrainingMode) => void;
}

export function TrainingModeSelector({
  mode,
  setMode,
}: TrainingModeSelectorProps) {
  return (
    <div className="training-mode-field">
      <label htmlFor="trainingMode">Mode</label>

      <select
        id="trainingMode"
        value={mode}
        onChange={(event) =>
          setMode(event.target.value as TrainingMode)
        }
      >
        <option value="sets">Sets</option>
        <option value="circular">Circular</option>
        <option value="supersets">Supersets</option>
      </select>
    </div>
  );
}

interface WorkoutProgressProps {
  currentRound: number;
  totalRounds: number;
  progress: number;
}

export function WorkoutProgress({
  currentRound,
  totalRounds,
  progress,
}: WorkoutProgressProps) {
  return (
    <div className="workout-progress">
      <div className="workout-progress-header">
        <span>
          Round {currentRound} / {totalRounds}
        </span>

        <strong>{progress}%</strong>
      </div>

      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Workout progress"
      >
        <div
          className="progress-bar-value"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

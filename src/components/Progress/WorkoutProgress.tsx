import "./WorkoutProgress.css";

interface WorkoutProgressProps {
  current: number;
  total: number;
  progress: number;
  label?: string;
  className?: string;
}

export function WorkoutProgress({
  current,
  total,
  progress,
  label = "Round",
  className,
}: WorkoutProgressProps) {
  const safeProgress = Math.max(0, Math.min(100, progress));

  return (
    <div
      className={["workout-progress", className].filter(Boolean).join(" ")}
    >
      <div className="workout-progress-header">
        <span>
          {label} {current} / {total}
        </span>

        <strong>{safeProgress}%</strong>
      </div>

      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={safeProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} progress`}
      >
        <div
          className="progress-bar-value"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
}

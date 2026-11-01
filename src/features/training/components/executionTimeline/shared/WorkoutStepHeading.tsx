interface WorkoutStepHeadingProps {
  groupLabel?: string;
  completedCount: number;
  total: number;
  completeAllLabel?: string;
  isResting: boolean;
  onCompleteAll?: () => void;
}

export function WorkoutStepHeading({
  groupLabel,
  completedCount,
  total,
  completeAllLabel,
  isResting,
  onCompleteAll,
}: WorkoutStepHeadingProps) {
  const canCompleteAll = Boolean(
    onCompleteAll && completeAllLabel,
  );

  return (
    <>
      {groupLabel && (
        <div className="execution-focus-step-heading">
          <div>
            <span className="execution-focus-group-name">
              {groupLabel}
            </span>

            <span className="execution-focus-group-progress">
              {completedCount}/{total}
            </span>
          </div>

          {canCompleteAll && (
            <button
              type="button"
              className="execution-timeline-complete-all"
              disabled={isResting}
              onClick={onCompleteAll}
            >
              {completeAllLabel}
            </button>
          )}
        </div>
      )}
    </>
  );
}

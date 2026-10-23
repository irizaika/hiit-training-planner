import type { TimelineStep } from "../shared/timelineTypes";

interface SetCompletionButtonProps {
  isCompleted: boolean;
  isCurrent: boolean;
  disabled: boolean;
  onToggleStep: (step: TimelineStep) => void;
  step: TimelineStep;
  index: number;
}

export function SetCompletionButton({
  isCompleted,
  isCurrent,
  disabled,
  onToggleStep,
  step,
  index,
}: SetCompletionButtonProps) {
  const className = [
    "execution-focus-set",
    isCompleted && "is-completed",
    isCurrent && "is-current",
  ]
    .filter(Boolean)
    .join(" ");

  const accessibleLabel = [
    `Set ${index + 1}`,
    isCurrent && "current",
    isCompleted && "completed",
    disabled && "unavailable during rest",
  ]
    .filter(Boolean)
    .join(", ");

  const buttonContent = isCompleted ? "✓" : index + 1;

  return (
    <button
      type="button"
      className={className}
      aria-current={isCurrent ? "step" : undefined}
      aria-pressed={isCompleted}
      aria-label={accessibleLabel}
      disabled={disabled}
      onClick={() => onToggleStep(step)}
    >
      {buttonContent}
    </button>
  );
}

import type { TimelineStep } from "./timelineTypes";

interface StepCompletionButtonProps {
  isCompleted: boolean;
  isCurrent: boolean;
  disabled: boolean;
  onToggleStep: (step: TimelineStep) => void;
  step: TimelineStep;
  index: number;
}

export function StepCompletionButton({
  isCompleted,
  isCurrent,
  disabled,
  onToggleStep,
  step,
  index,
}: StepCompletionButtonProps) {
  const className = [
    "execution-focus-step",
    isCompleted && "is-completed",
    isCurrent && "is-current",
  ]
    .filter(Boolean)
    .join(" ");

  const accessibleLabel = [
    step.label,
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

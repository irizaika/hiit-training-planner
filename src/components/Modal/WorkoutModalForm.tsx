import type { ReactNode, FormEvent } from "react";
import "./WorkoutModalForm.css";

interface WorkoutModalProps {
  eyebrow: string;
  title: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  submitLabel: string;
  closeLabel?: string;
}

export function WorkoutModal({
  eyebrow,
  title,
  onClose,
  onSubmit,
  children,
  submitLabel,
  closeLabel = "Cancel",
}: WorkoutModalProps) {
  return (
    <div
      className="workout-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="workout-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="workout-modal-title"
      >
        <div className="workout-modal-header">
          <div>
            <p className="eyebrow">{eyebrow}</p>

            <h2 id="workout-modal-title">{title}</h2>
          </div>

          <button
            type="button"
            className="remove-close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={onSubmit}>
          {children}

          <div className="workout-modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              {closeLabel}
            </button>

            <button type="submit" className="primary-button">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

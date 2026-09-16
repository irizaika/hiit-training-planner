import './WorkoutOption.css';

export interface WorkoutOptionProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}
export function WorkoutOption({
  icon,
  title,
  description,
  onClick,
}: WorkoutOptionProps) {
  return (
    <button className="workout-option" type="button" onClick={onClick}>
      <span className="workout-icon">{icon}</span>

      <span className="workout-content">
        <span className="workout-title">{title}</span>
        <span className="workout-description">{description}</span>
      </span>

      <span className="workout-arrow">→</span>
    </button>
  );
}
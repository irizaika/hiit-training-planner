import { useEffect, useRef, useState } from "react";
import type { Workout } from "../../../models/workout";
import "./WorkoutMenu.css"


interface WorkoutMenuProps {
  workout: Workout;
  onEdit: (workoutId: number) => void;
  onDelete: (workoutId: number) => void;
  onDuplicate: (workoutId: number) => void;
}

export function WorkoutMenu({
  workout,
  onEdit,
  onDelete,
  onDuplicate,
}: WorkoutMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function runAction(action: () => void) {
    setIsOpen(false);
    action();
  }

  return (
    <div className="workout-menu-wrapper" ref={menuRef}>
      <button
        type="button"
        className="workout-menu-button"
        aria-label={`Actions for ${workout.name}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        ⋮
      </button>

      {isOpen && (
        <div className="workout-menu" role="menu">
          <button
            type="button"
            role="menuitem"
            onClick={() => runAction(() => onEdit(workout.id))}
          >
            Edit workout
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => runAction(() => onDuplicate(workout.id))}
          >
            Duplicate workout
          </button>

          <div className="workout-menu-divider" />

          <button
            type="button"
            role="menuitem"
            className="danger"
            onClick={() => runAction(() => onDelete(workout.id))}
          >
            Delete workout
          </button>
        </div>
      )}
    </div>
  );
}
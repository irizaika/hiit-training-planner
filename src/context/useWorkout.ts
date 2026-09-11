import { useContext } from "react";
import { WorkoutContext } from "./WorkoutContext";

export function useWorkouts() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkouts must be used inside WorkoutProvider",
    );
  }

  return context;
}
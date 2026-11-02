import type {
  RestConfig,
  WorkoutExercise,
} from "../../../../../models/workout";

export type TimelineStatus = "completed" | "current" | "upcoming";


export interface TimelineStep {
  key: string;
  label: string;
  status: TimelineStatus;
  exercise: WorkoutExercise;
  restAfter?: RestConfig;
}


export interface TimelineGroup {
  key: string;
  label: string;
  detail: string;
  children: TimelineStep[];
  status: TimelineStatus;
}

export interface TimelineRow {
  key: string;
  label: string;
  detail?: string;
  groups: TimelineGroup[];
  colorIndex: number;
}

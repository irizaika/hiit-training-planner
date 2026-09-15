export const TIMER_PHASE = {
  IDLE: "idle",
  COUNTDOWN: "countdown",
  WORK: "work",
  REST: "rest",
  ROUND_REST: "round-rest",
  FREEZE: "freeze",
  FINISHED: "finished",
} as const;

export type TimerPhase =
  (typeof TIMER_PHASE)[keyof typeof TIMER_PHASE];

export type ResumableTimerPhase =
  | typeof TIMER_PHASE.COUNTDOWN
  | typeof TIMER_PHASE.WORK
  | typeof TIMER_PHASE.REST
  | typeof TIMER_PHASE.ROUND_REST;

export interface TimerState {
  phase: TimerPhase;
  previousPhase: ResumableTimerPhase | null;
  remainingSeconds: number;
  currentRound: number;
  totalRounds: number;
  currentExercise: number; 
  totalExercises: number;
  totalTimeLeft: number;
}
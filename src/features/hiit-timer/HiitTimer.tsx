import type { HiitWorkout } from "../../models/workout";
import { TIMER_PHASE, type TimerPhase } from "../../models/timer";
import { useTimer } from "../../hooks/useTimer";
import "./HiitTimer.css";
import { TimerHeader } from "./TimerHeader";
import { TimerDisplay } from "./TimerDisplay";
import { ExerciseProgress } from "./ExerciseProgress";
import { WorkoutProgress } from "./WorkoutProgress";
import { TimerControls } from "./TimerControls";
import { calculateTotalTime } from "../../utils/time";

interface HiitTimerProps {
  selectedWorkout: HiitWorkout;
}

export function HiitTimer({ selectedWorkout }: HiitTimerProps) {
  const { timer, start, pause, resume } = useTimer({
    workout: selectedWorkout,
  });

  const totalWorkPeriods =
    selectedWorkout.exercises.length * selectedWorkout.rounds;


  const completedWorkPeriods = getCompletedWorkPeriods(
    timer.currentRound,
    timer.currentExercise,
    timer.phase,
    timer.previousPhase,
    selectedWorkout.exercises.length,
  );

  const progress =
    totalWorkPeriods > 0
      ? Math.min(
          100,
          Math.round((completedWorkPeriods / totalWorkPeriods) * 100),
        )
      : 0;

  const isExerciseCompleted = (index: number) => {
    if (timer.phase === TIMER_PHASE.FINISHED) {
      return true;
    }

    const completedExerciseIndex =
      timer.phase === TIMER_PHASE.REST ||
      timer.phase === TIMER_PHASE.ROUND_REST ||
      (timer.phase === TIMER_PHASE.FREEZE &&
        (timer.previousPhase === TIMER_PHASE.REST ||
          timer.previousPhase === TIMER_PHASE.ROUND_REST))
        ? timer.currentExercise
        : timer.currentExercise - 1;

    return index <= completedExerciseIndex;
  };

  return (
    <div className="timer-content">
      <TimerHeader
        workout={selectedWorkout}
        phase={timer.phase}
        totalRounds={timer.totalRounds}
        totalTime={calculateTotalTime(selectedWorkout)}
        onRestart={() => {
          pause();
          start();
        }}
      />

      <TimerDisplay workout={selectedWorkout} timer={timer} />

      <ExerciseProgress
        exercises={selectedWorkout.exercises}
        currentExercise={timer.currentExercise}
        totalExercises={timer.totalExercises}
        phase={timer.phase}
        isExerciseCompleted={isExerciseCompleted}
      />

      <WorkoutProgress
        currentRound={timer.currentRound}
        totalRounds={timer.totalRounds}
        progress={progress}
      />

      <TimerControls
        phase={timer.phase}
        onStart={start}
        onPause={pause}
        onResume={resume}
      />
    </div>
  );
}

function isExerciseCompletedDuringPhase(
  phase: TimerPhase,
  previousPhase: TimerPhase | null,
): boolean {
  if (
    phase === TIMER_PHASE.REST ||
    phase === TIMER_PHASE.ROUND_REST ||
    phase === TIMER_PHASE.FINISHED
  ) {
    return true;
  }

  if (phase === TIMER_PHASE.FREEZE) {
    return (
      previousPhase === TIMER_PHASE.REST ||
      previousPhase === TIMER_PHASE.ROUND_REST
    );
  }

  return false;
}

function getCompletedWorkPeriods(
  currentRound: number,
  currentExercise: number,
  phase: TimerPhase,
  previousPhase: TimerPhase | null,
  exercisesPerRound: number,
): number {
  const completedPreviousRounds = (currentRound - 1) * exercisesPerRound;

  const currentExerciseIsCompleted = isExerciseCompletedDuringPhase(
    phase,
    previousPhase,
  );

  const completedExercisesInCurrentRound = currentExerciseIsCompleted
    ? currentExercise + 1
    : currentExercise;

  return completedPreviousRounds + completedExercisesInCurrentRound;
}

import type { HiitWorkout } from "../../models/workout";
import { TIMER_PHASE } from "../../models/timer";
import { useTimer } from "../../hooks/useTimer";
import "./HiitTimer.css";
import { TimerHeader } from "./TimerHeader";
import { TimerDisplay } from "./TimerDisplay";
import { ExerciseProgress } from "./ExerciseProgress";
import { WorkoutProgress } from "./WorkoutProgress";
import { TimerControls } from "./TimerControls";

interface HiitTimerProps {
  selectedWorkout: HiitWorkout;
}

export function HiitTimer({ selectedWorkout }: HiitTimerProps) {
  const { timer, start, pause, resume } = useTimer({
    workout: selectedWorkout,
  });

  const totalWorkPeriods =
    selectedWorkout.exercises.length * selectedWorkout.rounds;

  const completedWorkPeriods =
    (timer.currentRound - 1) * selectedWorkout.exercises.length +
    (timer.phase === TIMER_PHASE.REST ||
    timer.phase === TIMER_PHASE.FINISHED ||
    (timer.phase === TIMER_PHASE.FREEZE &&
      timer.previousPhase === TIMER_PHASE.REST)
      ? timer.currentExercise + 1
      : timer.phase === TIMER_PHASE.WORK ||
          (timer.phase === TIMER_PHASE.FREEZE &&
            timer.previousPhase === TIMER_PHASE.WORK)
        ? timer.currentExercise
        : 0);

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
      (timer.phase === TIMER_PHASE.FREEZE &&
        timer.previousPhase === TIMER_PHASE.REST)
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
        totalTime={selectedWorkout.rounds * selectedWorkout.exercises.length * selectedWorkout.workSeconds +
          selectedWorkout.rounds * selectedWorkout.exercises.length * selectedWorkout.restSeconds - selectedWorkout.restSeconds}
        onRestart={() => {
          pause();
          start();
        }}
        />

      <TimerDisplay
        workout={selectedWorkout}
        timer={timer}
      />

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

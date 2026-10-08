import { useState } from "react";
import type {
  ExerciseTarget,
  RestConfig,
  TimerConfig,
  TrainingWorkout,
  WorkoutBlock,
  WorkoutExercise,
} from "../../../models/workout";

export interface BlockWorkoutForm {
  blocks: WorkoutBlock[];

  updateBlock: (
    blockId: number,
    update: Partial<WorkoutBlock>,
  ) => void;

  updateExercise: (
    blockId: number,
    exerciseId: number,
    update: Partial<WorkoutExercise>,
  ) => void;

  addExercise: (blockId: number) => number;

  removeExercise: (
    blockId: number,
    exerciseId: number,
  ) => void;

  addBlock: () => void;

  removeBlock: (blockId: number) => void;

  updateRest: (
    blockId: number,
    field:
      | "restBetweenExercises"
      | "restBetweenRepeats",
    rest: RestConfig,
  ) => void;

  updateTarget: (
    blockId: number,
    exerciseId: number,
    target: ExerciseTarget,
  ) => void;

  updateTimer: (
    blockId: number,
    exerciseId: number,
    timer: TimerConfig,
  ) => void;

  getCleanedBlocks: () => WorkoutBlock[];
}

const createExercise = (id: number): WorkoutExercise => ({
  id,
  name: "",
  target: { type: "none" },
  timer: { enabled: false },
});

const createBlock = (id: number): WorkoutBlock => ({
  id,
  name: "",
  exercises: [createExercise(1)],
  repeatCount: 1,
  restBetweenExercises: {
    enabled: false,
    seconds: 30,
  },
  restBetweenRepeats: {
    enabled: false,
    seconds: 60,
  },
});

export function useBlockWorkoutForm(
  workout?: TrainingWorkout,
): BlockWorkoutForm {
  const initialBlocks =
    workout?.mode === "circular" ||
    workout?.mode === "supersets"
      ? workout.blocks
      : [createBlock(1)];

  const [blocks, setBlocks] =
    useState<WorkoutBlock[]>(initialBlocks);

  const updateBlock = (
    blockId: number,
    update: Partial<WorkoutBlock>,
  ) => {
    setBlocks((current) =>
      current.map((block) =>
        block.id === blockId
          ? { ...block, ...update }
          : block,
      ),
    );
  };

  const updateExercise = (
    blockId: number,
    exerciseId: number,
    update: Partial<WorkoutExercise>,
  ) => {
    setBlocks((current) =>
      current.map((block) => {
        if (block.id !== blockId) {
          return block;
        }

        return {
          ...block,
          exercises: block.exercises.map((exercise) =>
            exercise.id === exerciseId
              ? { ...exercise, ...update }
              : exercise,
          ),
        };
      }),
    );
  };

  const updateTarget = (
    blockId: number,
    exerciseId: number,
    target: ExerciseTarget,
  ) => {
    updateExercise(blockId, exerciseId, { target });
  };

  const updateTimer = (
    blockId: number,
    exerciseId: number,
    timer: TimerConfig,
  ) => {
    updateExercise(blockId, exerciseId, { timer });
  };

  const updateRest = (
    blockId: number,
    field:
      | "restBetweenExercises"
      | "restBetweenRepeats",
    rest: RestConfig,
  ) => {
    updateBlock(blockId, {
      [field]: rest,
    });
  };

  const addExercise = (blockId: number): number => {
    let newId = 1;

    setBlocks((current) =>
      current.map((block) => {
        if (block.id !== blockId) {
          return block;
        }

        newId =
          block.exercises.length > 0
            ? Math.max(
                ...block.exercises.map(
                  (exercise) => exercise.id,
                ),
              ) + 1
            : 1;

        return {
          ...block,
          exercises: [
            ...block.exercises,
            createExercise(newId),
          ],
        };
      }),
    );

    return newId;
  };

  const removeExercise = (
    blockId: number,
    exerciseId: number,
  ) => {
    setBlocks((current) =>
      current.map((block) => {
        if (
          block.id !== blockId ||
          block.exercises.length <= 1
        ) {
          return block;
        }

        return {
          ...block,
          exercises: block.exercises.filter(
            (exercise) => exercise.id !== exerciseId,
          ),
        };
      }),
    );
  };

  const addBlock = () => {
    setBlocks((current) => {
      const nextId =
        Math.max(
          0,
          ...current.map((block) => block.id),
        ) + 1;

      return [
        ...current,
        createBlock(nextId),
      ];
    });
  };

  const removeBlock = (blockId: number) => {
    setBlocks((current) =>
      current.filter(
        (block) => block.id !== blockId,
      ),
    );
  };

  const getCleanedBlocks = (): WorkoutBlock[] => {
    return blocks
      .map((block) => ({
        ...block,
        name: block.name?.trim() || undefined,
        exercises: block.exercises
          .map((exercise) => ({
            ...exercise,
            name: exercise.name.trim(),
          }))
          .filter((exercise) => exercise.name),
      }))
      .filter(
        (block) => block.exercises.length > 0,
      );
  };

  return {
    blocks,
    updateBlock,
    updateExercise,
    updateTarget,
    updateTimer,
    updateRest,
    addExercise,
    removeExercise,
    addBlock,
    removeBlock,
    getCleanedBlocks,
  };
}

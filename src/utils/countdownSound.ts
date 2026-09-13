import { TIMER_PHASE, type TimerPhase } from "../models/timer";

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  audioContext ??= new AudioContext();
  return audioContext;
}

export function playCountdownBeep(
  secondsLeft: number,
  phase: TimerPhase,
) {
  if (
    phase === TIMER_PHASE.COUNTDOWN ||
    phase === TIMER_PHASE.REST
  ) {
    playCountdown(secondsLeft);
  } else if (phase === TIMER_PHASE.WORK) {
    playEndOfWork(secondsLeft);
  }
}

/* --------------------------------
   Countdown
--------------------------------- */

function playCountdown(secondsLeft: number) {
  if (secondsLeft === 1) {
    playBeep(900, 1, 0.18);
    return;
  }

  playBeep(700, 0.12, 0.12);
}

/* --------------------------------
   End of exercise
--------------------------------- */

function playEndOfWork(secondsLeft: number) {
  if (secondsLeft === 1) {
    playExerciseEndSound();
    return;
  }

  playBeep(850, 0.12, 0.14);
}

/* --------------------------------
   Exercise finished
   Descending double beep
--------------------------------- */

function playExerciseEndSound() {
  playBeep(1000, 0.22, 0.2);

  setTimeout(() => {
    playBeep(650, 0.4, 0.2);
  }, 280);
}

/* --------------------------------
   Rest finished
   Ascending triple beep
--------------------------------- */

export function playRestEndSound() {
  playBeep(600, 0.18, 0.18);

  setTimeout(() => {
    playBeep(850, 0.18, 0.18);
  }, 220);

  setTimeout(() => {
    playBeep(1200, 0.45, 0.2);
  }, 440);
}

/* --------------------------------
   Basic beep
--------------------------------- */

function playBeep(
  frequency: number,
  duration: number,
  volume = 0.15,
) {
  const context = getAudioContext();

  if (context.state === "suspended") {
    void context.resume();
  }

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  const now = context.currentTime;

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, now);

  // Smooth attack
  gainNode.gain.setValueAtTime(0.001, now);

  gainNode.gain.exponentialRampToValueAtTime(
    volume,
    now + 0.015,
  );

  // Smooth release
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    now + duration,
  );

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
}

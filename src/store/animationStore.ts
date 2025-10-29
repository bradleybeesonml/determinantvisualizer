import { create } from 'zustand';
import type { Matrix } from './matrixStore';

export type AnimationStep =
  | {
      type: 'start';
      matrix: number[][];
    }
  | {
      type: 'highlight-cofactor';
      rowIndex: number;
      colIndex: number;
      sign: 1 | -1;
      element: number;
    }
  | {
      type: 'form-minor';
      minor: number[][];
      minorOf: { row: number, col: number };
    }
  | {
      type: 'calc-2x2-determinant';
      a: number; b: number; c: number; d: number;
      result: number;
    }
  | {
      type: 'add-to-sum';
      term: number;
      runningSum: number;
    }
  | {
      type: 'final-result';
      determinant: number;
    };


interface AnimationState {
  steps: AnimationStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  setSteps: (steps: AnimationStep[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
}

export const useAnimationStore = create<AnimationState>((set, get) => ({
  steps: [],
  currentStepIndex: -1,
  isPlaying: false,
  setSteps: (steps) => set({ steps, currentStepIndex: 0 }),
  nextStep: () => set((state) => ({ currentStepIndex: Math.min(state.currentStepIndex + 1, state.steps.length - 1) })),
  prevStep: () => set((state) => ({ currentStepIndex: Math.max(state.currentStepIndex - 1, 0) })),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  reset: () => set({ currentStepIndex: 0, isPlaying: false }),
}));

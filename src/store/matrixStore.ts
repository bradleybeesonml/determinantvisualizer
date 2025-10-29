import { create } from 'zustand';

export type Matrix = (number | string)[][];

interface MatrixState {
  matrix: Matrix;
  matrixSize: number;
  setMatrixSize: (size: number) => void;
  setMatrixValue: (row: number, col: number, value: string) => void;
  loadPreset: (preset: Matrix) => void;
}

const createEmptyMatrix = (size: number): Matrix => {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => ''));
};

export const useMatrixStore = create<MatrixState>((set) => ({
  matrix: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  matrixSize: 3,
  setMatrixSize: (size) =>
    set(() => {
      if (size < 2) size = 2;
      if (size > 5) size = 5; // Let's cap at 5x5 for now
      return {
        matrixSize: size,
        matrix: createEmptyMatrix(size),
      };
    }),
  setMatrixValue: (row, col, value) =>
    set((state) => {
      const newMatrix = state.matrix.map((r) => [...r]);
      newMatrix[row][col] = value;
      return { matrix: newMatrix };
    }),
  loadPreset: (preset) => set({ matrix: preset, matrixSize: preset.length }),
}));

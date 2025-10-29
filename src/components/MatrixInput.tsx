import { Minus, Plus } from 'lucide-react';
import { useMatrixStore } from '../store/matrixStore';
import { cn } from '../lib/utils';
import useCofactorAnimator from '../hooks/useCofactorAnimator';
import { useState } from 'react';

const PRESETS = {
  '2x2': [
    [4, 7],
    [2, 6],
  ],
  '3x3': [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  '4x4': [
    [5, 3, 2, 4],
    [4, 2, 1, 3],
    [2, 5, 3, 1],
    [1, 2, 3, 4],
  ],
};

const MatrixInput = () => {
  const { matrix, matrixSize, setMatrixSize, setMatrixValue, loadPreset } = useMatrixStore();
  const { generateSteps } = useCofactorAnimator();
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const { value } = e.target;
    if (/^-?\d*\.?\d*$/.test(value)) {
      setMatrixValue(row, col, value);
    }
  };

  const handleCalculate = () => {
    console.log('Calculate button clicked');
    generateSteps();
    console.log('generateSteps called');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Input Matrix</h2>

      {/* Size Controls */}
      <div className="flex items-center justify-between">
        <span className="font-medium">Matrix Size:</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setMatrixSize(matrixSize - 1)} disabled={matrixSize <= 2} className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-mono">{matrixSize}x{matrixSize}</span>
          <button onClick={() => setMatrixSize(matrixSize + 1)} disabled={matrixSize >= 5} className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Matrix Grid */}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrixSize}, minmax(0, 1fr))` }}>
        {matrix.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <input
              key={`${rIdx}-${cIdx}`}
              type="text"
              inputMode="numeric"
              value={cell}
              onChange={(e) => handleValueChange(e, rIdx, cIdx)}
              onFocus={() => setEditingCell({ row: rIdx, col: cIdx })}
              onBlur={() => setEditingCell(null)}
              className={cn(
                'w-full h-12 text-center text-lg font-mono rounded-md border',
                'focus:ring-2 focus:ring-blue-500 focus:outline-none',
                editingCell?.row === rIdx && editingCell?.col === cIdx ? 'border-blue-500' : 'border-gray-300'
              )}
            />
          ))
        )}
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <h3 className="font-medium">Presets</h3>
        <div className="flex gap-2">
          <button onClick={() => loadPreset(PRESETS['2x2'])} className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded-md">2x2</button>
          <button onClick={() => loadPreset(PRESETS['3x3'])} className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded-md">3x3</button>
          <button onClick={() => loadPreset(PRESETS['4x4'])} className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded-md">4x4</button>
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
      >
        Calculate Determinant
      </button>
    </div>
  );
};

export default MatrixInput;

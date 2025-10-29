import { useAnimationStore, type AnimationStep } from '../store/animationStore';
import { useMatrixStore, type Matrix } from '../store/matrixStore';

const getMinor = (matrix: number[][], row: number, col: number): number[][] => {
  return matrix
    .filter((_, r) => r !== row)
    .map((r) => r.filter((_, c) => c !== col));
};

const useCofactorAnimator = () => {
  const { matrix } = useMatrixStore();
  const { setSteps } = useAnimationStore();

  const generateSteps = () => {
    console.log('generateSteps called');
    const numericMatrix = matrix.map(row => row.map(cell => {
      const num = typeof cell === 'string' ? parseFloat(cell) : cell;
      return isNaN(num) ? 0 : num;
    }));
    
    console.log('Numeric matrix:', numericMatrix);
    
    if (numericMatrix.length === 0 || numericMatrix[0].length === 0) {
      console.error('Empty matrix');
      return;
    }
    
    const steps: AnimationStep[] = [];

    const calculateSubDeterminant = (mat: number[][]): number => {
        if (mat.length === 1) return mat[0][0];
        if (mat.length === 2) {
            return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
        }
        let det = 0;
        for (let j = 0; j < mat.length; j++) {
            const sign = j % 2 === 0 ? 1 : -1;
            const element = mat[0][j];
            const minor = getMinor(mat, 0, j);
            det += sign * element * calculateSubDeterminant(minor);
        }
        return det;
    };

    steps.push({ type: 'start', matrix: numericMatrix });

    if (numericMatrix.length === 2) {
        const [a, b] = numericMatrix[0];
        const [c, d] = numericMatrix[1];
        const result = a * d - b * c;
        steps.push({ type: 'calc-2x2-determinant', a, b, c, d, result });
        steps.push({ type: 'final-result', determinant: result });
        setSteps(steps);
        return;
    }

    let runningSum = 0;
    const expansionRow = 0;
    for (let j = 0; j < numericMatrix.length; j++) {
        const sign = (expansionRow + j) % 2 === 0 ? 1 : -1;
        const element = numericMatrix[expansionRow][j];

        steps.push({ type: 'highlight-cofactor', rowIndex: expansionRow, colIndex: j, sign, element });

        const minor = getMinor(numericMatrix, expansionRow, j);
        steps.push({ type: 'form-minor', minor, minorOf: { row: expansionRow, col: j } });

        const subDeterminant = calculateSubDeterminant(minor);
        if (minor.length === 2) {
            const [a, b] = minor[0];
            const [c, d] = minor[1];
            steps.push({ type: 'calc-2x2-determinant', a, b, c, d, result: subDeterminant });
        }
        
        const term = sign * element * subDeterminant;
        runningSum += term;
        steps.push({ type: 'add-to-sum', term, runningSum });
    }

    steps.push({ type: 'final-result', determinant: runningSum });
    console.log('Generated steps:', steps.length);
    setSteps(steps);
    console.log('Steps set in store');
  };

  return { generateSteps };
};

export default useCofactorAnimator;

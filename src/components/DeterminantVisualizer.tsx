import { useAnimationStore } from '../store/animationStore';
import { useMatrixStore } from '../store/matrixStore';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface MatrixDisplayProps {
  matrix: number[][];
  highlight?: { row: number; col: number } | null;
  crossout?: { row: number; col: number } | null;
}

const MatrixDisplay = ({ matrix, highlight, crossout }: MatrixDisplayProps) => {
    return (
        <div className="grid gap-3 justify-center" style={{ gridTemplateColumns: `repeat(${matrix.length}, auto)` }}>
            {matrix.map((row, rIdx) =>
                row.map((cell, cIdx) => {
                    const isHighlighted = highlight && highlight.row === rIdx && highlight.col === cIdx;
                    const isCrossedOut = crossout && (crossout.row === rIdx || crossout.col === cIdx);
                    return (
                        <motion.div
                            key={`${rIdx}-${cIdx}`}
                            className={cn(
                                'w-14 h-14 flex items-center justify-center text-lg font-mono rounded-md border border-gray-300',
                                isHighlighted && 'bg-yellow-200 border-yellow-500',
                                isCrossedOut && 'bg-gray-200 text-gray-400'
                            )}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {cell}
                        </motion.div>
                    );
                })
            )}
        </div>
    );
}


const DeterminantVisualizer = () => {
    const { steps, currentStepIndex } = useAnimationStore();
    const { matrix } = useMatrixStore();

    console.log('DeterminantVisualizer render:', { stepsLength: steps.length, currentStepIndex });

    if (currentStepIndex < 0 || !steps[currentStepIndex]) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md min-h-[300px] flex flex-col justify-center items-center text-gray-500">
                <p>Click "Calculate" to start the visualization.</p>
            </div>
        );
    }

    const step = steps[currentStepIndex];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-4 min-h-[300px]">
            <h2 className="text-xl font-semibold">Visualization</h2>
            <div className="flex justify-center items-center p-4">
                <AnimatePresence>
                    {step.type === 'start' && (
                        <motion.div key="start" className="space-y-3">
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-md text-left max-w-2xl mx-auto">
                                <p className="text-sm font-semibold text-blue-900 mb-1">Cofactor Expansion Method</p>
                                <p className="text-xs text-blue-800">
                                    We'll calculate the determinant using <strong>Laplace expansion</strong> (also known as cofactor expansion). 
                                    This method expands the determinant along a row or column, expressing it as a sum of products of elements 
                                    and their cofactors.
                                </p>
                            </div>
                            <h3 className="text-center font-medium mb-2">Calculating determinant of:</h3>
                            <MatrixDisplay matrix={step.matrix} />
                        </motion.div>
                    )}
                    {step.type === 'highlight-cofactor' && (
                         <motion.div key="highlight" className="text-center space-y-3">
                             <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-md text-left max-w-2xl mx-auto">
                                 <p className="text-sm font-semibold text-blue-900 mb-1">Cofactor Expansion Theorem (Laplace Expansion)</p>
                                 <p className="text-xs text-blue-800 mb-2">
                                     For an n×n matrix A, expanding along row i: 
                                     <span className="font-mono ml-1">det(A) = Σ<sub>j=1</sub><sup>n</sup> a<sub>ij</sub> · C<sub>ij</sub></span>
                                 </p>
                                 <p className="text-xs text-blue-800">
                                     where <span className="font-mono">C<sub>ij</sub> = (-1)<sup>i+j</sup> · det(M<sub>ij</sub>)</span> is the cofactor, 
                                     and <span className="font-mono">M<sub>ij</sub></span> is the minor matrix.
                                 </p>
                             </div>
                             <div>
                                 <p className="text-lg mb-2 font-mono">
                                     Term: <span className="text-blue-600">({step.sign})</span> × <span className="text-green-600">{step.element}</span> × <span className="text-purple-600">det(Minor)</span>
                                 </p>
                                 <div className="text-xs text-gray-600 space-y-1 mb-3">
                                     <p><span className="text-blue-600 font-semibold">({step.sign})</span> = Cofactor sign: (-1)<sup>{step.rowIndex + 1}+{step.colIndex + 1}</sup> = {step.sign}</p>
                                     <p><span className="text-green-600 font-semibold">{step.element}</span> = Element a<sub>{step.rowIndex + 1}{step.colIndex + 1}</sub> from the original matrix</p>
                                     <p><span className="text-purple-600 font-semibold">det(Minor)</span> = Determinant of the minor matrix M<sub>{step.rowIndex + 1}{step.colIndex + 1}</sub></p>
                                 </div>
                             </div>
                             <MatrixDisplay matrix={matrix.map(r => r.map(c => typeof c === 'string' ? parseFloat(c) || 0 : c))} highlight={{row: step.rowIndex, col: step.colIndex}} crossout={null} />
                         </motion.div>
                    )}
                    {step.type === 'form-minor' && (
                        <motion.div key="form-minor" className="text-center space-y-3">
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-md text-left max-w-2xl mx-auto">
                                <p className="text-sm font-semibold text-blue-900 mb-1">Minor Matrix Definition</p>
                                <p className="text-xs text-blue-800">
                                    The minor matrix <span className="font-mono">M<sub>ij</sub></span> is the (n-1)×(n-1) matrix obtained by 
                                    deleting row <span className="font-mono">i</span> and column <span className="font-mono">j</span> from the original matrix.
                                </p>
                            </div>
                            <p className="text-lg mb-2">Forming the minor matrix by removing row {step.minorOf.row + 1} and column {step.minorOf.col + 1}:</p>
                             <MatrixDisplay matrix={matrix.map(r => r.map(c => typeof c === 'string' ? parseFloat(c) || 0 : c))} highlight={null} crossout={{row: step.minorOf.row, col: step.minorOf.col }} />
                        </motion.div>
                    )}
                    {step.type === 'calc-2x2-determinant' && (
                        <motion.div key="calc-2x2" className="text-center space-y-3">
                            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-md text-left max-w-2xl mx-auto">
                                <p className="text-sm font-semibold text-green-900 mb-1">2×2 Determinant Formula</p>
                                <p className="text-xs text-green-800">
                                    For a 2×2 matrix <span className="font-mono">[a b; c d]</span>, 
                                    <span className="font-mono ml-1">det = ad - bc</span>
                                </p>
                            </div>
                            <p className="text-lg mb-2 font-mono">
                                det = ({step.a} × {step.d}) - ({step.b} × {step.c}) = {step.result}
                            </p>
                            <MatrixDisplay matrix={[[step.a, step.b], [step.c, step.d]]} highlight={null} crossout={null} />
                        </motion.div>
                    )}
                    {step.type === 'add-to-sum' && (
                        <motion.div key="add-to-sum" className="text-center space-y-3">
                            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded-md text-left max-w-2xl mx-auto">
                                <p className="text-sm font-semibold text-purple-900 mb-1">Summation Step</p>
                                <p className="text-xs text-purple-800">
                                    Summing all terms from the cofactor expansion: 
                                    <span className="font-mono ml-1">det(A) = Σ<sub>j=1</sub><sup>n</sup> a<sub>ij</sub> · C<sub>ij</sub></span>
                                </p>
                            </div>
                            <p className="text-2xl font-bold font-mono">
                                Sum = {step.runningSum - step.term} + ({step.term}) = {step.runningSum}
                            </p>
                        </motion.div>
                    )}
                    {step.type === 'final-result' && (
                        <motion.div key="final-result" className="text-center space-y-3">
                            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-md text-left max-w-2xl mx-auto">
                                <p className="text-sm font-semibold text-green-900 mb-1">Final Result</p>
                                <p className="text-xs text-green-800">
                                    The determinant has been calculated using cofactor expansion. 
                                    This result can be used to determine if the matrix is invertible 
                                    (det(A) ≠ 0) and has applications in solving systems of linear equations, 
                                    finding eigenvalues, and more.
                                </p>
                            </div>
                            <p className="text-3xl font-bold font-mono">det(A) = {step.determinant}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DeterminantVisualizer;

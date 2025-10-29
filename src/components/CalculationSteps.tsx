import { useAnimationStore } from '../store/animationStore';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const CalculationSteps = () => {
    const { steps, currentStepIndex } = useAnimationStore();

    // Extract terms and build the calculation list
    const calculationSteps: Array<{ 
        term: number; 
        expression: string; 
        runningSum: number;
        sign: number;
        rowIndex: number;
        colIndex: number;
        element: number;
        minorDet: number;
    }> = [];
    let currentTerm: { sign: number; element: number; rowIndex: number; colIndex: number; minorDet?: number } | null = null;
    let lastRunningSum = 0;

    for (let i = 0; i <= Math.min(currentStepIndex, steps.length - 1); i++) {
        const step = steps[i];
        
        if (step.type === 'highlight-cofactor') {
            currentTerm = { 
                sign: step.sign, 
                element: step.element,
                rowIndex: step.rowIndex,
                colIndex: step.colIndex
            };
        } else if (step.type === 'calc-2x2-determinant' && currentTerm) {
            currentTerm.minorDet = step.result;
        } else if (step.type === 'add-to-sum') {
            // When we add to sum, we have the complete term
            const minorDet = currentTerm?.minorDet ?? step.term / (currentTerm?.sign ?? 1) / (currentTerm?.element ?? 1);
            const expression = currentTerm 
                ? `(${currentTerm.sign > 0 ? '+' : '-'}${Math.abs(currentTerm.element)}) × ${minorDet}`
                : `${step.term}`;
            
            calculationSteps.push({
                term: step.term,
                expression,
                runningSum: step.runningSum,
                sign: currentTerm?.sign ?? 1,
                rowIndex: currentTerm?.rowIndex ?? 0,
                colIndex: currentTerm?.colIndex ?? 0,
                element: currentTerm?.element ?? 0,
                minorDet: minorDet
            });
            currentTerm = null;
            lastRunningSum = step.runningSum;
        } else if (step.type === 'final-result') {
            lastRunningSum = step.determinant;
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Calculation Steps</h2>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {calculationSteps.length === 0 ? (
                    <p className="text-gray-500 text-sm">Steps will appear here as the calculation progresses...</p>
                ) : (
                    <>
                        {calculationSteps.map((calcStep, idx) => {
                            const i = calcStep.rowIndex + 1;
                            const j = calcStep.colIndex + 1;
                            const signPower = i + j;
                            const isPositive = signPower % 2 === 0;
                            
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                        "p-3 rounded-md border-l-4",
                                        idx === calculationSteps.length - 1 ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
                                    )}
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="text-sm font-mono text-gray-700">
                                                    Term {idx + 1}: {calcStep.expression}
                                                </div>
                                                <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                                                    <div>
                                                        Sign: (-1)<sup>{signPower}</sup> = (-1)<sup>{i}+{j}</sup> = {isPositive ? '+1' : '-1'}
                                                        {isPositive ? ' (positive)' : ' (negative)'}
                                                    </div>
                                                    <div className="text-gray-500">
                                                        = {calcStep.term}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-4 text-right">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    Sum: {calcStep.runningSum}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                        {steps[currentStepIndex]?.type === 'final-result' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="p-4 rounded-md border-2 border-green-500 bg-green-50 mt-4"
                            >
                                <div className="text-lg font-bold text-green-800 text-center">
                                    Determinant = {lastRunningSum}
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CalculationSteps;


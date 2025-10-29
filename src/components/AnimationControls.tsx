import { Play, Pause, SkipBack, SkipForward, RefreshCw } from 'lucide-react';
import { useAnimationStore } from '../store/animationStore';
import React, { useEffect } from 'react';

const AnimationControls = () => {
    const { isPlaying, play, pause, nextStep, prevStep, reset, currentStepIndex, steps } = useAnimationStore();
    
    useEffect(() => {
        let timer;
        if (isPlaying && currentStepIndex < steps.length - 1) {
            timer = setTimeout(() => {
                nextStep();
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, currentStepIndex, steps.length, nextStep]);

    return (
        <div className="bg-white p-4 mt-8 rounded-lg shadow-md flex flex-col space-y-4">
            <div className="flex items-center justify-center gap-4">
                <button onClick={prevStep} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <SkipBack size={20} />
                </button>
                <button onClick={isPlaying ? pause : play} className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button onClick={nextStep} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <SkipForward size={20} />
                </button>
                <button onClick={reset} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <RefreshCw size={20} />
                </button>
            </div>
        </div>
    );
};

export default AnimationControls;

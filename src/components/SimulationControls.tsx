import React from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { AutomatonData, SimulationStep } from '../types';
import { tokenizeInput } from '../utils/automataEngine';

interface SimulationControlsProps {
  inputString: string;
  setInputString: (str: string) => void;
  sampleStrings?: string[];
  automaton?: AutomatonData;
  steps: SimulationStep[];
  currentStepIndex: number;
  setCurrentStepIndex: (idx: number | ((prev: number) => number)) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  speedMs: number;
  setSpeedMs: (speed: number) => void;
  isProjectorMode?: boolean;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  inputString,
  setInputString,
  sampleStrings = [],
  automaton,
  steps,
  currentStepIndex,
  setCurrentStepIndex,
  isPlaying,
  setIsPlaying,
  speedMs,
  setSpeedMs,
  isProjectorMode = false,
}) => {
  const currentStep = steps[currentStepIndex] || steps[0];
  const maxStep = steps.length - 1;

  const tokens = automaton
    ? tokenizeInput(automaton, inputString)
    : inputString.includes(',')
    ? inputString.split(',').map((s) => s.trim()).filter(Boolean)
    : inputString.split('');

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(maxStep, prev + 1));
  };

  const togglePlay = () => {
    if (currentStepIndex >= maxStep) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`border rounded-2xl p-5 space-y-4 transition-colors shadow-xl ${
      isProjectorMode
        ? 'bg-white border-2 border-slate-900 text-slate-950'
        : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      {/* Top Header & Sample String Presets */}
      <div className={`flex flex-wrap items-center justify-between gap-3 pb-3 border-b ${
        isProjectorMode ? 'border-slate-300' : 'border-slate-800'
      }`}>
        <div className="flex items-center space-x-2">
          <Sparkles className={`w-5 h-5 ${isProjectorMode ? 'text-indigo-800' : 'text-indigo-400'}`} />
          <h3 className="font-extrabold text-sm sm:text-base tracking-wide">Interactive Tape &amp; Stepper</h3>
        </div>

        {/* Quick Test Strings */}
        {sampleStrings.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto py-1">
            <span className={`text-xs font-black whitespace-nowrap ${isProjectorMode ? 'text-slate-800' : 'text-slate-300'}`}>Sample Inputs:</span>
            {sampleStrings.map((str, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputString(str);
                  setIsPlaying(false);
                  setCurrentStepIndex(0);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                  inputString === str
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400'
                    : isProjectorMode
                    ? 'bg-slate-100 text-slate-950 border border-slate-400 hover:bg-slate-200'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
                }`}
              >
                "{str || 'ε'}"
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Control Buttons & Speed Slider - Placed JUST ABOVE Tape Display */}
      <div className={`flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl border ${
        isProjectorMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
      }`}>
        {/* Playback Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleStepBack}
            disabled={currentStepIndex === 0}
            className={`p-2.5 rounded-xl transition-colors ${
              isProjectorMode
                ? 'bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-slate-900 border border-slate-300'
                : 'bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white'
            }`}
            title="Step back"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all text-sm"
          >
            {isPlaying ? <Pause className="w-4.5 h-4.5" /> : <Play className="w-4.5 h-4.5 fill-current" />}
            <span>{isPlaying ? 'Pause Simulation' : 'Play Simulation'}</span>
          </button>

          <button
            onClick={handleStepForward}
            disabled={currentStepIndex >= maxStep}
            className={`p-2.5 rounded-xl transition-colors ${
              isProjectorMode
                ? 'bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-slate-900 border border-slate-300'
                : 'bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white'
            }`}
            title="Step forward"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className={`p-2.5 rounded-xl transition-colors ml-1 ${
              isProjectorMode ? 'bg-slate-200 hover:bg-slate-300 text-slate-900 border border-slate-300' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title="Reset tape"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Slider */}
        <div className={`flex items-center space-x-3 px-3.5 py-1.5 rounded-xl border ${
          isProjectorMode ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className={`text-xs font-bold whitespace-nowrap ${isProjectorMode ? 'text-slate-700' : 'text-slate-400'}`}>Speed:</span>
          <input
            type="range"
            min="100"
            max="1500"
            step="100"
            value={speedMs}
            onChange={(e) => setSpeedMs(Number(e.target.value))}
            className="w-24 accent-indigo-500 cursor-pointer"
          />
          <span className={`text-xs font-mono font-bold w-12 text-right ${isProjectorMode ? 'text-indigo-900' : 'text-indigo-400'}`}>{speedMs}ms</span>
        </div>

        {/* Final Status Badge */}
        <div className="flex items-center">
          {currentStep?.status === 'accepted' && (
            <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ACCEPTED
            </div>
          )}
          {currentStep?.status === 'rejected' && (
            <div className="flex items-center gap-1.5 bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider">
              <XCircle className="w-4 h-4 text-rose-500" />
              REJECTED
            </div>
          )}
          {currentStep?.status === 'running' && (
            <div className="flex items-center gap-1.5 bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/30 px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              Step {currentStepIndex} / {maxStep}
            </div>
          )}
        </div>
      </div>

      {/* Input Field & String Tape Display (td) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Input Box */}
        <div className="lg:col-span-5 space-y-1.5">
          <label className={`text-xs font-bold ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>Input String (w):</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputString}
              onChange={(e) => {
                setInputString(e.target.value);
                setIsPlaying(false);
                setCurrentStepIndex(0);
              }}
              placeholder="e.g. 0101, then, 1100"
              className={`w-full border rounded-xl px-3.5 py-2 text-sm font-mono font-bold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${
                isProjectorMode
                  ? 'bg-slate-100 border-slate-400 text-slate-950 placeholder-slate-500'
                  : 'bg-slate-950 border-slate-700 text-white'
              }`}
            />
          </div>
        </div>

        {/* Tape Representation (td) */}
        <div className="lg:col-span-7 space-y-1.5">
          <label className={`text-xs font-bold ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>Memory Tape Head:</label>
          <div className={`flex items-center gap-1.5 p-2 rounded-xl border overflow-x-auto min-h-[44px] ${
            isProjectorMode ? 'bg-slate-100 border-slate-400' : 'bg-slate-950 border-slate-800'
          }`}>
            {tokens.length === 0 ? (
              <div className="text-xs text-slate-500 font-mono italic px-2">Empty string (ε)</div>
            ) : (
              tokens.map((tok, idx) => {
                const isProcessed = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex - 1;

                let cellBg = isProjectorMode ? 'bg-white text-slate-400 border-slate-300' : 'bg-slate-900 text-slate-500 border-slate-800';
                if (isCurrent) {
                  cellBg = 'bg-indigo-600 text-white font-black border-indigo-400 ring-4 ring-indigo-500/50 scale-105';
                } else if (isProcessed) {
                  cellBg = isProjectorMode ? 'bg-slate-200 text-slate-900 font-bold border-slate-400' : 'bg-slate-800 text-slate-300 border-slate-700';
                }

                return (
                  <div
                    key={idx}
                    className={`min-w-[38px] px-2.5 h-9 flex items-center justify-center rounded-lg border text-sm font-mono font-bold transition-all ${cellBg}`}
                  >
                    {tok}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Step Execution Log */}
      <div className={`rounded-xl p-3 border text-xs font-mono transition-colors ${
        isProjectorMode
          ? 'bg-slate-100 border-slate-300 text-slate-900 font-bold'
          : 'bg-slate-950 border-slate-800 text-slate-300'
      }`}>
        <span className={`uppercase tracking-wider font-extrabold mr-2 ${
          isProjectorMode ? 'text-indigo-900' : 'text-slate-500'
        }`}>Trace Log:</span>
        {currentStep?.log || 'Awaiting simulation start...'}
      </div>
    </div>
  );
};

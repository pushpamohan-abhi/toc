import React, { useState } from 'react';
import { Layers, Play, RotateCcw, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

export const PdaSimulatorView: React.FC<{ isProjectorMode?: boolean }> = ({ isProjectorMode }) => {
  const [testInput, setTestInput] = useState<string>('0011');
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Compute PDA step-by-step trace for L = {0^n 1^n | n >= 1}
  const computeSteps = (input: string) => {
    const trace: { step: number; inputChar: string; state: string; stack: string[]; action: string }[] = [];
    let stack = ['Z0'];
    let state = 'q0';

    trace.push({
      step: 0,
      inputChar: 'START',
      state: 'q0',
      stack: [...stack],
      action: 'Initial State with Z0 on stack'
    });

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if (state === 'q0' && char === '0') {
        stack.unshift('0');
        trace.push({
          step: trace.length,
          inputChar: char,
          state: 'q0',
          stack: [...stack],
          action: 'Read "0" -> Push 0 onto stack'
        });
      } else if ((state === 'q0' || state === 'q1') && char === '1') {
        state = 'q1';
        if (stack[0] === '0') {
          stack.shift();
          trace.push({
            step: trace.length,
            inputChar: char,
            state: 'q1',
            stack: [...stack],
            action: 'Read "1" -> Pop 0 from top of stack'
          });
        } else {
          trace.push({
            step: trace.length,
            inputChar: char,
            state: 'q_reject',
            stack: [...stack],
            action: 'ERROR: Mismatched symbol on stack!'
          });
          return trace;
        }
      } else {
        trace.push({
          step: trace.length,
          inputChar: char,
          state: 'q_reject',
          stack: [...stack],
          action: 'Invalid transition -> Reject'
        });
        return trace;
      }
    }

    // Final check on epsilon
    if (stack.length === 1 && stack[0] === 'Z0') {
      state = 'q_accept';
      trace.push({
        step: trace.length,
        inputChar: 'ε',
        state: 'q_accept',
        stack: [...stack],
        action: 'Input consumed & Z0 remaining -> ACCEPT!'
      });
    } else {
      state = 'q_reject';
      trace.push({
        step: trace.length,
        inputChar: 'ε',
        state: 'q_reject',
        stack: [...stack],
        action: 'Unmatched 0s remaining on stack -> REJECT!'
      });
    }

    return trace;
  };

  const steps = computeSteps(testInput);
  const activeStep = steps[Math.min(currentStep, steps.length - 1)];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border shadow-xl ${
        isProjectorMode ? 'bg-indigo-900 text-white border-indigo-700' : 'bg-slate-900 border-indigo-500/30 text-slate-100'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Module 4: Pushdown Automata (PDA) Visual Stack Simulator</h2>
            <p className="text-xs text-slate-400">
              Simulates LIFO Stack Operations (Push, Pop, No-op) for Language L = &#123;0ⁿ 1ⁿ | n ≥ 1&#125;
            </p>
          </div>
        </div>
      </div>

      {/* PDA SIMULATOR CONTROL & STACK DISPLAY */}
      <div className={`p-6 rounded-2xl border space-y-6 ${
        isProjectorMode ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-900/60 border-slate-800 text-slate-100'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4 border-slate-800">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-xs font-mono font-bold text-slate-400 shrink-0">Input String w:</label>
            <input
              type="text"
              value={testInput}
              onChange={(e) => {
                setTestInput(e.target.value);
                setCurrentStep(0);
              }}
              placeholder="e.g. 0011"
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500 w-32"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(0)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono font-bold hover:bg-slate-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
              disabled={currentStep >= steps.length - 1}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-mono font-bold hover:bg-indigo-500 disabled:opacity-50 flex items-center gap-1 shadow-md shadow-indigo-600/30"
            >
              Next Step <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step Log Trace */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-indigo-400 font-bold uppercase tracking-wider block">
              Step-by-Step ID Transition Log:
            </span>
            <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
              {steps.map((s, idx) => (
                <div
                  key={s.step}
                  onClick={() => setCurrentStep(s.step)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    idx === currentStep
                      ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-indigo-300 text-[10px] font-bold flex items-center justify-center">
                      {s.step}
                    </span>
                    <span>{s.action}</span>
                  </div>
                  <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-indigo-300">
                    State: {s.state}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* VISUAL LIFO STACK TOWER */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 font-mono text-xs flex flex-col items-center">
            <span className="text-emerald-400 font-bold uppercase tracking-wider block text-center">
              LIFO Stack Memory Tower
            </span>

            {/* Stack Container */}
            <div className="w-28 min-h-[180px] border-b-4 border-x-2 border-indigo-500/60 rounded-b-xl p-2 flex flex-col justify-end space-y-1.5 bg-slate-900/60 shadow-inner">
              {activeStep.stack.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-center font-bold shadow transition-all ${
                    idx === 0
                      ? 'bg-indigo-600 text-white animate-bounce'
                      : item === 'Z0'
                      ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                      : 'bg-indigo-950 text-indigo-200 border border-indigo-700/50'
                  }`}
                >
                  {item} {idx === 0 ? '◄ TOP' : ''}
                </div>
              ))}
            </div>

            <div className="text-[11px] text-center text-slate-400 pt-2 border-t border-slate-800 w-full">
              Status:{' '}
              {activeStep.state === 'q_accept' ? (
                <span className="text-emerald-400 font-bold flex items-center justify-center gap-1 mt-1">
                  <CheckCircle2 className="w-4 h-4" /> ACCEPTED
                </span>
              ) : activeStep.state === 'q_reject' ? (
                <span className="text-rose-400 font-bold flex items-center justify-center gap-1 mt-1">
                  <XCircle className="w-4 h-4" /> REJECTED
                </span>
              ) : (
                <span className="text-indigo-400 font-bold mt-1 block">RUNNING ({activeStep.state})</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

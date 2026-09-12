import React, { useState } from 'react';
import { Play, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';

export const TuringMachineSimulatorView: React.FC<{ isProjectorMode?: boolean }> = ({ isProjectorMode }) => {
  const [tapeInput, setTapeInput] = useState<string>('0011');
  const [headIndex, setHeadIndex] = useState<number>(0);
  const [currentState, setCurrentState] = useState<string>('q0');

  // Tape Cells State
  const initialTape = ['B', ...tapeInput.split(''), 'B', 'B'];
  const [tapeCells, setTapeCells] = useState<string[]>(initialTape);

  const handleStep = () => {
    // Basic TM simulation step for incrementing or checking language
    const symbol = tapeCells[headIndex] || 'B';
    const newCells = [...tapeCells];

    if (currentState === 'q0') {
      if (symbol === '0') {
        newCells[headIndex] = 'X';
        setTapeCells(newCells);
        setCurrentState('q1');
        setHeadIndex((prev) => prev + 1);
      } else if (symbol === 'Y') {
        setCurrentState('q3');
        setHeadIndex((prev) => prev + 1);
      }
    } else if (currentState === 'q1') {
      if (symbol === '0' || symbol === 'Y') {
        setHeadIndex((prev) => prev + 1);
      } else if (symbol === '1') {
        newCells[headIndex] = 'Y';
        setTapeCells(newCells);
        setCurrentState('q2');
        setHeadIndex((prev) => prev - 1);
      }
    } else if (currentState === 'q2') {
      if (symbol === '0' || symbol === 'Y') {
        setHeadIndex((prev) => prev - 1);
      } else if (symbol === 'X') {
        setCurrentState('q0');
        setHeadIndex((prev) => prev + 1);
      }
    }
  };

  const resetTM = () => {
    setTapeCells(['B', ...tapeInput.split(''), 'B', 'B']);
    setHeadIndex(1);
    setCurrentState('q0');
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border shadow-xl ${
        isProjectorMode ? 'bg-indigo-900 text-white border-indigo-700' : 'bg-slate-900 border-indigo-500/30 text-slate-100'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Play className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Module 5: Turing Machine (TM) Visual Tape Simulator</h2>
            <p className="text-xs text-slate-400">
              Infinite One-Dimensional Memory Tape with Read/Write Head &amp; Direction Moves (L, R)
            </p>
          </div>
        </div>
      </div>

      {/* TAPE VISUALIZER */}
      <div className={`p-6 rounded-2xl border space-y-6 ${
        isProjectorMode ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-900/60 border-slate-800 text-slate-100'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4 border-slate-800">
          <div className="flex items-center gap-3">
            <label className="text-xs font-mono font-bold text-slate-400 shrink-0">Tape Input String w:</label>
            <input
              type="text"
              value={tapeInput}
              onChange={(e) => {
                setTapeInput(e.target.value);
                setTapeCells(['B', ...e.target.value.split(''), 'B', 'B']);
                setHeadIndex(1);
                setCurrentState('q0');
              }}
              placeholder="e.g. 0011"
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500 w-32"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetTM}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono font-bold hover:bg-slate-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Tape
            </button>
            <button
              onClick={handleStep}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-mono font-bold hover:bg-indigo-500 flex items-center gap-1 shadow-md shadow-indigo-600/30"
            >
              Step Read/Write <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* INFINITE TAPE CELLS CAROUSEL */}
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-indigo-400 font-bold uppercase tracking-wider">
              1D Memory Tape Cells &amp; Head Position:
            </span>
            <span className="bg-indigo-600/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/30">
              Current State: {currentState}
            </span>
          </div>

          <div className="overflow-x-auto py-4 bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-center">
            <div className="flex items-center space-x-2">
              {tapeCells.map((cell, idx) => {
                const isHead = idx === headIndex;
                return (
                  <div key={idx} className="flex flex-col items-center">
                    {/* Head Indicator Arrow */}
                    <div className={`h-6 text-xs font-bold flex items-center ${isHead ? 'text-amber-400 animate-bounce' : 'text-transparent'}`}>
                      ▲ HEAD
                    </div>

                    {/* Tape Cell Box */}
                    <div className={`w-12 h-14 rounded-xl border-2 font-mono text-base font-extrabold flex items-center justify-center transition-all ${
                      isHead
                        ? 'bg-indigo-600 text-white border-amber-400 shadow-lg ring-2 ring-amber-400/50 scale-110'
                        : cell === 'B'
                        ? 'bg-slate-900 text-slate-600 border-slate-800'
                        : 'bg-slate-900 text-indigo-300 border-indigo-900'
                    }`}>
                      {cell}
                    </div>

                    <span className="text-[10px] text-slate-500 mt-1">idx {idx}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              <strong>Turing Machine Action:</strong> Reading cell at index {headIndex} (symbol '{tapeCells[headIndex] || 'B'}'). Transition function $\delta({currentState}, {tapeCells[headIndex] || 'B'})$ updates tape symbol and moves head left or right!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

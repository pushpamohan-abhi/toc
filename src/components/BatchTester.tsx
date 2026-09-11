import React, { useState, useEffect } from 'react';
import { AutomatonData } from '../types';
import { simulateAutomaton } from '../utils/automataEngine';
import { Play, Check, X, Layers } from 'lucide-react';

interface BatchTesterProps {
  automaton: AutomatonData;
  onSelectTestString: (str: string) => void;
  isProjectorMode?: boolean;
}

export const BatchTester: React.FC<BatchTesterProps> = ({ automaton, onSelectTestString, isProjectorMode = false }) => {
  const [rawText, setRawText] = useState('');
  const [results, setResults] = useState<{
    string: string;
    accepted: boolean;
    finalStates: string[];
    stepsCount: number;
  }[] | null>(null);

  // Update test strings whenever selected automaton changes
  useEffect(() => {
    const defaultBatch = automaton.testStrings?.length
      ? automaton.testStrings.join('\n')
      : '01\n1001\n1101\n000\n10101';

    setRawText(defaultBatch);

    const strings = defaultBatch
      .split('\n')
      .map((s) => s.trim())
      .filter((s, idx, arr) => s.length > 0 || arr.length === 1);

    const testResults = strings.map((str) => {
      const steps = simulateAutomaton(automaton, str);
      const lastStep = steps[steps.length - 1];
      const accepted = lastStep?.status === 'accepted';
      const finalStates = lastStep?.currentStates.map((id) => {
        const stateObj = automaton.states.find((s) => s.id === id);
        return stateObj?.label || id;
      }) || [];

      return {
        string: str,
        accepted,
        finalStates,
        stepsCount: steps.length - 1
      };
    });

    setResults(testResults);
  }, [automaton]);

  const runBatchTest = () => {
    const strings = rawText
      .split('\n')
      .map((s) => s.trim())
      .filter((s, idx, arr) => s.length > 0 || arr.length === 1);

    const testResults = strings.map((str) => {
      const steps = simulateAutomaton(automaton, str);
      const lastStep = steps[steps.length - 1];
      const accepted = lastStep?.status === 'accepted';
      const finalStates = lastStep?.currentStates.map((id) => {
        const stateObj = automaton.states.find((s) => s.id === id);
        return stateObj?.label || id;
      }) || [];

      return {
        string: str,
        accepted,
        finalStates,
        stepsCount: steps.length - 1
      };
    });

    setResults(testResults);
  };

  return (
    <div className={`border rounded-2xl p-5 space-y-4 transition-colors shadow-xl ${
      isProjectorMode
        ? 'bg-white border-2 border-slate-900 text-slate-950'
        : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      <div className={`flex items-center justify-between border-b pb-3 ${
        isProjectorMode ? 'border-slate-300' : 'border-slate-800'
      }`}>
        <div className="flex items-center space-x-2">
          <Layers className={`w-5 h-5 ${isProjectorMode ? 'text-purple-800' : 'text-purple-400'}`} />
          <h3 className="font-extrabold text-sm">Batch Test Suite</h3>
        </div>
        <button
          onClick={runBatchTest}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-purple-600/30 transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Run Suite
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Textarea */}
        <div className="md:col-span-5 space-y-1.5">
          <label className={`text-xs font-bold ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>
            Enter test strings (one per line):
          </label>
          <textarea
            rows={5}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            className={`w-full border rounded-xl p-3 text-xs font-mono font-bold focus:outline-none focus:border-purple-500 ${
              isProjectorMode
                ? 'bg-slate-100 border-slate-400 text-slate-950'
                : 'bg-slate-950 border-slate-800 text-white'
            }`}
            placeholder="01&#10;1001&#10;00"
          />
        </div>

        {/* Right Table Results */}
        <div className="md:col-span-7 space-y-1.5">
          <label className={`text-xs font-bold ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>Test Execution Results:</label>
          {results === null ? (
            <div className={`border rounded-xl p-6 text-center text-xs font-medium ${
              isProjectorMode ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              Click "Run Suite" to evaluate all test inputs at once.
            </div>
          ) : (
            <div className={`border rounded-xl overflow-hidden max-h-[140px] overflow-y-auto ${
              isProjectorMode ? 'bg-white border-slate-400' : 'bg-slate-950 border-slate-800'
            }`}>
              <table className="w-full text-left text-xs">
                <thead className={`border-b sticky top-0 font-bold ${
                  isProjectorMode ? 'bg-slate-200 text-slate-900 border-slate-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}>
                  <tr>
                    <th className="p-2 font-bold">Input String</th>
                    <th className="p-2 font-bold">Verdict</th>
                    <th className="p-2 font-bold">Active States</th>
                    <th className="p-2 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className={`divide-y font-mono ${
                  isProjectorMode ? 'divide-slate-300' : 'divide-slate-800/60'
                }`}>
                  {results.map((res, idx) => (
                    <tr key={idx} className={isProjectorMode ? 'hover:bg-slate-100' : 'hover:bg-slate-900/50'}>
                      <td className={`p-2 font-black ${isProjectorMode ? 'text-slate-950' : 'text-white'}`}>"{res.string || 'ε'}"</td>
                      <td className="p-2">
                        {res.accepted ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-extrabold">
                            <Check className="w-3.5 h-3.5" /> Accept
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-600 font-extrabold">
                            <X className="w-3.5 h-3.5" /> Reject
                          </span>
                        )}
                      </td>
                      <td className={`p-2 font-semibold ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>
                        {res.finalStates.length > 0 ? `{${res.finalStates.join(', ')}}` : '∅'}
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => onSelectTestString(res.string)}
                          className="text-indigo-600 hover:text-indigo-800 font-sans font-bold text-xs underline"
                        >
                          Step Live
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

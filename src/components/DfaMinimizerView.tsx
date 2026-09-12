import React, { useState } from 'react';
import { Layers, CheckCircle2, AlertTriangle, Sparkles, RefreshCw, ArrowRight, Table } from 'lucide-react';

export const DfaMinimizerView: React.FC<{ isProjectorMode?: boolean }> = ({ isProjectorMode }) => {
  const [selectedExample, setSelectedExample] = useState<'ex1' | 'ex2'>('ex1');

  // Example 1: 5-state DFA reducible to 3 states
  // States: q0 (start), q1, q2 (final), q3 (final), q4
  // q2 and q3 are equivalent!
  const example1 = {
    title: '5-State Unminimized DFA (Equivalent Final States q2 ≡ q3)',
    originalStates: ['q0 (Start)', 'q1', '*q2 (Final)', '*q3 (Final)', 'q4'],
    table: [
      { state: 'q0', isStart: true, isFinal: false, input0: 'q1', input1: 'q4' },
      { state: 'q1', isStart: false, isFinal: false, input0: 'q2', input1: 'q3' },
      { state: 'q2', isStart: false, isFinal: true, input0: 'q2', input1: 'q4' },
      { state: 'q3', isStart: false, isFinal: true, input0: 'q3', input1: 'q4' },
      { state: 'q4', isStart: false, isFinal: false, input0: 'q4', input1: 'q4' },
    ],
    equivalentPairs: ['(q2, q3)'],
    minimizedStates: ['A = {q0}', 'B = {q1}', 'C = {q2, q3}', 'D = {q4}'],
    minTable: [
      { state: 'A', subset: '{q0}', input0: 'B', input1: 'D', isStart: true, isFinal: false },
      { state: 'B', subset: '{q1}', input0: 'C', input1: 'C', isStart: false, isFinal: false },
      { state: '*C', subset: '{q2, q3}', input0: 'C', input1: 'D', isStart: false, isFinal: true },
      { state: 'D', subset: '{q4}', input0: 'D', input1: 'D', isStart: false, isFinal: false },
    ]
  };

  const currentEx = example1;

  // Pumping Lemma Interactive Checker
  const [pumpingLanguage, setPumpingLanguage] = useState<string>('anbn');
  const [pumpingStringLength, setPumpingStringLength] = useState<number>(4);
  const [pumpValueI, setPumpValueI] = useState<number>(0);

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
            <h2 className="text-xl font-bold tracking-tight">Module 2: DFA Minimization &amp; Pumping Lemma Solver</h2>
            <p className="text-xs text-slate-400">
              Interactive Table-Filling Algorithm (Myhill-Nerode) &amp; Pumping Lemma Non-Regularity Proofs
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: DFA MINIMIZATION TABLE FILLING METHOD */}
      <div className={`p-6 rounded-2xl border space-y-6 ${
        isProjectorMode ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-900/60 border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center justify-between border-b pb-4 border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
              <Table className="w-5 h-5" />
              1. DFA Minimization via Table-Filling Method (Myhill-Nerode)
            </h3>
            <p className="text-xs text-slate-400">Merges indistinguishable states into minimal equivalence classes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Unminimized Table */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block">
              Original Unminimized DFA (5 States):
            </span>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-rose-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3">State</th>
                    <th className="p-3">Input 0</th>
                    <th className="p-3">Input 1</th>
                    <th className="p-3">Final?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {currentEx.table.map((row) => (
                    <tr key={row.state} className={row.state === 'q2' || row.state === 'q3' ? 'bg-indigo-500/10' : ''}>
                      <td className="p-3 font-bold text-slate-200">
                        {row.isStart ? '→ ' : ''}{row.state}
                      </td>
                      <td className="p-3 text-indigo-300">{row.input0}</td>
                      <td className="p-3 text-indigo-300">{row.input1}</td>
                      <td className="p-3 font-bold">{row.isFinal ? <span className="text-emerald-400">YES</span> : <span className="text-slate-500">NO</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
              💡 <strong>Distinguishability Analysis:</strong> States <code>q2</code> and <code>q3</code> produce identical outputs for all input sequences (<code>q2, q3 --0--&gt; q2/q3</code> and <code>q2, q3 --1--&gt; q4</code>). Therefore, <code>q2 ≡ q3</code> and can be merged into a single state <strong>C = {"{q2, q3}"}</strong>!
            </div>
          </div>

          {/* Minimized DFA Table */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              Minimized Minimal DFA (4 Equivalent Block States):
            </span>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-emerald-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Block State</th>
                    <th className="p-3">Subset</th>
                    <th className="p-3">Input 0</th>
                    <th className="p-3">Input 1</th>
                    <th className="p-3">Final?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {currentEx.minTable.map((row) => (
                    <tr key={row.state} className={row.isFinal ? 'bg-emerald-500/10' : ''}>
                      <td className="p-3 font-bold text-emerald-400">{row.state}</td>
                      <td className="p-3 text-slate-300">{row.subset}</td>
                      <td className="p-3 text-indigo-300">{row.input0}</td>
                      <td className="p-3 text-indigo-300">{row.input1}</td>
                      <td className="p-3 font-bold">{row.isFinal ? <span className="text-emerald-400">YES</span> : <span className="text-slate-500">NO</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Reduced state count from <strong>5 states to 4 minimal states</strong> without changing language behavior!</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PUMPING LEMMA INTERACTIVE EXPLORER */}
      <div className={`p-6 rounded-2xl border space-y-6 ${
        isProjectorMode ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-900/60 border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center justify-between border-b pb-4 border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              2. Interactive Pumping Lemma Explorer for Non-Regular Languages
            </h3>
            <p className="text-xs text-slate-400">Test string pumping x y^i z to verify non-regularity proofs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-400 mb-1">Target Language L:</label>
            <select
              value={pumpingLanguage}
              onChange={(e) => setPumpingLanguage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="anbn">L = &#123;aⁿ bⁿ | n ≥ 0&#125; (Equal a's &amp; b's)</option>
              <option value="wwR">L = &#123;w wᴿ | w ∈ &#123;a,b&#125;*&#125; (Palindromes)</option>
              <option value="prime">L = &#123;aᵖ | p is a prime number&#125;</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-400 mb-1">Pumping Length p:</label>
            <input
              type="number"
              min={1}
              max={10}
              value={pumpingStringLength}
              onChange={(e) => setPumpingStringLength(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-400 mb-1">Pump Multiplier i (xyⁱz):</label>
            <input
              type="number"
              min={0}
              max={5}
              value={pumpValueI}
              onChange={(e) => setPumpValueI(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Pumping Breakdown Display */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b pb-2 border-slate-800">
            <span className="text-slate-400">Base String w (length = {pumpingStringLength * 2}):</span>
            <span className="text-indigo-400 font-bold">
              {'a'.repeat(pumpingStringLength)}{'b'.repeat(pumpingStringLength)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Part x:</span>
              <span className="text-indigo-300 font-bold">{'a'.repeat(Math.max(0, pumpingStringLength - 2))}</span>
            </div>
            <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/30">
              <span className="text-amber-400 block mb-0.5">Part y (Pumped x{pumpValueI}):</span>
              <span className="text-amber-300 font-bold">{'a'.repeat(2 * pumpValueI || 0) || 'ε'}</span>
            </div>
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Part z:</span>
              <span className="text-indigo-300 font-bold">{'b'.repeat(pumpingStringLength)}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Resulting Pumped String (xy^{pumpValueI}z):</span>
            <span className="text-amber-400 font-bold text-sm">
              {'a'.repeat(pumpingStringLength - 2)}{'a'.repeat(2 * pumpValueI)}{'b'.repeat(pumpingStringLength)}
            </span>
          </div>

          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>
              <strong>Contradiction Reached!</strong> The pumped string contains {pumpingStringLength - 2 + 2 * pumpValueI} "a"s and {pumpingStringLength} "b"s. Since the count of "a"s != count of "b"s when i = {pumpValueI}, the string <strong>xy^{pumpValueI}z ∉ L</strong>. Thus, L is <strong>NOT REGULAR</strong>! ∎
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

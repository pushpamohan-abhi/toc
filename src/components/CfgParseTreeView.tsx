import React, { useState } from 'react';
import { Network, Sparkles, CheckCircle2 } from 'lucide-react';

export const CfgParseTreeView: React.FC<{ isProjectorMode?: boolean }> = ({ isProjectorMode }) => {
  const [selectedGrammar, setSelectedGrammar] = useState<'expr' | 'palindrome'>('expr');

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border shadow-xl ${
        isProjectorMode ? 'bg-indigo-900 text-white border-indigo-700' : 'bg-slate-900 border-indigo-500/30 text-slate-100'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Module 3: Context-Free Grammars &amp; Parse Tree Visualizer</h2>
            <p className="text-xs text-slate-400">
              Derivations (LMD/RMD), Parse Tree Generation, Ambiguity Testing &amp; Normal Forms (CNF / GNF)
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE PARSE TREE VISUALIZER */}
      <div className={`p-6 rounded-2xl border space-y-6 ${
        isProjectorMode ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-900/60 border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center justify-between border-b pb-4 border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
              <Network className="w-5 h-5" />
              1. Derivation Tree &amp; Parse Tree Visualizer
            </h3>
            <p className="text-xs text-slate-400">Step-by-step Leftmost Derivation (LMD) vs Rightmost Derivation (RMD)</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedGrammar('expr')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedGrammar === 'expr' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Arithmetic Expressions
            </button>
            <button
              onClick={() => setSelectedGrammar('palindrome')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedGrammar === 'palindrome' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Palindrome Grammar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leftmost Derivation */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs">
            <span className="text-indigo-400 font-bold uppercase tracking-wider block">
              Leftmost Derivation (LMD) for "id + id * id":
            </span>
            <div className="space-y-1 text-slate-300">
              <div className="p-2 bg-slate-900 rounded-lg flex justify-between">
                <span>Step 1:</span>
                <span className="text-amber-400 font-bold">E → E + T</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg flex justify-between">
                <span>Step 2:</span>
                <span className="text-amber-400 font-bold">T + T  (E ⇒ T ⇒ id)</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg flex justify-between">
                <span>Step 3:</span>
                <span className="text-amber-400 font-bold">id + T</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg flex justify-between">
                <span>Step 4:</span>
                <span className="text-amber-400 font-bold">id + T * F  (T ⇒ T * F)</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg flex justify-between">
                <span>Step 5:</span>
                <span className="text-emerald-400 font-bold">id + id * id  (Final Terminal String)</span>
              </div>
            </div>
          </div>

          {/* Visual Parse Tree Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs text-center">
            <span className="text-emerald-400 font-bold uppercase tracking-wider block text-left">
              Generated Parse Tree Structure:
            </span>
            <pre className="text-indigo-300 leading-tight text-xs overflow-x-auto py-2">
{`          [ E ]
         /  |  \\
     [ E ]  +  [ T ]
       |       / | \\
     [ T ] [ T ] * [ F ]
       |     |       |
     [ F ] [ F ]    id
       |     |
      id    id`}
            </pre>
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-300 text-[11px] text-left">
              🌳 <strong>Yield of Tree:</strong> Reading leaves left-to-right yields <code>id + id * id</code>.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: CHOMSKY NORMAL FORM (CNF) & GREIBACH NORMAL FORM (GNF) */}
      <div className={`p-6 rounded-2xl border space-y-6 ${
        isProjectorMode ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-900/60 border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center justify-between border-b pb-4 border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              2. Chomsky Normal Form (CNF) &amp; Greibach Normal Form (GNF) Converter Reference
            </h3>
            <p className="text-xs text-slate-400">Grammar normalization rules for parsing efficiency</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* CNF Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b pb-2 border-slate-800">
              <span className="text-emerald-400 font-bold text-sm">Chomsky Normal Form (CNF)</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">A → BC | A → a</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Every production rule must be either 2 Non-terminals (A → BC) or 1 Terminal (A → a).
            </p>
            <div className="bg-slate-900 p-3 rounded-lg text-indigo-300 space-y-1 text-[11px]">
              <div>S → A B</div>
              <div>A → C D | a</div>
              <div>B → b</div>
              <div>C → a</div>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-[10px] text-emerald-300">
              ⚡ <strong>Theorem:</strong> Derivation of string |w| = n takes exactly <strong>2n - 1 steps</strong>.
            </div>
          </div>

          {/* GNF Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b pb-2 border-slate-800">
              <span className="text-amber-400 font-bold text-sm">Greibach Normal Form (GNF)</span>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full border border-amber-500/30">A → a α</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Every production rule must start with a terminal symbol followed by zero or more non-terminals.
            </p>
            <div className="bg-slate-900 p-3 rounded-lg text-amber-300 space-y-1 text-[11px]">
              <div>S → a A B | b</div>
              <div>A → a A | a</div>
              <div>B → b B | b</div>
            </div>
            <div className="p-2 bg-amber-500/10 rounded-lg text-[10px] text-amber-300">
              ⚡ Enables direct 1:1 Pushdown Automaton (PDA) construction!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

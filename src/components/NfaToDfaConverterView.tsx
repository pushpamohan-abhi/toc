import React, { useState, useRef } from 'react';
import { AutomatonData } from '../types';
import { convertNfaToDfa } from '../utils/automataEngine';
import { AutomatonCanvas } from './AutomatonCanvas';
import { GitMerge, ArrowRight, Table, Check, Upload, Download, FileCode, AlertCircle } from 'lucide-react';
import { PRESET_AUTOMATA } from '../data/presetAutomata';

interface NfaToDfaConverterViewProps {
  onLoadConvertedDfa: (dfa: AutomatonData) => void;
  isProjectorMode?: boolean;
}

export const NfaToDfaConverterView: React.FC<NfaToDfaConverterViewProps> = ({ onLoadConvertedDfa, isProjectorMode = false }) => {
  // Preset NFA candidates + Uploaded NFAs
  const presetNfaCandidates = PRESET_AUTOMATA.filter((a) => a.type === 'NFA' || a.type === 'ENFA');
  const [uploadedNfas, setUploadedNfas] = useState<AutomatonData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const allNfaCandidates = [...uploadedNfas, ...presetNfaCandidates];
  const [selectedNfaId, setSelectedNfaId] = useState<string>(presetNfaCandidates[0].id);

  const currentNfa = allNfaCandidates.find((a) => a.id === selectedNfaId) || presetNfaCandidates[0];
  const { dfa: convertedDfa, subsetTable } = convertNfaToDfa(currentNfa);

  const [revealedRowsCount, setRevealedRowsCount] = useState<number>(subsetTable.length);

  const handleSelectNfa = (id: string) => {
    setSelectedNfaId(id);
    const newNfa = allNfaCandidates.find((a) => a.id === id) || presetNfaCandidates[0];
    const { subsetTable: newTable } = convertNfaToDfa(newNfa);
    setRevealedRowsCount(newTable.length);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);

        if (!parsed.states || !Array.isArray(parsed.states) || !parsed.transitions || !Array.isArray(parsed.transitions)) {
          setUploadError('Invalid Automaton JSON: Must contain "states" and "transitions" arrays.');
          return;
        }

        const id = parsed.id || `uploaded_${Date.now()}`;
        const name = parsed.name || file.name.replace('.json', '');
        const type = (parsed.type === 'ENFA' || parsed.type === 'NFA' || parsed.type === 'DFA') ? parsed.type : 'NFA';
        const alphabet = Array.isArray(parsed.alphabet) ? parsed.alphabet : ['0', '1'];

        const processedStates = parsed.states.map((s: any, idx: number) => ({
          id: String(s.id || `q${idx}`),
          label: String(s.label || s.id || `q${idx}`),
          x: typeof s.x === 'number' ? s.x : 150 + (idx % 4) * 160,
          y: typeof s.y === 'number' ? s.y : 150 + Math.floor(idx / 4) * 120,
          isStart: !!s.isStart,
          isFinal: !!s.isFinal,
        }));

        const newAutomaton: AutomatonData = {
          id,
          name: `📁 ${name}`,
          description: parsed.description || 'Uploaded custom automaton JSON file',
          type,
          alphabet,
          states: processedStates,
          transitions: parsed.transitions.map((t: any, idx: number) => ({
            id: String(t.id || `t_${idx}`),
            from: String(t.from),
            to: String(t.to),
            symbol: String(t.symbol || '0'),
          })),
          testStrings: Array.isArray(parsed.testStrings) ? parsed.testStrings : ['01', '001', '10']
        };

        setUploadedNfas((prev) => [newAutomaton, ...prev]);
        setSelectedNfaId(id);
        setUploadError(null);
        const { subsetTable: newTable } = convertNfaToDfa(newAutomaton);
        setRevealedRowsCount(newTable.length);
      } catch (err: any) {
        setUploadError(`Failed to parse file: ${err.message}`);
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  const handleDownloadSampleNfa = () => {
    const sampleData = {
      name: "Sample Uploaded NFA (Ends with 01)",
      description: "Sample NFA uploaded from JSON file",
      type: "NFA",
      alphabet: ["0", "1"],
      states: [
        { id: "q0", label: "q0", isStart: true, isFinal: false, x: 150, y: 200 },
        { id: "q1", label: "q1", isStart: false, isFinal: false, x: 350, y: 200 },
        { id: "q2", label: "q2", isStart: false, isFinal: true, x: 550, y: 200 }
      ],
      transitions: [
        { id: "t1", from: "q0", to: "q0", symbol: "0" },
        { id: "t2", from: "q0", to: "q0", symbol: "1" },
        { id: "t3", from: "q0", to: "q1", symbol: "0" },
        { id: "t4", from: "q1", to: "q2", symbol: "1" }
      ],
      testStrings: ["01", "1001", "00"]
    };
    const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_nfa_upload.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportConvertedDfa = () => {
    const blob = new Blob([JSON.stringify(convertedDfa, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentNfa.id}_converted_dfa.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Selector Bar */}
      <div className={`border rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 transition-colors shadow-xl ${
        isProjectorMode ? 'bg-white border-2 border-slate-900 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <GitMerge className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-base font-extrabold tracking-tight ${isProjectorMode ? 'text-slate-950' : 'text-white'}`}>
              NFA / ε-NFA to DFA Subset Construction
            </h2>
            <p className={`text-xs font-medium ${isProjectorMode ? 'text-slate-700' : 'text-slate-400'}`}>
              Interactive algorithm trace converting nondeterministic automata to equivalent deterministic automata.
            </p>
          </div>
        </div>

        {/* NFA Preset Picker & Upload File Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <label className={`text-xs font-bold ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>Target NFA:</label>
            <select
              value={selectedNfaId}
              onChange={(e) => handleSelectNfa(e.target.value)}
              className={`border rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-indigo-500 ${
                isProjectorMode ? 'bg-slate-100 border-slate-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'
              }`}
            >
              {allNfaCandidates.map((nfa) => (
                <option key={nfa.id} value={nfa.id}>
                  [{nfa.type}] {nfa.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-all"
            title="Upload custom NFA definition JSON file"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload NFA JSON
          </button>

          <button
            onClick={handleDownloadSampleNfa}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              isProjectorMode
                ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Download a sample NFA JSON file format"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
            Sample JSON
          </button>
        </div>
      </div>

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-between text-rose-400 text-xs font-bold">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button onClick={() => setUploadError(null)} className="underline text-rose-300 hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Side-by-Side Visual Graph Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Original NFA */}
        <div className={`border rounded-2xl p-5 space-y-3 shadow-xl transition-colors ${
          isProjectorMode ? 'bg-white border-2 border-slate-900' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-2 ${
              isProjectorMode ? 'text-indigo-900' : 'text-indigo-400'
            }`}>
              Original Automaton ({currentNfa.type})
            </span>
            <span className={`text-xs font-mono font-bold ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>
              {currentNfa.states.length} States &bull; {currentNfa.transitions.length} Transitions
            </span>
          </div>
          <AutomatonCanvas automaton={currentNfa} height={320} isProjectorMode={isProjectorMode} />
        </div>

        {/* Right: Converted DFA */}
        <div className={`border rounded-2xl p-5 space-y-3 shadow-xl transition-colors ${
          isProjectorMode ? 'bg-white border-2 border-slate-900' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-2 ${
              isProjectorMode ? 'text-emerald-800' : 'text-emerald-400'
            }`}>
              Converted DFA (Subset States)
            </span>
            <button
              onClick={() => onLoadConvertedDfa(convertedDfa)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all"
            >
              Simulate Converted DFA <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <AutomatonCanvas automaton={convertedDfa} height={320} isProjectorMode={isProjectorMode} />
        </div>
      </div>

      {/* Subset Construction Step-by-Step Table */}
      <div className={`border rounded-2xl p-5 space-y-4 shadow-xl transition-colors ${
        isProjectorMode ? 'bg-white border-2 border-slate-900 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-3 ${
          isProjectorMode ? 'border-slate-300' : 'border-slate-800'
        }`}>
          <div className="flex items-center space-x-2">
            <Table className={`w-5 h-5 ${isProjectorMode ? 'text-purple-800' : 'text-purple-400'}`} />
            <h3 className="font-extrabold text-sm">Subset Construction Transition Table</h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setRevealedRowsCount((prev) => Math.min(subsetTable.length, prev + 1))}
              disabled={revealedRowsCount >= subsetTable.length}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                isProjectorMode
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-900 border border-slate-400'
                  : 'bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200'
              }`}
            >
              Reveal Next Subset State
            </button>
            <button
              onClick={() => setRevealedRowsCount(subsetTable.length)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 transition-all"
            >
              Reveal All ({subsetTable.length})
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className={`border-b font-bold ${
              isProjectorMode ? 'bg-slate-200 text-slate-900 border-slate-400' : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}>
              <tr>
                <th className="p-3">DFA State</th>
                <th className="p-3">Composing NFA States</th>
                <th className="p-3">Is Start?</th>
                <th className="p-3">Is Final?</th>
                {convertedDfa.alphabet.map((sym) => (
                  <th key={sym} className={`p-3 ${isProjectorMode ? 'text-indigo-900' : 'text-indigo-400'}`}>
                    δ_DFA(S, '{sym}')
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${isProjectorMode ? 'divide-slate-300' : 'divide-slate-800'}`}>
              {subsetTable.slice(0, revealedRowsCount).map((row, idx) => (
                <tr key={idx} className={isProjectorMode ? 'hover:bg-slate-100' : 'hover:bg-slate-950/60'}>
                  <td className={`p-3 font-black ${isProjectorMode ? 'text-slate-950' : 'text-white'}`}>
                    {row.dfaStateId} ({row.dfaStateLabel})
                  </td>
                  <td className={`p-3 font-semibold ${isProjectorMode ? 'text-slate-900' : 'text-slate-300'}`}>
                    {row.nfaStates.length > 0
                      ? `{${row.nfaStates
                          .map((id) => currentNfa.states.find((s) => s.id === id)?.label || id)
                          .join(', ')}}`
                      : '∅'}
                  </td>
                  <td className="p-3">
                    {row.isStart ? <span className="text-sky-600 font-extrabold">START</span> : '-'}
                  </td>
                  <td className="p-3">
                    {row.isFinal ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-extrabold">
                        <Check className="w-3.5 h-3.5" /> FINAL
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  {convertedDfa.alphabet.map((sym) => (
                    <td key={sym} className={`p-3 font-extrabold ${isProjectorMode ? 'text-indigo-900' : 'text-indigo-300'}`}>
                      {row.transitions[sym]?.targetDfaStateLabel || '∅'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

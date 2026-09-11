import React, { useState, useRef } from 'react';
import { AutomatonData, AutomatonType, AutomatonState, Transition } from '../types';
import { AutomatonCanvas } from './AutomatonCanvas';
import { validateAutomaton } from '../utils/automataEngine';
import { Plus, Trash2, CheckCircle2, AlertTriangle, Play, Save, Wrench, Upload, Download } from 'lucide-react';

interface AutomatonBuilderProps {
  onLoadCustomAutomaton: (automaton: AutomatonData) => void;
  isProjectorMode?: boolean;
}

export const AutomatonBuilder: React.FC<AutomatonBuilderProps> = ({ onLoadCustomAutomaton, isProjectorMode = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [automaton, setAutomaton] = useState<AutomatonData>({
    id: 'custom_automaton',
    name: 'Custom Automaton',
    description: 'User created automaton',
    type: 'DFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 200, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1', x: 450, y: 200, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't1', from: 'q0', to: 'q1', symbol: '0' },
      { id: 't2', from: 'q1', to: 'q0', symbol: '1' }
    ],
    testStrings: ['0', '010', '01010']
  });

  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);

  // Form states for adding transition
  const [transFrom, setTransFrom] = useState<string>(automaton.states[0]?.id || '');
  const [transTo, setTransTo] = useState<string>(automaton.states[0]?.id || '');
  const [transSymbol, setTransSymbol] = useState<string>('0');

  // Alphabet string
  const [alphabetInput, setAlphabetInput] = useState<string>(automaton.alphabet.join(', '));

  const validationIssues = validateAutomaton(automaton);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);

        if (!parsed.states || !Array.isArray(parsed.states) || !parsed.transitions || !Array.isArray(parsed.transitions)) {
          setUploadError('Invalid Automaton JSON file: Must contain "states" and "transitions" arrays.');
          return;
        }

        const id = parsed.id || `uploaded_${Date.now()}`;
        const name = parsed.name || file.name.replace('.json', '');
        const type = (parsed.type === 'ENFA' || parsed.type === 'NFA' || parsed.type === 'DFA') ? parsed.type : 'DFA';
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
          name,
          description: parsed.description || 'Uploaded automaton file',
          type,
          alphabet,
          states: processedStates,
          transitions: parsed.transitions.map((t: any, idx: number) => ({
            id: String(t.id || `t_${idx}`),
            from: String(t.from),
            to: String(t.to),
            symbol: String(t.symbol || '0'),
          })),
          testStrings: Array.isArray(parsed.testStrings) ? parsed.testStrings : ['0', '1', '01']
        };

        setAutomaton(newAutomaton);
        setAlphabetInput(newAutomaton.alphabet.join(', '));
        setTransFrom(newAutomaton.states[0]?.id || '');
        setTransTo(newAutomaton.states[0]?.id || '');
        setUploadError(null);
      } catch (err: any) {
        setUploadError(`Failed to parse file: ${err.message}`);
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(automaton, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${automaton.id || 'automaton'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handlers
  const handleAddState = () => {
    const nextIdx = automaton.states.length;
    const newId = `q${nextIdx}`;
    const newState: AutomatonState = {
      id: newId,
      label: newId,
      x: 150 + (nextIdx % 4) * 160,
      y: 150 + Math.floor(nextIdx / 4) * 120,
      isStart: automaton.states.length === 0,
      isFinal: false
    };

    setAutomaton({
      ...automaton,
      states: [...automaton.states, newState]
    });
  };

  const handleUpdateStatePos = (stateId: string, x: number, y: number) => {
    setAutomaton({
      ...automaton,
      states: automaton.states.map((s) => (s.id === stateId ? { ...s, x, y } : s))
    });
  };

  const handleToggleStart = (stateId: string) => {
    setAutomaton({
      ...automaton,
      states: automaton.states.map((s) => ({
        ...s,
        isStart: s.id === stateId
      }))
    });
  };

  const handleToggleFinal = (stateId: string) => {
    setAutomaton({
      ...automaton,
      states: automaton.states.map((s) =>
        s.id === stateId ? { ...s, isFinal: !s.isFinal } : s
      )
    });
  };

  const handleDeleteState = (stateId: string) => {
    setAutomaton({
      ...automaton,
      states: automaton.states.filter((s) => s.id !== stateId),
      transitions: automaton.transitions.filter((t) => t.from !== stateId && t.to !== stateId)
    });
    if (selectedStateId === stateId) setSelectedStateId(null);
  };

  const handleAddTransition = () => {
    if (!transFrom || !transTo || !transSymbol) return;
    const newTrans: Transition = {
      id: `t_${Date.now()}`,
      from: transFrom,
      to: transTo,
      symbol: transSymbol.trim()
    };

    setAutomaton({
      ...automaton,
      transitions: [...automaton.transitions, newTrans]
    });
  };

  const handleDeleteTransition = (transId: string) => {
    setAutomaton({
      ...automaton,
      transitions: automaton.transitions.filter((t) => t.id !== transId)
    });
  };

  const handleAlphabetChange = (text: string) => {
    setAlphabetInput(text);
    const symbols = text
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setAutomaton({ ...automaton, alphabet: symbols });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Settings */}
      <div className={`border rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 transition-colors shadow-xl ${
        isProjectorMode ? 'bg-white border-2 border-slate-900 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-purple-600/20 text-purple-400 rounded-xl border border-purple-500/30">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <input
              type="text"
              value={automaton.name}
              onChange={(e) => setAutomaton({ ...automaton, name: e.target.value })}
              className={`bg-transparent text-base font-extrabold border-b focus:outline-none ${
                isProjectorMode ? 'text-slate-950 border-slate-400 focus:border-purple-600' : 'text-white border-slate-700 focus:border-purple-500'
              }`}
            />
            <p className={`text-xs font-semibold mt-0.5 ${isProjectorMode ? 'text-slate-700' : 'text-slate-400'}`}>Custom Automaton Visual Architect</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Type Selector */}
          <div className="flex items-center space-x-2">
            <label className={`text-xs font-bold ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>Type:</label>
            <select
              value={automaton.type}
              onChange={(e) =>
                setAutomaton({ ...automaton, type: e.target.value as AutomatonType })
              }
              className={`border rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none ${
                isProjectorMode ? 'bg-slate-100 border-slate-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'
              }`}
            >
              <option value="DFA">DFA</option>
              <option value="NFA">NFA</option>
              <option value="ENFA">ε-NFA</option>
            </select>
          </div>

          {/* Alphabet Input */}
          <div className="flex items-center space-x-2">
            <label className={`text-xs font-bold ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>Alphabet (Σ):</label>
            <input
              type="text"
              value={alphabetInput}
              onChange={(e) => handleAlphabetChange(e.target.value)}
              placeholder="0, 1"
              className={`w-24 border rounded-xl px-2.5 py-1 text-xs font-mono font-bold focus:outline-none ${
                isProjectorMode ? 'bg-slate-100 border-slate-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'
              }`}
            />
          </div>

          <button
            onClick={() => onLoadCustomAutomaton(automaton)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Load in Simulator
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/30 transition-all"
            title="Upload automaton definition JSON file"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload JSON
          </button>

          <button
            onClick={handleExportJson}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              isProjectorMode
                ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Export current automaton to JSON file"
          >
            <Download className="w-3.5 h-3.5" />
            Export JSON
          </button>
        </div>
      </div>

      {uploadError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-between text-rose-400 text-xs font-bold">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button onClick={() => setUploadError(null)} className="underline text-rose-300 hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Main Canvas & Editor Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Graph Canvas */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>
              Drag nodes to rearrange layout
            </span>
            <button
              onClick={handleAddState}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Plus className="w-3.5 h-3.5" /> Add State
            </button>
          </div>

          <AutomatonCanvas
            automaton={automaton}
            onUpdateStatePos={handleUpdateStatePos}
            onSelectState={(id) => setSelectedStateId(id)}
            selectedStateId={selectedStateId}
            height={420}
            isProjectorMode={isProjectorMode}
          />
        </div>

        {/* Sidebar Tools Panel */}
        <div className="lg:col-span-4 space-y-5">
          {/* Add Transition Form */}
          <div className={`border rounded-2xl p-4 space-y-3 shadow-xl transition-colors ${
            isProjectorMode ? 'bg-white border-2 border-slate-900 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-100'
          }`}>
            <h3 className={`text-xs font-black uppercase tracking-wider ${isProjectorMode ? 'text-purple-900' : 'text-purple-400'}`}>
              Add Transition Edge
            </h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label className={`text-[10px] font-bold block mb-1 ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>From:</label>
                <select
                  value={transFrom}
                  onChange={(e) => setTransFrom(e.target.value)}
                  className={`w-full border rounded-lg p-1.5 font-mono font-bold ${
                    isProjectorMode ? 'bg-slate-100 border-slate-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'
                  }`}
                >
                  {automaton.states.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`text-[10px] font-bold block mb-1 ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>Symbol:</label>
                <input
                  type="text"
                  value={transSymbol}
                  onChange={(e) => setTransSymbol(e.target.value)}
                  placeholder="0 or ε"
                  className={`w-full border rounded-lg p-1.5 font-mono font-bold text-center ${
                    isProjectorMode ? 'bg-slate-100 border-slate-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`text-[10px] font-bold block mb-1 ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>To:</label>
                <select
                  value={transTo}
                  onChange={(e) => setTransTo(e.target.value)}
                  className={`w-full border rounded-lg p-1.5 font-mono font-bold ${
                    isProjectorMode ? 'bg-slate-100 border-slate-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'
                  }`}
                >
                  {automaton.states.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleAddTransition}
              className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-purple-600/20"
            >
              <Plus className="w-3.5 h-3.5" /> Add Transition
            </button>
          </div>

          {/* State List & Properties */}
          <div className={`border rounded-2xl p-4 space-y-3 shadow-xl max-h-60 overflow-y-auto transition-colors ${
            isProjectorMode ? 'bg-white border-2 border-slate-900 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-100'
          }`}>
            <h3 className={`text-xs font-black uppercase tracking-wider ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>
              States ({automaton.states.length})
            </h3>
            <div className="space-y-2">
              {automaton.states.map((s) => (
                <div
                  key={s.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                    isProjectorMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className={`font-mono font-black ${isProjectorMode ? 'text-slate-950' : 'text-white'}`}>{s.label}</div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleStart(s.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        s.isStart
                          ? 'bg-sky-600 text-white'
                          : isProjectorMode ? 'bg-slate-200 text-slate-600' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      Start
                    </button>
                    <button
                      onClick={() => handleToggleFinal(s.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        s.isFinal
                          ? 'bg-emerald-600 text-white'
                          : isProjectorMode ? 'bg-slate-200 text-slate-600' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      Final
                    </button>
                    <button
                      onClick={() => handleDeleteState(s.id)}
                      className="text-slate-500 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Validation Warnings Panel */}
          <div className={`border rounded-2xl p-4 space-y-2 shadow-xl transition-colors ${
            isProjectorMode ? 'bg-white border-2 border-slate-900' : 'bg-slate-900 border-slate-800'
          }`}>
            <h3 className={`text-xs font-black uppercase tracking-wider ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>
              Automaton Consistency Check
            </h3>
            {validationIssues.length === 0 ? (
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-extrabold bg-emerald-100 p-2.5 rounded-xl border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Automaton structure is valid.</span>
              </div>
            ) : (
              <div className="space-y-1">
                {validationIssues.map((issue, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-amber-900 font-bold bg-amber-100 p-2 rounded-lg border border-amber-300"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-700" />
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

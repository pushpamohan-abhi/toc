import React, { useState, useEffect, useRef } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { SlideViewer } from './components/SlideViewer';
import { AutomatonCanvas } from './components/AutomatonCanvas';
import { SimulationControls } from './components/SimulationControls';
import { BatchTester } from './components/BatchTester';
import { NfaToDfaConverterView } from './components/NfaToDfaConverterView';
import { DfaMinimizerView } from './components/DfaMinimizerView';
import { CfgParseTreeView } from './components/CfgParseTreeView';
import { PdaSimulatorView } from './components/PdaSimulatorView';
import { TuringMachineSimulatorView } from './components/TuringMachineSimulatorView';
import { AutomatonBuilder } from './components/AutomatonBuilder';
import { AiTutorQuiz } from './components/AiTutorQuiz';

import { MODULE_1_SLIDES } from './data/module1Notes';
import { MODULE_2_SLIDES } from './data/module2Notes';
import { MODULE_3_SLIDES } from './data/module3Notes';
import { MODULE_4_SLIDES } from './data/module4Notes';
import { MODULE_5_SLIDES } from './data/module5Notes';

import { PRESET_AUTOMATA } from './data/presetAutomata';
import { AutomatonData, SimulationStep } from './types';
import { simulateAutomaton } from './utils/automataEngine';

import { PlayCircle, HelpCircle, X, Sparkles, Code2, BookOpen, Layers, Upload } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('slides');
  const [selectedModule, setSelectedModule] = useState<number>(1);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isProjectorMode, setIsProjectorMode] = useState(false);

  // Determine current module slides
  const slidesForCurrentModule = 
    selectedModule === 2 ? MODULE_2_SLIDES :
    selectedModule === 3 ? MODULE_3_SLIDES :
    selectedModule === 4 ? MODULE_4_SLIDES :
    selectedModule === 5 ? MODULE_5_SLIDES :
    MODULE_1_SLIDES;

  // Custom Uploaded Automata & Main Selected Automaton
  const [customAutomata, setCustomAutomata] = useState<AutomatonData[]>([]);
  const mainFileInputRef = useRef<HTMLInputElement>(null);

  const allAvailableAutomata = [...customAutomata, ...PRESET_AUTOMATA];
  const [selectedAutomaton, setSelectedAutomaton] = useState<AutomatonData>(PRESET_AUTOMATA[0]);

  // Simulation State
  const [inputString, setInputString] = useState<string>(
    selectedAutomaton.testStrings?.[0] || 'Push'
  );
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(600);

  // Selected state on canvas
  const [selectedCanvasStateId, setSelectedCanvasStateId] = useState<string | null>(null);

  // Calculate simulation steps array
  const steps: SimulationStep[] = simulateAutomaton(selectedAutomaton, inputString);

  // Auto-play interval timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speedMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speedMs, steps.length]);

  // Handle switching preset automaton
  const handleSelectPreset = (id: string) => {
    const auto = allAvailableAutomata.find((a) => a.id === id) || PRESET_AUTOMATA[0];
    setSelectedAutomaton(auto);
    setInputString(auto.testStrings?.[0] || '');
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleFileUploadMain = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.states || !Array.isArray(parsed.states) || !parsed.transitions || !Array.isArray(parsed.transitions)) {
          alert('Invalid Automaton JSON file: Must contain "states" and "transitions" arrays.');
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
          testStrings: Array.isArray(parsed.testStrings) ? parsed.testStrings : ['0', '1', '01']
        };

        setCustomAutomata((prev) => [newAutomaton, ...prev]);
        setSelectedAutomaton(newAutomaton);
        setInputString(newAutomaton.testStrings?.[0] || '');
        setCurrentStepIndex(0);
        setIsPlaying(false);
      } catch (err: any) {
        alert(`Failed to parse file: ${err.message}`);
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  const handleUpdateStatePos = (stateId: string, x: number, y: number) => {
    setSelectedAutomaton((prev) => ({
      ...prev,
      states: prev.states.map((s) => (s.id === stateId ? { ...s, x, y } : s))
    }));
  };

  const currentStep = steps[currentStepIndex] || steps[0];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isProjectorMode ? 'bg-slate-200 text-slate-950' : 'bg-slate-950 text-slate-100'
    } selection:bg-indigo-500 selection:text-white`}>
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        onOpenHelp={() => setShowHelpModal(true)}
        isProjectorMode={isProjectorMode}
        setIsProjectorMode={setIsProjectorMode}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: LECTURE SLIDES (MODULES 1 TO 5) */}
        {activeTab === 'slides' && (
          <SlideViewer
            slides={slidesForCurrentModule}
            isProjectorMode={isProjectorMode}
            onSelectAutomatonForSimulation={(auto) => {
              setSelectedAutomaton(auto);
              setInputString(auto.testStrings?.[0] || '');
              setCurrentStepIndex(0);
              setIsPlaying(false);
              setActiveTab('simulator');
            }}
          />
        )}

        {/* TAB 2: DFA / NFA SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* Top Selector & Automaton Meta */}
            <div className={`border rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 transition-colors shadow-xl ${
              isProjectorMode ? 'bg-white border-2 border-slate-900 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className={`text-base font-extrabold tracking-tight flex items-center gap-2 ${
                    isProjectorMode ? 'text-slate-950' : 'text-white'
                  }`}>
                    {selectedAutomaton.name}
                    <span className="bg-indigo-600 text-white text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
                      {selectedAutomaton.type}
                    </span>
                  </h2>
                  <p className={`text-xs font-semibold mt-0.5 ${isProjectorMode ? 'text-slate-700' : 'text-slate-400'}`}>
                    {selectedAutomaton.description}
                  </p>
                </div>
              </div>

              {/* Preset Automata Selector & File Upload */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2">
                  <label className={`text-xs font-bold ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>Load Automaton:</label>
                  <select
                    value={selectedAutomaton.id}
                    onChange={(e) => handleSelectPreset(e.target.value)}
                    className={`border rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none ${
                      isProjectorMode ? 'bg-slate-100 border-slate-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  >
                    {allAvailableAutomata.map((a) => (
                      <option key={a.id} value={a.id}>
                        [{a.type}] {a.name}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  type="file"
                  ref={mainFileInputRef}
                  onChange={handleFileUploadMain}
                  accept=".json"
                  className="hidden"
                />

                <button
                  onClick={() => mainFileInputRef.current?.click()}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-all"
                  title="Upload custom NFA / DFA definition JSON file"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload File
                </button>
              </div>
            </div>

            {/* Visual Canvas & Automaton Formal Tuple */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Graph Canvas & Stepper Tape Controls */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 ${
                    isProjectorMode ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    Active Computational Graph (Transition Diagram)
                  </span>
                  <span className={`text-xs font-mono font-black ${isProjectorMode ? 'text-indigo-900' : 'text-indigo-400'}`}>
                    Active States: {currentStep?.currentStates.length ? `{${currentStep.currentStates.map(id => selectedAutomaton.states.find(s=>s.id===id)?.label || id).join(', ')}}` : '∅'}
                  </span>
                </div>

                <AutomatonCanvas
                  automaton={selectedAutomaton}
                  activeStateIds={currentStep?.currentStates}
                  activeTransitionIds={currentStep?.activeTransitionIds}
                  onUpdateStatePos={handleUpdateStatePos}
                  onSelectState={(id) => setSelectedCanvasStateId(id)}
                  selectedStateId={selectedCanvasStateId}
                  height={400}
                  isProjectorMode={isProjectorMode}
                />

                {/* Stepper Tape Controls (Placed right next to Transition Diagram) */}
                <SimulationControls
                  inputString={inputString}
                  setInputString={setInputString}
                  sampleStrings={selectedAutomaton.testStrings}
                  automaton={selectedAutomaton}
                  steps={steps}
                  currentStepIndex={currentStepIndex}
                  setCurrentStepIndex={setCurrentStepIndex}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  speedMs={speedMs}
                  setSpeedMs={setSpeedMs}
                  isProjectorMode={isProjectorMode}
                />
              </div>

              {/* Right Side: Formal Tuple Card & Batch Test Suite */}
              <div className="lg:col-span-4 space-y-4">
                <div className={`border rounded-2xl p-5 space-y-4 shadow-xl transition-colors ${
                  isProjectorMode ? 'bg-white border-2 border-slate-900 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-100'
                }`}>
                  <div className={`flex items-center space-x-2 border-b pb-3 ${
                    isProjectorMode ? 'border-slate-300' : 'border-slate-800'
                  }`}>
                    <Code2 className={`w-4 h-4 ${isProjectorMode ? 'text-indigo-800' : 'text-indigo-400'}`} />
                    <h3 className={`font-black text-sm ${isProjectorMode ? 'text-slate-950' : 'text-white'}`}>5-Tuple Definition (A)</h3>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono">
                    <div className={`p-2.5 rounded-xl border ${
                      isProjectorMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <span className={`block text-[10px] uppercase font-sans font-bold ${
                        isProjectorMode ? 'text-slate-700' : 'text-slate-500'
                      }`}>Alphabet (Σ):</span>
                      <span className={`font-black ${isProjectorMode ? 'text-indigo-900' : 'text-indigo-300'}`}>{`{${selectedAutomaton.alphabet.join(', ')}}`}</span>
                    </div>

                    <div className={`p-2.5 rounded-xl border ${
                      isProjectorMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <span className={`block text-[10px] uppercase font-sans font-bold ${
                        isProjectorMode ? 'text-slate-700' : 'text-slate-500'
                      }`}>States Set (Q):</span>
                      <span className={`font-black ${isProjectorMode ? 'text-slate-950' : 'text-slate-200'}`}>{`{${selectedAutomaton.states.map((s) => s.label).join(', ')}}`}</span>
                    </div>

                    <div className={`p-2.5 rounded-xl border ${
                      isProjectorMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <span className={`block text-[10px] uppercase font-sans font-bold ${
                        isProjectorMode ? 'text-slate-700' : 'text-slate-500'
                      }`}>Start State (q0):</span>
                      <span className={`font-extrabold ${isProjectorMode ? 'text-sky-800' : 'text-sky-400'}`}>
                        {selectedAutomaton.states.find((s) => s.isStart)?.label || 'None'}
                      </span>
                    </div>

                    <div className={`p-2.5 rounded-xl border ${
                      isProjectorMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <span className={`block text-[10px] uppercase font-sans font-bold ${
                        isProjectorMode ? 'text-slate-700' : 'text-slate-500'
                      }`}>Accepting States (F):</span>
                      <span className={`font-extrabold ${isProjectorMode ? 'text-emerald-800' : 'text-emerald-400'}`}>
                        {`{${selectedAutomaton.states.filter((s) => s.isFinal).map((s) => s.label).join(', ')}}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Batch Test Suite */}
                <BatchTester
                  automaton={selectedAutomaton}
                  isProjectorMode={isProjectorMode}
                  onSelectString={(str) => {
                    setInputString(str);
                    setIsPlaying(false);
                    setCurrentStepIndex(0);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NFA -> DFA CONVERTER */}
        {activeTab === 'converter' && (
          <NfaToDfaConverterView
            isProjectorMode={isProjectorMode}
            onLoadConvertedDfa={(dfa) => {
              setSelectedAutomaton(dfa);
              setInputString(dfa.testStrings?.[0] || '01');
              setCurrentStepIndex(0);
              setIsPlaying(false);
              setActiveTab('simulator');
            }}
          />
        )}

        {/* TAB 4: DFA MINIMIZER (MODULE 2) */}
        {activeTab === 'minimizer' && <DfaMinimizerView isProjectorMode={isProjectorMode} />}

        {/* TAB 5: CFG & PARSE TREES (MODULE 3) */}
        {activeTab === 'cfg' && <CfgParseTreeView isProjectorMode={isProjectorMode} />}

        {/* TAB 6: PDA STACK SIMULATOR (MODULE 4) */}
        {activeTab === 'pda' && <PdaSimulatorView isProjectorMode={isProjectorMode} />}

        {/* TAB 7: TURING MACHINE SIMULATOR (MODULE 5) */}
        {activeTab === 'tm' && <TuringMachineSimulatorView isProjectorMode={isProjectorMode} />}

        {/* TAB 8: AUTOMATON BUILDER */}
        {activeTab === 'builder' && (
          <AutomatonBuilder
            isProjectorMode={isProjectorMode}
            onLoadCustomAutomaton={(auto) => {
              setSelectedAutomaton(auto);
              setInputString(auto.testStrings?.[0] || '0');
              setCurrentStepIndex(0);
              setIsPlaying(false);
              setActiveTab('simulator');
            }}
          />
        )}

        {/* TAB 9: QUIZ & AI TUTOR */}
        {activeTab === 'quiz' && <AiTutorQuiz isProjectorMode={isProjectorMode} />}
      </main>

      {/* Footer */}
      <footer className={`border-t py-4 text-center text-xs font-semibold ${
        isProjectorMode ? 'bg-slate-300 border-slate-400 text-slate-800' : 'bg-slate-950 border-slate-900 text-slate-500'
      }`}>
        Automata Theory Module 1 Learning Platform &bull; DFA / NFA / ε-NFA Interactive Simulator Engine
      </footer>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative ${
            isProjectorMode ? 'bg-white border-2 border-slate-900 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-100'
          }`}>
            <button
              onClick={() => setShowHelpModal(false)}
              className={`absolute top-4 right-4 p-2 rounded-xl ${
                isProjectorMode ? 'bg-slate-200 text-slate-900 hover:bg-slate-300' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-extrabold ${isProjectorMode ? 'text-slate-950' : 'text-white'}`}>Automata Theory Platform Guide</h3>
            </div>

            <div className="space-y-3 text-xs leading-relaxed font-medium">
              <div className={`p-3 rounded-xl border space-y-1 ${
                isProjectorMode ? 'bg-slate-100 border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                <strong className={`block font-extrabold ${isProjectorMode ? 'text-indigo-900' : 'text-indigo-400'}`}>1. Module 1 Slides:</strong>
                <p>Browse textbook lecture slides, math definitions, and embedded mini-widgets. Click "Open Simulator" on any slide to jump directly to its automaton.</p>
              </div>

              <div className={`p-3 rounded-xl border space-y-1 ${
                isProjectorMode ? 'bg-slate-100 border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                <strong className={`block font-extrabold ${isProjectorMode ? 'text-indigo-900' : 'text-indigo-400'}`}>2. DFA / NFA Simulator:</strong>
                <p>Select any preset from Module 1 notes or your custom automaton. Step through strings letter-by-letter with glowing active state highlights.</p>
              </div>

              <div className={`p-3 rounded-xl border space-y-1 ${
                isProjectorMode ? 'bg-slate-100 border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                <strong className={`block font-extrabold ${isProjectorMode ? 'text-indigo-900' : 'text-indigo-400'}`}>3. NFA → DFA Subset Converter:</strong>
                <p>Visualize the Subset Construction algorithm trace table side-by-side with original and converted graphs.</p>
              </div>

              <div className={`p-3 rounded-xl border space-y-1 ${
                isProjectorMode ? 'bg-slate-100 border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                <strong className={`block font-extrabold ${isProjectorMode ? 'text-indigo-900' : 'text-indigo-400'}`}>4. Automaton Builder &amp; AI Tutor:</strong>
                <p>Build custom machines visually and ask Gemini AI questions about automata theory topics.</p>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

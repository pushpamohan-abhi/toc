import React from 'react';
import { Presentation, PlayCircle, GitMerge, Wrench, GraduationCap, HelpCircle, Monitor, Sun, Layers, Network, Play } from 'lucide-react';

export type TabType = 'slides' | 'simulator' | 'converter' | 'minimizer' | 'cfg' | 'pda' | 'tm' | 'builder' | 'quiz';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedModule: number;
  setSelectedModule: (mod: number) => void;
  isProjectorMode: boolean;
  setIsProjectorMode: (val: boolean) => void;
  onOpenHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedModule,
  setSelectedModule,
  isProjectorMode,
  setIsProjectorMode,
  onOpenHelp,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'slides', label: 'Lecture Slides', icon: <Presentation className="w-4 h-4" /> },
    { id: 'simulator', label: 'DFA / NFA Simulator', icon: <PlayCircle className="w-4 h-4" /> },
    { id: 'converter', label: 'NFA → DFA', icon: <GitMerge className="w-4 h-4" /> },
    { id: 'minimizer', label: 'DFA Minimizer', icon: <Layers className="w-4 h-4" /> },
    { id: 'cfg', label: 'CFG / Trees', icon: <Network className="w-4 h-4" /> },
    { id: 'pda', label: 'PDA Stack', icon: <Layers className="w-4 h-4" /> },
    { id: 'tm', label: 'Turing Machine', icon: <Play className="w-4 h-4" /> },
    { id: 'builder', label: 'Automaton Builder', icon: <Wrench className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz & Tutor', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  return (
    <header className={`border-b sticky top-0 z-50 transition-colors ${
      isProjectorMode
        ? 'bg-slate-900 text-white border-slate-700 shadow-md'
        : 'bg-slate-900 text-white border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Module Selector */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-500/20 text-white">
              FA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base tracking-tight text-slate-100 hidden sm:inline">
                  Automata Theory
                </h1>
                <select
                  value={selectedModule}
                  onChange={(e) => {
                    setSelectedModule(Number(e.target.value));
                    if (activeTab !== 'slides') setActiveTab('slides');
                  }}
                  className="bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 text-xs rounded-lg px-2.5 py-1 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
                >
                  <option value={1} className="bg-slate-900 text-white">Module 1: Finite Automata (DFA/NFA)</option>
                  <option value={2} className="bg-slate-900 text-white">Module 2: Regular Expressions &amp; Minimization</option>
                  <option value={3} className="bg-slate-900 text-white">Module 3: CFG, Parse Trees &amp; Normal Forms</option>
                  <option value={4} className="bg-slate-900 text-white">Module 4: Pushdown Automata (PDA)</option>
                  <option value={5} className="bg-slate-900 text-white">Module 5: Turing Machines &amp; Compilers</option>
                </select>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto py-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 ring-2 ring-indigo-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span className="hidden xl:inline">{item.label}</span>
                </button>
              );
            })}

            {/* Projector Mode Toggle Button */}
            <button
              onClick={() => setIsProjectorMode(!isProjectorMode)}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                isProjectorMode
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-400/40 animate-pulse'
                  : 'bg-slate-800 text-amber-300 border-amber-500/30 hover:bg-slate-700'
              }`}
              title="Toggle Classroom Projector High-Contrast Mode"
            >
              {isProjectorMode ? <Sun className="w-4 h-4 fill-current" /> : <Monitor className="w-4 h-4" />}
            </button>

            <button
              onClick={onOpenHelp}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-0.5"
              title="Help & Key Guides"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

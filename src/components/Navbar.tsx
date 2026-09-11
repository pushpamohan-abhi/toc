import React from 'react';
import { Presentation, PlayCircle, GitMerge, Wrench, GraduationCap, HelpCircle, Monitor, Sun } from 'lucide-react';

export type TabType = 'slides' | 'simulator' | 'converter' | 'builder' | 'quiz';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isProjectorMode: boolean;
  setIsProjectorMode: (val: boolean) => void;
  onOpenHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isProjectorMode,
  setIsProjectorMode,
  onOpenHelp,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'slides', label: 'Module 1 Slides', icon: <Presentation className="w-4 h-4" /> },
    { id: 'simulator', label: 'DFA / NFA Simulator', icon: <PlayCircle className="w-4 h-4" /> },
    { id: 'converter', label: 'NFA → DFA Converter', icon: <GitMerge className="w-4 h-4" /> },
    { id: 'builder', label: 'Automaton Builder', icon: <Wrench className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz & AI Tutor', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  return (
    <header className={`border-b sticky top-0 z-50 transition-colors ${
      isProjectorMode
        ? 'bg-slate-900 text-white border-slate-700 shadow-md'
        : 'bg-slate-900 text-white border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-500/20 text-white">
              FA
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-slate-100 flex items-center gap-2">
                Automata Theory <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-0.5 rounded-full font-medium border border-indigo-500/30">Module 1</span>
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Interactive Lecture Slides &amp; DFA/NFA Engine
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 ring-2 ring-indigo-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}

            {/* Projector Mode Toggle Button */}
            <button
              onClick={() => setIsProjectorMode(!isProjectorMode)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                isProjectorMode
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-400/40 animate-pulse'
                  : 'bg-slate-800 text-amber-300 border-amber-500/30 hover:bg-slate-700'
              }`}
              title="Toggle Classroom Projector High-Contrast Mode"
            >
              {isProjectorMode ? <Sun className="w-4 h-4 fill-current" /> : <Monitor className="w-4 h-4" />}
              <span className="hidden lg:inline">{isProjectorMode ? 'Projector Mode ON' : 'Projector Mode'}</span>
            </button>

            <button
              onClick={onOpenHelp}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
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

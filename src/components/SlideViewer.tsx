import React, { useState } from 'react';
import { SlideContent, AutomatonData } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  BookOpen,
  Search,
  Grid,
  Sparkles,
  ExternalLink,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { PRESET_AUTOMATA } from '../data/presetAutomata';

interface SlideViewerProps {
  slides: SlideContent[];
  onSelectAutomatonForSimulation: (automaton: AutomatonData) => void;
  isProjectorMode?: boolean;
}

function formatMathFormula(formula: string): string {
  return formula
    .replace(/\\Rightarrow/g, '⇒')
    .replace(/\\rightarrow/g, '→')
    .replace(/\\Sigma/g, 'Σ')
    .replace(/\\delta/g, 'δ')
    .replace(/\\epsilon/g, 'ε')
    .replace(/\\in/g, '∈')
    .replace(/\\subseteq/g, '⊆')
    .replace(/\\setminus/g, '\\')
    .replace(/\\cup/g, '∪')
    .replace(/\\cap/g, '∩')
    .replace(/\\neq/g, '≠')
    .replace(/\\emptyset/g, '∅')
    .replace(/\\quad/g, '   ')
    .replace(/\\qquad/g, '     ')
    .replace(/\\text\{-}/g, '-')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\mathcal\{P\}/g, '𝒫')
    .replace(/\\pmod\{([^}]+)\}/g, ' (mod $1)')
    .replace(/\\hat\{\\delta\}/g, 'δ̂')
    .replace(/\\bigcup_\{k=0\}\^\{\\infty\}/g, '⋃ (k=0 to ∞)')
    .replace(/\\bigcup_\{p \\in S\}/g, '⋃_{p ∈ S}')
    .replace(/\\times/g, '×')
    .replace(/\\\s+/g, ' ')
    .replace(/\\\{/g, '{')
    .replace(/\\\}/g, '}')
    .replace(/\s+/g, ' ')
    .trim();
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  slides,
  onSelectAutomatonForSimulation,
  isProjectorMode = false,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGridDrawer, setShowGridDrawer] = useState(false);

  // Interactive Mini-Demo states for embedded slide widgets
  const [switchState, setSwitchState] = useState<'off' | 'on'>('off');
  const [thenInput, setThenInput] = useState('');
  const [divNumber, setDivNumber] = useState('110'); // 6 in binary
  const [epsStateInput, setEpsStateInput] = useState('q0');

  const currentSlide = slides[currentSlideIndex];

  const filteredSlides = slides.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.bullets.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // Find matching preset automaton for slide
  const presetAuto = currentSlide.presetAutomatonId
    ? PRESET_AUTOMATA.find((a) => a.id === currentSlide.presetAutomatonId)
    : null;

  return (
    <div
      className={`transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950 p-6 flex flex-col justify-between overflow-y-auto'
          : 'space-y-6'
      }`}
    >
      {/* Top Controls Bar */}
      <div className={`border rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 transition-colors shadow-xl ${
        isProjectorMode
          ? 'bg-white border-2 border-slate-900 text-slate-950'
          : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        {/* Category & Section info */}
        <div className="flex items-center space-x-3">
          <span className={`text-sm sm:text-base px-4 py-1.5 rounded-full border font-black flex items-center gap-2 ${
            isProjectorMode
              ? 'bg-indigo-100 text-indigo-950 border-indigo-500'
              : 'bg-indigo-600/20 text-indigo-200 border-indigo-500/40'
          }`}>
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
            {currentSlide.category}
          </span>
          <span className={`text-sm sm:text-base font-mono font-black hidden sm:inline ${
            isProjectorMode ? 'text-slate-900' : 'text-slate-300'
          }`}>
            {currentSlide.textbookSection}
          </span>
        </div>

        {/* Center Search & Grid Toggle */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className={`w-4 h-4 absolute left-3.5 top-3 ${isProjectorMode ? 'text-slate-700' : 'text-slate-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Module 1 notes..."
              className={`border rounded-xl pl-10 pr-3 py-2 text-sm font-bold focus:outline-none focus:border-indigo-500 w-48 sm:w-64 ${
                isProjectorMode
                  ? 'bg-slate-100 border-slate-400 text-slate-950 placeholder-slate-600'
                  : 'bg-slate-950 border-slate-800 text-white'
              }`}
            />
          </div>

          <button
            onClick={() => setShowGridDrawer(!showGridDrawer)}
            className={`p-2.5 rounded-xl transition-colors ${
              isProjectorMode ? 'bg-slate-200 hover:bg-slate-300 text-slate-950 border border-slate-400' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
            title="Overview Grid"
          >
            <Grid className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-2.5 rounded-xl transition-colors ${
              isProjectorMode ? 'bg-slate-200 hover:bg-slate-300 text-slate-950 border border-slate-400' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Presentation'}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Slide Counter */}
        <div className={`text-sm sm:text-base font-mono font-black ${isProjectorMode ? 'text-slate-950' : 'text-slate-300'}`}>
          Slide <span className="text-indigo-600 text-lg font-black">{currentSlideIndex + 1}</span> / {slides.length}
        </div>
      </div>

      {/* Slide Thumbnails Drawer Modal */}
      {showGridDrawer && (
        <div className={`border rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-h-80 overflow-y-auto ${
          isProjectorMode ? 'bg-white border-2 border-slate-900' : 'bg-slate-900 border-slate-800'
        }`}>
          {filteredSlides.map((slide) => (
            <button
              key={slide.id}
              onClick={() => {
                const realIndex = slides.findIndex((s) => s.id === slide.id);
                setCurrentSlideIndex(realIndex);
                setShowGridDrawer(false);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                slides[currentSlideIndex].id === slide.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-bold'
                  : isProjectorMode
                  ? 'bg-slate-100 border-slate-300 text-slate-900 hover:border-slate-500 font-semibold'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white font-semibold'
              }`}
            >
              <div className="text-xs font-mono font-black uppercase">
                Slide {slide.number}
              </div>
              <div className="text-sm font-bold truncate mt-1">{slide.title}</div>
            </button>
          ))}
        </div>
      )}

      {/* Main Slide Presentation Card */}
      <div className={`border rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl min-h-[540px] flex flex-col justify-between relative overflow-hidden transition-colors ${
        isProjectorMode
          ? 'bg-white border-4 border-slate-900 text-slate-950'
          : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        {/* Subtle Slide Accent Gradient */}
        {!isProjectorMode && (
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        )}

        <div className="space-y-8 relative z-10">
          {/* Slide Header */}
          <div className={`border-b pb-5 flex flex-wrap items-center justify-between gap-4 ${
            isProjectorMode ? 'border-slate-300' : 'border-slate-800'
          }`}>
            <div>
              <span className={`text-sm sm:text-base font-mono font-black uppercase tracking-widest ${
                isProjectorMode ? 'text-indigo-900' : 'text-indigo-400'
              }`}>
                Slide {currentSlide.number} &bull; {currentSlide.category}
              </span>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-1.5 leading-tight ${
                isProjectorMode ? 'text-slate-950' : 'text-white'
              }`}>
                {currentSlide.title}
              </h2>
            </div>

            {presetAuto && (
              <button
                onClick={() => onSelectAutomatonForSimulation(presetAuto)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-black flex items-center gap-2.5 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                Open in Simulator
              </button>
            )}
          </div>

          {/* Bullet Points */}
          <div className="space-y-5">
            {currentSlide.bullets.map((bullet, idx) => (
              <div key={idx} className={`flex items-start space-x-4 text-lg sm:text-xl lg:text-2xl leading-relaxed ${
                isProjectorMode ? 'text-slate-950 font-semibold' : 'text-slate-100 font-medium'
              }`}>
                <span className={`w-3.5 h-3.5 rounded-full mt-3 shrink-0 ${
                  isProjectorMode ? 'bg-indigo-800' : 'bg-indigo-400'
                }`} />
                <p>{bullet}</p>
              </div>
            ))}
          </div>

          {/* Formula Callout Boxes */}
          {currentSlide.formulas && currentSlide.formulas.length > 0 && (
            <div className={`border rounded-2xl p-6 space-y-3 ${
              isProjectorMode
                ? 'bg-slate-50 border-2 border-indigo-600 shadow-md'
                : 'bg-slate-950 border-indigo-500/40 shadow-xl'
            }`}>
              <span className={`text-sm sm:text-base font-mono font-black uppercase tracking-wider block ${
                isProjectorMode ? 'text-indigo-950' : 'text-indigo-400'
              }`}>
                Mathematical Formulas &amp; Formal Definitions:
              </span>
              <div className="space-y-2.5">
                {currentSlide.formulas.map((form, idx) => (
                  <div key={idx} className={`font-mono text-lg sm:text-xl md:text-2xl font-black px-5 py-3 rounded-xl border ${
                    isProjectorMode
                      ? 'text-indigo-950 bg-white border-indigo-400 shadow-sm'
                      : 'text-cyan-300 bg-slate-900 border-slate-800'
                  }`}>
                    {formatMathFormula(form)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Terms */}
          {currentSlide.keyTerms && currentSlide.keyTerms.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentSlide.keyTerms.map((kt, idx) => (
                <div key={idx} className={`border rounded-2xl p-4 space-y-1.5 ${
                  isProjectorMode
                    ? 'bg-slate-50 border-slate-300 text-slate-950'
                    : 'bg-slate-950/90 border-slate-800 text-slate-200'
                }`}>
                  <span className="text-sm sm:text-base font-black text-purple-600 dark:text-purple-400 uppercase tracking-wide block">
                    {kt.term}
                  </span>
                  <p className="text-base sm:text-lg font-medium">{kt.definition}</p>
                </div>
              ))}
            </div>
          )}

          {/* Example Box */}
          {currentSlide.exampleBox && (
            <div className={`border rounded-2xl p-5 space-y-2.5 ${
              isProjectorMode
                ? 'bg-emerald-50 border-2 border-emerald-600 text-slate-950'
                : 'bg-slate-950 border-emerald-500/30 text-slate-200'
            }`}>
              <h4 className="text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                {currentSlide.exampleBox.title}
              </h4>
              <p className="text-base sm:text-lg lg:text-xl whitespace-pre-line font-mono font-bold leading-relaxed">
                {currentSlide.exampleBox.description}
              </p>
            </div>
          )}

          {/* Embedded Interactive Minigames / Widgets */}
          {currentSlide.interactiveType === 'switch' && (
            <div className={`border rounded-2xl p-6 space-y-4 ${
              isProjectorMode
                ? 'bg-indigo-50 border-2 border-indigo-600 text-slate-950'
                : 'bg-slate-950 border-indigo-500/40 text-slate-100'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-black text-indigo-800 dark:text-indigo-300 uppercase tracking-wider">
                  Interactive Demo: On/Off Switch Automaton
                </span>
                <span className="text-base font-mono font-bold">Current State: <strong className={switchState === 'on' ? 'text-emerald-600 dark:text-emerald-400 text-lg' : 'text-slate-600 dark:text-slate-300 text-lg'}>{switchState.toUpperCase()}</strong></span>
              </div>

              <div className="flex items-center justify-center space-x-10 py-4">
                <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center font-black text-base sm:text-lg transition-all ${switchState === 'off' ? 'bg-indigo-600 text-white border-indigo-800 ring-4 ring-indigo-500/30 scale-105' : 'bg-slate-200 dark:bg-slate-900 border-slate-400 text-slate-500'}`}>
                  Off (Start)
                </div>

                <button
                  onClick={() => setSwitchState(switchState === 'off' ? 'on' : 'off')}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                >
                  Press [PUSH]
                </button>

                <div className={`w-24 h-24 rounded-full border-4 border-double flex items-center justify-center font-black text-base sm:text-lg transition-all ${switchState === 'on' ? 'bg-emerald-600 text-white border-emerald-800 ring-4 ring-emerald-500/30 scale-105' : 'bg-slate-200 dark:bg-slate-900 border-slate-400 text-slate-500'}`}>
                  On (Final)
                </div>
              </div>
            </div>
          )}

          {currentSlide.interactiveType === 'divisible3' && (
            <div className={`border rounded-2xl p-6 space-y-4 ${
              isProjectorMode
                ? 'bg-sky-50 border-2 border-sky-600 text-slate-950'
                : 'bg-slate-950 border-cyan-500/40 text-slate-100'
            }`}>
              <span className="text-sm sm:text-base font-black text-sky-800 dark:text-cyan-300 uppercase tracking-wider block">
                Interactive Remainder Calculator (Binary Divisible by 3)
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <input
                  type="text"
                  value={divNumber}
                  onChange={(e) => setDivNumber(e.target.value.replace(/[^01]/g, ''))}
                  placeholder="Enter binary string e.g. 110"
                  className="bg-white dark:bg-slate-900 border-2 border-slate-400 dark:border-slate-700 rounded-xl px-4 py-2 text-base font-mono font-bold text-slate-950 dark:text-white focus:outline-none focus:border-cyan-500"
                />
                {(() => {
                  const val = parseInt(divNumber, 2) || 0;
                  const rem = val % 3;
                  return (
                    <div className="text-base font-mono space-x-4 font-bold">
                      <span>Decimal Value = <strong className="text-lg">{val}</strong></span>
                      <span className="text-sky-700 dark:text-cyan-400">State = <strong className="text-lg">q{rem} (Rem {rem})</strong></span>
                      <span className={rem === 0 ? 'text-emerald-700 dark:text-emerald-400 text-lg font-black' : 'text-rose-700 dark:text-rose-400 text-lg font-black'}>
                        {rem === 0 ? 'DIVISIBLE (ACCEPT)' : 'NOT DIVISIBLE'}
                      </span>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Slide Navigation Bar */}
        <div className={`border-t pt-5 flex items-center justify-between relative z-10 ${
          isProjectorMode ? 'border-slate-300' : 'border-slate-800'
        }`}>
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-colors ${
              isProjectorMode
                ? 'bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-slate-950 border border-slate-400'
                : 'bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white'
            }`}
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>

          {/* Quick Jump Dots */}
          <div className="hidden sm:flex items-center space-x-2 overflow-x-auto max-w-md px-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlideIndex === idx
                    ? 'bg-indigo-600 w-8'
                    : isProjectorMode ? 'bg-slate-300 hover:bg-slate-400' : 'bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === slides.length - 1}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-black text-sm sm:text-base flex items-center gap-2 transition-colors shadow-lg shadow-indigo-600/30"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

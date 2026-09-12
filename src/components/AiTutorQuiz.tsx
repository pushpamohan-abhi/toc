import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { ALL_MODULE_QUIZZES } from '../data/quizQuestions';
import { signInWithGoogle, createGoogleFormQuiz, getCachedToken } from '../lib/googleFormsService';
import { GraduationCap, CheckCircle2, XCircle, Bot, Send, HelpCircle, Sparkles, RefreshCw, FileText, ExternalLink, Copy } from 'lucide-react';

interface AiTutorQuizProps {
  isProjectorMode?: boolean;
}

export const AiTutorQuiz: React.FC<AiTutorQuizProps> = ({ isProjectorMode = false }) => {
  const [activeQuizModule, setActiveQuizModule] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  // Google Forms states
  const [isExportingForms, setIsExportingForms] = useState(false);
  const [googleFormUrl, setGoogleFormUrl] = useState<string | null>(null);
  const [formsError, setFormsError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // AI Assistant states
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const moduleNames: Record<number, string> = {
    1: 'Finite Automata & Subset Construction',
    2: 'Regular Expressions & DFA Minimization',
    3: 'CFG, Parse Trees & Normal Forms',
    4: 'Pushdown Automata (PDA)',
    5: 'Turing Machines & Compilers'
  };

  const activeQuestions: QuizQuestion[] = ALL_MODULE_QUIZZES[activeQuizModule] || ALL_MODULE_QUIZZES[1];

  const handleExportGoogleForm = async () => {
    setIsExportingForms(true);
    setFormsError(null);
    try {
      let token = getCachedToken();
      if (!token) {
        const authRes = await signInWithGoogle();
        token = authRes.accessToken;
      }

      const formRes = await createGoogleFormQuiz(
        activeQuizModule,
        moduleNames[activeQuizModule] || 'Automata Theory',
        activeQuestions,
        token
      );

      setGoogleFormUrl(formRes.responderUri);
    } catch (err: any) {
      console.error('Google Forms creation error:', err);
      setFormsError(err?.message || 'Failed to generate Google Form. Make sure popups are allowed for Google Sign In.');
    } finally {
      setIsExportingForms(false);
    }
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    activeQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answerIndex) {
        score++;
      }
    });
    return score;
  };

  const handleAskAi = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userQuery.trim()) return;

    setIsLoadingAi(true);
    setAiResponse(null);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuery, context: `Module ${activeQuizModule} Automata Theory` })
      });
      const data = await res.json();
      setAiResponse(data.answer || 'No response returned.');
    } catch (err) {
      setAiResponse('Failed to connect to AI Assistant server.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Quiz Section */}
      <div className={`border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl transition-colors ${
        isProjectorMode ? 'bg-white border-2 border-slate-900 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-4 ${
          isProjectorMode ? 'border-slate-300' : 'border-slate-800'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className={`text-xl font-extrabold tracking-tight ${isProjectorMode ? 'text-slate-950' : 'text-white'}`}>
                  Module Quiz:
                </h2>
                <select
                  value={activeQuizModule}
                  onChange={(e) => {
                    setActiveQuizModule(Number(e.target.value));
                    setSelectedAnswers({});
                    setShowResults(false);
                  }}
                  className="bg-indigo-600 text-white font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer border border-indigo-400/40"
                >
                  <option value={1}>Module 1: Finite Automata &amp; Subset Construction</option>
                  <option value={2}>Module 2: Regular Expressions &amp; DFA Minimization</option>
                  <option value={3}>Module 3: CFG, Parse Trees &amp; Normal Forms</option>
                  <option value={4}>Module 4: Pushdown Automata (PDA)</option>
                  <option value={5}>Module 5: Turing Machines &amp; Compilers</option>
                </select>
              </div>
              <p className={`text-xs font-semibold mt-1 ${isProjectorMode ? 'text-slate-700' : 'text-slate-400'}`}>
                Test your conceptual understanding and exam question readiness.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportGoogleForm}
              disabled={isExportingForms}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 border border-emerald-400/30"
              title="Create an automated self-grading Google Form Quiz for this module"
            >
              {isExportingForms ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : (
                <FileText className="w-4 h-4 text-white" />
              )}
              <span>{isExportingForms ? 'Creating Form...' : `Create Google Form Quiz`}</span>
            </button>

            {showResults ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm font-extrabold bg-indigo-600 text-white px-4 py-2 rounded-xl">
                  Score: {calculateScore()} / {activeQuestions.length}
                </div>
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setShowResults(false);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResults(true)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
              >
                Submit &amp; View Results
              </button>
            )}
          </div>
        </div>

        {/* Google Forms Export Notification Banner */}
        {googleFormUrl && (
          <div className="p-4 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-2xl space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Google Form Quiz Created for Module {activeQuizModule}!
              </span>
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
              >
                Open Google Form <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-300">
              <span className="truncate flex-1">{googleFormUrl}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(googleFormUrl);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold rounded-lg flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                {copiedLink ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}

        {formsError && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center justify-between">
            <span>⚠️ {formsError}</span>
            <button onClick={() => setFormsError(null)} className="text-slate-400 hover:text-white font-bold ml-2">✕</button>
          </div>
        )}

        {/* Questions Grid */}
        <div className="space-y-6">
          {activeQuestions.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCorrect = selectedAnswers[q.id] === q.answerIndex;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border space-y-4 transition-all ${
                  isProjectorMode
                    ? 'bg-slate-50 border-slate-300'
                    : 'bg-slate-950/80 border-slate-800/80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className={`font-bold text-sm leading-relaxed ${isProjectorMode ? 'text-slate-900' : 'text-slate-200'}`}>
                    <span className="text-indigo-400 font-mono mr-2">Q{idx + 1}.</span>
                    {q.question}
                  </h3>
                  <span className="text-[10px] font-mono font-bold uppercase bg-slate-800 text-indigo-300 px-2.5 py-1 rounded-full border border-slate-700 shrink-0">
                    {q.topic}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q.id] === optIdx;
                    let optionStyle = 'border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800/80';

                    if (isProjectorMode) {
                      optionStyle = 'border-slate-300 bg-white text-slate-900 hover:bg-slate-100';
                    }

                    if (isSelected) {
                      optionStyle = 'border-indigo-500 bg-indigo-600/20 text-white ring-2 ring-indigo-500';
                    }

                    if (showResults) {
                      if (optIdx === q.answerIndex) {
                        optionStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-rose-500 bg-rose-500/20 text-rose-300 font-bold';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => !showResults && handleSelectOption(q.id, optIdx)}
                        disabled={showResults}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {showResults && optIdx === q.answerIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                        )}
                        {showResults && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-xs text-indigo-200">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Tutor Assistant Section */}
      <div className={`border rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl transition-colors ${
        isProjectorMode ? 'bg-white border-2 border-slate-900 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-600/20 text-purple-400 rounded-2xl border border-purple-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-lg font-extrabold tracking-tight ${isProjectorMode ? 'text-slate-950' : 'text-white'}`}>AI Automata Theory Professor</h2>
            <p className={`text-xs font-semibold ${isProjectorMode ? 'text-slate-700' : 'text-slate-400'}`}>
              Ask questions about Module 1 notes, proofs, subset construction, or custom DFA designs.
            </p>
          </div>
        </div>

        {/* Preset Question Suggestions */}
        <div className="flex flex-wrap gap-2">
          <span className={`text-xs font-bold self-center ${isProjectorMode ? 'text-slate-800' : 'text-slate-400'}`}>Quick Questions:</span>
          {[
            'Explain subset construction step-by-step',
            'How to design a DFA for binary numbers divisible by 5?',
            'Difference between DFA and NFA',
            'What is Kleene Star and Positive Closure?'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setUserQuery(prompt);
              }}
              className={`px-3 py-1 border text-xs font-bold rounded-lg transition-colors ${
                isProjectorMode
                  ? 'bg-slate-100 border-slate-400 text-slate-900 hover:bg-slate-200'
                  : 'bg-slate-950 border-slate-800 hover:border-purple-500 text-slate-300 hover:text-white'
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleAskAi} className="flex items-center gap-3">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Type your question about Module 1 here..."
            className={`flex-1 border rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none ${
              isProjectorMode
                ? 'bg-slate-100 border-slate-400 text-slate-950 focus:border-purple-600'
                : 'bg-slate-950 border-slate-800 text-white focus:border-purple-500'
            }`}
          />
          <button
            type="submit"
            disabled={isLoadingAi || !userQuery.trim()}
            className="px-5 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
          >
            {isLoadingAi ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Ask AI
          </button>
        </form>

        {/* AI Answer Box */}
        {aiResponse && (
          <div className={`border rounded-2xl p-5 space-y-2 ${
            isProjectorMode ? 'bg-slate-100 border-2 border-purple-800 text-slate-950' : 'bg-slate-950 border border-purple-500/30 text-slate-200'
          }`}>
            <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
              isProjectorMode ? 'text-purple-900' : 'text-purple-400'
            }`}>
              <Sparkles className="w-4 h-4" /> AI Professor Answer:
            </span>
            <div className="text-sm font-bold leading-relaxed font-sans whitespace-pre-wrap">
              {aiResponse}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

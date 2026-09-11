import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { MODULE_1_QUIZ } from '../data/module1Notes';
import { GraduationCap, CheckCircle2, XCircle, Bot, Send, HelpCircle, Sparkles, RefreshCw } from 'lucide-react';

interface AiTutorQuizProps {
  isProjectorMode?: boolean;
}

export const AiTutorQuiz: React.FC<AiTutorQuizProps> = ({ isProjectorMode = false }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  // AI Assistant states
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    MODULE_1_QUIZ.forEach((q) => {
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
        body: JSON.stringify({ question: userQuery, context: 'Module 1 Automata Theory' })
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
              <h2 className={`text-xl font-extrabold tracking-tight ${isProjectorMode ? 'text-slate-950' : 'text-white'}`}>
                Module 1 Knowledge Check
              </h2>
              <p className={`text-xs font-semibold ${isProjectorMode ? 'text-slate-700' : 'text-slate-400'}`}>
                Test your mastery of DFA, NFA, ε-NFA, subset construction, and complexity theory.
              </p>
            </div>
          </div>

          {showResults ? (
            <div className="flex items-center space-x-3">
              <div className="text-sm font-extrabold bg-indigo-600 text-white px-4 py-2 rounded-xl">
                Score: {calculateScore()} / {MODULE_1_QUIZ.length}
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
              Submit Quiz
            </button>
          )}
        </div>

        {/* Question Cards */}
        <div className="space-y-6">
          {MODULE_1_QUIZ.map((q, idx) => {
            const userAns = selectedAnswers[q.id];
            const isCorrect = userAns === q.answerIndex;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border transition-all ${
                  showResults
                    ? isCorrect
                      ? isProjectorMode ? 'bg-emerald-100 border-2 border-emerald-600' : 'bg-emerald-950/30 border-emerald-500/50'
                      : isProjectorMode ? 'bg-rose-100 border-2 border-rose-600' : 'bg-rose-950/30 border-rose-500/50'
                    : isProjectorMode
                    ? 'bg-slate-100 border-2 border-slate-400'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className={`text-xs font-mono font-extrabold uppercase tracking-widest ${
                    isProjectorMode ? 'text-indigo-900' : 'text-indigo-400'
                  }`}>
                    Question {idx + 1} &bull; {q.topic}
                  </span>
                  {showResults && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </span>
                  )}
                </div>

                <h3 className={`text-sm sm:text-base font-bold mb-4 ${isProjectorMode ? 'text-slate-950' : 'text-white'}`}>{q.question}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAns === optIdx;
                    let optBg = isProjectorMode
                      ? 'bg-white border-2 border-slate-300 text-slate-900 hover:border-slate-900 font-medium'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white';

                    if (showResults) {
                      if (optIdx === q.answerIndex) {
                        optBg = 'bg-emerald-600 text-white font-extrabold border-2 border-emerald-800';
                      } else if (isSelected) {
                        optBg = 'bg-rose-600 text-white font-bold border-2 border-rose-800';
                      }
                    } else if (isSelected) {
                      optBg = 'bg-indigo-600 text-white font-extrabold border-2 border-indigo-900';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={showResults}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-3 rounded-xl text-left text-xs transition-all flex items-center justify-between ${optBg}`}
                      >
                        <span>{opt}</span>
                        {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-900" />}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div className={`mt-4 p-3 rounded-xl border text-xs font-bold ${
                    isProjectorMode
                      ? 'bg-white border-slate-400 text-slate-950'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300'
                  }`}>
                    <strong className={`block mb-1 ${isProjectorMode ? 'text-indigo-900' : 'text-indigo-400'}`}>Explanation:</strong>
                    {q.explanation}
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

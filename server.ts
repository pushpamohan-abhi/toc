import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Tutor endpoint
  app.post('/api/ai/ask', async (req, res) => {
    try {
      const { question, context } = req.body;
      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Fallback response if GEMINI_API_KEY is not configured
        return res.json({
          answer: `**Automata Theory Module 1 Assistant:**\n\nRegarding your question: "*${question}*"\n\nIn Module 1, **Finite Automata (DFA, NFA, ε-NFA)** are central abstract computing models. Here are the core concepts relevant to your question:\n\n- **DFA (Deterministic Finite Automaton)**: $A = (Q, \\Sigma, \\delta, q_0, F)$ where $\\delta: Q \\times \\Sigma \\rightarrow Q$. Every state has exactly one deterministic transition per input symbol.\n- **NFA (Nondeterministic Finite Automaton)**: $\\delta: Q \\times \\Sigma \\rightarrow \\mathcal{P}(Q)$. Allows multiple transitions or branching computational paths.\n- **ε-NFA**: Incorporates spontaneous $\\epsilon$-moves without consuming input. Converts to DFA using Subset Construction (ECLOSE).\n- **Subset Construction**: DFA start state is $\\text{ECLOSE}(q_0)$; transitions are calculated via $\\delta_D(S, a) = \\bigcup_{p \\in S} \\text{ECLOSE}(\\delta_N(p, a))$.\n\n*(Note: Configure GEMINI_API_KEY in secrets for dynamic LLM responses!)*`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a world-class Computer Science Professor and Automata Theory expert specializing in Module 1: Introduction to Finite Automata, DFA, NFA, ε-NFA, Regular Expressions, Grammars, and Subset Construction.

User Question: "${question}"
Context: ${context || 'Module 1 Automata Theory'}

Please provide a clear, rigorous, well-formatted explanation using Markdown, clear bullet points, mathematical formulas where appropriate, and step-by-step examples. Keep the explanation concise, encouraging, and academically accurate.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      res.json({ answer: response.text || 'No response generated.' });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({
        error: 'Failed to answer question via Gemini AI',
        details: err?.message || String(err)
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Automata Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

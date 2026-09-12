import { SlideContent, QuizQuestion } from '../types';

export const MODULE_1_SLIDES: SlideContent[] = [
  {
    id: 'slide_1',
    number: 1,
    title: 'Module 1: Introduction to Automata Theory',
    category: '1. Introduction & Overview',
    textbookSection: 'Sections 1.1, 1.5, 2.1',
    bullets: [
      'Automata theory is the study of abstract computing devices, formal languages, and mathematical models of computation.',
      'A "Finite Automaton" is a system with a finite set of internal states that transitions between states based on incoming input symbols.',
      'The purpose of a state is to store relevant historical information about the input sequence processed so far.',
      'Key computing applications include Lexical Analysis in compilers, Pattern Matching in search engines, Hardware Protocol Verification, and Controller Design.'
    ],
    keyTerms: [
      { term: 'Automaton', definition: 'An abstract mathematical machine that receives input, changes internal states, and produces output/acceptance.' },
      { term: 'State', definition: 'An internal condition of a system that remembers historical context needed to process future inputs.' }
    ],
    exampleBox: {
      title: 'Real-World Applications',
      description: '• Compiler Lexical Analyzer: Scans program source code into tokens (e.g. keywords, identifiers).\n• Search Engines: Fast pattern matching across text (e.g., searching "web" or "ebay").\n• Hardware Logic: Switch controllers, vending machines, traffic lights, and CPUs.'
    },
    presetAutomatonId: 'on_off_switch',
    interactiveType: 'switch'
  },
  {
    id: 'slide_2',
    number: 2,
    title: 'Introductory Models: Switch & Keyword Recognizer',
    category: '1. Introduction & Overview',
    textbookSection: 'Section 1.1',
    bullets: [
      'Model 1 (On/Off Switch): States = {Off, On}, Inputs = {Push}. Pressing Push toggles state.',
      'Graphical Conventions: States are drawn as labeled circles. Arcs represent transitions.',
      'Start State: Designated by an incoming arrow labeled "Start" pointing into the initial state.',
      'Final / Accepting State: Designated by double concentric circles.',
      'Model 2 (Keyword "then" Recognizer): Uses 5 states (q0 to q4) to track prefix progress of reading "then".'
    ],
    exampleBox: {
      title: 'Keyword "then" Recognizer Sequence',
      description: 'q0 (ε) --t--> q1 ("t") --h--> q2 ("th") --e--> q3 ("the") --n--> q4 ("then" [ACCEPTING])'
    },
    presetAutomatonId: 'keyword_then',
    interactiveType: 'then'
  },
  {
    id: 'slide_3',
    number: 3,
    title: 'Structural Representations: Grammars & Regular Expressions',
    category: '2. Structural Representations',
    textbookSection: 'Section 1.5',
    bullets: [
      'Automata are operational models (describe HOW to process). Grammars and Regular Expressions are declarative models (describe WHAT structure to match).',
      'Context-Free Grammars (CFG): Define recursive structures like nested parentheses or block structures in programming languages.',
      'Parser Example: Expression grammar rule E ⇒ E + E or E ⇒ (E).',
      'Regular Expressions: Concise notation for text patterns (e.g. [A-Z][a-z]* [A-Z][A-Z] for street addresses like "Ithaca NY").',
      'Complementary Utility: Compilers use Regular Expressions for lexical analysis (tokens) and CFGs for parsing (syntax trees).'
    ],
    formulas: [
      'E ⇒ E + E   (Grammar Production Rule)',
      '[A-Z][a-z]*  [A-Z][A-Z]   (UNIX Regular Expression)'
    ]
  },
  {
    id: 'slide_4',
    number: 4,
    title: 'Central Concepts: Symbols, Alphabets & Strings',
    category: '3. Foundations & Alphabets',
    textbookSection: 'Section 1.5',
    bullets: [
      'Symbol: An atomic, indivisible building block (e.g. 0, 1, a, b, ASCII characters).',
      'Alphabet (Σ): A finite, non-empty set of symbols. E.g., Binary Σ = {0, 1}, Lowercase Σ = {a, b, ..., z}.',
      'String (w): A finite sequence of symbols chosen from Σ. E.g. w = 01101 over binary Σ.',
      'Length of String |w|: The number of symbol positions in w. E.g. |01101| = 5.',
      'Empty String (ε): The unique string with zero symbols. Length |ε| = 0.'
    ],
    formulas: [
      '|w| = length of string w,   |ε| = 0',
      'w = a₁a₂...a_n, where a_i ∈ Σ'
    ],
    keyTerms: [
      { term: 'Alphabet (Σ)', definition: 'A finite, non-empty set of symbols used to construct strings.' },
      { term: 'Empty String (ε)', definition: 'The unique string containing zero symbols, serving as the identity element for concatenation.' }
    ]
  },
  {
    id: 'slide_5',
    number: 5,
    title: 'Powers of Alphabets, Kleene Star & Languages',
    category: '3. Foundations & Alphabets',
    textbookSection: 'Section 1.5',
    bullets: [
      'Σ^k (Strings of Length k): Set of all strings of length exactly k over Σ. Σ^0 = {ε}, Σ^1 = Σ.',
      'Kleene Star (Σ*): Set of ALL strings of any finite length over Σ, INCLUDING ε. Σ* = Σ^0 ∪ Σ^1 ∪ Σ^2 ∪ ...',
      'Positive Closure (Σ+): Set of all non-empty strings over Σ. Σ+ = Σ* \\ {ε} = Σ^1 ∪ Σ^2 ∪ ...',
      'Language (L): Any subset of Σ* (i.e., L ⊆ Σ*). A language can be finite or infinite.',
      'Language Examples: L = {0^n 1^n | n ≥ 1}, L = {w ∈ {0,1}* | w is binary for a prime number}.'
    ],
    formulas: [
      'Σ* = ⋃_{k=0}^∞ Σ^k,   Σ⁺ = Σ* \\ {ε}',
      'L ⊆ Σ*   (Formal Language Definition)'
    ]
  },
  {
    id: 'slide_6',
    number: 6,
    title: 'String Operations: Concatenation, Prefix, Suffix & Reversal',
    category: '3. Foundations & Alphabets',
    textbookSection: 'Section 1.5',
    bullets: [
      'Concatenation (xy): Appending string y to string x. Length |xy| = |x| + |y|. Note: xε = εx = x.',
      'Prefix: String x is a prefix of w if w = xy for some y. E.g., prefixes of "cat" are {ε, "c", "ca", "cat"}.',
      'Suffix: String y is a suffix of w if w = xy for some x. E.g., suffixes of "cat" are {ε, "t", "at", "cat"}.',
      'Substring: String z is a substring of w if w = xzy for some x, y.',
      'String Reversal (w^R): Writing w in reverse order. E.g. (011)^R = 110. Note: (xy)^R = y^R x^R.'
    ],
    formulas: [
      '|xy| = |x| + |y|',
      'xε = εx = x',
      '(xy)^R = y^R x^R'
    ]
  },
  {
    id: 'slide_7',
    number: 7,
    title: 'Mathematical Proof Techniques in Automata',
    category: '4. Proof Techniques',
    textbookSection: 'Sections 1.2 - 1.4',
    bullets: [
      'Deductive Proofs: Sequence of logical assertions leading from hypotheses to conclusion.',
      'Proof by Contrapositive: Proving "P ⇒ Q" by establishing "¬Q ⇒ ¬P".',
      'Proof by Contradiction: Assuming the opposite of the target statement and deriving a logical impossibility.',
      'Inductive Proofs (Mathematical Induction): Proving a property P(n) for all integers n ≥ n0.',
      'Steps of Induction: 1) Base Case: Prove P(n0). 2) Inductive Hypothesis: Assume P(k) holds for k ≥ n0. 3) Inductive Step: Prove P(k+1) follows.',
      'Structural Induction: Used to prove properties of recursively defined structures (e.g. trees, expressions, strings).'
    ],
    keyTerms: [
      { term: 'Base Case', definition: 'The starting step of an inductive proof for the smallest integer boundary value.' },
      { term: 'Inductive Step', definition: 'The logical step demonstrating that if a statement holds for k, it must hold for k+1.' }
    ]
  },
  {
    id: 'slide_8',
    number: 8,
    title: 'Deterministic Finite Automata (DFA): Formal Definition',
    category: '5. Deterministic Finite Automata',
    textbookSection: 'Section 2.2',
    bullets: [
      'A Deterministic Finite Automaton (DFA) is formally defined as a 5-tuple: A = (Q, Σ, δ, q0, F)',
      '1. Q: A finite, non-empty set of states.',
      '2. Σ: A finite, non-empty set of input symbols (Alphabet).',
      '3. δ: Transition function δ: Q × Σ → Q mapping a state and symbol to EXACTLY ONE next state.',
      '4. q0 ∈ Q: The unique start / initial state.',
      '5. F ⊆ Q: The set of final / accepting states (can be empty, single, or multiple).',
      'Determinism Rule: For EVERY state q and EVERY symbol a, δ(q, a) specifies EXACTLY ONE unique destination state.'
    ],
    formulas: [
      'A = (Q, Σ, δ, q₀, F)',
      'δ : Q × Σ → Q   (Total Deterministic Function)'
    ]
  },
  {
    id: 'slide_9',
    number: 9,
    title: 'Extended Transition Function (δ̂) & DFA Language Acceptance',
    category: '5. Deterministic Finite Automata',
    textbookSection: 'Section 2.2.4',
    bullets: [
      'The Extended Transition Function δ̂ (delta-hat) extends δ from single symbols to full strings: δ̂: Q × Σ* → Q.',
      'Recursive Definition of δ̂:',
      '• Base Case: δ̂(q, ε) = q (Reading empty string leaves state unchanged).',
      '• Inductive Step: For string w = xa (where x ∈ Σ*, a ∈ Σ), δ̂(q, xa) = δ(δ̂(q, x), a).',
      'Language Accepted by DFA L(A): The set of all strings w ∈ Σ* such that δ̂(q0, w) ∈ F.',
      'Regular Language: A language L is called Regular if there exists SOME DFA A such that L = L(A).'
    ],
    formulas: [
      'δ̂(q, ε) = q',
      'δ̂(q, xa) = δ(δ̂(q, x), a)',
      'L(A) = { w ∈ Σ* | δ̂(q₀, w) ∈ F }'
    ]
  },
  {
    id: 'slide_10',
    number: 10,
    title: 'DFA Representations: Transition Diagrams & Tables',
    category: '5. Deterministic Finite Automata',
    textbookSection: 'Section 2.2.3',
    bullets: [
      'Transition Diagram: A directed graph where vertices represent states and directed arcs labeled with symbols represent transitions.',
      'Start State: Marked with an unlabelled incoming arrow "Start" pointing to q0.',
      'Accepting States: Marked with double concentric circles.',
      'Transition Table: Tabular grid where rows represent states (marked -> for start, * for final) and columns represent input symbols.'
    ],
    exampleBox: {
      title: 'DFA Transition Table (Strings Ending with "01")',
      description: 'States | Input 0 | Input 1\n---------------------------\n -> q0  |   q1    |   q0\n    q1  |   q1    |  *q2\n  *q2  |   q1    |   q0'
    },
    presetAutomatonId: 'ends_with_01'
  },
  {
    id: 'slide_11',
    number: 11,
    title: 'DFA Design Pattern 1 & 2: Prefix & Suffix Matching',
    category: '6. DFA Construction Strategies',
    textbookSection: 'Section 2.2',
    bullets: [
      'Pattern 1 ("Starts with Pattern X"): Construct a linear state chain matching prefix X. Trailing valid characters loop on the final state. Mismatches redirect to a Dead / Trap state.',
      'Dead State (Trap State): A non-accepting state with self-loops on ALL symbols from which no accepting state can ever be reached.',
      'Pattern 2 ("Ends with Pattern Y"): Construct states tracking how many characters of suffix Y have been matched.',
      'On matching input, advance to next state. On mismatch, fallback to the state representing the longest matching suffix prefix!'
    ],
    presetAutomatonId: 'starts_with_ab'
  },
  {
    id: 'slide_12',
    number: 12,
    title: 'DFA Design Pattern 3 & 4: Substring Search & Modulo Arithmetic',
    category: '6. DFA Construction Strategies',
    textbookSection: 'Section 2.2',
    bullets: [
      'Pattern 3 ("Contains Substring S"): Progress along states as characters of S appear. Once in accepting state, stay accepting forever with self-loops on ALL symbols.',
      'Pattern 4 ("Binary Number Divisible by N"): Construct N states representing remainders r ∈ {0, 1, ..., N-1}.',
      'When appending a new binary bit b ∈ {0, 1} to value V, new value is 2V + b.',
      'Transition Formula: δ(r, b) = (2r + b) mod N.',
      'Start state = remainder 0 (q0). Final state = remainder 0 (q0).'
    ],
    formulas: [
      'δ(r, b) = (2r + b) mod N',
      'N=3 Example: δ(0, 1) = 1, δ(1, 0) = 2, δ(1, 1) = 0'
    ],
    presetAutomatonId: 'divisible_by_3',
    interactiveType: 'divisible3'
  },
  {
    id: 'slide_13',
    number: 13,
    title: 'DFA Design Pattern 5: Product Automata (Parity Tracking)',
    category: '6. DFA Construction Strategies',
    textbookSection: 'Section 2.2',
    bullets: [
      'Product Automaton Construction: Used to track multiple independent conditions concurrently.',
      'Example (Even number of 0s AND Even number of 1s): State space Q = {Even_0, Odd_0} × {Even_1, Odd_1} = 4 states.',
      'q0 = (Even 0s, Even 1s) [Start & Final], q1 = (Odd 0s, Even 1s), q2 = (Even 0s, Odd 1s), q3 = (Odd 0s, Odd 1s).',
      'Reading "0" toggles the 0-parity coordinate (horizontal movement). Reading "1" toggles the 1-parity coordinate (vertical movement).'
    ],
    presetAutomatonId: 'even_0_even_1'
  },
  {
    id: 'slide_13_b',
    number: 14,
    title: 'DFA Case Study: Dual Modulo Length L = { w | |w| mod 5 = |w| mod 4 }',
    category: '6. DFA Construction Strategies',
    textbookSection: 'Module 1 Advanced DFA Construction',
    bullets: [
      'Problem Statement: Design a DFA to accept strings of a\'s and b\'s where L = { w | |w| mod 5 = |w| mod 4 }.',
      'Why 20 States? If the condition were |w| mod 5 = 0, 5 states are needed. If |w| mod 4 = 0, 4 states are needed. To track BOTH modulo conditions simultaneously, we need LCM(5, 4) = 20 states.',
      'Length-Only Dependence: Reading \'a\' or \'b\' increases string length by 1. The actual symbol (a or b) does not matter: δ(q_i, a) = δ(q_i, b) = q_{(i+1) mod 20}.',
      'Cycle Wrap-around: At q19, reading one more symbol makes length 20. Working modulo 20, length 20 ≡ 0 (mod 20), so q19 --a,b--> q0.',
      'Accepting States F = { q0, q1, q2, q3 }: Evaluating n mod 5 vs n mod 4 for n ∈ [0..19] reveals that n mod 5 = n mod 4 ONLY for n = 0, 1, 2, 3.'
    ],
    exampleBox: {
      title: 'Remainder Evaluation Table (n mod 5 vs n mod 4)',
      description: 'Length n | n mod 5 | n mod 4 | Accept?\n---------------------------------------\n   0     |    0    |    0    |  ✓ (q0)\n   1     |    1    |    1    |  ✓ (q1)\n   2     |    2    |    2    |  ✓ (q2)\n   3     |    3    |    3    |  ✓ (q3)\n   4     |    4    |    0    |  ✗ (q4)\n   5     |    0    |    1    |  ✗ (q5)\n   6     |    1    |    2    |  ✗ (q6)\n   7     |    2    |    3    |  ✗ (q7)\n  ...    |   ...   |   ...   |  ...\n  19     |    4    |    3    |  ✗ (q19)\n\nLanguage: L = { w | |w| ≡ 0, 1, 2, 3 (mod 20) }'
    },
    presetAutomatonId: 'len_mod5_eq_mod4'
  },
  {
    id: 'slide_q2_a',
    number: 15,
    title: 'Solved Exam Problem: ε-NFA to DFA & ε-Closure (BCS503 Q2.a)',
    category: '8. ε-NFA & Equivalence',
    textbookSection: 'Module 1 Exam Solutions (Q2.a)',
    bullets: [
      'Problem Statement (BCS503 Q2.a): Find ε-closure for all states and convert the given Thompson ε-NFA to its equivalent DFA.',
      'Step 1 — Calculate ε-Closures:',
      '• ε-closure(q0) = {q0, q1, q2, q4, q7}',
      '• ε-closure(q1) = {q1, q2, q4},   ε-closure(q2) = {q2},   ε-closure(q4) = {q4}',
      '• ε-closure(q3) = {q1, q2, q3, q4, q6, q7},   ε-closure(q5) = {q1, q2, q4, q5, q6, q7}',
      '• ε-closure(q6) = {q1, q2, q4, q6, q7},   ε-closure(q7) = {q7},   ε-closure(q8) = {q8},   ε-closure(q9) = {q9}',
      'Step 2 — Subset Construction:',
      '• Start DFA State A = ε-closure(q0) = {q0, q1, q2, q4, q7}',
      '• δ_D(A, a) = ε-closure(δ(A, a)) = ε-closure({q3, q8}) = {q1, q2, q3, q4, q6, q7, q8} = B',
      '• δ_D(A, b) = ε-closure(δ(A, b)) = ε-closure({q5}) = {q1, q2, q4, q5, q6, q7} = C',
      '• δ_D(B, a) = B,   δ_D(B, b) = {q1, q2, q4, q5, q6, q7, q9} = D (Final State)',
      '• δ_D(C, a) = B,   δ_D(C, b) = C,   δ_D(D, a) = B,   δ_D(D, b) = C'
    ],
    exampleBox: {
      title: 'Resulting DFA Transition Table & Diagram',
      description: 'State | Input a | Input b | Final?\n--------------------------------\n -> A  |    B    |    C    |   No\n    B  |    B    |   *D    |   No\n    C  |    B    |    C    |   No\n   *D  |    B    |    C    |  YES (contains q9)\n\nTransition Diagram:\n  ──► (A) ─── a ───► (B) ⟲ a\n       │              │\n       b              b\n       ▼              ▼\n      (C) ─── a ───► ((D)) ─── b ───► (C)\n       ⟲ b            │\n                      └─── a ───► (B)'
    },
    presetAutomatonId: 'dfa_vtu_q2a'
  },
  {
    id: 'slide_q2_b_ii',
    number: 16,
    title: 'Solved Exam Problem: DFA Starts with ≥2 0s & Ends with ≥2 1s (BCS503 Q2.b.ii)',
    category: '6. DFA Construction Strategies',
    textbookSection: 'Module 1 Exam Solutions (Q2.b.ii)',
    bullets: [
      'Problem Statement (BCS503 Q2.b.ii): Construct a DFA to accept strings over {0,1} starting with at least two 0\'s ("00...") AND ending with at least two 1\'s ("...11").',
      'State Decomposition Strategy:',
      '• q0 (Start): Reading 0 moves to q1. Reading 1 violates prefix requirement → Dead State qd.',
      '• q1 (Got single 0): Reading 0 moves to q2 ("00" matched). Reading 1 violates prefix → Dead State qd.',
      '• q2 (Got "00", 0 trailing 1s): Reading 0 loops to q2. Reading 1 moves to q3.',
      '• q3 (Got "00", 1 trailing 1): Reading 0 returns to q2. Reading 1 moves to q4 (Accepting!).',
      '• q4 (Got "00", ≥2 trailing 1s — FINAL): Reading 0 returns to q2. Reading 1 loops in q4.',
      '• qd (Dead State): Self-loops on 0 and 1.'
    ],
    exampleBox: {
      title: 'DFA Transition Table & Transition Diagram',
      description: 'State | Input 0 | Input 1 | Description\n--------------------------------------------\n -> q0  |   q1    |   qd    | Start (empty)\n    q1  |   q2    |   qd    | Matched "0"\n    q2  |   q2    |   q3    | Matched "00"\n    q3  |   q2    |  *q4    | Matched "00...1"\n   *q4  |   q2    |  *q4    | Matched "00...11" [ACCEPT]\n    qd  |   qd    |   qd    | Dead Trap State\n\nTransition Diagram:\n  ──► (q0) ─ 0 ─► (q1) ─ 0 ─► (q2) ⟲ 0 ─ 1 ─► (q3) ─ 1 ─► ((q4)) ⟲ 1\n       │           │            ▲              │            │\n       1           1            │              │            │\n       ▼           ▼            └───── 0 ──────┴──── 0 ─────┘\n      (qd) ⟲ 0,1 [Trap]'
    },
    presetAutomatonId: 'dfa_starts00_ends11'
  },
  {
    id: 'slide_q2_c',
    number: 17,
    title: 'Solved Exam Problem: NFA to DFA via Lazy Evaluation Method (BCS503 Q2.c)',
    category: '7. Nondeterministic Finite Automata',
    textbookSection: 'Module 1 Exam Solutions (Q2.c)',
    bullets: [
      'Problem Statement (BCS503 Q2.c): Convert the given NFA to an equivalent DFA using the Lazy Evaluation Method (Subset Construction on Demand).',
      'Original NFA Diagram:',
      '  ──► (q0) ⟲ 0 ─── 0,1 ───► (q1) ─── 0,1 ───► ((q2)) ⟲ 1',
      'What is Lazy Evaluation? Only compute transitions for state subsets that are REACHABLE from the start state, ignoring unreachable 2^|Q| combinations.',
      'Step-by-Step Lazy Evaluation Construction:',
      '1. Start State A = {q0}: δ_D(A, 0) = {q0, q1} = B, δ_D(A, 1) = {q1} = C',
      '2. Evaluate B = {q0, q1}: δ_D(B, 0) = {q0, q1, q2} = D (FINAL), δ_D(B, 1) = {q1, q2} = E (FINAL)',
      '3. Evaluate C = {q1}: δ_D(C, 0) = {q2} = F (FINAL), δ_D(C, 1) = {q2} = F (FINAL)',
      '4. Evaluate D = {q0, q1, q2} (FINAL): δ_D(D, 0) = D, δ_D(D, 1) = E',
      '5. Evaluate E = {q1, q2} (FINAL): δ_D(E, 0) = F, δ_D(E, 1) = F',
      '6. Evaluate F = {q2} (FINAL): δ_D(F, 0) = ϕ (Trap), δ_D(F, 1) = F'
    ],
    exampleBox: {
      title: 'Original NFA & Converted DFA Transition Diagrams',
      description: 'Given NFA Transition Diagram:\n  ──► (q0) ⟲ 0 ─── 0,1 ───► (q1) ─── 0,1 ───► ((q2)) ⟲ 1\n\nConverted DFA Transition Diagram (Lazy Evaluation):\n  ──► (A) ──── 0 ────► (B) ──── 0 ────► ((D)) ⟲ 0\n       │                │                │\n       1                1                1\n       ▼                ▼                ▼\n      (C) ─── 0,1 ───► ((E)) ─── 0 ────► ((F)) ⟲ 1\n                        │                │\n                        └─── 1 ──────────┘'
    },
    presetAutomatonId: 'dfa_lazy_eval_q2c'
  },
  {
    id: 'slide_1b_iii',
    number: 18,
    title: 'Solved Exam Problem: DFA for L = { w | |w| mod 3 ≠ 2 } (10CS56 Q1.b.iii)',
    category: '6. DFA Construction Strategies',
    textbookSection: 'Module 1 Exam Solutions (10CS56 Q1.b.iii)',
    bullets: [
      'Problem Statement (10CS56 Q1.b.iii): Construct a DFA to accept all strings over {a, b} such that L = { w | w ∈ {a, b}* and |w| mod 3 ≠ 2 }.',
      'Language Analysis:',
      '• Modulo 3 remainder can be 0, 1, or 2.',
      '• Condition |w| mod 3 ≠ 2 means remainder MUST be 0 or 1.',
      '• ACCEPTING States: Remainder 0 (q0) and Remainder 1 (q1).',
      '• REJECTING State: Remainder 2 (q2).',
      'State Decomposition:',
      '• q0 (Start & Final): Represents |w| mod 3 = 0. On input a,b → moves to q1.',
      '• q1 (Final): Represents |w| mod 3 = 1. On input a,b → moves to q2.',
      '• q2 (Non-Final): Represents |w| mod 3 = 2. On input a,b → loops back to q0.'
    ],
    exampleBox: {
      title: 'DFA Transition Table & Diagram',
      description: 'State | Input a | Input b | Is Final State?\n-----------------------------------------\n-> *q0 |    q1   |    q1   |  YES (|w|%3 = 0)\n   *q1 |    q2   |    q2   |  YES (|w|%3 = 1)\n    q2 |    q0   |    q0   |  NO  (|w|%3 = 2)\n\nTransition Diagram:\n  ──► ((q0)) ─── a,b ───► ((q1)) ─── a,b ───► (q2)\n        ▲                                      │\n        └────────────────── a,b ───────────────┘'
    },
    presetAutomatonId: 'dfa_len_mod3_ne_2'
  },
  {
    id: 'slide_1c_10cs56',
    number: 19,
    title: 'Solved Exam Problem: NFA to DFA Conversion (10CS56 Q1.c)',
    category: '7. Nondeterministic Finite Automata',
    textbookSection: 'Module 1 Exam Solutions (10CS56 Q1.c)',
    bullets: [
      'Problem Statement (10CS56 Q1.c): Convert the given 5-state NFA (p, q, r, s, t) to an equivalent DFA using Subset Construction.',
      'Subset Construction Steps:',
      '1. Start State A = {p}: δ_D(A, 0) = {p, q} = B, δ_D(A, 1) = {p} = A',
      '2. Evaluate B = {p, q}: δ_D(B, 0) = {p, q} ∪ {r, s} = {p, q, r, s} = C (FINAL), δ_D(B, 1) = {p} ∪ {t} = {p, t} = D (FINAL)',
      '3. Evaluate C = {p, q, r, s} (FINAL): δ_D(C, 0) = {p, q, r, s} = C, δ_D(C, 1) = {p, t} = D',
      '4. Evaluate D = {p, t} (FINAL): δ_D(D, 0) = {p, q} = B, δ_D(D, 1) = {p} = A'
    ],
    exampleBox: {
      title: 'Subset Derivation Summary',
      description: 'Use the interactive tables below to view the original NFA transition table side-by-side with the converted DFA transition table and transition diagram.'
    },
    presetAutomatonId: 'dfa_10cs56_q1c',
    interactiveType: 'nfaToDfaTables'
  },
  {
    id: 'slide_comparison_subset_lazy',
    number: 20,
    title: 'Comparison: Standard Subset Construction vs. Lazy Evaluation Method',
    category: '7. Nondeterministic Finite Automata',
    textbookSection: 'Module 1 Theory & Method Comparison',
    bullets: [
      '1. Standard (Eager / Static) Subset Construction:',
      '   • Computes all 2^|Q| possible state subsets upfront into a fixed transition table regardless of reachability.',
      '   • Result: Contains redundant/unreachable states that must be eliminated later during DFA minimization.',
      '   • Complexity: Always performs 2^|Q| × |Σ| transition lookups.',
      '2. Lazy Evaluation Method (Subset Construction on Demand / Dynamic):',
      '   • Starts ONLY at initial subset {q0} and lazily computes transitions ONLY for newly discovered reachable subsets.',
      '   • Result: Produces a clean DFA containing ONLY reachable states without waste.',
      '   • Complexity: O(k × |Σ|), where k ≤ 2^|Q| is the number of actually REACHABLE states (often k << 2^|Q|).'
    ],
    exampleBox: {
      title: 'Method Summary',
      description: 'Use the interactive comparison matrix below to explore execution efficiency, time/space complexity, and state-by-state evaluation traces comparing Standard Subset Construction against Lazy Evaluation.'
    },
    presetAutomatonId: 'nfa_lazy_eval_q2c',
    interactiveType: 'methodComparison'
  },
  {
    id: 'slide_14',
    number: 14,
    title: 'Nondeterministic Finite Automata (NFA)',
    category: '7. Nondeterministic Finite Automata',
    textbookSection: 'Section 2.3',
    bullets: [
      'An NFA relaxes DFA constraints: A state can have ZERO, ONE, or MULTIPLE outgoing transitions for the same symbol.',
      'NFA Concept: The machine can clone computational threads or "guess" the correct path leading to acceptance.',
      'Formal Definition 5-tuple: A = (Q, Σ, δ, q0, F), where δ: Q × Σ → 𝒫(Q) returns a SUBSET of Q.',
      'Extended Transition Function δ̂ for NFA: δ̂(q, ε) = {q}, δ̂(q, xa) = ⋃_{p ∈ δ̂(q, x)} δ(p, a).',
      'String Acceptance: String w is accepted if δ̂(q0, w) contains AT LEAST ONE state in F (i.e. δ̂(q0, w) ∩ F ≠ ∅).'
    ],
    formulas: [
      'δ : Q × Σ → 𝒫(Q)   (Power Set Target)',
      'L(A) = { w ∈ Σ* | δ̂(q₀, w) ∩ F ≠ ∅ }'
    ],
    presetAutomatonId: 'nfa_ends_01'
  },
  {
    id: 'slide_15',
    number: 15,
    title: 'NFA Applications: Text Search & Concurrent Pattern Matching',
    category: '7. Nondeterministic Finite Automata',
    textbookSection: 'Section 2.4',
    bullets: [
      'Search Problem: Detect keywords (e.g. "web" or "ebay") in unstructured text streams.',
      'NFA Advantage: Start state q1 maintains a self-loop on ALL symbols, continuously spawning search threads when matching prefix characters arrive.',
      'Branch 1 ("web"): q1 --w--> q2 --e--> q3 --b--> q4 [ACCEPTING]',
      'Branch 2 ("ebay"): q1 --e--> q5 --b--> q6 --a--> q7 --y--> q8 [ACCEPTING]',
      'DFA Equivalent: Converting this NFA to DFA yields a highly efficient deterministic state machine (similar to the Aho-Corasick algorithm).'
    ],
    presetAutomatonId: 'nfa_text_search'
  },
  {
    id: 'slide_16',
    number: 16,
    title: 'Finite Automata with Epsilon Transitions (ε-NFA)',
    category: '8. Epsilon Transitions & Closure',
    textbookSection: 'Section 2.5',
    bullets: [
      'An ε-NFA allows transitions on the empty string ε WITHOUT consuming any input symbol.',
      'Formal 5-tuple: M = (Q, Σ, δ, q0, F) where δ: Q × (Σ ∪ {ε}) → 𝒫(Q).',
      'ε-Closure ECLOSE(q): The set of all states reachable from state q using ZERO or MORE ε-transitions.',
      'Computing ECLOSE(q): 1) q ∈ ECLOSE(q). 2) If p ∈ ECLOSE(q) and r ∈ δ(p, ε), then r ∈ ECLOSE(q). Repeat until closure set stabilizes.'
    ],
    formulas: [
      'δ : Q × (Σ ∪ {ε}) → 𝒫(Q)',
      'q ∈ ECLOSE(q)   (Reflexive Self-Inclusion Property)'
    ],
    presetAutomatonId: 'enfa_decimal_numbers',
    interactiveType: 'epsilon'
  },
  {
    id: 'slide_17',
    number: 17,
    title: 'Subset Construction: Converting NFA / ε-NFA to DFA',
    category: '9. Subset Construction Algorithm',
    textbookSection: 'Sections 2.3.5, 2.5.5',
    bullets: [
      'Theorem: Every NFA / ε-NFA can be converted into an equivalent DFA that accepts the exact same language!',
      'Subset Construction Algorithm:',
      '1. Start DFA State S0 = ECLOSE(q0).',
      '2. For each DFA subset state S and each symbol a ∈ Σ, compute: δ_DFA(S, a) = ⋃_{p ∈ S} ECLOSE(δ_NFA(p, a)).',
      '3. If new subset state S\' is discovered, add S\' to DFA state set Q_DFA.',
      '4. Mark state S as FINAL in DFA if S contains AT LEAST ONE state from NFA final set F_NFA.',
      'Maximum DFA States: If NFA has N states, converted DFA has at most 2^N states (Power Set bound).'
    ],
    formulas: [
      'S₀ = ECLOSE(q₀)',
      'δ_D(S, a) = ⋃_{p ∈ S} ECLOSE(δ_N(p, a))',
      'F_D = { S ⊆ Q_N | S ∩ F_N ≠ ∅ }'
    ],
    interactiveType: 'subset'
  },
  {
    id: 'slide_18',
    number: 18,
    title: 'Module 1 Master Summary & Class Equivalence',
    category: '10. Summary & Comparison',
    textbookSection: 'Module 1 Review',
    bullets: [
      'Equivalence of Automata Classes: DFA ≡ NFA ≡ ε-NFA in expressive language recognition power!',
      'All three classes recognize the EXACT SAME family of languages: Regular Languages.',
      'DFA: Deterministic, fast execution in software, 1 transition per state-symbol pair.',
      'NFA: Concise design for non-deterministic choices, max 2^N states upon DFA conversion.',
      'ε-NFA: Highest human convenience with spontaneous ε-moves, ideal bridge for Regular Expression conversion.'
    ]
  }
];

export const MODULE_1_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the minimum number of states required in a DFA to accept binary strings divisible by 3?',
    options: ['2 states', '3 states', '4 states', '5 states'],
    answerIndex: 1,
    explanation: 'A DFA tracking binary divisibility by 3 requires 3 states corresponding to remainders 0, 1, and 2 mod 3.',
    topic: 'DFA Construction'
  },
  {
    id: 'q2',
    question: 'In an ε-NFA, what does ECLOSE(q) represent?',
    options: [
      'The set of states reachable from q by consuming all input symbols',
      'The set of states reachable from q using zero or more empty transitions (ε)',
      'Only the accepting states connected to q',
      'The set of dead states in the automaton'
    ],
    answerIndex: 1,
    explanation: 'ECLOSE(q) is defined as the closure set of states reachable from state q using exclusively ε transitions without consuming input.',
    topic: 'ε-Transitions'
  },
  {
    id: 'q3',
    question: 'If an NFA has N states, what is the maximum possible number of states in its converted equivalent DFA?',
    options: ['N', 'N^2', '2^N', 'N!'],
    answerIndex: 2,
    explanation: 'The subset construction creates DFA states corresponding to subsets of NFA states. The power set P(Q) has maximum size 2^N.',
    topic: 'Subset Construction'
  },
  {
    id: 'q4',
    question: 'Which of the following is TRUE regarding the language recognition power of DFA, NFA, and ε-NFA?',
    options: [
      'DFA is strictly less powerful than NFA',
      'ε-NFA is strictly more powerful than DFA',
      'DFA, NFA, and ε-NFA all recognize the exact same class of Regular Languages',
      'NFA can recognize Context-Free Languages while DFA cannot'
    ],
    answerIndex: 2,
    explanation: 'DFA, NFA, and ε-NFA are equivalent in language recognition power; all three recognize Regular Languages.',
    topic: 'Automata Equivalence'
  },
  {
    id: 'q5',
    question: 'What is the length of the empty string ε?',
    options: ['0', '1', 'Undefined', 'Infinity'],
    answerIndex: 0,
    explanation: 'The empty string ε contains zero occurrences of symbols, so its length |ε| = 0.',
    topic: 'Central Concepts'
  },
  {
    id: 'q6',
    question: 'In a DFA, what is a "Dead State" (or Trap State)?',
    options: [
      'A state that cannot be reached from the start state',
      'A non-accepting state from which no accepting state can ever be reached',
      'A final state with no outgoing transitions',
      'An ε-transition target state'
    ],
    answerIndex: 1,
    explanation: 'A Dead State (Trap State) is a non-accepting state with self-loops on all symbols such that once entered, the DFA can never reach a final state.',
    topic: 'DFA Design'
  },
  {
    id: 'q7',
    question: 'What is the base case in the recursive definition of the Extended Transition Function δ̂(q, w) for a DFA?',
    options: ['δ̂(q, ε) = q', 'δ̂(q, a) = δ(q, a)', 'δ̂(q0, w) = F', 'δ̂(q, ε) = ∅'],
    answerIndex: 0,
    explanation: 'The base case of δ̂ specifies that reading an empty string ε leaves the state unchanged: δ̂(q, ε) = q.',
    topic: 'DFA Formalism'
  },
  {
    id: 'q8',
    question: 'Which of the following operations describes string reversal (xy)^R?',
    options: ['x^R y^R', 'y^R x^R', '(x y)^R = x y', 'x^R + y^R'],
    answerIndex: 1,
    explanation: 'Reversing a concatenated string (xy) reverses the order of the constituent strings: (xy)^R = y^R x^R.',
    topic: 'String Operations'
  },
  {
    id: 'q9',
    question: 'What pattern does the UNIX regular expression [A-Z][a-z]* [A-Z][A-Z] match?',
    options: [
      'A capitalized word followed by a space and two capital letters (e.g. Ithaca NY)',
      'Any sequence of numbers followed by letters',
      'All lowercase words with no punctuation',
      'Two spaces followed by a capitalized string'
    ],
    answerIndex: 0,
    explanation: 'As given in Section 1.5 of the textbook, [A-Z][a-z]* represents a capitalized word, followed by a space and two capital letters [A-Z][A-Z] representing state abbreviations.',
    topic: 'Regular Expressions'
  },
  {
    id: 'q10',
    question: 'What is the key difference between Decidability and Intractability in Automata Theory?',
    options: [
      'Decidability studies what a computer can solve at all, while Intractability studies what can be solved efficiently (in polynomial time)',
      'Decidability applies only to DFAs, while Intractability applies only to NFAs',
      'Decidability deals with hardware, while Intractability deals with compilers',
      'There is no difference between them'
    ],
    answerIndex: 0,
    explanation: 'Decidability asks "What can a computer do at all?", whereas Intractability asks "What can a computer do efficiently in polynomial time?"',
    topic: 'Complexity'
  },
  {
    id: 'q11',
    question: 'How do you construct a DFA that accepts the COMPLEMENT of the language accepted by a given DFA?',
    options: [
      'Reverse all transition arrows',
      'Swap the start state with a final state',
      'Keep the same states and transitions, but invert final states (turn non-final states into final, and final into non-final)',
      'Add ε-transitions between all states'
    ],
    answerIndex: 2,
    explanation: 'To construct a complement DFA L(A)^c, keep Q, Σ, δ, q0 identical and replace F with F_c = Q \\ F (invert all final and non-final states).',
    topic: 'DFA Complement'
  },
  {
    id: 'q12',
    question: 'What is the signature of the transition function δ for an ε-NFA?',
    options: [
      'δ: Q × Σ → Q',
      'δ: Q × Σ → 𝒫(Q)',
      'δ: Q × (Σ ∪ {ε}) → 𝒫(Q)',
      'δ: Q × Q → Σ'
    ],
    answerIndex: 2,
    explanation: 'An ε-NFA transition function takes a state in Q and an input symbol from Σ OR ε, and maps it to a subset of states 𝒫(Q).',
    topic: 'ε-NFA Formalism'
  },
  {
    id: 'q13',
    question: 'For the language L = { w ∈ {a,b}* | |w| mod 5 = |w| mod 4 }, which string lengths mod 20 are accepting?',
    options: [
      'Lengths 0, 1, 2, 3 mod 20',
      'Only length 0 mod 20',
      'Lengths 0, 4, 8, 12, 16 mod 20',
      'All odd lengths mod 20'
    ],
    answerIndex: 0,
    explanation: 'Since lcm(5,4) = 20, we check n mod 5 == n mod 4 for n ∈ [0..19]. The equation holds true if and only if n mod 20 ∈ {0, 1, 2, 3}.',
    topic: 'DFA Product Modulo Construction'
  },
  {
    id: 'q14',
    question: 'In the DFA for strings starting with at least two 0s and ending with at least two 1s (BCS503 Q2.b.ii), how many states are needed including the dead state?',
    options: [
      '6 states (q0, q1, q2, q3, q4, qd)',
      '4 states',
      '3 states',
      '8 states'
    ],
    answerIndex: 0,
    explanation: 'We need q0 (start), q1 (got 0), q2 (got 00), q3 (got 00...1), q4 (got 00...11 final), and qd (dead state for invalid prefix starting with 1 or 01). Total = 6 states.',
    topic: 'Exam Problem Q2.b.ii'
  },
  {
    id: 'q15',
    question: 'When finding ε-closure(q0) for the Thompson NFA in Q2.a, which states are included?',
    options: [
      '{q0, q1, q2, q4, q7}',
      '{q0} only',
      '{q0, q1, q9}',
      '{q0, q7, q8, q9}'
    ],
    answerIndex: 0,
    explanation: 'From q0, ε-transitions lead to q1 and q7. From q1, ε-transitions lead to q2 and q4. Therefore, ε-closure(q0) = {q0, q1, q2, q4, q7}.',
    topic: 'Exam Problem Q2.a'
  }
];

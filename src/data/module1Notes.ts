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
  }
];

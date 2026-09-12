import { SlideData } from '../types';

export const MODULE_5_SLIDES: SlideData[] = [
  {
    id: 'slide_m5_1',
    number: 1,
    title: 'Module 5 Overview: Turing Machines (TM)',
    category: '1. Turing Machine Basics',
    textbookSection: 'Section 8.1 - 8.2',
    bullets: [
      'The Turing Machine (TM) is the ultimate model of computation introduced by Alan Turing in 1936.',
      'A TM consists of a finite control, a read/write head, and an infinite one-dimensional TAPE divided into cells.',
      'Formal 7-Tuple Definition: M = (Q, Σ, Γ, δ, q0, B, F)',
      '  • Q: Finite set of states',
      '  • Σ: Input alphabet (B ∉ Σ)',
      '  • Γ: Tape alphabet (Σ ⊂ Γ, B ∈ Γ)',
      '  • δ: Transition function δ: Q × Γ → Q × Γ × {L, R}',
      '  • q0: Start state',
      '  • B: Blank symbol filling infinite unused tape cells',
      '  • F: Set of final / accepting states (F ⊆ Q)'
    ],
    formulas: [
      'δ(q, X) = (p, Y, D)',
      'Meaning: In state q reading symbol X, write Y, change state to p, and move tape head in direction D ∈ {L, R}.'
    ],
    exampleBox: {
      title: 'Turing Machine Tape Operation',
      description: 'Given transition δ(q0, 0) = (q1, 1, R):\n\nBefore:\n Tape:  [ ... | B | 0 | 1 | 0 | B | ... ]\n Head:            ▲ (q0)\n\nAfter:\n Tape:  [ ... | B | 1 | 1 | 0 | B | ... ]\n Head:                ▲ (q1)'
    }
  },
  {
    id: 'slide_m5_2',
    number: 2,
    title: 'Instantaneous Descriptions & TM Language Classes',
    category: '2. Languages & Halting',
    textbookSection: 'Section 8.3',
    bullets: [
      'Turing Machine ID: String X1 X2 ... X_{i-1} q X_i X_{i+1} ... X_n indicates state q reading symbol X_i on tape.',
      'Classes of Languages Defined by TMs:',
      '  1. Recursively Enumerable Languages (RE): Accepted by a TM (TM halts and accepts for w ∈ L, but MAY LOOP FOREVER for w ∉ L).',
      '  2. Recursive Languages (R / Decidable): Accepted by a TM that HALTS FOR ALL INPUT STRINGS (always halts in accept or reject state).',
      'Halting Problem: Deciding whether an arbitrary TM halts on an arbitrary input is UNDECIDABLE.'
    ],
    exampleBox: {
      title: 'Chomsky Hierarchy Summary',
      description: 'Type 3: Regular Languages (DFA/NFA)\n  ⊂ Type 2: Context-Free Languages (PDA)\n    ⊂ Type 1: Context-Sensitive Languages (Linear Bounded Automata)\n      ⊂ Type 0: Recursively Enumerable Languages (Turing Machine)'
    }
  },
  {
    id: 'slide_m5_3',
    number: 3,
    title: 'Variations of Turing Machines & Church-Turing Thesis',
    category: '3. TM Variations',
    textbookSection: 'Section 8.4 - 8.5',
    bullets: [
      'Multitape Turing Machines: Has k tapes with k independent read/write heads. (PROVED EQUIVALENT in computational power to 1-tape TM!).',
      'Nondeterministic Turing Machines (NTM): Transition function returns a set of tuples. (PROVED EQUIVALENT in computational power to deterministic TM!).',
      'Church-Turing Thesis: Any algorithmic computation that can be performed by any physical computing device or human mathematician can be simulated by a Turing Machine.'
    ],
    exampleBox: {
      title: 'Equivalence Theorem',
      description: 'Theorem: Every k-tape Turing Machine running in time T(n) can be simulated by a standard 1-tape Turing Machine in time O(T(n)^2).'
    }
  },
  {
    id: 'slide_m5_4',
    number: 4,
    title: 'Undecidability & Post Correspondence Problem (PCP)',
    category: '4. Undecidability',
    textbookSection: 'Section 9.1 - 9.4',
    bullets: [
      'A problem is UNDECIDABLE if there exists no algorithm (TM that always halts) to solve it.',
      'Universal Turing Machine (UTM): A TM that takes another TM M\'s description <M> and input w as data, and simulates M on w.',
      'Diagonalization Language (L_d): The classic language constructed to prove uncountability and undecidability.',
      'Post Correspondence Problem (PCP): Given two lists of string dominoes A = (w1, ..., wn) and B = (x1, ..., xn), find an index sequence i1, i2, ..., ik such that w_{i1} ... w_{ik} = x_{i1} ... x_{ik}. PCP is UNDECIDABLE!'
    ],
    exampleBox: {
      title: 'Post Correspondence Problem (PCP) Instance',
      description: 'Dominoes List A: [1] "ba"  [2] "ab"  [3] "a"\nDominoes List B: [1] "bab" [2] "a"   [3] "ab"\n\nMatch Sequence: 1, 3, 2\nList A: w1 w3 w2 = "ba" + "a" + "ab" = "baaab"\nList B: x1 x3 x2 = "bab" + "ab" + "a" = "bababa"  (No match!)\n\nFinding if a match sequence exists for general lists is UNDECIDABLE.'
    }
  },
  {
    id: 'slide_m5_5',
    number: 5,
    title: 'Automata in Compilers (21CS51): Lexical & Syntax Analysis',
    category: '5. Compiler Design Connection',
    textbookSection: 'Compiler Design (Module 5 / 21CS51)',
    bullets: [
      '1. Lexical Analysis (Scanner): Uses DFAs / Regular Expressions to scan source code characters and emit TOKENS (identifiers, keywords, operators).',
      '2. Syntax Analysis (Parser): Uses Context-Free Grammars (CFGs) / Pushdown Automata to check code syntax structure.',
      '   • Top-Down Parsing: LL(1) parsers build parse trees from root to leaves.',
      '   • Bottom-Up Parsing: LR(0), SLR(1), LALR(1), LR(1) parsers shift tokens and reduce via handles using state stacks.',
      '3. Syntax-Directed Translation (SDT): Attaches semantic rules and attributes to grammar productions during parsing.'
    ],
    exampleBox: {
      title: 'Compiler Phases & Automata Mapping',
      description: 'Source Code -> [Lexer (DFA)] -> Tokens -> [Parser (PDA / CFG)] -> Parse Tree -> [Code Generator (TM Model)] -> Machine Code'
    }
  }
];

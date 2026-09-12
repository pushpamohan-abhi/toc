import { SlideData } from '../types';

export const MODULE_2_SLIDES: SlideData[] = [
  {
    id: 'slide_m2_1',
    number: 1,
    title: 'Section 3.1: Regular Expressions & Declarative Algebra',
    category: '1. Regular Expressions',
    textbookSection: 'Section 3.1 (Ullman)',
    bullets: [
      'Regular Expressions (RE) provide a declarative algebra to specify strings and regular languages.',
      'Formal Definition: Basis steps: ∅ (empty set), ε (empty string), and single symbol a ∈ Σ are REs.',
      'Inductive Rules: If r1 and r2 are REs, then (r1 + r2), (r1 · r2), and (r1*) are REs.',
      'Core Operators:',
      '  1. Union (+ or |): Language L(r1 + r2) = L(r1) ∪ L(r2)',
      '  2. Concatenation (·): Language L(r1 · r2) = L(r1) L(r2) = { xy | x ∈ L(r1) and y ∈ L(r2) }',
      '  3. Kleene Star (*): Language L(r*) = ⋃_{i=0}^{∞} L(r)^i, where L(r)^0 = {ε}',
      '  4. Positive Closure (+): L(r+) = r r* (one or more repetitions)',
      'Operator Precedence: 1. Parentheses () > 2. Kleene Star (*) > 3. Concatenation (·) > 4. Union (+)'
    ],
    formulas: [
      'L(r_1 + r_2) = L(r_1) ∪ L(r_2)',
      'L(r_1 · r_2) = L(r_1) L(r_2) = \\{ xy \\mid x \\in L(r_1), y \\in L(r_2) \\}',
      'L(r^*) = \\bigcup_{i=0}^{\\infty} L(r)^i, \\quad L(r)^0 = \\{\\epsilon\\}'
    ],
    exampleBox: {
      title: 'Ullman Section 3.1 Examples & Algebraic Identities',
      description: 'Common RE Patterns:\n• (0 + 1)* : All binary strings over {0, 1}\n• (0 + 1)* 001 : All strings ending with "001"\n• 1 (0 + 1)* 0 : Strings starting with 1 and ending with 0\n• (b* a b* a b*)* : Strings containing an EVEN number of "a"s\n• (0 + 10)* (ε + 1) : Strings with NO consecutive 1s\n\nIdentities:\n• (a* b*)* = (a + b)*\n• r + ∅ = r,  r · ∅ = ∅,  r · ε = r\n• r* = ε + r r*'
    }
  },
  {
    id: 'slide_m2_2',
    number: 2,
    title: 'Section 3.2: Converting Automata to Regular Expressions',
    category: '2. FA to RE Conversion',
    textbookSection: 'Section 3.2 (Except 3.2.1)',
    bullets: [
      'State Elimination Method: Reduces any finite automaton state-by-state into a 2-state generalized NFA (GNFA) with regular expression labels.',
      'Algorithm Steps:',
      '  1. Add a new start state q_start connected via ε to q0, and new final state q_final connected via ε from all F states.',
      '  2. Pick an intermediate state s to eliminate.',
      '  3. For every incoming transition (p → s with label R_ps) and outgoing transition (s → q with label R_sq), update the direct transition label R_pq:',
      '     R_pq_new = R_pq + R_ps (R_ss)* R_sq',
      '  4. Remove state s and its edges.',
      '  5. Repeat until only q_start and q_final remain. The label on (q_start → q_final) is the final Regular Expression.',
      'Arden\'s Theorem: If P and Q are regular expressions and ε ∉ L(Q), the equation R = Q R + P has a UNIQUE solution R = Q* P.'
    ],
    formulas: [
      'R_{pq}^{\\text{new}} = R_{pq} + R_{ps} (R_{ss})^* R_{sq}',
      '\\text{Arden\'s Rule: } R = Q R + P \\implies R = Q^* P \\quad (\\text{if } \\epsilon \\notin L(Q))'
    ],
    exampleBox: {
      title: 'Worked Example: State Elimination on 2-State DFA',
      description: 'DFA States: q0 (start, accepting), q1 (non-accepting).\nTransitions: δ(q0, 0)=q0, δ(q0, 1)=q1, δ(q1, 0)=q0, δ(q1, 1)=q1.\n\nStep 1: Loop on q1 is R_11 = 1. Path from q0 to q1 is R_01 = 1. Path from q1 back to q0 is R_10 = 0.\nStep 2: Eliminate q1:\n  Update loop on q0: R_00_new = R_00 + R_01 (R_11)* R_10 = 0 + 1 (1)* 0 = 0 + 11* 0.\nStep 3: Star the overall q0 loop:\n  Final RE = (0 + 1 1* 0)*  ∎'
    }
  },
  {
    id: 'slide_m2_3',
    number: 3,
    title: 'Section 3.2.3: Thompson Construction (RE to ε-NFA)',
    category: '3. RE to Automata',
    textbookSection: 'Section 3.2.3 (Ullman)',
    bullets: [
      'Thompson Construction converts any Regular Expression r into an equivalent ε-NFA systematically using structural induction.',
      'Base Cases:',
      '  1. Symbol a ∈ Σ: Start state --a--> Final state',
      '  2. Empty String ε: Start state --ε--> Final state',
      '  3. Empty Set ∅: Two disconnected states without transitions',
      'Inductive Rules:',
      '  • Union (r1 + r2): New start state branches via ε to r1 & r2 start states; r1 & r2 final states branch via ε to new final state.',
      '  • Concatenation (r1 · r2): Merge final state of r1 with start state of r2 (or connect via ε).',
      '  • Kleene Star (r*): Add new start state with ε to r start and new final state; add ε loop back from r final to r start.'
    ],
    exampleBox: {
      title: 'Thompson Construction Diagram Rules',
      description: 'Union (r1 + r2):\n      ┌── ε ──► (r1) ──► ε ──┐\n  ►(q0)                    ▼\n      └── ε ──► (r2) ──► ε ──► ((qf))\n\nStar (r*):\n         ┌────── ε ──────┐\n         ▼               │\n  ►(q0) ──► ε ──► (r) ──► ε ──► ((qf))\n    │                            ▲\n    └───────────── ε ────────────┘'
    }
  },
  {
    id: 'slide_m2_4',
    number: 4,
    title: 'Section 3.3: Applications of Regular Expressions',
    category: '4. RE Applications',
    textbookSection: 'Section 3.3 (Ullman)',
    bullets: [
      '1. Lexical Analysis (Compilers):',
      '   • Source code scanners (e.g. Flex / Lex) use Regular Expressions to specify tokens like Identifiers, Keywords, Numbers, and Operators.',
      '   • Example Identifier RE: [a-zA-Z_][a-zA-Z0-9_]*',
      '   • Example Integer RE: [0-9]+, Float RE: [0-9]+\\.[0-9]+',
      '   • The compiler converts token REs into a unified ε-NFA $\\to$ DFA for O(1) character-by-character tokenization.',
      '2. Text Search Engines & Pattern Matching:',
      '   • Commands like grep, awk, sed, and search algorithms construct NFAs from search patterns.',
      '   • Start state self-loops (q0, Σ, q0) enable matching substrings at ANY index within massive documents.'
    ],
    exampleBox: {
      title: 'Compiler Lexical Tokenizer Flow',
      description: 'Source Code: "int x = 42;"\n  │\n  ▼ [Regex Rules]\n  • Keyword:   "int"\n  • Identifier: "x"\n  • Operator:   "="\n  • Constant:   "42"\n  • Punctuation: ";"\n  │\n  ▼ [DFA Engine]\n  Token Stream: <KEYWORD, int>, <ID, x>, <ASSIGN, =>, <INT_LIT, 42>, <SEMI, ;>'
    }
  },
  {
    id: 'slide_m2_5',
    number: 5,
    title: 'Section 4.1: Proving Languages Not Regular (The Pumping Lemma)',
    category: '5. Pumping Lemma',
    textbookSection: 'Section 4.1 (Ullman)',
    bullets: [
      'The Pumping Lemma is a necessary property of ALL regular languages used to PROVE non-regularity by contradiction.',
      'Pumping Lemma Theorem:',
      '  If L is regular, there exists a constant p ≥ 1 (pumping length) such that any string w ∈ L with |w| ≥ p can be split into 3 parts w = xyz satisfying:',
      '  1. |xy| ≤ p  (The pump y occurs within the first p characters)',
      '  2. |y| > 0  (y is non-empty, |y| ≥ 1)',
      '  3. For ALL i ≥ 0, xy^i z ∈ L  (Pumping y zero or more times keeps the string in L).',
      'Adversary Strategy for Proofs by Contradiction:',
      '  • Assume L is regular with pumping length p.',
      '  • Pick a clever string w ∈ L with length |w| ≥ p.',
      '  • Show that for ALL valid decompositions w = xyz satisfying |xy| ≤ p and |y| > 0, there exists SOME i ≥ 0 such that xy^i z ∉ L.'
    ],
    formulas: [
      '\\forall w \\in L, |w| \\ge p \\implies \\exists x, y, z : w = xyz',
      '|xy| \\le p, \\quad |y| > 0, \\quad \\forall i \\ge 0 : x y^i z \\in L'
    ],
    exampleBox: {
      title: 'Classic Pumping Lemma Proofs (Ullman Section 4.1)',
      description: 'Proof 1: L = {a^n b^n | n ≥ 0}\n• Choose w = a^p b^p. |w| = 2p ≥ p.\n• Since |xy| ≤ p, y consists purely of "a"s (y = a^k, k ≥ 1).\n• Pump with i = 0: xy^0 z = xz = a^(p-k) b^p. Since k ≥ 1, a^(p-k) b^p ∉ L! Contradiction. ∎\n\nProof 2: L = {a^(n^2) | n ≥ 0}\n• Choose w = a^(p^2). |w| = p^2 ≥ p.\n• String xy^2 z has length p^2 < |xy^2 z| = p^2 + |y| ≤ p^2 + p < (p+1)^2.\n• Its length lies STRICTLY between two consecutive squares p^2 and (p+1)^2! Thus xy^2 z ∉ L. ∎'
    }
  },
  {
    id: 'slide_m2_6',
    number: 6,
    title: 'Section 4.2: Closure Properties of Regular Languages',
    category: '6. Closure Properties',
    textbookSection: 'Section 4.2 (Ullman)',
    bullets: [
      'Regular Languages are CLOSED under a wide variety of algebraic operations:',
      '1. Boolean Operations: Union (L1 ∪ L2), Intersection (L1 ∩ L2), Complementation (L_c = Σ* \\ L), Relative Difference (L1 \\ L2).',
      '   • Proof for Complement: Invert accepting/non-accepting states in a complete DFA.',
      '   • Proof for Intersection: Product Automaton construction M = M1 × M2 or De Morgan\'s Law L1 ∩ L2 = (L1^c ∪ L2^c)^c.',
      '2. Regular Operations: Concatenation (L1 L2), Kleene Star (L*), Reversal (L^R).',
      '   • Proof for Reversal: Reverse all transition arrows in NFA and swap start & final states.',
      '3. Mapping Operations: Homomorphism h(L) and Inverse Homomorphism h^-1(L).',
      '   • A homomorphism h replaces each symbol a ∈ Σ with a string h(a). If L is regular, h(L) and h^-1(L) are strictly regular.'
    ],
    formulas: [
      'L_1 \\cap L_2 = (L_1^c \\cup L_2^c)^c',
      'L_1 \\setminus L_2 = L_1 \\cap L_2^c',
      'h(L) = \\{ h(w) \\mid w \\in L \\}'
    ],
    exampleBox: {
      title: 'Summary of Closure Properties Table',
      description: 'Operation | Closed? | Construction Method\n───────────┼─────────┼─────────────────────────────────────────────\nUnion      | YES     | Thompson Union / NFA Parallel Branching\nIntersect  | YES     | Product Automaton M1 × M2\nComplement | YES     | Invert Final States in Complete DFA\nDifference | YES     | L1 ∩ L2^c\nReversal   | YES     | Reverse NFA Arrows & Swap Start/Final\nHomomorph  | YES     | Replace Edge Labels with h(a)'
    }
  },
  {
    id: 'slide_m2_7',
    number: 7,
    title: 'Section 4.4: Equivalence & Minimization of Automata',
    category: '7. DFA Minimization',
    textbookSection: 'Section 4.4 (Ullman)',
    bullets: [
      'DFA Minimization creates the UNIQUE minimal-state DFA for any regular language by merging equivalent states.',
      'State Distinguishability Definition:',
      '  • Two states p and q are DISTINGUISHABLE (p ≢ q) if there exists at least one string w ∈ Σ* such that δ(p, w) ∈ F and δ(q, w) ∉ F (or vice versa).',
      '  • If NO such string w exists, p and q are EQUIVALENT (p ≡ q) and can be merged into a single state.',
      'Table-Filling Algorithm (Myhill-Nerode Method):',
      '  1. Step 0 (Basis): Construct a lower triangular table of all pairs (p, q). Mark all pairs where one state is FINAL and the other is NON-FINAL.',
      '  2. Step 1 (Induction): For each unmarked pair (p, q) and each symbol a ∈ Σ, check the target pair (r, s) = (δ(p, a), δ(q, a)). If (r, s) is ALREADY marked, mark (p, q).',
      '  3. Repeat Step 1 until a full pass makes no new marks.',
      '  4. Merge all UNMARKED pairs into single quotient state blocks.'
    ],
    formulas: [
      'p \\not\\equiv q \\iff \\exists w \\in \\Sigma^* : \\hat{\\delta}(p, w) \\in F \\leftrightarrow \\hat{\\delta}(q, w) \\notin F',
      'p \\equiv q \\implies \\text{Merge } p \\text{ and } q \\text{ into } [p]'
    ],
    exampleBox: {
      title: 'Complete Worked Example: Table-Filling Minimization',
      description: 'DFA States: {A, B, C, D, E}, Start: A, Final: {C, D, E}.\n• Basis Step: Mark (A,C), (A,D), (A,E), (B,C), (B,D), (B,E) because {A,B} ∉ F and {C,D,E} ∈ F.\n• Unmarked Pairs remaining: (A,B), (C,D), (C,E), (D,E).\n• Pass 1:\n  - Pair (C,D) under symbol 0 goes to (E,E) [same] and under 1 goes to (B,B) [same]. Unmarked!\n  - Pair (D,E) under 0 goes to (E,E) and under 1 goes to (B,B). Unmarked!\n  - Pair (A,B) under 0 goes to (B,B) and under 1 goes to (C,D). Unmarked!\n• Result: Equivalence classes are {A, B} and {C, D, E}.\n• Reduced DFA has exactly 2 states! ∎'
    }
  }
];

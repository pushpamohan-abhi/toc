import { QuizQuestion } from '../types';

export const ALL_MODULE_QUIZZES: Record<number, QuizQuestion[]> = {
  // ==========================================
  // MODULE 1: FINITE AUTOMATA & SUBSET CONSTRUCTION (20 Questions)
  // ==========================================
  1: [
    {
      id: 'm1_q1',
      question: 'What is the minimum number of states required in a DFA to accept binary strings representing numbers divisible by 3?',
      options: ['2 states', '3 states', '4 states', '5 states'],
      answerIndex: 1,
      explanation: 'Divisibility by 3 leaves remainders {0, 1, 2}. Therefore, 3 states (q0, q1, q2) are necessary and sufficient.',
      topic: 'DFA Construction'
    },
    {
      id: 'm1_q2',
      question: 'In an ε-NFA, what does ECLOSE(q) represent?',
      options: [
        'The set of states reachable from q by consuming all input symbols',
        'The set of states reachable from q using zero or more empty transitions (ε)',
        'Only the accepting states connected to q',
        'The set of dead states in the automaton'
      ],
      answerIndex: 1,
      explanation: 'ε-closure (ECLOSE) of a state q is the set of all states reachable from q along paths consisting solely of ε-labeled transitions (including q itself).',
      topic: 'ε-Transitions'
    },
    {
      id: 'm1_q3',
      question: 'If an NFA has N states, what is the MAXIMUM possible number of states in its equivalent converted DFA?',
      options: ['N states', '2N states', '2^N states', 'N^2 states'],
      answerIndex: 2,
      explanation: 'Each DFA state corresponds to a subset of NFA states. The power set of N states contains 2^N elements.',
      topic: 'Subset Construction'
    },
    {
      id: 'm1_q4',
      question: 'In the formal 5-tuple definition of a DFA, M = (Q, Σ, δ, q0, F), what does δ represent?',
      options: [
        'Set of input symbols',
        'Transition function δ: Q × Σ → Q',
        'Set of final accepting states',
        'Start state of the machine'
      ],
      answerIndex: 1,
      explanation: 'δ is the deterministic transition function taking a single state in Q and a single input symbol in Σ to exactly one state in Q.',
      topic: 'Formal Definitions'
    },
    {
      id: 'm1_q5',
      question: 'What is the base case definition for the extended transition function δ^(q, ε) in a DFA?',
      options: ['δ^(q, ε) = q', 'δ^(q, ε) = ∅', 'δ^(q, ε) = q0', 'δ^(q, ε) = F'],
      answerIndex: 0,
      explanation: 'By definition of the extended transition function, reading the empty string ε from any state q leaves the automaton in state q.',
      topic: 'Extended Transition Function'
    },
    {
      id: 'm1_q6',
      question: 'How do you construct a DFA that accepts the COMPLEMENT of the language accepted by a given DFA?',
      options: [
        'Reverse all transition arrows',
        'Swap the start state with a final state',
        'Keep the same states and transitions, but invert final states (turn non-final states into final, and final into non-final)',
        'Add ε-transitions between all states'
      ],
      answerIndex: 2,
      explanation: 'To construct a complement DFA L(A)^c, keep Q, Σ, δ, q0 identical and replace F with F_c = Q \\ F (invert all final and non-final states).',
      topic: 'DFA Complementation'
    },
    {
      id: 'm1_q7',
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
      id: 'm1_q8',
      question: 'For the language L = { w ∈ {a,b}* | |w| mod 5 = |w| mod 4 }, which string lengths mod 20 are accepting?',
      options: [
        'Lengths 0, 1, 2, 3 mod 20',
        'Only length 0 mod 20',
        'Lengths 0, 4, 8, 12, 16 mod 20',
        'All odd lengths mod 20'
      ],
      answerIndex: 0,
      explanation: 'Since lcm(5,4) = 20, we check n mod 5 == n mod 4 for n ∈ [0..19]. The equation holds true if and only if n mod 20 ∈ {0, 1, 2, 3}.',
      topic: 'Product Modulo Construction'
    },
    {
      id: 'm1_q9',
      question: 'In the DFA for strings starting with at least two 0s and ending with at least two 1s (BCS503 Q2.b.ii), how many states are needed including the dead state?',
      options: [
        '6 states (q0, q1, q2, q3, q4, qd)',
        '4 states',
        '3 states',
        '8 states'
      ],
      answerIndex: 0,
      explanation: 'We need q0 (start), q1 (got 0), q2 (got 00), q3 (got 00...1), q4 (got 00...11 final), and qd (dead state for invalid prefix starting with 1 or 01). Total = 6 states.',
      topic: 'DFA State Counting'
    },
    {
      id: 'm1_q10',
      question: 'When finding ECLOSE(q0) for the Thompson NFA in Q2.a, which states are included?',
      options: [
        '{q0, q1, q2, q4, q7}',
        '{q0} only',
        '{q0, q1, q9}',
        '{q0, q7, q8, q9}'
      ],
      answerIndex: 0,
      explanation: 'From q0, ε-transitions lead to q1 and q7. From q1, ε-transitions lead to q2 and q4. Therefore, ECLOSE(q0) = {q0, q1, q2, q4, q7}.',
      topic: 'ε-Closure Calculation'
    },
    {
      id: 'm1_q11',
      question: 'What is the main distinction between Decidability and Intractability?',
      options: [
        'Decidability asks "Can a computer solve this problem at all?", Intractability asks "Can a computer solve it efficiently in polynomial time?"',
        'Decidability is for NFAs, Intractability is for DFAs',
        'Intractability means impossible to solve, Decidability means O(1) time',
        'There is no difference between them'
      ],
      answerIndex: 0,
      explanation: 'Decidability asks "What can a computer do at all?", whereas Intractability asks "What can a computer do efficiently in polynomial time?"',
      topic: 'Complexity Theory'
    },
    {
      id: 'm1_q12',
      question: 'In converting a 5-state NFA N = ({p,q,r,s,t}, {0,1}, δ, p, {t}) to a DFA (10CS56 Q1.c), what is the start state of the resulting DFA?',
      options: ['{p}', '{p, q}', '{t}', '∅'],
      answerIndex: 0,
      explanation: 'In standard NFA to DFA conversion (without ε-transitions), the initial state of the DFA is the single subset containing the NFA start state {p}.',
      topic: 'NFA to DFA Conversion'
    },
    {
      id: 'm1_q13',
      question: 'In Text Search NFAs (e.g. searching keywords "web" or "ebay"), why is a self-loop on the start state for all input characters essential?',
      options: [
        'It allows the NFA to non-deterministically spawn a search attempt starting at ANY character position in the input text stream',
        'It prevents the machine from entering dead states',
        'It converts the NFA into a DFA automatically',
        'It limits the text stream to length 10'
      ],
      answerIndex: 0,
      explanation: 'The start state self-loop (q0, Σ, q0) allows the text search engine to remain in q0 while nondeterministically launching match threads at any index in the document.',
      topic: 'Text Search Applications'
    },
    {
      id: 'm1_q14',
      question: 'What is the primary operational constraint that distinguishes a DFA from an NFA?',
      options: [
        'For every state and input symbol, a DFA has EXACTLY ONE transition, whereas an NFA can have zero, one, or multiple transitions',
        'DFAs can have ε-transitions while NFAs cannot',
        'DFAs have infinite states',
        'NFAs cannot accept regular languages'
      ],
      answerIndex: 0,
      explanation: 'DFA requires determinism: |δ(q, a)| = 1 for all q ∈ Q and a ∈ Σ. NFAs allow non-determinism where |δ(q, a)| ≥ 0.',
      topic: 'Determinism vs Non-determinism'
    },
    {
      id: 'm1_q15',
      question: 'What is a "Dead State" (Trap State) in a DFA?',
      options: [
        'A non-accepting state from which no transition can ever lead to an accepting state (δ(qd, a) = qd for all a)',
        'The start state of the DFA',
        'An accepting state with no outgoing transitions',
        'A state unreachable from the start state'
      ],
      answerIndex: 0,
      explanation: 'A dead state qd is a non-final state where all outgoing transitions loop back to qd, making it impossible to reach any accepting state.',
      topic: 'DFA State Taxonomy'
    },
    {
      id: 'm1_q16',
      question: 'Under what condition does an NFA N = (Q, Σ, δ, q0, F) ACCEPT an input string w?',
      options: [
        'If AT LEAST ONE computational path starting at q0 on reading w ends in a final state (δ^(q0, w) ∩ F ≠ ∅)',
        'If ALL computational paths end in a final state',
        'If the length of w is even',
        'If no path reaches a dead state'
      ],
      answerIndex: 0,
      explanation: 'NFA string acceptance requires that at least one valid path leads to an accepting state: δ^(q0, w) ∩ F ≠ ∅.',
      topic: 'NFA String Acceptance'
    },
    {
      id: 'm1_q17',
      question: 'If DFA M1 has m states and DFA M2 has n states, how many states does their Product DFA M1 × M2 have?',
      options: ['m × n states', 'm + n states', '2^(m+n) states', 'm^n states'],
      answerIndex: 0,
      explanation: 'The state set of the product DFA is Q1 × Q2, which contains exactly m × n Cartesian product state pairs.',
      topic: 'Product Automaton'
    },
    {
      id: 'm1_q18',
      question: 'What language is accepted by a DFA with 1 state q0, where q0 is accepting, and has self-loops for all symbols in Σ?',
      options: ['Σ* (The set of all possible strings over Σ)', '∅ (The empty set)', '{ε} (Only empty string)', 'No strings'],
      answerIndex: 0,
      explanation: 'Every string w (including ε) remains in state q0, which is accepting. Hence the language is Σ*.',
      topic: 'Trivial DFAs'
    },
    {
      id: 'm1_q19',
      question: 'What language is accepted by a DFA with 1 state q0, where q0 is NON-ACCEPTING, and has self-loops for all symbols in Σ?',
      options: ['∅ (The empty set)', 'Σ*', '{ε}', 'All single character strings'],
      answerIndex: 0,
      explanation: 'Since there are no accepting states in F = ∅, no string can ever be accepted. The language is ∅.',
      topic: 'Empty Language Automaton'
    },
    {
      id: 'm1_q20',
      question: 'What is the key advantage of "Lazy Evaluation" during Subset Construction compared to Eager power-set enumeration?',
      options: [
        'Lazy evaluation only constructs DFA states that are REACHABLE from the start state, avoiding computation of inaccessible 2^N subsets',
        'Lazy evaluation eliminates non-determinism without using sets',
        'Lazy evaluation works without transition tables',
        'Lazy evaluation generates fewer input symbols'
      ],
      answerIndex: 0,
      explanation: 'Lazy evaluation starts with ECLOSE(q0) and only expands reachable subset combinations, drastically reducing computed states in practice.',
      topic: 'Subset Construction Optimization'
    }
  ],

  // ==========================================
  // MODULE 2: REGULAR EXPRESSIONS, THOMPSON, MINIMIZATION & PUMPING LEMMA (20 Questions)
  // ==========================================
  2: [
    {
      id: 'm2_q1',
      question: 'Which regular expression operation has the HIGHEST precedence?',
      options: ['Kleene Star (*)', 'Concatenation (·)', 'Union (+ or |)', 'All have equal precedence'],
      answerIndex: 0,
      explanation: 'Precedence order: 1. Kleene Star (*) > 2. Concatenation (·) > 3. Union (+).',
      topic: 'RE Precedence'
    },
    {
      id: 'm2_q2',
      question: 'What language is generated by the regular expression (0 + 1)* 001?',
      options: [
        'All strings ending with "001"',
        'All strings starting with "001"',
        'All strings containing "001" anywhere',
        'Strings of length 3 only'
      ],
      answerIndex: 0,
      explanation: '(0 + 1)* allows any arbitrary sequence of 0s and 1s, followed strictly by the suffix "001".',
      topic: 'RE Semantics'
    },
    {
      id: 'm2_q3',
      question: 'In Thompson\'s Construction for union (r1 + r2), how many total states are added surrounding r1 and r2?',
      options: ['2 new states (1 new start and 1 new final state)', '4 new states', '0 new states', '1 new state'],
      answerIndex: 0,
      explanation: 'Thompson\'s Union construction introduces 1 new start state branching via ε to r1 & r2 start states, and 1 new final state receiving ε from r1 & r2 final states.',
      topic: 'Thompson Construction'
    },
    {
      id: 'm2_q4',
      question: 'Which theorem/method is used to convert a DFA into an equivalent Regular Expression by eliminating internal states?',
      options: [
        'State Elimination Method / Arden\'s Theorem',
        'Subset Construction',
        'Myhill-Nerode Table Filling',
        'Chomsky Normal Form Reduction'
      ],
      answerIndex: 0,
      explanation: 'The State Elimination Method eliminates non-initial and non-final states one by one, replacing path transitions with regular expression formulas R_pq + R_ps (R_ss)* R_sq.',
      topic: 'DFA to RE Conversion'
    },
    {
      id: 'm2_q5',
      question: 'The Pumping Lemma for Regular Languages is primarily used to:',
      options: [
        'PROVE that a language is NOT regular (by contradiction)',
        'Prove that a language is regular',
        'Minimize a DFA',
        'Convert an NFA to a DFA'
      ],
      answerIndex: 0,
      explanation: 'The Pumping Lemma is a necessary property of regular languages. Showing that a language violates the Pumping Lemma proves by contradiction that the language is NOT regular.',
      topic: 'Pumping Lemma'
    },
    {
      id: 'm2_q6',
      question: 'In DFA Minimization using the Table-Filling Method, two states p and q are marked as distinguishable if:',
      options: [
        'There exists an input string w such that δ(p, w) ∈ F and δ(q, w) ∉ F (or vice versa)',
        'Both p and q are start states',
        'Both p and q have identical state names',
        'They belong to different NFAs'
      ],
      answerIndex: 0,
      explanation: 'States p and q are distinguishable if some string w leads one state to an accepting state and the other to a non-accepting state.',
      topic: 'DFA Minimization'
    },
    {
      id: 'm2_q7',
      question: 'In the Pumping Lemma for regular languages, what are the constraints on splitting a string w = xyz of length |w| ≥ p?',
      options: [
        '|xy| ≤ p AND |y| ≥ 1',
        '|x| ≥ p AND |y| = 0',
        '|xyz| ≤ p AND |y| = 2',
        '|yz| ≤ p AND |x| ≥ 1'
      ],
      answerIndex: 0,
      explanation: 'The Pumping Lemma states that any string w with |w| ≥ p can be decomposed into xyz such that |xy| ≤ p and |y| ≥ 1, so xy^i z ∈ L for all i ≥ 0.',
      topic: 'Pumping Lemma Constraints'
    },
    {
      id: 'm2_q8',
      question: 'When pumping a string w = xyz with i = 0 (xy^0 z), what does the pumped string simplify to?',
      options: ['xz', 'xyz', 'yz', 'x'],
      answerIndex: 0,
      explanation: 'Since y^0 = ε (the empty string), xy^0 z = x ε z = xz.',
      topic: 'Pumping Lemma Mechanics'
    },
    {
      id: 'm2_q9',
      question: 'Which regular expression represents the language of all strings over {a, b} containing an EVEN number of a\'s?',
      options: [
        '(b* a b* a b*)*',
        '(a a)* b*',
        '(a + b)* a a',
        'b* a b*'
      ],
      answerIndex: 0,
      explanation: 'Each block (b* a b* a b*) contains exactly two a\'s with arbitrary b\'s around them. Repeating this block zero or more times generates all strings with an even number of a\'s.',
      topic: 'RE Design'
    },
    {
      id: 'm2_q10',
      question: 'According to Arden\'s Rule, if R = Q R + P, what is the unique solution for R provided Q does not contain ε?',
      options: ['R = Q* P', 'R = P* Q', 'R = Q + P*', 'R = (Q P)*'],
      answerIndex: 0,
      explanation: 'Arden\'s Theorem states that if P and Q are regular expressions and ε ∉ L(Q), then equation R = Q R + P has a unique solution R = Q* P.',
      topic: 'Arden\'s Theorem'
    },
    {
      id: 'm2_q11',
      question: 'How many states and ε-transitions are added in Thompson\'s Construction for the Kleene Star operation r*?',
      options: [
        '2 new states and 4 new ε-transitions',
        '1 new state and 2 new ε-transitions',
        '0 new states and 1 new ε-transition',
        '4 new states and 2 new ε-transitions'
      ],
      answerIndex: 0,
      explanation: 'Thompson\'s Kleene Star adds 1 new start state, 1 new final state, and 4 ε-transitions: start to r_start, start to final (bypass), r_final to r_start (loop), and r_final to final.',
      topic: 'Thompson Kleene Star'
    },
    {
      id: 'm2_q12',
      question: 'What does the Myhill-Nerode Theorem state regarding language regularity?',
      options: [
        'A language L is regular if and only if its right-invariant equivalence relation R_L has a FINITE number of equivalence classes',
        'A language L is regular if it has infinite states',
        'A language L is regular only if it contains no b\'s',
        'Every context-free language has finite equivalence classes'
      ],
      answerIndex: 0,
      explanation: 'Myhill-Nerode establishes that L is regular iff the number of equivalence classes of R_L (where x R_L y ≡ ∀z(xz ∈ L ↔ yz ∈ L)) is finite, matching minimal DFA states.',
      topic: 'Myhill-Nerode Theorem'
    },
    {
      id: 'm2_q13',
      question: 'Is the language L = { a^n b^n | n ≥ 0 } regular?',
      options: [
        'No, it is NOT regular because finite automata cannot count arbitrary n',
        'Yes, it is regular with a 2-state DFA',
        'Yes, it is regular with an NFA',
        'No, but it is not context-free either'
      ],
      answerIndex: 0,
      explanation: 'Using the Pumping Lemma on string a^p b^p, pumping y (which consists purely of a\'s) alters the number of a\'s without changing b\'s, breaking equality. Hence non-regular.',
      topic: 'Non-Regular Proof'
    },
    {
      id: 'm2_q14',
      question: 'Are Regular Languages closed under INTERSECTION and COMPLEMENTATION?',
      options: [
        'Yes, regular languages are closed under BOTH intersection and complementation',
        'Closed under intersection but NOT complementation',
        'Closed under complementation but NOT intersection',
        'Not closed under either'
      ],
      answerIndex: 0,
      explanation: 'Regular languages are closed under all Boolean operations: Union, Intersection, Complementation, Relative Difference, Reversal, and Homomorphism.',
      topic: 'Closure Properties'
    },
    {
      id: 'm2_q15',
      question: 'Which regular expression algebraic equivalence is CORRECT?',
      options: [
        '(a* b*)* = (a + b)*',
        '(a + b)* = a* + b*',
        'a* b* = b* a*',
        '(a b)* = a* b*'
      ],
      answerIndex: 0,
      explanation: '(a* b*)* allows any arbitrary sequence of a\'s and b\'s in any order, which is identical to (a + b)*.',
      topic: 'RE Algebraic Identities'
    },
    {
      id: 'm2_q16',
      question: 'How many states are required in the MINIMAL DFA for the language L = { a^n | n ≥ 0 and n is a multiple of 3 }?',
      options: ['3 states', '2 states', '4 states', '1 state'],
      answerIndex: 0,
      explanation: 'The states correspond to remainder modulo 3: {0, 1, 2}. State 0 is initial and accepting. Total = 3 states.',
      topic: 'Minimal DFA Counting'
    },
    {
      id: 'm2_q17',
      question: 'In the Table-Filling Algorithm (Myhill-Nerode), what is the Basis Step (Step 0)?',
      options: [
        'Mark all pairs (p, q) where one state is accepting (in F) and the other is non-accepting (not in F)',
        'Mark all pairs of identical states (q, q)',
        'Mark all start state pairs',
        'Unmark all pairs in the table'
      ],
      answerIndex: 0,
      explanation: 'The basis step immediately marks all pairs (p, q) such that p ∈ F and q ∉ F (or vice versa) because ε distinguishes them instantly.',
      topic: 'Table Filling Basis Step'
    },
    {
      id: 'm2_q18',
      question: 'What is the regular expression for strings over {0, 1} with no two consecutive 1s?',
      options: [
        '(0 + 10)* (ε + 1)',
        '(01)*',
        '0* 1* 0*',
        '(1 0 1)*'
      ],
      answerIndex: 0,
      explanation: 'Every 1 must be immediately followed by a 0 (10), or be at the very end of the string (ε + 1). Arbitrary 0s can appear anytime. Thus (0 + 10)*(ε + 1).',
      topic: 'RE Pattern Design'
    },
    {
      id: 'm2_q19',
      question: 'If L is a regular language, is its reversal L^R = { w^R | w ∈ L } guaranteed to be regular?',
      options: [
        'Yes, regular languages are closed under reversal',
        'No, reversal creates context-free languages',
        'Only if L is finite',
        'Only if L contains ε'
      ],
      answerIndex: 0,
      explanation: 'Reversing all transition arrows in an NFA for L and swapping start/final states constructs an NFA for L^R. Thus regular languages are closed under reversal.',
      topic: 'Language Reversal'
    },
    {
      id: 'm2_q20',
      question: 'In the State Elimination Method, when eliminating state s between p and q with loop R_ss, what is the updated expression for transition R_pq?',
      options: [
        'R_pq_new = R_pq + R_ps (R_ss)* R_sq',
        'R_pq_new = R_ps + R_sq',
        'R_pq_new = R_ps R_ss R_sq',
        'R_pq_new = R_pq (R_ss)*'
      ],
      answerIndex: 0,
      explanation: 'The direct path R_pq is combined with the path through s: R_ps followed by zero or more s-loops (R_ss)* followed by R_sq.',
      topic: 'State Elimination Formula'
    }
  ],

  // ==========================================
  // MODULE 3: CONTEXT-FREE GRAMMARS (CFG), DERIVATIONS & NORMAL FORMS (20 Questions)
  // ==========================================
  3: [
    {
      id: 'm3_q1',
      question: 'A Context-Free Grammar is formally defined as a 4-tuple G = (V, T, P, S). What does V represent?',
      options: [
        'Finite set of Variables / Non-terminal symbols',
        'Set of Terminal symbols',
        'Set of Production rules',
        'Start variable'
      ],
      answerIndex: 0,
      explanation: 'V is the set of Variables (or Non-terminals) such as S, A, B.',
      topic: 'CFG Formalism'
    },
    {
      id: 'm3_q2',
      question: 'A CFG is defined as AMBIGUOUS if:',
      options: [
        'There exists at least one string w ∈ L(G) having TWO OR MORE distinct parse trees',
        'It has ε-productions',
        'It cannot be converted to a DFA',
        'It contains no terminals'
      ],
      answerIndex: 0,
      explanation: 'Ambiguity means a single sentence or string can be parsed in multiple distinct structural parse trees (or distinct Leftmost Derivations).',
      topic: 'CFG Ambiguity'
    },
    {
      id: 'm3_q3',
      question: 'When simplifying a CFG, what is the mandatory sequence of elimination steps?',
      options: [
        '1. Eliminate ε-productions -> 2. Eliminate Unit productions -> 3. Eliminate Useless symbols',
        '1. Eliminate Useless symbols -> 2. Eliminate Unit productions -> 3. Eliminate ε-productions',
        'Order does not matter',
        '1. Eliminate Unit productions -> 2. Eliminate Useless symbols -> 3. Eliminate ε-productions'
      ],
      answerIndex: 0,
      explanation: 'Order is crucial! Removing ε-productions first can create new unit productions, and removing unit productions can create new useless symbols.',
      topic: 'CFG Simplification Order'
    },
    {
      id: 'm3_q4',
      question: 'What is the required format of EVERY production rule in Chomsky Normal Form (CNF)?',
      options: [
        'A → BC  OR  A → a  (2 Non-terminals OR 1 Terminal)',
        'A → a B',
        'A → a b c',
        'A → B'
      ],
      answerIndex: 0,
      explanation: 'CNF strictly requires every RHS to be either exactly two non-terminals (A → BC) or a single terminal symbol (A → a).',
      topic: 'Chomsky Normal Form'
    },
    {
      id: 'm3_q5',
      question: 'If a string w has length |w| = n ≥ 1, how many total derivation steps does a grammar in CNF take to generate w?',
      options: ['2n - 1 steps', 'n steps', 'n^2 steps', '2n steps'],
      answerIndex: 0,
      explanation: 'Theorem: Any derivation of a string of length n in CNF takes exactly 2n - 1 steps (n-1 binary splits + n terminal replacements).',
      topic: 'CNF Derivation Length'
    },
    {
      id: 'm3_q6',
      question: 'What is the format of production rules in Greibach Normal Form (GNF)?',
      options: [
        'A → a α  (where a is a terminal and α is a string of zero or more non-terminals)',
        'A → B C',
        'A → a b',
        'A → α a'
      ],
      answerIndex: 0,
      explanation: 'GNF requires every production to start with exactly one terminal followed by zero or more variables: A → a V1 V2 ... Vk.',
      topic: 'Greibach Normal Form'
    },
    {
      id: 'm3_q7',
      question: 'What is a Leftmost Derivation (LMD)?',
      options: [
        'A derivation where the leftmost non-terminal variable is replaced at each step',
        'A derivation that processes input right to left',
        'A derivation using only left-regular rules',
        'A tree with leaves on the left'
      ],
      answerIndex: 0,
      explanation: 'In a Leftmost Derivation, the leftmost non-terminal symbol in the sentential form is strictly chosen for expansion at every step.',
      topic: 'Derivation Types'
    },
    {
      id: 'm3_q8',
      question: 'What is the "Yield" of a Parse Tree?',
      options: [
        'The string obtained by concatenating the leaves of the tree from left to right',
        'The root variable S',
        'The height of the parse tree',
        'The total number of non-terminal nodes'
      ],
      answerIndex: 0,
      explanation: 'The yield of a parse tree is the terminal string formed by reading all leaf nodes in left-to-right order.',
      topic: 'Parse Trees'
    },
    {
      id: 'm3_q9',
      question: 'How do you eliminate immediate Left Recursion of the form A → A α | β?',
      options: [
        'Replace with A → β A\' and A\' → α A\' | ε',
        'Replace with A → α A and A → β',
        'Delete the rule A → A α',
        'Replace with A → A β'
      ],
      answerIndex: 0,
      explanation: 'Left-recursive rules A → A α | β generate strings β α*. Eliminating left recursion introduces a new right-recursive variable A\': A → β A\', A\' → α A\' | ε.',
      topic: 'Left Recursion Elimination'
    },
    {
      id: 'm3_q10',
      question: 'What is a "Useless Symbol" in a CFG?',
      options: [
        'A symbol that is either Non-Generating (cannot produce terminal strings) or Non-Reachable from S',
        'A terminal symbol appearing in S → a',
        'Any variable with more than 2 productions',
        'The start symbol S'
      ],
      answerIndex: 0,
      explanation: 'A variable or terminal X is useless if it can never participate in a complete derivation S ⇒* w of some terminal string w.',
      topic: 'Useless Symbols'
    },
    {
      id: 'm3_q11',
      question: 'What is a "Unit Production" in a CFG?',
      options: [
        'A production rule of the form A → B (where both A and B are single non-terminals)',
        'A production of form A → a',
        'A production of form S → ε',
        'A rule with 1 terminal'
      ],
      answerIndex: 0,
      explanation: 'A unit production replaces one variable with another variable directly: A → B, where A, B ∈ V.',
      topic: 'Unit Productions'
    },
    {
      id: 'm3_q12',
      question: 'What is the time complexity of the CYK (Cocke-Younger-Kasami) Parsing Algorithm for a string of length n using a CFG in CNF?',
      options: ['O(n^3 · |G|)', 'O(n)', 'O(2^n)', 'O(n^2)'],
      answerIndex: 0,
      explanation: 'The dynamic programming CYK algorithm fills an n × n triangular table in O(n^3 · |G|) time.',
      topic: 'CYK Algorithm'
    },
    {
      id: 'm3_q13',
      question: 'In the Pumping Lemma for Context-Free Languages, how is a long string w split?',
      options: [
        'w = u v w x y  such that |v w x| ≤ p and |v y| ≥ 1',
        'w = x y z  such that |x y| ≤ p',
        'w = u v w  such that |u| = |v|',
        'w = x^n y^n'
      ],
      answerIndex: 0,
      explanation: 'The CFL Pumping Lemma splits w into 5 parts u v w x y such that |v w x| ≤ p, |v y| ≥ 1, and u v^i w x^i y ∈ L for all i ≥ 0.',
      topic: 'CFL Pumping Lemma'
    },
    {
      id: 'm3_q14',
      question: 'Are Context-Free Languages closed under INTERSECTION?',
      options: [
        'No! CFLs are NOT closed under intersection (e.g. L1={a^n b^n c^m} ∩ L2={a^m b^n c^n} = {a^n b^n c^n})',
        'Yes, CFLs are closed under intersection',
        'Only if both languages are finite',
        'Yes, because regular languages are closed under intersection'
      ],
      answerIndex: 0,
      explanation: 'The intersection of two CFLs is not necessarily context-free. The classic counterexample produces L = {a^n b^n c^n}, which is non-CFL.',
      topic: 'CFL Closure Properties'
    },
    {
      id: 'm3_q15',
      question: 'Are Context-Free Languages closed under UNION, CONCATENATION, and KLEENE STAR?',
      options: [
        'Yes, CFLs are closed under Union, Concatenation, and Kleene Star',
        'No, closed under union only',
        'No, closed under concatenation only',
        'Not closed under any of them'
      ],
      answerIndex: 0,
      explanation: 'CFLs are closed under regular operations: S → S1 | S2 (Union), S → S1 S2 (Concatenation), and S → S1 S | ε (Kleene Star).',
      topic: 'CFL Regular Operations'
    },
    {
      id: 'm3_q16',
      question: 'What is an "Inherently Ambiguous" Context-Free Language?',
      options: [
        'A language for which EVERY grammar that generates it is ambiguous',
        'A grammar that can be simplified into CNF',
        'A language with no parse trees',
        'A language accepted by a DFA'
      ],
      answerIndex: 0,
      explanation: 'A CFL is inherently ambiguous if there exists no unambiguous grammar for it (e.g., L = {a^i b^j c^k | i=j or j=k}).',
      topic: 'Inherently Ambiguous CFL'
    },
    {
      id: 'm3_q17',
      question: 'What does a "Nullable Variable" mean in a CFG?',
      options: [
        'A variable A such that A ⇒* ε (can derive the empty string in one or more steps)',
        'A variable that has no productions',
        'A variable that equals the start symbol',
        'A terminal symbol'
      ],
      answerIndex: 0,
      explanation: 'Variable A is nullable if there exists a derivation sequence starting at A that results in ε.',
      topic: 'Nullable Variables'
    },
    {
      id: 'm3_q18',
      question: 'Is every Regular Language also a Context-Free Language?',
      options: [
        'Yes! Regular languages are a STRICT SUBSET of Context-Free Languages',
        'No, Regular and Context-Free are disjoint',
        'Only finite languages are both',
        'Context-Free languages are a subset of Regular languages'
      ],
      answerIndex: 0,
      explanation: 'By the Chomsky Hierarchy, Type 3 (Regular) ⊂ Type 2 (Context-Free) ⊂ Type 1 (Context-Sensitive) ⊂ Type 0 (Unrestricted).',
      topic: 'Chomsky Hierarchy'
    },
    {
      id: 'm3_q19',
      question: 'In converting a production A → a b c into CNF, how many new variables and rules are introduced?',
      options: [
        'Introduce terminal variables Xa, Xb, Xc and split binary: A → Xa C1, C1 → Xb Xc',
        'Keep A → a b c unchanged',
        'Delete terminals a b c',
        'Convert to A → a'
      ],
      answerIndex: 0,
      explanation: 'CNF requires binary variable branches and isolated terminals. So a, b, c are replaced with Xa, Xb, Xc, and RHS of length 3 is split into binary pairs.',
      topic: 'CNF Conversion Steps'
    },
    {
      id: 'm3_q20',
      question: 'What is the yield of a parse tree for grammar S → a S b | ε with derivation S ⇒ a S b ⇒ a a S b b ⇒ a a b b?',
      options: ['aabb', 'a S b', 'ε', 'ab'],
      answerIndex: 0,
      explanation: 'Reading the leaves of the parse tree from left to right gives the terminal string "aabb".',
      topic: 'Parse Tree Yield Calculation'
    }
  ],

  // ==========================================
  // MODULE 4: PUSHDOWN AUTOMATA (PDA) & STACK MEMORY (20 Questions)
  // ==========================================
  4: [
    {
      id: 'm4_q1',
      question: 'What additional component does a Pushdown Automaton (PDA) have compared to a Finite Automaton?',
      options: ['Infinite LIFO Stack memory', 'Random Access Memory (RAM)', 'Infinite Tape', 'Two Start States'],
      answerIndex: 0,
      explanation: 'A PDA adds a Last-In First-Out (LIFO) stack memory to a finite control.',
      topic: 'PDA Memory Model'
    },
    {
      id: 'm4_q2',
      question: 'What are the two equivalent modes of language acceptance for Pushdown Automata?',
      options: [
        'Acceptance by Final State AND Acceptance by Empty Stack',
        'Acceptance by Initial State AND Acceptance by Full Stack',
        'Acceptance by Tape End AND Acceptance by State Count',
        'Acceptance by DFA AND Acceptance by NFA'
      ],
      answerIndex: 0,
      explanation: 'Theorem: The class of languages accepted by PDA via final state L(M) is IDENTICAL to the class accepted by empty stack N(M).',
      topic: 'PDA Acceptance Modes'
    },
    {
      id: 'm4_q3',
      question: 'How does Deterministic PDA (DPDA) compare in power to Non-deterministic PDA (NPDA)?',
      options: [
        'DPDA is STRICTLY LESS POWERFUL than NPDA',
        'DPDA and NPDA are equal in power',
        'DPDA is more powerful than NPDA',
        'Neither can accept context-free languages'
      ],
      answerIndex: 0,
      explanation: 'Unlike finite automata where DFA ≡ NFA, DPDAs are strictly less powerful than NPDAs! (DPDAs cannot recognize inherent ambiguous/palindromic languages like L = {w w^R}).',
      topic: 'DPDA vs NPDA'
    },
    {
      id: 'm4_q4',
      question: 'When converting a CFG G into a 1-state top-down PDA accepting by empty stack, what transition replaces variable production A → α?',
      options: ['δ(q, ε, A) = {(q, α)}', 'δ(q, a, A) = {(q, ε)}', 'δ(q, A, α) = {(q, A)}', 'δ(q, α, A) = {(q, ε)}'],
      answerIndex: 0,
      explanation: 'Variable production A → α is simulated on stack by popped variable A replaced with RHS string α via ε input: δ(q, ε, A) = {(q, α)}.',
      topic: 'CFG to PDA Conversion'
    },
    {
      id: 'm4_q5',
      question: 'In converting a CFG to a 1-state PDA, what transition is added for each terminal symbol a ∈ T?',
      options: ['δ(q, a, a) = {(q, ε)}', 'δ(q, ε, a) = {(q, a)}', 'δ(q, a, ε) = {(q, a)}', 'δ(q, a, Z0) = {(q, ε)}'],
      answerIndex: 0,
      explanation: 'When terminal symbol a is at the top of the stack and input symbol a is read, the PDA pops a from the stack: δ(q, a, a) = {(q, ε)}.',
      topic: 'Terminal Matching in PDA'
    },
    {
      id: 'm4_q6',
      question: 'What does an Instantaneous Description (ID) (q, w, γ) of a PDA represent?',
      options: [
        'Current state q, unconsumed input string w, and current stack contents γ',
        'Current state, total states, and input length',
        'Start state, final state, and transition table',
        'Stack alphabet, tape head position, and transition matrix'
      ],
      answerIndex: 0,
      explanation: 'An ID configuration (q, w, γ) completely captures the PDA state at any moment: state q ∈ Q, remaining input w ∈ Σ*, and stack string γ ∈ Γ*.',
      topic: 'Instantaneous Description'
    },
    {
      id: 'm4_q7',
      question: 'What is the language N(M) accepted by a PDA M by EMPTY STACK?',
      options: [
        'N(M) = { w ∈ Σ* | (q0, w, Z0) ⊢* (q, ε, ε) for some state q }',
        'N(M) = { w ∈ Σ* | (q0, w, Z0) ⊢* (p, ε, γ) where p ∈ F }',
        'N(M) = { w ∈ Σ* | stack size = 10 }',
        'N(M) = ∅'
      ],
      answerIndex: 0,
      explanation: 'Empty stack acceptance requires consuming the full input w and reducing the stack to empty ε, regardless of final state.',
      topic: 'Empty Stack Acceptance'
    },
    {
      id: 'm4_q8',
      question: 'What is the language L(M) accepted by a PDA M by FINAL STATE?',
      options: [
        'L(M) = { w ∈ Σ* | (q0, w, Z0) ⊢* (p, ε, γ) where p ∈ F and γ ∈ Γ* }',
        'L(M) = { w ∈ Σ* | stack is empty }',
        'L(M) = { w ∈ Σ* | state = q0 }',
        'L(M) = Σ*'
      ],
      answerIndex: 0,
      explanation: 'Final state acceptance requires consuming the full input w and reaching an accepting state p ∈ F, regardless of stack contents.',
      topic: 'Final State Acceptance'
    },
    {
      id: 'm4_q9',
      question: 'Why CANNOT a Deterministic PDA (DPDA) accept the palindrome language L = { w w^R | w ∈ {0,1}* }?',
      options: [
        'Because a DPDA cannot deterministically guess where the middle of the string w w^R occurs without non-determinism',
        'Because L is not context-free',
        'Because DPDAs cannot use stacks',
        'Because L requires 3 stacks'
      ],
      answerIndex: 0,
      explanation: 'Without a middle marker symbol, the machine must non-deterministically guess the midpoint to switch from pushing w to popping w^R.',
      topic: 'DPDA Palindrome Limitation'
    },
    {
      id: 'm4_q10',
      question: 'Can a Deterministic PDA (DPDA) accept the marked palindrome language L = { w c w^R | w ∈ {0,1}* }?',
      options: [
        'YES! The explicit marker c signals the exact midpoint deterministically',
        'No, palindromic languages are never deterministic',
        'Only if length is less than 5',
        'No, requires Turing machine'
      ],
      answerIndex: 0,
      explanation: 'The marker symbol c unambiguously tells the PDA to stop pushing characters and start matching/popping w^R deterministically.',
      topic: 'Marked Palindromes in DPDA'
    },
    {
      id: 'm4_q11',
      question: 'In a PDA transition δ(q, a, Z) = {(p, X Y)}, what happens to the top stack symbol Z?',
      options: [
        'Z is POPPED and replaced by the string X Y (with X on top of Y)',
        'Z remains on stack and X Y is added',
        'Z is duplicated',
        'Z is deleted without replacement'
      ],
      answerIndex: 0,
      explanation: 'In PDA transitions, the top symbol Z is consumed (popped) and replaced by the target string X Y (leftmost symbol X becomes new stack top).',
      topic: 'Stack Replacement Mechanics'
    },
    {
      id: 'm4_q12',
      question: 'How do you represent a POP operation in a PDA transition δ(q, a, Z)?',
      options: ['δ(q, a, Z) = {(p, ε)}', 'δ(q, a, Z) = {(p, Z)}', 'δ(q, a, Z) = {(p, Z Z)}', 'δ(q, a, ε) = {(p, Z)}'],
      answerIndex: 0,
      explanation: 'Replacing top stack symbol Z with ε effectively pops Z from the stack without pushing any replacement.',
      topic: 'PDA Pop Operation'
    },
    {
      id: 'm4_q13',
      question: 'What is the formal 7-tuple definition of a Pushdown Automaton M = (Q, Σ, Γ, δ, q0, Z0, F)? What does Z0 represent?',
      options: [
        'Initial start symbol on the stack',
        'Final accepting state',
        'Set of input symbols',
        'Blank tape symbol'
      ],
      answerIndex: 0,
      explanation: 'Z0 ∈ Γ is the designated initial stack marker present on the stack when the PDA begins execution.',
      topic: 'PDA Formal 7-Tuple'
    },
    {
      id: 'm4_q14',
      question: 'What is the determinism condition for a DPDA regarding ε-transitions?',
      options: [
        'If δ(q, ε, Z) is non-empty, then δ(q, a, Z) MUST BE EMPTY for all a ∈ Σ',
        'ε-transitions are forbidden in DPDAs',
        'δ(q, ε, Z) can exist alongside δ(q, a, Z)',
        'DPDAs must have 2 stack symbols'
      ],
      answerIndex: 0,
      explanation: 'To prevent ambiguity between reading an input symbol vs making an ε-move, if an ε-transition is defined for (q, Z), no input transition δ(q, a, Z) is allowed.',
      topic: 'DPDA Determinism Rule'
    },
    {
      id: 'm4_q15',
      question: 'Are Deterministic Context-Free Languages (DCFLs) closed under COMPLEMENTATION?',
      options: [
        'YES! DCFLs are closed under complementation (unlike general CFLs)',
        'No, DCFLs are not closed under complement',
        'Only finite DCFLs are closed',
        'Closed under intersection but not complement'
      ],
      answerIndex: 0,
      explanation: 'Theorem: The complement of any DCFL is also a DCFL. This is a major structural difference from general non-deterministic CFLs.',
      topic: 'DCFL Complementation'
    },
    {
      id: 'm4_q16',
      question: 'In converting an Empty Stack PDA N(M) to a Final State PDA L(M\'), how many new states are added?',
      options: ['2 new states (a new start state q0\' and a new final state qf)', '0 new states', '1 new state', '5 new states'],
      answerIndex: 0,
      explanation: 'We add a new start state q0\' (which pushes initial stack marker X0 and jumps to q0) and a new final state qf (reached when X0 is exposed on empty stack).',
      topic: 'PDA Model Equivalence Conversion'
    },
    {
      id: 'm4_q17',
      question: 'Is the language L = { a^n b^n c^n | n ≥ 1 } Context-Free (accepted by a PDA)?',
      options: [
        'NO! It is a Context-Sensitive Language (requires 2 stacks / Turing Machine)',
        'Yes, accepted by a 1-stack PDA',
        'Yes, it is regular',
        'Yes, accepted by a DPDA'
      ],
      answerIndex: 0,
      explanation: 'A 1-stack PDA can match a^n with b^n by pushing/popping, but cannot simultaneously track c^n. Thus L = {a^n b^n c^n} is non-CFL.',
      topic: 'Non-CFL Proof'
    },
    {
      id: 'm4_q18',
      question: 'What is the computational power of a Pushdown Automaton equipped with TWO STACKS?',
      options: [
        'EQUIVALENT to a Turing Machine (Universal computation)',
        'Equivalent to a 1-stack PDA',
        'Equivalent to a DFA',
        'Less powerful than a DPDA'
      ],
      answerIndex: 0,
      explanation: 'Two stacks can simulate the left and right halves of an infinite Turing Machine tape. Hence 2-stack PDA ≡ Turing Machine.',
      topic: 'Multi-Stack PDA Power'
    },
    {
      id: 'm4_q19',
      question: 'In the Instantaneous Description step (q, a w, Z γ) ⊢ (p, w, β γ), what transition rule was executed?',
      options: ['δ(q, a, Z) contains (p, β)', 'δ(p, w, β) = (q, a)', 'δ(q, ε, Z) = (p, β)', 'δ(q, a, γ) = (p, Z)'],
      answerIndex: 0,
      explanation: 'Input symbol a was consumed, state changed from q to p, and stack top Z was replaced by string β.',
      topic: 'ID Step Mechanics'
    },
    {
      id: 'm4_q20',
      question: 'Which language is accepted by a DPDA but NOT by any DFA?',
      options: [
        'L = { a^n b^n | n ≥ 1 }',
        'L = { a^n | n ≥ 0 }',
        'L = { w w^R | w ∈ {0,1}* }',
        'L = { a^n b^n c^n | n ≥ 1 }'
      ],
      answerIndex: 0,
      explanation: 'L = {a^n b^n} requires stack memory (non-regular, so no DFA), but can be accepted deterministically by pushing a\'s and popping b\'s.',
      topic: 'DCFL vs Regular'
    }
  ],

  // ==========================================
  // MODULE 5: TURING MACHINES, UNDECIDABILITY & COMPILER PARSING (20 Questions)
  // ==========================================
  5: [
    {
      id: 'm5_q1',
      question: 'In a Turing Machine transition δ(q, X) = (p, Y, D), what action does the machine take?',
      options: [
        'Reads symbol X, writes symbol Y, transitions to state p, and moves tape head in direction D ∈ {L, R}',
        'Pops X from stack and pushes Y',
        'Reads input X without writing',
        'Deletes state q'
      ],
      answerIndex: 0,
      explanation: 'A TM transition reads tape symbol X, overwrites it with Y, moves to state p, and moves the read/write head Left (L) or Right (R).',
      topic: 'TM Tape Head Action'
    },
    {
      id: 'm5_q2',
      question: 'A language L is defined as RECURSIVE (Decidable) if:',
      options: [
        'There exists a Turing Machine that accepts L and HALTS FOR ALL INPUT STRINGS',
        'The TM loops forever on invalid strings',
        'L cannot be recognized by any machine',
        'L has no final states'
      ],
      answerIndex: 0,
      explanation: 'Recursive (Decidable) languages guarantee that the TM halts on every input string w ∈ Σ*, returning YES or NO.',
      topic: 'Decidability Definition'
    },
    {
      id: 'm5_q3',
      question: 'A language L is RECURSIVELY ENUMERABLE (Turing Recognizable) if:',
      options: [
        'There exists a TM that halts and accepts for w ∈ L, but MAY LOOP FOREVER for w ∉ L',
        'The TM halts on all inputs',
        'It is accepted by a DFA',
        'Its complement is finite'
      ],
      answerIndex: 0,
      explanation: 'Recursively Enumerable (RE) languages only guarantee halting on accepting inputs; for rejected inputs, the TM may run forever in an infinite loop.',
      topic: 'Recursively Enumerable'
    },
    {
      id: 'm5_q4',
      question: 'What is the Halting Problem?',
      options: [
        'Given a Turing Machine M and input w, decide whether M halts on w (Proved UNDECIDABLE by Turing)',
        'Deciding if a DFA has 5 states',
        'Finding if an NFA accepts ε',
        'Sorting numbers on a tape'
      ],
      answerIndex: 0,
      explanation: 'The Halting Problem HALT_TM = { ⟨M, w⟩ | M halts on w } is undecidable (no algorithm exists that solves it for all pairs).',
      topic: 'Halting Problem'
    },
    {
      id: 'm5_q5',
      question: 'In compiler design, which automaton model is used in the Lexical Analysis phase (Scanner)?',
      options: [
        'Deterministic Finite Automata (DFA) / Regular Expressions',
        'Pushdown Automata (PDA)',
        'Turing Machines',
        'Linear Bounded Automata'
      ],
      answerIndex: 0,
      explanation: 'The Lexical Analyzer (Scanner) scans input characters into TOKENS using DFAs and Regular Expressions.',
      topic: 'Lexical Analysis Model'
    },
    {
      id: 'm5_q6',
      question: 'Which phase of the compiler uses Context-Free Grammars and Pushdown Automata models?',
      options: [
        'Syntax Analysis (Parser)',
        'Lexical Analysis (Scanner)',
        'Code Optimization',
        'Target Code Generation'
      ],
      answerIndex: 0,
      explanation: 'The Syntax Analyzer (Parser) checks sentence structure against CFG rules using top-down (LL) or bottom-up (LR) parsing models.',
      topic: 'Syntax Analysis Model'
    },
    {
      id: 'm5_q7',
      question: 'What is the Church-Turing Thesis?',
      options: [
        'The informal hypothesis that any algorithmically computable function can be computed by a Turing Machine',
        'A proof that DFAs equal Turing machines',
        'A theorem about P vs NP',
        'A compiler design pattern'
      ],
      answerIndex: 0,
      explanation: 'The Church-Turing thesis asserts that our intuitive mathematical notion of an effective algorithm corresponds exactly to what a Turing Machine can compute.',
      topic: 'Church-Turing Thesis'
    },
    {
      id: 'm5_q8',
      question: 'What is a Universal Turing Machine (UTM)?',
      options: [
        'A Turing Machine U that can simulate ANY arbitrary Turing Machine M on input w when provided with description ⟨M, w⟩',
        'A machine with infinite tapes',
        'A DFA with unlimited memory',
        'A hardware processor chip'
      ],
      answerIndex: 0,
      explanation: 'A UTM acts like a programmable computer: it takes the encoded program ⟨M⟩ and data w as input and simulates M\'s execution step-by-step.',
      topic: 'Universal Turing Machine'
    },
    {
      id: 'm5_q9',
      question: 'What does Post\'s Correspondence Problem (PCP) ask, and what is its decidability status?',
      options: [
        'Given pairs of string dominos (A_i, B_i), find a sequence where concatenated A_i equals B_i (UNDECIDABLE)',
        'Find shortest path in a graph (Decidable)',
        'Check if CFG is empty (Decidable)',
        'Convert NFA to DFA (Decidable)'
      ],
      answerIndex: 0,
      explanation: 'PCP asks if there exists a sequence of index selections such that string concatenation match: top string = bottom string. Proved Undecidable by Emil Post.',
      topic: 'Post Correspondence Problem'
    },
    {
      id: 'm5_q10',
      question: 'What does Rice\'s Theorem state about properties of Recursively Enumerable languages?',
      options: [
        'ANY non-trivial semantic property of the language accepted by a Turing Machine is UNDECIDABLE',
        'All properties of TMs are decidable',
        'Only context-free languages are undecidable',
        'DFA state minimization is NP-hard'
      ],
      answerIndex: 0,
      explanation: 'Rice\'s Theorem proves that asking any question about what language a TM accepts (e.g., "Is L(M) empty?", "Is L(M) finite?") is undecidable.',
      topic: 'Rice\'s Theorem'
    },
    {
      id: 'm5_q11',
      question: 'Does a MULTI-TAPE Turing Machine have more computational power than a Single-Tape Turing Machine?',
      options: [
        'NO! Multi-tape TMs accept the EXACT SAME class of languages as single-tape TMs (though multi-tape can be quadratically faster)',
        'Yes, multi-tape TMs can solve undecidable problems',
        'No, multi-tape TMs are weaker',
        'Yes, multi-tape TMs equal 3-stack PDAs'
      ],
      answerIndex: 0,
      explanation: 'A single-tape TM can simulate k tapes by placing track markers and scanning back and forth. Computational power is identical.',
      topic: 'Multi-tape TM Power'
    },
    {
      id: 'm5_q12',
      question: 'How does a Non-deterministic Turing Machine (NTM) compare in computational power to a Deterministic TM (DTM)?',
      options: [
        'They are EQUIVALENT in computational power (a DTM can simulate an NTM via breadth-first search of the computation tree)',
        'NTM is strictly more powerful than DTM',
        'DTM is more powerful than NTM',
        'NTMs cannot handle blank symbols'
      ],
      answerIndex: 0,
      explanation: 'A DTM can systematically explore all NTM branching paths using BFS on a multi-tape configuration tree. Thus NTM ≡ DTM.',
      topic: 'NTM vs DTM Power'
    },
    {
      id: 'm5_q13',
      question: 'In the formal 7-tuple definition of a Turing Machine M = (Q, Σ, Γ, δ, q0, B, F), what does B represent?',
      options: [
        'The special BLANK symbol on the tape (B ∈ Γ \\ Σ)',
        'The start state',
        'The bottom stack marker',
        'The binary alphabet'
      ],
      answerIndex: 0,
      explanation: 'B is the designated blank symbol that fills all unused infinite cells of the Turing machine tape outside the input string.',
      topic: 'TM Formal 7-Tuple'
    },
    {
      id: 'm5_q14',
      question: 'If a language L is Recursive (Decidable), what can be said about its complement L_c?',
      options: [
        'L_c is ALSO Recursive (Decidable)',
        'L_c is non-recursively enumerable',
        'L_c is context-free',
        'L_c must be finite'
      ],
      answerIndex: 0,
      explanation: 'Since the TM for L always halts with YES or NO, swapping accept and reject halting states yields a TM for L_c that always halts. Thus L_c is decidable.',
      topic: 'Decidable Language Closure'
    },
    {
      id: 'm5_q15',
      question: 'If both language L AND its complement L_c are Recursively Enumerable (RE), what is L?',
      options: [
        'L MUST BE RECURSIVE (Decidable)',
        'L is undecidable',
        'L is non-RE',
        'L is regular'
      ],
      answerIndex: 0,
      explanation: 'Theorem: Run TMs for L and L_c in parallel (interleaved steps). One of them is guaranteed to halt. If TM_L halts first, accept; if TM_Lc halts first, reject. Thus L is decidable.',
      topic: 'RE Complement Theorem'
    },
    {
      id: 'm5_q16',
      question: 'Which automaton model corresponds to Context-Sensitive Grammars (Type 1 in Chomsky Hierarchy)?',
      options: [
        'Linear Bounded Automaton (LBA)',
        'Pushdown Automaton (PDA)',
        'Finite Automaton (DFA)',
        'Unrestricted Turing Machine'
      ],
      answerIndex: 0,
      explanation: 'A Linear Bounded Automaton (LBA) is a non-deterministic TM whose tape head cannot move beyond the portion of tape occupied by the initial input.',
      topic: 'Linear Bounded Automata'
    },
    {
      id: 'm5_q17',
      question: 'What characterizes an LL(k) parser in compiler syntax analysis?',
      options: [
        'Scans input Left-to-right, builds Leftmost derivation, using k lookahead tokens',
        'Scans Right-to-left, builds Leftmost derivation',
        'Scans Left-to-right, builds Rightmost derivation',
        'Uses Linear Bounded Automata'
      ],
      answerIndex: 0,
      explanation: 'LL(k) stands for Left-to-right scan, Leftmost derivation, using k lookahead symbols (top-down parsing).',
      topic: 'LL Parser Characteristics'
    },
    {
      id: 'm5_q18',
      question: 'What characterizes an LR(k) parser in compiler syntax analysis?',
      options: [
        'Scans input Left-to-right, builds Rightmost derivation in Reverse, using k lookahead tokens',
        'Scans Left-to-right, builds Leftmost derivation',
        'Scans Right-to-left, builds Rightmost derivation',
        'Uses finite state machines only'
      ],
      answerIndex: 0,
      explanation: 'LR(k) stands for Left-to-right scan, Rightmost derivation in reverse, with k lookahead symbols (bottom-up shift-reduce parsing).',
      topic: 'LR Parser Characteristics'
    },
    {
      id: 'm5_q19',
      question: 'What reduction technique is used to prove that a new problem P2 is UNDECIDABLE?',
      options: [
        'Show that a known undecidable problem P1 (like Halting Problem) can be REDUCED to P2 (P1 ≤_m P2)',
        'Reduce P2 to a DFA',
        'Convert P2 into a regular expression',
        'Show P2 has 3 states'
      ],
      answerIndex: 0,
      explanation: 'If P1 reduces to P2 (P1 ≤_m P2), an algorithm for P2 would yield an algorithm for P1. Since P1 is undecidable, P2 must also be undecidable.',
      topic: 'Reduction Proof Strategy'
    },
    {
      id: 'm5_q20',
      question: 'Who created the Diagonalization Method originally used to prove that real numbers are uncountable, later adapted to prove the Halting Problem undecidable?',
      options: ['Georg Cantor', 'Alan Turing', 'Noam Chomsky', 'Stephen Cook'],
      answerIndex: 0,
      explanation: 'Georg Cantor invented Diagonalization in 1891 to prove the uncountability of real numbers. Turing adapted it in 1936 to prove TM undecidability.',
      topic: 'Diagonalization History'
    }
  ]
};

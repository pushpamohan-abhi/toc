import { SlideData } from '../types';

export const MODULE_3_SLIDES: SlideData[] = [
  {
    id: 'slide_m3_1',
    number: 1,
    title: 'Module 3 Overview: Context-Free Grammars (CFG)',
    category: '1. CFG Basics',
    textbookSection: 'Section 5.1',
    bullets: [
      'A Context-Free Grammar (CFG) is a 4-tuple G = (V, T, P, S):',
      '  • V: Finite set of Variables / Non-terminals (e.g., S, A, B)',
      '  • T: Finite set of Terminal symbols (e.g., a, b, 0, 1)',
      '  • P: Production rules of form A → α, where A ∈ V and α ∈ (V ∪ T)*',
      '  • S: Start variable (S ∈ V)',
      'Context-Free property: The left-hand side of every production rule contains EXACTLY ONE variable A (no surrounding context required).'
    ],
    formulas: [
      'G = (V, T, P, S)',
      'A → α,  where A ∈ V and α ∈ (V ∪ T)*'
    ],
    exampleBox: {
      title: 'Example CFG for Balanced Parentheses or Palindromes',
      description: 'Palindrome Grammar over {a, b}:\n  S → a S a | b S b | a | b | ε\n\nBalanced Parentheses Grammar:\n  S → ( S ) S | ε\n\nExpression Grammar:\n  E → E + T | T\n  T → T * F | F\n  F → ( E ) | id'
    }
  },
  {
    id: 'slide_m3_2',
    number: 2,
    title: 'Derivations, Parse Trees & Ambiguity',
    category: '2. Derivations & Parse Trees',
    textbookSection: 'Section 5.2 - 5.4',
    bullets: [
      'Leftmost Derivation (LMD): At each step, the leftmost variable is replaced by a right-hand side of a production rule.',
      'Rightmost Derivation (RMD): At each step, the rightmost variable is replaced.',
      'Parse Tree: A hierarchical tree representation of a derivation where root is S, internal nodes are variables, and leaves are terminals.',
      'Ambiguity: A CFG G is AMBIGUOUS if there exists at least one string w ∈ L(G) that has TWO OR MORE distinct parse trees (or distinct LMDs).'
    ],
    exampleBox: {
      title: 'Ambiguity Example: Expression Grammar',
      description: 'Grammar: E → E + E | E * E | id\nString: id + id * id\n\nParse Tree 1 ((id + id) * id):\n        E\n       /|\\\n      E * E\n     /|\\   \\\n    E + E  id\n\nParse Tree 2 (id + (id * id)):\n        E\n       /|\\\n      E + E\n     /   /|\\\n    id  E * E\n\nResult: 2 distinct trees => Grammar is AMBIGUOUS!'
    }
  },
  {
    id: 'slide_m3_3',
    number: 3,
    title: 'Simplification of Context-Free Grammars',
    category: '3. CFG Simplification',
    textbookSection: 'Section 7.1',
    bullets: [
      'Simplification removes redundant or useless productions without changing the generated language L(G).',
      'Three Sequential Simplification Steps:',
      '  1. Elimination of ε-Productions (A → ε): Identify nullable variables and add productions omitting nullable variables.',
      '  2. Elimination of Unit Productions (A → B): Replace A → B with A → α for all B → α.',
      '  3. Elimination of Useless Symbols:',
      '     • Step 3a: Remove non-generating variables (variables that cannot derive any terminal string).',
      '     • Step 3b: Remove unreachable variables (variables unreachable from start symbol S).'
    ],
    exampleBox: {
      title: 'Simplification Sequence Requirement',
      description: 'CRITICAL ORDER OF SIMPLIFICATION:\n  Step 1: Eliminate ε-productions FIRST\n  Step 2: Eliminate Unit-productions SECOND\n  Step 3: Eliminate Useless Symbols LAST\n\nFailing to follow this order can re-introduce unit productions or useless symbols!'
    }
  },
  {
    id: 'slide_m3_4',
    number: 4,
    title: 'Normal Forms: Chomsky Normal Form (CNF)',
    category: '4. Chomsky Normal Form',
    textbookSection: 'Section 7.1.5',
    bullets: [
      'Chomsky Normal Form (CNF) restricts every production rule to one of two exact formats:',
      '  1. A → B C  (where A, B, C are variables/non-terminals)',
      '  2. A → a    (where a is a single terminal symbol)',
      '  (If ε ∈ L(G), S → ε is permitted provided S does not appear on RHS).',
      'Algorithm to convert CFG to CNF:',
      '  1. Simplify grammar (remove ε-productions, unit productions, useless symbols).',
      '  2. Replace terminals in mixed RHS rules (length ≥ 2) with new variables.',
      '  3. Cascade long RHS variables (length ≥ 3) into binary variable pairs.'
    ],
    formulas: [
      'CNF Rules:  A → B C   OR   A → a',
      'Derivation Length in CNF: For string w of length |w| = n, derivation takes EXACTLY 2n - 1 steps!'
    ],
    exampleBox: {
      title: 'CNF Derivation Length Property',
      description: 'Theorem: If G is in CNF and derives string w of length n = |w| ≥ 1, then ANY derivation tree for w has exactly 2n - 1 steps (internal & leaf nodes).'
    }
  },
  {
    id: 'slide_m3_5',
    number: 5,
    title: 'Normal Forms: Greibach Normal Form (GNF)',
    category: '5. Greibach Normal Form',
    textbookSection: 'Section 7.1.6',
    bullets: [
      'Greibach Normal Form (GNF) requires every production rule to start with a terminal symbol:',
      '  A → a α   (where a ∈ T is a single terminal and α ∈ V* is a sequence of zero or more variables)',
      'Significance of GNF:',
      '  • Every step in a GNF derivation consumes EXACTLY ONE input terminal.',
      '  • Directly enables construction of a Pushdown Automaton (PDA) with NO ε-transitions that consumes 1 input symbol per step.'
    ],
    formulas: [
      'GNF Rule:  A → a A1 A2 ... Ak   (k ≥ 0)'
    ],
    exampleBox: {
      title: 'GNF Structure Example',
      description: 'Grammar in GNF:\n  S → a A B | b\n  A → a A | a\n  B → b B | b\n\nNotice every RHS starts with a terminal ("a" or "b") followed by zero or more variables!'
    }
  }
];

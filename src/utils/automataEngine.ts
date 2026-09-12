import { AutomatonData, SimulationStep, SubsetRow } from '../types';

/**
 * Normalizes symbol comparison (e.g. 'eps', 'epsilon', 'ε', '' -> 'ε')
 * Note: 'e' is a standard alphabet character (e.g. in "then", "web", "ebay") and MUST NOT be treated as epsilon.
 */
export function isEpsilon(symbol: string): boolean {
  const s = symbol.trim().toLowerCase();
  return s === 'ε' || s === 'eps' || s === 'epsilon' || s === '' || s === 'λ' || s === 'lambda';
}

/**
 * Calculates ε-closure for a set of state IDs in an automaton
 */
export function computeEpsilonClosure(automaton: AutomatonData, startStates: string[]): string[] {
  const closure = new Set<string>(startStates);
  const queue = [...startStates];

  while (queue.length > 0) {
    const currentStateId = queue.shift()!;
    // Find all transitions from currentStateId with ε
    const epsTransitions = automaton.transitions.filter(
      (t) => t.from === currentStateId && isEpsilon(t.symbol)
    );

    for (const t of epsTransitions) {
      if (!closure.has(t.to)) {
        closure.add(t.to);
        queue.push(t.to);
      }
    }
  }

  return Array.from(closure).sort();
}

/**
 * Returns set of next states given current states and input symbol (without ε-closure of target)
 */
export function getDirectNextStates(
  automaton: AutomatonData,
  currentStates: string[],
  symbol: string
): { nextStates: string[]; transitionIds: string[] } {
  const nextSet = new Set<string>();
  const activeTransIds: string[] = [];

  for (const stateId of currentStates) {
    const matchingTrans = automaton.transitions.filter((t) => {
      if (t.from !== stateId) return false;
      if (isEpsilon(t.symbol)) return false;

      const rawSym = t.symbol.trim();
      if (rawSym === symbol) return true;
      if (rawSym === '0..9' && /^[0-9]$/.test(symbol)) return true;
      if (rawSym === 'a..z' && /^[a-z]$/i.test(symbol)) return true;

      // Handle comma or slash separated lists e.g. "0, 1", "0,1", "a, b", "0/1"
      const parts = rawSym.split(/[,/]/).map((p) => p.trim());
      if (parts.includes(symbol)) return true;

      return false;
    });

    for (const t of matchingTrans) {
      nextSet.add(t.to);
      activeTransIds.push(t.id);
    }
  }

  return { nextStates: Array.from(nextSet).sort(), transitionIds: activeTransIds };
}

/**
 * Calculates ε-closure for a set of state IDs in an automaton along with ε-transition IDs
 */
export function computeEpsilonClosureDetails(
  automaton: AutomatonData,
  startStates: string[]
): { closure: string[]; transitionIds: string[] } {
  const closure = new Set<string>(startStates);
  const queue = [...startStates];
  const epsTransIds: string[] = [];

  while (queue.length > 0) {
    const currentStateId = queue.shift()!;
    const epsTransitions = automaton.transitions.filter(
      (t) => t.from === currentStateId && isEpsilon(t.symbol)
    );

    for (const t of epsTransitions) {
      epsTransIds.push(t.id);
      if (!closure.has(t.to)) {
        closure.add(t.to);
        queue.push(t.to);
      }
    }
  }

  return { closure: Array.from(closure).sort(), transitionIds: epsTransIds };
}

/**
 * Tokenizes an input string based on the automaton's alphabet and delimiters.
 * Handles comma-separated inputs (e.g. "Push, Push", "0, 1") and multi-character symbols (e.g. "Push").
 */
export function tokenizeInput(automaton: AutomatonData, inputString: string): string[] {
  if (!inputString || inputString.trim() === '') return [];

  const raw = inputString.trim();

  // 1. If input contains commas
  if (raw.includes(',')) {
    return raw.split(',').map((s) => s.trim()).filter(Boolean);
  }

  // 2. Check if alphabet has multi-character tokens like "Push"
  const multiCharTokens = automaton.alphabet.filter((a) => a.length > 1);
  if (multiCharTokens.length > 0) {
    const sortedAlphabet = [...automaton.alphabet].sort((a, b) => b.length - a.length);
    const tokens: string[] = [];
    let pos = 0;

    while (pos < raw.length) {
      if (raw[pos] === ' ') {
        pos++;
        continue;
      }

      let matchedToken: string | null = null;
      for (const alphaToken of sortedAlphabet) {
        if (raw.startsWith(alphaToken, pos)) {
          matchedToken = alphaToken;
          break;
        }
      }

      if (matchedToken) {
        tokens.push(matchedToken);
        pos += matchedToken.length;
      } else {
        tokens.push(raw[pos]);
        pos++;
      }
    }

    return tokens;
  }

  // 3. Standard single-character tokenization
  return raw.split('');
}

/**
 * Simulates string execution on DFA, NFA, or ε-NFA step by step
 */
export function simulateAutomaton(automaton: AutomatonData, inputString: string): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const startState = automaton.states.find((s) => s.isStart);

  if (!startState) {
    return [
      {
        stepIndex: 0,
        inputChar: null,
        processedInput: '',
        remainingInput: inputString,
        currentStates: [],
        activeTransitionIds: [],
        status: 'rejected',
        log: 'Error: No start state defined in automaton.'
      }
    ];
  }

  // Initial active states
  let currentActive = automaton.type === 'ENFA'
    ? computeEpsilonClosure(automaton, [startState.id])
    : [startState.id];

  const getStateLabels = (ids: string[]) =>
    ids
      .map((id) => automaton.states.find((s) => s.id === id)?.label || id)
      .join(', ');

  const tokens = tokenizeInput(automaton, inputString);
  const tokenSep = automaton.alphabet.some((a) => a.length > 1) ? ', ' : '';

  // Step 0: Initial state
  steps.push({
    stepIndex: 0,
    inputChar: null,
    processedInput: '',
    remainingInput: tokens.join(tokenSep),
    currentStates: [...currentActive],
    activeTransitionIds: [],
    status: 'running',
    log: `Initialized at start state: {${getStateLabels(currentActive)}}`
  });

  // If input string is empty
  if (tokens.length === 0) {
    const isAccepted = currentActive.some(
      (id) => automaton.states.find((s) => s.id === id)?.isFinal
    );
    steps[0].status = isAccepted ? 'accepted' : 'rejected';
    steps[0].log += isAccepted
      ? ' -> String is EMPTY & contains an accepting state. ACCEPTED!'
      : ' -> String is EMPTY & no accepting state reached. REJECTED!';
    return steps;
  }

  const processedTokens: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    processedTokens.push(token);
    const remainingTokens = tokens.slice(i + 1);

    const { nextStates, transitionIds: directTransIds } = getDirectNextStates(automaton, currentActive, token);

    // Apply ε-closure if ENFA
    let finalNextStates = nextStates;
    let allActiveTransIds = [...directTransIds];

    if (automaton.type === 'ENFA') {
      const { closure, transitionIds: epsTransIds } = computeEpsilonClosureDetails(automaton, nextStates);
      finalNextStates = closure;
      allActiveTransIds = Array.from(new Set([...directTransIds, ...epsTransIds]));
    }

    const isLastChar = i === tokens.length - 1;
    const hasAccepting = finalNextStates.some(
      (id) => automaton.states.find((s) => s.id === id)?.isFinal
    );

    let status: 'running' | 'accepted' | 'rejected' = 'running';
    if (finalNextStates.length === 0) {
      status = 'rejected';
    } else if (isLastChar) {
      status = hasAccepting ? 'accepted' : 'rejected';
    }

    let logMsg = `Read '${token}': {${getStateLabels(currentActive)}} -> {${getStateLabels(
      finalNextStates
    )}}`;
    if (finalNextStates.length === 0) {
      logMsg += ' (NO VALID TRANSITION -> REJECTED)';
    } else if (isLastChar) {
      logMsg += hasAccepting ? ' (ACCEPTING STATE REACHED!)' : ' (NOT ACCEPTING)';
    }

    steps.push({
      stepIndex: i + 1,
      inputChar: token,
      processedInput: processedTokens.join(tokenSep),
      remainingInput: remainingTokens.join(tokenSep),
      currentStates: finalNextStates,
      activeTransitionIds: allActiveTransIds,
      status,
      log: logMsg
    });

    currentActive = finalNextStates;

    if (finalNextStates.length === 0) {
      break; // Stop early if dead state/no transitions
    }
  }

  return steps;
}

/**
 * Subset Construction Algorithm: Converts NFA / ε-NFA to an equivalent DFA
 */
export function convertNfaToDfa(nfa: AutomatonData): { dfa: AutomatonData; subsetTable: SubsetRow[] } {
  const dfaAlphabet = nfa.alphabet.filter((sym) => !isEpsilon(sym));
  if (dfaAlphabet.length === 0) dfaAlphabet.push('0', '1');

  const startState = nfa.states.find((s) => s.isStart);
  const initialNfaStates = startState
    ? computeEpsilonClosure(nfa, [startState.id])
    : [];

  const keyFor = (states: string[]) => [...states].sort().join(',');

  const subsetMap = new Map<string, SubsetRow>();
  const queue: string[][] = [initialNfaStates];

  const getLabelForNfaStates = (states: string[]) => {
    if (states.length === 0) return '∅';
    const labels = states
      .map((id) => nfa.states.find((s) => s.id === id)?.label || id)
      .sort();
    return `{${labels.join(',')}}`;
  };

  let dfaCounter = 0;
  const stateIdMap = new Map<string, string>();

  const getOrCreateDfaStateId = (key: string) => {
    if (!stateIdMap.has(key)) {
      stateIdMap.set(key, `D${dfaCounter++}`);
    }
    return stateIdMap.get(key)!;
  };

  const initialKey = keyFor(initialNfaStates);

  while (queue.length > 0) {
    const currentNfaStates = queue.shift()!;
    const key = keyFor(currentNfaStates);

    if (subsetMap.has(key)) continue;

    const dfaId = getOrCreateDfaStateId(key);
    const dfaLabel = getLabelForNfaStates(currentNfaStates);
    const isStart = key === initialKey;
    const isFinal = currentNfaStates.some(
      (id) => nfa.states.find((s) => s.id === id)?.isFinal
    );

    const transitionsRow: SubsetRow['transitions'] = {};

    for (const sym of dfaAlphabet) {
      const { nextStates: directNext } = getDirectNextStates(nfa, currentNfaStates, sym);
      const fullNext = computeEpsilonClosure(nfa, directNext);
      const nextKey = keyFor(fullNext);
      const targetLabel = getLabelForNfaStates(fullNext);

      transitionsRow[sym] = {
        targetDfaStateLabel: targetLabel,
        targetNfaStates: fullNext
      };

      if (!subsetMap.has(nextKey) && !queue.some((q) => keyFor(q) === nextKey)) {
        queue.push(fullNext);
      }
    }

    subsetMap.set(key, {
      dfaStateId: dfaId,
      dfaStateLabel: dfaLabel,
      nfaStates: currentNfaStates,
      isStart,
      isFinal,
      transitions: transitionsRow
    });
  }

  // Construct converted DFA AutomatonData with clean BFS level layout
  const subsetRows = Array.from(subsetMap.values());

  const depthMap = new Map<string, number>();
  depthMap.set(initialKey, 0);

  const levelGroups = new Map<number, typeof subsetRows>();

  for (const row of subsetRows) {
    const rowKey = keyFor(row.nfaStates);
    const depth = depthMap.get(rowKey) ?? 0;

    for (const sym of dfaAlphabet) {
      const targetStates = row.transitions[sym].targetNfaStates;
      const targetKey = keyFor(targetStates);
      if (!depthMap.has(targetKey)) {
        depthMap.set(targetKey, depth + 1);
      }
    }

    if (!levelGroups.has(depth)) levelGroups.set(depth, []);
    levelGroups.get(depth)!.push(row);
  }

  const dfaStates = subsetRows.map((row) => {
    const rowKey = keyFor(row.nfaStates);
    const depth = depthMap.get(rowKey) ?? 0;
    const group = levelGroups.get(depth) || [row];
    const indexInGroup = group.findIndex((r) => keyFor(r.nfaStates) === rowKey);
    const groupSize = group.length;

    const x = 120 + depth * 230;
    const yCenter = 220;
    const ySpacing = 150;
    const y = yCenter + (indexInGroup - (groupSize - 1) / 2) * ySpacing;

    return {
      id: row.dfaStateId,
      label: row.dfaStateLabel,
      x: Math.round(x),
      y: Math.round(y),
      isStart: row.isStart,
      isFinal: row.isFinal
    };
  });

  const dfaTransitions: AutomatonData['transitions'] = [];
  let transCounter = 0;

  for (const row of subsetRows) {
    for (const sym of dfaAlphabet) {
      const targetStates = row.transitions[sym].targetNfaStates;
      const targetKey = keyFor(targetStates);
      const targetId = stateIdMap.get(targetKey)!;

      dfaTransitions.push({
        id: `dt_${transCounter++}`,
        from: row.dfaStateId,
        to: targetId,
        symbol: sym
      });
    }
  }

  const dfa: AutomatonData = {
    id: `${nfa.id}_dfa_converted`,
    name: `Converted DFA (${nfa.name})`,
    description: `Equivalent Deterministic Finite Automaton generated via Subset Construction.`,
    type: 'DFA',
    alphabet: dfaAlphabet,
    states: dfaStates,
    transitions: dfaTransitions,
    testStrings: nfa.testStrings
  };

  return { dfa, subsetTable: subsetRows };
}

/**
 * Validates automaton consistency
 */
export function validateAutomaton(automaton: AutomatonData): string[] {
  const issues: string[] = [];
  const startCount = automaton.states.filter((s) => s.isStart).length;

  if (startCount === 0) issues.push('Missing initial start state.');
  if (startCount > 1) issues.push('Multiple start states defined (automata have exactly 1 start state).');

  if (automaton.type === 'DFA') {
    // Check if deterministic (no ε moves and at most 1 transition per symbol per state)
    for (const s of automaton.states) {
      const transFromS = automaton.transitions.filter((t) => t.from === s.id);
      if (transFromS.some((t) => isEpsilon(t.symbol))) {
        issues.push(`State '${s.label}' contains an epsilon transition in a DFA!`);
      }
      for (const sym of automaton.alphabet) {
        const count = transFromS.filter((t) => t.symbol === sym).length;
        if (count > 1) {
          issues.push(`State '${s.label}' has ${count} transitions for symbol '${sym}' (DFA must have ≤ 1).`);
        }
      }
    }
  }

  return issues;
}

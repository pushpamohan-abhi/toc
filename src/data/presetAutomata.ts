import { AutomatonData } from '../types';

export const PRESET_AUTOMATA: AutomatonData[] = [
  {
    id: 'on_off_switch',
    name: 'On/Off Switch DFA',
    description: 'Simplest nontrivial finite automaton modeling a toggle switch (Push button).',
    type: 'DFA',
    alphabet: ['Push'],
    states: [
      { id: 'off', label: 'Off', x: 200, y: 200, isStart: true, isFinal: false },
      { id: 'on', label: 'On', x: 450, y: 200, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't1', from: 'off', to: 'on', symbol: 'Push' },
      { id: 't2', from: 'on', to: 'off', symbol: 'Push' }
    ],
    testStrings: ['Push', 'Push,Push', 'Push,Push,Push']
  },
  {
    id: 'keyword_then',
    name: 'Keyword "then" Recognizer DFA',
    description: 'Lexical analyzer component that recognizes the exact word "then".',
    type: 'DFA',
    alphabet: ['t', 'h', 'e', 'n'],
    states: [
      { id: 'q0', label: 'q0 (ε)', x: 100, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1 (t)', x: 250, y: 200, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (th)', x: 400, y: 200, isStart: false, isFinal: false },
      { id: 'q3', label: 'q3 (the)', x: 550, y: 200, isStart: false, isFinal: false },
      { id: 'q4', label: 'q4 (then)', x: 700, y: 200, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't1', from: 'q0', to: 'q1', symbol: 't' },
      { id: 't2', from: 'q1', to: 'q2', symbol: 'h' },
      { id: 't3', from: 'q2', to: 'q3', symbol: 'e' },
      { id: 't4', from: 'q3', to: 'q4', symbol: 'n' }
    ],
    testStrings: ['then', 'the', 'them', 't']
  },
  {
    id: 'even_0_even_1',
    name: 'DFA: Even number of 0s and Even number of 1s',
    description: 'Classic 4-state product automaton tracking parity of both 0s and 1s.',
    type: 'DFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0 (e0,e1)', x: 200, y: 140, isStart: true, isFinal: true },
      { id: 'q1', label: 'q1 (o0,e1)', x: 480, y: 140, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (e0,o1)', x: 200, y: 320, isStart: false, isFinal: false },
      { id: 'q3', label: 'q3 (o0,o1)', x: 480, y: 320, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't01', from: 'q0', to: 'q1', symbol: '0' },
      { id: 't02', from: 'q0', to: 'q2', symbol: '1' },
      { id: 't10', from: 'q1', to: 'q0', symbol: '0' },
      { id: 't13', from: 'q1', to: 'q3', symbol: '1' },
      { id: 't20', from: 'q2', to: 'q0', symbol: '1' },
      { id: 't23', from: 'q2', to: 'q3', symbol: '0' },
      { id: 't31', from: 'q3', to: 'q1', symbol: '1' },
      { id: 't32', from: 'q3', to: 'q2', symbol: '0' }
    ],
    testStrings: ['0011', '0101', '0000', '11', '01', '0001']
  },
  {
    id: 'odd_0_odd_1',
    name: 'DFA: Odd number of 0s and Odd number of 1s',
    description: '4-state parity automaton accepting when both 0s and 1s are odd in length.',
    type: 'DFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0 (e0,e1)', x: 200, y: 140, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1 (o0,e1)', x: 480, y: 140, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (e0,o1)', x: 200, y: 320, isStart: false, isFinal: false },
      { id: 'q3', label: 'q3 (o0,o1)', x: 480, y: 320, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't01', from: 'q0', to: 'q1', symbol: '0' },
      { id: 't02', from: 'q0', to: 'q2', symbol: '1' },
      { id: 't10', from: 'q1', to: 'q0', symbol: '0' },
      { id: 't13', from: 'q1', to: 'q3', symbol: '1' },
      { id: 't20', from: 'q2', to: 'q0', symbol: '1' },
      { id: 't23', from: 'q2', to: 'q3', symbol: '0' },
      { id: 't31', from: 'q3', to: 'q1', symbol: '1' },
      { id: 't32', from: 'q3', to: 'q2', symbol: '0' }
    ],
    testStrings: ['01', '000111', '10', '0011', '01010']
  },
  {
    id: 'no_consecutive_1s',
    name: 'DFA: No Consecutive 1s (No "11")',
    description: 'Accepts binary strings that do not contain "11" anywhere.',
    type: 'DFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0 (Last 0)', x: 150, y: 200, isStart: true, isFinal: true },
      { id: 'q1', label: 'q1 (Last 1)', x: 380, y: 140, isStart: false, isFinal: true },
      { id: 'qd', label: 'qd (Dead)', x: 380, y: 300, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't00', from: 'q0', to: 'q0', symbol: '0' },
      { id: 't01', from: 'q0', to: 'q1', symbol: '1' },
      { id: 't10', from: 'q1', to: 'q0', symbol: '0' },
      { id: 't11', from: 'q1', to: 'qd', symbol: '1' },
      { id: 'td0', from: 'qd', to: 'qd', symbol: '0' },
      { id: 'td1', from: 'qd', to: 'qd', symbol: '1' }
    ],
    testStrings: ['01010', '10101', '000', '11', '0110']
  },
  {
    id: 'starts_0_ends_1',
    name: 'DFA: Starts with "0" and Ends with "1"',
    description: 'Accepts binary strings beginning with 0 and terminating with 1.',
    type: 'DFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 120, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1', x: 300, y: 140, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2', x: 500, y: 140, isStart: false, isFinal: true },
      { id: 'qd', label: 'Dead', x: 300, y: 300, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't0_0', from: 'q0', to: 'q1', symbol: '0' },
      { id: 't0_1', from: 'q0', to: 'qd', symbol: '1' },
      { id: 't1_0', from: 'q1', to: 'q1', symbol: '0' },
      { id: 't1_1', from: 'q1', to: 'q2', symbol: '1' },
      { id: 't2_0', from: 'q2', to: 'q1', symbol: '0' },
      { id: 't2_1', from: 'q2', to: 'q2', symbol: '1' },
      { id: 'td_0', from: 'qd', to: 'qd', symbol: '0' },
      { id: 'td_1', from: 'qd', to: 'qd', symbol: '1' }
    ],
    testStrings: ['01', '0011', '0101', '101', '00']
  },
  {
    id: 'divisible_by_3',
    name: 'DFA: Binary Divisible by 3',
    description: 'Accepts binary strings representing numbers divisible by 3 (e.g., 0, 3=11, 6=110, 9=1001).',
    type: 'DFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'r=0', x: 200, y: 180, isStart: true, isFinal: true },
      { id: 'q1', label: 'r=1', x: 450, y: 120, isStart: false, isFinal: false },
      { id: 'q2', label: 'r=2', x: 450, y: 280, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't0_0', from: 'q0', to: 'q0', symbol: '0' },
      { id: 't0_1', from: 'q0', to: 'q1', symbol: '1' },
      { id: 't1_0', from: 'q1', to: 'q2', symbol: '0' },
      { id: 't1_1', from: 'q1', to: 'q0', symbol: '1' },
      { id: 't2_0', from: 'q2', to: 'q1', symbol: '0' },
      { id: 't2_1', from: 'q2', to: 'q2', symbol: '1' }
    ],
    testStrings: ['0', '11', '110', '1001', '1100', '10', '100']
  },
  {
    id: 'starts_with_ab',
    name: 'DFA: Starts with "ab"',
    description: 'Accepts all strings over {a, b} that begin with the prefix "ab".',
    type: 'DFA',
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', label: 'q0', x: 120, y: 180, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1', x: 300, y: 180, isStart: false, isFinal: false },
      { id: 'qf', label: 'qf', x: 500, y: 180, isStart: false, isFinal: true },
      { id: 'qd', label: 'Dead', x: 300, y: 340, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't1', from: 'q0', to: 'q1', symbol: 'a' },
      { id: 't2', from: 'q0', to: 'qd', symbol: 'b' },
      { id: 't3', from: 'q1', to: 'qf', symbol: 'b' },
      { id: 't4', from: 'q1', to: 'qd', symbol: 'a' },
      { id: 't5', from: 'qf', to: 'qf', symbol: 'a' },
      { id: 't6', from: 'qf', to: 'qf', symbol: 'b' },
      { id: 't7', from: 'qd', to: 'qd', symbol: 'a' },
      { id: 't8', from: 'qd', to: 'qd', symbol: 'b' }
    ],
    testStrings: ['ab', 'abaa', 'abbb', 'a', 'ba', 'b']
  },
  {
    id: 'ends_with_01',
    name: 'DFA: Ends with "01"',
    description: 'Accepts binary strings ending with the suffix "01".',
    type: 'DFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 150, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1', x: 350, y: 200, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2', x: 550, y: 200, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't1', from: 'q0', to: 'q0', symbol: '1' },
      { id: 't2', from: 'q0', to: 'q1', symbol: '0' },
      { id: 't3', from: 'q1', to: 'q1', symbol: '0' },
      { id: 't4', from: 'q1', to: 'q2', symbol: '1' },
      { id: 't5', from: 'q2', to: 'q1', symbol: '0' },
      { id: 't6', from: 'q2', to: 'q0', symbol: '1' }
    ],
    testStrings: ['01', '1001', '1101', '010101', '00', '10']
  },
  {
    id: 'contains_1011',
    name: 'DFA: Contains Substring "1011"',
    description: 'Accepts strings that contain "1011" anywhere as a substring.',
    type: 'DFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 100, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1', x: 260, y: 200, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2', x: 420, y: 200, isStart: false, isFinal: false },
      { id: 'q3', label: 'q3', x: 580, y: 200, isStart: false, isFinal: false },
      { id: 'q4', label: 'q4', x: 740, y: 200, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0_0', from: 'q0', to: 'q0', symbol: '0' },
      { id: 't0_1', from: 'q0', to: 'q1', symbol: '1' },
      { id: 't1_0', from: 'q1', to: 'q2', symbol: '0' },
      { id: 't1_1', from: 'q1', to: 'q1', symbol: '1' },
      { id: 't2_0', from: 'q2', to: 'q0', symbol: '0' },
      { id: 't2_1', from: 'q2', to: 'q3', symbol: '1' },
      { id: 't3_0', from: 'q3', to: 'q2', symbol: '0' },
      { id: 't3_1', from: 'q3', to: 'q4', symbol: '1' },
      { id: 't4_0', from: 'q4', to: 'q4', symbol: '0' },
      { id: 't4_1', from: 'q4', to: 'q4', symbol: '1' }
    ],
    testStrings: ['1011', '0010110', '11011', '101011', '1010']
  },
  {
    id: 'nfa_contains_00_or_11',
    name: 'NFA: Contains "00" or "11"',
    description: 'Nondeterministic automaton detecting double zeros or double ones.',
    type: 'NFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 120, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1 (0)', x: 300, y: 120, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (00)', x: 500, y: 120, isStart: false, isFinal: true },
      { id: 'q3', label: 'q3 (1)', x: 300, y: 280, isStart: false, isFinal: false },
      { id: 'q4', label: 'q4 (11)', x: 500, y: 280, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0_0', from: 'q0', to: 'q0', symbol: '0' },
      { id: 't0_1', from: 'q0', to: 'q0', symbol: '1' },
      { id: 't0_g0', from: 'q0', to: 'q1', symbol: '0' },
      { id: 't1_0', from: 'q1', to: 'q2', symbol: '0' },
      { id: 't2_0', from: 'q2', to: 'q2', symbol: '0' },
      { id: 't2_1', from: 'q2', to: 'q2', symbol: '1' },
      { id: 't0_g1', from: 'q0', to: 'q3', symbol: '1' },
      { id: 't3_1', from: 'q3', to: 'q4', symbol: '1' },
      { id: 't4_0', from: 'q4', to: 'q4', symbol: '0' },
      { id: 't4_1', from: 'q4', to: 'q4', symbol: '1' }
    ],
    testStrings: ['00', '11', '010100', '101011', '0101']
  },
  {
    id: 'nfa_ends_01',
    name: 'NFA: Strings ending in "01"',
    description: 'Nondeterministic automaton that guesses when "01" suffix begins.',
    type: 'NFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 180, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1', x: 380, y: 200, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2', x: 580, y: 200, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0_0', from: 'q0', to: 'q0', symbol: '0' },
      { id: 't0_1', from: 'q0', to: 'q0', symbol: '1' },
      { id: 't0_g', from: 'q0', to: 'q1', symbol: '0' },
      { id: 't1_1', from: 'q1', to: 'q2', symbol: '1' }
    ],
    testStrings: ['01', '1001', '1101', '010101', '10']
  },
  {
    id: 'nfa_text_search',
    name: 'NFA: Text Search for "web" & "ebay"',
    description: 'NFA modeling search engine keyword matching for "web" or "ebay".',
    type: 'NFA',
    alphabet: ['w', 'e', 'b', 'a', 'y', 'other'],
    states: [
      { id: '1', label: '1 (Start)', x: 120, y: 220, isStart: true, isFinal: false },
      { id: '2', label: '2 (w)', x: 260, y: 130, isStart: false, isFinal: false },
      { id: '3', label: '3 (we)', x: 420, y: 130, isStart: false, isFinal: false },
      { id: '4', label: '4 (web)', x: 580, y: 130, isStart: false, isFinal: true },
      { id: '5', label: '5 (e)', x: 240, y: 310, isStart: false, isFinal: false },
      { id: '6', label: '6 (eb)', x: 380, y: 310, isStart: false, isFinal: false },
      { id: '7', label: '7 (eba)', x: 520, y: 310, isStart: false, isFinal: false },
      { id: '8', label: '8 (ebay)', x: 660, y: 310, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't_self_1', from: '1', to: '1', symbol: 'w' },
      { id: 't_self_2', from: '1', to: '1', symbol: 'e' },
      { id: 't_self_3', from: '1', to: '1', symbol: 'b' },
      { id: 't_self_4', from: '1', to: '1', symbol: 'a' },
      { id: 't_self_5', from: '1', to: '1', symbol: 'y' },
      { id: 't_self_6', from: '1', to: '1', symbol: 'other' },
      { id: 't_web1', from: '1', to: '2', symbol: 'w' },
      { id: 't_web2', from: '2', to: '3', symbol: 'e' },
      { id: 't_web3', from: '3', to: '4', symbol: 'b' },
      { id: 't_ebay1', from: '1', to: '5', symbol: 'e' },
      { id: 't_ebay2', from: '5', to: '6', symbol: 'b' },
      { id: 't_ebay3', from: '6', to: '7', symbol: 'a' },
      { id: 't_ebay4', from: '7', to: '8', symbol: 'y' }
    ],
    testStrings: ['web', 'ebay', 'myweb', 'buyonebay', 'google']
  },
  {
    id: 'enfa_decimal_numbers',
    name: 'ε-NFA: Decimal Numbers Recognizer',
    description: 'Accepts signed/unsigned decimal numbers like +12.34, -0.5, 99 (optional sign, digits, decimal point).',
    type: 'ENFA',
    alphabet: ['+', '-', '0..9', '.'],
    states: [
      { id: 'q0', label: 'q0 (Start)', x: 100, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1 (Signed)', x: 260, y: 200, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (Int digits)', x: 420, y: 200, isStart: false, isFinal: false },
      { id: 'q3', label: 'q3 (Decimal)', x: 580, y: 200, isStart: false, isFinal: false },
      { id: 'q5', label: 'q5 (Accept)', x: 740, y: 200, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0', from: 'q0', to: 'q1', symbol: 'ε' },
      { id: 't1', from: 'q0', to: 'q1', symbol: '+' },
      { id: 't2', from: 'q0', to: 'q1', symbol: '-' },
      { id: 't3', from: 'q1', to: 'q1', symbol: '0..9' },
      { id: 't4', from: 'q1', to: 'q2', symbol: '0..9' },
      { id: 't5', from: 'q2', to: 'q2', symbol: '0..9' },
      { id: 't6', from: 'q2', to: 'q3', symbol: '.' },
      { id: 't7', from: 'q3', to: 'q3', symbol: '0..9' },
      { id: 't8', from: 'q3', to: 'q5', symbol: 'ε' }
    ],
    testStrings: ['+12.34', '-0.5', '99', '12.', '.5']
  },
  {
    id: 'enfa_0plus1_star_00',
    name: 'ε-NFA: Language (0+1)*00',
    description: 'Accepts any binary string ending in double zero "00" via epsilon jumps.',
    type: 'ENFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 100, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1', x: 280, y: 140, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2', x: 460, y: 140, isStart: false, isFinal: false },
      { id: 'q3', label: 'q3', x: 640, y: 200, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0_0', from: 'q0', to: 'q0', symbol: '0' },
      { id: 't0_1', from: 'q0', to: 'q0', symbol: '1' },
      { id: 't0_eps', from: 'q0', to: 'q1', symbol: 'ε' },
      { id: 't1_0', from: 'q1', to: 'q2', symbol: '0' },
      { id: 't2_0', from: 'q2', to: 'q3', symbol: '0' }
    ],
    testStrings: ['00', '10100', '11100', '010', '0']
  },
  {
    id: 'enfa_abc',
    name: 'ε-NFA: Language a* b* c*',
    description: 'Accepts zero or more "a"s followed by zero or more "b"s followed by zero or more "c"s.',
    type: 'ENFA',
    alphabet: ['a', 'b', 'c'],
    states: [
      { id: 'q0', label: 'q0', x: 120, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1', x: 300, y: 200, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2', x: 480, y: 200, isStart: false, isFinal: false },
      { id: 'q3', label: 'q3', x: 660, y: 200, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0_a', from: 'q0', to: 'q0', symbol: 'a' },
      { id: 't0_eps', from: 'q0', to: 'q1', symbol: 'ε' },
      { id: 't1_b', from: 'q1', to: 'q1', symbol: 'b' },
      { id: 't1_eps', from: 'q1', to: 'q2', symbol: 'ε' },
      { id: 't2_c', from: 'q2', to: 'q2', symbol: 'c' },
      { id: 't2_eps', from: 'q2', to: 'q3', symbol: 'ε' }
    ],
    testStrings: ['aaabbc', 'a', 'bc', 'ccc', 'ε', 'ba']
  },
  {
    id: 'nfa_third_from_end_1',
    name: 'NFA: 3rd Symbol from Right is "1"',
    description: 'Classic NFA demonstrating exponential state blowup in DFA conversion (4 NFA states -> 8 DFA states).',
    type: 'NFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0 (Start)', x: 120, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1 (-3rd)', x: 300, y: 200, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (-2nd)', x: 480, y: 200, isStart: false, isFinal: false },
      { id: 'q3', label: 'q3 (-1st)', x: 660, y: 200, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0_0', from: 'q0', to: 'q0', symbol: '0' },
      { id: 't0_1', from: 'q0', to: 'q0', symbol: '1' },
      { id: 't0_guess', from: 'q0', to: 'q1', symbol: '1' },
      { id: 't1_0', from: 'q1', to: 'q2', symbol: '0' },
      { id: 't1_1', from: 'q1', to: 'q2', symbol: '1' },
      { id: 't2_0', from: 'q2', to: 'q3', symbol: '0' },
      { id: 't2_1', from: 'q2', to: 'q3', symbol: '1' }
    ],
    testStrings: ['100', '111', '0101', '1000', '001']
  },
  {
    id: 'nfa_starts_10_or_ends_01',
    name: 'NFA: Starts with "10" OR Ends with "01"',
    description: 'Multi-branch NFA accepting binary strings that start with "10" or end with "01".',
    type: 'NFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 100, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1 (1)', x: 260, y: 120, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (10*)', x: 450, y: 120, isStart: false, isFinal: true },
      { id: 'q3', label: 'q3 (*0)', x: 260, y: 280, isStart: false, isFinal: false },
      { id: 'q4', label: 'q4 (*01)', x: 450, y: 280, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0_1', from: 'q0', to: 'q1', symbol: '1' },
      { id: 't1_0', from: 'q1', to: 'q2', symbol: '0' },
      { id: 't2_0', from: 'q2', to: 'q2', symbol: '0' },
      { id: 't2_1', from: 'q2', to: 'q2', symbol: '1' },
      { id: 't0_self0', from: 'q0', to: 'q0', symbol: '0' },
      { id: 't0_self1', from: 'q0', to: 'q0', symbol: '1' },
      { id: 't0_0', from: 'q0', to: 'q3', symbol: '0' },
      { id: 't3_1', from: 'q3', to: 'q4', symbol: '1' }
    ],
    testStrings: ['1011', '0001', '10', '01', '000']
  },
  {
    id: 'nfa_contains_101_or_010',
    name: 'NFA: Contains Substring "101" or "010"',
    description: 'NFA searching for either "101" or "010" patterns anywhere in the string.',
    type: 'NFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 100, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1 (1)', x: 260, y: 120, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (10)', x: 420, y: 120, isStart: false, isFinal: false },
      { id: 'q3', label: 'q3 (101)', x: 580, y: 120, isStart: false, isFinal: true },
      { id: 'q4', label: 'q4 (0)', x: 260, y: 280, isStart: false, isFinal: false },
      { id: 'q5', label: 'q5 (01)', x: 420, y: 280, isStart: false, isFinal: false },
      { id: 'q6', label: 'q6 (010)', x: 580, y: 280, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0_0', from: 'q0', to: 'q0', symbol: '0' },
      { id: 't0_1', from: 'q0', to: 'q0', symbol: '1' },
      { id: 't0_g1', from: 'q0', to: 'q1', symbol: '1' },
      { id: 't1_0', from: 'q1', to: 'q2', symbol: '0' },
      { id: 't2_1', from: 'q2', to: 'q3', symbol: '1' },
      { id: 't3_0', from: 'q3', to: 'q3', symbol: '0' },
      { id: 't3_1', from: 'q3', to: 'q3', symbol: '1' },
      { id: 't0_g0', from: 'q0', to: 'q4', symbol: '0' },
      { id: 't4_1', from: 'q4', to: 'q5', symbol: '1' },
      { id: 't5_0', from: 'q5', to: 'q6', symbol: '0' },
      { id: 't6_0', from: 'q6', to: 'q6', symbol: '0' },
      { id: 't6_1', from: 'q6', to: 'q6', symbol: '1' }
    ],
    testStrings: ['101', '010', '00010100', '111', '0000']
  },
  {
    id: 'even_a_odd_b',
    name: 'DFA: Even no. of a\'s and Odd no. of b\'s',
    description: 'Product automaton tracking parity: Even number of a\'s and Odd number of b\'s (PDF Page 15, Ex 21).',
    type: 'DFA',
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', label: 'q0 (e_a, e_b)', x: 200, y: 140, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1 (o_a, e_b)', x: 480, y: 140, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (e_a, o_b)', x: 200, y: 320, isStart: false, isFinal: true },
      { id: 'q3', label: 'q3 (o_a, o_b)', x: 480, y: 320, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't01', from: 'q0', to: 'q1', symbol: 'a' },
      { id: 't02', from: 'q0', to: 'q2', symbol: 'b' },
      { id: 't10', from: 'q1', to: 'q0', symbol: 'a' },
      { id: 't13', from: 'q1', to: 'q3', symbol: 'b' },
      { id: 't20', from: 'q2', to: 'q0', symbol: 'b' },
      { id: 't23', from: 'q2', to: 'q3', symbol: 'a' },
      { id: 't31', from: 'q3', to: 'q1', symbol: 'b' },
      { id: 't32', from: 'q3', to: 'q2', symbol: 'a' }
    ],
    testStrings: ['b', 'aab', 'aabbb', 'ab', 'aa']
  },
  {
    id: 'starts_with_00',
    name: 'DFA: Starts with "00"',
    description: 'Accepts all binary strings that begin with the prefix "00" (PDF Page 39, Ex 2).',
    type: 'DFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 120, y: 180, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1', x: 320, y: 180, isStart: false, isFinal: false },
      { id: 'qf', label: 'qf', x: 520, y: 180, isStart: false, isFinal: true },
      { id: 'qd', label: 'Dead', x: 320, y: 340, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't1', from: 'q0', to: 'q1', symbol: '0' },
      { id: 't2', from: 'q0', to: 'qd', symbol: '1' },
      { id: 't3', from: 'q1', to: 'qf', symbol: '0' },
      { id: 't4', from: 'q1', to: 'qd', symbol: '1' },
      { id: 't5', from: 'qf', to: 'qf', symbol: '0' },
      { id: 't6', from: 'qf', to: 'qf', symbol: '1' },
      { id: 't7', from: 'qd', to: 'qd', symbol: '0' },
      { id: 't8', from: 'qd', to: 'qd', symbol: '1' }
    ],
    testStrings: ['00', '00101', '0000', '010', '100']
  },
  {
    id: 'starts_aa_or_bb',
    name: 'DFA: Starts with "aa" or "bb"',
    description: 'Accepts strings over {a,b} starting with either "aa" or "bb" (PDF Page 39, Ex 3).',
    type: 'DFA',
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', label: 'q0', x: 100, y: 220, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1 (a)', x: 260, y: 120, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (b)', x: 260, y: 320, isStart: false, isFinal: false },
      { id: 'qf', label: 'qf (Accept)', x: 480, y: 220, isStart: false, isFinal: true },
      { id: 'qd', label: 'Dead', x: 260, y: 220, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't0_a', from: 'q0', to: 'q1', symbol: 'a' },
      { id: 't0_b', from: 'q0', to: 'q2', symbol: 'b' },
      { id: 't1_a', from: 'q1', to: 'qf', symbol: 'a' },
      { id: 't1_b', from: 'q1', to: 'qd', symbol: 'b' },
      { id: 't2_b', from: 'q2', to: 'qf', symbol: 'b' },
      { id: 't2_a', from: 'q2', to: 'qd', symbol: 'a' },
      { id: 'tf_a', from: 'qf', to: 'qf', symbol: 'a' },
      { id: 'tf_b', from: 'qf', to: 'qf', symbol: 'b' },
      { id: 'td_a', from: 'qd', to: 'qd', symbol: 'a' },
      { id: 'td_b', from: 'qd', to: 'qd', symbol: 'b' }
    ],
    testStrings: ['aab', 'bba', 'aaba', 'ab', 'ba']
  },
  {
    id: 'ends_with_abb',
    name: 'DFA: Ends with "abb"',
    description: 'Accepts all strings over {a,b} ending with the suffix "abb" (PDF Page 41, Ex 2).',
    type: 'DFA',
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', label: 'q0', x: 100, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1 (a)', x: 280, y: 200, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (ab)', x: 460, y: 200, isStart: false, isFinal: false },
      { id: 'q3', label: 'q3 (abb)', x: 640, y: 200, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0_a', from: 'q0', to: 'q1', symbol: 'a' },
      { id: 't0_b', from: 'q0', to: 'q0', symbol: 'b' },
      { id: 't1_a', from: 'q1', to: 'q1', symbol: 'a' },
      { id: 't1_b', from: 'q1', to: 'q2', symbol: 'b' },
      { id: 't2_a', from: 'q2', to: 'q1', symbol: 'a' },
      { id: 't2_b', from: 'q2', to: 'q3', symbol: 'b' },
      { id: 't3_a', from: 'q3', to: 'q1', symbol: 'a' },
      { id: 't3_b', from: 'q3', to: 'q0', symbol: 'b' }
    ],
    testStrings: ['abb', 'aabb', 'babb', 'ab', 'abba']
  },
  {
    id: 'except_contains_aab',
    name: 'DFA: EXCEPT those containing "aab"',
    description: 'Complement automaton accepting all strings over {a,b} EXCEPT those containing "aab" (PDF Page 12, Ex 17).',
    type: 'DFA',
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', label: 'q0', x: 120, y: 200, isStart: true, isFinal: true },
      { id: 'q1', label: 'q1 (a)', x: 300, y: 200, isStart: false, isFinal: true },
      { id: 'q2', label: 'q2 (aa)', x: 480, y: 200, isStart: false, isFinal: true },
      { id: 'q3', label: 'q3 (aab Trap)', x: 660, y: 200, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't0_b', from: 'q0', to: 'q0', symbol: 'b' },
      { id: 't0_a', from: 'q0', to: 'q1', symbol: 'a' },
      { id: 't1_b', from: 'q1', to: 'q0', symbol: 'b' },
      { id: 't1_a', from: 'q1', to: 'q2', symbol: 'a' },
      { id: 't2_a', from: 'q2', to: 'q2', symbol: 'a' },
      { id: 't2_b', from: 'q2', to: 'q3', symbol: 'b' },
      { id: 't3_a', from: 'q3', to: 'q3', symbol: 'a' },
      { id: 't3_b', from: 'q3', to: 'q3', symbol: 'b' }
    ],
    testStrings: ['aba', 'bbb', 'aaaa', 'aab', 'baab']
  },
  {
    id: 'divisible_by_2',
    name: 'DFA: Binary Divisible by 2',
    description: 'Accepts binary numbers ending in 0 (divisible by 2) (PDF Page 43, Ex 1).',
    type: 'DFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'r=0 (Even)', x: 220, y: 200, isStart: true, isFinal: true },
      { id: 'q1', label: 'r=1 (Odd)', x: 480, y: 200, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't0_0', from: 'q0', to: 'q0', symbol: '0' },
      { id: 't0_1', from: 'q0', to: 'q1', symbol: '1' },
      { id: 't1_0', from: 'q1', to: 'q0', symbol: '0' },
      { id: 't1_1', from: 'q1', to: 'q1', symbol: '1' }
    ],
    testStrings: ['0', '10', '110', '1110', '101', '1']
  },
  {
    id: 'at_most_two_consecutive_bs',
    name: 'DFA: At Most Two Consecutive b\'s',
    description: 'Accepts strings over {a,b} that do NOT contain three or more adjacent "b"s ("bbb") (PDF Page 44, Ex 2.14).',
    type: 'DFA',
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', label: 'q0 (0 b)', x: 120, y: 200, isStart: true, isFinal: true },
      { id: 'q1', label: 'q1 (1 b)', x: 300, y: 200, isStart: false, isFinal: true },
      { id: 'q2', label: 'q2 (2 b)', x: 480, y: 200, isStart: false, isFinal: true },
      { id: 'q3', label: 'q3 (Dead bbb)', x: 660, y: 200, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't0_a', from: 'q0', to: 'q0', symbol: 'a' },
      { id: 't0_b', from: 'q0', to: 'q1', symbol: 'b' },
      { id: 't1_a', from: 'q1', to: 'q0', symbol: 'a' },
      { id: 't1_b', from: 'q1', to: 'q2', symbol: 'b' },
      { id: 't2_a', from: 'q2', to: 'q0', symbol: 'a' },
      { id: 't2_b', from: 'q2', to: 'q3', symbol: 'b' },
      { id: 't3_a', from: 'q3', to: 'q3', symbol: 'a' },
      { id: 't3_b', from: 'q3', to: 'q3', symbol: 'b' }
    ],
    testStrings: ['abb', 'abbabb', 'ab', 'bbb', 'abbb']
  },
  {
    id: 'length_mod_3_eq_0',
    name: 'DFA: Length |w| mod 3 = 0',
    description: 'Accepts strings whose total length is a multiple of 3 (PDF Page 44, Ex 2.15).',
    type: 'DFA',
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', label: 'q0 (len mod 3 = 0)', x: 150, y: 200, isStart: true, isFinal: true },
      { id: 'q1', label: 'q1 (len mod 3 = 1)', x: 380, y: 120, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (len mod 3 = 2)', x: 380, y: 280, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't0_a', from: 'q0', to: 'q1', symbol: 'a' },
      { id: 't0_b', from: 'q0', to: 'q1', symbol: 'b' },
      { id: 't1_a', from: 'q1', to: 'q2', symbol: 'a' },
      { id: 't1_b', from: 'q1', to: 'q2', symbol: 'b' },
      { id: 't2_a', from: 'q2', to: 'q0', symbol: 'a' },
      { id: 't2_b', from: 'q2', to: 'q0', symbol: 'b' }
    ],
    testStrings: ['aaa', 'aba', 'a', 'ab', 'aaaaaa']
  },
  {
    id: 'nfa_ends_ab_or_ba',
    name: 'NFA: Strings ending in "ab" or "ba"',
    description: 'Nondeterministic automaton branching to detect either "ab" or "ba" suffix (PDF Page 18, Ex 2).',
    type: 'NFA',
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', label: 'q0', x: 120, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1 (a)', x: 300, y: 120, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (ab)', x: 480, y: 120, isStart: false, isFinal: true },
      { id: 'q3', label: 'q3 (b)', x: 300, y: 280, isStart: false, isFinal: false },
      { id: 'q4', label: 'q4 (ba)', x: 480, y: 280, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0_a', from: 'q0', to: 'q0', symbol: 'a' },
      { id: 't0_b', from: 'q0', to: 'q0', symbol: 'b' },
      { id: 't0_ga', from: 'q0', to: 'q1', symbol: 'a' },
      { id: 't1_b', from: 'q1', to: 'q2', symbol: 'b' },
      { id: 't0_gb', from: 'q0', to: 'q3', symbol: 'b' },
      { id: 't3_a', from: 'q3', to: 'q4', symbol: 'a' }
    ],
    testStrings: ['ab', 'ba', 'aabab', 'bbba', 'aa']
  },
  {
    id: 'enfa_ends0_or_only1s',
    name: 'ε-NFA: Ends with "0" OR Contains only "1"s',
    description: 'Spontaneous branching ε-NFA accepting strings ending in 0 or composed solely of 1s (PDF Page 27, Ex 2).',
    type: 'ENFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0 (Start)', x: 100, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1 (1s Branch)', x: 280, y: 120, isStart: false, isFinal: true },
      { id: 'q2', label: 'q2 (0s Branch)', x: 280, y: 280, isStart: false, isFinal: false },
      { id: 'q3', label: 'q3 (Ends 0)', x: 480, y: 280, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0_eps1', from: 'q0', to: 'q1', symbol: 'ε' },
      { id: 't0_eps2', from: 'q0', to: 'q2', symbol: 'ε' },
      { id: 't1_1', from: 'q1', to: 'q1', symbol: '1' },
      { id: 't2_0', from: 'q2', to: 'q2', symbol: '0' },
      { id: 't2_1', from: 'q2', to: 'q2', symbol: '1' },
      { id: 't2_30', from: 'q2', to: 'q3', symbol: '0' }
    ],
    testStrings: ['111', '1010', '00', '101', 'ε']
  },
  {
    id: 'len_mod5_eq_mod4',
    name: 'DFA: String Length |w| mod 5 = |w| mod 4',
    description: '20-state LCM(5,4) modulo automaton where L = { w | |w| mod 5 = |w| mod 4 }. Accepts lengths |w| ≡ 0, 1, 2, 3 (mod 20).',
    type: 'DFA',
    alphabet: ['a', 'b'],
    states: Array.from({ length: 20 }, (_, i) => ({
      id: `q${i}`,
      label: `q${i} [${i % 5},${i % 4}]`,
      x: 90 + (i % 5) * 140,
      y: 75 + Math.floor(i / 5) * 95,
      isStart: i === 0,
      isFinal: i % 5 === i % 4
    })),
    transitions: Array.from({ length: 20 }, (_, i) => [
      { id: `t${i}_a`, from: `q${i}`, to: `q${(i + 1) % 20}`, symbol: 'a' },
      { id: `t${i}_b`, from: `q${i}`, to: `q${(i + 1) % 20}`, symbol: 'b' }
    ]).flat(),
    testStrings: ['', 'a', 'ab', 'aba', 'abab', 'aaaaa', 'aaaaaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaa']
  },
  {
    id: 'dfa_starts00_ends11',
    name: 'DFA: Starts with ≥2 0s & Ends with ≥2 1s (BCS503 Q2.b.ii)',
    description: 'Accepts strings over {0,1} starting with at least two 0s ("00...") AND ending with at least two 1s ("...11").',
    type: 'DFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0 (Start: ε)', x: 80, y: 160, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1 (Got 0)', x: 220, y: 160, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (Got 00)', x: 380, y: 160, isStart: false, isFinal: false },
      { id: 'q3', label: 'q3 (00...1)', x: 540, y: 160, isStart: false, isFinal: false },
      { id: 'q4', label: 'q4 (00...11)', x: 700, y: 160, isStart: false, isFinal: true },
      { id: 'qd', label: 'qd (Trap / Dead)', x: 220, y: 310, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't0_0', from: 'q0', to: 'q1', symbol: '0' },
      { id: 't0_1', from: 'q0', to: 'qd', symbol: '1' },
      { id: 't1_0', from: 'q1', to: 'q2', symbol: '0' },
      { id: 't1_1', from: 'q1', to: 'qd', symbol: '1' },
      { id: 't2_0', from: 'q2', to: 'q2', symbol: '0' },
      { id: 't2_1', from: 'q2', to: 'q3', symbol: '1' },
      { id: 't3_0', from: 'q3', to: 'q2', symbol: '0' },
      { id: 't3_1', from: 'q3', to: 'q4', symbol: '1' },
      { id: 't4_0', from: 'q4', to: 'q2', symbol: '0' },
      { id: 't4_1', from: 'q4', to: 'q4', symbol: '1' },
      { id: 'td_0', from: 'qd', to: 'qd', symbol: '0' },
      { id: 'td_1', from: 'qd', to: 'qd', symbol: '1' }
    ],
    testStrings: ['0011', '00011', '001011', '001111', '001', '010011', '10011', '00']
  },
  {
    id: 'enfa_vtu_q2a',
    name: 'ε-NFA to DFA Conversion (BCS503 Q2.a)',
    description: 'Find ε-closure and convert to DFA for Thompson NFA accepting (a+b)*ab.',
    type: 'ENFA',
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', label: 'q0 (Start)', x: 80, y: 200, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1', x: 200, y: 120, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2', x: 320, y: 80, isStart: false, isFinal: false },
      { id: 'q3', label: 'q3', x: 440, y: 80, isStart: false, isFinal: false },
      { id: 'q4', label: 'q4', x: 320, y: 160, isStart: false, isFinal: false },
      { id: 'q5', label: 'q5', x: 440, y: 160, isStart: false, isFinal: false },
      { id: 'q6', label: 'q6', x: 560, y: 120, isStart: false, isFinal: false },
      { id: 'q7', label: 'q7', x: 200, y: 280, isStart: false, isFinal: false },
      { id: 'q8', label: 'q8', x: 440, y: 280, isStart: false, isFinal: false },
      { id: 'q9', label: 'q9 (Final)', x: 640, y: 280, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0_eps1', from: 'q0', to: 'q1', symbol: 'ε' },
      { id: 't0_eps7', from: 'q0', to: 'q7', symbol: 'ε' },
      { id: 't1_eps2', from: 'q1', to: 'q2', symbol: 'ε' },
      { id: 't1_eps4', from: 'q1', to: 'q4', symbol: 'ε' },
      { id: 't2_a', from: 'q2', to: 'q3', symbol: 'a' },
      { id: 't4_b', from: 'q4', to: 'q5', symbol: 'b' },
      { id: 't3_eps6', from: 'q3', to: 'q6', symbol: 'ε' },
      { id: 't5_eps6', from: 'q5', to: 'q6', symbol: 'ε' },
      { id: 't6_eps1', from: 'q6', to: 'q1', symbol: 'ε' },
      { id: 't6_eps7', from: 'q6', to: 'q7', symbol: 'ε' },
      { id: 't7_a', from: 'q7', to: 'q8', symbol: 'a' },
      { id: 't8_b', from: 'q8', to: 'q9', symbol: 'b' }
    ],
    testStrings: ['ab', 'aab', 'bab', 'bbab', 'aaaab', 'a', 'b', 'ba']
  },
  {
    id: 'nfa_lazy_eval_q2c',
    name: 'NFA: Lazy Evaluation Candidate (BCS503 Q2.c)',
    description: 'NFA with q0 self-loop 0, q0->q1 on 0,1, q1->q2 on 0,1, q2 self-loop 1.',
    type: 'NFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0 (Start)', x: 140, y: 180, isStart: true, isFinal: false },
      { id: 'q1', label: 'q1', x: 340, y: 180, isStart: false, isFinal: false },
      { id: 'q2', label: 'q2 (Final)', x: 540, y: 180, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 't0_0', from: 'q0', to: 'q0', symbol: '0' },
      { id: 't0_01', from: 'q0', to: 'q1', symbol: '0, 1' },
      { id: 't1_01', from: 'q1', to: 'q2', symbol: '0, 1' },
      { id: 't2_1', from: 'q2', to: 'q2', symbol: '1' }
    ],
    testStrings: ['000', '001', '011', '101', '1111', '0', '1']
  },
  {
    id: 'dfa_lazy_eval_q2c',
    name: 'DFA: Converted from NFA Q2.c (Lazy Evaluation Method)',
    description: 'Equivalent 6-state DFA derived from NFA Q2.c via Lazy Evaluation (Subset Construction on Demand).',
    type: 'DFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'A', label: 'A {q0}', x: 100, y: 200, isStart: true, isFinal: false },
      { id: 'B', label: 'B {q0,q1}', x: 300, y: 110, isStart: false, isFinal: false },
      { id: 'C', label: 'C {q1}', x: 300, y: 290, isStart: false, isFinal: false },
      { id: 'D', label: '*D {q0,q1,q2}', x: 520, y: 110, isStart: false, isFinal: true },
      { id: 'E', label: '*E {q1,q2}', x: 520, y: 290, isStart: false, isFinal: true },
      { id: 'F', label: '*F {q2}', x: 740, y: 290, isStart: false, isFinal: true },
      { id: 'qd', label: 'ϕ (Dead)', x: 920, y: 290, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 'tA_0', from: 'A', to: 'B', symbol: '0' },
      { id: 'tA_1', from: 'A', to: 'C', symbol: '1' },
      { id: 'tB_0', from: 'B', to: 'D', symbol: '0' },
      { id: 'tB_1', from: 'B', to: 'E', symbol: '1' },
      { id: 'tC_0', from: 'C', to: 'F', symbol: '0' },
      { id: 'tC_1', from: 'C', to: 'F', symbol: '1' },
      { id: 'tD_0', from: 'D', to: 'D', symbol: '0' },
      { id: 'tD_1', from: 'D', to: 'E', symbol: '1' },
      { id: 'tE_0', from: 'E', to: 'F', symbol: '0' },
      { id: 'tE_1', from: 'E', to: 'F', symbol: '1' },
      { id: 'tF_0', from: 'F', to: 'qd', symbol: '0' },
      { id: 'tF_1', from: 'F', to: 'F', symbol: '1' },
      { id: 'tqd_0', from: 'qd', to: 'qd', symbol: '0' },
      { id: 'tqd_1', from: 'qd', to: 'qd', symbol: '1' }
    ],
    testStrings: ['000', '001', '011', '101', '1111', '0', '1']
  },
  {
    id: 'dfa_vtu_q2a',
    name: 'DFA: Converted from ε-NFA Q2.a (Subset Construction)',
    description: 'Equivalent DFA derived from Thompson ε-NFA for language (a+b)*ab.',
    type: 'DFA',
    alphabet: ['a', 'b'],
    states: [
      { id: 'A', label: 'A {q0,q1,q2,q4,q7}', x: 110, y: 200, isStart: true, isFinal: false },
      { id: 'B', label: 'B {q1..q4,q6..q8}', x: 350, y: 110, isStart: false, isFinal: false },
      { id: 'C', label: 'C {q1,q2,q4..q7}', x: 350, y: 290, isStart: false, isFinal: false },
      { id: 'D', label: '*D (Final: contains q9)', x: 600, y: 200, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 'tA_a', from: 'A', to: 'B', symbol: 'a' },
      { id: 'tA_b', from: 'A', to: 'C', symbol: 'b' },
      { id: 'tB_a', from: 'B', to: 'B', symbol: 'a' },
      { id: 'tB_b', from: 'B', to: 'D', symbol: 'b' },
      { id: 'tC_a', from: 'C', to: 'B', symbol: 'a' },
      { id: 'tC_b', from: 'C', to: 'C', symbol: 'b' },
      { id: 'tD_a', from: 'D', to: 'B', symbol: 'a' },
      { id: 'tD_b', from: 'D', to: 'C', symbol: 'b' }
    ],
    testStrings: ['ab', 'aab', 'bab', 'bbab', 'aaaab', 'a', 'b', 'ba']
  },
  {
    id: 'dfa_len_mod3_ne_2',
    name: 'DFA: String Length |w| mod 3 ≠ 2 (10CS56 Q1.b.iii)',
    description: 'DFA over {a,b} accepting all strings whose length modulo 3 is NOT 2 (i.e. length mod 3 = 0 or 1).',
    type: 'DFA',
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', label: '*q0 (|w|%3=0)', x: 150, y: 200, isStart: true, isFinal: true },
      { id: 'q1', label: '*q1 (|w|%3=1)', x: 380, y: 200, isStart: false, isFinal: true },
      { id: 'q2', label: 'q2 (|w|%3=2)', x: 610, y: 200, isStart: false, isFinal: false }
    ],
    transitions: [
      { id: 't0_ab', from: 'q0', to: 'q1', symbol: 'a, b' },
      { id: 't1_ab', from: 'q1', to: 'q2', symbol: 'a, b' },
      { id: 't2_ab', from: 'q2', to: 'q0', symbol: 'a, b' }
    ],
    testStrings: ['', 'a', 'b', 'ab', 'aba', 'abab', 'ababa', 'aababb']
  },
  {
    id: 'nfa_10cs56_q1c',
    name: 'NFA: Table Conversion Candidate (10CS56 Q1.c)',
    description: 'NFA with 5 states (p, q, r, s, t) where s and t are accepting states.',
    type: 'NFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'p', label: 'p (Start)', x: 100, y: 200, isStart: true, isFinal: false },
      { id: 'q', label: 'q', x: 260, y: 120, isStart: false, isFinal: false },
      { id: 'r', label: 'r', x: 260, y: 280, isStart: false, isFinal: false },
      { id: 's', label: '*s (Final)', x: 440, y: 120, isStart: false, isFinal: true },
      { id: 't', label: '*t (Final)', x: 440, y: 280, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 'tp_0_p', from: 'p', to: 'p', symbol: '0' },
      { id: 'tp_0_q', from: 'p', to: 'q', symbol: '0' },
      { id: 'tp_1_p', from: 'p', to: 'p', symbol: '1' },
      { id: 'tq_0_r', from: 'q', to: 'r', symbol: '0' },
      { id: 'tq_0_s', from: 'q', to: 's', symbol: '0' },
      { id: 'tq_1_t', from: 'q', to: 't', symbol: '1' },
      { id: 'tr_0_p', from: 'r', to: 'p', symbol: '0' },
      { id: 'tr_0_r', from: 'r', to: 'r', symbol: '0' },
      { id: 'tr_1_t', from: 'r', to: 't', symbol: '1' }
    ],
    testStrings: ['00', '01', '000', '001', '0', '1']
  },
  {
    id: 'dfa_10cs56_q1c',
    name: 'DFA: Converted from NFA 10CS56 Q1.c (Subset Construction)',
    description: 'Converted 4-state DFA (A={p}, B={p,q}, C={p,q,r,s}, D={p,t}) from 10CS56 Q1.c.',
    type: 'DFA',
    alphabet: ['0', '1'],
    states: [
      { id: 'A', label: 'A {p}', x: 120, y: 200, isStart: true, isFinal: false },
      { id: 'B', label: 'B {p,q}', x: 320, y: 120, isStart: false, isFinal: false },
      { id: 'C', label: '*C {p,q,r,s}', x: 560, y: 120, isStart: false, isFinal: true },
      { id: 'D', label: '*D {p,t}', x: 320, y: 280, isStart: false, isFinal: true }
    ],
    transitions: [
      { id: 'tA_0', from: 'A', to: 'B', symbol: '0' },
      { id: 'tA_1', from: 'A', to: 'A', symbol: '1' },
      { id: 'tB_0', from: 'B', to: 'C', symbol: '0' },
      { id: 'tB_1', from: 'B', to: 'D', symbol: '1' },
      { id: 'tC_0', from: 'C', to: 'C', symbol: '0' },
      { id: 'tC_1', from: 'C', to: 'D', symbol: '1' },
      { id: 'tD_0', from: 'D', to: 'B', symbol: '0' },
      { id: 'tD_1', from: 'D', to: 'A', symbol: '1' }
    ],
    testStrings: ['00', '01', '000', '001', '0', '1']
  }
];

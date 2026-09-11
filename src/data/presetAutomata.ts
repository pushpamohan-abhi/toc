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
  }
];

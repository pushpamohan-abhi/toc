import React, { useState, useRef } from 'react';
import { AutomatonData, AutomatonState, Transition } from '../types';

interface AutomatonCanvasProps {
  automaton: AutomatonData;
  activeStateIds?: string[];
  activeTransitionIds?: string[];
  onUpdateStatePos?: (stateId: string, x: number, y: number) => void;
  onSelectState?: (stateId: string) => void;
  onSelectTransition?: (transId: string) => void;
  selectedStateId?: string | null;
  height?: number;
  isProjectorMode?: boolean;
}

export const AutomatonCanvas: React.FC<AutomatonCanvasProps> = ({
  automaton,
  activeStateIds = [],
  activeTransitionIds = [],
  onUpdateStatePos,
  onSelectState,
  onSelectTransition,
  selectedStateId,
  height = 420,
  isProjectorMode = false,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [draggingStateId, setDraggingStateId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const stateRadius = 26;

  // Group transitions by pair of states to calculate curvature offset
  const transitionPairs = new Map<string, Transition[]>();
  automaton.transitions.forEach((t) => {
    const pairKey = [t.from, t.to].sort().join('--');
    if (!transitionPairs.has(pairKey)) {
      transitionPairs.set(pairKey, []);
    }
    transitionPairs.get(pairKey)!.push(t);
  });

  // Drag handlers
  const handleMouseDownNode = (e: React.MouseEvent, state: AutomatonState) => {
    e.stopPropagation();
    if (onSelectState) onSelectState(state.id);
    if (!onUpdateStatePos) return;

    setDraggingStateId(state.id);
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (svgRect) {
      setDragOffset({
        x: e.clientX - svgRect.left - state.x,
        y: e.clientY - svgRect.top - state.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingStateId || !onUpdateStatePos || !svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const newX = Math.max(stateRadius + 10, Math.min(svgRect.width - stateRadius - 10, e.clientX - svgRect.left - dragOffset.x));
    const newY = Math.max(stateRadius + 10, Math.min(height - stateRadius - 10, e.clientY - svgRect.top - dragOffset.y));
    onUpdateStatePos(draggingStateId, Math.round(newX), Math.round(newY));
  };

  const handleMouseUp = () => {
    setDraggingStateId(null);
  };

  // Group transitions by direction (from -> to) so multiple transitions on the same path are merged cleanly into a single badge (e.g. "0, 1")
  const groupedTransitions = React.useMemo(() => {
    const map = new Map<string, { from: string; to: string; symbols: string[]; ids: string[] }>();
    for (const t of automaton.transitions) {
      const key = `${t.from}->${t.to}`;
      if (!map.has(key)) {
        map.set(key, { from: t.from, to: t.to, symbols: [], ids: [] });
      }
      const entry = map.get(key)!;
      if (!entry.symbols.includes(t.symbol)) {
        entry.symbols.push(t.symbol);
      }
      entry.ids.push(t.id);
    }
    return Array.from(map.values());
  }, [automaton.transitions]);

  // Calculate SVG Path for transition arc
  const renderGroupedTransition = (group: { from: string; to: string; symbols: string[]; ids: string[] }) => {
    const source = automaton.states.find((s) => s.id === group.from);
    const target = automaton.states.find((s) => s.id === group.to);

    if (!source || !target) return null;

    const isActive = group.ids.some((id) => activeTransitionIds.includes(id));
    const combinedSymbol = group.symbols.join(', ');

    // Color definitions based on mode
    let strokeColor = isProjectorMode ? '#0f172a' : '#64748b';
    if (isActive) {
      strokeColor = isProjectorMode ? '#d97706' : '#f59e0b'; // Vibrant amber/gold
    }

    const strokeWidth = isActive ? (isProjectorMode ? 5 : 4) : (isProjectorMode ? 2.5 : 2);
    const badgeWidth = Math.max(34, combinedSymbol.length * 9 + 14);

    // Self-loop
    if (group.from === group.to) {
      const loopX = source.x;
      const loopY = source.y - stateRadius;
      const pathD = `M ${loopX - 12} ${loopY + 2} C ${loopX - 35} ${loopY - 45}, ${loopX + 35} ${loopY - 45}, ${loopX + 12} ${loopY + 2}`;

      return (
        <g key={`${group.from}->${group.to}`} className="cursor-pointer" onClick={() => onSelectTransition?.(group.ids[0])}>
          {/* Active Glow Underlayer */}
          {isActive && (
            <path
              d={pathD}
              fill="none"
              stroke={isProjectorMode ? '#fbbf24' : '#38bdf8'}
              strokeWidth={12}
              strokeOpacity={0.45}
              strokeLinecap="round"
              className="animate-pulse"
            />
          )}
          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={isActive ? '6 3' : undefined}
            markerEnd={`url(#arrowhead-${isActive ? 'active' : 'default'}-${isProjectorMode ? 'proj' : 'dark'})`}
            className="transition-all duration-200"
          />
          <rect
            x={loopX - badgeWidth / 2}
            y={loopY - 42}
            width={badgeWidth}
            height={22}
            rx={5}
            fill={isActive ? (isProjectorMode ? '#d97706' : '#6366f1') : (isProjectorMode ? '#ffffff' : '#1e293b')}
            stroke={isActive ? (isProjectorMode ? '#78350f' : '#818cf8') : strokeColor}
            strokeWidth={isActive ? 2 : (isProjectorMode ? 2 : 1)}
          />
          <text
            x={loopX}
            y={loopY - 27}
            textAnchor="middle"
            fill={isActive ? '#ffffff' : (isProjectorMode ? '#0f172a' : '#f8fafc')}
            fontSize={isActive ? '13' : '12'}
            fontWeight={isActive ? '900' : 'bold'}
            className="select-none"
          >
            {combinedSymbol}
          </text>
        </g>
      );
    }

    // Pair curve logic
    const pairKey = [group.from, group.to].sort().join('--');
    const pairTransitions = transitionPairs.get(pairKey) || [];
    const isReversePair = pairTransitions.some((pt) => pt.from === group.to && pt.to === group.from);

    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    const normX = dx / dist;
    const normY = dy / dist;

    // Control point curvature
    const curveOffset = isReversePair ? 35 : 0;
    const perpX = -normY * curveOffset;
    const perpY = normX * curveOffset;

    const midX = (source.x + target.x) / 2 + perpX;
    const midY = (source.y + target.y) / 2 + perpY;

    // Calculate edge intersections with state circles
    const startX = source.x + normX * stateRadius + perpX * 0.3;
    const startY = source.y + normY * stateRadius + perpY * 0.3;
    const endX = target.x - normX * stateRadius + perpX * 0.3;
    const endY = target.y - normY * stateRadius + perpY * 0.3;

    const pathD = isReversePair
      ? `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`
      : `M ${startX} ${startY} L ${endX} ${endY}`;

    // Label position along arc
    const labelX = midX;
    const labelY = midY;

    return (
      <g key={`${group.from}->${group.to}`} className="cursor-pointer" onClick={() => onSelectTransition?.(group.ids[0])}>
        {/* Active Glow Underlayer */}
        {isActive && (
          <path
            d={pathD}
            fill="none"
            stroke={isProjectorMode ? '#fbbf24' : '#38bdf8'}
            strokeWidth={12}
            strokeOpacity={0.45}
            strokeLinecap="round"
            className="animate-pulse"
          />
        )}
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={isActive ? '6 3' : undefined}
          markerEnd={`url(#arrowhead-${isActive ? 'active' : 'default'}-${isProjectorMode ? 'proj' : 'dark'})`}
          className="transition-all duration-200"
        />
        <rect
          x={labelX - badgeWidth / 2}
          y={labelY - 12}
          width={badgeWidth}
          height={22}
          rx={5}
          fill={isActive ? (isProjectorMode ? '#d97706' : '#6366f1') : (isProjectorMode ? '#ffffff' : '#1e293b')}
          stroke={isActive ? (isProjectorMode ? '#78350f' : '#818cf8') : strokeColor}
          strokeWidth={isActive ? 2 : (isProjectorMode ? 2 : 1)}
        />
        <text
          x={labelX}
          y={labelY + 3}
          textAnchor="middle"
          fill={isActive ? '#ffffff' : (isProjectorMode ? '#0f172a' : '#f8fafc')}
          fontSize={isActive ? '13' : '12'}
          fontWeight={isActive ? '900' : 'bold'}
          className="select-none"
        >
          {combinedSymbol}
        </text>
      </g>
    );
  };

  const containerBg = isProjectorMode
    ? 'bg-white border-2 border-slate-900 shadow-md'
    : 'bg-slate-950 border border-slate-800 shadow-inner';

  const gridDotColor = isProjectorMode ? '#cbd5e1' : '#475569';

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden transition-colors ${containerBg}`}>
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(${gridDotColor} 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <svg
        ref={svgRef}
        className="w-full relative z-10 select-none"
        style={{ height }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          {/* Arrowhead Markers */}
          <marker
            id="arrowhead-default-dark"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
          <marker
            id="arrowhead-active-dark"
            markerWidth="12"
            markerHeight="9"
            refX="11"
            refY="4.5"
            orient="auto"
          >
            <polygon points="0 0, 12 4.5, 0 9" fill="#f59e0b" />
          </marker>
          <marker
            id="arrowhead-default-proj"
            markerWidth="12"
            markerHeight="8"
            refX="10"
            refY="4"
            orient="auto"
          >
            <polygon points="0 0, 12 4, 0 8" fill="#0f172a" />
          </marker>
          <marker
            id="arrowhead-active-proj"
            markerWidth="14"
            markerHeight="10"
            refX="12"
            refY="5"
            orient="auto"
          >
            <polygon points="0 0, 14 5, 0 10" fill="#d97706" />
          </marker>
        </defs>

        {/* Render Transitions */}
        {groupedTransitions.map(renderGroupedTransition)}

        {/* Render States */}
        {automaton.states.map((state) => {
          const isActive = activeStateIds.includes(state.id);
          const isSelected = selectedStateId === state.id;

          let circleFill = isProjectorMode ? '#ffffff' : '#0f172a';
          let strokeColor = isProjectorMode ? '#0f172a' : '#475569';
          let textColor = isProjectorMode ? '#0f172a' : '#f1f5f9';

          if (isActive) {
            circleFill = isProjectorMode ? '#dbeafe' : '#155e75';
            strokeColor = isProjectorMode ? '#1d4ed8' : '#06b6d4';
            textColor = isProjectorMode ? '#1e3a8a' : '#ffffff';
          } else if (isSelected) {
            strokeColor = isProjectorMode ? '#7e22ce' : '#a855f7';
          }

          return (
            <g
              key={state.id}
              transform={`translate(${state.x}, ${state.y})`}
              className="cursor-move group"
              onMouseDown={(e) => handleMouseDownNode(e, state)}
            >
              {/* Start State Indicator Arrow */}
              {state.isStart && (
                <g transform="translate(-48, 0)">
                  <path
                    d="M 0 0 L 18 0"
                    stroke={isProjectorMode ? '#0f172a' : '#e2e8f0'}
                    strokeWidth="3"
                    markerEnd={`url(#arrowhead-default-${isProjectorMode ? 'proj' : 'dark'})`}
                  />
                  <text x="-8" y="-6" fill={isProjectorMode ? '#0f172a' : '#94a3b8'} fontSize="11" fontWeight="bold">
                    Start
                  </text>
                </g>
              )}

              {/* Active Glow Effect */}
              {isActive && (
                <circle
                  r={stateRadius + 8}
                  fill="none"
                  stroke={isProjectorMode ? '#2563eb' : '#06b6d4'}
                  strokeWidth="3"
                  className="animate-ping opacity-60"
                />
              )}

              {/* Main Outer Circle */}
              <circle
                r={stateRadius}
                fill={circleFill}
                stroke={strokeColor}
                strokeWidth={isProjectorMode ? (isActive || isSelected ? 4 : 3) : (isActive || isSelected ? 3 : 2)}
                className="transition-all duration-200"
              />

              {/* Final State Double Ring */}
              {state.isFinal && (
                <circle
                  r={stateRadius - 5}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isProjectorMode ? 3 : 2}
                />
              )}

              {/* State Label */}
              <text
                textAnchor="middle"
                dy="4"
                fill={textColor}
                fontSize={isProjectorMode ? "13" : "12"}
                fontWeight="800"
                className="select-none pointer-events-none"
              >
                {state.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

import React, { useState, useRef, useMemo } from 'react';
import { AutomatonData, AutomatonState, Transition } from '../types';
import { ZoomIn, ZoomOut, Maximize2, Move } from 'lucide-react';

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
  height = 460,
  isProjectorMode = false,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [draggingStateId, setDraggingStateId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Pan & Zoom state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const stateRadius = 26;

  // Auto-calculate viewBox boundary so any automaton (small or 20+ states) fits completely
  const boundingBox = useMemo(() => {
    if (!automaton.states.length) return { x: 0, y: 0, w: 800, h: 460 };
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const s of automaton.states) {
      if (s.x < minX) minX = s.x;
      if (s.y < minY) minY = s.y;
      if (s.x > maxX) maxX = s.x;
      if (s.y > maxY) maxY = s.y;
    }
    const padding = 75;
    const x = Math.min(-30, minX - padding);
    const y = Math.min(-30, minY - padding);
    const w = Math.max(760, maxX - x + padding);
    const h = Math.max(440, maxY - y + padding);
    return { x, y, w, h };
  }, [automaton.states]);

  // Derived viewBox incorporating zoom & pan
  const viewBoxStr = useMemo(() => {
    const vW = boundingBox.w / zoomLevel;
    const vH = boundingBox.h / zoomLevel;
    const vX = boundingBox.x + panOffset.x + (boundingBox.w - vW) / 2;
    const vY = boundingBox.y + panOffset.y + (boundingBox.h - vH) / 2;
    return `${vX} ${vY} ${vW} ${vH}`;
  }, [boundingBox, zoomLevel, panOffset]);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(2.5, z + 0.25));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.35, z - 0.25));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Convert client cursor position into exact SVG Canvas coordinates
  const getSvgCoordinates = (e: React.MouseEvent) => {
    if (!svgRef.current) return { x: e.clientX, y: e.clientY };
    const pt = svgRef.current.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svgRef.current.getScreenCTM()?.inverse());
    return { x: svgP.x, y: svgP.y };
  };

  // Drag node handlers
  const handleMouseDownNode = (e: React.MouseEvent, state: AutomatonState) => {
    e.stopPropagation();
    if (onSelectState) onSelectState(state.id);
    if (!onUpdateStatePos) return;

    setDraggingStateId(state.id);
    const coords = getSvgCoordinates(e);
    setDragOffset({
      x: coords.x - state.x,
      y: coords.y - state.y
    });
  };

  const handleMouseDownCanvas = (e: React.MouseEvent) => {
    if (e.target === svgRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingStateId && onUpdateStatePos) {
      const coords = getSvgCoordinates(e);
      const newX = coords.x - dragOffset.x;
      const newY = coords.y - dragOffset.y;
      onUpdateStatePos(draggingStateId, Math.round(newX), Math.round(newY));
    } else if (isPanning) {
      const dx = (e.clientX - panStart.x) * (boundingBox.w / 800) * (1 / zoomLevel);
      const dy = (e.clientY - panStart.y) * (boundingBox.h / 460) * (1 / zoomLevel);
      setPanOffset((prev) => ({ x: prev.x - dx, y: prev.y - dy }));
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDraggingStateId(null);
    setIsPanning(false);
  };

  // Group transitions by pair of states to calculate curvature offset
  const transitionPairs = new Map<string, Transition[]>();
  automaton.transitions.forEach((t) => {
    const pairKey = [t.from, t.to].sort().join('--');
    if (!transitionPairs.has(pairKey)) {
      transitionPairs.set(pairKey, []);
    }
    transitionPairs.get(pairKey)!.push(t);
  });

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

    // Control point curvature: reverse pair OR long-distance transitions (> 240px)
    const isLongDistance = dist > 240;
    const curveOffset = isReversePair ? 36 : (isLongDistance ? 30 : 0);
    const perpX = -normY * curveOffset;
    const perpY = normX * curveOffset;

    const midX = (source.x + target.x) / 2 + perpX;
    const midY = (source.y + target.y) / 2 + perpY;

    // Dynamic state radii for source & target based on label lengths
    const sourceRadius = Math.max(26, Math.min(48, source.label.length * 4.2));
    const targetRadius = Math.max(26, Math.min(48, target.label.length * 4.2));

    // Calculate edge intersections with state circles
    const startX = source.x + normX * sourceRadius + perpX * 0.3;
    const startY = source.y + normY * sourceRadius + perpY * 0.3;
    const endX = target.x - normX * targetRadius + perpX * 0.3;
    const endY = target.y - normY * targetRadius + perpY * 0.3;

    const shouldCurve = isReversePair || isLongDistance;
    const pathD = shouldCurve
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

      {/* Floating Canvas Controls: Zoom In, Zoom Out, Fit to Screen, Drag Indicator */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-lg select-none">
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-slate-400 border-r border-slate-700/80 pr-2 mr-0.5">
          <Move className="w-3 h-3 text-indigo-400" />
          <span>Pan & Drag</span>
        </div>
        <button
          onClick={handleZoomIn}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          className="p-1.5 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/20 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold px-2"
          title="Fit Diagram to Viewport"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Fit Screen</span>
        </button>
        <span className="text-[10px] font-mono text-slate-400 pl-1 border-l border-slate-700">
          {Math.round(zoomLevel * 100)}%
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox={viewBoxStr}
        className="w-full relative z-10 select-none cursor-grab active:cursor-grabbing"
        style={{ height }}
        onMouseDown={handleMouseDownCanvas}
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

          const labelLength = state.label.length;
          const nodeRadius = Math.max(stateRadius, Math.min(48, labelLength * 4.2));
          const fontSz = labelLength > 14 ? '9' : (labelLength > 8 ? '10' : (isProjectorMode ? '13' : '12'));

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
                <g transform={`translate(${-nodeRadius - 22}, 0)`}>
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
                  r={nodeRadius + 8}
                  fill="none"
                  stroke={isProjectorMode ? '#2563eb' : '#06b6d4'}
                  strokeWidth="3"
                  className="animate-ping opacity-60"
                />
              )}

              {/* Main Outer Circle */}
              <circle
                r={nodeRadius}
                fill={circleFill}
                stroke={strokeColor}
                strokeWidth={isProjectorMode ? (isActive || isSelected ? 4 : 3) : (isActive || isSelected ? 3 : 2)}
                className="transition-all duration-200"
              />

              {/* Final State Double Ring */}
              {state.isFinal && (
                <circle
                  r={nodeRadius - 5}
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
                fontSize={fontSz}
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

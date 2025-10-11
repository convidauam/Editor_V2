import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, EdgeProps } from 'reactflow';
import { getEdgeLabelBackgroundColor } from '../../utils/themeColors';

export const CustomEdgeWithLabel: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  label,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const markerId = `arrowhead-${id}`;
  const isReversed = data?.isReversed; // Determina si la flecha está invertida

  // Calcular la posición del marcador para apuntar al centro del nodo objetivo
  const refX = isReversed ? 0 : 10; // Ajustar la posición horizontal del marcador
  const refY = 3.5; // Centrar verticalmente el marcador

  return (
    <>
      {/* Línea base con estilo dinámico */}
      <path
        d={edgePath}
        fill="none"
        stroke="black"
        strokeWidth={2}
        style={style}
        markerEnd={isReversed ? undefined : `url(#${markerId})`} // Flecha en el target
        markerStart={isReversed ? `url(#${markerId})` : undefined} // Flecha en el source si está invertida
      />
      <svg>
        <defs>
          <marker
            id={markerId}
            markerWidth="10"
            markerHeight="7"
            refX={refX} // Ajustamos la posición horizontal
            refY={refY} // Ajustamos la posición vertical
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>
      </svg>

      {/* Etiqueta */}
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              color: '#fff',
              background: getEdgeLabelBackgroundColor(data?.source, data?.target, []),
              padding: '4px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              pointerEvents: 'all',
              zIndex: 1000,
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
            className="nodrag nopan"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
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
  const hasArrow = data?.hasArrow ?? true; // Por defecto, las conexiones tienen flecha

  // Calcular el degradado para la caja del texto
  const backgroundGradient = getEdgeLabelBackgroundColor(data?.source, data?.target, data?.nodes);

  return (
    <>
      {/* Línea base con estilo dinámico */}
      <path
        d={edgePath}
        fill="none"
        stroke="black"
        strokeWidth={2}
        style={style}
        markerEnd={hasArrow ? `url(#${markerId})` : undefined} // Renderizamos la flecha solo si `hasArrow` es true
        markerStart={isReversed ? `url(#${markerId})` : undefined} // Flecha en el source si está invertida
      />
      <svg>
        <defs>
          <marker
            id={markerId}
            markerWidth="10"
            markerHeight="7"
            refX={isReversed ? 0 : 10} // Ajustar la posición horizontal del marcador
            refY={3.5} // Centrar verticalmente el marcador
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
              background: backgroundGradient, // Aplicar el degradado
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
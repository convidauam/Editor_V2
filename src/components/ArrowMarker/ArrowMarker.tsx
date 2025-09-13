import React from 'react';

interface ArrowMarkerProps {
  id: string;
  isReversed?: boolean;
}

const ArrowMarker: React.FC<ArrowMarkerProps> = ({ id, isReversed = false }) => {
  return (
    <svg style={{ display: 'none' }}>
      <defs>
        <marker
          id={`arrowhead-${id}`}
          markerWidth="10"
          markerHeight="7"
          refX={isReversed ? 0 : 10}
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
      </defs>
    </svg>
  );
};

export default ArrowMarker; // Exportación por defecto
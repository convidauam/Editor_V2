import React from 'react';
import { 
  BaseEdge, 
  EdgeLabelRenderer, 
  getBezierPath, 
  EdgeProps,
  useNodes 
} from 'reactflow';
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
  source,
  target,
}) => {
  const nodes = useNodes();
  
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const backgroundColor = getEdgeLabelBackgroundColor(
    source || '', 
    target || '', 
    nodes
  );

  return (
    <>
      <BaseEdge path={edgePath} style={style} />
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
              background: backgroundColor,
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
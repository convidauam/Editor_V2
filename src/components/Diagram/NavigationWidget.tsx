import React from 'react';

interface NavigationWidgetProps {
  onBack: () => void;
  onForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

export const NavigationWidget: React.FC<NavigationWidgetProps> = ({
  onBack,
  onForward,
  canGoBack,
  canGoForward,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 20, // Cambiado para estar en la parte superior
        right: 20, // Mantenerlo en la esquina derecha
        display: 'flex',
        gap: '10px',
        zIndex: 1000,
      }}
    >
      <button
        onClick={onBack}
        disabled={!canGoBack}
        style={{
          padding: '10px',
          cursor: canGoBack ? 'pointer' : 'not-allowed',
          backgroundColor: canGoBack ? '#007bff' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        ← Atrás
      </button>
      <button
        onClick={onForward}
        disabled={!canGoForward}
        style={{
          padding: '10px',
          cursor: canGoForward ? 'pointer' : 'not-allowed',
          backgroundColor: canGoForward ? '#007bff' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Adelante →
      </button>
    </div>
  );
};
// Función para generar IDs únicos sin dependencias externas
export const generateUniqueId = (): string => {
  // Usar crypto.randomUUID() si está disponible (navegadores modernos)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Alternativa: generar ID único usando timestamp y random
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomPart}`;
};

// Función específica para generar IDs de nodos
export const generateNodeId = (): string => {
  return `node-${generateUniqueId()}`;
};

// Función específica para generar IDs de edges
export const generateEdgeId = (): string => {
  return `edge-${generateUniqueId()}`;
}; 
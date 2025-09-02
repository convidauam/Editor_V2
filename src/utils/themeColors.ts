export const THEME_COLORS = {
  red: '#f44336',
  pink: '#e91e63',
  purple: '#9c27b0',
  deepPurple: '#673ab7',
  indigo: '#3f51b5',
  blue: '#2196f3',
  lightBlue: '#03a9f4',
  cyan: '#00bcd4',
  teal: '#009688',
  green: '#4caf50',
  lightGreen: '#8bc34a',
  lime: '#cddc39',
  yellow: '#ffeb3b',
  amber: '#ffc107',
  orange: '#ff9800',
  deepOrange: '#ff5722',
  brown: '#795548',
  grey: '#9e9e9e',
  blueGrey: '#607d8b',
  default: '#1976d2',
};

export const getThemeColor = (colorName: keyof typeof THEME_COLORS): string => {
  return THEME_COLORS[colorName] || THEME_COLORS.default;
};

export const THEME_COLOR_NAMES = Object.keys(THEME_COLORS) as Array<keyof typeof THEME_COLORS>;

export const createGradient = (colors: string[]): string => {
  if (colors.length === 0) return THEME_COLORS.default;
  if (colors.length === 1) return colors[0];
  
  // Tomar solo los primeros 2 colores únicos
  const uniqueColors = Array.from(new Set(colors)).slice(0, 2);
  if (uniqueColors.length === 1) return uniqueColors[0];
  
  // Crear gradiente lineal horizontal con los 2 colores
  return `linear-gradient(90deg, ${uniqueColors[0]} 0%, ${uniqueColors[1]} 100%)`;
};

export const getNodeThemeColor = (nodeId: string, nodes: any[] | undefined): string => {
  if (!nodes || !Array.isArray(nodes)) {
    console.error('Error: nodes is undefined or not an array');
    return THEME_COLORS.default;
  }

  const node = nodes.find((n) => n.id === nodeId);
  return node?.data?.themeColor ? getThemeColor(node.data.themeColor) : THEME_COLORS.default;
};

export const getEdgeLabelBackgroundColor = (sourceId: string, targetId: string, nodes: any[]): string => {
  const sourceColor = getNodeThemeColor(sourceId, nodes);
  const targetColor = getNodeThemeColor(targetId, nodes);

  // Siempre usar los colores en el orden: source -> target
  return `linear-gradient(90deg, ${sourceColor} 0%, ${targetColor} 100%)`;
};
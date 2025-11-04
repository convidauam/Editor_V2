export const decodeText = (text: string): string => {
  if (!text) return text;
  
  // Mapa de reemplazos para caracteres mal codificados
  const map: Array<[string, string]> = [
    ['Ã³', 'ó'],
    ['Ã¡', 'á'],
    ['Ã©', 'é'],
    ['Ãí', 'í'],
    ['Ãº', 'ú'],
    ['Ã±', 'ñ'],
    ['Ã', 'Á'],
    ['Ã‰', 'É'],
    ['Ã', 'Í'],
    ['Ã"', 'Ó'],
    ['Ãš', 'Ú'],
    ['\u00C3\u0091', 'Ñ'],
    ['Â°', '°'],

    ['Á­a', 'ía'],
    ['Á­o', 'ío'],
    ['Áa', 'ía'],
    ['Áo', 'ío'],
    ['Á\u00AD', 'í'], 
  ];
  
  let result = text;
  
  // Aplicar reemplazos
  for (const [wrong, correct] of map) {
    result = result.split(wrong).join(correct);
  }
  
  // Limpiar soft hyphens residuales (U+00AD)
  result = result.replace(/\u00AD/g, '');
  
  return result;
};

import { decodeText } from '../utils/textDecoder';

const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const batchTranslate = async (texts: string[], targetLang: string, batchSize: number = 3): Promise<string[]> => {
  const results: string[] = [];
  
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(text => translateText(text, targetLang))
    );
    results.push(...batchResults);
    
    if (i + batchSize < texts.length) {
      await delay(200);
    }
  }
  
  return results;
};

export const translateText = async (text: string, targetLang: string): Promise<string> => {
  if (!text || targetLang === 'es') return text;
  
  const decodedText = decodeText(text);
  
  // Detectar si el texto ya está en inglés (contiene palabras comunes en inglés)
  const commonEnglishWords = ['and', 'the', 'of', 'in', 'to', 'a', 'is', 'for', 'with', 'on', 'animals', 'chain', 'stories', 'frame'];
  const lowerText = decodedText.toLowerCase();
  const hasEnglishWords = commonEnglishWords.some(word => 
    lowerText.includes(` ${word} `) || lowerText.includes(`${word} `) || lowerText.includes(` ${word}`)
  );
  
  // Detectar si tiene código de clasificación (ej: "80-82 DOMESTIC ANIMALS")
  const hasClassificationCode = /^\d{2}-\d{2}\s+[A-Z]/.test(decodedText);
  
  // Si parece estar en inglés o tiene código de clasificación, devolver sin traducir
  if (targetLang === 'en' && (hasEnglishWords || hasClassificationCode)) {
    console.log('⚠️ Texto ya en inglés o con código, omitiendo traducción:', decodedText);
    return decodedText;
  }
  
  try {
    const url = `${MYMEMORY_API}?q=${encodeURIComponent(decodedText)}&langpair=es|${targetLang}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      return decodedText;
    }
    
    const data = await response.json();
    let translatedText = data.responseData?.translatedText || decodedText;
    
    translatedText = decodeText(translatedText);
    
    return translatedText;
  } catch (error) {
    console.error('Error translating:', error);
    return decodedText;
  }
};

export const translateNode = async (node: any, targetLang: string) => {
  if (targetLang === 'es') return node; // No traducir si es español
  
  console.log('🌐 Iniciando traducción de nodo completo...');
  const translated = { ...node };
  
  // Recoger todos los textos a traducir
  const textsToTranslate: string[] = [];
  const textMap: Map<number, string> = new Map();
  let index = 0;
  
  // Label del nodo principal
  if (node.label) {
    textMap.set(index++, 'mainLabel');
    textsToTranslate.push(node.label);
  }
  
  // Contenido
  if (node.contents) {
    textMap.set(index++, 'contents');
    textsToTranslate.push(node.contents);
  }
  
  // Labels de nodos hijos
  if (node.nodes && node.nodes.length > 0) {
    node.nodes.forEach((childNode: any, i: number) => {
      if (childNode.label) {
        textMap.set(index++, `node_${i}`);
        textsToTranslate.push(childNode.label);
      }
    });
  }
  
  // Labels de edges
  if (node.edges && node.edges.length > 0) {
    node.edges.forEach((edge: any, i: number) => {
      if (edge.label) {
        textMap.set(index++, `edge_${i}`);
        textsToTranslate.push(edge.label);
      }
    });
  }
  
  console.log(`Traduciendo ${textsToTranslate.length} elementos...`);
  
  // Traducir todo en lotes
  const translatedTexts = await batchTranslate(textsToTranslate, targetLang, 5);
  
  // Aplicar traducciones
  let currentIndex = 0;
  
  if (node.label) {
    translated.label = translatedTexts[currentIndex++];
  }
  
  if (node.contents) {
    translated.contents = translatedTexts[currentIndex++];
  }
  
  if (node.nodes && node.nodes.length > 0) {
    translated.nodes = node.nodes.map((childNode: any) => ({
      ...childNode,
      label: childNode.label ? translatedTexts[currentIndex++] : childNode.label
    }));
  }
  
  if (node.edges && node.edges.length > 0) {
    translated.edges = node.edges.map((edge: any) => ({
      ...edge,
      label: edge.label ? translatedTexts[currentIndex++] : edge.label
    }));
  }
  
  console.log('✅ Traducción de nodo completada');
  return translated;
};

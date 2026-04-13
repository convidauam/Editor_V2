// Usar la URL completa del backend, no rutas relativas
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6543';

export interface HoneycombItem {
  id: string;
  title: string;
  icon?: string;
  url?: string;
}

export interface NodeData {
  id: string;
  label: string;
  title?: string; //  Tipo de celda
  type?: string; // Tipo de celda
  contents?: string; //  Para CellText
  source?: string; //  Para CellRichText (HTML)
  href?: string; //  Para CellWebContent y CellAnimation
  icon?: string; //  Para CellIcon
  iconUrl?: string; //  Para CellIcon
  url?: string; //  URL del recurso Pyramid
  nodes: any[];
  edges: any[];
}

export const honeycombApi = {
  async getHoneycombs(): Promise<{ honeycombs: HoneycombItem[] }> {
    try {
      // URL completa con el dominio del backend
      const url = `${API_BASE_URL}/api/v1/honeycombs`;
      console.log('Fetching honeycombs from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch honeycombs: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getHoneycombs:', error);
      // Retornar array vacío si el backend no está disponible
      return { honeycombs: [] };
    }
  },

  async getHoneycomb(name: string) {
    try {
      const url = `${API_BASE_URL}/api/v1/honeycombs/${name}`;
      console.log('Fetching honeycomb:', name, 'from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch honeycomb: ${name}`);
      }
      
      const data = await response.json();
      console.log('Honeycomb data received:', data);
      return data;
    } catch (error) {
      console.error('Error in getHoneycomb:', error);
      throw error;
    }
  },

  async getNode(nodeId: string): Promise<NodeData> {
    try {
      const url = `${API_BASE_URL}/api/v1/node/${nodeId}`;
      console.log('🔍 Fetching node:', nodeId, 'from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch node: ${nodeId} (Status: ${response.status})`);
      }
      
      const data = await response.json();
      console.log(' Node data received:', data);
      console.log(' Node URL field:', data.url);
      console.log(' Node href field:', data.href);
      console.log(' Node icon field:', data.icon);
      console.log(' All data keys:', Object.keys(data));
      
      // Procesar el href para construir URL completa si es relativa
      if (data.href && !data.href.startsWith('http')) {
        const absoluteHref = `${API_BASE_URL}${data.href}`;
        console.log('✅ Converted href to absolute URL:', absoluteHref);
        data.href = absoluteHref;
      }
      
      // También procesar la URL si es relativa
      if (data.url && !data.url.startsWith('http') && data.url.startsWith('/')) {
        data.url = `${API_BASE_URL}${data.url}`;
        console.log('✅ Converted url to absolute URL:', data.url);
      }
      
      return data;
    } catch (error) {
      console.error('❌ Error in getNode:', error);
      throw error;
    }
  },

  async getNodeContent(nodeUrl: string): Promise<string | null> {
    try {
      console.log('🔍 Fetching node content from:', nodeUrl);
      
      // Si ya es un recurso directo (imagen/video), devolverlo
      if (nodeUrl.match(/\.(jpg|jpeg|png|gif|webp|svg|mp4|webm)$/i)) {
        console.log('✅ Direct media URL detected:', nodeUrl);
        return nodeUrl;
      }
      
      const response = await fetch(nodeUrl, {
        method: 'GET',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,image/*',
        },
      });
      
      if (!response.ok) {
        console.warn(`⚠️ Failed to fetch content from: ${nodeUrl} (Status: ${response.status})`);
        return null;
      }
      
      // Verificar si es una imagen directa por Content-Type
      const contentType = response.headers.get('content-type');
      console.log('📄 Content-Type:', contentType);
      
      if (contentType?.startsWith('image/') || contentType?.startsWith('video/')) {
        console.log('🖼️ Direct media resource detected');
        return nodeUrl;
      }
      
      // Si es HTML, extraer el recurso
      const html = await response.text();
      console.log('📝 HTML content received, length:', html.length);
      
      // Extraer la URL del GIF/imagen/video del HTML
      const imgMatch = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
      const gifMatch = html.match(/url\(['"]?([^'")\s]+\.(gif|png|jpg|jpeg))['"]?\)/i);
      const videoMatch = html.match(/<video[^>]+src=["']([^"'>]+)["']/i);
      const sourceMatch = html.match(/<source[^>]+src=["']([^"'>]+)["']/i);
      
      if (imgMatch && imgMatch[1]) {
        const imgSrc = imgMatch[1];
        const absoluteUrl = imgSrc.startsWith('http') ? imgSrc : `${API_BASE_URL}${imgSrc}`;
        console.log('✅ Image found in HTML:', absoluteUrl);
        return absoluteUrl;
      }
      
      if (videoMatch && videoMatch[1]) {
        const videoSrc = videoMatch[1];
        const absoluteUrl = videoSrc.startsWith('http') ? videoSrc : `${API_BASE_URL}${videoSrc}`;
        console.log('✅ Video found in HTML:', absoluteUrl);
        return absoluteUrl;
      }
      
      if (sourceMatch && sourceMatch[1]) {
        const sourceSrc = sourceMatch[1];
        const absoluteUrl = sourceSrc.startsWith('http') ? sourceSrc : `${API_BASE_URL}${sourceSrc}`;
        console.log('✅ Source found in HTML:', absoluteUrl);
        return absoluteUrl;
      }
      
      if (gifMatch && gifMatch[1]) {
        const gifSrc = gifMatch[1];
        const absoluteUrl = gifSrc.startsWith('http') ? gifSrc : `${API_BASE_URL}${gifSrc}`;
        console.log('✅ GIF/Image found in CSS:', absoluteUrl);
        return absoluteUrl;
      }
      
      console.warn('⚠️ No media found in HTML content');
      return null;
    } catch (error) {
      // Manejar error CORS o red
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.warn('⚠️ Network/CORS error - no se pudo extraer contenido. Se usará URL directa si está disponible.');
        return null;
      }
      console.error('❌ Error fetching node content:', error);
      return null;
    }
  }
};

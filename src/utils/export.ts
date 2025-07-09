import { toPng, toSvg } from 'html-to-image';
import { ReactFlowInstance } from 'reactflow';

export const exportToJson = (reactFlowInstance: ReactFlowInstance | null, filename: string = 'diagrama.json') => {
  if (!reactFlowInstance) return;
  
  const flow = reactFlowInstance.toObject();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(flow, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', filename);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const exportToPng = async (element: HTMLElement | null, filename: string = 'diagrama.png') => {
  if (!element) return;
  
  try {
    const dataUrl = await toPng(element, { 
      cacheBust: true,
      backgroundColor: '#121212' // Fondo oscuro para coincidir con el tema
    });
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error al exportar la imagen:', error);
    alert('Error al exportar la imagen');
  }
};

export const exportToSvg = async (element: HTMLElement | null, filename: string = 'diagrama.svg') => {
  if (!element) return;
  
  try {
    const dataUrl = await toSvg(element, { 
      cacheBust: true,
      backgroundColor: '#121212'
    });
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error al exportar SVG:', error);
    alert('Error al exportar SVG');
  }
}; 
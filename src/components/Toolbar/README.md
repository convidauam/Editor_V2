# Toolbar

## Descripción
Barra de herramientas para exportar e importar diagramas en diferentes formatos.

## Componentes

### Toolbar

**¿Qué hace?**
- Proporciona botones para exportar el diagrama a JSON, PNG o SVG
- Permite importar un diagrama desde archivo JSON
- Se posiciona en la esquina superior izquierda del canvas

**¿Qué recibe?**
```typescript
interface ToolbarProps {
  reactFlowInstance: ReactFlowInstance | null; // Instancia de ReactFlow
  diagramRef: React.RefObject<HTMLDivElement>; // Referencia al contenedor del diagrama
  onImportJson: (file: File) => void;          // Función callback para importar JSON
}
```

**¿Qué muestra/renderiza?**
- Stack horizontal con 4 botones:
  - **Exportar JSON**: Descarga el diagrama como archivo .json
  - **Exportar PNG**: Descarga una imagen PNG del diagrama
  - **Exportar SVG**: Descarga una imagen SVG del diagrama
  - **Importar JSON**: Abre selector de archivo para cargar un diagrama
- Cada botón tiene un icono representativo

**¿Cómo se usa?**

```typescript
import { Toolbar } from '../Toolbar/Toolbar';
import { useRef } from 'react';
import { ReactFlowInstance } from 'reactflow';

function MyDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  
  const handleImport = (file: File) => {
    // Leer el archivo y cargar el diagrama
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      // Procesar el JSON y actualizar el diagrama
    };
    reader.readAsText(file);
  };
  
  return (
    <div ref={diagramRef}>
      <Toolbar
        reactFlowInstance={rfInstance}
        diagramRef={diagramRef}
        onImportJson={handleImport}
      />
      
      <ReactFlow onInit={setRfInstance}>
        {/* ... */}
      </ReactFlow>
    </div>
  );
}
```

**Formatos de exportación:**
- **JSON**: Formato completo con nodos, edges y posiciones
- **PNG**: Imagen rasterizada del diagrama
- **SVG**: Imagen vectorial escalable del diagrama

**Salida esperada:**
- Barra de herramientas flotante en la esquina superior izquierda
- Archivos descargados al hacer clic en los botones de exportar
- Diagrama actualizado al importar un archivo JSON válido

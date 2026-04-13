# NodeTypes

## Descripción
Componentes personalizados para renderizar diferentes tipos de nodos en el diagrama.

## Componentes

### CustomNode

**¿Qué hace?**
- Renderiza un nodo personalizado con estilo visual consistente
- Muestra icono, texto y barra de color temático
- Permite hacer clic si el nodo tiene URL asociada
- Proporciona handles para conectar con otros nodos

**¿Qué recibe?**
```typescript
interface CustomNodeProps extends NodeProps {
  data: {
    label: string;        // Texto a mostrar en el nodo
    iconUrl?: string;     // URL del icono/imagen del nodo
    themeColor?: string;  // Color temático (default, primary, success, etc.)
    url?: string;         // URL opcional para hacer el nodo clickeable
  };
  selected: boolean;      // Si el nodo está seleccionado
}
```

**¿Qué muestra/renderiza?**
- Box con borde y sombra
- Barra de color temático en la parte superior
- Icono circular (si se proporciona)
- Etiqueta de texto centrada
- Handles en los 4 lados para conectar con otros nodos
- Cursor pointer si tiene URL

**¿Cómo se usa?**

```typescript
import { CustomNode } from '../NodeTypes/CustomNode';
import ReactFlow from 'reactflow';

const nodeTypes = {
  custom: CustomNode,
};

function MyDiagram() {
  const nodes = [
    {
      id: '1',
      type: 'custom',
      position: { x: 100, y: 100 },
      data: {
        label: 'Mi Nodo',
        iconUrl: '/path/to/icon.png',
        themeColor: 'primary',
        url: 'https://example.com'
      }
    }
  ];
  
  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
    />
  );
}
```

**Handles del nodo:**
- Top: Para conectar desde arriba
- Bottom: Para conectar desde abajo
- Left: Para conectar desde la izquierda
- Right: Para conectar desde la derecha

**Salida esperada:**
- Nodo visual con estilo personalizado
- Icono y texto centrados
- Interactivo si tiene URL
- Puede conectarse con otros nodos desde cualquier lado

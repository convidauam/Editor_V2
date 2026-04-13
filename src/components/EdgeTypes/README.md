# EdgeTypes

## Descripción
Componentes personalizados para renderizar diferentes tipos de conexiones (edges) en el diagrama.

## Componentes

### CustomEdgeWithLabel

**¿Qué hace?**
- Renderiza una conexión personalizada entre dos nodos
- Muestra una etiqueta en el centro de la línea
- Dibuja flechas direccionales en los extremos
- Soporta estilos personalizados (sólido, punteado)

**¿Qué recibe?**
```typescript
interface CustomEdgeWithLabelProps extends EdgeProps {
  id: string;              // ID único de la conexión
  sourceX: number;         // Coordenada X del punto de origen
  sourceY: number;         // Coordenada Y del punto de origen
  targetX: number;         // Coordenada X del punto destino
  targetY: number;         // Coordenada Y del punto destino
  sourcePosition: Position; // Posición del handle de origen
  targetPosition: Position; // Posición del handle destino
  style?: React.CSSProperties; // Estilos personalizados para la línea
  data?: any;              // Datos adicionales (ej: isReversed)
  label?: string | React.ReactNode; // Etiqueta a mostrar
}
```

**¿Qué muestra/renderiza?**
- Una línea curva (Bezier) entre dos nodos
- Una flecha en el extremo (o en ambos si está invertida)
- Una etiqueta centrada en la línea con fondo temático
- La línea puede ser sólida o punteada según el estilo

**¿Cómo se usa?**

```typescript
import { CustomEdgeWithLabel } from '../EdgeTypes/CustomEdgeWithLabel';
import ReactFlow from 'reactflow';

const edgeTypes = {
  'custom-label': CustomEdgeWithLabel,
};

function MyDiagram() {
  const edges = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      type: 'custom-label',
      label: 'Conexión',
      style: { strokeDasharray: '5,5' }, // Punteada
      data: { isReversed: false }
    }
  ];
  
  return (
    <ReactFlow
      edges={edges}
      edgeTypes={edgeTypes}
    />
  );
}
```

**Salida esperada:**
- Línea curva conectando dos nodos con flecha direccional
- Etiqueta centrada sobre la línea
- Estilo visual consistente con el tema del diagrama

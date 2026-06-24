# ContextMenu

## Descripción
Menú contextual que aparece al hacer clic derecho en el diagrama, nodos o conexiones.

## Componentes

### ContextMenu

**¿Qué hace?**
- Muestra un menú con opciones contextuales según lo que se seleccionó
- Permite crear, editar y eliminar nodos y conexiones
- Proporciona opciones para modificar el estilo de las conexiones

**¿Qué recibe?**
```typescript
interface ContextMenuProps {
  anchorPosition: { x: number; y: number } | null; // Posición donde apareció el menú
  onClose: () => void;                              // Función para cerrar el menú
  onCreateNode: () => void;                         // Función para crear un nuevo nodo
  onDeleteNode: () => void;                         // Función para eliminar el nodo seleccionado
  onEditNode: () => void;                           // Función para editar el nodo seleccionado
  onDeleteEdge: () => void;                         // Función para eliminar la conexión seleccionada
  onToggleEdgeDirection: () => void;                // Función para invertir dirección de la flecha
  onToggleEdgeType: () => void;                     // Función para cambiar tipo de línea
  selectedNodeForDelete: string | null;             // ID del nodo seleccionado
  selectedEdgeForDelete: string | null;             // ID de la conexión seleccionada
}
```

**¿Qué muestra/renderiza?**
- Un menú Material-UI con opciones según el contexto:
  - Si hay un nodo seleccionado: Editar Nodo, Eliminar Nodo
  - Si hay una conexión seleccionada: Eliminar Línea, Invertir Flecha, Cambiar Estilo
  - Siempre: Crear Nodo

**¿Cómo se usa?**

```typescript
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { useState } from 'react';

function MyDiagram() {
  const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);
  
  return (
    <div>
      <ContextMenu
        anchorPosition={contextMenu}
        onClose={() => setContextMenu(null)}
        onCreateNode={handleCreateNode}
        onDeleteNode={handleDeleteNode}
        onEditNode={handleEditNode}
        onDeleteEdge={handleDeleteEdge}
        onToggleEdgeDirection={handleToggleDirection}
        onToggleEdgeType={handleToggleType}
        selectedNodeForDelete={selectedNode}
        selectedEdgeForDelete={selectedEdge}
      />
    </div>
  );
}
```

**Salida esperada:**
- Menú contextual posicionado en las coordenadas especificadas
- Ejecuta las acciones correspondientes cuando el usuario selecciona una opción

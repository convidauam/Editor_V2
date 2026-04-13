# EdgeEditModal

## Descripción
Modal para editar propiedades de las conexiones (edges) entre nodos del diagrama.

## Componentes

### EdgeEditModal

**¿Qué hace?**
- Permite editar el nombre/etiqueta de una conexión
- Permite cambiar el estilo de la línea (sólida o punteada)
- Actualiza las propiedades de la conexión en el diagrama

**¿Qué recibe?**
```typescript
interface EdgeEditModalProps {
  open: boolean;                              // Si el modal está visible
  onClose: () => void;                        // Función para cerrar el modal
  edge: Edge | null;                          // Conexión a editar
  nodes: Node[];                              // Lista de todos los nodos (para referencia)
  onSave: (edgeId: string, newData: any) => void; // Función para guardar cambios
}
```

**¿Qué muestra/renderiza?**
- Modal con formulario de edición
- Campo de texto para el nombre de la línea
- Selector desplegable para el estilo (default o punteada)
- Botones de Guardar y Cancelar

**¿Cómo se usa?**

```typescript
import { EdgeEditModal } from '../EdgeEditModal/EdgeEditModal';
import { useState } from 'react';
import { Edge, Node } from 'reactflow';

function MyDiagram() {
  const [edgeToEdit, setEdgeToEdit] = useState<Edge | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  
  const handleSaveEdge = (edgeId: string, newData: any) => {
    // Actualizar la conexión en el estado
    console.log('Guardando cambios:', edgeId, newData);
  };
  
  return (
    <div>
      <EdgeEditModal
        open={edgeToEdit !== null}
        onClose={() => setEdgeToEdit(null)}
        edge={edgeToEdit}
        nodes={nodes}
        onSave={handleSaveEdge}
      />
    </div>
  );
}
```

**Salida esperada:**
- Modal que permite editar la conexión seleccionada
- Al guardar, actualiza la etiqueta y estilo de la línea
- Los cambios se reflejan inmediatamente en el diagrama

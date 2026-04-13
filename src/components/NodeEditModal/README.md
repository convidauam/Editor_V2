# NodeEditModal

## Descripción
Modal para editar las propiedades de los nodos en el diagrama.

## Componentes

### NodeEditModal

**¿Qué hace?**
- Permite editar el texto/etiqueta de un nodo
- Permite cambiar el color temático del nodo
- Actualiza las propiedades del nodo en el diagrama

**¿Qué recibe?**
```typescript
interface NodeEditModalProps {
  open: boolean;                              // Si el modal está visible
  node: Node | null;                          // Nodo a editar
  onClose: () => void;                        // Función para cerrar el modal
  onSave: (nodeId: string, newData: any) => void; // Función para guardar cambios
}
```

**¿Qué muestra/renderiza?**
- Modal con formulario de edición
- Campo de texto para el nombre/etiqueta del nodo
- Selector desplegable para el color temático
- Vista previa del color seleccionado (chip)
- Botones de Guardar y Cancelar

**¿Cómo se usa?**

```typescript
import { NodeEditModal } from '../NodeEditModal/NodeEditModal';
import { useState } from 'react';
import { Node } from 'reactflow';

function MyDiagram() {
  const [nodeToEdit, setNodeToEdit] = useState<Node | null>(null);
  
  const handleSaveNode = (nodeId: string, newData: any) => {
    // Actualizar el nodo en el estado
    console.log('Guardando nodo:', nodeId, newData);
  };
  
  return (
    <div>
      <button onClick={() => setNodeToEdit(someNode)}>
        Editar Nodo
      </button>
      
      <NodeEditModal
        open={nodeToEdit !== null}
        node={nodeToEdit}
        onClose={() => setNodeToEdit(null)}
        onSave={handleSaveNode}
      />
    </div>
  );
}
```

**Colores temáticos disponibles:**
- default (azul)
- primary (morado)
- success (verde)
- warning (naranja)
- error (rojo)
- info (cian)
- grey (gris)

**Salida esperada:**
- Modal que permite editar el nodo seleccionado
- Al guardar, actualiza la etiqueta y color del nodo
- Los cambios se reflejan inmediatamente en el diagrama

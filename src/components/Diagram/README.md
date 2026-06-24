# Diagram

## Descripción
Componentes principales del editor de diagramas interactivo con React Flow.

## Componentes

### DiagramCanvas

**¿Qué hace?**
- Componente principal que gestiona todo el editor de diagramas
- Maneja nodos, conexiones, interacción del usuario, historial y persistencia
- Integra todos los componentes del editor (menú contextual, modales, toolbar)

**¿Qué recibe?**
- No recibe props directamente (es un componente autónomo)
- Obtiene datos de la URL y la API de honeycomb

**¿Qué muestra/renderiza?**
- Canvas de ReactFlow con nodos y conexiones arrastrables
- Controles de zoom y minimapa
- Barra de herramientas para exportar/importar
- Menú contextual para editar
- Modales para editar nodos y conexiones
- Indicador de carga mientras obtiene datos

**¿Cómo se usa?**

```typescript
import { DiagramCanvas } from '../Diagram/DiagramCanvas';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <DiagramCanvas />
    </div>
  );
}
```

**Funcionalidades principales:**
- Crear, editar y eliminar nodos
- Conectar nodos entre sí
- Cambiar estilos de nodos y conexiones
- Exportar a JSON, PNG, SVG
- Importar desde JSON
- Historial de cambios (deshacer/rehacer)
- Guardar automáticamente

**Salida esperada:**
- Editor de diagramas completamente funcional
- Los cambios se persisten automáticamente
- El diagrama se puede exportar en múltiples formatos

---

### NodeContentModal

**¿Qué hace?**
- Modal que muestra el contenido completo de un nodo cuando se hace clic en él
- Renderiza la plantilla correspondiente según el tipo de nodo

**¿Qué recibe?**
```typescript
interface NodeContentModalProps {
  open: boolean;           // Si el modal está abierto
  onClose: () => void;     // Función para cerrar el modal
  node: Node | null;       // Nodo a mostrar
}
```

**¿Qué muestra/renderiza?**
- Modal con el contenido completo del nodo (texto, video, podcast, juego Unity)
- La plantilla correspondiente según el tipo de contenido

**¿Cómo se usa?**

```typescript
import NodeContentModal from '../Diagram/NodeContentModal';

function MyComponent() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  
  return (
    <NodeContentModal
      open={selectedNode !== null}
      onClose={() => setSelectedNode(null)}
      node={selectedNode}
    />
  );
}
```

**Salida esperada:**
- Modal con el contenido renderizado del nodo
- Se cierra al hacer clic fuera o en el botón de cerrar

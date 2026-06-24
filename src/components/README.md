# Componentes del Editor V2

## Descripción
Biblioteca completa de componentes React para el Editor de Honeycombs V2. Incluye componentes para el editor de diagramas y vistas de contenido.

## Estructura General

```
components/
├── ArrowMarker/           # Marcadores SVG para flechas en conexiones
├── ContextMenu/           # Menú contextual del editor
├── Diagram/               # Canvas principal del editor de diagramas
├── EdgeEditModal/         # Modal para editar conexiones
├── EdgeTypes/             # Tipos personalizados de conexiones
├── NodeEditModal/         # Modal para editar nodos
├── NodeTypes/             # Tipos personalizados de nodos
├── Toolbar/               # Barra de herramientas (exportar/importar)
└── Views/                 # Vistas de alto nivel (Honeycomb, Node, BeeHive)
```

## Categorías de Componentes

### 🎨 Editor de Diagramas
Componentes para crear y editar diagramas de honeycomb.

- **[Diagram](./Diagram/README.md)** - Canvas principal con ReactFlow
- **[NodeTypes](./NodeTypes/README.md)** - Nodos personalizados
- **[EdgeTypes](./EdgeTypes/README.md)** - Conexiones personalizadas
- **[ArrowMarker](./ArrowMarker/README.md)** - Marcadores de flecha
- **[ContextMenu](./ContextMenu/README.md)** - Menú contextual
- **[NodeEditModal](./NodeEditModal/README.md)** - Editar nodos
- **[EdgeEditModal](./EdgeEditModal/README.md)** - Editar conexiones
- **[Toolbar](./Toolbar/README.md)** - Exportar/importar diagrama

**Uso típico:**
```typescript
import { DiagramCanvas } from './components/Diagram/DiagramCanvas';

function EditorPage() {
  return (
    <div style={{ height: '100vh' }}>
      <DiagramCanvas />
    </div>
  );
}
```

---

### �️ Vistas
Vistas de alto nivel para mostrar contenido.

- **[Views](./Views/README.md)** - Documentación general
  - **HoneycombView** - Vista de un honeycomb completo
  - **NodeView** - Vista de un nodo individual
  - **BeeHiveView** - Vista de todos los honeycombs

**Uso típico:**
```typescript
import { HoneycombView } from './components/Views/HoneycombView';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route path="/honeycomb/:name" element={<HoneycombView />} />
    </BrowserRouter>
  );
}
```

---

## Guía de Inicio Rápido

### 1. Editor de Diagramas

```typescript
import { DiagramCanvas } from './components/Diagram/DiagramCanvas';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <DiagramCanvas />
    </div>
  );
}
```

### 2. Renderizar Contenido de un Nodo

```typescript
import { 
  PlantillaTexto,
  PlantillaVideo,
  PlantillaPodcast,
  PlantillaUnity
} from './components/Plantillas';

function NodeContentRenderer({ node }) {
  const renderByType = () => {
    switch (node.data.contentType) {
      case 'text':
        return <PlantillaTexto {...node.data} />;
      case 'video':
        return <PlantillaVideo {...node.data} />;
      case 'podcast':
        return <PlantillaPodcast {...node.data} />;
      case 'unity':
        return <PlantillaUnity {...node.data} />;
      default:
        return <div>Tipo no soportado</div>;
    }
  };
  
  return <div>{renderByType()}</div>;
}
```

### 3. Landing Page con Tarjetas

```typescript
import { ExpandableCard } from './components/LandingPage/ExpandableCard';
import { useState } from 'react';

function ContentGallery() {
  const [expanded, setExpanded] = useState(null);
  
  return (
    <div>
      {cards.map(card => (
        <ExpandableCard
          key={card.id}
          card={card}
          isExpanded={expanded === card.id}
          onToggleExpand={() => setExpanded(
            expanded === card.id ? null : card.id
          )}
          cardType="large"
        />
      ))}
    </div>
  );
}
```

---

## Flujo de Trabajo Típico

### 1. Crear un Honeycomb
```typescript
// El usuario usa DiagramCanvas para crear nodos y conexiones
<DiagramCanvas />
```

### 2. Guardar el Diagrama
```typescript
// Toolbar proporciona botones de exportar
// El diagrama se guarda automáticamente vía API
```

### 3. Ver el Honeycomb
```typescript
// HoneycombView muestra el honeycomb completo
<Route path="/honeycomb/:name" element={<HoneycombView />} />
```

### 4. Ver Contenido de un Nodo
```typescript
// NodeView renderiza el contenido con la plantilla apropiada
<Route path="/node/:id" element={<NodeView />} />
```

---

## Principios de Diseño

### Composición
Los componentes están diseñados para ser composables:

```typescript
// Usar componentes individuales
import { VideoPlayer } from './Plantillas/PlantillaVideo';
import { SimpleHeader } from './Plantillas/Common';

<div>
  <SimpleHeader title="Mi Contenido" />
  <VideoPlayer videoUrl="..." />
</div>

// O usar plantillas completas
import { PlantillaVideo } from './Plantillas';

<PlantillaVideo {...props} />
```

### Responsive
Todos los componentes son responsive por defecto:

```typescript
// Los componentes se adaptan automáticamente
<ExpandableCard 
  cardType="large" // Se ajusta según el tamaño de pantalla
  isExpanded={true}
/>
```

### Tematización
Todos los componentes usan Material-UI para consistencia:

```typescript
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

<ThemeProvider theme={lightTheme}>
  <App />
</ThemeProvider>
```

---

## Dependencias Principales

- **React** - Biblioteca UI
- **ReactFlow** - Editor de diagramas
- **Material-UI** - Componentes de UI
- **React Router** - Navegación
- **TypeScript** - Type safety

---

## Estructura de Archivos Típica

```
Component/
├── Component.tsx          # Implementación principal
├── types.ts              # Definiciones de tipos TypeScript
├── index.tsx             # Exportaciones públicas
└── README.md             # Documentación detallada
```

---

## Convenciones

### Nombres de Componentes
- PascalCase para componentes: `DiagramCanvas`, `VideoPlayer`
- Descriptivos y específicos

### Props
- Interfaces TypeScript para todas las props
- Props opcionales con `?`
- Valores por defecto con desestructuración

```typescript
interface ComponentProps {
  required: string;
  optional?: number;
}

const Component: React.FC<ComponentProps> = ({ 
  required, 
  optional = 10 
}) => {
  // ...
}
```

### Estilos
- Material-UI `sx` prop para estilos inline
- Theme-aware styling
- Responsive con breakpoints

```typescript
<Box sx={{
  padding: { xs: 2, md: 4 },
  backgroundColor: 'primary.main'
}}>
  {/* contenido */}
</Box>
```

---

## Testing

```typescript
// Ejemplo de test de componente
import { render, screen } from '@testing-library/react';
import { VideoPlayer } from './VideoPlayer';

test('renderiza el video player', () => {
  render(<VideoPlayer videoUrl="test.mp4" />);
  expect(screen.getByTitle('Video')).toBeInTheDocument();
});
```

---

## Contribuir

Al crear nuevos componentes:

1. Seguir la estructura de carpetas existente
2. Crear archivo `README.md` con documentación
3. Definir interfaces TypeScript para props
4. Hacer componentes responsive
5. Usar Material-UI para consistencia
6. Agregar ejemplos de uso

---

## Ver También

- [Documentación de ReactFlow](https://reactflow.dev/)
- [Documentación de Material-UI](https://mui.com/)
- [Guía de TypeScript](https://www.typescriptlang.org/docs/)

---

## Índice Completo de Componentes

### Editor
- [ArrowMarker](./ArrowMarker/README.md)
- [ContextMenu](./ContextMenu/README.md)
- [Diagram](./Diagram/README.md)
- [EdgeEditModal](./EdgeEditModal/README.md)
- [EdgeTypes](./EdgeTypes/README.md)
- [NodeEditModal](./NodeEditModal/README.md)
- [NodeTypes](./NodeTypes/README.md)
- [Toolbar](./Toolbar/README.md)

### Vistas
- [Views](./Views/README.md)

### Plantillas
- [Plantillas](./Plantillas/README.md)
- [Common](./Plantillas/Common/README.md)
- [PlantillaPodcast](./Plantillas/PlantillaPodcast/README.md)
- [PlantillaTexto](./Plantillas/PlantillaTexto/README.md)
- [PlantillaUnity](./Plantillas/PlantillaUnity/README.md)
- [PlantillaVideo](./Plantillas/PlantillaVideo/README.md)

### Landing Page
- [LandingPage](./LandingPage/README.md)
- [ExpandableCard](./LandingPage/ExpandableCard/README.md)
- [ContentSection](./LandingPage/ContentSection/README.md)

# Views

## Descripción
Vistas de alto nivel para mostrar información de honeycombs y nodos individuales.

## Componentes

### HoneycombView

**¿Qué hace?**
- Muestra la vista detallada de un honeycomb completo
- Obtiene datos del backend API según el nombre del honeycomb
- Proporciona navegación para ver nodos individuales o editar el diagrama

**¿Qué recibe?**
- Obtiene el nombre del honeycomb desde los parámetros de la URL (`useParams`)

**¿Qué muestra/renderiza?**
- Header con fondo degradado y título del honeycomb
- Migas de pan para navegación
- Información del honeycomb (nombre, descripción, fecha)
- Tarjetas con los nodos del honeycomb
- Botones para editar el diagrama o ver en formato JSON
- Estado de carga mientras obtiene datos
- Mensajes de error si falla la carga

**¿Cómo se usa?**

```typescript
import { HoneycombView } from '../Views/HoneycombView';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route path="/honeycomb/:name" element={<HoneycombView />} />
    </BrowserRouter>
  );
}

// Navegar a: /honeycomb/mi-honeycomb
```

**Salida esperada:**
- Vista completa del honeycomb con toda su información
- Lista de nodos del honeycomb
- Navegación a vista de edición o nodo individual

---

### BeeHiveView

**¿Qué hace?**
- Muestra la lista de todos los honeycombs disponibles
- Proporciona navegación para ver cada honeycomb

**¿Qué muestra/renderiza?**
- Lista de honeycombs con sus títulos y descripciones
- Enlaces para acceder a cada honeycomb

---

### NodeView

**¿Qué hace?**
- Muestra la vista detallada de un nodo individual
- Renderiza el contenido completo según el tipo de nodo (texto, video, podcast, juego)

**¿Qué recibe?**
- Obtiene el ID del nodo desde los parámetros de la URL

**¿Qué muestra/renderiza?**
- Contenido completo del nodo
- Plantilla correspondiente al tipo de contenido
- Navegación de regreso al honeycomb

---

### LandingPage

**¿Qué hace?**
- Página de inicio de la aplicación
- Punto de entrada para explorar honeycombs

**¿Qué muestra/renderiza?**
- Hero section con información de bienvenida
- Enlaces a las diferentes secciones de la aplicación

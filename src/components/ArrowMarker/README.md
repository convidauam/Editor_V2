# ArrowMarker

## Descripción
Componente SVG que define marcadores de flecha para usar en las conexiones (edges) del diagrama.

## Componentes

### ArrowMarker

**¿Qué hace?**
- Crea un marcador SVG de flecha para usar en los extremos de las líneas del diagrama
- Define el estilo visual de las flechas en las conexiones entre nodos

**¿Qué recibe?**
```typescript
interface ArrowMarkerProps {
  id: string;           // Identificador único del marcador
  isReversed?: boolean; // Si la flecha apunta en dirección inversa (default: false)
}
```

**¿Qué muestra/renderiza?**
- Un elemento SVG invisible que contiene la definición del marcador de flecha
- La flecha es un polígono negro triangular

**¿Cómo se usa?**

```typescript
import ArrowMarker from '../ArrowMarker/ArrowMarker';

function MyComponent() {
  return (
    <div>
      <ArrowMarker id="my-edge" isReversed={false} />
      {/* El marcador se referencia en edges como: url(#arrowhead-my-edge) */}
    </div>
  );
}
```

**Salida esperada:**
- Define marcadores SVG que pueden ser referenciados por las conexiones del diagrama
- No es visible directamente, pero afecta cómo se ven las flechas en las líneas

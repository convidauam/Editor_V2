Wiki ---> [Componentes Editor](https://wikiabeja.apuntia.com/es/componentes/editor)


## Funcionalidades
Las funcionalidades actuales del editor gráfico son:

- Crear nodos, editar su color y texto
- Crear conexiones entre nodos, editar su aspectyo y añadir etiquetas.
- Exportar los diagramas en archivos json, png y svg

Queda corregir:
- Conexiones con las anclas laterales de los nodos

A implementar:

- Funcion de importar y leer archivos json
- Aspecto de flecha (direccional) para las conexiones

- Posibles tipos de nodo
- Nodos- imagen
	- Banco de iconos, con barra lateral para importarlos. 
	- (codificar cada imagen con nombre)



# Descripción General

**Editor_V2** es la segunda iteración del editor CONVIDA, desarrollado principalmente en **TypeScript** junto con **React**. El objetivo principal del proyecto es ofrecer una interfaz gráfica para crear, editar y exportar diagramas tipo "flow" (diagrama de flujo), con soporte para exportar en formatos JSON, PNG y SVG.

---

## Arquitectura

### 1. **Estructura de Carpetas**
- **src/**  
  Carpeta principal con todo el código fuente:
  - **components/**  
    Componentes React reutilizables, por ejemplo: Toolbar, DiagramCanvas.
  - **utils/**  
    Funciones utilitarias para exportar, generar IDs, etc.
  - **hooks/**  
    Hooks personalizados, por ejemplo, `useDiagram` para manejar el estado y lógica de los diagramas.
  - **theme/**  
    Temas para la aplicación (por defecto, tema oscuro).
  - **index.tsx / App.tsx**  
    Entrada principal y montaje de la app React.

- **public/**  
  Contiene archivos estáticos (index.html, manifest, favicon, etc.).

---

### 2. **Funcionamiento General**

- **React Flow**  
  El núcleo de la aplicación usa la librería [reactflow](https://reactflow.dev/) para renderizar y manipular diagramas de flujo. Los nodos y conexiones (edges) se gestionan con estados internos y hooks personalizados.

- **Hooks Personalizados (`useDiagram`)**  
  Encapsulan toda la lógica relacionada con los diagramas:
  - Gestión de nodos y conexiones.
  - Acciones como agregar, borrar, duplicar nodos/edges.
  - Manejo de eventos de edición y contexto (menús contextuales).
  - Exportación e importación de diagramas.

- **Componentes UI**  
  - **Toolbar:**  
    Barra superior con botones para exportar los diagramas en diferentes formatos.  
    Ejemplo: Exportar JSON utiliza la función `exportToJson` de `utils/export.ts`.
  - **DiagramCanvas:**  
    Área donde se renderizan y manipulan los nodos y conexiones visualmente.

- **Exportación de Diagramas**  
  - **JSON:** Serializa el estado actual del diagrama y lo descarga como archivo local.
  - **PNG/SVG:** Captura la imagen del diagrama y la descarga usando utilidades como `html-to-image`.

---

### 3. **Otros aspectos técnicos**
- **Estilo y Temas:**  
  Utiliza Material UI y un tema oscuro personalizado.
- **Gestión de IDs:**  
  Los nodos y edges tienen IDs generados única y automáticamente con utilidades propias.
- **Extensibilidad:**  
  El código está modularizado para permitir agregar más temas, tipos de nodos, funcionalidad de exportación, etc.

---

## Resumen de flujo de uso
1. El usuario crea y edita diagramas en la interfaz.
2. Puede manipular nodos y conexiones con menús contextuales y doble clic.
3. Puede exportar el diagrama en varios formatos usando la Toolbar.
4. Todo el estado y lógica se maneja con hooks personalizados para mantener el código limpio y escalable.

---

## Para comunicación con Backend:

**Función de importacicon y lectura de los JSON:**

- **Hook personalizado:**  
  - Archivo: `src/hooks/useDiagram.ts`
  - Función: `importFromJson(file: File)`

- **Barra de herramientas (Toolbar):**  
  - Archivo: `src/components/Toolbar/Toolbar.tsx`
  - Prop: `onImportJson`
  - Handler: `handleImportJson`

- **Uso en el canvas:**  
  - Archivo: `src/components/Diagram/DiagramCanvas.tsx`
  - Se pasa la función `importFromJson` como prop a `Toolbar`.

---

### Proceso general:

1. **El usuario hace clic en el botón "Importar JSON"** en la barra de herramientas.
2. Se abre el selector de archivos. Al elegir un archivo, el evento es manejado por la función `handleImportJson` en el componente `Toolbar`.
3. `handleImportJson` llama a la función `onImportJson`, que está conectada a `importFromJson` del hook `useDiagram`.
4. **`importFromJson(file)`** utiliza un `FileReader` para leer el contenido del archivo JSON.
5. Cuando la lectura termina, intenta **parsear el JSON** y verifica que tiene las propiedades esperadas (`nodes` y `edges`).
6. Si el formato es correcto, **actualiza el estado global del diagrama** (`setNodes`, `setEdges`) con los datos importados.
7. Si el archivo no es válido o hay un error, muestra una alerta al usuario.

---

**Funcion de exportación de JSON:**
Se llama **`exportToJson`** y se encuentra en: 

```plaintext
src/utils/export.ts
```


Funcionamiento general

La función `exportToJson` recibe dos parámetros:
- Una instancia de React Flow (`reactFlowInstance`), que contiene el estado actual del diagrama.
- Un nombre de archivo (opcional, por defecto: `'diagrama.json'`).

- **Convierte el diagrama:** Utiliza el método `.toObject()` de la instancia para obtener los datos del diagrama (nodos, conexiones, posiciones, etc.).
- **Serializa a JSON:** Usa `JSON.stringify` para convertir los datos a texto JSON legible.
- **Prepara la descarga:** Crea un elemento `<a>` (enlace) temporal, configura su atributo `href` con el contenido JSON codificado y `download` con el nombre de archivo.
- **Dispara la descarga:** Añade el enlace al DOM, simula un clic y luego lo elimina, logrando que el navegador descargue el archivo JSON.

En la Interfaz:  en el componente de la barra de herramientas (`src/components/Toolbar/Toolbar.tsx`), hay un botón llamado "Exportar JSON".  
Cuando el usuario hace clic en ese botón, se llama a un handler como `handleExportJson`, que a su vez invoca la función `exportToJson` pasando la instancia actual del diagrama.

---

### **Mostrar Iconos en los Nodos**

Se implementó la funcionalidad para que los nodos puedan mostrar un icono junto con el texto. Los iconos se especifican en el archivo JSON de entrada mediante la propiedad `iconUrl`.

#### **Cambios Realizados**
- **Archivo Modificado**: CustomNode.tsx
- **Detalles**:
  - Se agregó un contenedor `<Box>` para renderizar el icono dentro del nodo.
  - El tamaño del icono se configuró  100 x 100
  - El icono se renderiza solo si la propiedad `iconUrl` está presente en los datos del nodo.

#### **Código Relevante**
```tsx
{data.iconUrl && (
  <Box
    component="img"
    src={data.iconUrl}
    alt={data.label}
    sx={{
      width: 80, // Tamaño del icono
      height: 80,
      objectFit: 'contain',
      borderRadius: '50%',
      border: '1px solid #ccc',
    }}
  />
)}
```

---

### ** Importación de Diagramas JSON con Iconos**

Se actualizó la función de importación para que los nodos puedan incluir la propiedad `iconUrl` y renderizar los iconos especificados en el archivo JSON.

#### **Cambios Realizados**
- **Archivo Modificado**: `useDiagram.ts`
- **Detalles**:
  - La función `importFromJson` fue revisada para asegurarse de que los nodos con la propiedad `iconUrl` se carguen correctamente.

#### **Código Relevante**
```tsx
const importFromJson = (file: File) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const json = JSON.parse(event.target?.result as string);
      if (json.nodes && json.edges) {
        setNodes(json.nodes as Node[]);
        setEdges(json.edges as Edge[]);
      } else {
        alert('El archivo no contiene un formato válido de nodos y edges.');
      }
    } catch (error) {
      console.error('Error al importar el archivo JSON:', error);
      alert('Error al leer el archivo JSON.');
    }
  };
  reader.readAsText(file);
};
```



### **Estructura del Archivo JSON**

El archivo JSON de entrada debe incluir la propiedad `iconUrl` en los nodos para que se rendericen los iconos. Un ejemplo de estructura válida:

```json
{
  "nodes": [
    {
      "id": "node-1",
      "data": {
        "label": "Nodo 1",
        "themeColor": "blue",
        "iconUrl": "/icons/icon1.png"
      },
      "position": {
        "x": 100,
        "y": 200
      },
      "type": "custom"
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2",
      "type": "custom-label"
    }
  ]
}
```

---

## Getting Started with [mise](https://mise.jdx.dev/) (Recommended)

The easiest way to set up and run this project is with [mise](https://mise.jdx.dev/getting-started.html#installing-mise-cli)

First, trust the project environment:

```bash
mise trust
```

You can explore the available tasks with:

```bash
mise tasks
```

### Main Tasks

- **Setup the environment:**

    Installs all dependencies (including optional groups defined in the project):

    ```bash
    mise setup
    ```
    
- **Start the development server:**
    
    Runs the project locally using the default dev launcher:
    
    ```bash
    mise dev
    ```
    
- **Run tests:**
    
    Launches the test suite:

    ```bash
    mise test
    ```

- **Docker build & run:**

    Builds the project Docker image and starts a container:

    ```bash
    mise docker
    ```

That’s it — with mise everything is automated and reproducible.

---

## **Manual Alternative (without mise)**

If you prefer to run the project without *mise*, you can use the standard [Create React App](https://github.com/facebook/create-react-app) workflow.

### Installation

Make sure you have **Node.js** and **npm** installed.  
Then, install the dependencies:

```bash
npm ci
````

> [!TIP]
> We recommend `npm ci` instead of `npm install` to ensure a clean, reproducible installation using the lockfile.

### **Available Scripts**

In the project directory, you can run:

- **Start the development server:**
	```
	npm start
	```
	- Runs the app in development mode.
	    Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload on changes, and lint errors will show in the console.
    
- **Run tests:**
	```
	npm test
	```
	- Launches the test runner in interactive watch mode.
	    See the [testing guide](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
    
- **Build for production:**
	```
	npm run build
	```
	- Builds the app for production into the build folder.
	    The output is minified, optimized, and ready to deploy. More details: [deployment guide](https://facebook.github.io/create-react-app/docs/deployment).
    
- **Eject configuration (advanced):**
	```
	npm run eject
	```
	- **Warning:** This is a one-way operation. Once you eject, you can’t go back.
	    It copies all configuration files (Webpack, Babel, ESLint, etc.) into your project so you have full control.

### **Learn More**
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)

---

## **Running with Docker (standalone)**

1. Go to the project directory.
2. Build the Docker image:
    ```bash
    docker build -t "editor-comb:latest" .
    ```

3. Run the container:

    ```bash
    docker run --name editor-comb -p 80:80 -d --rm editor-comb:latest
    ```

4. Open your browser at: [http://127.0.0.1:80](http://127.0.0.1:80)
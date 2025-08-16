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



Dejo aqui el readme default por si les sirve:

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

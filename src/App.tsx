import React from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme/darkTheme';
import { DiagramCanvas } from './components/Diagram/DiagramCanvas';
import { BeeHiveView } from './components/Views/BeeHiveView';
import { HoneycombView } from './components/Views/HoneycombView';
import { NodeView } from './components/Views/NodeView';

function EditorWrapper() {
  const [searchParams] = useSearchParams();
  const apiUrl = searchParams.get('api');

  React.useEffect(() => {
    if (apiUrl) {
      // Guardar la URL de la API en localStorage o pasarla como prop
      sessionStorage.setItem('REACT_APP_START_URL', apiUrl);
    }
  }, [apiUrl]);

  return <DiagramCanvas />;
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<BeeHiveView />} />
          <Route path="/editor" element={<EditorWrapper />} />
          <Route path="/honeycomb/:name" element={<HoneycombView />} />
          <Route path="/node/:nodeId" element={<NodeView />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

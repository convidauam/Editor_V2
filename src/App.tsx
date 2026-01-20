import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme/darkTheme';
import { DiagramCanvas } from './components/Diagram/DiagramCanvas';
import { BeeHiveView } from './components/Views/BeeHiveView';
import { HoneycombView } from './components/Views/HoneycombView';
import { NodeView } from './components/Views/NodeView';
import { LandingPage } from './components/Views/LandingPage';


function EditorWrapper() {
  const [searchParams] = useSearchParams();
  const apiUrl = searchParams.get('api');

  React.useEffect(() => {
    if (apiUrl) {
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/beehive" element={<BeeHiveView />} />
          <Route path="/editor" element={<EditorWrapper />} />
          <Route path="/honeycomb/:name" element={<HoneycombView />} />
          <Route path="/node/:nodeId" element={<NodeView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

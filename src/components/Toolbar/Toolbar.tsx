import React from 'react';
import { Stack, Button } from '@mui/material';
import { Download, Image, Code, UploadFile } from '@mui/icons-material';
import { ReactFlowInstance } from 'reactflow';
import { exportToJson, exportToPng, exportToSvg } from '../../utils/export';

interface ToolbarProps {
  reactFlowInstance: ReactFlowInstance | null;
  diagramRef: React.RefObject<HTMLDivElement>;
  onImportJson: (file: File) => void; // Nueva prop para importar JSON
}

export const Toolbar: React.FC<ToolbarProps> = ({ reactFlowInstance, diagramRef, onImportJson }) => {
  const handleExportJson = () => {
    exportToJson(reactFlowInstance);
  };

  const handleExportPng = () => {
    exportToPng(diagramRef.current);
  };

  const handleExportSvg = () => {
    exportToSvg(diagramRef.current);
  };

  const handleImportJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImportJson(file);
    }
  };

  return (
    <Stack 
      direction="row" 
      spacing={2} 
      sx={{ 
        position: 'absolute', 
        zIndex: 10, 
        top: 16, 
        left: 16,
        backgroundColor: 'background.paper',
        padding: 1,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<Code />}
        onClick={handleExportJson}
        size="small"
      >
        Exportar JSON
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        startIcon={<Image />}
        onClick={handleExportPng}
        size="small"
      >
        Exportar PNG
      </Button>
      <Button 
        variant="outlined" 
        color="primary" 
        startIcon={<Download />}
        onClick={handleExportSvg}
        size="small"
      >
        Exportar SVG
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<UploadFile />}
        component="label"
        size="small"
      >
        Importar JSON
        <input
          type="file"
          accept=".json"
          hidden
          onChange={handleImportJson}
        />
      </Button>
    </Stack>
  );
};
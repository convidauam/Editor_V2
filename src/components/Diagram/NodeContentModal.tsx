import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { convertToEmbedUrl } from '../../utils/urlHelpers';

interface NodeContentModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const NodeContentModal: React.FC<NodeContentModalProps> = ({ open, onClose, url, title }) => {
  const [iframeError, setIframeError] = useState(false);

  // Convertir la URL a formato embebible si es posible
  const embedUrl = useMemo(() => convertToEmbedUrl(url), [url]);

  const handleIframeError = () => {
    setIframeError(true);
  };
  
  const handleOpenInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  React.useEffect(() => {
    if (open) {
      setIframeError(false);
    }
  }, [open]);

  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"     // Ancho máximo de la ventana
      fullWidth
      slotProps={{
        paper: {
          sx: {
            height: '95vh',   // Altura del 95% de la ventana
            backgroundColor: 'background.paper',
          }
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={handleOpenInNewTab} size="small" title="Abrir en nueva pestaña">
            <OpenInNewIcon />
          </IconButton>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        {iframeError ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Este contenido no puede mostrarse aquí
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Algunos sitios web no permiten ser mostrados dentro de esta ventana por razones de seguridad.
            </Typography>
            <Button
              variant="contained"
              startIcon={<OpenInNewIcon />}
              onClick={handleOpenInNewTab}
            >
              Abrir en nueva pestaña
            </Button>
          </Box>
        ) : (
          <Box
            component="iframe"
            src={embedUrl}
            onError={handleIframeError}
            sx={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NodeContentModal;
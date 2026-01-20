import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { menuItems } from './menuConfig';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <>
      {/* Logo en la esquina superior izquierda */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 15, md: 20 },
          left: { xs: 15, sm: 32, md: 128 },
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 0.5, md: 1 },
          zIndex: 2,
        }}
      >
        <Box
          component="img"
          src="/SVG_general/logo.svg"
          alt="CONVIDA Logo"
          sx={{
            width: { xs: 24, sm: 28, md: 32 },
            height: { xs: 24, sm: 28, md: 32 },
            objectFit: 'contain',
          }}
        />
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 300, // Fuente delgada/light
            letterSpacing: { xs: 3, sm: 5, md: 8 }, // Mucho espacio entre letras
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
            textTransform: 'uppercase',
          }}
        >
          CONVIDA
        </Typography>
      </Box>

      {/* Menú hamburguesa en la esquina superior derecha */}
      <IconButton
        onClick={menuOpen ? handleMenuClose : handleMenuClick}
        sx={{
          position: 'absolute',
          top: { xs: 10, md: 20 },
          right: { xs: 10, sm: 30, md: 50 },
          color: 'white',
          padding: 0,
          zIndex: 1301,
        }}
      >
        <Box
          component="img"
          src={menuOpen ? '/SVG_general/ico_close.svg' : '/SVG_general/Artboard17.svg'}
          alt={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          sx={{
            width: { xs: 40, sm: 50, md: 60 },
            height: { xs: 40, sm: 50, md: 60 },
            objectFit: 'contain',
          }}
        />
      </IconButton>

      {/* Menú desplegable */}
      <Menu
        open={menuOpen}
        onClose={handleMenuClose}
        anchorReference="none"
        disableScrollLock={true}
        slotProps={{
          paper: {
            sx: {
              position: 'fixed',
              top: { xs: '60px', md: '90px' },
              right: { xs: '10px', sm: '30px', md: '50px' },
              backgroundColor: '#5B1B5E',
              color: 'white',
              minWidth: 200,
              zIndex: 1300,
            },
          },
        }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <MenuItem key={item.id} onClick={() => handleNavigate(item.path)}>
              <ListItemIcon>
                <Icon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

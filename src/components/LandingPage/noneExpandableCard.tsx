import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ExpandableCardProps {
  card: {
    id: number;
    title: string;
    subtitle?: string;
    module: string;
    imageUrl?: string;
    imageGallery?: string[];
    buttonText: string;
    author?: string;
    levels?: string;
    description: string;
  };
  isExpanded: boolean;
  onToggleExpand: () => void;
  cardType: 'large' | 'medium' | 'small';
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({ 
  card, 
  isExpanded, 
  onToggleExpand,
  cardType 
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = card.imageGallery || [card.imageUrl].filter(Boolean) as string[];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: isExpanded ? 'row' : 'column',
        height: isExpanded ? { xs: 'auto', md: '800px' } : 
          cardType === 'large' ? { xs: 580, sm: 650, md: 740 } :
          cardType === 'medium' ? { xs: 250, sm: 280, md: 340 } :
          { xs: 300, sm: 330, md: 360, lg: 420 },
        borderRadius: { xs: '15px', md: '20px' },
        overflow: 'hidden',
        boxShadow: isExpanded ? '0 20px 60px rgba(0,0,0,0.3)' : '0 8px 24px rgba(0,0,0,0.15)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: cardType === 'large' && !isExpanded ? { xs: 'none', md: 'perspective(1000px) rotateY(-2deg)' } : 'scale(1)',
        transformOrigin: 'center center',
        zIndex: isExpanded ? 10 : 1,
        backgroundColor: '#ffffff',
      }}
    >
      {/* Botón cerrar cuando está expandido */}
      {isExpanded && (
        <IconButton
          onClick={onToggleExpand}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 100,
            backgroundColor: 'transparent',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      )}

      {/* Vista normal (colapsada) para large */}
      {!isExpanded && cardType === 'large' && (
        <>
          <CardMedia
            component="img"
            image={card.imageUrl}
            alt={card.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />
          
          <Box sx={{ 
            position: 'relative',
            zIndex: 1,
            p: { xs: 2, md: 3 }, 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: 2,
            backgroundColor: '#FFFFFF66',
            backdropFilter: 'blur(4px)',
          }}>
            <Box
              sx={{
                width: { xs: 40, md: 56 },
                height: { xs: 40, md: 56 },
                borderRadius: '50%',
                backgroundColor: '#9c27b0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Typography sx={{ fontFamily: 'Roboto', color: 'white', fontSize: { xs: '1.25rem', md: '1.75rem' }, fontWeight: 'bold' }}>
                R
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component="h3" sx={{ fontFamily: 'Roboto', fontWeight: 'bold', mb: 0.5, color: '#1D1B20', fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
                {card.title}
              </Typography>
              <Typography variant="caption" color="#1D1B20" sx={{ fontFamily: 'Roboto', display: 'block', fontSize: { xs: '0.8rem', md: '1rem' } }}>
                {card.module}
              </Typography>
            </Box>

            <Box sx={{ cursor: 'pointer', color: '#000000ff' }}>
              <Typography sx={{ fontSize: '1.5rem', lineHeight: 1 }}>⋮</Typography>
            </Box>
          </Box>

          <Box sx={{ position: 'relative', zIndex: 0, flex: 1, width: '100%' }} />

          {card.author && (
            <Box sx={{position: 'relative', zIndex: 1, px: { xs: 2, md: 3 }, pt: 1.5, pb: 0.8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)' }}>
              <Typography variant="caption" sx={{ fontFamily: 'Roboto', color: '#49454F', fontSize: { xs: '0.75rem', md: '0.9rem' } }}>
                {card.author}
              </Typography>
              <Typography variant="caption" sx={{ fontFamily: 'Roboto', color: '#000000ff', fontSize: { xs: '0.75rem', md: '0.9rem' }, fontWeight: 'bold' }}>
                {card.levels}
              </Typography>
            </Box>
          )}

          <CardContent
            sx={{
              position: 'relative',
              zIndex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              p: { xs: 2, sm: 2.5, md: 3 },
              pt: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ fontFamily: 'Roboto', color: '#49454F', fontSize: { xs: '0.85rem', md: '1rem' }, lineHeight: 1.6 }}>
              {card.description.substring(0, 100)}...
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="text"
                onClick={onToggleExpand}
                sx={{
                  color: '#7c4dff',
                  textTransform: 'none',
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  '&:hover': { backgroundColor: 'rgba(124, 77, 255, 0.08)' },
                }}
              >
                Ver más
              </Button>
              <Box
                component="img"
                src="/SVG_general/Artboard22.svg"
                alt="Iniciar"
                sx={{ height: { xs: 28, md: 40 }, cursor: 'pointer' }}
              />
            </Box>
          </CardContent>
        </>
      )}

      {/* Vista normal para tarjetas medianas y pequeñas */}
      {!isExpanded && (cardType === 'medium' || cardType === 'small') && (
        <>
          <CardMedia
            component="img"
            image={card.imageUrl}
            alt={card.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />
          
          <Box sx={{ flex: 1, position: 'relative', zIndex: 0 }} />
          
          <CardContent
            sx={{
              position: 'relative',
              zIndex: 1,
              backgroundColor: '#FFFFFFB2',
              backdropFilter: 'blur(4px)',
              p: { xs: 1.5, sm: 2, md: 2.5 },
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component="h3" sx={{ fontFamily: 'Roboto', fontWeight: 'bold', mb: 0.3, color: '#49454F', fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}>
                {card.title}
              </Typography>
              {card.subtitle && (
                <Typography variant="caption" color="#49454F" sx={{ fontFamily: 'Roboto', display: 'block', fontSize: { xs: '0.65rem', md: '0.75rem' }, mb: 0.2 }}>
                  {card.subtitle}
                </Typography>
              )}
              <Typography variant="caption" color="#49454F" sx={{ fontFamily: 'Roboto', display: 'block', fontWeight: 600, fontSize: { xs: '0.6rem', md: '0.7rem' } }}>
                {card.module}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1.5 }, alignItems: 'center', flexShrink: 0, ml: { xs: 1, md: 2 } }}>
              <Button
                variant="text"
                onClick={onToggleExpand}
                sx={{
                  color: '#7c4dff',
                  textTransform: 'none',
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  '&:hover': { backgroundColor: 'rgba(124, 77, 255, 0.08)' },
                }}
              >
                Ver más
              </Button>
              <Box
                component="img"
                src="/SVG_general/Artboard22.svg"
                alt="Iniciar"
                sx={{ height: { xs: 28, md: 40 }, cursor: 'pointer' }}
              />
            </Box>
          </CardContent>
        </>
      )}

      {/* Vista expandida - REDISEÑADA */}
      {isExpanded && (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
        }}>
          {/* Lado izquierdo: Imagen principal */}
          <Box sx={{ 
            flex: '0 0 35%',
            position: 'relative',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <img 
              src={images[selectedImageIndex]} 
              alt={`${card.title} - ${selectedImageIndex + 1}`}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>

          {/* Lado derecho: Información con scroll (65% del ancho) */}
          <Box sx={{ 
            flex: '0 0 65%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'relative',
          }}>
            {/* Controles superiores: Flechas de navegación + X para cerrar */}
            <Box sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 100,
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}>
              {/* Flechas de navegación */}
              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrevImage}
                    sx={{
                      width: 36,
                      height: 36,
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      color: '#000',
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
                    }}
                  >
                    <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>‹</Typography>
                  </IconButton>
                  <IconButton
                    onClick={handleNextImage}
                    sx={{
                      width: 36,
                      height: 36,
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      color: '#000',
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
                    }}
                  >
                    <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>›</Typography>
                  </IconButton>
                </>
              )}
              
              {/* Botón X para cerrar */}
              <IconButton
                onClick={onToggleExpand}
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  color: '#000',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' }
                }}
              >
                <CloseIcon sx={{ fontSize: '1.2rem' }} />
              </IconButton>
            </Box>

            {/* Header con título, módulo */}
            <Box sx={{ 
              p: 3,
              pt: 2,
              borderBottom: '1px solid #e0e0e0',
            }}>
              {/* Icono circular y título */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: '#7c4dff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {card.title.charAt(0)}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ 
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    color: '#1D1B20',
                    fontSize: '1.1rem',
                  }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    fontFamily: 'Roboto',
                    color: '#666',
                    fontSize: '0.9rem',
                  }}>
                    {card.module}
                  </Typography>
                </Box>
              </Box>

              {/* Carrusel de miniaturas */}
              <Box sx={{ 
                display: 'flex', 
                gap: 1,
                overflowX: 'auto',
                pb: 1,
                '&::-webkit-scrollbar': {
                  height: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#7c4dff',
                  borderRadius: '2px',
                }
              }}>
                {images.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    sx={{
                      minWidth: 70,
                      height: 70,
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: selectedImageIndex === index ? '3px solid #7c4dff' : '2px solid #ddd',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: '#7c4dff'
                      }
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Información del autor/niveles */}
            {card.author && (
              <Box sx={{ 
                px: 3,
                py: 1.5,
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#fafafa',
              }}>
                <Typography variant="body2" sx={{ fontFamily: 'Roboto', color: '#666', fontSize: '0.85rem' }}>
                  {card.author}
                </Typography>
                {card.levels && (
                  <Typography variant="body2" sx={{ fontFamily: 'Roboto', color: '#666', fontWeight: 'bold', fontSize: '0.85rem' }}>
                    {card.levels}
                  </Typography>
                )}
              </Box>
            )}

            {/* Área de descripción con scroll y 2 columnas */}
            <Box sx={{ 
              flex: 1,
              overflowY: 'auto',
              p: 3,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#7c4dff',
                borderRadius: '4px',
              }
            }}>
              <Typography variant="body1" sx={{ 
                fontFamily: 'Roboto',
                lineHeight: 1.8,
                color: '#49454F',
                columnCount: 2,
                columnGap: 4,
                fontSize: '0.9rem',
                textAlign: 'justify',
              }}>
                {card.description}
              </Typography>
            </Box>

            {/* Botón Iniciar al final abajo a la derecha */}
            <Box sx={{ 
              p: 3,
              display: 'flex',
              gap: 2,
              justifyContent: 'flex-end',
            }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#8B5CF6',
                  color: 'white',
                  textTransform: 'none',
                  fontFamily: 'Roboto',
                  borderRadius: '20px',
                  px: 4,
                  py: 1,
                  '&:hover': { backgroundColor: '#7C3AED' }
                }}
              >
                ✓ Iniciar
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Card>
  );
};

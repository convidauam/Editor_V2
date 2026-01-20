import React from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Button } from '@mui/material';
import { HeroCarousel } from './HeroCarousel'; // Asegúrate de que la ruta sea correcta
import { ContentSection } from './ContentSection'; // Asegúrate de que la ruta sea correcta
import { Footer } from './Footer'; // Asegúrate de que la ruta sea correcta

interface ContentCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  buttonText: string;
  buttonVariant?: 'text' | 'outlined' | 'contained';
}

const contentCards: ContentCard[] = [
  {
    id: 1,
    title: 'Ciclo reproductivo de las abejas',
    subtitle: '',
    description: 'Módulo 01',
    imageUrl: '/landing/Artboard_24.png', // Ruta de tu imagen
    buttonText: 'Iniciar',
    buttonVariant: 'contained',
  },
  {
    id: 2,
    title: 'Organización social',
    subtitle: 'Módulo 2',
    description: '',
    imageUrl: '/landing/Artboard_24.png', // Ruta de tu imagen
    buttonText: 'Iniciar',
    buttonVariant: 'contained',
  },
  {
    id: 3,
    title: 'Biología de abejas',
    subtitle: 'Taxonomía, Historia evolutiva y fósil.',
    description: 'Módulo 3',
    imageUrl: '/landing/Artboard_24.png', // Ruta de tu imagen
    buttonText: 'Iniciar',
    buttonVariant: 'contained',
  },
  {
    id: 4,
    title: 'Relación con humanos',
    subtitle: 'Cadena reproductiva de la cera, miel, etc.',
    description: 'Módulo 4',
    imageUrl: '/landing/Artboard_24.png', // Ruta de tu imagen
    buttonText: 'Iniciar',
    buttonVariant: 'contained',
  },
];

export const LandingPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        width: '100%',
        overflow: 'hidden', // Prevenir scroll horizontal
        overflowX: 'hidden', // Asegurar no scroll horizontal
      }}
    >
      <HeroCarousel />
      <ContentSection />
      <Footer />
    </Box>
  );
};
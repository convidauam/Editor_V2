import React from 'react';
import { Box } from '@mui/material';
import { HeroCarousel } from '../LandingPage/HeroCarousel';
import { ContentSection } from '../LandingPage/ContentSection';
import { Footer } from '../LandingPage/Footer';

export const LandingPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <HeroCarousel />
      <ContentSection />
      <Footer />
    </Box>
  );
};

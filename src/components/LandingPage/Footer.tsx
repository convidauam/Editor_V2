import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: '#5B1B5E',
        color: 'white',
        width: '100%',
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Logo + Redes + Botón */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' }, 
          mb: { xs: 2, md: 3 }, 
          gap: { xs: 2, sm: 0 } 
        }}>
          {/* Logo y redes */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: { xs: 'flex-start', sm: 'center' }, 
            gap: { xs: 1.5, sm: 2 },
            width: { xs: '100%', sm: 'auto' }
          }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box
                component="img"
                src="/SVG/logo.svg"
                alt="CONVIDA Logo"
                sx={{
                  width: { xs: 20, sm: 24, md: 28 },
                  height: { xs: 20, sm: 24, md: 28 },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 300,
                  letterSpacing: { xs: 2, sm: 3, md: 4 },
                  textTransform: 'uppercase',
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                }}
              >
                CONVIDA
              </Typography>
            </Box>

            {/* Redes sociales */}
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 1.5 }, 
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' } }}>
                Síguenos en:
              </Typography>
              
              {/* Facebook */}
              <Link href="#" target="_blank" sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src="/SVG_socialN/face.svg"
                  alt="Facebook"
                  sx={{
                    width: { xs: 18, sm: 20 },
                    height: { xs: 18, sm: 20 },
                    '&:hover': { opacity: 0.8 },
                  }}
                />
              </Link>

              {/* Twitter/X */}
              <Link href="#" target="_blank" sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src="/SVG_socialN/x.svg"
                  alt="X"
                  sx={{
                    width: { xs: 28, sm: 32, md: 35 },
                    height: { xs: 28, sm: 32, md: 35 },
                    margin: -1,
                    '&:hover': { opacity: 0.8 },
                  }}
                />
              </Link>

              {/* Instagram */}
              <Link href="#" target="_blank" sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src="/SVG_socialN/instagram.svg"
                  alt="Instagram"
                  sx={{
                    width: { xs: 18, sm: 20 },
                    height: { xs: 18, sm: 20 },
                    filter: 'brightness(0) saturate(100%) invert(34%) sepia(89%) saturate(2590%) hue-rotate(316deg) brightness(99%) contrast(101%)',
                    '&:hover': { opacity: 0.8 },
                  }}
                />
              </Link>

              {/* TikTok */}
              <Link href="#" target="_blank" sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src="/SVG_socialN/tiktok.svg"
                  alt="TikTok"
                  sx={{
                    width: { xs: 18, sm: 20 },
                    height: { xs: 18, sm: 20 },
                    filter: 'brightness(0) saturate(100%) invert(92%) sepia(0%) saturate(7461%) hue-rotate(73deg) brightness(106%) contrast(107%)',
                    '&:hover': { opacity: 0.8 },
                  }}
                />
              </Link>

              {/* YouTube */}
              <Link href="#" target="_blank" sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg"
                  alt="YouTube"
                  sx={{
                    width: { xs: 18, sm: 20 },
                    height: { xs: 18, sm: 20 },
                    filter: 'brightness(0) saturate(100%) invert(23%) sepia(94%) saturate(7466%) hue-rotate(0deg) brightness(99%) contrast(117%)',
                    '&:hover': { opacity: 0.8 },
                  }}
                />
              </Link>
            </Box>
          </Box>

          {/* Botón inicio */}
          <Box
            component="img"
            src="/SVG_general/Artboard21.svg"
            alt="Inicio"
            onClick={handleScrollToTop}
            sx={{
              height: { xs: 24, sm: 32, md: 40, lg: 50 },
              cursor: 'pointer',
              transition: 'transform 0.2s',
              alignSelf: { xs: 'flex-end', sm: 'center' },
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        </Box>

        {/* Grid de columnas SOLO para desktop md+ (900px+) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'grid' }, // Solo visible desde md (900px)
            gridTemplateColumns: { 
              md: 'repeat(5, 1fr)',
              lg: 'repeat(10, 1fr)'
            },
            gap: { md: 1.5, lg: 1.5, xl: 2 },
            mb: 3,
          }}
        >
          {/* SITIOS */}
          <Box sx={{ position: 'relative', pr: { md: 1.5, lg: 1 } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: { md: '0.75rem', lg: '0.75rem' }, letterSpacing: 0.3 }}>
              SITIOS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              {['Abejas', 'Abejas', 'Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: { md: '0.7rem', lg: '0.7rem' }, '&:hover': { color: 'white' }, lineHeight: 1.4 }}>
                  {link}
                </Link>
              ))}
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          </Box>

          {/* COVIDAS */}
          <Box sx={{ position: 'relative', pr: { md: 1.5, lg: 1 } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: { md: '0.75rem', lg: '0.75rem' }, letterSpacing: 0.3 }}>
              COVIDAS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              {['Abejas', 'Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: { md: '0.7rem', lg: '0.7rem' }, '&:hover': { color: 'white' }, lineHeight: 1.4 }}>
                  {link}
                </Link>
              ))}
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          </Box>

          {/* MODALIDAD */}
          <Box sx={{ position: 'relative', pr: { md: 1.5, lg: 1 } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: { md: '0.75rem', lg: '0.75rem' }, letterSpacing: 0.3 }}>
              MODALIDAD
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              {['Miembros', 'Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: { md: '0.7rem', lg: '0.7rem' }, '&:hover': { color: 'white' }, lineHeight: 1.4 }}>
                  {link}
                </Link>
              ))}
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)', display: { md: 'block', lg: 'none' } }} />
          </Box>

          {/* WIKIS */}
          <Box sx={{ position: 'relative', pr: { md: 1.5, lg: 1 } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: { md: '0.75rem', lg: '0.75rem' }, letterSpacing: 0.3 }}>
              WIKIS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: { md: '0.7rem', lg: '0.7rem' }, '&:hover': { color: 'white' }, lineHeight: 1.4 }}>
                Abejas
              </Link>
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          </Box>

          {/* Abejas */}
          <Box sx={{ position: 'relative', pr: { md: 1.5, lg: 1 } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: { md: '0.75rem', lg: '0.75rem' }, letterSpacing: 0.3 }}>
              Abejas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              {['Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: { md: '0.7rem', lg: '0.7rem' }, '&:hover': { color: 'white' }, lineHeight: 1.4 }}>
                  {link}
                </Link>
              ))}
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)', display: { md: 'none', lg: 'block' } }} />
          </Box>

          {/* Columnas solo lg (1280px+) */}
          <Box sx={{ position: 'relative', pr: 1, display: { xs: 'none', md: 'none', lg: 'block' } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: '0.75rem', letterSpacing: 0.3 }}>
              CONOCE MÁS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.7rem', '&:hover': { color: 'white' }, lineHeight: 1.4 }}>
                ¿Dónde se consulta?
              </Link>
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          </Box>

          <Box sx={{ position: 'relative', pr: 1, display: { xs: 'none', md: 'none', lg: 'block' } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: '0.75rem', letterSpacing: 0.3 }}>
              ¿Qué es ConVida?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              {['Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.7rem', '&:hover': { color: 'white' }, lineHeight: 1.4 }}>
                  {link}
                </Link>
              ))}
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          </Box>

          <Box sx={{ position: 'relative', pr: 1, display: { xs: 'none', md: 'none', lg: 'block' } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: '0.75rem', letterSpacing: 0.3 }}>
              CONTENIDOS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              {['Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.7rem', '&:hover': { color: 'white' }, lineHeight: 1.4 }}>
                  {link}
                </Link>
              ))}
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          </Box>

          <Box sx={{ position: 'relative', pr: 1, display: { xs: 'none', md: 'none', lg: 'block' } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: '0.75rem', letterSpacing: 0.3 }}>
              SERVICIOS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              {['Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.7rem', '&:hover': { color: 'white' }, lineHeight: 1.4 }}>
                  {link}
                </Link>
              ))}
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: '0.75rem', letterSpacing: 0.3 }}>
              APPS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.7rem', '&:hover': { color: 'white' }, lineHeight: 1.4 }}>ConVida</Link>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.7rem', '&:hover': { color: 'white' }, lineHeight: 1.4 }}>ConVida</Link>
            </Box>
          </Box>
        </Box>

        {/* Layout en FILAS para móviles y tablets (xs y sm) */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 3, mb: 2 }}>
          {/* SITIOS */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.85rem', letterSpacing: 0.5, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', pb: 0.5 }}>
              SITIOS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
              {['Abejas', 'Abejas', 'Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: 'white' }, lineHeight: 1.6 }}>
                  {link}
                </Link>
              ))}
            </Box>
          </Box>

          {/* COVIDAS */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.85rem', letterSpacing: 0.5, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', pb: 0.5 }}>
              COVIDAS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
              {['Abejas', 'Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: 'white' }, lineHeight: 1.6 }}>
                  {link}
                </Link>
              ))}
            </Box>
          </Box>

          {/* MODALIDAD */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.85rem', letterSpacing: 0.5, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', pb: 0.5 }}>
              MODALIDAD
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
              {['Miembros', 'Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: 'white' }, lineHeight: 1.6 }}>
                  {link}
                </Link>
              ))}
            </Box>
          </Box>

          {/* WIKIS */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.85rem', letterSpacing: 0.5, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', pb: 0.5 }}>
              WIKIS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: 'white' }, lineHeight: 1.6 }}>
                Abejas
              </Link>
            </Box>
          </Box>

          {/* Abejas */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.85rem', letterSpacing: 0.5, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', pb: 0.5 }}>
              Abejas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
              {['Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: 'white' }, lineHeight: 1.6 }}>
                  {link}
                </Link>
              ))}
            </Box>
          </Box>

          {/* CONOCE MÁS */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.85rem', letterSpacing: 0.5, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', pb: 0.5 }}>
              CONOCE MÁS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: 'white' }, lineHeight: 1.6 }}>
                ¿Dónde se consulta?
              </Link>
            </Box>
          </Box>

          {/* ¿Qué es ConVida? */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.85rem', letterSpacing: 0.5, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', pb: 0.5 }}>
              ¿Qué es ConVida?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
              {['Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: 'white' }, lineHeight: 1.6 }}>
                  {link}
                </Link>
              ))}
            </Box>
          </Box>

          {/* CONTENIDOS */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.85rem', letterSpacing: 0.5, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', pb: 0.5 }}>
              CONTENIDOS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
              {['Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: 'white' }, lineHeight: 1.6 }}>
                  {link}
                </Link>
              ))}
            </Box>
          </Box>

          {/* SERVICIOS */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.85rem', letterSpacing: 0.5, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', pb: 0.5 }}>
              SERVICIOS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
              {['Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: 'white' }, lineHeight: 1.6 }}>
                  {link}
                </Link>
              ))}
            </Box>
          </Box>

          {/* APPS */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.85rem', letterSpacing: 0.5, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', pb: 0.5 }}>
              APPS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: 'white' }, lineHeight: 1.6 }}>ConVida</Link>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: 'white' }, lineHeight: 1.6 }}>ConVida</Link>
            </Box>
          </Box>
        </Box>

        {/* Segunda fila de columnas para md (900px-1279px) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'grid', lg: 'none' }, // Solo visible en md (900-1279px)
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 1.5,
            mb: 3,
            mt: 2,
          }}
        >
          {/* CONOCE MÁS */}
          <Box sx={{ position: 'relative', pr: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: '0.75rem', letterSpacing: 0.3 }}>
              CONOCE MÁS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.7rem', '&:hover': { color: 'white' }, lineHeight: 1.4 }}>
                ¿Dónde se consulta?
              </Link>
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          </Box>

          {/* ¿Qué es ConVida? */}
          <Box sx={{ position: 'relative', pr: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: '0.75rem', letterSpacing: 0.3 }}>
              ¿Qué es ConVida?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              {['Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.7rem', '&:hover': { color: 'white' }, lineHeight: 1.4 }}>
                  {link}
                </Link>
              ))}
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          </Box>

          {/* CONTENIDOS */}
          <Box sx={{ position: 'relative', pr: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: '0.75rem', letterSpacing: 0.3 }}>
              CONTENIDOS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              {['Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.7rem', '&:hover': { color: 'white' }, lineHeight: 1.4 }}>
                  {link}
                </Link>
              ))}
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          </Box>

          {/* SERVICIOS */}
          <Box sx={{ position: 'relative', pr: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: '0.75rem', letterSpacing: 0.3 }}>
              SERVICIOS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              {['Abejas', 'Abejas'].map((link, idx) => (
                <Link key={idx} href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.7rem', '&:hover': { color: 'white' }, lineHeight: 1.4 }}>
                  {link}
                </Link>
              ))}
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          </Box>

          {/* APPS */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.8, fontSize: '0.75rem', letterSpacing: 0.3 }}>
              APPS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.7rem', '&:hover': { color: 'white' }, lineHeight: 1.4 }}>ConVida</Link>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.7rem', '&:hover': { color: 'white' }, lineHeight: 1.4 }}>ConVida</Link>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Links legales */}
      <Box
        sx={{
          backgroundColor: '#3D0E40',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          py: { xs: 1.5, sm: 2 },
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 1.5, sm: 0 },
            }}
          >
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
              Abejas 2025
            </Typography>
            
            <Box sx={{ display: 'flex', gap: { xs: 1, sm: 1.5 }, flexWrap: 'wrap', alignItems: 'center' }}>
              {['Aviso legal', 'Aviso de Privacidad', 'Quienes somos', 'Ayuda usuarios', 'Directorio'].map((link, index) => (
                <React.Fragment key={link}>
                  <Link
                    href="#"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                      '&:hover': {
                        color: 'white',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {link}
                  </Link>
                  {index < 4 && (
                    <Box sx={{ width: '1px', height: { xs: 10, sm: 12 }, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

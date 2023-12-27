import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Footer() {
  return (
    <Box 
      component="footer"
      sx={{ 
        bgcolor: 'text.secondary', 
        color: 'white', 
        py: 3, 
        mt: 'auto', 
        width: '100%'
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" mb={2}>
          <IconButton href="https://www.facebook.com" target="_blank" sx={{ color: 'white' }}>
            <FacebookIcon />
          </IconButton>
          <IconButton href="https://www.instagram.com" target="_blank" sx={{ color: 'white' }}>
            <InstagramIcon />
          </IconButton>
          <IconButton href="tel:+1234567890" sx={{ color: 'white' }}>
            <PhoneIcon />
          </IconButton>
          <IconButton href="https://www.google.com/maps" target="_blank" sx={{ color: 'white' }}>
            <LocationOnIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" align="center" mb={1}>
          Address: 123 Marketplace St, City, Country
        </Typography>
        <Typography variant="body1" align="center">
          Phone: +123 456 7890
        </Typography>
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} My Marketplace. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
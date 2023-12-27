import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography, CircularProgress} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { formatJWTTokenToUser } from '../utils/utils';
import api from '../services/api.service';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      setLoading(true);
      const response = await api.post("auth/login", formData);
      localStorage.setItem('token', response.data.token); // Store the JWT token
      const { token } = response.data;
      const user = formatJWTTokenToUser(token);

      if (user) {
        login({ ...user, token });
      } else {
        setError('Invalid token received');
      }
      navigate('/'); 
    } catch (error) {
      console.log("Error during login:", error);
      if (error.response && error.response.status === 401) {
        setError('Authentication failed. Please check your username and password.');
      } else {
        setError('An error occurred during login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
        marginTop: 3,
        marginBottom: '2rem',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          marginBottom: '2rem',
          marginTop: '2rem',
          width: '100%',
        }}
      >
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          endIcon={loading ? <CircularProgress size={20} /> :'Login'}
          disabled={loading}
          fullWidth
          sx={{ height: '56px' }}
        >
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
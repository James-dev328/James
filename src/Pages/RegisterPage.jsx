import { useState } from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import api from "../services/api.service";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [open, setOpen] = useState(false); //to snackbar
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      setLoading(true);
      const newUser = {
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };
      await api.post(`auth/register`, newUser);
      handleClick();
      navigate('/login')
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("User already exists. Please choose a different username.");
      } else {
        setError("An error occurred during registration. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
        marginTop: 3,
        marginBottom: '2rem'
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
          Register
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
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
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
          endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
          disabled={loading}
          fullWidth
          sx={{ height: '56px' }}
        >
        </Button>
        {error==="" && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="User has been created successfuly"
          action={action}
        />)}
      </Box>
    </Box>
  );
};
export default RegisterPage;
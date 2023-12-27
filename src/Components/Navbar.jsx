import { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { loggedInUser, logout } = useContext(AuthContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#013A69' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            My Marketplace
          </Link>
        </Typography>
        <IconButton color="inherit" component={Link} to="/products/cart">
          <ShoppingCartIcon />
        </IconButton>
        <div>
          {loggedInUser ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu}
            >
              <Avatar alt="User Avatar" />
            </IconButton>
          ) : (
            <>
              <Link to="/login" style={{ color: 'inherit', textDecoration: 'none', marginRight: '10px' }}>Login</Link>
              <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>Register</Link>
            </>
          )}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Homepage</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Products</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/products/myProducts" style={{ color: 'inherit', textDecoration: 'none' }}>My Products</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to={`/users/${loggedInUser?.userId}`} style={{ color: 'inherit', textDecoration: 'none' }}>User details</Link>
            </MenuItem>
            {loggedInUser && (
              <MenuItem onClick={() => { handleClose(); logout(); }}>
                Logout
              </MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
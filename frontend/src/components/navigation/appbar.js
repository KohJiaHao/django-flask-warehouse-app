import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuDrawer from './drawer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/logout');
      console.log('Logout successful:', response.data);
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  };

  return (
      <AppBar position="static">
        <Toolbar>
					<MenuDrawer></MenuDrawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Artiselite
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
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
                <MenuItem disabled onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
  );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export default function MenuDrawer() {
	
  const [isOpen, setIsOpen] = React.useState(null);

  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate('/products');
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
    	<h1>Drawer</h1>
      <Divider />
      <List>
        {['Products', 'Inventory', 'Inbound', 'Outbound'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={navigateToProducts}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
				<IconButton onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
					<MenuIcon />
				</IconButton>
				<Drawer
					anchor='left'
					open={isOpen}
					onClose={toggleDrawer}
				>
					{list('left')}
				</Drawer>
    </div>
  );
}




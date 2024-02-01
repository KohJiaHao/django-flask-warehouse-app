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

  const navigateToUrl = (url) => {
    navigate(url);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const navigationOptions = [
    {label: 'Products', url: '/products'},
    {label: 'Inventory', url: '/inventory'},
    {label: 'Inbound', url: '/inbound'},
    {label: 'Outbound', url: '/outbound'}
  ]

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
        {navigationOptions.map((item, index) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={() => navigateToUrl(item.url)}>
              <ListItemText primary={item.label} />
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




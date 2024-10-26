import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChatPanel from './ChatPanel';
import DesktopView from './DesktopView';
import ControlPanel from './ControlPanel';

const Homepage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ACUDWA
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <ChatPanel />
        <Divider orientation="vertical" flexItem />
        <DesktopView />
        <Divider orientation="vertical" flexItem />
        <ControlPanel />
      </Box>
    </Box>
  );
};

export default Homepage;

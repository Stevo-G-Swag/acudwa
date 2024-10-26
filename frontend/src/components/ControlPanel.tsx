import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';

const ControlPanel: React.FC = () => {
  return (
    <Box sx={{ width: '25%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Control Panel
      </Typography>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary="Action 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Action 2" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Action 3" />
        </ListItem>
      </List>
    </Box>
  );
};

export default ControlPanel;

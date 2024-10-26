import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const ChatPanel: React.FC = () => {
  return (
    <Box sx={{ width: '25%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Chat Panel
      </Typography>
      <Divider />
      {/* Add chat messages and input field here */}
    </Box>
  );
};

export default ChatPanel;

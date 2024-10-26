import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { RFB } from 'novnc';

const DesktopView: React.FC = () => {
  const vncContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (vncContainerRef.current) {
      const rfb = new RFB(vncContainerRef.current, 'ws://localhost:5900');
      rfb.viewOnly = true;
      rfb.scaleViewport = true;
    }
  }, []);

  return <Box ref={vncContainerRef} sx={{ flexGrow: 1 }} />;
};

export default DesktopView;

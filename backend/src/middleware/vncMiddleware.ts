import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';

const vncMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { action } = req.body;

  if (action === 'start') {
    exec('x11vnc -forever -shared -rfbport 5900', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting VNC server: ${error.message}`);
        return res.status(500).json({ error: 'Failed to start VNC server' });
      }
      console.log(`VNC server started: ${stdout}`);
      return res.status(200).json({ message: 'VNC server started' });
    });
  } else if (action === 'stop') {
    exec('pkill x11vnc', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error stopping VNC server: ${error.message}`);
        return res.status(500).json({ error: 'Failed to stop VNC server' });
      }
      console.log(`VNC server stopped: ${stdout}`);
      return res.status(200).json({ message: 'VNC server stopped' });
    });
  } else {
    return res.status(400).json({ error: 'Invalid action' });
  }
};

export default vncMiddleware;

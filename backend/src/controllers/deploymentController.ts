import { Request, Response } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const configureContainer = async (req: Request, res: Response) => {
  try {
    const { stdout, stderr } = await execAsync('docker-compose -f docker-compose.prod.yml up -d');
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ message: 'Container configuration failed', error: stderr });
    }
    res.json({ message: 'Container configured successfully', output: stdout });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: 'Container configuration failed', error });
  }
};

export const runCICDPipeline = async (req: Request, res: Response) => {
  try {
    const { stdout, stderr } = await execAsync('sh ./scripts/run-ci-cd.sh');
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ message: 'CI/CD pipeline execution failed', error: stderr });
    }
    res.json({ message: 'CI/CD pipeline executed successfully', output: stdout });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: 'CI/CD pipeline execution failed', error });
  }
};

export const monitorSystem = async (req: Request, res: Response) => {
  try {
    const { stdout, stderr } = await execAsync('sh ./scripts/monitor-system.sh');
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ message: 'System monitoring failed', error: stderr });
    }
    res.json({ message: 'System monitoring executed successfully', output: stdout });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: 'System monitoring failed', error });
  }
};

export const deployToProduction = async (req: Request, res: Response) => {
  try {
    const { stdout, stderr } = await execAsync('sh ./scripts/deploy-to-production.sh');
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ message: 'Production deployment failed', error: stderr });
    }
    res.json({ message: 'Production deployment executed successfully', output: stdout });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: 'Production deployment failed', error });
  }
};

export const rollbackDeployment = async (req: Request, res: Response) => {
  try {
    const { stdout, stderr } = await execAsync('sh ./scripts/rollback-deployment.sh');
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ message: 'Deployment rollback failed', error: stderr });
    }
    res.json({ message: 'Deployment rollback executed successfully', output: stdout });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: 'Deployment rollback failed', error });
  }
};

export const updateEnvironmentVariables = async (req: Request, res: Response) => {
  try {
    const { stdout, stderr } = await execAsync('sh ./scripts/update-env-vars.sh');
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ message: 'Environment variables update failed', error: stderr });
    }
    res.json({ message: 'Environment variables updated successfully', output: stdout });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: 'Environment variables update failed', error });
  }
};

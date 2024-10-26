import { Request, Response } from 'express';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export const sendNotification = (req: Request, res: Response) => {
  const { subscription, payload } = req.body;

  webpush.sendNotification(subscription, payload)
    .then(() => res.status(200).json({ message: 'Notification sent successfully' }))
    .catch((error) => res.status(500).json({ message: 'Failed to send notification', error }));
};

export const statusUpdate = (req: Request, res: Response) => {
  const { subscription, status } = req.body;

  const payload = JSON.stringify({
    title: 'Status Update',
    body: status,
  });

  webpush.sendNotification(subscription, payload)
    .then(() => res.status(200).json({ message: 'Status update sent successfully' }))
    .catch((error) => res.status(500).json({ message: 'Failed to send status update', error }));
};

export const criticalErrorAlert = (req: Request, res: Response) => {
  const { subscription, error } = req.body;

  const payload = JSON.stringify({
    title: 'Critical Error Alert',
    body: error,
  });

  webpush.sendNotification(subscription, payload)
    .then(() => res.status(200).json({ message: 'Critical error alert sent successfully' }))
    .catch((error) => res.status(500).json({ message: 'Failed to send critical error alert', error }));
};

export const systemMaintenanceNotification = (req: Request, res: Response) => {
  const { subscription, maintenance } = req.body;

  const payload = JSON.stringify({
    title: 'System Maintenance Notification',
    body: maintenance,
  });

  webpush.sendNotification(subscription, payload)
    .then(() => res.status(200).json({ message: 'System maintenance notification sent successfully' }))
    .catch((error) => res.status(500).json({ message: 'Failed to send system maintenance notification', error }));
};

export const customNotificationPreferences = (req: Request, res: Response) => {
  const { subscription, preferences } = req.body;

  const payload = JSON.stringify({
    title: 'Custom Notification Preferences',
    body: preferences,
  });

  webpush.sendNotification(subscription, payload)
    .then(() => res.status(200).json({ message: 'Custom notification preferences sent successfully' }))
    .catch((error) => res.status(500).json({ message: 'Failed to send custom notification preferences', error }));
};

import { NotificationArgsProps } from 'antd';

export type NotificationParam = {
  type?: NotificationArgsProps['type'];
  title: string;
  description: React.ReactNode;
};

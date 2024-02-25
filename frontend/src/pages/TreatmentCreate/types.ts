import { ApiResponse } from '@/types/commonApi';
import { NotificationArgsProps } from 'antd';

export type FormFieldTypes = {
  id: number;
  name: string;
  date: string;
  time: string;
  treatment_description: string[];
  medications_prescribed: string[];
  cost: number;
};

export type NotificationParam = {
  type: NotificationArgsProps['type'];
  message: string;
  description: string;
};

export type CreateTreatmentResponse = ApiResponse & {
  documentId: string;
};

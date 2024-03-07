import { ApiResponse } from '@/types/commonApi';

export type TreatmentResponse = ApiResponse & {
  data: {
    id: number;
    name: string;
    treatment_date: Date;
    treatment_description: string[];
    medications_prescribed: string[];
    cost: number;
    documentId: string;
  }[];
};

export type DataTableType = {
  key: string;
  id: number;
  name: string;
  treatmentDate: string;
  treatmentDescriptions: string[];
  medicationsPrescribeds: string[];
  cost: number;
  documentId: string;
};

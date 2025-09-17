import { ColumnConfig } from 'src/app/shared/models/column-config';

export class ApiPlans {}

export const apiPlanCol: ColumnConfig[] = [
  {
    name: 'planName',
    label: 'Plan Name',
  },
  {
    name: 'description',
    label: 'Description',
  },
  {
    name: 'noOfRequests',
    label: 'No. of Requests',
  },
  {
    name: 'price',
    label: 'Price',
  },
];

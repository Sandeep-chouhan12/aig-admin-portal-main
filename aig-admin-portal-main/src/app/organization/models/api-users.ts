import { ColumnConfig } from 'src/app/shared/models/column-config';

export class ApiUsers {}

export const apiUserTabCol: ColumnConfig[] = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'email',
    label: 'Email address',
  },
  {
    name: 'phoneNumber',
    label: 'Phone number',
  },
];
